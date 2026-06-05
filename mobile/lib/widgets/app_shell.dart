import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../data/mock.dart';
import '../pages/dashboard_page.dart';
import '../pages/tracking_page.dart';
import '../pages/comparison_page.dart';
import '../pages/catalog_page.dart';
import '../pages/alerts_page.dart';
import '../pages/analytics_page.dart';
import '../pages/seo_page.dart';
import '../pages/suppliers_page.dart';
import '../pages/reports_page.dart';
import '../pages/team_page.dart';
import '../pages/pricing_page.dart';
import '../pages/settings_page.dart';

class NavDest {
  final String route, label;
  final IconData icon;
  const NavDest(this.route, this.label, this.icon);
}

const allDests = <NavDest>[
  NavDest('dashboard', 'Tableau de bord', Icons.dashboard_rounded),
  NavDest('tracking', 'Suivi des prix', Icons.sell_rounded),
  NavDest('comparison', 'Comparaison', Icons.balance_rounded),
  NavDest('catalog', 'Catalogue', Icons.inventory_2_rounded),
  NavDest('alerts', 'Alertes & Watchlist', Icons.notifications_rounded),
  NavDest('analytics', 'Analytics & BI', Icons.insights_rounded),
  NavDest('seo', 'SEO Intelligence', Icons.search_rounded),
  NavDest('suppliers', 'Fournisseurs', Icons.local_shipping_rounded),
  NavDest('reports', 'Rapports', Icons.description_rounded),
  NavDest('team', 'Équipe', Icons.group_rounded),
  NavDest('pricing', 'Tarifs', Icons.workspace_premium_rounded),
  NavDest('settings', 'Paramètres', Icons.settings_rounded),
];

class AppShell extends StatefulWidget {
  const AppShell({super.key});
  @override
  State<AppShell> createState() => _AppShellState();
}

class _AppShellState extends State<AppShell> {
  final _scaffoldKey = GlobalKey<ScaffoldState>();
  String route = 'dashboard';
  String sector = sectors.first;

  Widget _pageFor(String r) {
    switch (r) {
      case 'tracking': return const TrackingPage();
      case 'comparison': return const ComparisonPage();
      case 'catalog': return const CatalogPage();
      case 'alerts': return const AlertsPage();
      case 'analytics': return const AnalyticsPage();
      case 'seo': return const SeoPage();
      case 'suppliers': return const SuppliersPage();
      case 'reports': return const ReportsPage();
      case 'team': return const TeamPage();
      case 'pricing': return const PricingPage();
      case 'settings': return const SettingsPage();
      default: return const DashboardPage();
    }
  }

  void _go(String r) => setState(() => route = r);

  void _openSector() {
    final c = context.c;
    showModalBottomSheet(
      context: context,
      backgroundColor: c.surface,
      showDragHandle: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (ctx) => SafeArea(
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          for (final s in sectors)
            ListTile(
              leading: Icon(Icons.category_rounded, color: s == sector ? c.accent : c.ink3),
              title: Text(s, style: TextStyle(color: c.ink, fontWeight: FontWeight.w500)),
              trailing: s == sector ? Icon(Icons.check_rounded, color: c.accent) : null,
              onTap: () {
                setState(() => sector = s);
                Navigator.pop(ctx);
              },
            ),
        ]),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return Scaffold(
      key: _scaffoldKey,
      backgroundColor: c.app,
      drawer: _Drawer(active: route, onSelect: _go),
      appBar: AppBar(
        backgroundColor: c.app.withValues(alpha: 0.95),
        surfaceTintColor: Colors.transparent,
        elevation: 0,
        scrolledUnderElevation: 0,
        automaticallyImplyLeading: false,
        titleSpacing: 16,
        title: GestureDetector(
          onTap: () => _scaffoldKey.currentState?.openDrawer(),
          behavior: HitTestBehavior.opaque,
          child: Row(mainAxisSize: MainAxisSize.min, children: [
            Container(
              width: 36, height: 36,
              decoration: BoxDecoration(gradient: c.accentGradient, borderRadius: BorderRadius.circular(11)),
              alignment: Alignment.center,
              child: const Text('1111', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w800, fontSize: 12)),
            ),
            const SizedBox(width: 10),
            Row(mainAxisSize: MainAxisSize.min, children: [
              Text('1111', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 17, color: c.ink)),
              Text('.tn', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 17, color: c.accent)),
            ]),
          ]),
        ),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 12),
            child: _SectorChip(label: sector, onTap: _openSector),
          ),
        ],
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(1),
          child: Container(height: 1, color: c.line),
        ),
      ),
      body: AnimatedSwitcher(
        duration: const Duration(milliseconds: 380),
        switchInCurve: Curves.easeOutCubic,
        transitionBuilder: (child, anim) => FadeTransition(
          opacity: anim,
          child: SlideTransition(
            position: Tween(begin: const Offset(0, 0.025), end: Offset.zero).animate(anim),
            child: child,
          ),
        ),
        child: KeyedSubtree(key: ValueKey(route), child: _pageFor(route)),
      ),
    );
  }
}

