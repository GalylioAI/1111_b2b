import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../data/mock.dart';
import '../widgets/common.dart';
import '../widgets/charts.dart';

class DashboardPage extends StatelessWidget {
  const DashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return PageScaffold(
      crumbs: const ['1111.tn', 'Tableau de bord'],
      title: "Vue d'ensemble",
      description: 'Intelligence tarifaire B2B — 62 sites e-commerce tunisiens suivis en temps réel.',
      children: [
        // KPI grid
        LayoutBuilder(builder: (ctx, con) {
          final w = (con.maxWidth - 12) / 2;
          return Wrap(
            spacing: 12,
            runSpacing: 12,
            children: [
              for (int i = 0; i < b2bKpis.length; i++)
                SizedBox(width: w, child: Reveal(delayMs: i * 70, child: KpiCard(b2bKpis[i]))),
            ],
          );
        }),
        const SizedBox(height: 16),

        // Price index chart
        Reveal(
          delayMs: 120,
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              CardTitle('Indice de prix du marché',
                  trailing: Row(children: [
                    _legendDot(c.accent, 'Marché', c),
                    const SizedBox(width: 10),
                    _legendDot(c.accent3, 'Vous', c),
                  ])),
              AreaLineChart(
                minY: 90,
                maxY: 120,
                yTicks: const [95, 105, 115],
                height: 220,
                seriesLabels: const ['Vous', 'Marché'],
                decimals: 1,
                series: [
                  LineSeries([for (final p in priceIndex) (p['you'] as num).toDouble()], c.accent3, dashed: true),
                  LineSeries([for (final p in priceIndex) (p['market'] as num).toDouble()], c.accent, fill: true),
                ],
              ),
              const SizedBox(height: 8),
              Text('Touchez le graphique pour voir les valeurs',
                  style: TextStyle(fontSize: 11, color: c.ink3)),
            ]),
          ),
        ),
        const SizedBox(height: 16),

        // Recent price changes
        Reveal(
          delayMs: 160,
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const CardTitle('Changements de prix récents'),
              ...priceChanges.take(6).map((p) => _priceRow(context, p)),
            ]),
          ),
        ),
        const SizedBox(height: 16),

        // Brand competitiveness
        Reveal(
          delayMs: 200,
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const CardTitle('Compétitivité par marque'),
              ...brands(context).map((b) => Padding(
                    padding: const EdgeInsets.only(bottom: 14),
                    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      Row(children: [
                        Container(width: 10, height: 10, decoration: BoxDecoration(color: b.color, shape: BoxShape.circle)),
                        const SizedBox(width: 8),
                        Expanded(child: Text(b.name, style: TextStyle(fontSize: 13, color: c.ink, fontWeight: FontWeight.w500))),
                        Text('${b.products} produits', style: TextStyle(fontSize: 12, color: c.ink3)),
                      ]),
                      const SizedBox(height: 8),
                      ProgressBar((b.share * 3.4) / 100, color: b.color),
                    ]),
                  )),
            ]),
          ),
        ),
        const SizedBox(height: 16),

        // Top movers
        Reveal(
          delayMs: 240,
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const CardTitle('Top mouvements'),
              ...topMovers.map((m) => Padding(
                    padding: const EdgeInsets.only(bottom: 12),
                    child: Row(children: [
                      Expanded(
                        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                          Text(m.product, maxLines: 1, overflow: TextOverflow.ellipsis,
                              style: TextStyle(fontSize: 14, color: c.ink, fontWeight: FontWeight.w500)),
                          Text(m.site, style: TextStyle(fontSize: 12, color: c.ink3)),
                        ]),
                      ),
                      TrendPill(m.deltaPct),
                    ]),
                  )),
            ]),
          ),
        ),
        const SizedBox(height: 16),

        // Promotions
        Reveal(
          delayMs: 280,
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              CardTitle('Promotions détectées', trailing: Icon(Icons.local_fire_department_rounded, size: 18, color: c.warn)),
              ...promotions.map((p) => Container(
                    margin: const EdgeInsets.only(bottom: 10),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: c.surface2,
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(color: c.line),
                    ),
                    child: Row(children: [
                      SiteBadge(p.site, size: 32),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                          Text(p.product, maxLines: 1, overflow: TextOverflow.ellipsis,
                              style: TextStyle(fontSize: 14, color: c.ink, fontWeight: FontWeight.w500)),
                          Text('${p.site} · ${p.tag}', style: TextStyle(fontSize: 12, color: c.ink3)),
                        ]),
                      ),
                      Tag(p.discount, c.danger),
                    ]),
                  )),
            ]),
          ),
        ),
      ],
    );
  }

  Widget _legendDot(Color color, String label, AppColors c) => Row(mainAxisSize: MainAxisSize.min, children: [
        Container(width: 9, height: 9, decoration: BoxDecoration(color: color, shape: BoxShape.circle)),
        const SizedBox(width: 5),
        Text(label, style: TextStyle(fontSize: 11, color: c.ink2)),
      ]);

  Widget _priceRow(BuildContext context, PriceChange p) {
    final c = context.c;
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 7),
      child: Row(children: [
        SiteBadge(p.site, size: 34),
        const SizedBox(width: 12),
        Expanded(
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(p.product, maxLines: 1, overflow: TextOverflow.ellipsis,
                style: TextStyle(fontSize: 14, color: c.ink, fontWeight: FontWeight.w500)),
            Text('${p.brand} · ${p.site}', maxLines: 1, overflow: TextOverflow.ellipsis,
                style: TextStyle(fontSize: 12, color: c.ink3)),
          ]),
        ),
        const SizedBox(width: 8),
        Column(crossAxisAlignment: CrossAxisAlignment.end, children: [
          Text(fmtTND(p.newPrice), style: TextStyle(fontSize: 13, color: c.ink, fontWeight: FontWeight.w700)),
          Text(fmtTND(p.oldPrice),
              style: TextStyle(fontSize: 11, color: c.ink3, decoration: TextDecoration.lineThrough)),
        ]),
        const SizedBox(width: 8),
        TrendPill(p.delta),
      ]),
    );
  }
}
