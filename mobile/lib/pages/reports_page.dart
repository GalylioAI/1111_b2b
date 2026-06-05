import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../widgets/common.dart';

class ReportsPage extends StatefulWidget {
  const ReportsPage({super.key});
  @override
  State<ReportsPage> createState() => _ReportsPageState();
}

class _ReportsPageState extends State<ReportsPage> {
  String format = 'excel';

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    final generated = [
      ('Suivi des prix — hebdomadaire', 'Prix · 2 juin 2026', c.accent),
      ('Benchmark concurrentiel — Électronique', 'BI · 1 juin 2026', c.good),
      ('Intelligence SEO — comparatif sites', 'SEO · 28 mai 2026', c.warn),
      ('Part de marché estimée — Q2', 'BI · 25 mai 2026', c.accent2),
      ('Promotions & ventes flash détectées', 'Prix · 22 mai 2026', c.danger),
    ];
    final formats = [('csv', 'CSV', Icons.description_rounded), ('excel', 'Excel', Icons.table_chart_rounded), ('pdf', 'PDF', Icons.picture_as_pdf_rounded)];

    return PageScaffold(
      crumbs: const ['1111.tn', 'Rapports'],
      title: 'Rapports & Exports',
      description: 'Synthèses automatiques et export au format CSV, Excel ou PDF.',
      action: AccentButton('Générer', Icons.download_rounded),
      children: [
        Reveal(
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const CardTitle('Rapports générés'),
              ...generated.map((r) => Container(
                    margin: const EdgeInsets.only(bottom: 10),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(color: c.surface2, borderRadius: BorderRadius.circular(14), border: Border.all(color: c.line)),
                    child: Row(children: [
                      Container(width: 42, height: 42, decoration: BoxDecoration(color: r.$3.withValues(alpha: 0.15), borderRadius: BorderRadius.circular(13)), child: Icon(Icons.description_rounded, color: r.$3, size: 20)),
                      const SizedBox(width: 12),
                      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Text(r.$1, maxLines: 2, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: c.ink)),
                        Text(r.$2, style: TextStyle(fontSize: 11, color: c.ink3)),
                      ])),
                      Icon(Icons.download_rounded, size: 18, color: c.ink3),
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
              const CardTitle('Exporter des données'),
              Row(children: formats.map((f) {
                final sel = format == f.$1;
                return Expanded(
                  child: Padding(
                    padding: const EdgeInsets.only(right: 8),
                    child: GestureDetector(
                      onTap: () => setState(() => format = f.$1),
                      child: AnimatedContainer(
                        duration: const Duration(milliseconds: 200),
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        decoration: BoxDecoration(borderRadius: BorderRadius.circular(14), border: Border.all(color: sel ? c.accent : c.line, width: 2)),
                        child: Column(children: [
                          Icon(f.$3, size: 22, color: sel ? c.accent : c.ink3),
                          const SizedBox(height: 6),
                          Text(f.$2, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: c.ink)),
                        ]),
                      ),
                    ),
                  ),
                );
              }).toList()),
              const SizedBox(height: 14),
              SizedBox(width: double.infinity, child: AccentButton('Télécharger l\'export', Icons.download_rounded)),
            ]),
          ),
        ),
        const SizedBox(height: 16),
        Reveal(
          delayMs: 160,
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const CardTitle('Rapports planifiés'),
              ...[('Suivi des prix', 'Tous les lundis 08:00'), ('Benchmark concurrentiel', '1er du mois')].map((s) => Container(
                    margin: const EdgeInsets.only(bottom: 10),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(color: c.surface2, borderRadius: BorderRadius.circular(12), border: Border.all(color: c.line)),
                    child: Row(children: [
                      Container(width: 36, height: 36, decoration: BoxDecoration(color: c.accentSoft, borderRadius: BorderRadius.circular(11)), child: Icon(Icons.event_rounded, size: 17, color: c.accent)),
                      const SizedBox(width: 12),
                      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Text(s.$1, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: c.ink)),
                        Text(s.$2, style: TextStyle(fontSize: 12, color: c.ink3)),
                      ])),
                      Tag('Actif', c.good),
                    ]),
                  )),
            ]),
          ),
        ),
      ],
    );
  }
}
