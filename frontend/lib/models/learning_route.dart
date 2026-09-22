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

  factory LearningRoute.fromJson(Map<String, dynamic> json) {
    return LearningRoute(
      id: json['id'].toString(),
      title: json['title'] as String,
      goal: json['goal'] as String,
      level: json['level'] as String,
      description: json['description'] as String,
      stages: (json['stages'] as List<dynamic>? ?? const [])
          .map(
            (stage) => Stage.fromJson(
              Map<String, dynamic>.from(stage as Map),
            ),
          )
          .toList(),
    );
  }

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
