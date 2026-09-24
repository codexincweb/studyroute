require("dotenv").config();

const pool = require("./db/db");

const path = {
  goal: "Mobile App Development",
  level: "Intermediate",
  title: "Mobile App Development Intermediate Route",
  description:
    "A practical intermediate route covering advanced Kotlin, Android architecture, Jetpack Compose, APIs, authentication, local databases, offline-first development, testing, security, and production release."
};

const stages = [
  {
    orderIndex: 1,
    title: "Advanced Kotlin & App Architecture",
    description: "Strengthen Kotlin skills and learn how to organize Android applications into maintainable architecture.",
    objectives: [
      "Use advanced Kotlin features and collections.",
      "Understand classes, interfaces, and data classes.",
      "Separate application responsibilities into logical layers.",
      "Understand the role of ViewModel in Android applications.",
      "Write maintainable and reusable Kotlin code."
    ],
    resources: [
      {
        title: "Kotlin Documentation",
        type: "documentation",
        url: "https://kotlinlang.org/docs/home.html"
      },
      {
        title: "Android Developers: App Architecture",
        type: "documentation",
        url: "https://developer.android.com/topic/architecture"
      }
    ],
    quiz: {
      title: "Advanced Kotlin & App Architecture Quiz",
      questions: [
        {
          question: "Why is application architecture important?",
          answers: [
            ["It helps organize responsibilities and makes applications easier to maintain", true],
            ["It automatically removes every software bug", false],
            ["It replaces the Android operating system", false],
            ["It determines the physical size of a phone", false]
          ]
        },
        {
          question: "What is a data class commonly useful for in Kotlin?",
          answers: [
            ["Representing data objects with generated utility behavior", true],
            ["Creating network cables", false],
            ["Installing Android updates", false],
            ["Replacing the application database", false]
          ]
        },
        {
          question: "What is a ViewModel commonly used for in Android?",
          answers: [
            ["Managing UI-related data in a lifecycle-conscious way", true],
            ["Controlling phone hardware directly", false],
            ["Replacing the operating system", false],
            ["Compressing every application image", false]
          ]
        },
        {
          question: "Why should application responsibilities be separated into logical layers?",
          answers: [
            ["It improves maintainability, testing, and organization", true],
            ["It guarantees unlimited storage", false],
            ["It removes the need for source control", false],
            ["It prevents users from interacting with the app", false]
          ]
        },
        {
          question: "Kotlin supports interfaces and object-oriented programming.",
          answers: [
            ["True", true],
            ["False", false]
          ]
        }
      ]
    }
  },
  {
    orderIndex: 3,
    title: "Networking, APIs & Authentication",
    description: "Connect Android applications to backend services and implement secure user authentication workflows.",
    objectives: [
      "Consume REST APIs from Android applications.",
      "Work with JSON responses and request data.",
      "Handle asynchronous network operations.",
      "Understand authentication tokens and sessions.",
      "Handle network errors and loading states."
    ],
    resources: [
      {
        title: "Android Developers: Network Operations",
        type: "documentation",
        url: "https://developer.android.com/develop/connectivity/network-ops"
      },
      {
        title: "OWASP: Authentication Cheat Sheet",
        type: "documentation",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html"
      }
    ],
    quiz: {
      title: "Networking, APIs & Authentication Quiz",
      questions: [
        {
          question: "What is a REST API commonly used for?",
          answers: [
            ["Allowing applications to communicate with backend resources over HTTP", true],
            ["Changing the physical hardware of a phone", false],
            ["Replacing Kotlin code", false],
            ["Increasing the screen resolution", false]
          ]
        },
        {
          question: "Why is JSON commonly used by mobile applications?",
          answers: [
            ["It provides a structured format for exchanging data", true],
            ["It is a replacement for the Android operating system", false],
            ["It physically stores data inside the phone battery", false],
            ["It automatically encrypts every network connection", false]
          ]
        },
        {
          question: "What does authentication verify?",
          answers: [
            ["The identity of a user or system", true],
            ["The size of an application icon", false],
            ["The screen brightness", false],
            ["The number of UI components", false]
          ]
        },
        {
          question: "Why should an application handle network errors?",
          answers: [
            ["Network requests can fail because of connectivity or server problems", true],
            ["Network requests can never fail", false],
            ["Errors only occur during application installation", false],
            ["Handling errors removes the need for APIs", false]
          ]
        },
        {
          question: "Authentication tokens can be used to represent an authenticated session or request authorization.",
          answers: [
            ["True", true],
            ["False", false]
          ]
        }
      ]
    }
  },
  {
    orderIndex: 4,
    title: "Local Databases & Offline-First Apps",
    description: "Learn how to persist application data locally and design mobile experiences that remain useful when connectivity is limited.",
    objectives: [
      "Understand persistent local data storage.",
      "Use Room as an Android database abstraction.",
      "Store and retrieve structured application data.",
      "Understand the principles of offline-first application design.",
      "Synchronize local data with remote services at a basic level."
    ],
    resources: [
      {
        title: "Android Developers: Room",
        type: "documentation",
        url: "https://developer.android.com/training/data-storage/room"
      },
      {
        title: "Android Developers: Offline-First",
        type: "documentation",
        url: "https://developer.android.com/topic/architecture/data-layer/offline-first"
      }
    ],
    quiz: {
      title: "Local Databases & Offline-First Apps Quiz",
      questions: [
        {
          question: "What is the purpose of a local database in a mobile application?",
          answers: [
            ["To persist structured data on the device", true],
            ["To increase the phone's physical storage capacity", false],
            ["To replace the Android operating system", false],
            ["To automatically create internet access", false]
          ]
        },
        {
          question: "What is Room?",
          answers: [
            ["An Android persistence library that provides an abstraction over SQLite", true],
            ["A mobile network provider", false],
            ["A UI design application", false],
            ["A programming language", false]
          ]
        },
        {
          question: "What is an offline-first application designed to do?",
          answers: [
            ["Provide useful functionality even when network connectivity is unavailable or limited", true],
            ["Require an internet connection for every screen", false],
            ["Disable all local data storage", false],
            ["Prevent applications from communicating with servers", false]
          ]
        },
        {
          question: "Why might an application synchronize local and remote data?",
          answers: [
            ["To keep device data and server data consistent when connectivity is available", true],
            ["To increase screen brightness", false],
            ["To remove all application state", false],
            ["To replace user authentication", false]
          ]
        },
        {
          question: "Offline-first design can improve the experience of users with unreliable network connectivity.",
          answers: [
            ["True", true],
            ["False", false]
          ]
        }
      ]
    }
  },
  {
    orderIndex: 5,
    title: "Testing, Security & Production Release",
    description: "Learn how to test Android applications, apply mobile security practices, and prepare an app for production release.",
    objectives: [
      "Understand unit and UI testing in Android applications.",
      "Write basic tests for application logic and interfaces.",
      "Apply secure storage and authentication practices.",
      "Identify common mobile application security risks.",
      "Prepare an Android application for production release."
    ],
    resources: [
      {
        title: "Android Developers: Testing",
        type: "documentation",
        url: "https://developer.android.com/training/testing"
      },
      {
        title: "OWASP: Mobile Application Security",
        type: "documentation",
        url: "https://mas.owasp.org/"
      }
    ],
    quiz: {
      title: "Testing, Security & Production Release Quiz",
      questions: [
        {
          question: "Why is testing important in mobile application development?",
          answers: [
            ["To identify defects and verify that application behavior works as expected", true],
            ["To increase the physical size of the application", false],
            ["To remove the need for source code", false],
            ["To guarantee unlimited internet access", false]
          ]
        },
        {
          question: "What is a unit test primarily used to test?",
          answers: [
            ["A small, isolated part of application logic", true],
            ["The phone's battery capacity", false],
            ["The user's internet provider", false],
            ["The physical Android device screen", false]
          ]
        },
        {
          question: "Which practice helps protect sensitive information in a mobile application?",
          answers: [
            ["Using secure storage and avoiding hard-coded secrets", true],
            ["Storing passwords directly in source code", false],
            ["Displaying authentication tokens on every screen", false],
            ["Sharing private keys publicly", false]
          ]
        },
        {
          question: "What is the purpose of preparing an application for production release?",
          answers: [
            ["To package and configure the application for distribution to real users", true],
            ["To remove all application testing", false],
            ["To disable application security", false],
            ["To prevent users from installing the application", false]
          ]
        },
        {
          question: "Security should be considered throughout mobile application development rather than only immediately before release.",
          answers: [
            ["True", true],
            ["False", false]
          ]
        }
      ]
    }
  }
];

