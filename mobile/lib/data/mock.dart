import 'dart:math';
import 'package:flutter/material.dart';

String fmtTND(num n) {
  final s = n.toStringAsFixed(0);
  final b = StringBuffer();
  for (int i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 == 0) b.write(' ');
    b.write(s[i]);
  }
  return '${b.toString()} TND';
}

class Site {
  final String name;
  final Color color;
  final String logo;
  const Site(this.name, this.color, this.logo);
}

const sites = <Site>[
  Site('Mytek', Color(0xFFE2001A), 'assets/stores/mytek.png'),
  Site('Tunisianet', Color(0xFF0A6CB5), 'assets/stores/tunisianet.png'),
  Site('Spacenet', Color(0xFFF36F21), 'assets/stores/spacenet.png'),
  Site('Zoom', Color(0xFFE11D74), 'assets/stores/zoom.jpg'),
  Site('Batam', Color(0xFF0EA5E9), 'assets/stores/batam.jpg'),
  Site('Darty', Color(0xFF64748B), 'assets/stores/darty.png'),
];

Site siteOf(String name) =>
    sites.firstWhere((s) => s.name == name, orElse: () => sites.first);

const sectors = ['Électronique', 'Mode', 'Maison', 'Alimentation', 'Beauté'];

class Kpi {
  final String label, value, delta;
  final bool up;
  const Kpi(this.label, this.value, this.delta, this.up);
}

const b2bKpis = <Kpi>[
  Kpi('Sites trackés', '62', '+4', true),
  Kpi('Produits suivis', '1 248', '+86', true),
  Kpi('Changements de prix', '327', '+12.4%', true),
  Kpi('Score compétitivité', '78', '+3 pts', true),
];

// Market price index (30 pts): market vs you
final priceIndex = List.generate(30, (i) {
  final base = 100 + sin(i / 3) * 4 + i * 0.25;
  return {
    'day': i + 1,
    'market': (base * 10).round() / 10,
    'you': ((base - 3 - cos(i / 4) * 1.5) * 10).round() / 10,
  };
});

class PriceChange {
  final String product, brand, site, time;
  final int oldPrice, newPrice;
  const PriceChange(this.product, this.brand, this.site, this.oldPrice, this.newPrice, this.time);
  double get delta => (newPrice - oldPrice) / oldPrice * 100;
}

const priceChanges = <PriceChange>[
  PriceChange('iPhone 15 Pro 256GB', 'Apple', 'Mytek', 4699, 4499, '2 min'),
  PriceChange('Galaxy S24 Ultra', 'Samsung', 'Tunisianet', 4150, 4290, '14 min'),
  PriceChange('Redmi Note 13 Pro', 'Xiaomi', 'Zoom', 1099, 949, '38 min'),
  PriceChange('MacBook Air M3 13"', 'Apple', 'Spacenet', 5899, 5699, '1 h'),
  PriceChange('HP Pavilion 15', 'HP', 'Batam', 2399, 2499, '2 h'),
  PriceChange('AirPods Pro 2', 'Apple', 'Darty', 899, 799, '3 h'),
  PriceChange('LG OLED C3 55"', 'LG', 'Mytek', 4299, 3999, '4 h'),
];

class Mover {
  final String product, site;
  final double deltaPct;
  const Mover(this.product, this.site, this.deltaPct);
}

const topMovers = <Mover>[
  Mover('Redmi Note 13 Pro', 'Zoom', -13.6),
  Mover('AirPods Pro 2', 'Darty', -11.1),
  Mover('LG OLED C3 55"', 'Mytek', -7.0),
  Mover('Galaxy S24 Ultra', 'Tunisianet', 3.4),
  Mover('HP Pavilion 15', 'Batam', 4.2),
];

class Promo {
  final String product, site, tag, discount;
  const Promo(this.product, this.site, this.tag, this.discount);
}

const promotions = <Promo>[
  Promo('iPhone 15 Pro', 'Mytek', 'Vente Flash', '-15%'),
  Promo('Galaxy Buds 2', 'Zoom', 'Soldes', '-30%'),
  Promo('Dell XPS 13', 'Spacenet', 'Code Promo', '-10%'),
];

