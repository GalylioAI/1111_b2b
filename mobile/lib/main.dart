import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'theme/app_theme.dart';
import 'widgets/app_shell.dart';

final themeMode = ValueNotifier<ThemeMode>(ThemeMode.dark);

void main() {
  runApp(const App());
}

class App extends StatelessWidget {
  const App({super.key});
  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<ThemeMode>(
      valueListenable: themeMode,
      builder: (_, mode, _) {
        SystemChrome.setSystemUIOverlayStyle(
          mode == ThemeMode.dark ? SystemUiOverlayStyle.light : SystemUiOverlayStyle.dark,
        );
        return MaterialApp(
          title: '1111.tn — Price Intelligence',
          debugShowCheckedModeBanner: false,
          themeMode: mode,
          theme: buildTheme(AppColors.light),
          darkTheme: buildTheme(AppColors.dark),
          home: const AppShell(),
        );
      },
    );
  }
}
