import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../data/mock.dart';
import '../widgets/common.dart';

class AlertsPage extends StatefulWidget {
  const AlertsPage({super.key});
  @override
  State<AlertsPage> createState() => _AlertsPageState();
}

class _AlertsPageState extends State<AlertsPage> {
  late List<bool> lists = watchlist.map((w) => w.active).toList();
  Map<String, bool> types = {'threshold': true, 'stock': true, 'competitor': false, 'seo': true};
  String report = 'weekly';

  final alertTypes = const [
    ('threshold', 'Seuil de prix atteint', 'Quand un prix passe sous votre seuil', Icons.trending_down_rounded),
    ('stock', 'Changement de disponibilité', 'Rupture ou retour en stock', Icons.inventory_rounded),
    ('competitor', 'Nouveau concurrent', 'Un site commence à vendre un produit suivi', Icons.person_add_rounded),
    ('seo', 'Changement SEO / Metadata', 'Modification des titres ou méta-descriptions', Icons.public_rounded),
  ];

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return PageScaffold(
      crumbs: const ['1111.tn', 'Alertes & Watchlist'],
      title: 'Alertes & Monitoring',
      description: 'Surveillez sites et produits, configurez vos déclencheurs et recevez des rapports.',
      action: AccentButton('Watchlist', Icons.add_rounded),
      children: [
        Reveal(
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const CardTitle('Mes watchlists'),
              ...List.generate(watchlist.length, (i) {
                final w = watchlist[i];
                return Container(
                  margin: const EdgeInsets.only(bottom: 10),
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(color: c.surface2, borderRadius: BorderRadius.circular(14), border: Border.all(color: c.line)),
                  child: Row(children: [
                    Container(width: 40, height: 40, decoration: BoxDecoration(color: c.accentSoft, borderRadius: BorderRadius.circular(12)), child: Icon(Icons.notifications_rounded, size: 19, color: c.accent)),
                    const SizedBox(width: 12),
                    Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      Text(w.name, maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: c.ink)),
                      Text('${w.sites} sites · ${w.products} produits', maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 12, color: c.ink3)),
                    ])),
                    Switch.adaptive(value: lists[i], activeThumbColor: Colors.white, activeTrackColor: c.accent, onChanged: (v) => setState(() => lists[i] = v)),
                  ]),
                );
              }),
            ]),
          ),
        ),
        const SizedBox(height: 16),
        Reveal(
          delayMs: 120,
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const CardTitle("Types d'alertes"),
              ...alertTypes.map((t) => Padding(
                    padding: const EdgeInsets.symmetric(vertical: 8),
                    child: Row(children: [
                      Container(width: 38, height: 38, decoration: BoxDecoration(color: c.surface2, borderRadius: BorderRadius.circular(11)), child: Icon(t.$4, size: 18, color: c.ink2)),
                      const SizedBox(width: 12),
                      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Text(t.$2, maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: c.ink)),
                        Text(t.$3, maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 11, color: c.ink3)),
                      ])),
                      Switch.adaptive(value: types[t.$1]!, activeThumbColor: Colors.white, activeTrackColor: c.accent, onChanged: (v) => setState(() => types[t.$1] = v)),
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
              const CardTitle("Flux d'alertes"),
              ...alertFeed.map((a) => Padding(
                    padding: const EdgeInsets.symmetric(vertical: 7),
                    child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      Container(width: 30, height: 30, decoration: BoxDecoration(color: a.color.withValues(alpha: 0.16), borderRadius: BorderRadius.circular(9)), child: Icon(Icons.notifications_rounded, size: 15, color: a.color)),
                      const SizedBox(width: 12),
                      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Text(a.title, style: TextStyle(fontSize: 13, color: c.ink)),
                        Text('${a.site} · il y a ${a.time}', style: TextStyle(fontSize: 11, color: c.ink3)),
                      ])),
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
              const CardTitle('Rapports automatiques'),
              Row(children: [
                _opt('weekly', 'Hebdomadaire', c),
                const SizedBox(width: 10),
                _opt('monthly', 'Mensuel', c),
              ]),
              const SizedBox(height: 12),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(color: c.surface2, borderRadius: BorderRadius.circular(12)),
                child: Row(children: [
                  Icon(Icons.mail_outline_rounded, size: 16, color: c.accent),
                  const SizedBox(width: 8),
                  Text('Envoyé à ', style: TextStyle(fontSize: 13, color: c.ink2)),
                  Expanded(child: Text('bessie@galylio.com', maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: c.ink))),
                ]),
              ),
            ]),
          ),
        ),
      ],
    );
  }

  Widget _opt(String id, String label, AppColors c) {
    final sel = report == id;
    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => report = id),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.symmetric(vertical: 14),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: sel ? c.accent : c.line, width: 2),
          ),
          child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
            Icon(Icons.event_rounded, size: 16, color: sel ? c.accent : c.ink3),
            const SizedBox(width: 8),
            Text(label, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: c.ink)),
          ]),
        ),
      ),
    );
  }
}
