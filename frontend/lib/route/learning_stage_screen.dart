import 'package:flutter/material.dart';

import '../app/theme.dart';
import '../models/stage.dart';
import '../services/api_service.dart';
import '../services/storage_service.dart';
import '../widgets/primary_button.dart';
import '../widgets/resource_card.dart';
import 'quiz_screen.dart';

class LearningStageScreen extends StatefulWidget {
  const LearningStageScreen({super.key});

  @override
  State<LearningStageScreen> createState() => _LearningStageScreenState();
}

class _LearningStageScreenState extends State<LearningStageScreen> {
  final ApiService _apiService = ApiService();
  final StorageService _storageService = StorageService();

  Stage? _stage;
  bool _completed = false;
  bool _isCompleting = false;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();

    final arguments = ModalRoute.of(context)?.settings.arguments;

    if (arguments is Stage && _stage == null) {
      _stage = arguments;
      _completed = arguments.isCompleted;
    }
  }

  Future<void> _takeQuiz() async {
    if (_stage == null || _stage!.quizId == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('No quiz is available for this stage.'),
        ),
      );
      return;
    }

    final passed = await Navigator.push<bool>(
      context,
      MaterialPageRoute(
        builder: (_) => const QuizScreen(),
        settings: RouteSettings(
          arguments: {
            'quizId': _stage!.quizId,
          },
        ),
      ),
    );

    if (passed == true && mounted) {
      await _completeStage();
    }
  }

  Future<void> _completeStage() async {
    if (_stage == null || _isCompleting || _completed) {
      return;
    }

    setState(() {
      _isCompleting = true;
    });

    try {
      final token = await _storageService.getToken();

      if (token == null || token.isEmpty) {
        throw Exception('Please log in again.');
      }

      await _apiService.completeStage(
        _stage!.id,
        token,
      );

      if (!mounted) {
        return;
      }

      setState(() {
        _completed = true;
        _isCompleting = false;
      });

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Stage completed! Your progress has been updated.'),
        ),
      );
    } catch (error) {
      if (!mounted) {
        return;
      }

      setState(() {
        _isCompleting = false;
      });

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(error.toString()),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_stage == null) {
      return const Scaffold(
        body: Center(
          child: Text('Stage not found'),
        ),
      );
    }

    final stage = _stage!;

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Stage ${stage.number}',
          style: const TextStyle(fontWeight: FontWeight.w700),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(20, 10, 20, 30),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(22),
                decoration: BoxDecoration(
                  color: AppColors.navy,
                  borderRadius: BorderRadius.circular(22),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 10,
                        vertical: 6,
                      ),
                      decoration: BoxDecoration(
                        color: AppColors.primary,
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Text(
                        'STAGE ${stage.number}',
                        style: const TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w800,
                          letterSpacing: 0.8,
                          color: Colors.white,
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      stage.title,
                      style: const TextStyle(
                        fontSize: 28,
                        height: 1.15,
                        fontWeight: FontWeight.w800,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 10),
                    Text(
                      stage.description,
                      style: const TextStyle(
                        fontSize: 14,
                        height: 1.5,
                        color: Colors.white70,
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 30),

              const Text(
                'What you\'ll learn',
                style: TextStyle(
                  fontSize: 21,
                  fontWeight: FontWeight.w800,
                  color: AppColors.text,
                ),
              ),

              const SizedBox(height: 14),

              ...stage.objectives.map((objective) {
                return Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        width: 26,
                        height: 26,
                        decoration: BoxDecoration(
                          color: AppColors.primaryLight,
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(
                          Icons.check,
                          size: 16,
                          color: AppColors.primary,
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.only(top: 3),
                          child: Text(
                            objective,
                            style: const TextStyle(
                              fontSize: 14,
                              height: 1.4,
                              color: AppColors.text,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                );
              }),

              const SizedBox(height: 24),

              const Text(
                'Resources',
                style: TextStyle(
                  fontSize: 21,
                  fontWeight: FontWeight.w800,
                  color: AppColors.text,
                ),
              ),

              const SizedBox(height: 14),

              ...stage.resources.asMap().entries.map((entry) {
                final index = entry.key;
                final resource = entry.value;

                return Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: ResourceCard(
                    title: resource,
                    type: index == 0 ? 'Video' : 'Article',
                    source: index == 0 ? 'YouTube' : 'StudyRoute',
                    icon: index == 0
                        ? Icons.play_circle_outline
                        : Icons.menu_book_outlined,
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text('Opening $resource...'),
                        ),
                      );
                    },
                  ),
                );
              }),

              const SizedBox(height: 20),

              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(18),
                decoration: BoxDecoration(
                  color: _completed
                      ? AppColors.primaryLight
                      : Colors.white,
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(
                    color: _completed
                        ? AppColors.primary
                        : AppColors.border,
                  ),
                ),
                child: Column(
                  children: [
                    Icon(
                      _completed
                          ? Icons.check_circle
                          : Icons.flag_outlined,
                      size: 34,
                      color: _completed
                          ? AppColors.success
                          : AppColors.primary,
                    ),
                    const SizedBox(height: 10),
                    Text(
                      _completed
                          ? 'Stage completed!'
                          : 'Finished this stage?',
                      style: const TextStyle(
                        fontSize: 17,
                        fontWeight: FontWeight.w800,
                        color: AppColors.text,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      _completed
                          ? 'Great work. You can continue '
                              'to the next stage.'
                          : 'Mark this stage as complete '
                              'when you\'re done learning.',
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        fontSize: 13,
                        height: 1.4,
                        color: AppColors.secondaryText,
                      ),
                    ),
                    const SizedBox(height: 16),
                    if (!_completed)
                      PrimaryButton(
                        text: 'Take Stage Quiz',
                        icon: Icons.quiz_outlined,
                        onPressed:
                            _isCompleting ? null : _takeQuiz,
                      )
                    else
                      PrimaryButton(
                        text: 'Back to My Route',
                        icon: Icons.arrow_forward,
                        onPressed: () {
                          Navigator.pop(context, true);
                        },
                      ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
