const pool = require("../db/db");

async function getProgress(req, res) {
  try {
    const userId = req.userId;

    const result = await pool.query(
      `SELECT
         lp.id AS learning_path_id,
         lp.goal,
         lp.level,
         lp.title AS learning_path_title,
         s.id AS stage_id,
         s.order_index,
         s.title AS stage_title,
         s.description AS stage_description,
         COALESCE(up.completed, FALSE) AS completed
       FROM learning_paths lp
       JOIN stages s
         ON s.learning_path_id = lp.id
       LEFT JOIN user_progress up
         ON up.stage_id = s.id
        AND up.user_id = $1
       ORDER BY lp.id, s.order_index`,
      [userId]
    );

    const stages = result.rows;

    if (stages.length === 0) {
      return res.json({
        progress: {
          completedStages: 0,
          totalStages: 0,
          percentage: 0,
          currentStageId: null,
          stages: [],
        },
      });
    }

    const completedStages = stages.filter(
      (stage) => stage.completed
    ).length;

    const totalStages = stages.length;

    let currentStageId = null;

    for (const stage of stages) {
      if (!stage.completed) {
        currentStageId = stage.stage_id;
        break;
      }
    }

    return res.json({
      progress: {
        completedStages,
        totalStages,
        percentage: Math.round(
          (completedStages / totalStages) * 100
        ),
        currentStageId,
        stages: stages.map((stage) => ({
          id: stage.stage_id,
          order: stage.order_index,
          title: stage.stage_title,
          description: stage.stage_description,
          completed: stage.completed,
        })),
      },
    });
  } catch (error) {
    console.error("Get progress error:", error);

    return res.status(500).json({
      error: {
        message: "Something went wrong",
      },
    });
  }
}

async function completeStage(req, res) {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const stageResult = await pool.query(
      `SELECT id, learning_path_id, order_index
       FROM stages
       WHERE id = $1`,
      [id]
    );

    if (stageResult.rows.length === 0) {
      return res.status(404).json({
        error: {
          message: "Stage not found",
        },
      });
    }

    const stage = stageResult.rows[0];

    const quizResult = await pool.query(
      `SELECT q.id
       FROM quizzes q
       WHERE q.stage_id = $1`,
      [id]
    );

    if (quizResult.rows.length > 0) {
      const quizId = quizResult.rows[0].id;

      const passedQuizResult = await pool.query(
        `SELECT 1
         FROM quiz_attempts
         WHERE user_id = $1
           AND quiz_id = $2
           AND passed = TRUE
         LIMIT 1`,
        [userId, quizId]
      );

      if (passedQuizResult.rows.length === 0) {
        return res.status(403).json({
          error: {
            message: "Pass the stage quiz before completing this stage",
          },
        });
      }
    }

    if (stage.order_index > 1) {
      const previousStageResult = await pool.query(
        `SELECT id
         FROM stages
         WHERE learning_path_id = $1
           AND order_index = $2`,
        [stage.learning_path_id, stage.order_index - 1]
      );

      if (previousStageResult.rows.length > 0) {
        const previousStageId = previousStageResult.rows[0].id;

        const previousProgressResult = await pool.query(
          `SELECT completed
           FROM user_progress
           WHERE user_id = $1
             AND stage_id = $2`,
          [userId, previousStageId]
        );

        const previousCompleted =
          previousProgressResult.rows.length > 0 &&
          previousProgressResult.rows[0].completed === true;

        if (!previousCompleted) {
          return res.status(403).json({
            error: {
              message: "Complete the previous stage first",
            },
          });
        }
      }
    }

    const result = await pool.query(
      `INSERT INTO user_progress (
         user_id,
         stage_id,
         completed,
         completed_at
       )
       VALUES ($1, $2, TRUE, NOW())
       ON CONFLICT (user_id, stage_id)
       DO UPDATE SET
         completed = TRUE,
         completed_at = NOW()
       RETURNING id, user_id, stage_id, completed, completed_at`,
      [userId, id]
    );

    return res.json({
      progress: result.rows[0],
    });
  } catch (error) {
    console.error("Complete stage error:", error);

    return res.status(500).json({
      error: {
        message: "Something went wrong",
      },
    });
  }
}

module.exports = {
  getProgress,
  completeStage,
};
