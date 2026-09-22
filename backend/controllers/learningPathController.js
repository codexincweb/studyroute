const jwt = require("jsonwebtoken");
const pool = require("../db/db");

function getOptionalUserId(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (error) {
    return null;
  }
}

async function getLearningPaths(req, res) {
  try {
    const result = await pool.query(
      `SELECT id, goal, level, title, description
       FROM learning_paths
       ORDER BY id`
    );

    return res.json({
      learningPaths: result.rows,
    });
  } catch (error) {
    console.error("Get learning paths error:", error);

    return res.status(500).json({
      error: {
        message: "Something went wrong",
      },
    });
  }
}

async function getLearningPathById(req, res) {
  try {
    const { id } = req.params;
    const userId = getOptionalUserId(req);

    const pathResult = await pool.query(
      `SELECT id, goal, level, title, description
       FROM learning_paths
       WHERE id = $1`,
      [id]
    );

    if (pathResult.rows.length === 0) {
      return res.status(404).json({
        error: {
          message: "Learning path not found",
        },
      });
    }

    const path = pathResult.rows[0];

    const stagesResult = await pool.query(
      `SELECT id, order_index, title, description
       FROM stages
       WHERE learning_path_id = $1
       ORDER BY order_index`,
      [id]
    );

    let completedStageIds = new Set();

    if (userId) {
      const progressResult = await pool.query(
        `SELECT stage_id
         FROM user_progress
         WHERE user_id = $1
           AND completed = true`,
        [userId]
      );

      completedStageIds = new Set(
        progressResult.rows.map((row) => String(row.stage_id))
      );
    }

    const stages = [];
    let nextIncompleteFound = false;

    for (const stage of stagesResult.rows) {
      const stageId = String(stage.id);
      const isCompleted = completedStageIds.has(stageId);

      let isLocked;

      if (isCompleted) {
        isLocked = false;
      } else if (!nextIncompleteFound) {
        isLocked = false;
        nextIncompleteFound = true;
      } else {
        isLocked = true;
      }

      const objectivesResult = await pool.query(
        `SELECT objective
         FROM stage_objectives
         WHERE stage_id = $1
         ORDER BY id`,
        [stage.id]
      );

      const resourcesResult = await pool.query(
        `SELECT id, title, type, url
         FROM resources
         WHERE stage_id = $1
         ORDER BY id`,
        [stage.id]
      );

      const quizResult = await pool.query(
        `SELECT id
         FROM quizzes
         WHERE stage_id = $1`,
        [stage.id]
      );

      stages.push({
        id: stage.id,
        number: stage.order_index,
        title: stage.title,
        description: stage.description,
        objectives: objectivesResult.rows.map(
          (row) => row.objective
        ),
        resources: resourcesResult.rows.map(
  (row) => row.title
),
        quizId:
          quizResult.rows.length > 0
            ? quizResult.rows[0].id
            : null,
        isCompleted,
        isLocked,
      });
    }

    return res.json({
      learningPath: {
        ...path,
        stages,
      },
    });
  } catch (error) {
    console.error("Get learning path error:", error);

    return res.status(500).json({
      error: {
        message: "Something went wrong",
      },
    });
  }
}

module.exports = {
  getLearningPaths,
  getLearningPathById,
};
