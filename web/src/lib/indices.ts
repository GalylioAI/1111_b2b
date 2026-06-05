/* ----------------------------------------------------------------------------
   Indices du marché — indicateurs d'intelligence calculés quotidiennement
   à partir de plus de 15 000 SKUs e-commerce tunisiens.
---------------------------------------------------------------------------- */

/* Indice composite global — carte vedette */
export const globalIndex = {
  title: "Indice du Marché E-Commerce Tunisien",
  subtitle: "Composite global",
  value: 112.4,
  daily: 0.6, // % vs hier
  weekly: 2.1, // % vs semaine dernière
  formula:
    "Indice Global = 100 × (1 + (0.30·Inflation + 0.20·Volatilité + 0.20·Guerre + 0.15·Dispersion + 0.15·Renouv.))",
  description:
    "Indicateur composite combinant inflation, volatilité, pression concurrentielle, dispersion des prix et rotation des produits en un score unique.",
  definition:
    "Un indicateur composite qui combine l'inflation, la volatilité, la pression concurrentielle, la dispersion des prix et la rotation des produits en un score unique. Il fournit une évaluation de haut niveau de la santé et de la dynamique globale du marché e-commerce tunisien.",
};

/* Série 30 jours pour le graphique vedette */
export const globalIndexSeries = Array.from({ length: 30 }, (_, i) => {
  const base = 107.5 + i * 0.17 + Math.sin(i / 2.5) * 1.4 + Math.cos(i / 6) * 0.7;
  return { day: i + 1, value: Math.round(base * 10) / 10 };
});

export const globalIndexPeak = {
  day: 27,
  label: "Plus haut",
  value: globalIndexSeries[26].value.toFixed(1),
  sub: "31 mai",
};

export type Indicator = {
  key: string;
  name: string;
  formula: string;
  value: string;
  change24h: number;
  change7d: number;
  description: string; // résumé court (tableau)
  definition: string; // définition complète (révélée au survol de la formule)
  spark: number[];
  goodUp: boolean; // si vrai, une hausse est positive (vert)
};

const up = (start: number, end: number, n = 9) =>
  Array.from({ length: n }, (_, i) => Math.round((start + (end - start) * (i / (n - 1)) + Math.sin(i) * (Math.abs(end - start) * 0.06)) * 100) / 100);

