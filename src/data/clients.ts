// Book clients : une entrée par client. Le logo est optionnel (fichier dans public/clients/).
// La page /book affiche un état d'attente tant que cette liste est vide.

export type Client = {
  name: string;
  /** Secteur, ex. « Courtier en ligne », « Plateforme crypto » */
  sector: string;
  /** Ce qui a été fait : « Le média » (partenariat) et/ou « L'agence » (production de contenu) */
  offer: ('media' | 'agence')[];
  /** Livrables, ex. ["Vidéo YouTube dédiée", "Article avis et test"] */
  deliverables: string[];
  /** Phrase courte sur le résultat ou le contexte (facultatif) */
  summary?: string;
  /** Résultats chiffrés à afficher (facultatif) : { value: "120 000", label: "vues" } */
  results?: { value: string; label: string }[];
  /** Chemin du logo dans public/, ex. "/clients/meilleurtaux.svg" (facultatif) */
  logo?: string;
  /** Lien vers le contenu réalisé (facultatif) */
  url?: string;
  year?: number;
};

export const CLIENTS: Client[] = [];
