import 'package:flutter/material.dart';

import '../app/theme.dart';
import '../models/quiz.dart';
import '../services/api_service.dart';
import '../services/storage_service.dart';
import '../widgets/primary_button.dart';

class QuizScreen extends StatefulWidget {
  const QuizScreen({super.key});

  @override
  State<QuizScreen> createState() => _QuizScreenState();
}

class _QuizScreenState extends State<QuizScreen> {
  final ApiService _apiService = ApiService();
  final StorageService _storageService = StorageService();

  Quiz? _quiz;
  final Map<String, String> _selectedAnswers = {};

  bool _isLoading = true;
  bool _isSubmitting = false;
  String? _error;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();

    if (_quiz == null) {
      _loadQuiz();
    }
  }

  Future<void> _loadQuiz() async {
    final arguments =
        ModalRoute.of(context)?.settings.arguments as Map<String, dynamic>?;

    final quizId = arguments?['quizId']?.toString();

    if (quizId == null || quizId.isEmpty) {
      setState(() {
        _error = 'Quiz not found for this stage.';
        _isLoading = false;
      });
      return;
    }

    try {
      final token = await _storageService.getToken();

      if (token == null || token.isEmpty) {
        throw Exception('Please log in again.');
      }

      final result = await _apiService.getQuiz(
        quizId,
        token,
      );

      final quizData = Map<String, dynamic>.from(
        result['quiz'] as Map,
      );

      setState(() {
        _quiz = Quiz.fromJson(quizData);
        _isLoading = false;
      });
    } catch (error) {
      setState(() {
        _error = error.toString();
        _isLoading = false;
      });
    }
  }

  Future<void> _submitQuiz() async {
    if (_quiz == null || _isSubmitting) {
      return;
    }

    if (_selectedAnswers.length != _quiz!.questions.length) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Please answer every question before submitting.'),
        ),
      );
      return;
    }

    setState(() {
      _isSubmitting = true;
    });

    try {
      final token = await _storageService.getToken();

      if (token == null || token.isEmpty) {
        throw Exception('Please log in again.');
      }

      final answers = _selectedAnswers.entries
          .map(
            (entry) => {
              'questionId': entry.key,
              'answerId': entry.value,
            },
          )
          .toList();

      final result = await _apiService.submitQuiz(
        _quiz!.id,
        token,
        answers,
      );

      if (!mounted) {
        return;
      }

      final score = result['score'];
      final passingPercentage = result['passingPercentage'];
      final passed = result['passed'] == true;

      setState(() {
        _isSubmitting = false;
      });

      await _showResult(
        score: score,
        passingPercentage: passingPercentage,
        passed: passed,
      );
    } catch (error) {
      if (!mounted) {
        return;
      }

      setState(() {
        _isSubmitting = false;
      });

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(error.toString()),
        ),
      );
    }
  }

  Future<void> _showResult({
    required dynamic score,
    required dynamic passingPercentage,
    required bool passed,
  }) async {
    await showDialog<void>(
      context: context,
      barrierDismissible: false,
      builder: (context) {
        return AlertDialog(
          title: Text(
            passed ? 'Quiz Passed' : 'Quiz Not Passed',
          ),
          content: Text(
            'Your score: $score%\n'
            'Passing score: $passingPercentage%',
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(context);

                if (passed) {
                  Navigator.pop(this.context, true);
                } else {
                  setState(() {
                    _selectedAnswers.clear();
                  });
                }
              },
              child: Text(
                passed ? 'Continue' : 'Try Again',
              ),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Scaffold(
        body: Center(
          child: CircularProgressIndicator(),
        ),
      );
    }

    if (_error != null) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Quiz'),
        ),
        body: Center(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Text(
              _error!,
              textAlign: TextAlign.center,
            ),
          ),
        ),
      );
    }

    if (_quiz == null) {
      return const Scaffold(
        body: Center(
          child: Text('Quiz not available.'),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(_quiz!.title),
      ),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Text(
            'Pass mark: ${_quiz!.passingPercentage}%',
            style: const TextStyle(
              fontSize: 14,
              color: AppColors.secondaryText,
            ),
          ),
          const SizedBox(height: 20),
          ...List.generate(
            _quiz!.questions.length,
            (index) {
              final question = _quiz!.questions[index];

              return Card(
                margin: const EdgeInsets.only(bottom: 18),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '${index + 1}. ${question.questionText}',
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w700,
                          color: AppColors.text,
                        ),
                      ),
                      const SizedBox(height: 10),
                      ...question.answers.map(
                        (answer) => RadioListTile<String>(
                          value: answer.id,
                          groupValue:
                              _selectedAnswers[question.id],
                          title: Text(answer.text),
                          contentPadding: EdgeInsets.zero,
                          onChanged: (value) {
                            if (value == null) {
                              return;
                            }

                            setState(() {
                              _selectedAnswers[question.id] = value;
                            });
                          },
                        ),
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
          const SizedBox(height: 4),
          PrimaryButton(
            text: _isSubmitting
                ? 'Submitting...'
                : 'Submit Quiz',
            icon: Icons.check,
            onPressed: _isSubmitting ? null : _submitQuiz,
          ),
          const SizedBox(height: 24),
        ],
      ),
    );
  }
}
