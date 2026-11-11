export interface HeroDeviceSettings {
  video: string;
  image: string;
  titlePrimary: string;
  titleAccent: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
}

export interface HeroSettings {
  desktop: HeroDeviceSettings;
  mobile: HeroDeviceSettings;
}

export const HERO_SETTINGS: HeroSettings = {
  desktop: {
    video: "",
    image: "/images/gallery/gala-banquet.jpg",
    titlePrimary: "Élégance, Raffinement",
    titleAccent: "& Service d'Exception",
    subtitle: "",
    primaryCtaText: "Demander un devis express",
    primaryCtaHref: "/devis-contact",
    secondaryCtaText: "Nos Formules & Services",
    secondaryCtaHref: "/formules-services",
  },
  mobile: {
    video: "",
    image: "/images/gallery/culinary-fine.jpg",
    titlePrimary: "Élégance, Raffinement",
    titleAccent: "& Service d'Exception",
    subtitle: "",
    primaryCtaText: "Demander un devis express",
    primaryCtaHref: "/devis-contact",
    secondaryCtaText: "Nos Formules & Services",
    secondaryCtaHref: "/formules-services",
  },
};

export interface HeroMediaConfig {
  /** URL to 16:9 Landscape MP4 Video (H.264, 24-30fps, no audio, < 5MB) for screens >= 768px */
  hero_desktop_video: string;
  /** URL to 1920x1080 WebP/JPG Landscape Image & Video Poster for screens >= 768px */
  hero_desktop_image: string;
  /** URL to 9:16 Vertical MP4 Video (H.264, 24-30fps, no audio, < 3MB) for screens < 768px */
  hero_mobile_video: string;
  /** URL to 1080x1920 WebP/JPG Vertical Image & Video Poster for screens < 768px */
  hero_mobile_image: string;
}

export const HERO_MEDIA_CONFIG: HeroMediaConfig = {
  hero_desktop_video: HERO_SETTINGS.desktop.video,
  hero_desktop_image: HERO_SETTINGS.desktop.image,
  hero_mobile_video: HERO_SETTINGS.mobile.video,
  hero_mobile_image: HERO_SETTINGS.mobile.image,
};

export interface NavLink {
  title: string;
  href: string;
  shortTitle?: string;
}

export const SITE_NAVIGATION: NavLink[] = [
  { title: "Accueil", href: "/", shortTitle: "Accueil" },
  { title: "Nos Formules & Services", href: "/formules-services", shortTitle: "Formules & Services" },
  { title: "Réalisations & Galerie", href: "/realisations-galerie", shortTitle: "Galerie" },
  { title: "À Propos & Engagements", href: "/a-propos", shortTitle: "À Propos" },
  { title: "Espace Recrutement", href: "/recrutement", shortTitle: "Recrutement" },
  { title: "Devis & Contact", href: "/devis-contact", shortTitle: "Devis & Contact" },
];

export interface ClientReference {
  name: string;
  category?: string;
  initials: string;
  logo?: string;
}

export const CLIENT_REFERENCES: ClientReference[] = [
  {
    name: "Centre International des Conférences (CIC Alger)",
    initials: "CIC",
    logo: "", // e.g. "/images/clients/cic.png"
  },
  {
    name: "Sheraton Hotels",
    initials: "SHERATON",
    logo: "", // e.g. "/images/clients/sheraton.png"
  },
  {
    name: "GE Healthcare",
    initials: "GE",
    logo: "", // e.g. "/images/clients/ge.png"
  },
  {
    name: "Agence Nationale des Produits Pharmaceutiques (ANPP)",
    initials: "ANPP",
    logo: "", // e.g. "/images/clients/anpp.png"
  },
  {
    name: "ATS Satcom",
    initials: "ATS",
    logo: "", // e.g. "/images/clients/ats.png"
  },
];

export const KEY_METRICS = [
  {
    value: "+25 000",
    label: "Couverts & Pauses Servis",
    detail: "Volume annuel maîtrisé avec régularité",
  },
  {
    value: "4 Heures",
    label: "Intervention Express",
    detail: "Commandes de 10 à 50 convives sous 4h",
  },
  {
    value: "100 %",
    label: "Adaptation Budgétaire",
    detail: "Devis modulés selon l'enveloppe allouée",
  },
  {
    value: "2 à 4h",
    label: "Réactivité Devis",
    detail: "Proposition chiffrée sous 2 à 4h ouvrées",
  },
];

export interface CoffeeBreakPackage {
  id: string;
  name: string;
  content: string;
  audience: string;
  highlight?: boolean;
}

