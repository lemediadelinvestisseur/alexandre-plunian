// Client book: one entry per client. The logo is optional (file in public/clients/).
// The /book page shows a placeholder state while this list is empty.

export type Client = {
  name: string;
  /** Sector, e.g. "Courtier en ligne", "Plateforme crypto" */
  sector: string;
  /** Work done: media (partnership) and/or agency (content production) */
  offer: ('media' | 'agency')[];
  /** Deliverables, e.g. ["Vidéo YouTube dédiée", "Article avis et test"] */
  deliverables: string[];
  /** Short sentence about the result or context (optional) */
  summary?: string;
  /** Figures to display (optional): { value: "120 000", label: "vues" } */
  results?: { value: string; label: string }[];
  /** Logo path inside public/, e.g. "/clients/meilleurtaux.svg" (optional) */
  logo?: string;
  /** Link to the delivered content (optional) */
  url?: string;
  year?: number;
};

export const CLIENTS: Client[] = [];
