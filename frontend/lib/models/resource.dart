class Resource {
  final String title;
  final String type;
  final String url;

  const Resource({required this.title, required this.type, required this.url});

  factory Resource.fromJson(Map<String, dynamic> json) {
    return Resource(
      title: json['title']?.toString() ?? '',
      type: json['type']?.toString() ?? 'Article',
      url: json['url']?.toString() ?? '',
    );
  }
}
