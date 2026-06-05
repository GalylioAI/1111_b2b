import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../data/mock.dart';
import '../widgets/common.dart';

class SeoPage extends StatelessWidget {
  const SeoPage({super.key});

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    Color diffColor(String d) =>
        d == 'Faible' ? c.good : d == 'Moyenne' ? c.warn : c.danger;

    return PageScaffold(
      crumbs: const ['1111.tn', 'SEO Intelligence'],
      title: 'SEO & Metadata',
      description: 'Comparez titres et méta-descriptions, détectez les opportunités de mots-clés.',
      action: AccentButton('Analyser', Icons.search_rounded),
      children: [
        Reveal(
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const CardTitle('Analyse SEO comparative'),
              ...seoScores.map((s) => Container(
                    margin: const EdgeInsets.only(bottom: 10),
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      color: s.you ? c.accentSoft : c.surface2,
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(color: s.you ? c.accent.withValues(alpha: 0.4) : c.line),
                    ),
                    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      Row(children: [
                        Text('${s.score}', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: c.ink)),
                        Text(' /100', style: TextStyle(fontSize: 12, color: c.ink3)),
                        const SizedBox(width: 10),
                        Expanded(child: Text(s.site, maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: s.you ? c.accent : c.ink))),
                        if (s.you) Tag('VOUS', c.accent),
                      ]),
                      const SizedBox(height: 10),
                      _bar('Titres', s.titles, c),
                      const SizedBox(height: 6),
                      _bar('Méta', s.meta, c),
                      const SizedBox(height: 6),
                      _bar('Mots-clés', s.keywords, c),
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
              const CardTitle('Détection de changements SEO'),
              ...seoChanges.map((ch) => Padding(
                    padding: const EdgeInsets.symmetric(vertical: 7),
                    child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      Container(width: 32, height: 32, decoration: BoxDecoration(color: c.warn.withValues(alpha: 0.15), borderRadius: BorderRadius.circular(10)), child: Icon(Icons.warning_amber_rounded, size: 16, color: c.warn)),
                      const SizedBox(width: 12),
                      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Text(ch.change, style: TextStyle(fontSize: 13, color: c.ink)),
                        Text('${ch.site} · il y a ${ch.time}', style: TextStyle(fontSize: 11, color: c.ink3)),
                      ])),
                    ]),
                  )),
            ]),
          ),
        ),
        const SizedBox(height: 16),
        Reveal(
          delayMs: 160,
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const CardTitle('Score SEO global'),
              LayoutBuilder(builder: (ctx, con) {
                final w = (con.maxWidth - 12) / 2;
                final items = [
                  ('Fiches analysées', '1 842', Icons.description_rounded),
                  ('Opportunités', '37', Icons.trending_up_rounded),
                  ('Mots-clés suivis', '412', Icons.sell_rounded),
                  ('Score moyen', '79', Icons.search_rounded),
                ];
                return Wrap(spacing: 12, runSpacing: 12, children: items.map((it) => SizedBox(
                      width: w,
                      child: Container(
                        padding: const EdgeInsets.all(14),
                        decoration: BoxDecoration(color: c.surface2, borderRadius: BorderRadius.circular(14), border: Border.all(color: c.line)),
                        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                          Icon(it.$3, size: 18, color: c.accent),
                          const SizedBox(height: 8),
                          Text(it.$2, style: TextStyle(fontSize: 19, fontWeight: FontWeight.w800, color: c.ink)),
                          Text(it.$1, maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 11, color: c.ink3)),
                        ]),
                      ),
                    )).toList());
              }),
            ]),
          ),
        ),
        const SizedBox(height: 16),
        Reveal(
          delayMs: 200,
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const CardTitle('Opportunités de mots-clés'),
              ...keywordOpportunities.map((k) => Padding(
                    padding: const EdgeInsets.symmetric(vertical: 7),
                    child: Row(children: [
                      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Text(k.keyword, maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w500, color: c.ink)),
                        Row(children: [
                          Text('${k.volume}/mois', style: TextStyle(fontSize: 11, color: c.ink3)),
                          const SizedBox(width: 8),
                          Container(width: 7, height: 7, decoration: BoxDecoration(color: diffColor(k.difficulty), shape: BoxShape.circle)),
                          const SizedBox(width: 4),
                          Text(k.difficulty, style: TextStyle(fontSize: 11, color: c.ink3)),
                        ]),
                      ])),
                      const SizedBox(width: 8),
                      k.used
                          ? Container(padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5), decoration: BoxDecoration(color: c.surface3, borderRadius: BorderRadius.circular(999)), child: Text('Exploité', style: TextStyle(fontSize: 11, color: c.ink2, fontWeight: FontWeight.w600)))
                          : Container(padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5), decoration: BoxDecoration(color: c.accentSoft, borderRadius: BorderRadius.circular(999)), child: Row(mainAxisSize: MainAxisSize.min, children: [Icon(Icons.add_rounded, size: 12, color: c.accent), const SizedBox(width: 2), Text('Opportunité', style: TextStyle(fontSize: 11, color: c.accent, fontWeight: FontWeight.w700))])),
                    ]),
                  )),
            ]),
          ),
        ),
      ],
    );
  }

  Widget _bar(String label, int value, AppColors c) => Row(children: [
        SizedBox(width: 64, child: Text(label, style: TextStyle(fontSize: 11, color: c.ink3))),
        Expanded(child: ProgressBar(value / 100, height: 6)),
        const SizedBox(width: 8),
        SizedBox(width: 22, child: Text('$value', textAlign: TextAlign.right, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: c.ink2))),
      ]);
}
