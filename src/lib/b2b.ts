/* ----------------------------------------------------------------------------
   1111.tn — B2B Price Intelligence platform (by Galylio)
   Mock data modelling the Tunisian e-commerce market (60+ sites tracked).
   Prices are in TND (Tunisian Dinar).
---------------------------------------------------------------------------- */

export const BRAND = {
  name: "1111.tn",
  tagline: "Price Intelligence",
  company: "Galylio",
  market: "Tunisian e-commerce — 62 sites tracked",
};

export type Site = { name: string; color: string; letter: string; logo: string };

/* Real Tunisian electronics retailers — logos in /public/stores */
export const sites: Site[] = [
  { name: "Mytek", color: "#E2001A", letter: "M", logo: "/stores/mytek.png" },
  { name: "Tunisianet", color: "#0A6CB5", letter: "T", logo: "/stores/tunisianet.png" },
  { name: "Spacenet", color: "#F36F21", letter: "S", logo: "/stores/spacenet.png" },
  { name: "Zoom", color: "#E11D74", letter: "Z", logo: "/stores/zoom.jpg" },
  { name: "Batam", color: "#0EA5E9", letter: "B", logo: "/stores/batam.jpg" },
  { name: "Darty", color: "#64748B", letter: "D", logo: "/stores/darty.png" },
];

export const sectors = [
  "Électronique",
  "Mode",
  "Maison",
  "Alimentation",
  "Beauté",
];

/* ---- Dashboard KPIs ---- */
export const b2bKpis = [
  { label: "Sites trackés", value: "62", delta: "+4", up: true, hint: "vs last month" },
  { label: "Produits suivis", value: "1,248", delta: "+86", up: true, hint: "in your watchlist" },
  { label: "Changements de prix", value: "327", delta: "+12.4%", up: true, hint: "today" },
  { label: "Score compétitivité", value: "78", delta: "+3 pts", up: true, hint: "market avg" },
];

/* ---- Market price index (last 30 days) — dashboard hero chart ---- */
export const priceIndex = Array.from({ length: 30 }, (_, i) => {
  const base = 100 + Math.sin(i / 3) * 4 + i * 0.25;
  return {
    day: i + 1,
    market: Math.round(base * 10) / 10,
    you: Math.round((base - 3 - Math.cos(i / 4) * 1.5) * 10) / 10,
  };
});

export const priceIndexPeak = {
  day: 18,
  label: "Indice marché",
  value: priceIndex[17].market.toFixed(1),
  sub: "26 mai",
};

/* ---- Recent price changes feed ---- */
export type PriceChange = {
  product: string;
  brand: string;
  site: string;
  oldPrice: number;
  newPrice: number;
  time: string;
};

export const priceChanges: PriceChange[] = [
  { product: "iPhone 15 Pro 256GB", brand: "Apple", site: "Mytek", oldPrice: 4699, newPrice: 4499, time: "2 min" },
  { product: "Galaxy S24 Ultra", brand: "Samsung", site: "Tunisianet", oldPrice: 4150, newPrice: 4290, time: "14 min" },
  { product: "Redmi Note 13 Pro", brand: "Xiaomi", site: "Zoom", oldPrice: 1099, newPrice: 949, time: "38 min" },
  { product: 'MacBook Air M3 13"', brand: "Apple", site: "Spacenet", oldPrice: 5899, newPrice: 5699, time: "1 h" },
  { product: "HP Pavilion 15", brand: "HP", site: "Batam", oldPrice: 2399, newPrice: 2499, time: "2 h" },
  { product: "AirPods Pro 2", brand: "Apple", site: "Darty", oldPrice: 899, newPrice: 799, time: "3 h" },
  { product: "LG OLED C3 55\"", brand: "LG", site: "Mytek", oldPrice: 4299, newPrice: 3999, time: "4 h" },
];

