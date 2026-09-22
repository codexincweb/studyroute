const pool = require("../db/db");

async function getQuizById(req, res) {
  try {
    const { id } = req.params;

    const quizResult = await pool.query(
      `SELECT id, stage_id, title, passing_percentage
       FROM quizzes
       WHERE id = $1`,
      [id]
    );

    if (quizResult.rows.length === 0) {
      return res.status(404).json({
        error: {
          message: "Quiz not found",
        },
      });
    }

    const quiz = quizResult.rows[0];

    const questionsResult = await pool.query(
      `SELECT id, question_text
       FROM questions
       WHERE quiz_id = $1
       ORDER BY id`,
      [id]
    );

    const questions = [];

    for (const question of questionsResult.rows) {
      const answersResult = await pool.query(
        `SELECT id, answer_text
         FROM answers
         WHERE question_id = $1
         ORDER BY id`,
        [question.id]
      );

      questions.push({
        id: question.id,
        question: question.question_text,
        answers: answersResult.rows,
      });
    }

    return res.json({
      quiz: {
        id: quiz.id,
        stageId: quiz.stage_id,
        title: quiz.title,
        passingPercentage: quiz.passing_percentage,
        questions,
      },
    });
  } catch (error) {
    console.error("Get quiz error:", error);

    return res.status(500).json({
      error: {
        message: "Something went wrong",
      },
    });
  }
}

async function submitQuiz(req, res) {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { answers } = req.body;

    if (!Array.isArray(answers)) {
      return res.status(400).json({
        error: {
          message: "Answers must be an array",
        },
      });
    }

    const quizResult = await pool.query(
      `SELECT id, passing_percentage
       FROM quizzes
       WHERE id = $1`,
      [id]
    );

    if (quizResult.rows.length === 0) {
      return res.status(404).json({
        error: {
          message: "Quiz not found",
        },
      });
    }

    const quiz = quizResult.rows[0];

    const questionsResult = await pool.query(
      `SELECT id
       FROM questions
       WHERE quiz_id = $1`,
      [id]
    );

    const questions = questionsResult.rows;

    if (questions.length === 0) {
      return res.status(400).json({
        error: {
          message: "Quiz has no questions",
        },
      });
    }

    const questionIds = new Set(
      questions.map((question) => String(question.id))
    );

    const submittedQuestionIds = new Set();

    for (const answer of answers) {
      if (
        !answer ||
        answer.questionId === undefined ||
        answer.answerId === undefined
      ) {
        return res.status(400).json({
          error: {
            message: "Each answer must contain questionId and answerId",
          },
        });
      }

      const questionId = String(answer.questionId);

      if (!questionIds.has(questionId)) {
        return res.status(400).json({
          error: {
            message: "Invalid question for this quiz",
          },
        });
      }

      if (submittedQuestionIds.has(questionId)) {
        return res.status(400).json({
          error: {
            message: "Duplicate question answers are not allowed",
          },
        });
      }

      submittedQuestionIds.add(questionId);
    }

    if (submittedQuestionIds.size !== questions.length) {
      return res.status(400).json({
        error: {
          message: "An answer is required for every question",
        },
      });
    }

    let correctAnswers = 0;

    for (const answer of answers) {
      const result = await pool.query(
        `SELECT id
         FROM answers
         WHERE id = $1
           AND question_id = $2
           AND is_correct = TRUE`,
        [answer.answerId, answer.questionId]
      );

      if (result.rows.length > 0) {
        correctAnswers++;
      }
    }

    const score = Math.round(
      (correctAnswers / questions.length) * 100
    );

    const passed = score >= quiz.passing_percentage;

    await pool.query(
      `INSERT INTO quiz_attempts (user_id, quiz_id, score, passed)
       VALUES ($1, $2, $3, $4)`,
      [userId, id, score, passed]
    );

    return res.json({
      score,
      passingPercentage: quiz.passing_percentage,
      passed,
    });
  } catch (error) {
    console.error("Submit quiz error:", error);

    return res.status(500).json({
      error: {
        message: "Something went wrong",
      },
    });
  }
}

module.exports = {
  getQuizById,
  submitQuiz,
};
