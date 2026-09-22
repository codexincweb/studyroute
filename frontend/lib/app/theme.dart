import 'package:flutter/material.dart';

class AppColors {
  static const primary = Color(0xFF5146E5);
  static const primaryLight = Color(0xFFEDEBFF);

  static const navy = Color(0xFF111827);
  static const background = Color(0xFFF8F9FC);
  static const surface = Colors.white;

  static const text = Color(0xFF111827);
  static const secondaryText = Color(0xFF6B7280);
  static const mutedText = Color(0xFF9CA3AF);

  static const border = Color(0xFFE5E7EB);

  static const success = Color(0xFF22C55E);
  static const warning = Color(0xFFF59E0B);
}

class StudyRouteTheme {
  static ThemeData get light {
    return ThemeData(
      useMaterial3: true,
      scaffoldBackgroundColor: AppColors.background,

      colorScheme: ColorScheme.fromSeed(
        seedColor: AppColors.primary,
        primary: AppColors.primary,
      ),

      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        foregroundColor: AppColors.text,
      ),

      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Colors.white,

        contentPadding: const EdgeInsets.symmetric(
          horizontal: 18,
          vertical: 16,
        ),

        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: AppColors.border),
        ),

        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: AppColors.border),
        ),

        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: AppColors.primary, width: 2),
        ),
      ),
    );
  }
}
