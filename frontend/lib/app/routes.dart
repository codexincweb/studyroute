import 'package:flutter/material.dart';
import 'package:studyroute/home/home_screen.dart';
import 'package:studyroute/auth/forgot_password_screen.dart';
import 'package:studyroute/auth/login_screen.dart';
import 'package:studyroute/auth/reset_password_screen.dart';
import 'package:studyroute/auth/signup_screen.dart';
import 'package:studyroute/landing/landing_screen.dart';
import 'package:studyroute/onboarding/choose_goal_screen.dart';
import 'package:studyroute/onboarding/choose_level_screen.dart';
import 'package:studyroute/profile/profile_screen.dart';
import 'package:studyroute/progress/progress_screen.dart';
import 'package:studyroute/route/learning_stage_screen.dart';
import 'package:studyroute/route/route_dashboard_screen.dart';

class AppRoutes {
  static const landing = '/';
  static const home = '/home';
  static const login = '/login';
  static const signup = '/signup';
  static const forgotPassword = '/forgot-password';
  static const resetPassword = '/reset-password';
  static const chooseGoal = '/choose-goal';
  static const chooseLevel = '/choose-level';
  static const routeDashboard = '/route';
  static const learningStage = '/learning-stage';
  static const progress = '/progress';
  static const profile = '/profile';

  static Map<String, WidgetBuilder> get routes => {
    landing: (_) => const LandingScreen(),
    home: (_) => const HomeScreen(),
    login: (_) => const LoginScreen(),
    signup: (_) => const SignupScreen(),
    forgotPassword: (_) => const ForgotPasswordScreen(),
    chooseGoal: (_) => const ChooseGoalScreen(),
    chooseLevel: (_) => const ChooseLevelScreen(),
    routeDashboard: (_) => const RouteDashboardScreen(),
    learningStage: (_) => const LearningStageScreen(),
    progress: (_) => const ProgressScreen(),
    profile: (_) => const ProfileScreen(),
  };
}
