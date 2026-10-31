// Clients Alexandre has written for. Shown as a logo wall on /agence and the home page, and in
// detail on /parcours (author page link and article history).
//
// Logos are picked up automatically from public/clients/<slug>.svg (or .png, .webp, .jpg).
// Without a file, the client's name is shown as a text wordmark.

export type ClientArticle = {
  title: string;
  url: string;
  /** ISO date, e.g. "2023-05-14" (optional when unknown) */
  date?: string;
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
  /** Articles written for the client, newest first (shown in this order) */
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
    since: 2025,
    authorPage: 'https://avenuedelia.com/fr/actu/author/alexandreplunian/',
    articles: [
      { title: 'Fidji Simo nommée à la tête de ChatGPT : une Française au cœur de la révolution OpenAI', url: 'https://avenuedelia.com/fr/actu/fidji-simo-nommee-a-la-tete-de-chatgpt-une-francaise-au-cur-de-la-revolution-openai/', date: '2025-05-09' },
      { title: "Micha Kaufman (Fiverr) alerte ses équipes : « L'IA va remplacer vos jobs, et le mien aussi »", url: 'https://avenuedelia.com/fr/actu/micha-kaufman-fiverr-alerte-ses-equipes-lia-va-remplacer-vos-jobs-et-le-mien-aussi/', date: '2025-05-07' },
    ],
  },
  {
    slug: 'coinacademy',
    name: 'Coinacademy',
    sector: 'Média et formation crypto',
    website: 'https://coinacademy.fr',
    offer: ['agency'],
    since: 2022,
    authorPage: 'https://coinacademy.fr/author/aleexx/',
    articles: [
      { title: 'La collection NFT Bored Ape Kennel Club : les premiers compagnons des Bored Ape', url: 'https://coinacademy.fr/analyses-nft/bored-ape-kennel-club/', date: '2022-12-27' },
      { title: "Renga : la collection NFT dédiée à l'art japonais", url: 'https://coinacademy.fr/collection-nft-renga-japon/', date: '2022-12-19' },
      { title: "Qu'est-ce qu'un layer 0 ?", url: 'https://coinacademy.fr/academie/layer-0-blockchain-composabilite-interoperabilite/', date: '2022-10-12' },
      { title: "Blockchain : qu'est-ce qu'un layer 1 ?", url: 'https://coinacademy.fr/academie/blockchain-layer-1-couche-1-principale/', date: '2022-09-23' },
      { title: "Qu'est-ce qu'un indice boursier en finance ?", url: 'https://coinacademy.fr/academie/indice-boursier-en-finance-investissement-trading/', date: '2022-09-12' },
      { title: "Top 10 des NFT les plus chers de l'histoire", url: 'https://coinacademy.fr/academie/nft-nfts-plus-chers-histoire-merge-clock-beeple-cryptopunk/', date: '2022-09-09' },
      { title: "Qu'est-ce que le Move to Earn et quelle différence avec le Play to Earn ?", url: 'https://coinacademy.fr/academie/move-to-earn-stepn-gmt-walken-wlkn/', date: '2022-09-06' },
      { title: 'Indicateurs les plus populaires dans le trading crypto', url: 'https://coinacademy.fr/academie/indicateurs-populaires-trading-crypto/', date: '2022-08-17' },
      { title: 'Ledger Nano S Plus : notre avis sur le portefeuille crypto et sa sécurité', url: 'https://coinacademy.fr/academie/ledger-nano-s-plus-securite/', date: '2022-08-14' },
      { title: 'Ledger Nano X : notre avis sur le portefeuille crypto et sa sécurité', url: 'https://coinacademy.fr/academie/avis-wallet-ledger-nano-x/', date: '2022-08-08' },
      { title: "Comprendre les différents types d'ordres en trading", url: 'https://coinacademy.fr/academie/comprendre-differents-types-ordres/', date: '2022-07-30' },
      { title: "Efinity (EFI) : qu'est-ce que c'est, comment ça fonctionne et comment en acheter ?", url: 'https://coinacademy.fr/efinity-efi-fondamental/', date: '2022-07-03' },
      { title: "Qu'est-ce qu'un contrat à terme en trading crypto ?", url: 'https://coinacademy.fr/academie/contrat-a-terme-trading-crypto/', date: '2022-07-03' },
    ],
  },
  { slug: 'verysaas', name: 'Verysaas.io', website: 'https://verysaas.io', offer: ['agency'], articles: [] },
  {
    slug: 'explorateur-ai',
    name: 'Explorateur.ai',
    sector: "Outils et usages de l'IA",
    website: 'https://explorateur.ai',
    offer: ['agency'],
    since: 2024,
    articles: [
      { title: "Lucide.ai : le meilleur détecteur d'IA français", url: 'https://explorateur.ai/blog/avis-lucide-ai', date: '2025-07-28' },
      { title: 'Comment savoir si un texte a été écrit par ChatGPT ?', url: 'https://explorateur.ai/blog/comment-savoir-si-texte-ecrit-par-chatgpt', date: '2025-07-25' },
      { title: "Les 5 meilleurs détecteurs d'IA en 2025", url: 'https://explorateur.ai/blog/meilleurs-detecteurs-ia', date: '2025-07-24' },
      { title: 'Les 9 meilleurs logiciels pour ajouter des sous-titres vidéo', url: 'https://explorateur.ai/blog/meilleurs-outils-sous-titres', date: '2025-07-22' },
      { title: 'Semrush ou Ranxplorer : quel outil SEO choisir ? Comparatif', url: 'https://explorateur.ai/blog/semrush-rankxplorer', date: '2025-07-03' },
      { title: 'Devenir créateur de contenu en 2025', url: 'https://explorateur.ai/blog/devenir-createur-de-contenu-en-2025', date: '2025-06-28' },
      { title: 'La méthode pour devenir Podcasteur en 2025', url: 'https://explorateur.ai/blog/devenir-podcasteur', date: '2025-06-16' },
      { title: 'Rémunération TikTok en 2025 : le tutoriel complet', url: 'https://explorateur.ai/blog/remuneration-tiktok', date: '2025-06-14' },
      { title: 'Les 10 business les plus rentables au monde', url: 'https://explorateur.ai/blog/business-rentables', date: '2025-06-11' },
      { title: 'Rankerfox avis 2025 : la meilleure solution pour accéder aux meilleurs outils SEO à petit prix ?', url: 'https://explorateur.ai/blog/avis-rankerfox', date: '2025-06-03' },
      { title: 'Comment percer sur YouTube en 2025', url: 'https://explorateur.ai/blog/comment-percer-sur-youtube', date: '2025-05-29' },
      { title: "Gagner de l'argent à la maison : guide complet pour transformer son salon en source de revenus", url: 'https://explorateur.ai/blog/gagner-argent-maison', date: '2025-05-29' },
      { title: 'Liste de compétences : le guide complet pour identifier, développer et valoriser votre capital professionnel', url: 'https://explorateur.ai/liste-competences/', date: '2025-05-29' },
      { title: 'Combien rapporte 1 million de vues sur YouTube ?', url: 'https://explorateur.ai/blog/combien-rapporte-1-million-de-vues-youtube', date: '2025-05-16' },
      { title: 'Mindset : la clé du succès qui façonne votre avenir', url: 'https://explorateur.ai/blog/mindset', date: '2025-05-16' },
      { title: 'Comment surmonter le syndrome de la page blanche ?', url: 'https://explorateur.ai/blog/syndrome-page-blanche', date: '2025-05-16' },
      { title: "To-Do Lists : le guide complet 2025 pour maîtriser l'art de la liste de tâches", url: 'https://explorateur.ai/blog/to-do-lists' },
      { title: 'Thot SEO : meilleur outil SEO en 2025 ?', url: 'https://explorateur.ai/thot-seo/' },
      { title: 'Créer une communauté en 2025', url: 'https://explorateur.ai/blog/creer-une-communaute', date: '2024-12-24' },
      { title: 'Comment créer une formation en ligne ?', url: 'https://explorateur.ai/creer-une-formation/', date: '2024-11-30' },
      { title: 'Créer un prompt IA efficace facilement', url: 'https://explorateur.ai/blog/prompt-ia', date: '2024-11-28' },
      { title: "Avis Submagic : l'outil ultime pour personnaliser vos vidéos", url: 'https://explorateur.ai/avis-submagic/', date: '2024-11-25' },
      { title: 'Guide complet pour ajouter des sous-titres à vos vidéos', url: 'https://explorateur.ai/ajouter-sous-titres-videos/', date: '2024-11-24' },
    ],
  },
  {
    slug: 'gaspard-immo',
    name: 'Gaspard.immo',
    website: 'https://gaspard.immo',
    offer: ['agency'],
    authorPage: 'https://gaspard.immo/author/alexandre/',
    articles: [],
  },
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