/* ---- Top movers (biggest swings) ---- */
export const topMovers = [
  { product: "Redmi Note 13 Pro", site: "Zoom", deltaPct: -13.6 },
  { product: "AirPods Pro 2", site: "Darty", deltaPct: -11.1 },
  { product: 'LG OLED C3 55"', site: "Mytek", deltaPct: -7.0 },
  { product: "Galaxy S24 Ultra", site: "Tunisianet", deltaPct: +3.4 },
  { product: "HP Pavilion 15", site: "Batam", deltaPct: +4.2 },
];

/* ---- Promotions detected ---- */
export const promotions = [
  { product: "iPhone 15 Pro", site: "Mytek", tag: "Vente Flash", discount: "-15%" },
  { product: "Galaxy Buds 2", site: "Zoom", tag: "Soldes", discount: "-30%" },
  { product: "Dell XPS 13", site: "Spacenet", tag: "Code Promo", discount: "-10%" },
];

/* ---- Catalog products ---- */
export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  lowest: number;
  highest: number;
  sites: number;
  competitiveness: number; // 0-100
  inStock: boolean;
  spark: number[];
};

export const products: Product[] = [
  { id: "p1", name: "iPhone 15 Pro 256GB", brand: "Apple", category: "Smartphones", lowest: 4499, highest: 4899, sites: 6, competitiveness: 92, inStock: true, spark: [4699, 4699, 4650, 4600, 4550, 4499, 4499] },
  { id: "p2", name: "Galaxy S24 Ultra", brand: "Samsung", category: "Smartphones", lowest: 4150, highest: 4490, sites: 5, competitiveness: 81, inStock: true, spark: [4090, 4120, 4150, 4150, 4200, 4250, 4290] },
  { id: "p3", name: "Redmi Note 13 Pro", brand: "Xiaomi", category: "Smartphones", lowest: 949, highest: 1199, sites: 6, competitiveness: 95, inStock: true, spark: [1099, 1099, 1050, 1020, 990, 960, 949] },
  { id: "p4", name: 'MacBook Air M3 13"', brand: "Apple", category: "Laptops", lowest: 5699, highest: 6199, sites: 4, competitiveness: 74, inStock: true, spark: [5899, 5899, 5850, 5800, 5750, 5699, 5699] },
  { id: "p5", name: "HP Pavilion 15", brand: "HP", category: "Laptops", lowest: 2399, highest: 2699, sites: 5, competitiveness: 68, inStock: false, spark: [2399, 2399, 2420, 2450, 2470, 2499, 2499] },
  { id: "p6", name: 'LG OLED C3 55"', brand: "LG", category: "TV", lowest: 3999, highest: 4599, sites: 3, competitiveness: 88, inStock: true, spark: [4299, 4299, 4250, 4150, 4050, 3999, 3999] },
  { id: "p7", name: "AirPods Pro 2", brand: "Apple", category: "Audio", lowest: 799, highest: 999, sites: 6, competitiveness: 90, inStock: true, spark: [899, 899, 870, 850, 820, 799, 799] },
  { id: "p8", name: "Dell XPS 13", brand: "Dell", category: "Laptops", lowest: 4299, highest: 4799, sites: 3, competitiveness: 71, inStock: true, spark: [4399, 4399, 4350, 4320, 4310, 4299, 4299] },
];

export const brands = [
  { name: "Apple", products: 142, share: 28, color: "var(--accent)" },
  { name: "Samsung", products: 118, share: 23, color: "var(--accent-2)" },
  { name: "Xiaomi", products: 96, share: 18, color: "var(--good)" },
  { name: "HP", products: 64, share: 13, color: "var(--warn)" },
  { name: "LG", products: 52, share: 10, color: "var(--accent-3)" },
  { name: "Dell", products: 41, share: 8, color: "var(--danger)" },
];

export const categories = [
  { name: "Smartphones", products: 312, newThisWeek: 8 },
  { name: "Laptops", products: 248, newThisWeek: 5 },
  { name: "TV & Audio", products: 196, newThisWeek: 3 },
  { name: "Électroménager", products: 184, newThisWeek: 6 },
  { name: "Gaming", products: 142, newThisWeek: 4 },
  { name: "Accessoires", products: 166, newThisWeek: 11 },
];

