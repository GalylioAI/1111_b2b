import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../data/mock.dart';
import '../widgets/common.dart';
import '../widgets/charts.dart';

class CatalogPage extends StatefulWidget {
  const CatalogPage({super.key});
  @override
  State<CatalogPage> createState() => _CatalogPageState();
}

class _CatalogPageState extends State<CatalogPage> {
  final filters = const ['Tous', 'Smartphones', 'Laptops', 'TV', 'Audio'];
  String active = 'Tous';

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return PageScaffold(
      crumbs: const ['1111.tn', 'Catalogue'],
      title: 'Catalogue & Matching',
      description: 'Regroupement par NLP, gestion par marque et détection de nouveaux produits.',
      action: AccentButton('Importer', Icons.upload_rounded),
      children: [
        Reveal(
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const CardTitle('Produits suivis'),
              Wrap(spacing: 8, runSpacing: 8, children: filters.map((f) {
                final sel = f == active;
                return GestureDetector(
                  onTap: () => setState(() => active = f),
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 220),
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                    decoration: BoxDecoration(
                      gradient: sel ? c.accentGradient : null,
                      color: sel ? null : c.surface2,
                      borderRadius: BorderRadius.circular(999),
                      border: Border.all(color: sel ? Colors.transparent : c.line),
                    ),
                    child: Text(f, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: sel ? Colors.white : c.ink2)),
                  ),
                );
              }).toList()),
              const SizedBox(height: 14),
              ...List.generate(products.length, (i) => _product(context, products[i], i)),
            ]),
          ),
        ),
        const SizedBox(height: 16),

        Reveal(
          delayMs: 140,
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const CardTitle('Marques suivies'),
              ...brands(context).map((b) => Padding(
                    padding: const EdgeInsets.only(bottom: 12),
                    child: Row(children: [
                      Container(
                        width: 36, height: 36,
                        decoration: BoxDecoration(color: b.color, borderRadius: BorderRadius.circular(11)),
                        alignment: Alignment.center,
                        child: Text(b.name[0], style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w800, fontSize: 14)),
                      ),
                      const SizedBox(width: 12),
                      Expanded(child: Text(b.name, style: TextStyle(fontSize: 14, color: c.ink, fontWeight: FontWeight.w500))),
                      Text('${b.products} produits', style: TextStyle(fontSize: 12, color: c.ink3)),
                    ]),
                  )),
            ]),
          ),
        ),
        const SizedBox(height: 16),

        Reveal(
          delayMs: 180,
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const CardTitle('Catégories (NLP)'),
              ...categories.map((cat) => Container(
                    margin: const EdgeInsets.only(bottom: 8),
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                    decoration: BoxDecoration(color: c.surface2, borderRadius: BorderRadius.circular(12), border: Border.all(color: c.line)),
                    child: Row(children: [
                      Expanded(child: Text(cat.name, style: TextStyle(fontSize: 14, color: c.ink, fontWeight: FontWeight.w500))),
                      Text('${cat.products}', style: TextStyle(fontSize: 12, color: c.ink3)),
                      const SizedBox(width: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 2),
                        decoration: BoxDecoration(color: c.accentSoft, borderRadius: BorderRadius.circular(999)),
                        child: Text('+${cat.newThisWeek}', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: c.accent)),
                      ),
                    ]),
                  )),
            ]),
          ),
        ),
        const SizedBox(height: 16),

        Reveal(
          delayMs: 220,
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              CardTitle('Nouveaux produits détectés', trailing: Icon(Icons.auto_awesome_rounded, size: 18, color: c.accent)),
              ...[('Galaxy Z Fold 6', 'Tunisianet'), ('iPad Pro M4 11"', 'Mytek'), ('Sony WH-1000XM6', 'Zoom')].map((x) => Padding(
                    padding: const EdgeInsets.symmetric(vertical: 7),
                    child: Row(children: [
                      Icon(Icons.auto_awesome_rounded, size: 15, color: c.accent),
                      const SizedBox(width: 8),
                      Expanded(child: Text(x.$1, style: TextStyle(fontSize: 14, color: c.ink, fontWeight: FontWeight.w500))),
                      Text(x.$2, style: TextStyle(fontSize: 12, color: c.ink3)),
                    ]),
                  )),
            ]),
          ),
        ),
      ],
    );
  }

  Widget _product(BuildContext context, Product p, int i) {
    final c = context.c;
    final col = p.competitiveness >= 85 ? c.good : p.competitiveness >= 70 ? c.warn : c.danger;
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(color: c.surface2, borderRadius: BorderRadius.circular(14), border: Border.all(color: c.line)),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          Expanded(
            child: Row(children: [
              Flexible(child: Text(p.name, maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: c.ink))),
              if (!p.inStock) ...[const SizedBox(width: 6), Tag('Rupture', c.danger)],
            ]),
          ),
          const SizedBox(width: 8),
          Text(fmtTND(p.lowest), style: TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: c.ink)),
        ]),
        const SizedBox(height: 2),
        Row(children: [
          Expanded(child: Text('${p.brand} · ${p.category} · ${p.sites} sites', maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 12, color: c.ink3))),
          Sparkline(p.spark, width: 68, height: 26),
        ]),
        const SizedBox(height: 10),
        Row(children: [
          Expanded(child: ProgressBar(p.competitiveness / 100, color: col, height: 6)),
          const SizedBox(width: 8),
          Text('${p.competitiveness}', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: col)),
        ]),
      ]),
    );
  }
}