class Product {
  final String name, brand, category;
  final int lowest, sites;
  final int competitiveness;
  final bool inStock;
  final List<double> spark;
  const Product(this.name, this.brand, this.category, this.lowest, this.sites, this.competitiveness, this.inStock, this.spark);
}

const products = <Product>[
  Product('iPhone 15 Pro 256GB', 'Apple', 'Smartphones', 4499, 6, 92, true, [4699, 4699, 4650, 4600, 4550, 4499, 4499]),
  Product('Galaxy S24 Ultra', 'Samsung', 'Smartphones', 4150, 5, 81, true, [4090, 4120, 4150, 4150, 4200, 4250, 4290]),
  Product('Redmi Note 13 Pro', 'Xiaomi', 'Smartphones', 949, 6, 95, true, [1099, 1099, 1050, 1020, 990, 960, 949]),
  Product('MacBook Air M3 13"', 'Apple', 'Laptops', 5699, 4, 74, true, [5899, 5899, 5850, 5800, 5750, 5699, 5699]),
  Product('HP Pavilion 15', 'HP', 'Laptops', 2399, 5, 68, false, [2399, 2399, 2420, 2450, 2470, 2499, 2499]),
  Product('LG OLED C3 55"', 'LG', 'TV', 3999, 3, 88, true, [4299, 4299, 4250, 4150, 4050, 3999, 3999]),
  Product('AirPods Pro 2', 'Apple', 'Audio', 799, 6, 90, true, [899, 899, 870, 850, 820, 799, 799]),
  Product('Dell XPS 13', 'Dell', 'Laptops', 4299, 3, 71, true, [4399, 4399, 4350, 4320, 4310, 4299, 4299]),
];

class Brand {
  final String name;
  final int products, share;
  final Color color;
  const Brand(this.name, this.products, this.share, this.color);
}

List<Brand> brands(BuildContext ctx) {
  return const [
    Brand('Apple', 142, 28, Color(0xFF49885B)),
    Brand('Samsung', 118, 23, Color(0xFF5EA372)),
    Brand('Xiaomi', 96, 18, Color(0xFF22C993)),
    Brand('HP', 64, 13, Color(0xFFF7A23B)),
    Brand('LG', 52, 10, Color(0xFF9FCFA9)),
    Brand('Dell', 41, 8, Color(0xFFF76B6B)),
  ];
}

class Category {
  final String name;
  final int products, newThisWeek;
  const Category(this.name, this.products, this.newThisWeek);
}

const categories = <Category>[
  Category('Smartphones', 312, 8),
  Category('Laptops', 248, 5),
  Category('TV & Audio', 196, 3),
  Category('Électroménager', 184, 6),
  Category('Gaming', 142, 4),
];

class CompRow {
  final String site, delivery;
  final int price;
  final bool stock, best;
  final String? promo;
  const CompRow(this.site, this.price, this.stock, this.delivery, this.promo, this.best);
}

const comparisonProduct = 'iPhone 15 Pro 256GB';
const comparisonRows = <CompRow>[
  CompRow('Mytek', 4499, true, '24h', 'Vente Flash', true),
  CompRow('Darty', 4550, true, '48h', null, false),
  CompRow('Tunisianet', 4599, true, '24h', null, false),
  CompRow('Zoom', 4690, true, '3-5j', null, false),
  CompRow('Spacenet', 4799, false, '—', null, false),
  CompRow('Batam', 4899, true, '48h', null, false),
];

final comparisonHistory = List.generate(14, (i) => {
      'day': i + 1,
      'Mytek': (4699 - i * 14 - (i > 8 ? 30 : 0)).toDouble(),
      'Tunisianet': (4650 - i * 4).toDouble(),
      'Zoom': (4720 - i * 2).toDouble(),
    });

class Watch {
  final String name, rule;
  final int sites, products;
  final bool active;
  const Watch(this.name, this.sites, this.products, this.rule, this.active);
}

