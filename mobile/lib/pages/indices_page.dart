import 'dart:math';
import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../data/mock.dart';
import '../widgets/common.dart';
import '../widgets/charts.dart';

class IndicesPage extends StatelessWidget {
  const IndicesPage({super.key});

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return PageScaffold(
      crumbs: const ['1111.tn', 'Indices Marché'],
      title: 'Indices du marché',
      description:
          "Indicateurs d'intelligence marché calculés quotidiennement à partir de plus de 15 000 SKUs e-commerce.",
      action: AccentButton('Exporter', Icons.download_rounded),
      children: [
        // SECTION 1 — Indice composite global
        Reveal(delayMs: 80, child: _GlobalIndexCard()),
        const SizedBox(height: 20),

        // SECTION 2 — Grille d'indicateurs
        _SectionTitle('Indicateurs du marché', trailing: '${indicators.length} indicateurs'),
        const SizedBox(height: 12),
        for (int i = 0; i < indicators.length; i++) ...[
          Reveal(delayMs: 60 + i * 40, child: _IndicatorTile(indicators[i])),
          const SizedBox(height: 12),
        ],
        const SizedBox(height: 8),

        // SECTION 3 — Analyse par catégorie
        _SectionTitle('Analyse par catégorie'),
        const SizedBox(height: 12),
        Reveal(
          delayMs: 120,
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const CardTitle('Évolution des indices par catégorie'),
              AreaLineChart(
                height: 240,
                decimals: 1,
                xLabels: indexMonths,
                seriesLabels: [for (final t in categoryTrends) t.name],
                series: [
                  for (int i = 0; i < categoryTrends.length; i++)
                    LineSeries(categoryTrends[i].values, categoryTrends[i].color, fill: i == 0),
                ],
              ),
              const SizedBox(height: 12),
              Wrap(spacing: 14, runSpacing: 8, children: [
                for (final t in categoryTrends) _legendDot(t.color, t.name, c),
              ]),
            ]),
          ),
        ),
        const SizedBox(height: 20),

        // SECTION 4 — Tableau récapitulatif
        _SectionTitle('Tableau récapitulatif'),
        const SizedBox(height: 12),
        Reveal(
          delayMs: 160,
          child: AppCard(
            padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 6),
            child: Column(children: [
              _summaryRow(context, globalIndex.title, globalIndex.value.toStringAsFixed(1),
                  globalIndex.daily, globalIndex.weekly, true, highlight: true),
              for (final ind in indicators)
                _summaryRow(context, ind.name, ind.value, ind.change24h, ind.change7d, ind.goodUp),
            ]),
          ),
        ),
      ],
    );
  }

  Widget _summaryRow(BuildContext context, String name, String value, double d24, double d7, bool goodUp,
      {bool highlight = false}) {
    final c = context.c;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 11),
      decoration: BoxDecoration(
        color: highlight ? c.accentSoft : null,
        border: Border(top: BorderSide(color: c.line)),
      ),
      child: Row(children: [
        if (highlight) ...[
          Container(width: 8, height: 8, decoration: BoxDecoration(gradient: c.accentGradient, shape: BoxShape.circle)),
          const SizedBox(width: 8),
        ],
        Expanded(
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(name, maxLines: 2, overflow: TextOverflow.ellipsis,
                style: TextStyle(fontSize: 13, fontWeight: FontWeight.w500, color: c.ink)),
            const SizedBox(height: 2),
            Text(value, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: c.ink)),
          ]),
        ),
        const SizedBox(width: 8),
        Column(crossAxisAlignment: CrossAxisAlignment.end, mainAxisSize: MainAxisSize.min, children: [
          _miniTrend(context, '24h', d24, goodUp),
          const SizedBox(height: 4),
          _miniTrend(context, '7j', d7, goodUp),
        ]),
      ]),
    );
  }

  Widget _miniTrend(BuildContext context, String label, double v, bool goodUp) {
    final c = context.c;
    return Row(mainAxisSize: MainAxisSize.min, children: [
      Text('$label ', style: TextStyle(fontSize: 10, color: c.ink3)),
      TrendPill(v, invert: goodUp),
    ]);
  }
}

Widget _legendDot(Color color, String label, AppColors c) => Row(mainAxisSize: MainAxisSize.min, children: [
      Container(width: 9, height: 9, decoration: BoxDecoration(color: color, shape: BoxShape.circle)),
      const SizedBox(width: 5),
      Text(label, style: TextStyle(fontSize: 11, color: c.ink2)),
    ]);

