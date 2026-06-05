import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../data/mock.dart';

/// Staggered entrance: fade + slide up, with optional delay.
class Reveal extends StatefulWidget {
  final Widget child;
  final int delayMs;
  final double offsetY;
  const Reveal({super.key, required this.child, this.delayMs = 0, this.offsetY = 18});

  @override
  State<Reveal> createState() => _RevealState();
}

class _RevealState extends State<Reveal> with SingleTickerProviderStateMixin {
  late final AnimationController _ctrl =
      AnimationController(vsync: this, duration: const Duration(milliseconds: 560));
  late final Animation<double> _a =
      CurvedAnimation(parent: _ctrl, curve: const Cubic(0.22, 1, 0.36, 1));

  @override
  void initState() {
    super.initState();
    Future.delayed(Duration(milliseconds: widget.delayMs), () {
      if (mounted) _ctrl.forward();
    });
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _a,
      builder: (_, child) => Opacity(
        opacity: _a.value,
        child: Transform.translate(offset: Offset(0, (1 - _a.value) * widget.offsetY), child: child),
      ),
      child: widget.child,
    );
  }
}

class AppCard extends StatelessWidget {
  final Widget child;
  final EdgeInsets padding;
  const AppCard({super.key, required this.child, this.padding = const EdgeInsets.all(18)});

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return Container(
      padding: padding,
      decoration: BoxDecoration(
        color: c.surface,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: c.line),
        boxShadow: [
          BoxShadow(
            color: c.isDark ? Colors.black.withValues(alpha: 0.35) : Colors.black.withValues(alpha: 0.06),
            blurRadius: 24,
            offset: const Offset(0, 12),
          ),
        ],
      ),
      child: child,
    );
  }
}

class CardTitle extends StatelessWidget {
  final String title;
  final Widget? trailing;
  const CardTitle(this.title, {super.key, this.trailing});
  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Row(
        children: [
          Expanded(
            child: Text(title,
                style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600, color: c.ink, letterSpacing: -0.2)),
          ),
          ?trailing,
        ],
      ),
    );
  }
}

class SiteBadge extends StatelessWidget {
  final String name;
  final double size;
  const SiteBadge(this.name, {super.key, this.size = 34});
  @override
  Widget build(BuildContext context) {
    final c = context.c;
    final site = siteOf(name);
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(size * 0.28),
        border: Border.all(color: c.line),
        boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.08), blurRadius: 4, offset: const Offset(0, 1))],
      ),
      clipBehavior: Clip.antiAlias,
      child: Padding(
        padding: EdgeInsets.all(size * 0.12),
        child: Image.asset(site.logo, fit: BoxFit.contain),
      ),
    );
  }
}

class TrendPill extends StatelessWidget {
  final double value;
  final bool invert;
  const TrendPill(this.value, {super.key, this.invert = false});
  @override
  Widget build(BuildContext context) {
    final c = context.c;
    final up = value > 0;
    final positive = invert ? up : !up;
    final color = positive ? c.good : c.danger;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(color: color.withValues(alpha: 0.12), borderRadius: BorderRadius.circular(999)),
      child: Row(mainAxisSize: MainAxisSize.min, children: [
        Icon(up ? Icons.arrow_outward_rounded : Icons.south_east_rounded, size: 13, color: color),
        const SizedBox(width: 2),
        Text('${up ? '+' : ''}${value.toStringAsFixed(1)}%',
            style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: color)),
      ]),
    );
  }
}

