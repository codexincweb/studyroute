require("dotenv").config();

const pool = require("./db/db");

async function fix() {
  try {
    const pathResult = await pool.query(
      `SELECT id FROM learning_paths
       WHERE goal = $1 AND level = $2
       LIMIT 1`,
      ["Mobile App Development", "Intermediate"]
    );

    if (!pathResult.rows.length) {
      throw new Error("Mobile App Development Intermediate path not found");
    }

    const pathId = pathResult.rows[0].id;

    const stageResult = await pool.query(
      `INSERT INTO stages (learning_path_id, order_index, title, description)
       VALUES ($1, 2, $2, $3)
       ON CONFLICT (learning_path_id, order_index)
       DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description
       RETURNING id`,
      [
        pathId,
        "Advanced Jetpack Compose & Navigation",
        "Build structured Android interfaces with reusable Compose components, navigation, and state management."
      ]
    );

    const stageId = stageResult.rows[0].id;

    await pool.query(
      `DELETE FROM stage_objectives WHERE stage_id = $1`,
      [stageId]
    );

    const objectives = [
      "Build reusable Jetpack Compose components.",
      "Manage UI state across composables.",
      "Navigate between multiple application screens.",
      "Pass data between screens safely.",
      "Create responsive and maintainable Compose interfaces."
    ];

    for (const objective of objectives) {
      await pool.query(
        `INSERT INTO stage_objectives (stage_id, objective)
         VALUES ($1, $2)`,
        [stageId, objective]
      );
    }

    await pool.query(
      `DELETE FROM resources WHERE stage_id = $1`,
      [stageId]
    );

    const resources = [
      [
        "Android Developers: Compose",
        "documentation",
        "https://developer.android.com/develop/ui/compose"
      ],
      [
        "Android Developers: Navigation with Compose",
        "documentation",
        "https://developer.android.com/develop/ui/compose/navigation"
      ]
    ];

    for (const resource of resources) {
      await pool.query(
        `INSERT INTO resources (stage_id, title, type, url)
         VALUES ($1, $2, $3, $4)`,
        [stageId, resource[0], resource[1], resource[2]]
      );
    }

    let quizResult = await pool.query(
      `SELECT id FROM quizzes WHERE stage_id = $1 LIMIT 1`,
      [stageId]
    );

    let quizId;

    if (quizResult.rows.length) {
      quizId = quizResult.rows[0].id;

      await pool.query(
        `DELETE FROM answers
         WHERE question_id IN (
           SELECT id FROM questions WHERE quiz_id = $1
         )`,
        [quizId]
      );

      await pool.query(
        `DELETE FROM questions WHERE quiz_id = $1`,
        [quizId]
      );

      await pool.query(
        `UPDATE quizzes
         SET title = $1, passing_percentage = 70
         WHERE id = $2`,
        ["Advanced Jetpack Compose & Navigation Quiz", quizId]
      );
    } else {
      const newQuiz = await pool.query(
        `INSERT INTO quizzes (stage_id, title, passing_percentage)
         VALUES ($1, $2, 70)
         RETURNING id`,
        [stageId, "Advanced Jetpack Compose & Navigation Quiz"]
      );

      quizId = newQuiz.rows[0].id;
    }

    const questions = [
      {
        question: "What is Jetpack Compose primarily used for?",
        answers: [
          ["Building Android user interfaces with a declarative approach", true],
          ["Managing Android device hardware", false],
          ["Creating database servers", false],
          ["Replacing the Kotlin compiler", false]
        ]
      },
      {
        question: "What is the purpose of state in a Compose UI?",
        answers: [
          ["To represent data that can change and cause the UI to update", true],
          ["To permanently disable UI updates", false],
          ["To replace Android navigation", false],
          ["To increase device storage", false]
        ]
      },
      {
        question: "What is navigation used for in a multi-screen Android application?",
        answers: [
          ["Moving between different screens or destinations", true],
          ["Encrypting every database automatically", false],
          ["Increasing network bandwidth", false],
          ["Compiling Kotlin source code", false]
        ]
      },
      {
        question: "Why are reusable Compose components useful?",
        answers: [
          ["They reduce duplication and make UI code easier to maintain", true],
          ["They prevent applications from having multiple screens", false],
          ["They remove the need for application state", false],
          ["They automatically publish apps to the Play Store", false]
        ]
      },
      {
        question: "Compose navigation can be used to organize movement between destinations in an Android application.",
        answers: [
          ["True", true],
          ["False", false]
        ]
      }
    ];

    for (const question of questions) {
      const questionResult = await pool.query(
        `INSERT INTO questions (quiz_id, question_text)
         VALUES ($1, $2)
         RETURNING id`,
        [quizId, question.question]
      );

      const questionId = questionResult.rows[0].id;

      for (const answer of question.answers) {
        await pool.query(
          `INSERT INTO answers (question_id, answer_text, is_correct)
           VALUES ($1, $2, $3)`,
          [questionId, answer[0], answer[1]]
        );
      }
    }

    console.log(`Stage 2 fixed: ${stageId}`);
  } catch (error) {
    console.error("Fix failed:", error);
  } finally {
    await pool.end();
  }
}

fix();
