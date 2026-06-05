import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../data/mock.dart';
import '../widgets/common.dart';

class SuppliersPage extends StatelessWidget {
  const SuppliersPage({super.key});

  Color _priceColor(String p, AppColors c) {
    switch (p) {
      case 'Très bas':
      case 'Bas':
        return c.good;
      case 'Compétitif':
        return c.accent;
      default:
        return c.warn;
    }
  }

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return PageScaffold(
      crumbs: const ['1111.tn', 'Fournisseurs'],
      title: 'Comparaison fournisseurs',
      description: 'Identifiez les meilleures sources d\'approvisionnement pour vos achats B2B.',
      action: AccentButton('Ajouter', Icons.add_rounded),
      children: [
        for (int i = 0; i < suppliers.length; i++)
          Padding(
            padding: const EdgeInsets.only(bottom: 14),
            child: Reveal(
              delayMs: i * 80,
              child: AppCard(
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Row(children: [
                    Container(
                      width: 48, height: 48,
                      decoration: BoxDecoration(gradient: c.accentGradient, borderRadius: BorderRadius.circular(14)),
                      child: const Icon(Icons.local_shipping_rounded, color: Colors.white, size: 22),
                    ),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Text(suppliers[i].name, maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700, color: c.ink)),
                        Text('${suppliers[i].products} produits référencés', style: TextStyle(fontSize: 12, color: c.ink3)),
                      ]),
                    ),
                  ]),
                  const SizedBox(height: 14),
                  Row(children: [
                    _mini('Tarif', suppliers[i].avgPrice, _priceColor(suppliers[i].avgPrice, c), Icons.payments_rounded, c),
                    const SizedBox(width: 10),
                    _mini('Fiabilité', '${suppliers[i].reliability}%', c.ink, Icons.verified_user_rounded, c),
                    const SizedBox(width: 10),
                    _mini('Délai', suppliers[i].lead, c.ink, Icons.schedule_rounded, c),
                  ]),
                  const SizedBox(height: 12),
                  ProgressBar(suppliers[i].reliability / 100),
                ]),
              ),
            ),
          ),
      ],
    );
  }

  Widget _mini(String label, String value, Color color, IconData icon, AppColors c) => Expanded(
        child: Container(
          padding: const EdgeInsets.all(11),
          decoration: BoxDecoration(color: c.surface2, borderRadius: BorderRadius.circular(12), border: Border.all(color: c.line)),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(children: [Icon(icon, size: 13, color: c.ink3), const SizedBox(width: 3), Flexible(child: Text(label, maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 10, color: c.ink3)))]),
            const SizedBox(height: 5),
            Text(value, maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: color)),
          ]),
        ),
      );
}