class _SectionTitle extends StatelessWidget {
  final String title;
  final String? trailing;
  const _SectionTitle(this.title, {this.trailing});
  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return Row(children: [
      Text(title, style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: c.ink, letterSpacing: -0.3)),
      const SizedBox(width: 10),
      Expanded(child: Container(height: 1, color: c.line)),
      if (trailing != null) ...[
        const SizedBox(width: 10),
        Text(trailing!, style: TextStyle(fontSize: 11, color: c.ink3)),
      ],
    ]);
  }
}

/// Bandeau code monospace (formule).
class _Formula extends StatelessWidget {
  final String text;
  const _Formula(this.text);
  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
      decoration: BoxDecoration(
        color: c.surface2,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: c.line),
      ),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Text(text,
            style: TextStyle(fontFamily: 'monospace', fontSize: 11, color: c.ink2, height: 1.3)),
      ),
    );
  }
}

class _GlobalIndexCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final c = context.c;
    final bullish = globalIndex.weekly >= 0;
    final values = [for (final p in globalIndexSeries) (p['value'] as num).toDouble()];
    return AppCard(
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          Container(
            width: 38, height: 38,
            decoration: BoxDecoration(gradient: c.accentGradient, borderRadius: BorderRadius.circular(12)),
            child: const Icon(Icons.show_chart_rounded, color: Colors.white, size: 20),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(globalIndex.title, maxLines: 2, overflow: TextOverflow.ellipsis,
                  style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: c.ink, letterSpacing: -0.3)),
              const SizedBox(height: 2),
              Text('Mise à jour quotidienne · 15 000+ SKUs', style: TextStyle(fontSize: 11, color: c.ink3)),
            ]),
          ),
        ]),
        const SizedBox(height: 14),
        _Formula(globalIndex.formula),
        const SizedBox(height: 16),
        Row(crossAxisAlignment: CrossAxisAlignment.end, children: [
          Text(globalIndex.value.toStringAsFixed(1),
              style: TextStyle(fontSize: 44, fontWeight: FontWeight.w800, color: c.ink, letterSpacing: -1, height: 1)),
          const SizedBox(width: 10),
          Container(
            margin: const EdgeInsets.only(bottom: 6),
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
            decoration: BoxDecoration(
              color: (bullish ? c.good : c.danger).withValues(alpha: 0.12),
              borderRadius: BorderRadius.circular(999),
            ),
            child: Row(mainAxisSize: MainAxisSize.min, children: [
              Icon(bullish ? Icons.trending_up_rounded : Icons.trending_down_rounded,
                  size: 14, color: bullish ? c.good : c.danger),
              const SizedBox(width: 4),
              Text(bullish ? 'Haussier' : 'Baissier',
                  style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: bullish ? c.good : c.danger)),
            ]),
          ),
        ]),
        const SizedBox(height: 14),
        Row(children: [
          Expanded(child: _statBox(context, '24 h', globalIndex.daily)),
          const SizedBox(width: 10),
          Expanded(child: _statBox(context, '7 jours', globalIndex.weekly)),
        ]),
        const SizedBox(height: 8),
        Text(globalIndex.description, style: TextStyle(fontSize: 12.5, color: c.ink2, height: 1.4)),
        const SizedBox(height: 12),
        AreaLineChart(
          height: 200,
          decimals: 1,
          xLabels: [for (final p in globalIndexSeries) 'J${p['day']}'],
          seriesLabels: const ['Indice'],
          series: [LineSeries(values, c.accent, fill: true)],
        ),
        const SizedBox(height: 6),
        Text('Touchez le graphique pour voir les valeurs', style: TextStyle(fontSize: 11, color: c.ink3)),
      ]),
    );
  }

  Widget _statBox(BuildContext context, String label, double v) {
    final c = context.c;
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: c.surface2,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: c.line),
      ),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(label.toUpperCase(), style: TextStyle(fontSize: 10, letterSpacing: 0.5, color: c.ink3, fontWeight: FontWeight.w600)),
        const SizedBox(height: 6),
        TrendPill(v, invert: true),
      ]),
    );
  }
}

/// Carte d'indicateur — touchez pour révéler le graphique détaillé.
class _IndicatorTile extends StatefulWidget {
  final Indicator ind;
  const _IndicatorTile(this.ind);
  @override
  State<_IndicatorTile> createState() => _IndicatorTileState();
}

class _IndicatorTileState extends State<_IndicatorTile> {
  bool _open = false;

