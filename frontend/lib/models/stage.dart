class Stage {
  final String id;
  final int number;
  final String title;
  final String description;
  final List<String> objectives;
  final List<String> resources;
  final bool isCompleted;
  final bool isLocked;

  const Stage({
    required this.id,
    required this.number,
    required this.title,
    required this.description,
    required this.objectives,
    required this.resources,
    this.isCompleted = false,
    this.isLocked = false,
  });
}