export const COFFEE_BREAK_PACKAGES: CoffeeBreakPackage[] = [
  {
    id: "ordinaire",
    name: "Formule Ordinaire",
    content: "2 pièces salées, 2 pièces sucrées, boissons chaudes (café de qualité, thé) et boissons fraîches (eau, jus).",
    audience: "Réunions d'équipe internes, sessions de formation continue.",
  },
  {
    id: "amelioree",
    name: "Formule Améliorée",
    content: "2 salés, 2 sucrés, sélection de gâteaux traditionnels orientaux, boissons chaudes et fraîches.",
    audience: "Séminaires d'une demi-journée, ateliers et workshops.",
    highlight: true,
  },
  {
    id: "vip",
    name: "Formule VIP",
    content: "3 salés, 3 sucrés, pâtisseries orientales fines, macarons parisiens, boissons chaudes et fraîches.",
    audience: "Assemblées générales, comités de direction, conférences de presse.",
  },
  {
    id: "vvip",
    name: "Formule VVIP",
    content: "3 salés, 3 sucrés, gâteaux orientaux raffinés, macarons, assortiment de fruits secs premium, boissons chaudes et fraîches.",
    audience: "Délégations officielles, rencontres ministérielles et diplomatiques.",
    highlight: true,
  },
];

export interface ServiceOffer {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
}

export const SERVICE_OFFERS: ServiceOffer[] = [
  {
    id: "cocktails",
    title: "Cocktails Déjeunatoires & Dînatoires",
    subtitle: "Prestation cocktail au plateau et buffets d'apparat",
    description: "Verrines fraîches (crevettes et saumon fumé), déclinaison de canapés salés, brochettes gourmandes, assortiments de salades, plateaux de fromages affinés et assiettes de fruits de saison découpés.",
    details: [
      "Verrines saumon fumé et crevettes",
      "Canapés salés et brochettes gourmandes",
      "Plateaux de fromages affinés & fruits découpés",
      "Service fluide au plateau par maîtres d'hôtel",
    ],
  },
  {
    id: "dejeuners",
    title: "Déjeuners en Box ou Servis à l'Assiette",
    subtitle: "Du déjeuner d'affaires au grand dîner assis",
    description: "Formule pratique 'Lunch Box' conçue pour les sessions de formation rythmées ou repas complet assis avec service à table par maîtres d'hôtel.",
    details: [
      "Lunch Boxes individuelles haut de gamme scellées",
      "Menus assis 3 ou 4 services pour comités de direction",
      "Pain frais artisanal et mignardises sucrées",
      "Service à l'assiette synchronisé",
    ],
  },
  {
    id: "scenographie",
    title: "Scénographie & Décoration d'Événements",
    subtitle: "Mise en scène intégrale de votre espace de réception",
    description: "Prise en charge intégrale de la mise en place : nappage élégant, décoration florale, disposition esthétique des tables et buffets.",
    details: [
      "Nappage noble et art de la table de prestige",
      "Compositions florales d'accueil et de buffet",
      "Art scénique et mise en valeur des espaces",
      "Mobilier et vaisselle professionnelle complète",
    ],
  },
];

export const ENGAGEMENT_PILLARS = [
  {
    title: "Normes d'Hygiène & Chaîne du Froid",
    description: "Contrôles stricts des approvisionnements, respect rigoureux des règles sanitaires HACCP et sélection de produits ultrafrais.",
  },
  {
    title: "Réactivité d'Urgence (Délai 4 Heures)",
    description: "Capacité éprouvée à organiser et livrer un événement de 10 à 50 convives en 4 heures de préavis seulement.",
  },
  {
    title: "Flexibilité & Respect du Budget Client",
    description: "Volonté constante de moduler les compositions pour garantir un rendu haut de gamme sans dépasser l'enveloppe allouée.",
  },
  {
    title: "Équipe Professionnelle Dédiée",
    description: "Cuisiniers expérimentés, chefs pâtissiers créatifs et brigade de maîtres d'hôtel attentifs et discrets.",
  },
];

export const RECRUITMENT_STEPS = [
  {
    step: "Étape 1",
    title: "Réception du dossier",
    description: "Dépôt du CV et des références en restauration ou hôtellerie via le formulaire du site.",
  },
  {
    step: "Étape 2",
    title: "Entretien de présélection",
    description: "Vérification des aptitudes relationnelles, de la présentation et de la motivation.",
  },
  {
    step: "Étape 3",
    title: "Évaluation pratique",
    description: "Test terrain (dressage de plateaux, respect des règles d'hygiène HACCP, port de plateau, service en salle).",
  },
  {
    step: "Étape 4",
    title: "Intégration & Briefing",
    description: "Adhésion à la charte d'excellence et aux protocoles de réception de DZ CATERING.",
  },
];

export const CONTACT_INFO = {
  companyName: "EURL DZ CATERING",
  primaryPhone: "0770 86 89 74",
  secondaryPhone: "0770 34 61 00",
  primaryPhoneIntl: "+213 770 86 89 74",
  secondaryPhoneIntl: "+213 770 34 61 00",
  whatsappPhone: "213770868974",
  email: "eurldzcatering@gmail.com",
  slogan: "Élégance, raffinement et service d'exception pour des événements à votre image",
  brandPromise: "Qualité, Luxe et Performance",
  tagline: "Traiteur & Services hôteliers",
  locations: "Douaouda & El Biar, Alger",
  responsePromise: "Devis officiel transmis sous 2 à 4 heures ouvrées",
};
