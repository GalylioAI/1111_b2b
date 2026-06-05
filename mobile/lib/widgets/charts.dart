import 'dart:math';
import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

String _fmt(double v, int decimals) {
  if (decimals == 0 && v.abs() >= 1000) {
    final s = v.round().toString();
    final b = StringBuffer();
    for (int i = 0; i < s.length; i++) {
      if (i > 0 && (s.length - i) % 3 == 0) b.write(' ');
      b.write(s[i]);
    }
    return b.toString();
  }
  return v.toStringAsFixed(decimals);
}

/// ----- Sparkline -----
class Sparkline extends StatefulWidget {
  final List<double> data;
  final double width, height;
  const Sparkline(this.data, {super.key, this.width = 84, this.height = 30});
  @override
  State<Sparkline> createState() => _SparklineState();
}

class _SparklineState extends State<Sparkline> with SingleTickerProviderStateMixin {
  late final AnimationController _c =
      AnimationController(vsync: this, duration: const Duration(milliseconds: 900))..forward();
  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final up = widget.data.last >= widget.data.first;
    final color = up ? context.c.danger : context.c.good;
    return AnimatedBuilder(
      animation: _c,
      builder: (_, _) => CustomPaint(
        size: Size(widget.width, widget.height),
        painter: _SparkPainter(widget.data, color, Curves.easeOut.transform(_c.value)),
      ),
    );
  }
}

class _SparkPainter extends CustomPainter {
  final List<double> data;
  final Color color;
  final double p;
  _SparkPainter(this.data, this.color, this.p);
  @override
  void paint(Canvas canvas, Size size) {
    final mn = data.reduce(min), mx = data.reduce(max);
    final range = (mx - mn) == 0 ? 1 : (mx - mn);
    final dx = size.width / (data.length - 1);
    final pts = <Offset>[];
    for (int i = 0; i < data.length; i++) {
      final x = i * dx;
      final y = size.height - ((data[i] - mn) / range) * (size.height - 6) - 3;
      pts.add(Offset(x, y));
    }
    final path = Path()..moveTo(pts.first.dx, pts.first.dy);
    for (final pt in pts.skip(1)) {
      path.lineTo(pt.dx, pt.dy);
    }
    final area = Path.from(path)
      ..lineTo(size.width, size.height)
      ..lineTo(0, size.height)
      ..close();
    canvas.drawPath(
      area,
      Paint()
        ..shader = LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [color.withValues(alpha: 0.22 * p), color.withValues(alpha: 0)],
        ).createShader(Offset.zero & size),
    );
    _drawProgress(canvas, path, Paint()
      ..color = color
      ..strokeWidth = 2
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round, p);
  }

  @override
  bool shouldRepaint(covariant _SparkPainter old) => old.p != p;
}

void _drawProgress(Canvas canvas, Path path, Paint paint, double p) {
  for (final m in path.computeMetrics()) {
    canvas.drawPath(m.extractPath(0, m.length * p), paint);
  }
}

void _drawDashed(Canvas canvas, Path path, Paint paint, double p) {
  const dash = 6.0, gap = 5.0;
  for (final m in path.computeMetrics()) {
    double d = 0;
    final end = m.length * p;
    while (d < end) {
      canvas.drawPath(m.extractPath(d, min(d + dash, end)), paint);
      d += dash + gap;
    }
  }
}

/// ----- Area / line multi-series chart (tap to inspect values) -----
class LineSeries {
  final List<double> values;
  final Color color;
  final bool dashed;
  final bool fill;
  const LineSeries(this.values, this.color, {this.dashed = false, this.fill = false});
}

class AreaLineChart extends StatefulWidget {
  final List<LineSeries> series;
  final double minY, maxY;
  final List<String> xLabels;
  final List<double> yTicks;
  final List<String> seriesLabels;
  final int decimals;
  final double height;
  const AreaLineChart({
    super.key,
    required this.series,
    required this.minY,
    required this.maxY,
    this.xLabels = const [],
    this.yTicks = const [],
    this.seriesLabels = const [],
    this.decimals = 0,
    this.height = 240,
  });
  @override
  State<AreaLineChart> createState() => _AreaLineChartState();
}