async function seed() {
  try {
    let pathResult = await pool.query(
      `SELECT id FROM learning_paths WHERE goal = $1 AND level = $2 LIMIT 1`,
      [path.goal, path.level]
    );

    let pathId;

    if (pathResult.rows.length > 0) {
      pathId = pathResult.rows[0].id;

      await pool.query(
        `UPDATE learning_paths
         SET title = $1, description = $2
         WHERE id = $3`,
        [path.title, path.description, pathId]
      );
    } else {
      const result = await pool.query(
        `INSERT INTO learning_paths (goal, level, title, description)
         VALUES ($1, $2, $3, $4)
         RETURNING id`,
        [path.goal, path.level, path.title, path.description]
      );

      pathId = result.rows[0].id;
    }

    for (const stage of stages) {
      const stageResult = await pool.query(
        `INSERT INTO stages (learning_path_id, order_index, title, description)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (learning_path_id, order_index)
         DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description
         RETURNING id`,
        [pathId, stage.orderIndex, stage.title, stage.description]
      );

      const stageId = stageResult.rows[0].id;

      await pool.query(
        `DELETE FROM stage_objectives WHERE stage_id = $1`,
        [stageId]
      );

      for (const objective of stage.objectives) {
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

      for (const resource of stage.resources) {
        await pool.query(
          `INSERT INTO resources (stage_id, title, type, url)
           VALUES ($1, $2, $3, $4)`,
          [stageId, resource.title, resource.type, resource.url]
        );
      }

      let quizResult = await pool.query(
        `SELECT id FROM quizzes WHERE stage_id = $1 LIMIT 1`,
        [stageId]
      );

      let quizId;

      if (quizResult.rows.length > 0) {
        quizId = quizResult.rows[0].id;

        await pool.query(
          `UPDATE quizzes
           SET title = $1, passing_percentage = 70
           WHERE id = $2`,
          [stage.quiz.title, quizId]
        );

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
      } else {
        const newQuiz = await pool.query(
          `INSERT INTO quizzes (stage_id, title, passing_percentage)
           VALUES ($1, $2, 70)
           RETURNING id`,
          [stageId, stage.quiz.title]
        );

        quizId = newQuiz.rows[0].id;
      }

      for (const question of stage.quiz.questions) {
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

      console.log(
        `Seeded stage ${stage.orderIndex}: ${stage.title} (ID ${stageId})`
      );
    }

    console.log(`Mobile App Development Intermediate path ready (ID ${pathId})`);
  } catch (error) {
    console.error("Seed failed:", error);
  } finally {
    await pool.end();
  }
}

seed();
