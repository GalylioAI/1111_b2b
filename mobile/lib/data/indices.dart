import 'dart:math';
import 'package:flutter/material.dart';

/* Market intelligence indices — daily, from 15,000+ SKUs. */

const globalIndexTitle = 'Tunisia E-Commerce Market Index';
const globalIndexValue = 112.4;
const globalIndexDaily = 0.6;
const globalIndexWeekly = 2.1;
const globalIndexFormula =
    '100 × (1 + (0.30·Infl + 0.20·Vol + 0.20·War + 0.15·Disp + 0.15·Churn))';
const globalIndexDesc =
    "A synthetic indicator representing the overall health and dynamics of the Tunisian e-commerce market, computed daily from 15,000+ SKUs.";

final globalIndexSeries = List<double>.generate(30, (i) {
  final base = 107.5 + i * 0.17 + sin(i / 2.5) * 1.4 + cos(i / 6) * 0.7;
  return (base * 10).round() / 10;
});

class MarketIndicator {
  final String name, formula, value, description;
  final double change24h, change7d;
  final List<double> spark;
  final bool goodUp;
  const MarketIndicator(this.name, this.formula, this.value, this.change24h,
      this.change7d, this.description, this.spark, this.goodUp);
}

const marketIndicators = <MarketIndicator>[
  MarketIndicator('Global Price Index', 'I(t) = (1/N) × Σ(Pi,t / Pi,0) × 100',
      '112.4', 0.6, 2.1, 'Measures the overall evolution of market prices.',
      [108.2, 108.9, 109.6, 110.3, 110.9, 111.4, 111.9, 112.2, 112.4], true),
  MarketIndicator('E-Commerce Inflation Index', 'π(t) = (I(t) − I(t−1)) / I(t−1)',
      '1.84%', 0.9, 4.2, 'Measures the average rate of price increase or decrease.',
      [1.42, 1.49, 1.56, 1.63, 1.69, 1.74, 1.79, 1.82, 1.84], false),
  MarketIndicator('Price Volatility Index', 'V(t) = √[(1/N) × Σ(Ri,t − R̄)²]',
      '4.27', 2.1, -1.4, 'Measures market instability and price fluctuations.',
      [3.9, 4.1, 4.4, 4.6, 4.5, 4.3, 4.2, 4.35, 4.27], false),
  MarketIndicator('Price Dispersion Index', 'D(t) = σ(P) / μ(P)',
      '0.34', -0.5, 1.1, 'Measures how dispersed prices are across products.',
      [0.33, 0.34, 0.35, 0.34, 0.36, 0.35, 0.34, 0.345, 0.34], false),
  MarketIndicator('Price War Index', 'W(t) = (1/N) × Σ|(Pi,t / Pi,t−1) − 1|',
      '6.1%', 3.4, 5.7, 'Measures the intensity of pricing competition.',
      [5.2, 5.35, 5.5, 5.62, 5.74, 5.85, 5.95, 6.03, 6.1], false),
  MarketIndicator('Promotion Pressure Index', 'PP(t) = (Products with price decrease) / N',
      '18.3%', 1.2, 6.8, 'Measures promotional activity across the market.',
      [15.1, 15.6, 16.1, 16.6, 17.1, 17.5, 17.9, 18.1, 18.3], false),
  MarketIndicator('Price Increase Index', 'PH(t) = (Products with price increase) / N',
      '12.6%', 0.8, 3.1, 'Measures upward pricing pressure.',
      [11.4, 11.6, 11.8, 12.0, 12.2, 12.3, 12.45, 12.55, 12.6], false),
  MarketIndicator('Price Stability Index', 'S(t) = 1 − (Changed SKUs / N)',
      '74.2%', -0.4, -2.2, 'Measures overall market price stability.',
      [77.1, 76.4, 75.8, 75.2, 74.9, 74.6, 74.4, 74.3, 74.2], true),
  MarketIndicator('Product Churn Index', 'C(t) = (New SKUs) / N',
      '3.4%', 0.6, 1.9, 'Measures the arrival of new products.',
      [2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.35, 3.4], true),
  MarketIndicator('Product Exit Index', 'E(t) = (Removed SKUs) / N',
      '2.1%', 0.2, 0.7, 'Measures product removals from the market.',
      [1.8, 1.85, 1.9, 1.95, 2.0, 2.02, 2.05, 2.08, 2.1], false),
  MarketIndicator('Competitiveness Index', 'CI(t) = Σ|Pi,t − Pi,t−1| / ΣPi,t−1',
      '5.8%', 1.5, 2.4, 'Measures overall competitive intensity.',
      [5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.75, 5.8], false),
  MarketIndicator('Market Convergence Index', 'K(t) = 1 − σ(P) / μ(P)',
      '0.66', 0.3, 1.2, 'Measures market maturity and pricing consistency.',
      [0.63, 0.635, 0.64, 0.645, 0.65, 0.652, 0.655, 0.658, 0.66], true),
];

/* Upsample a 9-pt spark to a 30-pt detail series. */
List<double> expandSpark(List<double> spark, [int n = 30]) {
  final seg = (n - 1) / (spark.length - 1);
  final amp = ((spark.last - spark.first).abs()) * 0.05;
  return List<double>.generate(n, (i) {
    final t = i / seg;
    final lo = t.floor();
    final hi = min(lo + 1, spark.length - 1);
    final v = spark[lo] + (spark[hi] - spark[lo]) * (t - lo) + sin(i / 2.2) * amp;
    return (v * 1000).round() / 1000;
  });
}

const indexMonths = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

const indexCategories = ['Electronics', 'Fashion', 'Home & Living', 'Food', 'Beauty', 'Sports', 'Automotive'];

const indexCategoryColors = <Color>[
  Color(0xFF49885B),
  Color(0xFF5EA372),
  Color(0xFF22C993),
  Color(0xFFF7A23B),
  Color(0xFFE11D74),
  Color(0xFF0EA5E9),
  Color(0xFF9FCFA9),
];

final indexCategorySeries = <List<double>>[
  List.generate(12, (i) => (((100 + i * 1.1 + sin(i / 2) * 1.5)) * 10).round() / 10),
  List.generate(12, (i) => (((100 + i * 0.6 + cos(i / 2) * 2)) * 10).round() / 10),
  List.generate(12, (i) => (((100 + i * 0.4 + sin(i / 3) * 1.2)) * 10).round() / 10),
  List.generate(12, (i) => (((100 + i * 1.4 + cos(i / 1.8) * 1)) * 10).round() / 10),
  List.generate(12, (i) => (((100 + i * 0.8 + sin(i / 2.4) * 1.8)) * 10).round() / 10),
  List.generate(12, (i) => (((100 + i * 0.5 + cos(i / 2.2) * 1.3)) * 10).round() / 10),
  List.generate(12, (i) => (((100 + i * 0.3 + sin(i / 4) * 0.9)) * 10).round() / 10),
];