export const indicators: Indicator[] = [
  {
    key: "price",
    name: "Indice Global des Prix",
    formula: "I(t) = (1/N) × Σ(Pi,t / Pi,0) × 100",
    value: "112.4",
    change24h: 0.6,
    change7d: 2.1,
    description: "Évolution globale des prix du marché.",
    definition:
      "Mesure l'évolution globale des prix de l'ensemble des produits suivis par rapport à la période de référence. Il offre une vue d'ensemble de l'évolution du niveau de prix du marché e-commerce dans le temps.",
    spark: up(108.2, 112.4),
    goodUp: true,
  },
  {
    key: "inflation",
    name: "Indice d'Inflation E-Commerce",
    formula: "π(t) = (I(t) − I(t−1)) / I(t−1)",
    value: "1.84%",
    change24h: 0.9,
    change7d: 4.2,
    description: "Rythme de hausse ou de baisse des prix.",
    definition:
      "Mesure le rythme auquel les prix e-commerce augmentent ou diminuent entre deux périodes consécutives. Il agit comme un indicateur d'inflation propre au marché numérique.",
    spark: up(1.42, 1.84),
    goodUp: false,
  },
  {
    key: "loginflation",
    name: "Indice d'Inflation Logarithmique",
    formula: "g(t) = (1/N) × Σ[ln(Pi,t) − ln(Pi,t−1)]",
    value: "1.62%",
    change24h: 0.7,
    change7d: 3.4,
    description: "Inflation robuste via variations logarithmiques.",
    definition:
      "Version statistiquement robuste de la mesure d'inflation utilisant les variations logarithmiques des prix. Elle réduit l'impact des mouvements de prix extrêmes et s'avère utile pour l'analyse quantitative.",
    spark: up(1.31, 1.62),
    goodUp: false,
  },
  {
    key: "volatility",
    name: "Indice de Volatilité des Prix",
    formula: "V(t) = √[(1/N) × Σ(Ri,t − R̄)²]",
    value: "4.27",
    change24h: 2.1,
    change7d: -1.4,
    description: "Instabilité et fluctuations des prix.",
    definition:
      "Mesure le degré de fluctuation des prix entre les produits. Des valeurs élevées indiquent un marché plus instable, avec des changements de prix fréquents ou importants.",
    spark: [3.9, 4.1, 4.4, 4.6, 4.5, 4.3, 4.2, 4.35, 4.27],
    goodUp: false,
  },
  {
    key: "dispersion",
    name: "Indice de Dispersion des Prix",
    formula: "D(t) = σ(P) / μ(P)",
    value: "0.34",
    change24h: -0.5,
    change7d: 1.1,
    description: "Écart des prix entre les produits.",
    definition:
      "Mesure à quel point les prix des produits sont dispersés autour de la moyenne. Une dispersion élevée suggère de grandes différences entre les produits bon marché et les produits chers.",
    spark: [0.33, 0.34, 0.35, 0.34, 0.36, 0.35, 0.34, 0.345, 0.34],
    goodUp: false,
  },
  {
    key: "pricewar",
    name: "Indice de Guerre des Prix",
    formula: "W(t) = (1/N) × Σ|(Pi,t / Pi,t−1) − 1|",
    value: "6.1%",
    change24h: 3.4,
    change7d: 5.7,
    description: "Intensité de la concurrence tarifaire.",
    definition:
      "Mesure l'intensité des comportements de prix concurrentiels. Des valeurs élevées indiquent des ajustements de prix agressifs et de potentielles guerres de prix entre vendeurs.",
    spark: up(5.2, 6.1),
    goodUp: false,
  },
  {
    key: "promo",
    name: "Indice de Pression Promotionnelle",
    formula: "PP(t) = (Produits en baisse de prix) / N",
    value: "18.3%",
    change24h: 1.2,
    change7d: 6.8,
    description: "Activité promotionnelle du marché.",
    definition:
      "Mesure la proportion de produits actuellement en baisse de prix. C'est un indicateur utile de l'activité promotionnelle et des campagnes de remises.",
    spark: up(15.1, 18.3),
    goodUp: false,
  },
  {
    key: "increase",
    name: "Indice de Hausse des Prix",
    formula: "PH(t) = (Produits en hausse de prix) / N",
    value: "12.6%",
    change24h: 0.8,
    change7d: 3.1,
    description: "Pression haussière sur les prix.",
    definition:
      "Mesure la part des produits dont les prix ont augmenté. Il reflète la pression haussière sur les prix au sein du marché.",
    spark: up(11.4, 12.6),
    goodUp: false,
  },
  {
    key: "stability",
    name: "Indice de Stabilité des Prix",
    formula: "S(t) = 1 − (SKUs modifiés / N)",
    value: "74.2%",
    change24h: -0.4,
    change7d: -2.2,
    description: "Stabilité globale des prix.",
    definition:
      "Mesure la proportion de produits dont les prix sont restés inchangés. Des valeurs élevées indiquent un marché plus stable et plus prévisible.",
    spark: [77.1, 76.4, 75.8, 75.2, 74.9, 74.6, 74.4, 74.3, 74.2],
    goodUp: true,
  },
  {
    key: "churn",
    name: "Indice de Renouvellement Produits",
    formula: "C(t) = (Nouveaux SKUs) / N",
    value: "3.4%",
    change24h: 0.6,
    change7d: 1.9,
    description: "Arrivée de nouveaux produits.",
    definition:
      "Mesure le rythme auquel de nouveaux produits entrent sur le marché. Il aide à suivre le dynamisme de la marketplace et l'innovation produit.",
    spark: up(2.7, 3.4),
    goodUp: true,
  },
  {
    key: "exit",
    name: "Indice de Sortie de Produits",
    formula: "E(t) = (SKUs retirés) / N",
    value: "2.1%",
    change24h: 0.2,
    change7d: 0.7,
    description: "Retrait de produits du marché.",
    definition:
      "Mesure le rythme auquel les produits disparaissent du catalogue suivi. Il peut signaler des ruptures de stock, des arrêts de produits ou une rotation du catalogue.",
    spark: up(1.8, 2.1),
    goodUp: false,
  },
  {
    key: "competitiveness",
    name: "Indice de Compétitivité",
    formula: "CI(t) = Σ|Pi,t − Pi,t−1| / ΣPi,t−1",
    value: "5.8%",
    change24h: 1.5,
    change7d: 2.4,
    description: "Intensité concurrentielle globale.",
    definition:
      "Mesure l'intensité globale de la concurrence par les prix sur le marché. Des valeurs plus élevées suggèrent un comportement concurrentiel plus agressif entre les vendeurs.",
    spark: up(5.1, 5.8),
    goodUp: false,
  },
  {
    key: "convergence",
    name: "Indice de Convergence du Marché",
    formula: "K(t) = 1 − σ(P) / μ(P)",
    value: "0.66",
    change24h: 0.3,
    change7d: 1.2,
    description: "Maturité et cohérence des prix.",
    definition:
      "Mesure le degré de convergence des prix vers un niveau commun. Des valeurs élevées indiquent généralement un marché plus mature et plus efficient.",
    spark: up(0.63, 0.66),
    goodUp: true,
  },
];

