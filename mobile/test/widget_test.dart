import 'package:flutter_test/flutter_test.dart';

import 'package:app_1111/main.dart';

void main() {
  testWidgets('App boots to the dashboard', (WidgetTester tester) async {
    await tester.pumpWidget(const App());
    await tester.pump();
    expect(find.text("Vue d'ensemble"), findsOneWidget);
  });
}
