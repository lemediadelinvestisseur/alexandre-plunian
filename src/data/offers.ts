// Professional offers: used on the home page (summary) and the Media and Agency pages (detail).

export type Offer = { icon: string; format: string; title: string; summary: string; details: string[] };

export const MEDIA_OFFERS: Offer[] = [
  {
    icon: 'play', format: 'YOUTUBE', title: 'Intégration vidéo',
    summary: 'Présentation de votre produit dans une vidéo, ou vidéo dédiée avec test complet.',
    details: ['Intégration de 60 à 90 secondes dans une vidéo de la chaîne', 'Vidéo dédiée : test, démonstration, avis', 'Lien suivi et code promo en description'],
  },
  {
    icon: 'article', format: 'ARTICLE', title: 'Avis et test sponsorisé',
    summary: 'Analyse approfondie de votre offre, référencée sur Google et mise à jour dans le temps.',
    details: ['Article long format optimisé SEO', 'Captures et parcours utilisateur réels', 'Mise à jour annuelle incluse'],
  },
  {
    icon: 'list', format: 'COMPARATIF', title: 'Présence dans les comparatifs',
    summary: 'Votre produit dans nos guides « Meilleur ETF », « Meilleure assurance vie »…',
    details: ['Fiche produit dans un ou plusieurs guides', 'Placement selon les critères éditoriaux du média', "Liens d'affiliation suivis"],
  },
  {
    icon: 'mail', format: 'NEWSLETTER', title: 'Newsletter et réseaux',
    summary: 'Mise en avant auprès des abonnés et relais sur X, LinkedIn et YouTube.',
    details: ['Encart dans la newsletter', 'Publications sur X et LinkedIn', 'Formats courts sur YouTube'],
  },
];

export const AGENCY_OFFERS: Offer[] = [
  {
    icon: 'share', format: 'SOCIAL', title: 'Gestion des réseaux sociaux',
    summary: 'Ligne éditoriale, calendrier, création des posts et animation de la communauté.',
    details: ['Audit et ligne éditoriale', 'Calendrier mensuel et création des visuels', 'Animation et réponses à la communauté', 'Rapport mensuel'],
  },
  {
    icon: 'pen', format: 'SEO', title: "Rédaction d'articles",
    summary: 'Articles et guides optimisés pour Google, écrits par des rédacteurs spécialisés finance.',
    details: ['Recherche de mots-clés', 'Articles, guides et pages produits', 'Relecture conformité (pas de promesse de gain)', 'Intégration dans votre CMS'],
  },
  {
    icon: 'target', format: 'STRATÉGIE', title: 'Stratégie de contenu',
    summary: 'Audit, mots-clés, plan éditorial et indicateurs de suivi pour votre site.',
    details: ['Audit de votre site et de vos concurrents', 'Plan éditorial sur 6 à 12 mois', 'Tableau de bord des indicateurs'],
  },
  {
    icon: 'video', format: 'VIDÉO', title: 'Formats vidéo courts',
    summary: 'Scripts et montage de vidéos courtes pour TikTok, Reels et Shorts.',
    details: ['Écriture des scripts', 'Montage et sous-titres', 'Déclinaison par plateforme'],
  },
];