/* ---- Multi-site comparison (single product) ---- */
export const comparison = {
  product: "iPhone 15 Pro 256GB",
  brand: "Apple",
  category: "Smartphones",
  rows: [
    { site: "Mytek", price: 4499, stock: true, delivery: "24h", promo: "Vente Flash", best: true },
    { site: "Darty", price: 4550, stock: true, delivery: "48h", promo: null, best: false },
    { site: "Tunisianet", price: 4599, stock: true, delivery: "24h", promo: null, best: false },
    { site: "Zoom", price: 4690, stock: true, delivery: "3-5j", promo: null, best: false },
    { site: "Spacenet", price: 4799, stock: false, delivery: "—", promo: null, best: false },
    { site: "Batam", price: 4899, stock: true, delivery: "48h", promo: null, best: false },
  ],
  history: Array.from({ length: 14 }, (_, i) => ({
    day: i + 1,
    Mytek: 4699 - i * 14 - (i > 8 ? 30 : 0),
    Tunisianet: 4650 - i * 4,
    Zoom: 4720 - i * 2,
  })),
};

/* ---- Alerts / watchlist ---- */
export const watchlist = [
  { name: "Smartphones — Apple", sites: 6, products: 142, rule: "Prix < marché −5%", active: true },
  { name: "Laptops — gaming", sites: 4, products: 64, rule: "Toute baisse de prix", active: true },
  { name: "TV — LG & Samsung", sites: 3, products: 38, rule: "Rupture de stock", active: false },
  { name: "Audio — concurrents", sites: 5, products: 51, rule: "Nouveau concurrent", active: true },
];

export const alertFeed = [
  { type: "price", title: "iPhone 15 Pro a baissé de 4 %", site: "Mytek", time: "2 min", color: "var(--good)" },
  { type: "stock", title: "HP Pavilion 15 en rupture de stock", site: "Batam", time: "1 h", color: "var(--danger)" },
  { type: "new", title: "Nouveau concurrent détecté sur Galaxy S24", site: "Darty", time: "3 h", color: "var(--accent)" },
  { type: "seo", title: "Tunisianet a modifié ses méta-descriptions", site: "Tunisianet", time: "5 h", color: "var(--warn)" },
  { type: "promo", title: "Vente flash détectée — AirPods Pro 2", site: "Zoom", time: "Hier", color: "var(--accent-2)" },
];

/* ---- Analytics / BI ---- */
export const heatmap = {
  cats: ["Smartphones", "Laptops", "TV", "Audio", "Gaming"],
  sites: ["Mytek", "Tunisianet", "Zoom", "Spacenet", "Batam"],
  // price index 100 = market avg; <100 cheaper, >100 pricier
  data: [
    [96, 101, 94, 103, 108],
    [99, 97, 105, 100, 110],
    [92, 104, 98, 107, 106],
    [95, 100, 91, 102, 109],
    [101, 96, 99, 104, 112],
  ],
};

export const marketTrend = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"][i],
  electronique: 100 + Math.sin(i / 2) * 6 - i * 0.4,
  mode: 100 + Math.cos(i / 2) * 4 + i * 0.2,
}));

export const stabilityIndex = [
  { site: "Mytek", stability: 88, volatility: "Stable" },
  { site: "Tunisianet", stability: 72, volatility: "Modérée" },
  { site: "Zoom", stability: 54, volatility: "Volatile" },
  { site: "Spacenet", stability: 81, volatility: "Stable" },
  { site: "Batam", stability: 63, volatility: "Modérée" },
];

export const marketShare = [
  { name: "Mytek", pct: 24, color: "var(--accent)" },
  { name: "Tunisianet", pct: 21, color: "var(--accent-2)" },
  { name: "Zoom", pct: 19, color: "var(--good)" },
  { name: "Spacenet", pct: 14, color: "var(--warn)" },
  { name: "Autres", pct: 22, color: "var(--surface-3)" },
];