  // Rééchantillonne le spark (9 pts) en ~30 pts pour le graphique détaillé.
  List<double> _expand(List<double> spark, [int n = 30]) {
    final seg = (n - 1) / (spark.length - 1);
    final base = (spark.last - spark.first).abs();
    final amp = (base == 0 ? (spark.first.abs() == 0 ? 1.0 : spark.first.abs()) : base) * 0.05;
    return List.generate(n, (i) {
      final t = i / seg;
      final lo = t.floor();
      final hi = min(lo + 1, spark.length - 1);
      final v = spark[lo] + (spark[hi] - spark[lo]) * (t - lo) + sin(i / 2.2) * amp;
      return (v * 1000).round() / 1000;
    });
  }

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    final ind = widget.ind;
    final isGood = ind.goodUp ? ind.change24h > 0 : ind.change24h < 0;
    final color = isGood ? c.good : c.danger;
    final mx = ind.spark.reduce(max);
    final decimals = mx < 10 ? 2 : 1;

    return AppCard(
      padding: const EdgeInsets.all(16),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(8),
          onTap: () => setState(() => _open = !_open),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(children: [
              Expanded(
                child: Text(ind.name,
                    style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: c.ink, letterSpacing: -0.2)),
              ),
              const SizedBox(width: 8),
              TrendPill(ind.change24h, invert: ind.goodUp),
            ]),
            const SizedBox(height: 10),
            _Formula(ind.formula),
            const SizedBox(height: 12),
            Row(crossAxisAlignment: CrossAxisAlignment.end, children: [
              Text(ind.value,
                  style: TextStyle(fontSize: 26, fontWeight: FontWeight.w800, color: c.ink, letterSpacing: -0.5, height: 1)),
              const Spacer(),
              Sparkline(ind.spark, width: 92, height: 36),
            ]),
            const SizedBox(height: 10),
            Text(ind.description, style: TextStyle(fontSize: 12.5, color: c.ink3, height: 1.4)),
            AnimatedCrossFade(
              duration: const Duration(milliseconds: 300),
              crossFadeState: _open ? CrossFadeState.showSecond : CrossFadeState.showFirst,
              firstChild: Padding(
                padding: const EdgeInsets.only(top: 10),
                child: Row(children: [
                  Icon(Icons.expand_more_rounded, size: 16, color: c.accent),
                  const SizedBox(width: 4),
                  Text('Voir le détail (30 derniers jours)',
                      style: TextStyle(fontSize: 11.5, fontWeight: FontWeight.w600, color: c.accent)),
                ]),
              ),
              secondChild: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                const SizedBox(height: 14),
                Row(children: [
                  Text('30 derniers jours', style: TextStyle(fontSize: 11, color: c.ink3)),
                  const Spacer(),
                  _defBadge(context),
                ]),
                const SizedBox(height: 6),
                if (_open)
                  AreaLineChart(
                    key: ValueKey('det-${ind.key}'),
                    height: 170,
                    decimals: decimals,
                    xLabels: [for (int i = 1; i <= 30; i++) 'J$i'],
                    seriesLabels: [ind.name.split(' ').take(2).join(' ')],
                    series: [LineSeries(_expand(ind.spark), color, fill: true)],
                  ),
                const SizedBox(height: 10),
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: c.accentSoft,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: c.accent.withValues(alpha: 0.3)),
                  ),
                  child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Text('DÉFINITION',
                        style: TextStyle(fontSize: 10, letterSpacing: 0.6, fontWeight: FontWeight.w700, color: c.accent)),
                    const SizedBox(height: 4),
                    Text(ind.definition, style: TextStyle(fontSize: 12.5, color: c.ink2, height: 1.45)),
                  ]),
                ),
                const SizedBox(height: 10),
                Row(children: [
                  Expanded(child: _changeBox(context, '24 h', ind.change24h, ind.goodUp)),
                  const SizedBox(width: 10),
                  Expanded(child: _changeBox(context, '7 j', ind.change7d, ind.goodUp)),
                ]),
              ]),
            ),
          ]),
        ),
      ),
    );
  }

  Widget _defBadge(BuildContext context) {
    final c = context.c;
    return Row(mainAxisSize: MainAxisSize.min, children: [
      Icon(Icons.info_outline_rounded, size: 13, color: c.accent),
      const SizedBox(width: 3),
      Text('Définition', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: c.accent)),
    ]);
  }

  Widget _changeBox(BuildContext context, String label, double v, bool goodUp) {
    final c = context.c;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 9),
      decoration: BoxDecoration(
        color: c.surface2,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: c.line),
      ),
      child: Row(children: [
        Text(label, style: TextStyle(fontSize: 11, color: c.ink3)),
        const Spacer(),
        TrendPill(v, invert: goodUp),
      ]),
    );
  }
}