class _AreaLineChartState extends State<AreaLineChart> with SingleTickerProviderStateMixin {
  static const double padL = 38, padR = 6;
  late final AnimationController _c =
      AnimationController(vsync: this, duration: const Duration(milliseconds: 1500))..forward();
  int? _sel;

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  void _select(double dx, double width) {
    final n = widget.series.first.values.length;
    final w = width - padL - padR;
    final step = n <= 1 ? 1 : w / (n - 1);
    final idx = ((dx - padL) / step).round().clamp(0, n - 1);
    if (idx != _sel) setState(() => _sel = idx);
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: widget.height,
      child: LayoutBuilder(builder: (ctx, con) {
        final width = con.maxWidth;
        return GestureDetector(
          behavior: HitTestBehavior.opaque,
          onTapDown: (d) => _select(d.localPosition.dx, width),
          onHorizontalDragStart: (d) => _select(d.localPosition.dx, width),
          onHorizontalDragUpdate: (d) => _select(d.localPosition.dx, width),
          child: AnimatedBuilder(
            animation: _c,
            builder: (_, _) => CustomPaint(
              size: Size.infinite,
              painter: _AreaPainter(
                widget.series, widget.minY, widget.maxY, widget.xLabels, widget.yTicks,
                widget.seriesLabels, widget.decimals, context.c,
                Curves.easeOutCubic.transform(_c.value), _sel,
              ),
            ),
          ),
        );
      }),
    );
  }
}

class _AreaPainter extends CustomPainter {
  final List<LineSeries> series;
  final double minY, maxY;
  final List<String> xLabels;
  final List<double> yTicks;
  final List<String> seriesLabels;
  final int decimals;
  final AppColors c;
  final double p;
  final int? sel;
  _AreaPainter(this.series, this.minY, this.maxY, this.xLabels, this.yTicks, this.seriesLabels, this.decimals, this.c, this.p, this.sel);

  static const double padL = 38, padB = 22, padT = 6, padR = 6;

  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width - padL - padR;
    final h = size.height - padB - padT;
    double yOf(double v) => padT + h - ((v - minY) / (maxY - minY)) * h;
    double xOf(int i, int n) => padL + (n <= 1 ? 0 : i * (w / (n - 1)));

    final gridPaint = Paint()
      ..color = c.line
      ..strokeWidth = 1;
    for (final t in yTicks) {
      final y = yOf(t);
      canvas.drawLine(Offset(padL, y), Offset(size.width - padR, y), gridPaint);
      _text(canvas, t.toStringAsFixed(0), Offset(0, y - 6), c.ink3, 10);
    }
    if (xLabels.isNotEmpty) {
      for (int i = 0; i < xLabels.length; i++) {
        final x = xOf(i, xLabels.length);
        _text(canvas, xLabels[i], Offset(x - 8, size.height - 14), c.ink3, 10);
      }
    }

