import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../main.dart';
import '../theme/app_theme.dart';
import '../data/mock.dart';
import '../widgets/common.dart';

class SettingsPage extends StatefulWidget {
  const SettingsPage({super.key});
  @override
  State<SettingsPage> createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  int tab = 0;
  final tabs = const ['Profil', 'Apparence', 'Notifications', 'API', 'Secteurs'];
  Map<String, bool> notifs = {'price': true, 'weekly': true, 'stock': true, 'seo': false};
  late List<bool> secActive = List.generate(sectors.length, (i) => i < 3);
  bool copied = false;
  static const apiKey = '1111_sk_live_8f3a92c7d4e1b6a05f2c9e7d';

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return PageScaffold(
      crumbs: const ['1111.tn', 'Paramètres'],
      title: 'Paramètres',
      description: 'Profil, apparence, notifications, accès API et secteurs suivis.',
      children: [
        SizedBox(
          height: 40,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            itemCount: tabs.length,
            separatorBuilder: (_, _) => const SizedBox(width: 8),
            itemBuilder: (_, i) {
              final sel = tab == i;
              return GestureDetector(
                onTap: () => setState(() => tab = i),
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 200),
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    gradient: sel ? c.accentGradient : null,
                    color: sel ? null : c.surface2,
                    borderRadius: BorderRadius.circular(999),
                    border: Border.all(color: sel ? Colors.transparent : c.line),
                  ),
                  child: Text(tabs[i], style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: sel ? Colors.white : c.ink2)),
                ),
              );
            },
          ),
        ),
        const SizedBox(height: 16),
        AnimatedSwitcher(
          duration: const Duration(milliseconds: 300),
          transitionBuilder: (ch, a) => FadeTransition(opacity: a, child: SlideTransition(position: Tween(begin: const Offset(0, 0.04), end: Offset.zero).animate(a), child: ch)),
          child: KeyedSubtree(key: ValueKey(tab), child: _content(c)),
        ),
      ],
    );
  }

  Widget _content(AppColors c) {
    switch (tab) {
      case 1:
        return _appearance(c);
      case 2:
        return _notifications(c);
      case 3:
        return _api(c);
      case 4:
        return _sectorsTab(c);
      default:
        return _profile(c);
    }
  }

  Widget _profile(AppColors c) => AppCard(
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          const CardTitle('Profil'),
          Row(children: [
            Container(width: 60, height: 60, decoration: BoxDecoration(gradient: c.accentGradient, shape: BoxShape.circle), alignment: Alignment.center, child: const Text('BC', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w800, fontSize: 18))),
            const SizedBox(width: 14),
            Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              OutlinedButton(onPressed: () {}, style: OutlinedButton.styleFrom(side: BorderSide(color: c.line)), child: Text("Changer l'avatar", style: TextStyle(color: c.ink, fontSize: 12))),
              const SizedBox(height: 4),
              Text('JPG ou PNG. Max 2 Mo.', style: TextStyle(fontSize: 11, color: c.ink3)),
            ])),
          ]),
          const SizedBox(height: 16),
          _field('Nom complet', 'Bessie Cooper', c),
          const SizedBox(height: 12),
          _field('Société', 'Galylio', c),
          const SizedBox(height: 12),
          _field('E-mail', 'bessie@galylio.com', c),
          const SizedBox(height: 16),
          SizedBox(width: double.infinity, child: AccentButton('Enregistrer', Icons.check_rounded)),
        ]),
      );

  Widget _appearance(AppColors c) => AppCard(
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          const CardTitle('Apparence'),
          Text("Choisissez le thème de l'interface.", style: TextStyle(fontSize: 13, color: c.ink2)),
          const SizedBox(height: 14),
          Row(children: [
            _themeCard('Clair', Icons.light_mode_rounded, !c.isDark, () => themeMode.value = ThemeMode.light, c),
            const SizedBox(width: 12),
            _themeCard('Sombre', Icons.dark_mode_rounded, c.isDark, () => themeMode.value = ThemeMode.dark, c),
          ]),
        ]),
      );

  Widget _themeCard(String label, IconData icon, bool sel, VoidCallback onTap, AppColors c) => Expanded(
        child: GestureDetector(
          onTap: onTap,
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 220),
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(borderRadius: BorderRadius.circular(16), border: Border.all(color: sel ? c.accent : c.line, width: 2)),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Container(
                height: 56,
                decoration: BoxDecoration(color: label == 'Clair' ? const Color(0xFFF5F6F9) : const Color(0xFF14161E), borderRadius: BorderRadius.circular(10)),
                padding: const EdgeInsets.all(8),
                child: Row(children: [
                  Container(width: 16, height: double.infinity, decoration: BoxDecoration(color: label == 'Clair' ? Colors.white : const Color(0xFF1B1E28), borderRadius: BorderRadius.circular(5))),
                  const SizedBox(width: 6),
                  Expanded(child: Column(mainAxisAlignment: MainAxisAlignment.center, crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Container(height: 6, decoration: BoxDecoration(gradient: c.accentGradient, borderRadius: BorderRadius.circular(3))),
                    const SizedBox(height: 4),
                    Container(height: 6, width: 40, decoration: BoxDecoration(color: label == 'Clair' ? Colors.white : const Color(0xFF1B1E28), borderRadius: BorderRadius.circular(3))),
                  ])),
                ]),
              ),
              const SizedBox(height: 10),
              Row(children: [
                Icon(icon, size: 16, color: c.ink),
                const SizedBox(width: 6),
                Text(label, style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: c.ink)),
                const Spacer(),
                if (sel) Icon(Icons.check_circle_rounded, size: 18, color: c.accent),
              ]),
            ]),
          ),
        ),
      );

  Widget _notifications(AppColors c) {
    final items = [
      ('price', 'Variations de prix', 'Alertes sur les changements concurrents'),
      ('weekly', 'Rapport hebdomadaire', 'Synthèse de votre veille tarifaire'),
      ('stock', 'Ruptures de stock', 'Quand un produit suivi devient indisponible'),
      ('seo', 'Changements SEO', 'Modifications de méta-données concurrentes'),
    ];
    return AppCard(
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        const CardTitle('Notifications'),
        ...items.map((n) => Padding(
              padding: const EdgeInsets.symmetric(vertical: 6),
              child: Row(children: [
                Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(n.$2, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: c.ink)),
                  Text(n.$3, maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 11, color: c.ink3)),
                ])),
                Switch.adaptive(value: notifs[n.$1]!, activeThumbColor: Colors.white, activeTrackColor: c.accent, onChanged: (v) => setState(() => notifs[n.$1] = v)),
              ]),
            )),
      ]),
    );
  }

  Widget _api(AppColors c) => AppCard(
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          const CardTitle('API & Accès'),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(color: c.accentSoft, borderRadius: BorderRadius.circular(12), border: Border.all(color: c.accent.withValues(alpha: 0.3))),
            child: Row(children: [
              Icon(Icons.vpn_key_rounded, size: 16, color: c.accent),
              const SizedBox(width: 8),
              Expanded(child: Text('Accès API REST inclus avec les plans Business et Enterprise.', style: TextStyle(fontSize: 12, color: c.ink2))),
            ]),
          ),
          const SizedBox(height: 14),
          Text('CLÉ API', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: c.ink3, letterSpacing: 0.4)),
          const SizedBox(height: 6),
          Row(children: [
            Expanded(
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 13),
                decoration: BoxDecoration(color: c.surface2, borderRadius: BorderRadius.circular(12), border: Border.all(color: c.line)),
                child: Text(apiKey, maxLines: 1, overflow: TextOverflow.ellipsis, style: TextStyle(fontSize: 13, fontFamily: 'monospace', color: c.ink)),
              ),
            ),
            const SizedBox(width: 8),
            GestureDetector(
              onTap: () {
                Clipboard.setData(const ClipboardData(text: apiKey));
                setState(() => copied = true);
                Future.delayed(const Duration(milliseconds: 1500), () { if (mounted) setState(() => copied = false); });
              },
              child: Container(
                width: 46, height: 46,
                decoration: BoxDecoration(color: c.surface2, borderRadius: BorderRadius.circular(12), border: Border.all(color: c.line)),
                child: Icon(copied ? Icons.check_rounded : Icons.copy_rounded, size: 18, color: copied ? c.good : c.ink2),
              ),
            ),
          ]),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(color: c.surface2, borderRadius: BorderRadius.circular(12), border: Border.all(color: c.line)),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text('ENDPOINT', style: TextStyle(fontSize: 10, color: c.ink3, letterSpacing: 0.4)),
              Text('https://api.1111.tn/v1', style: TextStyle(fontSize: 13, fontFamily: 'monospace', color: c.ink)),
            ]),
          ),
        ]),
      );

  Widget _sectorsTab(AppColors c) => AppCard(
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          const CardTitle('Segmentation par secteur'),
          Text("Sélectionnez les verticaux à suivre — l'interface s'adapte.", style: TextStyle(fontSize: 13, color: c.ink2)),
          const SizedBox(height: 12),
          ...List.generate(sectors.length, (i) => Container(
                margin: const EdgeInsets.only(bottom: 8),
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                decoration: BoxDecoration(color: c.surface2, borderRadius: BorderRadius.circular(12), border: Border.all(color: c.line)),
                child: Row(children: [
                  Container(width: 36, height: 36, decoration: BoxDecoration(color: c.accentSoft, borderRadius: BorderRadius.circular(11)), child: Icon(Icons.category_rounded, size: 17, color: c.accent)),
                  const SizedBox(width: 12),
                  Expanded(child: Text(sectors[i], style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: c.ink))),
                  Switch.adaptive(value: secActive[i], activeThumbColor: Colors.white, activeTrackColor: c.accent, onChanged: (v) => setState(() => secActive[i] = v)),
                ]),
              )),
        ]),
      );

  Widget _field(String label, String value, AppColors c) => Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(label.toUpperCase(), style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: c.ink3, letterSpacing: 0.4)),
        const SizedBox(height: 6),
        TextFormField(
          initialValue: value,
          style: TextStyle(fontSize: 14, color: c.ink),
          decoration: InputDecoration(
            filled: true,
            fillColor: c.surface2,
            contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 13),
            enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide(color: c.line)),
            focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide(color: c.accent)),
          ),
        ),
      ]);
}
