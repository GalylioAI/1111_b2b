import 'package:flutter/material.dart';

/// Design tokens mirrored from the 1111.tn web dashboard.
/// Accent = forest green rgb(73,136,91). Two palettes: light & dark.
class AppColors {
  final Color app;
  final Color surface;
  final Color surface2;
  final Color surface3;
  final Color line;
  final Color ink;
  final Color ink2;
  final Color ink3;
  final Color accent;
  final Color accent2;
  final Color accent3;
  final Color good;
  final Color warn;
  final Color danger;
  final bool isDark;

  const AppColors({
    required this.app,
    required this.surface,
    required this.surface2,
    required this.surface3,
    required this.line,
    required this.ink,
    required this.ink2,
    required this.ink3,
    required this.accent,
    required this.accent2,
    required this.accent3,
    required this.good,
    required this.warn,
    required this.danger,
    required this.isDark,
  });

  Color get accentSoft => accent.withValues(alpha: isDark ? 0.18 : 0.12);
  LinearGradient get accentGradient => LinearGradient(
        colors: [accent, accent2],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      );

  static const light = AppColors(
    app: Color(0xFFF5F6F9),
    surface: Color(0xFFFFFFFF),
    surface2: Color(0xFFF1F3F7),
    surface3: Color(0xFFE9ECF2),
    line: Color(0x12111827),
    ink: Color(0xFF1D2230),
    ink2: Color(0xFF626A7A),
    ink3: Color(0xFF9AA1AF),
    accent: Color(0xFF49885B),
    accent2: Color(0xFF5EA372),
    accent3: Color(0xFF9FCFA9),
    good: Color(0xFF22C993),
    warn: Color(0xFFF7A23B),
    danger: Color(0xFFF76B6B),
    isDark: false,
  );

  static const dark = AppColors(
    app: Color(0xFF14161E),
    surface: Color(0xFF1B1E28),
    surface2: Color(0xFF232733),
    surface3: Color(0xFF2B3040),
    line: Color(0x14FFFFFF),
    ink: Color(0xFFF3F4F8),
    ink2: Color(0xFFA6ABBA),
    ink3: Color(0xFF6C7184),
    accent: Color(0xFF52946A),
    accent2: Color(0xFF6FB487),
    accent3: Color(0xFFA9D6B6),
    good: Color(0xFF2FD99E),
    warn: Color(0xFFFFB14D),
    danger: Color(0xFFFF7A7A),
    isDark: true,
  );
}

/// InheritedWidget-ish access via Theme extension.
class AppPalette extends ThemeExtension<AppPalette> {
  final AppColors c;
  const AppPalette(this.c);

  @override
  AppPalette copyWith({AppColors? c}) => AppPalette(c ?? this.c);

  @override
  AppPalette lerp(ThemeExtension<AppPalette>? other, double t) => this;
}

extension PaletteX on BuildContext {
  AppColors get c => Theme.of(this).extension<AppPalette>()!.c;
}

ThemeData buildTheme(AppColors c) {
  final base = c.isDark ? ThemeData.dark() : ThemeData.light();
  return base.copyWith(
    scaffoldBackgroundColor: c.app,
    canvasColor: c.app,
    colorScheme: base.colorScheme.copyWith(
      primary: c.accent,
      secondary: c.accent2,
      surface: c.surface,
      brightness: c.isDark ? Brightness.dark : Brightness.light,
    ),
    extensions: [AppPalette(c)],
    textTheme: base.textTheme.apply(
      bodyColor: c.ink,
      displayColor: c.ink,
      fontFamily: 'Roboto',
    ),
    splashFactory: InkSparkle.splashFactory,
    pageTransitionsTheme: const PageTransitionsTheme(
      builders: {
        TargetPlatform.android: _FadeThroughBuilder(),
        TargetPlatform.iOS: _FadeThroughBuilder(),
      },
    ),
  );
}

class _FadeThroughBuilder extends PageTransitionsBuilder {
  const _FadeThroughBuilder();
  @override
  Widget buildTransitions<T>(route, context, animation, secondary, child) {
    final curved = CurvedAnimation(parent: animation, curve: Curves.easeOutCubic);
    return FadeTransition(
      opacity: curved,
      child: SlideTransition(
        position: Tween(begin: const Offset(0, 0.03), end: Offset.zero).animate(curved),
        child: child,
      ),
    );
  }
}
