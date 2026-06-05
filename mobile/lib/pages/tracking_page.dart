import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../data/mock.dart';
import '../widgets/common.dart';
import '../widgets/charts.dart';

class TrackingPage extends StatelessWidget {
  const TrackingPage({super.key});

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    final stats = [
      ("Changements", '327', Icons.swap_vert_rounded, c.accent),
      ('Baisses', '198', Icons.trending_down_rounded, c.good),
      ('Hausses', '129', Icons.trending_up_rounded, c.danger),
      ('Ruptures', '12', Icons.inventory_rounded, c.warn),
    ];
    final outOfStock = products.where((p) => !p.inStock).toList()..add(products[4]);

    return PageScaffold(
      crumbs: const ['1111.tn', 'Suivi des prix'],
      title: 'Suivi des prix',
      description: 'Alertes instantanées sur toute variation de prix, rupture ou promotion.',
      action: AccentButton('Alerte', Icons.add_alert_rounded),
      children: [
        LayoutBuilder(builder: (ctx, con) {
          final w = (con.maxWidth - 12) / 2;
          return Wrap(spacing: 12, runSpacing: 12, children: [
            for (int i = 0; i < stats.length; i++)
              SizedBox(
                width: w,
                child: Reveal(
                  delayMs: i * 60,
                  child: AppCard(
                    padding: const EdgeInsets.all(14),
                    child: Row(children: [
                      Container(
                        width: 42, height: 42,
                        decoration: BoxDecoration(color: stats[i].$4.withValues(alpha: 0.15), borderRadius: BorderRadius.circular(13)),
                        child: Icon(stats[i].$3, color: stats[i].$4, size: 21),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisSize: MainAxisSize.min, children: [
                          Text(stats[i].$2, style: TextStyle(fontSize: 19, fontWeight: FontWeight.w800, color: c.ink)),
                          Text(stats[i].$1, maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 11, color: c.ink3)),
                        ]),
                      ),
                    ]),
                  ),
                ),
              ),
          ]);
        }),
        const SizedBox(height: 16),

        Reveal(
          delayMs: 120,
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              CardTitle('Flux en temps réel',
                  trailing: Row(mainAxisSize: MainAxisSize.min, children: [
                    _LiveDot(c.good),
                    const SizedBox(width: 6),
                    Text('En direct', style: TextStyle(fontSize: 12, color: c.good, fontWeight: FontWeight.w600)),
                  ])),
              ...priceChanges.map((p) => _row(context, p)),
            ]),
          ),
        ),
        const SizedBox(height: 16),

        Reveal(
          delayMs: 160,
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              CardTitle('Ruptures de stock', trailing: Icon(Icons.inventory_rounded, size: 18, color: c.warn)),
              ...outOfStock.take(3).map((p) => Container(
                    margin: const EdgeInsets.only(bottom: 10),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(color: c.surface2, borderRadius: BorderRadius.circular(14), border: Border.all(color: c.line)),
                    child: Row(children: [
                      Container(width: 36, height: 36, decoration: BoxDecoration(color: c.danger.withValues(alpha: 0.15), borderRadius: BorderRadius.circular(11)), child: Icon(Icons.remove_shopping_cart_rounded, size: 18, color: c.danger)),
                      const SizedBox(width: 12),
                      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Text(p.name, maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 14, color: c.ink, fontWeight: FontWeight.w500)),
                        Text('${p.brand} · indisponible', style: TextStyle(fontSize: 12, color: c.ink3)),
                      ])),
                      Tag('Rupture', c.danger),
                    ]),
                  )),
            ]),
          ),
        ),
        const SizedBox(height: 16),

        Reveal(
          delayMs: 200,
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const CardTitle('Historique des prix — iPhone 15 Pro'),
              AreaLineChart(
                height: 220,
                xLabels: [for (final h in comparisonHistory) 'J${h['day']}'],
                seriesLabels: const ['Zoom', 'Tunisianet', 'Mytek'],
                series: [
                  LineSeries([for (final h in comparisonHistory) h['Zoom'] as double], const Color(0xFFE11D74)),
                  LineSeries([for (final h in comparisonHistory) h['Tunisianet'] as double], const Color(0xFF0A6CB5)),
                  LineSeries([for (final h in comparisonHistory) h['Mytek'] as double], const Color(0xFFE2001A)),
                ],
              ),
              const SizedBox(height: 8),
              Wrap(spacing: 14, children: [
                _lg(const Color(0xFFE2001A), 'Mytek', c),
                _lg(const Color(0xFF0A6CB5), 'Tunisianet', c),
                _lg(const Color(0xFFE11D74), 'Zoom', c),
              ]),
            ]),
          ),
        ),
      ],
    );
  }

  Widget _lg(Color color, String l, AppColors c) => Row(mainAxisSize: MainAxisSize.min, children: [
        Container(width: 9, height: 9, decoration: BoxDecoration(color: color, shape: BoxShape.circle)),
        const SizedBox(width: 5),
        Text(l, style: TextStyle(fontSize: 11, color: c.ink2)),
      ]);

  Widget _row(BuildContext context, PriceChange p) {
    final c = context.c;
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 7),
      child: Row(children: [
        SiteBadge(p.site, size: 34),
        const SizedBox(width: 12),
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(p.product, maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 14, color: c.ink, fontWeight: FontWeight.w500)),
          Text('${p.brand} · il y a ${p.time}', maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 12, color: c.ink3)),
        ])),
        const SizedBox(width: 8),
        Column(crossAxisAlignment: CrossAxisAlignment.end, children: [
          Text(fmtTND(p.newPrice), style: TextStyle(fontSize: 13, color: c.ink, fontWeight: FontWeight.w700)),
          Text(fmtTND(p.oldPrice), style: TextStyle(fontSize: 11, color: c.ink3, decoration: TextDecoration.lineThrough)),
        ]),
        const SizedBox(width: 8),
        TrendPill(p.delta),
      ]),
    );
  }
}

class _LiveDot extends StatefulWidget {
  final Color color;
  const _LiveDot(this.color);
  @override
  State<_LiveDot> createState() => _LiveDotState();
}

class _LiveDotState extends State<_LiveDot> with SingleTickerProviderStateMixin {
  late final AnimationController _c = AnimationController(vsync: this, duration: const Duration(seconds: 1))..repeat();
  @override
  void dispose() { _c.dispose(); super.dispose(); }
  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _c,
      builder: (_, _) => SizedBox(
        width: 10, height: 10,
        child: Stack(alignment: Alignment.center, children: [
          Opacity(
            opacity: (1 - _c.value).clamp(0, 1),
            child: Transform.scale(scale: 0.6 + _c.value * 1.4, child: Container(decoration: BoxDecoration(color: widget.color, shape: BoxShape.circle))),
          ),
          Container(width: 8, height: 8, decoration: BoxDecoration(color: widget.color, shape: BoxShape.circle)),
        ]),
      ),
    );
  }
}
