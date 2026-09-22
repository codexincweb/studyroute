import 'package:flutter/material.dart';

import '../../app/routes.dart';
import '../../app/theme.dart';
import '../../widgets/primary_button.dart';
import '../../widgets/selection_card.dart';

class ChooseLevelScreen extends StatefulWidget {
  const ChooseLevelScreen({super.key});

  @override
  State<ChooseLevelScreen> createState() => _ChooseLevelScreenState();
}

class _ChooseLevelScreenState extends State<ChooseLevelScreen> {
  String? _selectedLevel;

  String _goal = 'your goal';

  final List<Map<String, dynamic>> _levels = [
    {
      'title': 'Beginner',
      'subtitle': 'I\'m starting from the beginning.',
      'icon': Icons.looks_one_outlined,
    },
    {
      'title': 'Intermediate',
      'subtitle': 'I understand the basics already.',
      'icon': Icons.looks_two_outlined,
    },
    {
      'title': 'Advanced',
      'subtitle': 'I have solid experience and want to go deeper.',
      'icon': Icons.looks_3_outlined,
    },
  ];

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();

    final arguments = ModalRoute.of(context)?.settings.arguments;

    if (arguments is String) {
      _goal = arguments;
    }
  }

  void _buildRoute() {
    if (_selectedLevel == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please choose your level first.')),
      );
      return;
    }

    Navigator.pushReplacementNamed(
      context,
      AppRoutes.routeDashboard,
      arguments: {'goal': _goal, 'level': _selectedLevel},
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.fromLTRB(20, 10, 20, 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'What\'s your current level?',
                      style: TextStyle(
                        fontSize: 30,
                        height: 1.15,
                        fontWeight: FontWeight.w800,
                        color: AppColors.text,
                      ),
                    ),

                    const SizedBox(height: 10),

                    Text(
                      'We\'ll use your level to create a '
                      'route that fits your experience in $_goal.',
                      style: const TextStyle(
                        fontSize: 15,
                        height: 1.5,
                        color: AppColors.secondaryText,
                      ),
                    ),

                    const SizedBox(height: 28),

                    ..._levels.map((level) {
                      final title = level['title'] as String;

                      return Padding(
                        padding: const EdgeInsets.only(bottom: 12),
                        child: SelectionCard(
                          title: title,
                          subtitle: level['subtitle'] as String,
                          icon: level['icon'] as IconData,
                          selected: _selectedLevel == title,
                          onTap: () {
                            setState(() {
                              _selectedLevel = title;
                            });
                          },
                        ),
                      );
                    }),
                  ],
                ),
              ),
            ),

            Padding(
              padding: const EdgeInsets.fromLTRB(20, 10, 20, 20),
              child: PrimaryButton(
                text: 'Build My Route',
                icon: Icons.route,
                onPressed: _buildRoute,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
