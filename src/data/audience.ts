// Audience and results of the media, taken from the 2026 media brochure.
// Sources: X Analytics, Rybbit, Google Search Console, YouTube Studio, Affilae (Aug 2025 → Jul 2026).

export type Figure = { value: string; label: string };

export const AUDIENCE: Figure[] = [
  { value: '200 000+', label: 'abonnés aux notifications push' },
  { value: '7 M', label: 'impressions sur X en 12 mois' },
  { value: '100 000+', label: 'vues YouTube en 12 mois' },
  { value: '96 000+', label: 'sessions sur le site en 12 mois, 69 % via Google' },
  { value: '24 300+', label: 'abonnés sur X' },
  { value: '48–54 %', label: "taux d'ouverture de la newsletter, 2 000+ abonnés actifs" },
];

export const AUDIENCE_SOURCE =
  'Sources : X Analytics, Rybbit, Google Search Console, YouTube Studio, Affilae. Août 2025 à juillet 2026. Chiffres mesurés, exports détaillés sur demande.';

export const RESULTS: Figure[] = [
  { value: '40 000 €', label: "de chiffre d'affaires généré pour Finary en 2025, top 3 des affiliés en France" },
  { value: '560', label: 'clients apportés à Trade Republic' },
  { value: '450+', label: 'conversions trackées pour Finary' },
  { value: '~14 %', label: 'de conversion visiteur → client sur les contenus Finary' },
];

export const PARTNERS = ['Finary', 'Trade Republic', 'Corum', 'Degiro'];
