class Progress {
  final int completedStages;
  final int totalStages;
  final int completedResources;

  const Progress({
    required this.completedStages,
    required this.totalStages,
    required this.completedResources,
  });

  double get percentage {
    if (totalStages == 0) {
      return 0;
    }

    return completedStages / totalStages;
  }
}
