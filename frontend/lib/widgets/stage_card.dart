import 'package:flutter/material.dart';

import '../app/theme.dart';

enum StageStatus { completed, current, locked }

class StageCard extends StatelessWidget {
  final int stageNumber;
  final String title;
  final String description;
  final StageStatus status;
  final VoidCallback? onTap;

  const StageCard({
    super.key,
    required this.stageNumber,
    required this.title,
    required this.description,
    required this.status,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final bool isLocked = status == StageStatus.locked;
    final bool isCompleted = status == StageStatus.completed;

    return InkWell(
      onTap: isLocked ? null : onTap,
      borderRadius: BorderRadius.circular(16),
      child: Opacity(
        opacity: isLocked ? 0.55 : 1,
        child: Container(
          width: double.infinity,
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: status == StageStatus.current
                  ? AppColors.primary
                  : AppColors.border,
              width: status == StageStatus.current ? 2 : 1,
            ),
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildStatusIcon(isCompleted: isCompleted, isLocked: isLocked),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Stage $stageNumber',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                        color: status == StageStatus.current
                            ? AppColors.primary
                            : AppColors.secondaryText,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      title,
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w700,
                        color: AppColors.text,
                      ),
                    ),
                    const SizedBox(height: 5),
                    Text(
                      description,
                      style: const TextStyle(
                        fontSize: 13,
                        height: 1.4,
                        color: AppColors.secondaryText,
                      ),
                    ),
                  ],
                ),
              ),
              if (!isLocked)
                const Padding(
                  padding: EdgeInsets.only(left: 8, top: 10),
                  child: Icon(Icons.chevron_right, color: AppColors.mutedText),
                ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStatusIcon({required bool isCompleted, required bool isLocked}) {
    if (isCompleted) {
      return Container(
        width: 42,
        height: 42,
        decoration: const BoxDecoration(
          shape: BoxShape.circle,
          color: AppColors.success,
        ),
        child: const Icon(Icons.check, color: Colors.white, size: 21),
      );
    }

    if (isLocked) {
      return Container(
        width: 42,
        height: 42,
        decoration: const BoxDecoration(
          shape: BoxShape.circle,
          color: AppColors.border,
        ),
        child: const Icon(
          Icons.lock_outline,
          color: AppColors.secondaryText,
          size: 20,
        ),
      );
    }

    return Container(
      width: 42,
      height: 42,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: AppColors.primaryLight,
        border: Border.all(color: AppColors.primary, width: 2),
      ),
      child: Icon(Icons.play_arrow_rounded, color: AppColors.primary, size: 22),
    );
  }
}
