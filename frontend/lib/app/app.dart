import 'package:flutter/material.dart';

import 'theme.dart';
import 'routes.dart';

class StudyRouteApp extends StatelessWidget {
  const StudyRouteApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'StudyRoute',
      debugShowCheckedModeBanner: false,
      theme: StudyRouteTheme.light,
      initialRoute: AppRoutes.landing,
      routes: AppRoutes.routes,
    );
  }
}
