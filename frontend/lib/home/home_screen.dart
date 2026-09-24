import 'package:flutter/material.dart';

import '../app/routes.dart';
import '../app/theme.dart';
import '../models/learning_route.dart';
import '../services/api_service.dart';
import '../services/storage_service.dart';
import '../widgets/bottom_nav.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final ApiService _apiService = ApiService();
  final StorageService _storageService = StorageService();

  LearningRoute? _route;
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadRoute();
  }

  Future<void> _loadRoute() async {
    try {
      final token = await _storageService.getToken();

      if (token == null || token.isEmpty) {
        throw Exception('Please log in again.');
      }

      final result = await _apiService.getProgress(token);
      final currentStageId = result['currentStageId']?.toString();

      if (currentStageId == null || currentStageId.isEmpty) {
        if (!mounted) return;

        setState(() {
          _isLoading = false;
        });
        return;
      }

      final pathsResult = await _apiService.getLearningPaths();
      final paths = pathsResult['learningPaths'] as List<dynamic>? ?? [];

      Map<String, dynamic>? selectedPath;

      for (final item in paths) {
        final path = Map<String, dynamic>.from(item as Map);
        final pathId = path['id'].toString();

        try {
          final routeResult =
              await _apiService.getLearningPath(pathId, token);

          final route = LearningRoute.fromJson(routeResult);

          if (route.stages.any((stage) => stage.id == currentStageId)) {
            selectedPath = path;
            _route = route;
            break;
          }
        } catch (_) {
          continue;
        }
      }

      if (selectedPath == null) {
        if (!mounted) return;

        setState(() {
          _isLoading = false;
        });
        return;
      }

      if (!mounted) return;

      setState(() {
        _isLoading = false;
      });
    } catch (error) {
      if (!mounted) return;

      setState(() {
        _error = error.toString();
        _isLoading = false;
      });
    }
  }

  void _openRoute() {
    final route = _route;

    if (route == null) {
      Navigator.pushNamed(context, AppRoutes.chooseGoal);
      return;
    }

    Navigator.pushNamed(
      context,
      AppRoutes.routeDashboard,
      arguments: {
        'goal': route.goal,
        'level': route.level,
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Scaffold(
        body: Center(
          child: CircularProgressIndicator(),
        ),
      );
    }

    if (_error != null) {
      return Scaffold(
        appBar: AppBar(
          title: const Text(
            'StudyRoute',
            style: TextStyle(fontWeight: FontWeight.w800),
          ),
        ),
        body: Center(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  _error!,
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: _loadRoute,
                  child: const Text('Retry'),
                ),
              ],
            ),
          ),
        ),
        bottomNavigationBar: const BottomNav(currentIndex: 0),
      );
    }

    final route = _route;

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'StudyRoute',
          style: TextStyle(fontWeight: FontWeight.w800),
        ),
      ),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(20),
          children: [
            const Text(
              'Keep learning.',
              style: TextStyle(
                fontSize: 30,
                fontWeight: FontWeight.w800,
                color: AppColors.text,
              ),
            ),
            const SizedBox(height: 8),
            const Text(
              'Continue your learning journey and stay on track.',
              style: TextStyle(
                fontSize: 15,
                height: 1.5,
                color: AppColors.secondaryText,
              ),
            ),
            const SizedBox(height: 24),
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppColors.navy,
                borderRadius: BorderRadius.circular(20),
              ),
              child: route == null
                  ? Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'START LEARNING',
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w700,
                            color: Colors.white70,
                            letterSpacing: 1,
                          ),
                        ),
                        const SizedBox(height: 10),
                        const Text(
                          'Choose a learning route',
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.w800,
                            color: Colors.white,
                          ),
                        ),
                        const SizedBox(height: 20),
                        SizedBox(
                          width: double.infinity,
                          child: ElevatedButton(
                            onPressed: () {
                              Navigator.pushNamed(
                                context,
                                AppRoutes.chooseGoal,
                              );
                            },
                            child: const Text('Choose My Route'),
                          ),
                        ),
                      ],
                    )
                  : Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'YOUR CURRENT ROUTE',
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w700,
                            color: Colors.white70,
                            letterSpacing: 1,
                          ),
                        ),
                        const SizedBox(height: 10),
                        Text(
                          route.goal,
                          style: const TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.w800,
                            color: Colors.white,
                          ),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          route.level,
                          style: const TextStyle(
                            fontSize: 14,
                            color: Colors.white70,
                          ),
                        ),
                        const SizedBox(height: 20),
                        SizedBox(
                          width: double.infinity,
                          child: ElevatedButton(
                            onPressed: _openRoute,
                            child: const Text('Continue Learning'),
                          ),
                        ),
                      ],
                    ),
            ),
            const SizedBox(height: 24),
            const Text(
              'What you can do',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w800,
                color: AppColors.text,
              ),
            ),
            const SizedBox(height: 12),
            _HomeActionCard(
              icon: Icons.route_outlined,
              title: 'View My Route',
              subtitle: 'See your stages and what comes next.',
              onTap: _openRoute,
            ),
            const SizedBox(height: 12),
            _HomeActionCard(
              icon: Icons.bar_chart_outlined,
              title: 'Check Progress',
              subtitle: 'See how much of your learning you have completed.',
              onTap: () {
                Navigator.pushReplacementNamed(
                  context,
                  AppRoutes.progress,
                );
              },
            ),
          ],
        ),
      ),
      bottomNavigationBar: const BottomNav(currentIndex: 0),
    );
  }
}

class _HomeActionCard extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final VoidCallback onTap;

  const _HomeActionCard({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.zero,
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(
          horizontal: 16,
          vertical: 8,
        ),
        leading: Container(
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(
            color: AppColors.primaryLight,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Icon(
            icon,
            color: AppColors.primary,
          ),
        ),
        title: Text(
          title,
          style: const TextStyle(
            fontWeight: FontWeight.w700,
          ),
        ),
        subtitle: Padding(
          padding: const EdgeInsets.only(top: 4),
          child: Text(subtitle),
        ),
        trailing: const Icon(
          Icons.arrow_forward_ios,
          size: 16,
        ),
        onTap: onTap,
      ),
    );
  }
}
