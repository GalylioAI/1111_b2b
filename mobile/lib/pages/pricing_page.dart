import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../data/mock.dart';
import '../widgets/common.dart';

class PricingPage extends StatelessWidget {
  const PricingPage({super.key});

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return PageScaffold(
      crumbs: const ['1111.tn', 'Tarifs'],
      title: 'Plans & Abonnement',
      description: "Choisissez le plan adapté à votre activité — de l'indépendant aux grands groupes.",
      children: [
        for (int i = 0; i < plans.length; i++)
          Padding(
            padding: const EdgeInsets.only(bottom: 14),
            child: Reveal(
              delayMs: i * 80,
              child: Container(
                padding: const EdgeInsets.all(18),
                decoration: BoxDecoration(
                  color: c.surface,
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(color: plans[i].highlight ? c.accent : c.line, width: plans[i].highlight ? 2 : 1),
                  boxShadow: plans[i].highlight
                      ? [BoxShadow(color: c.accent.withValues(alpha: 0.22), blurRadius: 30, offset: const Offset(0, 14))]
                      : null,
                ),
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Row(children: [
                    Expanded(
                      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Row(children: [
                          Text(plans[i].name, style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: c.ink)),
                          if (plans[i].highlight) ...[
                            const SizedBox(width: 8),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                              decoration: BoxDecoration(gradient: c.accentGradient, borderRadius: BorderRadius.circular(999)),
                              child: const Text('POPULAIRE', style: TextStyle(fontSize: 9, fontWeight: FontWeight.w800, color: Colors.white, letterSpacing: 0.5)),
                            ),
                          ],
                        ]),
                        Text(plans[i].target, style: TextStyle(fontSize: 12, color: c.ink3)),
                      ]),
                    ),
                    if (plans[i].price != 'Sur devis')
                      Row(crossAxisAlignment: CrossAxisAlignment.end, children: [
                        Text(plans[i].price, style: TextStyle(fontSize: 30, fontWeight: FontWeight.w800, color: c.ink)),
                        Padding(padding: const EdgeInsets.only(bottom: 5), child: Text(' TND', style: TextStyle(fontSize: 12, color: c.ink3))),
                      ])
                    else
                      Text('Sur devis', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: c.ink)),
                  ]),
                  const SizedBox(height: 14),
                  ...plans[i].features.map((f) => Padding(
                        padding: const EdgeInsets.only(bottom: 8),
                        child: Row(children: [
                          Container(width: 18, height: 18, decoration: BoxDecoration(gradient: plans[i].highlight ? c.accentGradient : null, color: plans[i].highlight ? null : c.accentSoft, shape: BoxShape.circle), child: Icon(Icons.check_rounded, size: 12, color: plans[i].highlight ? Colors.white : c.accent)),
                          const SizedBox(width: 10),
                          Expanded(child: Text(f, style: TextStyle(fontSize: 13, color: c.ink2))),
                        ]),
                      )),
                  const SizedBox(height: 14),
                  SizedBox(
                    width: double.infinity,
                    child: plans[i].highlight
                        ? AccentButton(plans[i].price == 'Sur devis' ? 'Nous contacter' : 'Choisir ce plan', Icons.arrow_forward_rounded)
                        : OutlinedButton(
                            onPressed: () {},
                            style: OutlinedButton.styleFrom(
                              side: BorderSide(color: c.line),
                              padding: const EdgeInsets.symmetric(vertical: 13),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                            ),
                            child: Text(plans[i].price == 'Sur devis' ? 'Nous contacter' : 'Choisir ce plan', style: TextStyle(color: c.ink, fontWeight: FontWeight.w600)),
                          ),
                  ),
                ]),
              ),
            ),
          ),
        const SizedBox(height: 4),
        Center(
          child: Text('company@galylio.com · 1111.tn par Galylio',
              style: TextStyle(fontSize: 12, color: c.ink3)),
        ),
      ],
    );
  }
}
