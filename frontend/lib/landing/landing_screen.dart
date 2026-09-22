import 'package:flutter/material.dart';

import 'package:studyroute/app/routes.dart';
import 'package:studyroute/app/theme.dart';

class LandingScreen extends StatelessWidget {
  const LandingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            children: [
              _buildHeader(context),
              _buildHero(context),
              _buildRoutePreview(),
              _buildBenefits(),
              _buildBottomCta(context),
              const SizedBox(height: 32),
            ],
          ),
        ),
      ),
    );
  }

  // ------------------------------------------------------------
  // HEADER
  // ------------------------------------------------------------

  Widget _buildHeader(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 18, 20, 10),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          const Text(
            'StudyRoute',
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.w800,
              color: AppColors.text,
            ),
          ),

          TextButton(
            onPressed: () {
              Navigator.pushNamed(context, AppRoutes.login);
            },
            child: const Text(
              'Log in',
              style: TextStyle(
                color: AppColors.primary,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
        ],
      ),
    );
  }

  // ------------------------------------------------------------
  // HERO
  // ------------------------------------------------------------

  Widget _buildHero(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 45, 20, 30),
      child: Column(
        children: [
          const Text(
            'Learn with a route,\nnot random resources.',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 34,
              height: 1.1,
              fontWeight: FontWeight.w800,
              color: AppColors.text,
            ),
          ),

          const SizedBox(height: 18),

          const Text(
            'StudyRoute gives you a clear learning path '
            'so you always know what to learn next.',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 16,
              height: 1.5,
              color: AppColors.secondaryText,
            ),
          ),

          const SizedBox(height: 30),

          SizedBox(
            width: double.infinity,
            height: 56,
            child: ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, AppRoutes.signup);
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primary,
                foregroundColor: Colors.white,
                elevation: 0,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
              ),
              child: const Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'Build My Route',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
                  ),
                  SizedBox(width: 8),
                  Icon(Icons.arrow_forward, size: 20),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  // ------------------------------------------------------------
  // ROUTE PREVIEW
  // ------------------------------------------------------------

  Widget _buildRoutePreview() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppColors.navy,
        borderRadius: BorderRadius.circular(24),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'YOUR ROUTE',
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w700,
              letterSpacing: 1.2,
              color: Colors.white70,
            ),
          ),

          const SizedBox(height: 18),

          _routeStep(
            number: '01',
            title: 'Choose your goal',
            subtitle: 'What do you want to learn?',
            completed: true,
          ),

          _routeConnector(),

          _routeStep(
            number: '02',
            title: 'Choose your level',
            subtitle: 'Start from where you are.',
            completed: true,
          ),

          _routeConnector(),

          _routeStep(
            number: '03',
            title: 'Follow your route',
            subtitle: 'Learn step by step.',
            completed: false,
          ),
        ],
      ),
    );
  }

  Widget _routeStep({
    required String number,
    required String title,
    required String subtitle,
    required bool completed,
  }) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: 42,
          height: 42,
          decoration: BoxDecoration(
            color: completed
                ? AppColors.primary
                : Colors.white.withValues(alpha: 0.12),
            shape: BoxShape.circle,
          ),
          child: Center(
            child: Text(
              number,
              style: const TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.w800,
                fontSize: 13,
              ),
            ),
          ),
        ),

        const SizedBox(width: 14),

        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 16,
                  fontWeight: FontWeight.w700,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                subtitle,
                style: const TextStyle(color: Colors.white60, fontSize: 13),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _routeConnector() {
    return Container(
      margin: const EdgeInsets.only(left: 20),
      height: 28,
      width: 2,
      color: Colors.white24,
    );
  }

  // ------------------------------------------------------------
  // BENEFITS
  // ------------------------------------------------------------

  Widget _buildBenefits() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 35, 20, 10),
      child: Column(
        children: [
          _benefit(
            icon: Icons.route_outlined,
            title: 'Know what to learn',
            description:
                'Follow a structured route instead of guessing what comes next.',
          ),
          const SizedBox(height: 20),
          _benefit(
            icon: Icons.schedule_outlined,
            title: 'Learn at your pace',
            description: 'Move through each stage when you are ready.',
          ),
          const SizedBox(height: 20),
          _benefit(
            icon: Icons.trending_up,
            title: 'Track your progress',
            description: 'See how far you have come and what is waiting next.',
          ),
        ],
      ),
    );
  }

  Widget _benefit({
    required IconData icon,
    required String title,
    required String description,
  }) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: 44,
          height: 44,
          decoration: BoxDecoration(
            color: AppColors.primaryLight,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Icon(icon, color: AppColors.primary, size: 22),
        ),

        const SizedBox(width: 14),

        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: const TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w700,
                  color: AppColors.text,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                description,
                style: const TextStyle(
                  fontSize: 13,
                  height: 1.45,
                  color: AppColors.secondaryText,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  // ------------------------------------------------------------
  // BOTTOM CTA
  // ------------------------------------------------------------

  Widget _buildBottomCta(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 35, 20, 0),
      child: Column(
        children: [
          const Text(
            'Ready to start learning?',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.w800,
              color: AppColors.text,
            ),
          ),

          const SizedBox(height: 12),

          const Text(
            'Build your route and start your learning journey.',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 14, color: AppColors.secondaryText),
          ),

          const SizedBox(height: 20),

          OutlinedButton(
            onPressed: () {
              Navigator.pushNamed(context, AppRoutes.signup);
            },
            style: OutlinedButton.styleFrom(
              minimumSize: const Size(double.infinity, 52),
              side: const BorderSide(color: AppColors.primary),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(14),
              ),
            ),
            child: const Text(
              'Get Started',
              style: TextStyle(
                color: AppColors.primary,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
