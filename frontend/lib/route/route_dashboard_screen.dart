import 'package:flutter/material.dart';

import '../models/learning_route.dart';
import '../models/stage.dart';
import '../services/api_service.dart';
import '../services/storage_service.dart';
import 'learning_stage_screen.dart';

class RouteDashboardScreen extends StatefulWidget {
  const RouteDashboardScreen({super.key});

  @override
  State<RouteDashboardScreen> createState() => _RouteDashboardScreenState();
}

class _RouteDashboardScreenState extends State<RouteDashboardScreen> {
  final ApiService _apiService = ApiService();
  final StorageService _storageService = StorageService();

  LearningRoute? _route;
  bool _isLoading = true;
  String? _error;

  String _goal = '';
  String _level = '';

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();

    final args =
        ModalRoute.of(context)?.settings.arguments as Map<String, dynamic>?;

    _goal = args?['goal']?.toString() ?? '';
    _level = args?['level']?.toString() ?? '';

    if (_route == null) {
      _loadRoute();
    }
  }

  Future<void> _loadRoute() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final result = await _apiService.getLearningPaths();

      final paths = result['learningPaths'] as List<dynamic>? ?? [];

      Map<String, dynamic>? selectedPath;

      for (final item in paths) {
        final path = Map<String, dynamic>.from(item as Map);

        if (path['goal']?.toString() == _goal &&
            path['level']?.toString() == _level) {
          selectedPath = path;
          break;
        }
      }

      if (selectedPath == null) {
        throw Exception(
          'No learning route found for $_goal at $_level level.',
        );
      }

      final pathId = selectedPath['id'].toString();

      final token = await _storageService.getToken();

      if (token == null || token.isEmpty) {
        throw Exception('Please log in again.');
      }

      final routeResult = await _apiService.getLearningPath(
        pathId,
        token,
      );

      setState(() {
        _route = LearningRoute.fromJson(routeResult);
        _isLoading = false;
      });
    } catch (error) {
      setState(() {
        _error = error.toString();
        _isLoading = false;
      });
    }
  }

  Stage? get _currentStage {
    final stages = _route?.stages ?? [];

    for (final stage in stages) {
      if (!stage.isCompleted && !stage.isLocked) {
        return stage;
      }
    }

    return null;
  }

  Future<void> _openStage(Stage stage) async {
    if (stage.isLocked) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Complete the previous stage first.'),
        ),
      );
      return;
    }

    final completed = await Navigator.push<bool>(
      context,
      MaterialPageRoute(
        builder: (_) => const LearningStageScreen(),
        settings: RouteSettings(arguments: stage),
      ),
    );

    if (completed == true && mounted) {
      await _loadRoute();
    }
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
          title: const Text('Learning Route'),
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
      );
    }

    final route = _route!;

    return Scaffold(
      appBar: AppBar(
        title: Text(route.title),
      ),
      body: RefreshIndicator(
        onRefresh: _loadRoute,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            Text(
              route.title,
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 8),
            Text(route.description),
            const SizedBox(height: 20),
            LinearProgressIndicator(
              value: route.progress,
            ),
            const SizedBox(height: 8),
            Text(
              '${route.completedStages}/${route.stages.length} stages completed',
            ),
            const SizedBox(height: 24),
            ...route.stages.map(
              (stage) => Card(
                margin: const EdgeInsets.only(bottom: 12),
                child: ListTile(
                  title: Text(
                    'Stage ${stage.number}: ${stage.title}',
                  ),
                  subtitle: Text(stage.description),
                  trailing: stage.isCompleted
                      ? const Icon(Icons.check)
                      : stage.isLocked
                          ? const Icon(Icons.lock)
                          : const Icon(Icons.arrow_forward),
                  onTap: () => _openStage(stage),
                ),
              ),
            ),
            if (_currentStage != null) ...[
              const SizedBox(height: 12),
              ElevatedButton(
                onPressed: () => _openStage(_currentStage!),
                child: const Text('Continue Learning'),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
