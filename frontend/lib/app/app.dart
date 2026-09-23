import 'package:flutter/material.dart';

import '../auth/reset_password_screen.dart';
import 'routes.dart';
import 'theme.dart';

class StudyRouteApp extends StatelessWidget {
  const StudyRouteApp({super.key});

  String get _initialRoute {
    final path = Uri.base.path;

    if (path == AppRoutes.resetPassword) {
      return AppRoutes.resetPassword;
    }

    return AppRoutes.landing;
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'StudyRoute',
      debugShowCheckedModeBanner: false,
      theme: StudyRouteTheme.light,
      initialRoute: _initialRoute,
      routes: AppRoutes.routes,
      onGenerateRoute: (settings) {
        if (settings.name == AppRoutes.resetPassword) {
          final token = Uri.base.queryParameters['token'];

          if (token == null || token.isEmpty) {
            return MaterialPageRoute(
              builder: (_) => const Scaffold(
                body: Center(
                  child: Text('Invalid password reset link'),
                ),
              ),
            );
          }

          return MaterialPageRoute(
            builder: (_) => ResetPasswordScreen(
              token: token,
            ),
          );
        }

        return null;
      },
    );
  }
}