/* ---- SEO intelligence ---- */
export const seoScores = [
  { site: "Mytek", score: 84, titles: 92, meta: 78, keywords: 81 },
  { site: "Tunisianet", score: 79, titles: 85, meta: 74, keywords: 78 },
  { site: "Zoom", score: 88, titles: 90, meta: 86, keywords: 88 },
  { site: "Spacenet", score: 71, titles: 76, meta: 68, keywords: 69 },
  { site: "Vous (1111)", score: 76, titles: 80, meta: 72, keywords: 75 },
];

export const keywordOpportunities = [
  { keyword: "iphone 15 pro tunisie prix", volume: "8.1k", difficulty: "Faible", used: false },
  { keyword: "galaxy s24 ultra pas cher", volume: "5.4k", difficulty: "Moyenne", used: false },
  { keyword: "macbook air m3 promo", volume: "3.2k", difficulty: "Faible", used: true },
  { keyword: "tv oled 55 pouces tunisie", volume: "2.9k", difficulty: "Élevée", used: false },
  { keyword: "ecouteurs sans fil meilleur prix", volume: "4.7k", difficulty: "Moyenne", used: false },
];

export const seoChanges = [
  { site: "Tunisianet", change: "Méta-description modifiée sur 24 fiches", time: "5 h" },
  { site: "Zoom", change: "Nouveaux titres optimisés — catégorie TV", time: "1 j" },
  { site: "Mytek", change: "Balises H1 mises à jour sur 12 produits", time: "2 j" },
];

/* ---- Suppliers ---- */
export const suppliers = [
  { name: "Distributeur A", products: 412, avgPrice: "Compétitif", reliability: 94, lead: "3-5 j" },
  { name: "Grossiste Tech TN", products: 286, avgPrice: "Bas", reliability: 88, lead: "2-4 j" },
  { name: "Import Direct", products: 198, avgPrice: "Très bas", reliability: 76, lead: "7-10 j" },
  { name: "Distributeur Premium", products: 154, avgPrice: "Élevé", reliability: 97, lead: "24-48h" },
];

/* ---- Team / multi-users ---- */
export const team = [
  { name: "Bessie Cooper", email: "bessie@galylio.com", role: "Administrateur", initials: "BC", color: "#49885b", online: true },
  { name: "Cody Fisher", email: "cody@galylio.com", role: "Analyste", initials: "CF", color: "#00A859", online: true },
  { name: "Jenny Wilson", email: "jenny@galylio.com", role: "Analyste", initials: "JW", color: "#FF2D78", online: false },
  { name: "Robert Fox", email: "robert@galylio.com", role: "Lecteur", initials: "RF", color: "#F68B1E", online: false },
];

export const roles = [
  { name: "Administrateur", desc: "Accès complet, gestion équipe & facturation", count: 1 },
  { name: "Analyste", desc: "Crée des watchlists, alertes et exports", count: 2 },
  { name: "Lecteur", desc: "Consultation des dashboards en lecture seule", count: 1 },
];

/* ---- Subscription plans ---- */
export const plans = [
  {
    name: "Starter",
    target: "TPE / Indépendants",
    price: "49",
    features: ["3 sites trackés", "50 produits suivis", "Alertes e-mail", "Historique 30 jours"],
    highlight: false,
  },
  {
    name: "Pro",
    target: "PME / E-commerçants",
    price: "149",
    features: ["15 sites trackés", "500 produits suivis", "Analytics avancés", "Export CSV / Excel", "Historique 6 mois"],
    highlight: true,
  },
  {
    name: "Business",
    target: "Grandes enseignes / Distributeurs",
    price: "399",
    features: ["Sites illimités", "Intelligence SEO", "Accès API REST", "Multi-utilisateurs", "Historique 2 ans"],
    highlight: false,
  },
  {
    name: "Enterprise",
    target: "Groupes / Agences",
    price: "Sur devis",
    features: ["White-label", "SLA garanti", "Intégration ERP / PIM", "Accompagnement dédié"],
    highlight: false,
  },
];

export function fmtTND(n: number) {
  return `${n.toLocaleString("fr-FR")} TND`;
}
