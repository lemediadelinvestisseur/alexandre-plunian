// Clients Alexandre has written for. Shown as a logo wall on /agence and the home page, and in
// detail on /parcours (author page link and article history).
//
// Logos are picked up automatically from public/clients/<slug>.svg (or .png, .webp, .jpg).
// Without a file, the client's name is shown as a text wordmark.

export type ClientArticle = {
  title: string;
  url: string;
  /** ISO date, e.g. "2023-05-14" */
  date: string;
};

export type Client = {
  /** Used for the logo file name and the /parcours#slug anchor */
  slug: string;
  name: string;
  /** One line about the client, e.g. "Plateforme d'investissement dans les terres agricoles" */
  sector?: string;
  website?: string;
  /** Work done: media (partnership) and/or agency (content production) */
  offer: ('media' | 'agency')[];
  /** Year the collaboration started */
  since?: number;
  /** Alexandre's author page on the client's site */
  authorPage?: string;
  /** Selection of articles written for the client, newest first or in any order */
  articles: ClientArticle[];
};

export const CLIENTS: Client[] = [
  {
    slug: 'hectarea',
    name: 'Hectarea',
    sector: "Investissement dans les terres agricoles",
    offer: ['agency'],
    articles: [],
  },
  {
    slug: 'avenue-de-l-ia',
    name: "Avenue de l'IA",
    website: 'https://avenuedelia.com',
    offer: ['agency'],
    authorPage: 'https://avenuedelia.com/fr/actu/author/alexandreplunian/',
    articles: [],
  },
  {
    slug: 'coinacademy',
    name: 'Coinacademy',
    sector: 'Média et formation crypto',
    website: 'https://coinacademy.fr',
    offer: ['agency'],
    authorPage: 'https://coinacademy.fr/author/aleexx/',
    articles: [],
  },
  { slug: 'verysaas', name: 'Verysaas.io', website: 'https://verysaas.io', offer: ['agency'], articles: [] },
  { slug: 'finixio', name: 'Finixio', offer: ['agency'], articles: [] },
  { slug: 'clickout-media', name: 'Clickout Média', offer: ['agency'], articles: [] },
];

/** Alexandre's own media, shown first in the history on /parcours */
export const OWN_MEDIA = {
  name: "Le Média de l'investisseur",
  role: 'Fondateur et rédacteur',
  since: 2022,
  authorPage: 'https://lemediadelinvestisseur.fr/auteurs/alexandre-plunian/',
} as const;