class KpiCard extends StatelessWidget {
  final Kpi kpi;
  const KpiCard(this.kpi, {super.key});
  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return AppCard(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(kpi.label.toUpperCase(),
              maxLines: 2,
              style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, letterSpacing: 0.4, color: c.ink3, height: 1.2)),
          const SizedBox(height: 8),
          Text(kpi.value,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: c.ink, letterSpacing: -0.5)),
          const SizedBox(height: 8),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
            decoration: BoxDecoration(
              color: (kpi.up ? c.good : c.danger).withValues(alpha: 0.12),
              borderRadius: BorderRadius.circular(999),
            ),
            child: Row(mainAxisSize: MainAxisSize.min, children: [
              Icon(kpi.up ? Icons.arrow_outward_rounded : Icons.south_east_rounded,
                  size: 13, color: kpi.up ? c.good : c.danger),
              const SizedBox(width: 3),
              Text(kpi.delta,
                  style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: kpi.up ? c.good : c.danger)),
            ]),
          ),
        ],
      ),
    );
  }
}

/// Animated horizontal progress bar.
class ProgressBar extends StatelessWidget {
  final double value; // 0..1
  final Color? color;
  final double height;
  const ProgressBar(this.value, {super.key, this.color, this.height = 8});
  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return ClipRRect(
      borderRadius: BorderRadius.circular(999),
      child: Container(
        height: height,
        color: c.surface3,
        child: Align(
          alignment: Alignment.centerLeft,
          child: TweenAnimationBuilder<double>(
            tween: Tween(begin: 0, end: value.clamp(0, 1)),
            duration: const Duration(milliseconds: 1000),
            curve: const Cubic(0.22, 1, 0.36, 1),
            builder: (_, v, _) => FractionallySizedBox(
              widthFactor: v,
              child: Container(
                decoration: BoxDecoration(
                  gradient: color == null ? c.accentGradient : null,
                  color: color,
                  borderRadius: BorderRadius.circular(999),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class AccentButton extends StatelessWidget {
  final String label;
  final IconData icon;
  final VoidCallback? onTap;
  const AccentButton(this.label, this.icon, {super.key, this.onTap});
  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return Material(
      color: Colors.transparent,
      child: InkWell(
        borderRadius: BorderRadius.circular(999),
        onTap: onTap ?? () {},
        child: Ink(
          decoration: BoxDecoration(gradient: c.accentGradient, borderRadius: BorderRadius.circular(999)),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 11),
          child: Row(mainAxisSize: MainAxisSize.min, children: [
            Icon(icon, size: 16, color: Colors.white),
            const SizedBox(width: 8),
            Text(label, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w600, fontSize: 13)),
          ]),
        ),
      ),
    );
  }
}

class Tag extends StatelessWidget {
  final String text;
  final Color color;
  const Tag(this.text, this.color, {super.key});
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(color: color.withValues(alpha: 0.14), borderRadius: BorderRadius.circular(999)),
      child: Text(text, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: color)),
    );
  }
}

/// A page scaffold body with a header (breadcrumb + title + optional action).
class PageScaffold extends StatelessWidget {
  final List<String> crumbs;
  final String title;
  final String? description;
  final Widget? action;
  final List<Widget> children;
  const PageScaffold({
    super.key,
    required this.crumbs,
    required this.title,
    this.description,
    this.action,
    required this.children,
  });

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 32),
      children: [
        Reveal(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  for (int i = 0; i < crumbs.length; i++) ...[
                    Text(crumbs[i].toUpperCase(),
                        style: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.w700,
                            letterSpacing: 1,
                            color: i == crumbs.length - 1 ? c.accent : c.ink3)),
                    if (i < crumbs.length - 1)
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 4),
                        child: Icon(Icons.chevron_right_rounded, size: 14, color: c.ink3),
                      ),
                  ],
                ],
              ),
              const SizedBox(height: 6),
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: Text(title,
                        style: TextStyle(fontSize: 26, fontWeight: FontWeight.w800, color: c.ink, letterSpacing: -0.6)),
                  ),
                  ?action,
                ],
              ),
              if (description != null) ...[
                const SizedBox(height: 4),
                Text(description!, style: TextStyle(fontSize: 13, color: c.ink2, height: 1.4)),
              ],
            ],
          ),
        ),
        const SizedBox(height: 20),
        ...children,
      ],
    );
  }
}
