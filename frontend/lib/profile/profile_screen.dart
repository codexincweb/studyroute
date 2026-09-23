import 'package:flutter/material.dart';

import '../app/routes.dart';
import '../app/theme.dart';
import '../services/api_service.dart';
import '../services/storage_service.dart';
import '../widgets/bottom_nav.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final ApiService _apiService = ApiService();
  final StorageService _storageService = StorageService();

  String _name = 'StudyRoute Learner';
  String _email = 'Loading...';
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadProfile();
  }

  Future<void> _loadProfile() async {
    try {
      final token = await _storageService.getToken();

      if (token == null || token.isEmpty) {
        throw Exception('No login session found.');
      }

      final result = await _apiService.getMe(token);

      final user = result['user'] as Map<String, dynamic>?;

      if (user == null) {
        throw Exception('User information was not returned.');
      }

      if (!mounted) {
        return;
      }

      setState(() {
        _name = user['name']?.toString() ?? 'StudyRoute Learner';
        _email = user['email']?.toString() ?? '';
        _isLoading = false;
      });
    } catch (error) {
      if (!mounted) {
        return;
      }

      setState(() {
        _email = 'Unable to load account';
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: const Text(
          'Profile',
          style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(20, 10, 20, 30),
          child: Column(
            children: [
              const SizedBox(height: 10),

              // Profile header
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(22),
                  border: Border.all(color: AppColors.border),
                ),
                child: Column(
                  children: [
                    Container(
                      width: 76,
                      height: 76,
                      decoration: const BoxDecoration(
                        shape: BoxShape.circle,
                        color: AppColors.primaryLight,
                      ),
                      child: const Icon(
                        Icons.person,
                        size: 38,
                        color: AppColors.primary,
                      ),
                    ),

                    const SizedBox(height: 14),

                    Text(
                      _isLoading ? 'Loading...' : _name,
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        fontSize: 19,
                        fontWeight: FontWeight.w800,
                        color: AppColors.text,
                      ),
                    ),

                    const SizedBox(height: 5),

                    Text(
                      _email,
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        fontSize: 13,
                        color: AppColors.secondaryText,
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 20),

              _ProfileOption(
                icon: Icons.route_outlined,
                title: 'My Route',
                subtitle: 'View your learning route',
                onTap: () {
                  Navigator.pushReplacementNamed(
                    context,
                    AppRoutes.routeDashboard,
                  );
                },
              ),

              const SizedBox(height: 10),

              _ProfileOption(
                icon: Icons.bar_chart_outlined,
                title: 'My Progress',
                subtitle: 'See your learning progress',
                onTap: () {
                  Navigator.pushReplacementNamed(context, AppRoutes.progress);
                },
              ),

              const SizedBox(height: 10),

              _ProfileOption(
                icon: Icons.settings_outlined,
                title: 'Settings',
                subtitle: 'Manage your preferences',
                onTap: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Settings will be added later.'),
                    ),
                  );
                },
              ),

              const SizedBox(height: 10),

              _ProfileOption(
                icon: Icons.logout,
                title: 'Log out',
                subtitle: 'Return to the landing page',
                onTap: () async {
                  await _storageService.clearToken();

                  if (!context.mounted) {
                    return;
                  }

                  Navigator.pushNamedAndRemoveUntil(
                    context,
                    AppRoutes.landing,
                    (route) => false,
                  );
                },
                isDestructive: true,
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: const BottomNav(currentIndex: 3),
    );
  }
}

class _ProfileOption extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final VoidCallback onTap;
  final bool isDestructive;

  const _ProfileOption({
    required this.icon,
    required this.title,
    required this.subtitle,
    this.isDestructive = false,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final color = isDestructive ? Colors.red : AppColors.text;

    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppColors.border),
        ),
        child: Row(
          children: [
            Container(
              width: 44,
              height: 44,
              decoration: BoxDecoration(
                color: isDestructive
                    ? Colors.red.withValues(alpha: 0.08)
                    : AppColors.primaryLight,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(
                icon,
                color: isDestructive ? Colors.red : AppColors.primary,
              ),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w700,
                      color: color,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    subtitle,
                    style: const TextStyle(
                      fontSize: 12,
                      color: AppColors.secondaryText,
                    ),
                  ),
                ],
              ),
            ),
            const Icon(Icons.chevron_right, color: AppColors.mutedText),
          ],
        ),
      ),
    );
  }
}