    for (final s in series) {
      final n = s.values.length;
      final pts = [for (int i = 0; i < n; i++) Offset(xOf(i, n), yOf(s.values[i]))];
      final path = Path()..moveTo(pts.first.dx, pts.first.dy);
      for (int i = 0; i < pts.length - 1; i++) {
        final mid = Offset((pts[i].dx + pts[i + 1].dx) / 2, (pts[i].dy + pts[i + 1].dy) / 2);
        path.quadraticBezierTo(pts[i].dx, pts[i].dy, mid.dx, mid.dy);
      }
      path.lineTo(pts.last.dx, pts.last.dy);

      if (s.fill) {
        final area = Path.from(path)
          ..lineTo(pts.last.dx, padT + h)
          ..lineTo(pts.first.dx, padT + h)
          ..close();
        canvas.drawPath(
          area,
          Paint()
            ..shader = LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [s.color.withValues(alpha: 0.30 * p), s.color.withValues(alpha: 0)],
            ).createShader(Offset(0, padT) & Size(size.width, h)),
        );
      }
      final linePaint = Paint()
        ..color = s.color
        ..strokeWidth = s.dashed ? 2.2 : 3
        ..style = PaintingStyle.stroke
        ..strokeCap = StrokeCap.round
        ..strokeJoin = StrokeJoin.round;
      s.dashed ? _drawDashed(canvas, path, linePaint, p) : _drawProgress(canvas, path, linePaint, p);
    }

    // Selection overlay
    if (sel != null && p > 0.99) {
      final n = series.first.values.length;
      final x = xOf(sel!, n);
      canvas.drawLine(
        Offset(x, padT),
        Offset(x, padT + h),
        Paint()
          ..color = c.accent.withValues(alpha: 0.5)
          ..strokeWidth = 1.5,
      );
      for (final s in series) {
        final y = yOf(s.values[sel!]);
        canvas.drawCircle(Offset(x, y), 5, Paint()..color = c.surface);
        canvas.drawCircle(Offset(x, y), 5, Paint()
          ..color = s.color
          ..style = PaintingStyle.stroke
          ..strokeWidth = 3);
      }
      _tooltip(canvas, size, x);
    }
  }

  void _tooltip(Canvas canvas, Size size, double x) {
    final header = xLabels.isNotEmpty ? xLabels[sel!] : 'Jour ${sel! + 1}';
    final headerTp = _tp(header, c.ink, 11, FontWeight.w700);
    final rows = <(Color, TextPainter)>[];
    for (int k = 0; k < series.length; k++) {
      final label = k < seriesLabels.length ? '${seriesLabels[k]}  ' : '';
      final tp = _tp('$label${_fmt(series[k].values[sel!], decimals)}', c.ink2, 11, FontWeight.w500);
      rows.add((series[k].color, tp));
    }
    double boxW = headerTp.width;
    for (final r in rows) {
      boxW = max(boxW, r.$2.width + 14);
    }
    boxW += 20;
    final lineH = 16.0;
    final boxH = 12 + 16 + rows.length * lineH;
    double bx = (x - boxW / 2).clamp(padL, size.width - padR - boxW);
    const by = padT + 2.0;
    final rect = RRect.fromRectAndRadius(Rect.fromLTWH(bx, by, boxW, boxH), const Radius.circular(10));
    canvas.drawRRect(rect, Paint()..color = c.surface);
    canvas.drawRRect(rect, Paint()
      ..color = c.line
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1);
    headerTp.paint(canvas, Offset(bx + 10, by + 8));
    double cy = by + 8 + 18;
    for (final r in rows) {
      canvas.drawCircle(Offset(bx + 16, cy + 6), 3.5, Paint()..color = r.$1);
      r.$2.paint(canvas, Offset(bx + 24, cy));
      cy += lineH;
    }
  }

  TextPainter _tp(String s, Color color, double size, FontWeight w) {
    final tp = TextPainter(
      text: TextSpan(text: s, style: TextStyle(color: color, fontSize: size, fontWeight: w)),
      textDirection: TextDirection.ltr,
    )..layout();
    return tp;
  }

  void _text(Canvas canvas, String s, Offset o, Color color, double size) => _tp(s, color, size, FontWeight.w400).paint(canvas, o);

  @override
  bool shouldRepaint(covariant _AreaPainter old) => old.p != p || old.c != c || old.sel != sel;
}

/// ----- Donut -----
class Donut extends StatefulWidget {
  final List<({double pct, Color color})> segments;
  final double size;
  final double stroke;
  final String? centerTop, centerSub;
  const Donut({super.key, required this.segments, this.size = 168, this.stroke = 18, this.centerTop, this.centerSub});
  @override
  State<Donut> createState() => _DonutState();
}

