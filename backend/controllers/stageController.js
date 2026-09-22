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

async function getStageById(req, res) {
  try {
    const { id } = req.params;
    const userId = getOptionalUserId(req);

    const stageResult = await pool.query(
      `SELECT id, learning_path_id, order_index, title, description
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

    const objectivesResult = await pool.query(
      `SELECT objective
       FROM stage_objectives
       WHERE stage_id = $1
       ORDER BY id`,
      [id]
    );

    const resourcesResult = await pool.query(
      `SELECT id, title, type, url
       FROM resources
       WHERE stage_id = $1
       ORDER BY id`,
      [id]
    );

    const quizResult = await pool.query(
      `SELECT id
       FROM quizzes
       WHERE stage_id = $1`,
      [id]
    );

    let isCompleted = false;

    if (userId) {
      const progressResult = await pool.query(
        `SELECT completed
         FROM user_progress
         WHERE user_id = $1
           AND stage_id = $2`,
        [userId, id]
      );

      isCompleted =
        progressResult.rows.length > 0 &&
        progressResult.rows[0].completed === true;
    }

    const previousStageResult = await pool.query(
      `SELECT id
       FROM stages
       WHERE learning_path_id = $1
         AND order_index < $2
       ORDER BY order_index DESC
       LIMIT 1`,
      [stage.learning_path_id, stage.order_index]
    );

    let isLocked = false;

    if (previousStageResult.rows.length > 0) {
      const previousStageId = previousStageResult.rows[0].id;

      if (userId) {
        const previousProgressResult = await pool.query(
          `SELECT completed
           FROM user_progress
           WHERE user_id = $1
             AND stage_id = $2`,
          [userId, previousStageId]
        );

        isLocked =
          previousProgressResult.rows.length === 0 ||
          previousProgressResult.rows[0].completed !== true;
      } else {
        isLocked = true;
      }
    }

    return res.json({
      stage: {
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
      },
    });
  } catch (error) {
    console.error("Get stage error:", error);

    return res.status(500).json({
      error: {
        message: "Something went wrong",
      },
    });
  }
}

module.exports = {
  getStageById,
};
