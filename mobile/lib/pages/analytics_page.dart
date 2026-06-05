import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../data/mock.dart';
import '../widgets/common.dart';
import '../widgets/charts.dart';

class AnalyticsPage extends StatelessWidget {
  const AnalyticsPage({super.key});

  Color _cell(int v, AppColors c) {
    final diff = v - 100;
    final base = diff <= 0 ? c.good : c.danger;
    final intensity = (diff.abs() * 0.07).clamp(0.0, 0.7);
    return Color.alphaBlend(base.withValues(alpha: intensity), c.surface);
  }

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return PageScaffold(
      crumbs: const ['1111.tn', 'Analytics & BI'],
      title: 'Analytics & BI',
      description: 'Carte de chaleur, tendances marché, stabilité et part de marché estimée.',
      action: AccentButton('Exporter', Icons.download_rounded),
      children: [
        Reveal(
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const CardTitle('Carte de chaleur des prix'),
              Text('Indice 100 = moyenne marché · vert = moins cher · rouge = plus cher',
                  style: TextStyle(fontSize: 11, color: c.ink3)),
              const SizedBox(height: 12),
              // header
              Row(children: [
                const SizedBox(width: 66),
                ...heatmapSites.map((s) => Expanded(child: Center(child: SiteBadge(s, size: 24)))),
              ]),
              const SizedBox(height: 6),
              ...List.generate(heatmapCats.length, (r) => Padding(
                    padding: const EdgeInsets.only(bottom: 4),
                    child: Row(children: [
                      SizedBox(width: 66, child: Text(heatmapCats[r], maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 11, color: c.ink2, fontWeight: FontWeight.w500))),
                      ...List.generate(heatmapSites.length, (col) {
                        final v = heatmapData[r][col];
                        return Expanded(
                          child: Container(
                            height: 38,
                            margin: const EdgeInsets.symmetric(horizontal: 2),
                            decoration: BoxDecoration(color: _cell(v, c), borderRadius: BorderRadius.circular(9)),
                            alignment: Alignment.center,
                            child: Text('$v', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: (v - 100).abs() > 6 ? Colors.white : c.ink)),
                          ),
                        );
                      }),
                    ]),
                  )),
            ]),
          ),
        ),
        const SizedBox(height: 16),
        Reveal(
          delayMs: 120,
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const CardTitle('Part de marché estimée'),
              Row(children: [
                Donut(
                  size: 140, stroke: 16, centerTop: '62', centerSub: 'sites',
                  segments: [for (final s in marketShare) (pct: s.pct.toDouble(), color: s.color)],
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(children: marketShare.map((s) => Padding(
                        padding: const EdgeInsets.symmetric(vertical: 5),
                        child: Row(children: [
                          Container(width: 10, height: 10, decoration: BoxDecoration(color: s.color, shape: BoxShape.circle)),
                          const SizedBox(width: 8),
                          Expanded(child: Text(s.name, maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 13, color: c.ink))),
                          Text('${s.pct}%', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: c.ink)),
                        ]),
                      )).toList()),
                ),
              ]),
            ]),
          ),
        ),
        const SizedBox(height: 16),
        Reveal(
          delayMs: 160,
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              CardTitle('Tendances marché', trailing: Row(children: [
                _lg(c.accent, 'Élec.', c), const SizedBox(width: 8), _lg(c.accent3, 'Mode', c),
              ])),
              AreaLineChart(
                height: 200,
                xLabels: [for (final m in marketTrend) m['month'] as String],
                seriesLabels: const ['Mode', 'Élec.'],
                decimals: 1,
                series: [
                  LineSeries([for (final m in marketTrend) (m['mode'] as num).toDouble()], c.accent3, dashed: true),
                  LineSeries([for (final m in marketTrend) (m['electronique'] as num).toDouble()], c.accent, fill: true),
                ],
              ),
            ]),
          ),
        ),
        const SizedBox(height: 16),
        Reveal(
          delayMs: 200,
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const CardTitle('Indice de stabilité des prix'),
              ...stabilityIndex.map((s) {
                final col = s.stability >= 80 ? c.good : s.stability >= 65 ? c.warn : c.danger;
                return Padding(
                  padding: const EdgeInsets.only(bottom: 14),
                  child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Row(children: [
                      Expanded(child: Text(s.site, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w500, color: c.ink))),
                      Text(s.volatility, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: col)),
                    ]),
                    const SizedBox(height: 8),
                    ProgressBar(s.stability / 100, color: col),
                  ]),
                );
              }),
            ]),
          ),
        ),
        const SizedBox(height: 16),
        Reveal(
          delayMs: 240,
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const CardTitle('Benchmark concurrentiel'),
              ...[
                ('Mytek', 'Agressif', -4, 92),
                ('Tunisianet', 'Aligné', 1, 88),
                ('Zoom', 'Variable', -2, 95),
                ('Spacenet', 'Premium', 5, 71),
              ].map((r) => Padding(
                    padding: const EdgeInsets.symmetric(vertical: 8),
                    child: Row(children: [
                      SizedBox(width: 84, child: Text(r.$1, maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: c.ink))),
                      Expanded(child: Text(r.$2, style: TextStyle(fontSize: 12, color: c.ink2))),
                      Text('${r.$3 > 0 ? '+' : ''}${r.$3}%', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: r.$3 <= 0 ? c.good : c.danger)),
                      const SizedBox(width: 12),
                      SizedBox(width: 70, child: ProgressBar(r.$4 / 100, height: 6)),
                    ]),
                  )),
            ]),
          ),
        ),
      ],
    );
  }

  Widget _lg(Color color, String l, AppColors c) => Row(mainAxisSize: MainAxisSize.min, children: [
        Container(width: 9, height: 9, decoration: BoxDecoration(color: color, shape: BoxShape.circle)),
        const SizedBox(width: 4),
        Text(l, style: TextStyle(fontSize: 11, color: c.ink2)),
      ]);
}
