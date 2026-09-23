import 'package:flutter/foundation.dart';

import '../models/resource.dart';
import '../models/stage.dart';

class RouteState extends ChangeNotifier {
  RouteState._();

  static final RouteState instance = RouteState._();

  String goal = 'Web Development';
  String level = 'Beginner';

  final List<Stage> _stages = [
    Stage(
      id: 'stage-1',
      number: 1,
      title: 'HTML Fundamentals',
      description: 'Learn the structure of webpages and build your first page.',
      objectives: [
        'Understand HTML structure',
        'Use common HTML elements',
        'Create a basic webpage',
      ],
      resources: [
        Resource(
          title: 'HTML Basics',
          type: 'Article',
          url:
              'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content',
        ),
        Resource(
          title: 'HTML Elements Guide',
          type: 'Article',
          url:
              'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements',
        ),
        Resource(
          title: 'Build Your First Webpage',
          type: 'Article',
          url:
              'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content',
        ),
      ],
    ),
    Stage(
      id: 'stage-2',
      number: 2,
      title: 'CSS Fundamentals',
      description: 'Learn how to style webpages and create responsive layouts.',
      objectives: [
        'Understand CSS selectors',
        'Style text and elements',
        'Build simple layouts',
      ],
      resources: [
        Resource(
          title: 'CSS Basics',
          type: 'Article',
          url:
              'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics',
        ),
        Resource(
          title: 'Selectors and Properties',
          type: 'Article',
          url:
              'https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Selectors',
        ),
        Resource(
          title: 'CSS Layout Guide',
          type: 'Article',
          url:
              'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout',
        ),
      ],
      isLocked: true,
    ),
    Stage(
      id: 'stage-3',
      number: 3,
      title: 'JavaScript Basics',
      description: 'Add interaction and logic to your websites.',
      objectives: [
        'Understand JavaScript syntax',
        'Work with variables and functions',
        'Handle basic user interactions',
      ],
      resources: [
        Resource(
          title: 'JavaScript Introduction',
          type: 'Article',
          url:
              'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting',
        ),
        Resource(
          title: 'Variables and Functions',
          type: 'Article',
          url:
              'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types',
        ),
        Resource(
          title: 'DOM Basics',
          type: 'Article',
          url:
              'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction',
        ),
      ],
      isLocked: true,
    ),
    Stage(
      id: 'stage-4',
      number: 4,
      title: 'Frontend Frameworks',
      description: 'Learn how modern frontend applications are structured.',
      objectives: [
        'Understand component-based development',
        'Learn framework fundamentals',
        'Build reusable UI components',
      ],
      resources: [
        Resource(
          title: 'Framework Fundamentals',
          type: 'Article',
          url: 'https://react.dev/learn',
        ),
        Resource(
          title: 'Components',
          type: 'Article',
          url: 'https://react.dev/learn/your-first-component',
        ),
        Resource(
          title: 'State Management',
          type: 'Article',
          url: 'https://react.dev/learn/managing-state',
        ),
      ],
      isLocked: true,
    ),
    Stage(
      id: 'stage-5',
      number: 5,
      title: 'Build a Real Project',
      description: 'Bring everything together by building a complete project.',
      objectives: [
        'Plan a project',
        'Build the application',
        'Deploy your project',
      ],
      resources: [
        Resource(
          title: 'Project Planning',
          type: 'Article',
          url:
              'https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website',
        ),
        Resource(
          title: 'Build Guide',
          type: 'Article',
          url:
              'https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website',
        ),
        Resource(
          title: 'Deployment Guide',
          type: 'Article',
          url:
              'https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Deploying_your_website',
        ),
      ],
      isLocked: true,
    ),
  ];

  List<Stage> get stages {
    return List.unmodifiable(_stages);
  }

  int get completedStages {
    return _stages.where((stage) => stage.isCompleted).length;
  }

  double get progress {
    if (_stages.isEmpty) {
      return 0;
    }

    return completedStages / _stages.length;
  }

  Stage? get currentStage {
    for (final stage in _stages) {
      if (!stage.isCompleted && !stage.isLocked) {
        return stage;
      }
    }

    return null;
  }

  void setRoute({required String goal, required String level}) {
    this.goal = goal;
    this.level = level;

    _resetStages();

    notifyListeners();
  }

  void completeStage(String stageId) {
    final index = _stages.indexWhere((stage) => stage.id == stageId);

    if (index == -1) {
      return;
    }

    final stage = _stages[index];

    if (stage.isCompleted || stage.isLocked) {
      return;
    }

    _stages[index] = Stage(
      id: stage.id,
      number: stage.number,
      title: stage.title,
      description: stage.description,
      objectives: stage.objectives,
      resources: stage.resources,
      isCompleted: true,
      isLocked: false,
    );

    final nextIndex = index + 1;

    if (nextIndex < _stages.length) {
      final nextStage = _stages[nextIndex];

      _stages[nextIndex] = Stage(
        id: nextStage.id,
        number: nextStage.number,
        title: nextStage.title,
        description: nextStage.description,
        objectives: nextStage.objectives,
        resources: nextStage.resources,
        isCompleted: nextStage.isCompleted,
        isLocked: false,
      );
    }

    notifyListeners();
  }

  void _resetStages() {
    for (var i = 0; i < _stages.length; i++) {
      final stage = _stages[i];

      _stages[i] = Stage(
        id: stage.id,
        number: stage.number,
        title: stage.title,
        description: stage.description,
        objectives: stage.objectives,
        resources: stage.resources,
        isCompleted: false,
        isLocked: i > 0,
      );
    }
  }
}