const watchlist = <Watch>[
  Watch('Smartphones — Apple', 6, 142, 'Prix < marché −5%', true),
  Watch('Laptops — gaming', 4, 64, 'Toute baisse de prix', true),
  Watch('TV — LG & Samsung', 3, 38, 'Rupture de stock', false),
  Watch('Audio — concurrents', 5, 51, 'Nouveau concurrent', true),
];

class Alert {
  final String title, site, time;
  final Color color;
  const Alert(this.title, this.site, this.time, this.color);
}

const _g = Color(0xFF22C993), _r = Color(0xFFF76B6B), _a = Color(0xFF49885B), _w = Color(0xFFF7A23B), _a2 = Color(0xFF5EA372);
const alertFeed = <Alert>[
  Alert('iPhone 15 Pro a baissé de 4 %', 'Mytek', '2 min', _g),
  Alert('HP Pavilion 15 en rupture de stock', 'Batam', '1 h', _r),
  Alert('Nouveau concurrent sur Galaxy S24', 'Darty', '3 h', _a),
  Alert('Tunisianet a modifié ses méta-descriptions', 'Tunisianet', '5 h', _w),
  Alert('Vente flash détectée — AirPods Pro 2', 'Zoom', 'Hier', _a2),
];

// Heatmap: price index 100 = market avg
const heatmapCats = ['Smartphones', 'Laptops', 'TV', 'Audio', 'Gaming'];
const heatmapSites = ['Mytek', 'Tunisianet', 'Zoom', 'Spacenet', 'Batam'];
const heatmapData = [
  [96, 101, 94, 103, 108],
  [99, 97, 105, 100, 110],
  [92, 104, 98, 107, 106],
  [95, 100, 91, 102, 109],
  [101, 96, 99, 104, 112],
];

final marketTrend = List.generate(12, (i) {
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
  return {
    'month': months[i],
    'electronique': 100 + sin(i / 2) * 6 - i * 0.4,
    'mode': 100 + cos(i / 2) * 4 + i * 0.2,
  };
});

class Stability {
  final String site, volatility;
  final int stability;
  const Stability(this.site, this.stability, this.volatility);
}

const stabilityIndex = <Stability>[
  Stability('Mytek', 88, 'Stable'),
  Stability('Tunisianet', 72, 'Modérée'),
  Stability('Zoom', 54, 'Volatile'),
  Stability('Spacenet', 81, 'Stable'),
  Stability('Batam', 63, 'Modérée'),
];

class Share {
  final String name;
  final int pct;
  final Color color;
  const Share(this.name, this.pct, this.color);
}

const marketShare = <Share>[
  Share('Mytek', 24, Color(0xFF49885B)),
  Share('Tunisianet', 21, Color(0xFF5EA372)),
  Share('Zoom', 19, Color(0xFF22C993)),
  Share('Spacenet', 14, Color(0xFFF7A23B)),
  Share('Autres', 22, Color(0xFF9FCFA9)),
];

class SeoScore {
  final String site;
  final int score, titles, meta, keywords;
  final bool you;
  const SeoScore(this.site, this.score, this.titles, this.meta, this.keywords, this.you);
}

const seoScores = <SeoScore>[
  SeoScore('Mytek', 84, 92, 78, 81, false),
  SeoScore('Tunisianet', 79, 85, 74, 78, false),
  SeoScore('Zoom', 88, 90, 86, 88, false),
  SeoScore('Spacenet', 71, 76, 68, 69, false),
  SeoScore('Vous (1111)', 76, 80, 72, 75, true),
];

class Keyword {
  final String keyword, volume, difficulty;
  final bool used;
  const Keyword(this.keyword, this.volume, this.difficulty, this.used);
}

const keywordOpportunities = <Keyword>[
  Keyword('iphone 15 pro tunisie prix', '8.1k', 'Faible', false),
  Keyword('galaxy s24 ultra pas cher', '5.4k', 'Moyenne', false),
  Keyword('macbook air m3 promo', '3.2k', 'Faible', true),
  Keyword('tv oled 55 pouces tunisie', '2.9k', 'Élevée', false),
  Keyword('ecouteurs sans fil meilleur prix', '4.7k', 'Moyenne', false),
];

