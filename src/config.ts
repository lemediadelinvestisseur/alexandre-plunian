// General site information: contact details and social links are edited here.

export const SITE = {
  name: 'Alexandre Plunian',
  shortName: 'PLUNIAN',
  description:
    "Alexandre Plunian, investisseur et fondateur du Média de l'investisseur. Immobilier, bourse, cryptomonnaies, partenariats média et agence de contenu.",
  email: 'lemediadelinvestisseur@gmail.com',
  /**
   * WhatsApp number in international format, digits only (e.g. "33612345678").
   * While empty, WhatsApp buttons are hidden.
   */
  whatsapp: '33615112384',
  whatsappMessage: "Bonjour Alexandre, je vous contacte depuis votre site au sujet d'un partenariat.",
  media: { name: "Le Média de l'investisseur", url: 'https://lemediadelinvestisseur.fr' },
  socials: {
    x: 'https://x.com/le_investisseur',
    youtube: 'https://www.youtube.com/@alexandreplunian',
    linkedin: 'https://www.linkedin.com/in/plunianalexandre',
  },
} as const;

export const NAV = [
  { href: '/investissements', label: 'Investissements' },
  { href: '/media', label: 'Média' },
  { href: '/agence', label: 'Agence' },
  { href: '/parcours', label: 'Parcours' },
  { href: '/publications', label: 'Publications' },
] as const;

export function whatsappLink(message: string = SITE.whatsappMessage): string | null {
  if (!SITE.whatsapp) return null;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
