// Reçoit les formulaires du site (POST /api/lead) et les envoie dans Brevo :
//  - type « lead »       : contact ajouté à la liste des leads, affaire créée dans le CRM (option),
//                          message ajouté en note, alerte e-mail envoyée à Alexandre ;
//  - type « newsletter » : contact ajouté à la liste newsletter.
// La clé API reste côté serveur (variables d'environnement Netlify, voir .env.example).

const API = 'https://api.brevo.com/v3';
const env = (k: string) => process.env[k]?.trim() || '';

const OFFER_LABEL: Record<string, string> = { media: 'Partenariat média', agence: 'Agence de contenu', autre: 'Autre demande' };

type Payload = {
  type?: string; email?: string; firstname?: string; lastname?: string; phone?: string; company?: string;
  offer?: string; budget?: string; message?: string; consent?: string; newsletter?: boolean; website?: string;
};

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const str = (v: unknown, max = 200) => String(v ?? '').trim().slice(0, max);

async function brevo(path: string, method: string, body?: unknown) {
  const res = await fetch(API + path, {
    method,
    headers: { 'api-key': env('BREVO_API_KEY'), 'Content-Type': 'application/json', accept: 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Brevo ${method} ${path} → ${res.status} ${text}`);
  return text ? JSON.parse(text) : null;
}

const listIds = (...keys: string[]) => keys.map((k) => Number(env(k))).filter((n) => Number.isInteger(n) && n > 0);

/** Crée ou met à jour le contact. Si les attributs sont refusés (noms différents dans le compte), réessaie sans. */
async function upsertContact(email: string, attributes: Record<string, string>, lists: number[]) {
  const base = { email, listIds: lists, updateEnabled: true };
  try {
    await brevo('/contacts', 'POST', { ...base, attributes });
  } catch (e) {
    console.warn(String(e));
    await brevo('/contacts', 'POST', base);
  }
  const contact = await brevo(`/contacts/${encodeURIComponent(email)}`, 'GET');
  return contact?.id as number | undefined;
}

export default async (req: Request) => {
  if (req.method !== 'POST') return json(405, { error: 'Méthode non autorisée' });
  if (!env('BREVO_API_KEY')) {
    console.error('BREVO_API_KEY manquante : la demande ne peut pas être enregistrée.');
    return json(500, { error: 'Service indisponible' });
  }

  let data: Payload;
  try {
    data = await req.json();
  } catch {
    return json(400, { error: 'Requête invalide' });
  }
  // Piège à robots : le champ caché « website » doit rester vide
  if (data.website) return json(200, { ok: true });

  const email = str(data.email, 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(400, { error: 'Adresse e-mail invalide' });

  if (data.type === 'newsletter') {
    try {
      await upsertContact(email, {}, listIds('BREVO_NEWSLETTER_LIST_ID'));
      return json(200, { ok: true });
    } catch (e) {
      console.error(String(e));
      return json(502, { error: "L'inscription n'a pas abouti" });
    }
  }

  const lead = {
    firstname: str(data.firstname, 80),
    lastname: str(data.lastname, 80),
    phone: str(data.phone, 40),
    company: str(data.company, 120),
    offer: OFFER_LABEL[str(data.offer)] ?? OFFER_LABEL.autre,
    budget: str(data.budget, 60) || 'Non précisé',
    message: str(data.message, 5000),
  };
  if (!lead.firstname || !lead.lastname || !lead.company || !lead.message || !data.consent) {
    return json(400, { error: 'Champs obligatoires manquants' });
  }

  const fullName = `${lead.firstname} ${lead.lastname}`;
  const summary = [
    `Demande : ${lead.offer}`,
    `Nom : ${fullName}`,
    `Entreprise : ${lead.company}`,
    `E-mail : ${email}`,
    `Téléphone : ${lead.phone || 'Non précisé'}`,
    `Budget : ${lead.budget}`,
    '',
    lead.message,
  ].join('\n');

  // Chaque étape est indépendante : un échec n'empêche pas les suivantes.
  let saved = false;
  let notified = false;

  let contactId: number | undefined;
  try {
    const lists = listIds('BREVO_LEADS_LIST_ID', ...(data.newsletter ? ['BREVO_NEWSLETTER_LIST_ID'] : []));
    contactId = await upsertContact(email, { FIRSTNAME: lead.firstname, LASTNAME: lead.lastname }, lists);
    saved = true;
  } catch (e) {
    console.error(String(e));
  }

  if (env('BREVO_CREATE_DEAL') === 'true') {
    try {
      const deal = await brevo('/crm/deals', 'POST', { name: `${lead.company} · ${lead.offer}` });
      if (deal?.id) {
        if (contactId) await brevo(`/crm/deals/link-unlink/${deal.id}`, 'PATCH', { linkContactIds: [contactId] });
        await brevo('/crm/notes', 'POST', { text: summary, dealIds: [deal.id], ...(contactId ? { contactIds: [contactId] } : {}) });
      }
      saved = true;
    } catch (e) {
      console.error(String(e));
    }
  }

  const to = env('LEAD_NOTIFY_EMAIL');
  const sender = env('BREVO_SENDER_EMAIL');
  if (to && sender) {
    try {
      await brevo('/smtp/email', 'POST', {
        sender: { name: 'Site Alexandre Plunian', email: sender },
        to: [{ email: to }],
        replyTo: { email, name: fullName },
        subject: `Nouveau lead : ${lead.company} (${lead.offer})`,
        htmlContent: `<pre style="font-family:system-ui,sans-serif;font-size:15px;white-space:pre-wrap">${escape(summary)}</pre>`,
      });
      notified = true;
    } catch (e) {
      console.error(String(e));
    }
  }

  return saved || notified ? json(200, { ok: true }) : json(502, { error: "La demande n'a pas pu être enregistrée" });
};
