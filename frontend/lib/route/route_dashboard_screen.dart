import 'package:flutter/material.dart';

import '../app/routes.dart';
import '../app/theme.dart';
import '../models/stage.dart';
import '../services/route_state.dart';
import '../widgets/bottom_nav.dart';
import '../widgets/progress_ring.dart';
import '../widgets/stage_card.dart';

class RouteDashboardScreen extends StatefulWidget {
  const RouteDashboardScreen({super.key});

  @override
  State<RouteDashboardScreen> createState() => _RouteDashboardScreenState();
}

class _RouteDashboardScreenState extends State<RouteDashboardScreen> {
  final RouteState _routeState = RouteState.instance;

  @override
  void initState() {
    super.initState();
    _routeState.addListener(_onRouteChanged);
  }

  @override
  void dispose() {
    _routeState.removeListener(_onRouteChanged);
    super.dispose();
  }

  void _onRouteChanged() {
    if (mounted) {
      setState(() {});
    }
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();

    final arguments = ModalRoute.of(context)?.settings.arguments;

    if (arguments is Map) {
      final goal = arguments['goal'];
      final level = arguments['level'];

      if (goal is String && level is String) {
        if (goal != _routeState.goal || level != _routeState.level) {
          _routeState.setRoute(goal: goal, level: level);
        }
      }
    }
  }

  void _openStage(Stage stage) {
    if (stage.isLocked) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Complete the previous stage to unlock this one.'),
        ),
      );
      return;
    }

    Navigator.pushNamed(context, AppRoutes.learningStage, arguments: stage);
  }

  @override
  Widget build(BuildContext context) {
    final stages = _routeState.stages;
    final completedStages = _routeState.completedStages;
    final progress = _routeState.progress;
    final currentStage = _routeState.currentStage;

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: const Text(
          'StudyRoute',
          style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800),
        ),
        actions: [
          IconButton(
            onPressed: () {
              Navigator.pushNamed(context, AppRoutes.profile);
            },
            icon: const Icon(Icons.person_outline),
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(20, 10, 20, 30),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Your learning route',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.w800,
                  color: AppColors.text,
                ),
              ),

              const SizedBox(height: 8),

              Text(
                '${_routeState.goal} • ${_routeState.level}',
                style: const TextStyle(
                  fontSize: 15,
                  color: AppColors.secondaryText,
                ),
              ),

              const SizedBox(height: 24),

              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(22),
                  border: Border.all(color: AppColors.border),
                ),
                child: Row(
                  children: [
                    ProgressRing(progress: progress, size: 96, strokeWidth: 9),

                    const SizedBox(width: 20),

                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Route progress',
                            style: TextStyle(
                              fontSize: 13,
                              color: AppColors.secondaryText,
                            ),
                          ),

                          const SizedBox(height: 6),

                          Text(
                            '$completedStages of '
                            '${stages.length} stages',
                            style: const TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.w800,
                              color: AppColors.text,
                            ),
                          ),

                          const SizedBox(height: 6),

                          const Text(
                            'Keep going. You\'re making progress.',
                            style: TextStyle(
                              fontSize: 12,
                              height: 1.4,
                              color: AppColors.secondaryText,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 28),

              const Text(
                'What\'s next',
                style: TextStyle(
                  fontSize: 21,
                  fontWeight: FontWeight.w800,
                  color: AppColors.text,
                ),
              ),

              const SizedBox(height: 12),

              if (currentStage != null)
                InkWell(
                  onTap: () {
                    _openStage(currentStage);
                  },
                  borderRadius: BorderRadius.circular(18),
                  child: Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(18),
                    decoration: BoxDecoration(
                      color: AppColors.navy,
                      borderRadius: BorderRadius.circular(18),
                    ),
                    child: Row(
                      children: [
                        Container(
                          width: 48,
                          height: 48,
                          decoration: BoxDecoration(
                            color: AppColors.primary,
                            borderRadius: BorderRadius.circular(14),
                          ),
                          child: const Icon(
                            Icons.play_arrow_rounded,
                            color: Colors.white,
                          ),
                        ),

                        const SizedBox(width: 14),

                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                'Continue learning',
                                style: TextStyle(
                                  fontSize: 12,
                                  color: Colors.white60,
                                ),
                              ),

                              const SizedBox(height: 4),

                              Text(
                                currentStage.title,
                                style: const TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.w700,
                                  color: Colors.white,
                                ),
                              ),
                            ],
                          ),
                        ),

                        const Icon(Icons.arrow_forward, color: Colors.white),
                      ],
                    ),
                  ),
                )
              else
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: AppColors.primaryLight,
                    borderRadius: BorderRadius.circular(18),
                  ),
                  child: const Column(
                    children: [
                      Icon(
                        Icons.emoji_events_outlined,
                        size: 40,
                        color: AppColors.primary,
                      ),
                      SizedBox(height: 10),
                      Text(
                        'Route completed!',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                      SizedBox(height: 4),
                      Text(
                        'You completed every stage.',
                        textAlign: TextAlign.center,
                        style: TextStyle(color: AppColors.secondaryText),
                      ),
                    ],
                  ),
                ),

              const SizedBox(height: 30),

              const Text(
                'Your route',
                style: TextStyle(
                  fontSize: 21,
                  fontWeight: FontWeight.w800,
                  color: AppColors.text,
                ),
              ),

              const SizedBox(height: 12),

              ...stages.map((stage) {
                StageStatus status;

                if (stage.isCompleted) {
                  status = StageStatus.completed;
                } else if (stage.isLocked) {
                  status = StageStatus.locked;
                } else {
                  status = StageStatus.current;
                }

                return Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: StageCard(
                    stageNumber: stage.number,
                    title: stage.title,
                    description: stage.description,
                    status: status,
                    onTap: () {
                      _openStage(stage);
                    },
                  ),
                );
              }),
            ],
          ),
        ),
      ),
      bottomNavigationBar: const BottomNav(currentIndex: 1),
    );
  }
}
