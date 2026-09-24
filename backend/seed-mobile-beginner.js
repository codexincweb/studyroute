require("dotenv").config();

const pool = require("./db/db");

const path = {
  goal: "Mobile App Development",
  level: "Beginner",
  title: "Mobile App Development Beginner Route",
  description:
    "A practical beginner route that teaches students the foundations of Android development using Kotlin, user interfaces, data, APIs, and app deployment."
};

const stages = [
  {
    orderIndex: 1,
    title: "Mobile Development Fundamentals",
    description: "Understand how mobile applications work, how Android apps are structured, and the basic development workflow.",
    objectives: [
      "Understand the difference between mobile and web applications.",
      "Learn the basic structure of an Android application.",
      "Understand activities, screens, and application components.",
      "Set up a basic Android development workflow.",
      "Understand the Android application lifecycle at a beginner level."
    ],
    resources: [
      {
        title: "Android Developers: Build Your First App",
        type: "documentation",
        url: "https://developer.android.com/codelabs/basic-android-kotlin-compose-first-app"
      },
      {
        title: "Android Developers: App Fundamentals",
        type: "documentation",
        url: "https://developer.android.com/guide/components/fundamentals"
      }
    ],
    quiz: {
      title: "Mobile Development Fundamentals Quiz",
      questions: [
        {
          question: "What is a mobile application?",
          answers: [
            ["Software designed to run on mobile devices such as phones and tablets", true],
            ["A database server used only by websites", false],
            ["A physical component inside a smartphone", false],
            ["A programming language used only for websites", false]
          ]
        },
        {
          question: "What platform is Android primarily designed for?",
          answers: [
            ["Mobile and other connected devices", true],
            ["Only desktop computers", false],
            ["Only database servers", false],
            ["Only web browsers", false]
          ]
        },
        {
          question: "What is an Android activity commonly associated with?",
          answers: [
            ["A screen or focused user interaction in an Android application", true],
            ["A database table", false],
            ["A network cable", false],
            ["An image compression format", false]
          ]
        },
        {
          question: "Why is understanding the Android application lifecycle useful?",
          answers: [
            ["It helps developers manage how an app behaves as its state changes", true],
            ["It automatically writes all application code", false],
            ["It replaces the need for a user interface", false],
            ["It prevents every possible application error", false]
          ]
        },
        {
          question: "Android applications can be developed using Kotlin.",
          answers: [
            ["True", true],
            ["False", false]
          ]
        }
      ]
    }
  },
  {
    orderIndex: 2,
    title: "Kotlin Programming Basics",
    description: "Learn the core Kotlin programming concepts needed to build Android applications.",
    objectives: [
      "Understand variables, data types, and operators in Kotlin.",
      "Use conditional statements and loops.",
      "Create and use functions.",
      "Understand collections such as lists and maps.",
      "Use null safety and basic object-oriented concepts."
    ],
    resources: [
      {
        title: "Kotlin Documentation: Kotlin Tour",
        type: "documentation",
        url: "https://kotlinlang.org/docs/kotlin-tour-welcome.html"
      },
      {
        title: "Android Developers: Kotlin for Android",
        type: "documentation",
        url: "https://developer.android.com/kotlin"
      }
    ],
    quiz: {
      title: "Kotlin Programming Basics Quiz",
      questions: [
        {
          question: "Which keyword is commonly used to declare a read-only variable in Kotlin?",
          answers: [
            ["val", true],
            ["var", false],
            ["let", false],
            ["constvar", false]
          ]
        },
        {
          question: "What is the purpose of an if expression in Kotlin?",
          answers: [
            ["To choose between different execution paths based on a condition", true],
            ["To permanently store data in a database", false],
            ["To create an Android emulator", false],
            ["To install an application", false]
          ]
        },
        {
          question: "What is a function used for?",
          answers: [
            ["To group reusable instructions that can be called when needed", true],
            ["To store only images", false],
            ["To connect a phone charger", false],
            ["To replace the operating system", false]
          ]
        },
        {
          question: "What does Kotlin null safety help developers handle?",
          answers: [
            ["Values that may be absent or null", true],
            ["Slow internet connections only", false],
            ["Screen brightness", false],
            ["Application icons", false]
          ]
        },
        {
          question: "Kotlin supports object-oriented programming concepts such as classes and objects.",
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
    title: "Android UI & User Interaction",
    description: "Learn how to create Android interfaces and respond to user actions using modern Android UI tools.",
    objectives: [
      "Understand the basic principles of mobile user interface design.",
      "Build screens using Jetpack Compose.",
      "Use common UI components such as text, buttons, and input fields.",
      "Respond to user interactions and manage simple UI state.",
      "Create layouts that work across different screen sizes."
    ],
    resources: [
      {
        title: "Android Developers: Jetpack Compose",
        type: "documentation",
        url: "https://developer.android.com/develop/ui/compose"
      },
      {
        title: "Android Developers: Compose Basics",
        type: "documentation",
        url: "https://developer.android.com/develop/ui/compose/tutorial"
      }
    ],
    quiz: {
      title: "Android UI & User Interaction Quiz",
      questions: [
        {
          question: "What is Jetpack Compose?",
          answers: [
            ["A modern toolkit for building Android user interfaces", true],
            ["A database management system", false],
            ["A mobile network provider", false],
            ["A programming language separate from Kotlin", false]
          ]
        },
        {
          question: "What is the purpose of a Button in an Android interface?",
          answers: [
            ["To provide an interactive control that can trigger an action", true],
            ["To store database records", false],
            ["To encrypt the application", false],
            ["To compile Kotlin code", false]
          ]
        },
        {
          question: "Why is UI state important in an interactive application?",
          answers: [
            ["It represents information that can change as users interact with the interface", true],
            ["It permanently replaces the application database", false],
            ["It controls the phone's battery hardware", false],
            ["It removes the need for user input", false]
          ]
        },
        {
          question: "Why should mobile interfaces consider different screen sizes?",
          answers: [
            ["Android devices can have different screen dimensions and orientations", true],
            ["Every Android device has exactly the same screen", false],
            ["Screen size determines the programming language", false],
            ["Screen size automatically controls database security", false]
          ]
        },
        {
          question: "Jetpack Compose can be used with Kotlin to build Android user interfaces.",
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
    title: "Data, APIs & Local Storage",
    description: "Learn how mobile applications retrieve data from APIs and store information locally on a device.",
    objectives: [
      "Understand how mobile apps communicate with web APIs.",
      "Work with JSON data returned by APIs.",
      "Understand HTTP requests and responses.",
      "Learn the purpose of local data storage.",
      "Handle basic loading and error states when retrieving data."
    ],
    resources: [
      {
        title: "Android Developers: Connect to the Internet",
        type: "documentation",
        url: "https://developer.android.com/develop/connectivity/network-ops/connecting"
      },
      {
        title: "Android Developers: Data Storage",
        type: "documentation",
        url: "https://developer.android.com/training/data-storage"
      }
    ],
    quiz: {
      title: "Data, APIs & Local Storage Quiz",
      questions: [
        {
          question: "What is an API commonly used for in a mobile application?",
          answers: [
            ["Communicating with another service to request or exchange data", true],
            ["Changing the physical size of a phone", false],
            ["Replacing the Android operating system", false],
            ["Charging the device battery", false]
          ]
        },
        {
          question: "What format is commonly used to exchange structured data between applications?",
          answers: [
            ["JSON", true],
            ["JPEG", false],
            ["MP3", false],
            ["PNG", false]
          ]
        },
        {
          question: "What does an HTTP response provide to a client?",
          answers: [
            ["Information about the result of a request, often including data or an error status", true],
            ["A physical connection to the device battery", false],
            ["A replacement Android operating system", false],
            ["A new programming language", false]
          ]
        },
        {
          question: "Why might an Android application use local storage?",
          answers: [
            ["To keep certain data available on the device between sessions", true],
            ["To automatically increase internet speed", false],
            ["To replace all remote APIs", false],
            ["To physically expand device memory", false]
          ]
        },
        {
          question: "A mobile application should handle network failures when communicating with an API.",
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
    title: "Build & Deploy an Android App",
    description: "Bring the skills together by building a small Android application and preparing it for release.",
    objectives: [
      "Plan a simple Android application from its requirements.",
      "Combine Kotlin, UI, state, and data concepts in one project.",
      "Test an application and identify common problems.",
      "Understand the basic Android build process.",
      "Learn the fundamentals of preparing an app for distribution."
    ],
    resources: [
      {
        title: "Android Developers: Build and Run Your App",
        type: "documentation",
        url: "https://developer.android.com/studio/run"
      },
      {
        title: "Android Developers: Release Your App",
        type: "documentation",
        url: "https://developer.android.com/studio/publish"
      }
    ],
    quiz: {
      title: "Build & Deploy an Android App Quiz",
      questions: [
        {
          question: "What should a developer do before building a mobile application?",
          answers: [
            ["Understand the application's requirements and intended users", true],
            ["Delete all project files", false],
            ["Disable all testing", false],
            ["Remove the application's user interface", false]
          ]
        },
        {
          question: "Why is testing an Android application important?",
          answers: [
            ["It helps identify problems and verify that the application behaves as expected", true],
            ["It guarantees that an application will never need updates", false],
            ["It replaces the need for source code", false],
            ["It automatically creates a business plan", false]
          ]
        },
        {
          question: "What is the Android build process used for?",
          answers: [
            ["Turning application source code and resources into a package that can run on Android", true],
            ["Changing a phone's physical hardware", false],
            ["Creating an internet connection", false],
            ["Replacing Kotlin with HTML", false]
          ]
        },
        {
          question: "What is one purpose of preparing an app for release?",
          answers: [
            ["Making the application ready for distribution to users", true],
            ["Deleting the application's source code", false],
            ["Preventing all future updates", false],
            ["Removing all application resources", false]
          ]
        },
        {
          question: "A complete Android project can combine Kotlin code, user interface components, data handling, and testing.",
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
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    let pathResult = await client.query(
      `SELECT id FROM learning_paths
       WHERE goal = $1 AND level = $2
       LIMIT 1`,
      [path.goal, path.level]
    );

    let learningPathId;

    if (pathResult.rowCount === 0) {
      pathResult = await client.query(
        `INSERT INTO learning_paths (goal, level, title, description)
         VALUES ($1, $2, $3, $4)
         RETURNING id`,
        [path.goal, path.level, path.title, path.description]
      );
      learningPathId = pathResult.rows[0].id;
    } else {
      learningPathId = pathResult.rows[0].id;

      await client.query(
        `UPDATE learning_paths
         SET title = $1, description = $2
         WHERE id = $3`,
        [path.title, path.description, learningPathId]
      );
    }

    for (const stage of stages) {
      const stageResult = await client.query(
        `INSERT INTO stages
         (learning_path_id, order_index, title, description)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (learning_path_id, order_index)
         DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description
         RETURNING id`,
        [
          learningPathId,
          stage.orderIndex,
          stage.title,
          stage.description
        ]
      );

      const stageId = stageResult.rows[0].id;

      for (const objective of stage.objectives) {
        const existing = await client.query(
          `SELECT id FROM stage_objectives
           WHERE stage_id = $1 AND objective = $2`,
          [stageId, objective]
        );

        if (existing.rowCount === 0) {
          await client.query(
            `INSERT INTO stage_objectives (stage_id, objective)
             VALUES ($1, $2)`,
            [stageId, objective]
          );
        }
      }

      for (const resource of stage.resources) {
        const existing = await client.query(
          `SELECT id FROM resources
           WHERE stage_id = $1 AND title = $2`,
          [stageId, resource.title]
        );

        if (existing.rowCount === 0) {
          await client.query(
            `INSERT INTO resources (stage_id, title, type, url)
             VALUES ($1, $2, $3, $4)`,
            [stageId, resource.title, resource.type, resource.url]
          );
        }
      }

      const quizResult = await client.query(
        `INSERT INTO quizzes (stage_id, title, passing_percentage)
         VALUES ($1, $2, 70)
         ON CONFLICT (stage_id)
         DO UPDATE SET title = EXCLUDED.title,
                       passing_percentage = EXCLUDED.passing_percentage
         RETURNING id`,
        [stageId, stage.quiz.title]
      );

      const quizId = quizResult.rows[0].id;

      for (const question of stage.quiz.questions) {
        let questionResult = await client.query(
          `SELECT id FROM questions
           WHERE quiz_id = $1 AND question_text = $2`,
          [quizId, question.question]
        );

        let questionId;

        if (questionResult.rowCount === 0) {
          questionResult = await client.query(
            `INSERT INTO questions (quiz_id, question_text)
             VALUES ($1, $2)
             RETURNING id`,
            [quizId, question.question]
          );
          questionId = questionResult.rows[0].id;
        } else {
          questionId = questionResult.rows[0].id;
        }

        for (const [answerText, isCorrect] of question.answers) {
          const existing = await client.query(
            `SELECT id FROM answers
             WHERE question_id = $1 AND answer_text = $2`,
            [questionId, answerText]
          );

          if (existing.rowCount === 0) {
            await client.query(
              `INSERT INTO answers (question_id, answer_text, is_correct)
               VALUES ($1, $2, $3)`,
              [questionId, answerText, isCorrect]
            );
          }
        }
      }

      console.log(
        `Seeded stage ${stage.orderIndex}: ${stage.title} (ID ${stageId})`
      );
    }

    await client.query("COMMIT");
    console.log(`Mobile App Development Beginner path ready (ID ${learningPathId})`);
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Seed failed:", error);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