/* Section 3 — évolution des indices par catégorie (12 mois) */
export const categoryColors: Record<string, string> = {
  "Électronique": "var(--accent)",
  "Mode": "var(--accent-2)",
  "Maison & Déco": "var(--good)",
  "Alimentation": "var(--warn)",
  "Beauté": "#E11D74",
  "Sport": "#0EA5E9",
  "Automobile": "var(--accent-3)",
};

export const categories = Object.keys(categoryColors);

const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];

export const categoryTrends = months.map((month, i) => ({
  month,
  "Électronique": Math.round((100 + i * 1.1 + Math.sin(i / 2) * 1.5) * 10) / 10,
  "Mode": Math.round((100 + i * 0.6 + Math.cos(i / 2) * 2) * 10) / 10,
  "Maison & Déco": Math.round((100 + i * 0.4 + Math.sin(i / 3) * 1.2) * 10) / 10,
  "Alimentation": Math.round((100 + i * 1.4 + Math.cos(i / 1.8) * 1) * 10) / 10,
  "Beauté": Math.round((100 + i * 0.8 + Math.sin(i / 2.4) * 1.8) * 10) / 10,
  "Sport": Math.round((100 + i * 0.5 + Math.cos(i / 2.2) * 1.3) * 10) / 10,
  "Automobile": Math.round((100 + i * 0.3 + Math.sin(i / 4) * 0.9) * 10) / 10,
}));

/* Indice composite global présenté comme ligne du tableau récapitulatif */
export const summaryRows: Indicator[] = [
  {
    key: "global",
    name: "Indice du Marché E-Commerce Tunisien",
    formula: "100 × (1 + (0.30·Infl + 0.20·Vol + 0.20·Guerre + 0.15·Disp + 0.15·Renouv.))",
    value: globalIndex.value.toFixed(1),
    change24h: globalIndex.daily,
    change7d: globalIndex.weekly,
    description: "Santé et dynamique globales du marché e-commerce tunisien.",
    definition: globalIndex.definition,
    spark: [],
    goodUp: true,
  },
  ...indicators,
];
