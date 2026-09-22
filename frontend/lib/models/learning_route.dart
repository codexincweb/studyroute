import 'stage.dart';

class LearningRoute {
  final String id;
  final String title;
  final String goal;
  final String level;
  final String description;
  final List<Stage> stages;

  const LearningRoute({
    required this.id,
    required this.title,
    required this.goal,
    required this.level,
    required this.description,
    required this.stages,
  });

  int get completedStages {
    return stages.where((stage) => stage.isCompleted).length;
  }

  double get progress {
    if (stages.isEmpty) {
      return 0;
    }

    return completedStages / stages.length;
  }
}