class SeoChange {
  final String site, change, time;
  const SeoChange(this.site, this.change, this.time);
}

const seoChanges = <SeoChange>[
  SeoChange('Tunisianet', 'Méta-description modifiée sur 24 fiches', '5 h'),
  SeoChange('Zoom', 'Nouveaux titres optimisés — catégorie TV', '1 j'),
  SeoChange('Mytek', 'Balises H1 mises à jour sur 12 produits', '2 j'),
];

class Supplier {
  final String name, avgPrice, lead;
  final int products, reliability;
  const Supplier(this.name, this.products, this.avgPrice, this.reliability, this.lead);
}

const suppliers = <Supplier>[
  Supplier('Distributeur A', 412, 'Compétitif', 94, '3-5 j'),
  Supplier('Grossiste Tech TN', 286, 'Bas', 88, '2-4 j'),
  Supplier('Import Direct', 198, 'Très bas', 76, '7-10 j'),
  Supplier('Distributeur Premium', 154, 'Élevé', 97, '24-48h'),
];

class Member {
  final String name, email, role, initials;
  final Color color;
  final bool online;
  const Member(this.name, this.email, this.role, this.initials, this.color, this.online);
}

const team = <Member>[
  Member('Bessie Cooper', 'bessie@galylio.com', 'Administrateur', 'BC', Color(0xFF49885B), true),
  Member('Cody Fisher', 'cody@galylio.com', 'Analyste', 'CF', Color(0xFF22C993), true),
  Member('Jenny Wilson', 'jenny@galylio.com', 'Analyste', 'JW', Color(0xFFE11D74), false),
  Member('Robert Fox', 'robert@galylio.com', 'Lecteur', 'RF', Color(0xFFF7A23B), false),
];

class Role {
  final String name, desc;
  final int count;
  const Role(this.name, this.desc, this.count);
}

const roles = <Role>[
  Role('Administrateur', 'Accès complet, gestion équipe & facturation', 1),
  Role('Analyste', 'Crée des watchlists, alertes et exports', 2),
  Role('Lecteur', 'Consultation des dashboards en lecture seule', 1),
];

class Plan {
  final String name, target, price;
  final List<String> features;
  final bool highlight;
  const Plan(this.name, this.target, this.price, this.features, this.highlight);
}

const plans = <Plan>[
  Plan('Starter', 'TPE / Indépendants', '49', ['3 sites trackés', '50 produits suivis', 'Alertes e-mail', 'Historique 30 jours'], false),
  Plan('Pro', 'PME / E-commerçants', '149', ['15 sites trackés', '500 produits suivis', 'Analytics avancés', 'Export CSV / Excel', 'Historique 6 mois'], true),
  Plan('Business', 'Grandes enseignes', '399', ['Sites illimités', 'Intelligence SEO', 'Accès API REST', 'Multi-utilisateurs', 'Historique 2 ans'], false),
  Plan('Enterprise', 'Groupes / Agences', 'Sur devis', ['White-label', 'SLA garanti', 'Intégration ERP / PIM', 'Accompagnement dédié'], false),
];

/* ----------------------------------------------------------------------------
   Indices du marché — indicateurs d'intelligence calculés quotidiennement
   à partir de plus de 15 000 SKUs e-commerce tunisiens.
---------------------------------------------------------------------------- */

class GlobalIndex {
  final String title, subtitle, formula, description;
  final double value, daily, weekly;
  const GlobalIndex(this.title, this.subtitle, this.value, this.daily, this.weekly, this.formula, this.description);
}

const globalIndex = GlobalIndex(
  'Indice du Marché E-Commerce Tunisien',
  'Composite global',
  112.4,
  0.6,
  2.1,
  'Indice Global = 100 × (1 + (0.30·Inflation + 0.20·Volatilité + 0.20·Guerre + 0.15·Dispersion + 0.15·Renouv.))',
  "Indicateur composite combinant inflation, volatilité, pression concurrentielle, dispersion des prix et rotation des produits en un score unique.",
);

