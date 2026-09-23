import 'resource.dart';

class Stage {
  final String id;
  final int number;
  final String title;
  final String description;
  final List<String> objectives;
  final List<Resource> resources;
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
      resources: (json['resources'] as List? ?? const [])
          .map((resource) {
            if (resource is Map) {
              return Resource.fromJson(Map<String, dynamic>.from(resource));
            }

            if (resource is List && resource.length >= 3) {
              return Resource(
                title: resource[0].toString(),
                type: resource[1].toString(),
                url: resource[2].toString(),
              );
            }

            if (resource is String) {
              return Resource(title: resource, type: 'Article', url: '');
            }

            return const Resource(title: '', type: 'Article', url: '');
          })
          .where((resource) => resource.title.isNotEmpty)
          .toList(),
      quizId: json['quizId']?.toString(),
      isCompleted: json['isCompleted'] == true,
      isLocked: json['isLocked'] == true,
    );
  }
}
