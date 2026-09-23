import 'package:flutter/material.dart';

import '../../app/routes.dart';
import '../../app/theme.dart';
import '../../services/api_service.dart';
import '../../widgets/app_text_field.dart';
import '../../widgets/primary_button.dart';

class ResetPasswordScreen extends StatefulWidget {
  final String token;

  const ResetPasswordScreen({
    super.key,
    required this.token,
  });

  @override
  State<ResetPasswordScreen> createState() => _ResetPasswordScreenState();
}

class _ResetPasswordScreenState extends State<ResetPasswordScreen> {
  final _formKey = GlobalKey<FormState>();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();

  final ApiService _apiService = ApiService();

  bool _isLoading = false;
  bool _resetSuccessful = false;

  @override
  void dispose() {
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  Future<void> _resetPassword() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    setState(() {
      _isLoading = true;
    });

    try {
      await _apiService.resetPassword(
        token: widget.token,
        password: _passwordController.text,
      );

      if (!mounted) {
        return;
      }

      setState(() {
        _resetSuccessful = true;
      });
    } catch (error) {
      if (!mounted) {
        return;
      }

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            error.toString().replaceFirst('Exception: ', ''),
          ),
        ),
      );
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: _resetSuccessful
            ? null
            : IconButton(
                icon: const Icon(Icons.arrow_back),
                onPressed: () {
                  Navigator.pop(context);
                },
              ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(20, 10, 20, 30),
          child: _resetSuccessful
              ? _buildSuccessView()
              : _buildResetForm(),
        ),
      ),
    );
  }

  Widget _buildResetForm() {
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 15),
          const Text(
            'Create a new password',
            style: TextStyle(
              fontSize: 30,
              fontWeight: FontWeight.w800,
              color: AppColors.text,
            ),
          ),
          const SizedBox(height: 10),
          const Text(
            'Choose a new password for your StudyRoute account.',
            style: TextStyle(
              fontSize: 15,
              height: 1.5,
              color: AppColors.secondaryText,
            ),
          ),
          const SizedBox(height: 32),
          AppTextField(
            label: 'New password',
            hint: 'Enter your new password',
            controller: _passwordController,
            obscureText: true,
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter a new password';
              }

              if (value.length < 6) {
                return 'Password must be at least 6 characters';
              }

              return null;
            },
          ),
          const SizedBox(height: 20),
          AppTextField(
            label: 'Confirm password',
            hint: 'Re-enter your new password',
            controller: _confirmPasswordController,
            obscureText: true,
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please confirm your password';
              }

              if (value != _passwordController.text) {
                return 'Passwords do not match';
              }

              return null;
            },
          ),
          const SizedBox(height: 30),
          PrimaryButton(
            text: 'Reset Password',
            icon: Icons.lock_reset,
            isLoading: _isLoading,
            onPressed: _resetPassword,
          ),
        ],
      ),
    );
  }

  Widget _buildSuccessView() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SizedBox(height: 15),
        const Icon(
          Icons.check_circle_outline,
          size: 56,
          color: AppColors.primary,
        ),
        const SizedBox(height: 24),
        const Text(
          'Password reset',
          style: TextStyle(
            fontSize: 30,
            fontWeight: FontWeight.w800,
            color: AppColors.text,
          ),
        ),
        const SizedBox(height: 12),
        const Text(
          'Your password has been changed successfully. You can now log in with your new password.',
          style: TextStyle(
            fontSize: 15,
            height: 1.5,
            color: AppColors.secondaryText,
          ),
        ),
        const SizedBox(height: 30),
        PrimaryButton(
          text: 'Back to Log In',
          icon: Icons.arrow_forward,
          onPressed: () {
            Navigator.pushReplacementNamed(
              context,
              AppRoutes.login,
            );
          },
        ),
      ],
    );
  }
}