// Série 30 jours pour le graphique vedette.
final globalIndexSeries = List.generate(30, (i) {
  final base = 107.5 + i * 0.17 + sin(i / 2.5) * 1.4 + cos(i / 6) * 0.7;
  return {'day': i + 1, 'value': (base * 10).round() / 10};
});

class Indicator {
  final String key, name, formula, value, description, definition;
  final double change24h, change7d;
  final List<double> spark;
  final bool goodUp; // si vrai, une hausse est positive (vert)
  const Indicator(this.key, this.name, this.formula, this.value, this.change24h,
      this.change7d, this.description, this.definition, this.spark, this.goodUp);
}

// Série 9 pts interpolée linéairement entre start et end (avec léger bruit).
List<double> _up(double start, double end, [int n = 9]) => List.generate(
    n, (i) => ((start + (end - start) * (i / (n - 1)) + sin(i.toDouble()) * ((end - start).abs() * 0.06)) * 100).round() / 100);

const _defPrice =
    "Mesure l'évolution globale des prix de l'ensemble des produits suivis par rapport à la période de référence. Il offre une vue d'ensemble de l'évolution du niveau de prix du marché e-commerce dans le temps.";

final indicators = <Indicator>[
  Indicator('price', 'Indice Global des Prix', 'I(t) = (1/N) × Σ(Pi,t / Pi,0) × 100', '112.4', 0.6, 2.1,
      'Évolution globale des prix du marché.', _defPrice, _up(108.2, 112.4), true),
  Indicator('inflation', "Indice d'Inflation E-Commerce", 'π(t) = (I(t) − I(t−1)) / I(t−1)', '1.84%', 0.9, 4.2,
      'Rythme de hausse ou de baisse des prix.',
      "Mesure le rythme auquel les prix e-commerce augmentent ou diminuent entre deux périodes consécutives. Il agit comme un indicateur d'inflation propre au marché numérique.",
      _up(1.42, 1.84), false),
  Indicator('loginflation', "Indice d'Inflation Logarithmique", 'g(t) = (1/N) × Σ[ln(Pi,t) − ln(Pi,t−1)]', '1.62%', 0.7, 3.4,
      'Inflation robuste via variations logarithmiques.',
      "Version statistiquement robuste de la mesure d'inflation utilisant les variations logarithmiques des prix. Elle réduit l'impact des mouvements de prix extrêmes.",
      _up(1.31, 1.62), false),
  Indicator('volatility', 'Indice de Volatilité des Prix', 'V(t) = √[(1/N) × Σ(Ri,t − R̄)²]', '4.27', 2.1, -1.4,
      'Instabilité et fluctuations des prix.',
      'Mesure le degré de fluctuation des prix entre les produits. Des valeurs élevées indiquent un marché plus instable.',
      const [3.9, 4.1, 4.4, 4.6, 4.5, 4.3, 4.2, 4.35, 4.27], false),
  Indicator('dispersion', 'Indice de Dispersion des Prix', 'D(t) = σ(P) / μ(P)', '0.34', -0.5, 1.1,
      'Écart des prix entre les produits.',
      'Mesure à quel point les prix des produits sont dispersés autour de la moyenne. Une dispersion élevée suggère de grandes différences entre produits.',
      const [0.33, 0.34, 0.35, 0.34, 0.36, 0.35, 0.34, 0.345, 0.34], false),
  Indicator('pricewar', 'Indice de Guerre des Prix', 'W(t) = (1/N) × Σ|(Pi,t / Pi,t−1) − 1|', '6.1%', 3.4, 5.7,
      'Intensité de la concurrence tarifaire.',
      "Mesure l'intensité des comportements de prix concurrentiels. Des valeurs élevées indiquent des ajustements de prix agressifs.",
      _up(5.2, 6.1), false),
  Indicator('promo', 'Indice de Pression Promotionnelle', 'PP(t) = (Produits en baisse de prix) / N', '18.3%', 1.2, 6.8,
      'Activité promotionnelle du marché.',
      "Mesure la proportion de produits actuellement en baisse de prix. C'est un indicateur utile de l'activité promotionnelle.",
      _up(15.1, 18.3), false),
  Indicator('increase', 'Indice de Hausse des Prix', 'PH(t) = (Produits en hausse de prix) / N', '12.6%', 0.8, 3.1,
      'Pression haussière sur les prix.',
      'Mesure la part des produits dont les prix ont augmenté. Il reflète la pression haussière sur les prix au sein du marché.',
      _up(11.4, 12.6), false),
  Indicator('stability', 'Indice de Stabilité des Prix', 'S(t) = 1 − (SKUs modifiés / N)', '74.2%', -0.4, -2.2,
      'Stabilité globale des prix.',
      'Mesure la proportion de produits dont les prix sont restés inchangés. Des valeurs élevées indiquent un marché plus stable.',
      const [77.1, 76.4, 75.8, 75.2, 74.9, 74.6, 74.4, 74.3, 74.2], true),
  Indicator('churn', 'Indice de Renouvellement Produits', 'C(t) = (Nouveaux SKUs) / N', '3.4%', 0.6, 1.9,
      'Arrivée de nouveaux produits.',
      'Mesure le rythme auquel de nouveaux produits entrent sur le marché. Il aide à suivre le dynamisme de la marketplace.',
      _up(2.7, 3.4), true),
  Indicator('exit', 'Indice de Sortie de Produits', 'E(t) = (SKUs retirés) / N', '2.1%', 0.2, 0.7,
      'Retrait de produits du marché.',
      'Mesure le rythme auquel les produits disparaissent du catalogue suivi. Il peut signaler des ruptures ou arrêts de produits.',
      _up(1.8, 2.1), false),
  Indicator('competitiveness', 'Indice de Compétitivité', 'CI(t) = Σ|Pi,t − Pi,t−1| / ΣPi,t−1', '5.8%', 1.5, 2.4,
      'Intensité concurrentielle globale.',
      "Mesure l'intensité globale de la concurrence par les prix sur le marché. Des valeurs élevées suggèrent un comportement plus agressif.",
      _up(5.1, 5.8), false),
  Indicator('convergence', 'Indice de Convergence du Marché', 'K(t) = 1 − σ(P) / μ(P)', '0.66', 0.3, 1.2,
      'Maturité et cohérence des prix.',
      'Mesure le degré de convergence des prix vers un niveau commun. Des valeurs élevées indiquent un marché plus mature et efficient.',
      _up(0.63, 0.66), true),
];

// Section — évolution des indices par catégorie (12 mois).
class CatTrend {
  final String name;
  final Color color;
  final List<double> values; // 12 mois
  const CatTrend(this.name, this.color, this.values);
}

final categoryTrends = <CatTrend>[
  CatTrend('Électronique', const Color(0xFF49885B), List.generate(12, (i) => (100 + i * 1.1 + sin(i / 2) * 1.5) * 10 ~/ 1 / 10)),
  CatTrend('Mode', const Color(0xFF9FCFA9), List.generate(12, (i) => (100 + i * 0.6 + cos(i / 2) * 2) * 10 ~/ 1 / 10)),
  CatTrend('Maison & Déco', const Color(0xFF22C993), List.generate(12, (i) => (100 + i * 0.4 + sin(i / 3) * 1.2) * 10 ~/ 1 / 10)),
  CatTrend('Alimentation', const Color(0xFFF7A23B), List.generate(12, (i) => (100 + i * 1.4 + cos(i / 1.8) * 1) * 10 ~/ 1 / 10)),
  CatTrend('Beauté', const Color(0xFFE11D74), List.generate(12, (i) => (100 + i * 0.8 + sin(i / 2.4) * 1.8) * 10 ~/ 1 / 10)),
];

const indexMonths = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
