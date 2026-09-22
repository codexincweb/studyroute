class Stage {
  final String id;
  final int number;
  final String title;
  final String description;
  final List<String> objectives;
  final List<String> resources;
  final String? quizId;
  final bool isCompleted;
  final bool isLocked;

  const Stage({
    required this.id,
    required this.number,
    required this.title,
    required this.description,
    required this.objectives,
    required this.resources,
    this.quizId,
    this.isCompleted = false,
    this.isLocked = false,
  });

  factory Stage.fromJson(Map<String, dynamic> json) {
    return Stage(
      id: json['id'].toString(),
      number: json['number'] as int,
      title: json['title'] as String,
      description: json['description'] as String,
      objectives: List<String>.from(json['objectives'] ?? const []),
      resources: List<String>.from(json['resources'] ?? const []),
      quizId: json['quizId']?.toString(),
      isCompleted: json['isCompleted'] == true,
      isLocked: json['isLocked'] == true,
    );
  }
}
