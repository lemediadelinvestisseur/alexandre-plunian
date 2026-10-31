// Informations générales du site : c'est ici qu'on modifie coordonnées et réseaux.

export const SITE = {
  name: 'Alexandre Plunian',
  shortName: 'PLUNIAN',
  description:
    "Alexandre Plunian, investisseur et fondateur du Média de l'investisseur. Immobilier, bourse, cryptomonnaies, partenariats média et agence de contenu.",
  email: 'lemediadelinvestisseur@gmail.com',
  /**
   * Numéro WhatsApp au format international, chiffres seulement (ex. « 33612345678 »).
   * Tant qu'il est vide, les boutons WhatsApp ne s'affichent pas.
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
  { href: '/book', label: 'Références' },
  { href: '/publications', label: 'Publications' },
] as const;

export function whatsappLink(message: string = SITE.whatsappMessage): string | null {
  if (!SITE.whatsapp) return null;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
