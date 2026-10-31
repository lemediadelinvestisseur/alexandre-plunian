# Site d'Alexandre Plunian

Site personnel : investissements, partenariats média, agence de contenu, book clients et flux de toutes
les publications. Construit avec [Astro](https://astro.build), hébergé sur Netlify, leads envoyés dans Brevo.

## Pages

| Page | Contenu |
| --- | --- |
| `/` | Accueil : présentation, chiffres, résumé des offres, dernières publications |
| `/investissements` | Les trois piliers (immobilier, bourse, crypto) et les guides liés |
| `/media` | Offres de partenariat média (YouTube, articles, comparatifs, newsletter) |
| `/agence` | Services de l'agence (réseaux sociaux, rédaction SEO, stratégie, vidéos courtes) |
| `/book` | Références clients (`src/data/clients.ts`) |
| `/publications` | Tous les articles et vidéos, filtrables par rubrique |
| `/contact` | Formulaire de demande (envoyé dans Brevo), WhatsApp, e-mail |
| `/rss.xml` | Flux RSS unique de toutes les publications |

## Commandes

```sh
npm install
npm run dev      # http://localhost:4321
npm run check    # vérification des types + build
```

## Ce qu'il reste à renseigner

- **WhatsApp** : `whatsapp` dans `src/config.ts` (format international sans « + », ex. `33612345678`).
  Tant qu'il est vide, les boutons WhatsApp sont masqués.
- **Book clients** : une entrée par client dans `src/data/clients.ts`, logos dans `public/clients/`.
- **Photo** : déposer `public/portrait.jpg` (format paysage 4:3) ; elle remplace les initiales.
- **Mentions légales** : raison sociale, adresse et SIREN dans `src/pages/mentions-legales.astro`.
- **Offres** : textes dans `src/data/offers.ts`.

## Mise en ligne (Netlify)

1. Sur [Netlify](https://app.netlify.com) : *Add new site → Import an existing project*, choisir ce dépôt.
   Les réglages de build sont lus dans `netlify.toml`.
2. Dans *Site configuration → Environment variables*, ajouter les variables de `.env.example`.
3. Dans *Domain management*, brancher le nom de domaine, puis mettre à jour `SITE_URL`.

### Brevo (leads et newsletter)

1. Créer deux listes dans *Contacts → Listes* : « Leads site » et « Newsletter ». Noter leurs identifiants
   (`BREVO_LEADS_LIST_ID`, `BREVO_NEWSLETTER_LIST_ID`).
2. Créer une clé API (*SMTP & API → Clés API*) → `BREVO_API_KEY`.
3. Valider une adresse d'expéditeur (*Expéditeurs et domaines*) → `BREVO_SENDER_EMAIL`.

À chaque demande envoyée depuis `/contact` :
- le contact est créé (ou mis à jour) dans la liste « Leads site » ;
- une affaire est créée dans le CRM Brevo (*CRM → Affaires*) avec le message en note, si `BREVO_CREATE_DEAL=true` ;
- une alerte est envoyée à `LEAD_NOTIFY_EMAIL`, avec l'adresse du prospect en « Répondre à ».

Si une étape échoue (ex. expéditeur non validé), les autres continuent ; les erreurs sont visibles dans
Netlify → *Logs → Functions → lead*.

### Flux de publications

Le flux est lu au moment du build :
- **Articles** : API Content de Ghost si `GHOST_CONTENT_API_KEY` est renseignée (tous les articles),
  sinon le flux RSS de Ghost (15 derniers), sinon la copie `src/data/posts-fallback.json`.
  Clé : Ghost → *Settings → Integrations → Add custom integration* → *Content API key*.
- **Vidéos** : flux YouTube de la chaîne si `YOUTUBE_CHANNEL_ID` est renseigné (identifiant en `UC…`,
  dans YouTube Studio → *Paramètres → Chaîne → Paramètres avancés*). Le flux YouTube public donne les 15 dernières vidéos.

Pour que les nouvelles publications apparaissent chaque jour : créer un *Build hook* dans Netlify
(*Build & deploy → Build hooks*) et l'ajouter comme secret GitHub `NETLIFY_BUILD_HOOK`. Le workflow
`.github/workflows/rebuild.yml` reconstruit le site tous les matins. On peut aussi déclencher le hook
depuis Ghost (*Integrations → Webhooks → Post published*) pour une mise à jour immédiate.
