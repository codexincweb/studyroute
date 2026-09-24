import 'package:flutter/material.dart';

import '../../app/routes.dart';
import '../../app/theme.dart';
import '../../widgets/primary_button.dart';
import '../../widgets/selection_card.dart';

class ChooseGoalScreen extends StatefulWidget {
  const ChooseGoalScreen({super.key});

  @override
  State<ChooseGoalScreen> createState() => _ChooseGoalScreenState();
}

class _ChooseGoalScreenState extends State<ChooseGoalScreen> {
  String? _selectedGoal;

  final List<Map<String, dynamic>> _goals = [
    {
      'title': 'Web Development',
      'subtitle': 'Build websites and web applications',
      'icon': Icons.language,
    },
    {
      'title': 'Mobile App Development',
      'subtitle': 'Build Android and iOS applications',
      'icon': Icons.phone_android_outlined,
    },
    {
      'title': 'Data Science',
      'subtitle': 'Work with data, analysis and insights',
      'icon': Icons.bar_chart_outlined,
    },
    {
      'title': 'UI/UX Design',
      'subtitle': 'Design useful and beautiful experiences',
      'icon': Icons.design_services_outlined,
    },
    {
      'title': 'Cyber Security',
      'subtitle': 'Learn how to protect systems and data',
      'icon': Icons.security_outlined,
    },
  ];

  void _continue() {
    if (_selectedGoal == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please choose a goal first.')),
      );
      return;
    }

    Navigator.pushNamed(
      context,
      AppRoutes.chooseLevel,
      arguments: _selectedGoal,
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
                      'What do you want to learn?',
                      style: TextStyle(
                        fontSize: 30,
                        height: 1.15,
                        fontWeight: FontWeight.w800,
                        color: AppColors.text,
                      ),
                    ),
                    const SizedBox(height: 10),
                    const Text(
                      'Choose a goal and we\'ll build a route around it.',
                      style: TextStyle(
                        fontSize: 15,
                        height: 1.5,
                        color: AppColors.secondaryText,
                      ),
                    ),
                    const SizedBox(height: 28),
                    ..._goals.map((goal) {
                      final title = goal['title'] as String;

                      return Padding(
                        padding: const EdgeInsets.only(bottom: 12),
                        child: SelectionCard(
                          title: title,
                          subtitle: goal['subtitle'] as String,
                          icon: goal['icon'] as IconData,
                          selected: _selectedGoal == title,
                          onTap: () {
                            setState(() {
                              _selectedGoal = title;
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
                text: 'Continue',
                icon: Icons.arrow_forward,
                onPressed: _continue,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
