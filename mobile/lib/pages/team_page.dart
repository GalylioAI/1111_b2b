import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../data/mock.dart';
import '../widgets/common.dart';

class TeamPage extends StatelessWidget {
  const TeamPage({super.key});

  IconData _roleIcon(String r) => r == 'Administrateur'
      ? Icons.shield_rounded
      : r == 'Analyste'
          ? Icons.bar_chart_rounded
          : Icons.visibility_rounded;

  Color _roleColor(String r, AppColors c) =>
      r == 'Administrateur' ? c.accent : r == 'Analyste' ? c.good : c.warn;

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return PageScaffold(
      crumbs: const ['1111.tn', 'Équipe'],
      title: 'Équipe & Accès',
      description: 'Gestion des accès multi-utilisateurs avec attribution de rôles distincts.',
      action: AccentButton('Inviter', Icons.person_add_rounded),
      children: [
        LayoutBuilder(builder: (ctx, con) {
          final w = (con.maxWidth - 12) / 2;
          return Wrap(spacing: 12, runSpacing: 12, children: [
            for (int i = 0; i < roles.length; i++)
              SizedBox(
                width: i == roles.length - 1 ? con.maxWidth : w,
                child: Reveal(
                  delayMs: i * 70,
                  child: AppCard(
                    padding: const EdgeInsets.all(16),
                    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                      Row(children: [
                        Container(width: 40, height: 40, decoration: BoxDecoration(color: _roleColor(roles[i].name, c).withValues(alpha: 0.15), borderRadius: BorderRadius.circular(12)), child: Icon(_roleIcon(roles[i].name), size: 20, color: _roleColor(roles[i].name, c))),
                        const Spacer(),
                        Text('${roles[i].count}', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: c.ink)),
                      ]),
                      const SizedBox(height: 10),
                      Text(roles[i].name, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: c.ink)),
                      const SizedBox(height: 3),
                      Text(roles[i].desc, style: TextStyle(fontSize: 11, color: c.ink3, height: 1.3)),
                    ]),
                  ),
                ),
              ),
          ]);
        }),
        const SizedBox(height: 16),
        Reveal(
          delayMs: 160,
          child: AppCard(
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const CardTitle("Membres de l'équipe"),
              ...team.map((m) => Padding(
                    padding: const EdgeInsets.symmetric(vertical: 8),
                    child: Row(children: [
                      Stack(children: [
                        Container(width: 42, height: 42, decoration: BoxDecoration(color: m.color, shape: BoxShape.circle), alignment: Alignment.center, child: Text(m.initials, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 13))),
                        if (m.online) Positioned(right: 0, bottom: 0, child: Container(width: 12, height: 12, decoration: BoxDecoration(color: c.good, shape: BoxShape.circle, border: Border.all(color: c.surface, width: 2)))),
                      ]),
                      const SizedBox(width: 12),
                      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                        Text(m.name, maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: c.ink)),
                        Text(m.email, maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 12, color: c.ink3)),
                      ])),
                      const SizedBox(width: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 5),
                        decoration: BoxDecoration(color: _roleColor(m.role, c).withValues(alpha: 0.14), borderRadius: BorderRadius.circular(999)),
                        child: Row(mainAxisSize: MainAxisSize.min, children: [
                          Icon(_roleIcon(m.role), size: 12, color: _roleColor(m.role, c)),
                          const SizedBox(width: 4),
                          Text(m.role, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: _roleColor(m.role, c))),
                        ]),
                      ),
                    ]),
                  )),
            ]),
          ),
        ),
      ],
    );
  }
}
