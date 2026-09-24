require("dotenv").config();

const pool = require("./db/db");

const path = {
  goal: "UI/UX Design",
  level: "Beginner",
  title: "UI/UX Design Beginner Route",
  description:
    "A practical beginner route covering user experience fundamentals, user research, information architecture, interface design, prototyping, usability, and accessibility."
};

const stages = [
  {
    orderIndex: 1,
    title: "UI/UX Design Fundamentals",
    description:
      "Understand the foundations of user interface and user experience design and how they work together.",
    objectives: [
      "Understand the difference between UI and UX design.",
      "Understand the role of users in product design.",
      "Identify common principles of usable interfaces.",
      "Understand the basic stages of a design process.",
      "Recognize how design decisions affect user experience."
    ],
    resources: [
      {
        title: "Nielsen Norman Group: UX Basics",
        type: "documentation",
        url: "https://www.nngroup.com/articles/definition-user-experience/"
      },
      {
        title: "Interaction Design Foundation: User Experience",
        type: "documentation",
        url: "https://www.interaction-design.org/literature/topics/user-experience"
      }
    ],
    quiz: {
      title: "UI/UX Design Fundamentals Quiz",
      questions: [
        {
          question: "What does UX design primarily focus on?",
          answers: [
            ["The overall experience users have when interacting with a product", true],
            ["Only the colors used in an interface", false],
            ["Writing database queries", false],
            ["Managing computer hardware", false]
          ]
        },
        {
          question: "What does UI design primarily concern?",
          answers: [
            ["The visual and interactive interface through which users interact with a product", true],
            ["Only server-side databases", false],
            ["Computer networking hardware", false],
            ["Operating system installation", false]
          ]
        },
        {
          question: "Why are users important in UX design?",
          answers: [
            ["Design decisions should address real user needs and problems", true],
            ["Users determine the programming language automatically", false],
            ["Users replace the need for testing", false],
            ["Users are responsible for database administration", false]
          ]
        },
        {
          question: "What is usability?",
          answers: [
            ["How effectively, efficiently, and satisfactorily users can accomplish goals with a product", true],
            ["The number of colors in an interface", false],
            ["The size of a software repository", false],
            ["The speed of a computer processor", false]
          ]
        },
        {
          question: "Good UX design considers the needs and context of the people using a product.",
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
    title: "User Research & Personas",
    description:
      "Learn how to gather information about users and turn research findings into useful design insights.",
    objectives: [
      "Understand the purpose of user research.",
      "Identify common qualitative and quantitative research methods.",
      "Conduct basic user interviews and surveys.",
      "Identify user needs, goals, and pain points.",
      "Create simple evidence-based user personas."
    ],
    resources: [
      {
        title: "Nielsen Norman Group: User Research",
        type: "documentation",
        url: "https://www.nngroup.com/articles/which-ux-research-methods/"
      },
      {
        title: "Interaction Design Foundation: User Research",
        type: "documentation",
        url: "https://www.interaction-design.org/literature/topics/user-research"
      }
    ],
    quiz: {
      title: "User Research & Personas Quiz",
      questions: [
        {
          question: "What is the purpose of user research?",
          answers: [
            ["To understand users, their needs, behaviors, and problems", true],
            ["To select a programming language without evidence", false],
            ["To eliminate the need for usability testing", false],
            ["To create database indexes", false]
          ]
        },
        {
          question: "Which is an example of a qualitative research method?",
          answers: [
            ["A user interview", true],
            ["A server benchmark", false],
            ["A database backup", false],
            ["A CPU stress test", false]
          ]
        },
        {
          question: "What is a persona?",
          answers: [
            ["A research-informed representation of a group of target users", true],
            ["A programming framework", false],
            ["A database schema", false],
            ["A website hosting plan", false]
          ]
        },
        {
          question: "Why should personas be based on research?",
          answers: [
            ["Evidence helps prevent designers from relying only on assumptions about users", true],
            ["Research makes every design decision automatically correct", false],
            ["Personas replace all user testing", false],
            ["Research determines the application's source code", false]
          ]
        },
        {
          question: "User interviews can provide insights into users' goals and difficulties.",
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
    title: "Information Architecture & User Flows",
    description:
      "Learn how to organize content and design clear paths through digital products.",
    objectives: [
      "Understand the purpose of information architecture.",
      "Organize content into logical categories.",
      "Create basic navigation structures.",
      "Map common user flows.",
      "Identify unnecessary steps and friction in user journeys."
    ],
    resources: [
      {
        title: "Nielsen Norman Group: Information Architecture",
        type: "documentation",
        url: "https://www.nngroup.com/articles/information-architecture/"
      },
      {
        title: "Interaction Design Foundation: User Flows",
        type: "documentation",
        url: "https://www.interaction-design.org/literature/topics/user-flow"
      }
    ],
    quiz: {
      title: "Information Architecture & User Flows Quiz",
      questions: [
        {
          question: "What is information architecture concerned with?",
          answers: [
            ["Organizing and structuring information so users can find and understand it", true],
            ["Choosing a computer processor", false],
            ["Writing database encryption algorithms", false],
            ["Managing physical office space", false]
          ]
        },
        {
          question: "What is a user flow?",
          answers: [
            ["The sequence of steps a user follows to accomplish a goal in a product", true],
            ["A network connection between servers", false],
            ["A database backup process", false],
            ["A programming language specification", false]
          ]
        },
        {
          question: "Why is clear navigation important?",
          answers: [
            ["It helps users understand where they are and how to reach desired content", true],
            ["It automatically improves processor performance", false],
            ["It eliminates all design research", false],
            ["It guarantees that users will never make mistakes", false]
          ]
        },
        {
          question: "What can mapping a user flow help a designer identify?",
          answers: [
            ["Unnecessary steps and potential points of friction", true],
            ["The exact future number of users", false],
            ["The physical location of every user", false],
            ["The programming language used by a server", false]
          ]
        },
        {
          question: "A well-organized information structure can make content easier for users to find.",
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
    title: "Wireframing & Interface Design",
    description:
      "Learn how to translate ideas into structured interface layouts and basic visual designs.",
    objectives: [
      "Understand the purpose of wireframes.",
      "Create simple low-fidelity interface layouts.",
      "Use hierarchy to organize interface content.",
      "Apply basic typography, spacing, and alignment principles.",
      "Create consistent interface components."
    ],
    resources: [
      {
        title: "Figma: Design Resources",
        type: "documentation",
        url: "https://help.figma.com/hc/en-us/categories/360002051613-Design"
      },
      {
        title: "Nielsen Norman Group: Visual Design",
        type: "documentation",
        url: "https://www.nngroup.com/articles/visual-design/"
      }
    ],
    quiz: {
      title: "Wireframing & Interface Design Quiz",
      questions: [
        {
          question: "What is a wireframe?",
          answers: [
            ["A simplified representation of an interface's structure and layout", true],
            ["A database containing user passwords", false],
            ["A finished production application", false],
            ["A network security protocol", false]
          ]
        },
        {
          question: "Why is visual hierarchy important?",
          answers: [
            ["It helps users understand the relative importance of interface elements", true],
            ["It automatically increases internet speed", false],
            ["It replaces usability testing", false],
            ["It determines the server's hardware configuration", false]
          ]
        },
        {
          question: "Why is consistent spacing useful in interface design?",
          answers: [
            ["It creates structure and makes interfaces easier to scan", true],
            ["It guarantees that every user completes a task", false],
            ["It replaces content organization", false],
            ["It prevents software bugs", false]
          ]
        },
        {
          question: "What does typography affect in an interface?",
          answers: [
            ["Readability, hierarchy, and the visual character of the interface", true],
            ["Database storage capacity", false],
            ["Internet bandwidth", false],
            ["Computer processor speed", false]
          ]
        },
        {
          question: "Wireframes can help designers explore layout ideas before building a final interface.",
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
    title: "Prototyping, Usability & Accessibility",
    description:
      "Learn how to create interactive prototypes, test designs with users, and apply basic accessibility principles.",
    objectives: [
      "Understand the purpose of interactive prototypes.",
      "Create basic clickable prototype flows.",
      "Conduct simple usability tests.",
      "Identify common usability problems.",
      "Apply fundamental accessibility principles to interface designs."
    ],
    resources: [
      {
        title: "Figma: Prototyping",
        type: "documentation",
        url: "https://help.figma.com/hc/en-us/categories/360002051613-Design"
      },
      {
        title: "W3C Web Accessibility Initiative",
        type: "documentation",
        url: "https://www.w3.org/WAI/fundamentals/accessibility-intro/"
      }
    ],
    quiz: {
      title: "Prototyping, Usability & Accessibility Quiz",
      questions: [
        {
          question: "What is a prototype?",
          answers: [
            ["A representation of a product or interaction that can be used to explore and test ideas", true],
            ["A database backup", false],
            ["A finished operating system", false],
            ["A computer network cable", false]
          ]
        },
        {
          question: "What is usability testing used for?",
          answers: [
            ["Observing users interacting with a design to identify usability problems", true],
            ["Testing the physical strength of a computer", false],
            ["Measuring internet bandwidth only", false],
            ["Replacing all forms of user research", false]
          ]
        },
        {
          question: "What does accessibility in digital design aim to support?",
          answers: [
            ["People with different abilities being able to use digital products", true],
            ["Only professional designers", false],
            ["Only users with high-speed internet", false],
            ["Only users with the newest devices", false]
          ]
        },
        {
          question: "Why should usability problems be identified before development is complete?",
          answers: [
            ["Finding problems early can make design changes easier and less costly", true],
            ["Testing guarantees that no future bugs can occur", false],
            ["Testing removes the need for user research", false],
            ["Testing automatically writes application code", false]
          ]
        },
        {
          question: "Accessibility should be considered during the design process rather than treated as an afterthought.",
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
      `SELECT id FROM learning_paths
       WHERE goal = $1 AND level = $2
       LIMIT 1`,
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

    console.log(`UI/UX Design Beginner path ready (ID ${pathId})`);
  } catch (error) {
    console.error("Seed failed:", error);
  } finally {
    await pool.end();
  }
}

seed();