class _SectorChip extends StatelessWidget {
  final String label;
  final VoidCallback onTap;
  const _SectorChip({required this.label, required this.onTap});
  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return Material(
      color: Colors.transparent,
      child: InkWell(
        borderRadius: BorderRadius.circular(999),
        onTap: onTap,
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
          decoration: BoxDecoration(color: c.surface2, borderRadius: BorderRadius.circular(999), border: Border.all(color: c.line)),
          child: Row(mainAxisSize: MainAxisSize.min, children: [
            Icon(Icons.category_rounded, size: 15, color: c.accent),
            const SizedBox(width: 6),
            Text(label, style: TextStyle(fontSize: 12.5, fontWeight: FontWeight.w600, color: c.ink)),
            const SizedBox(width: 2),
            Icon(Icons.expand_more_rounded, size: 17, color: c.ink3),
          ]),
        ),
      ),
    );
  }
}

class _Drawer extends StatelessWidget {
  final String active;
  final ValueChanged<String> onSelect;
  const _Drawer({required this.active, required this.onSelect});

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return Drawer(
      backgroundColor: c.surface,
      width: 290,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.horizontal(right: Radius.circular(24))),
      child: SafeArea(
        child: Column(children: [
          // Brand header
          Padding(
            padding: const EdgeInsets.fromLTRB(18, 18, 12, 14),
            child: Row(children: [
              Container(
                width: 40, height: 40,
                decoration: BoxDecoration(gradient: c.accentGradient, borderRadius: BorderRadius.circular(12)),
                alignment: Alignment.center,
                child: const Text('1111', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w800, fontSize: 13)),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Row(children: [
                    Text('1111', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 16, color: c.ink)),
                    Text('.tn', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 16, color: c.accent)),
                  ]),
                  Text('PRICE INTELLIGENCE', style: TextStyle(fontSize: 9, letterSpacing: 1.3, color: c.ink3, fontWeight: FontWeight.w600)),
                ]),
              ),
              IconButton(onPressed: () => Navigator.pop(context), icon: Icon(Icons.close_rounded, color: c.ink3, size: 20)),
            ]),
          ),
          Divider(height: 1, color: c.line),
          // Nav list (scrollable)
          Expanded(
            child: ListView(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
              children: [
                for (final d in allDests) _DrawerItem(dest: d, active: d.route == active, onTap: () {
                  Navigator.pop(context);
                  onSelect(d.route);
                }),
              ],
            ),
          ),
          Divider(height: 1, color: c.line),
          // Profile footer
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
            child: Row(children: [
              Container(width: 40, height: 40, decoration: BoxDecoration(gradient: c.accentGradient, shape: BoxShape.circle), alignment: Alignment.center, child: const Text('BC', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 13))),
              const SizedBox(width: 12),
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text('Bessie Cooper', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: c.ink)),
                Text('Administrateur', style: TextStyle(fontSize: 11, color: c.ink3)),
              ])),
            ]),
          ),
        ]),
      ),
    );
  }
}

class _DrawerItem extends StatelessWidget {
  final NavDest dest;
  final bool active;
  final VoidCallback onTap;
  const _DrawerItem({required this.dest, required this.active, required this.onTap});
  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return Padding(
      padding: const EdgeInsets.only(bottom: 4),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(14),
          onTap: onTap,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 9),
            child: Row(children: [
              Container(
                width: 38, height: 38,
                decoration: BoxDecoration(
                  gradient: active ? c.accentGradient : null,
                  color: active ? null : c.surface2,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(dest.icon, size: 19, color: active ? Colors.white : c.ink2),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Text(dest.label,
                    style: TextStyle(
                        fontSize: 14.5,
                        fontWeight: active ? FontWeight.w700 : FontWeight.w500,
                        color: active ? c.accent : c.ink)),
              ),
            ]),
          ),
        ),
      ),
    );
  }
}