class _DonutState extends State<Donut> with SingleTickerProviderStateMixin {
  late final AnimationController _c =
      AnimationController(vsync: this, duration: const Duration(milliseconds: 1200))..forward();
  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return SizedBox(
      width: widget.size,
      height: widget.size,
      child: AnimatedBuilder(
        animation: _c,
        builder: (_, _) => Stack(
          alignment: Alignment.center,
          children: [
            CustomPaint(
              size: Size.square(widget.size),
              painter: _DonutPainter(widget.segments, widget.stroke, c.surface3, Curves.easeOutCubic.transform(_c.value)),
            ),
            if (widget.centerTop != null)
              Column(mainAxisSize: MainAxisSize.min, children: [
                Text(widget.centerTop!, style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: c.ink)),
                if (widget.centerSub != null) Text(widget.centerSub!, style: TextStyle(fontSize: 12, color: c.ink3)),
              ]),
          ],
        ),
      ),
    );
  }
}

class _DonutPainter extends CustomPainter {
  final List<({double pct, Color color})> segs;
  final double stroke;
  final Color track;
  final double p;
  _DonutPainter(this.segs, this.stroke, this.track, this.p);
  @override
  void paint(Canvas canvas, Size size) {
    final center = size.center(Offset.zero);
    final r = (size.width - stroke) / 2;
    final rect = Rect.fromCircle(center: center, radius: r);
    canvas.drawCircle(center, r, Paint()
      ..color = track.withValues(alpha: 0.5)
      ..style = PaintingStyle.stroke
      ..strokeWidth = stroke);
    double start = -pi / 2;
    const gap = 0.06;
    for (final s in segs) {
      final sweep = (s.pct / 100) * 2 * pi * p;
      canvas.drawArc(rect, start + gap / 2, (sweep - gap).clamp(0.0, 2 * pi), false, Paint()
        ..color = s.color
        ..style = PaintingStyle.stroke
        ..strokeWidth = stroke
        ..strokeCap = StrokeCap.round);
      start += (s.pct / 100) * 2 * pi;
    }
  }

  @override
  bool shouldRepaint(covariant _DonutPainter old) => old.p != p;
}

/// ----- Ring gauge -----
class RingGauge extends StatefulWidget {
  final double value;
  final double size, stroke;
  final Color color;
  final String label;
  const RingGauge({super.key, required this.value, required this.color, required this.label, this.size = 96, this.stroke = 9});
  @override
  State<RingGauge> createState() => _RingGaugeState();
}

class _RingGaugeState extends State<RingGauge> with SingleTickerProviderStateMixin {
  late final AnimationController _c =
      AnimationController(vsync: this, duration: const Duration(milliseconds: 1200))..forward();
  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final c = context.c;
    return SizedBox(
      width: widget.size,
      height: widget.size,
      child: AnimatedBuilder(
        animation: _c,
        builder: (_, _) => Stack(alignment: Alignment.center, children: [
          CustomPaint(
            size: Size.square(widget.size),
            painter: _GaugePainter(widget.value * Curves.easeOutCubic.transform(_c.value), widget.color, c.surface3, widget.stroke),
          ),
          Text(widget.label, style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: c.ink)),
        ]),
      ),
    );
  }
}

class _GaugePainter extends CustomPainter {
  final double value;
  final Color color, track;
  final double stroke;
  _GaugePainter(this.value, this.color, this.track, this.stroke);
  @override
  void paint(Canvas canvas, Size size) {
    final center = size.center(Offset.zero);
    final r = (size.width - stroke) / 2;
    canvas.drawCircle(center, r, Paint()
      ..color = track
      ..style = PaintingStyle.stroke
      ..strokeWidth = stroke);
    canvas.drawArc(Rect.fromCircle(center: center, radius: r), -pi / 2, 2 * pi * value, false, Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = stroke
      ..strokeCap = StrokeCap.round);
  }

  @override
  bool shouldRepaint(covariant _GaugePainter old) => old.value != value || old.color != color;
}
