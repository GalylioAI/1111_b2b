import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../data/mock.dart';
import '../widgets/common.dart';
import '../widgets/charts.dart';

class ComparisonPage extends StatelessWidget {
  const ComparisonPage({super.key});

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    final prices = comparisonRows.map((r) => r.price).toList();
    final mn = prices.reduce((a, b) => a < b ? a : b);
    final mx = prices.reduce((a, b) => a > b ? a : b);
    final spread = ((mx - mn) / mn * 100).toStringAsFixed(1);

    return PageScaffold(
      crumbs: const ['1111.tn', 'Comparaison'],
      title: 'Comparaison multi-sites',
      description: 'Comparez un même produit sur tous les sites scrapés, côte à côte.',
      children: [
        Reveal(
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(children: [
                Container(
                  width: 56, height: 56,
                  decoration: BoxDecoration(color: c.surface2, borderRadius: BorderRadius.circular(16)),
                  child: const Center(child: Text('📱', style: TextStyle(fontSize: 26))),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Tag('Smartphones', c.accent),
                    const SizedBox(height: 4),
                    Text(comparisonProduct, maxLines: 2, overflow: TextOverflow.ellipsis,
                        style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: c.ink)),
                    Text('Apple · suivi sur ${comparisonRows.length} sites', style: TextStyle(fontSize: 12, color: c.ink3)),
                  ]),
                ),
              ]),
              const SizedBox(height: 16),
              Row(children: [
                _stat('Meilleur prix', fmtTND(mn), c.good, c),
                _stat('Plus haut', fmtTND(mx), c.ink, c),
                _stat('Écart', '$spread%', c.accent, c),
              ]),
            ]),
          ),
        ),
        const SizedBox(height: 16),

        Reveal(
          delayMs: 120,
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const CardTitle('Prix par site'),
              ...List.generate(comparisonRows.length, (i) => _siteRow(context, comparisonRows[i], i)),
            ]),
          ),
        ),
        const SizedBox(height: 16),

        Reveal(
          delayMs: 160,
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const CardTitle('Score de compétitivité'),
              Row(children: [
                RingGauge(value: 0.92, color: c.good, label: '92'),
                const SizedBox(width: 18),
                Expanded(
                  child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Row(children: [
                      Icon(Icons.verified_rounded, size: 16, color: c.good),
                      const SizedBox(width: 6),
                      Text('Très compétitif', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: c.good)),
                    ]),
                    const SizedBox(height: 6),
                    Text('Votre prix se situe parmi les 8 % les moins chers du marché pour ce produit.',
                        style: TextStyle(fontSize: 12, color: c.ink2, height: 1.4)),
                  ]),
                ),
              ]),
            ]),
          ),
        ),
        const SizedBox(height: 16),

        Reveal(
          delayMs: 200,
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const CardTitle('Produits équivalents (matching)'),
              ...[
                ('iPhone 15 Pro 128GB', '98% similaire'),
                ('iPhone 15 Pro Max 256GB', '91% similaire'),
                ('iPhone 15 256GB', '87% similaire'),
              ].map((x) => Container(
                    margin: const EdgeInsets.only(bottom: 10),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(color: c.surface2, borderRadius: BorderRadius.circular(12), border: Border.all(color: c.line)),
                    child: Row(children: [
                      Expanded(child: Text(x.$1, style: TextStyle(fontSize: 13, color: c.ink, fontWeight: FontWeight.w500))),
                      Icon(Icons.check_rounded, size: 14, color: c.accent),
                      const SizedBox(width: 4),
                      Text(x.$2, style: TextStyle(fontSize: 12, color: c.accent, fontWeight: FontWeight.w600)),
                    ]),
                  )),
            ]),
          ),
        ),
        const SizedBox(height: 16),

        Reveal(
          delayMs: 240,
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const CardTitle('Évolution des prix (14 jours)'),
              AreaLineChart(
                height: 210,
                xLabels: [for (final h in comparisonHistory) 'J${h['day']}'],
                seriesLabels: const ['Zoom', 'Tunisianet', 'Mytek'],
                series: [
                  LineSeries([for (final h in comparisonHistory) h['Zoom'] as double], const Color(0xFFE11D74)),
                  LineSeries([for (final h in comparisonHistory) h['Tunisianet'] as double], const Color(0xFF0A6CB5)),
                  LineSeries([for (final h in comparisonHistory) h['Mytek'] as double], const Color(0xFFE2001A)),
                ],
              ),
            ]),
          ),
        ),
      ],
    );
  }

  Widget _stat(String label, String value, Color color, AppColors c) => Expanded(
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(label.toUpperCase(), maxLines: 1, overflow: TextOverflow.ellipsis,
              style: TextStyle(fontSize: 10, letterSpacing: 0.4, color: c.ink3, fontWeight: FontWeight.w600)),
          const SizedBox(height: 3),
          Text(value, maxLines: 1, overflow: TextOverflow.ellipsis,
              style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800, color: color)),
        ]),
      );

  Widget _siteRow(BuildContext context, CompRow r, int i) {
    final c = context.c;
    return Reveal(
      delayMs: i * 60,
      child: Container(
        margin: const EdgeInsets.only(bottom: 10),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: r.best ? c.good.withValues(alpha: 0.07) : c.surface2,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: r.best ? c.good.withValues(alpha: 0.4) : c.line),
        ),
        child: Row(children: [
          SiteBadge(r.site, size: 40),
          const SizedBox(width: 12),
          Expanded(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(children: [
                Flexible(child: Text(r.site, maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: c.ink))),
                if (r.best) ...[
                  const SizedBox(width: 6),
                  Icon(Icons.workspace_premium_rounded, size: 14, color: c.good),
                ],
              ]),
              const SizedBox(height: 3),
              Row(children: [
                Container(width: 7, height: 7, decoration: BoxDecoration(color: r.stock ? c.good : c.danger, shape: BoxShape.circle)),
                const SizedBox(width: 4),
                Flexible(child: Text(r.stock ? 'En stock · ${r.delivery}' : 'Rupture', maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 11, color: c.ink3))),
              ]),
            ]),
          ),
          const SizedBox(width: 8),
          Text(fmtTND(r.price), style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: r.best ? c.good : c.ink)),
        ]),
      ),
    );
  }
}
