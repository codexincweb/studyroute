require("dotenv").config();

const pool = require("./db/db");

const path = {
  goal: "UI/UX Design",
  level: "Intermediate",
  title: "UI/UX Design Intermediate Route",
  description:
    "An intermediate route covering advanced research, information architecture, interaction design, design systems, accessibility, usability testing, and portfolio-ready product design."
};

const stages = [
  {
    orderIndex: 1,
    title: "Advanced User Research & Usability",
    description:
      "Develop stronger research skills and learn how to turn user evidence into actionable product decisions.",
    objectives: [
      "Plan research around specific product questions.",
      "Combine qualitative and quantitative research methods.",
      "Write effective interview and usability-testing tasks.",
      "Analyze findings and identify recurring patterns.",
      "Translate research findings into actionable design requirements."
    ],
    resources: [
      {
        title: "Nielsen Norman Group: User Research Methods",
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
      title: "Advanced User Research & Usability Quiz",
      questions: [
        {
          question: "What should a UX research plan clearly define?",
          answers: [
            ["Research questions, participants, methods, and the information needed", true],
            ["Only the colors of the final interface", false],
            ["Only the programming language used by developers", false],
            ["The server hardware configuration", false]
          ]
        },
        {
          question: "Why can combining qualitative and quantitative research be useful?",
          answers: [
            ["Different methods can provide complementary evidence about users and their behavior", true],
            ["It guarantees that every design decision will be correct", false],
            ["It removes the need to analyze research findings", false],
            ["It automatically creates the final UI", false]
          ]
        },
        {
          question: "What is a usability-testing task?",
          answers: [
            ["A realistic activity given to a participant to evaluate how they use a product", true],
            ["A database migration command", false],
            ["A server deployment script", false],
            ["A graphic-design color palette", false]
          ]
        },
        {
          question: "Why should research findings be connected to design decisions?",
          answers: [
            ["It helps ensure design changes are grounded in evidence and user needs", true],
            ["It makes user testing unnecessary", false],
            ["It guarantees a product will have no bugs", false],
            ["It determines the application's programming language", false]
          ]
        },
        {
          question: "UX research findings can reveal patterns in user behavior and problems.",
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
    title: "Advanced Information Architecture & Interaction Design",
    description:
      "Design complex navigation structures, task flows, and interactions for larger digital products.",
    objectives: [
      "Design scalable information architectures.",
      "Map complex multi-step user journeys.",
      "Identify interaction states and edge cases.",
      "Design navigation for content-heavy products.",
      "Reduce cognitive load through clear interaction patterns."
    ],
    resources: [
      {
        title: "Nielsen Norman Group: Information Architecture",
        type: "documentation",
        url: "https://www.nngroup.com/articles/information-architecture/"
      },
      {
        title: "Material Design: Navigation",
        type: "documentation",
        url: "https://m3.material.io/components/navigation-bar/overview"
      }
    ],
    quiz: {
      title: "Advanced Information Architecture & Interaction Design Quiz",
      questions: [
        {
          question: "What is an important goal of information architecture?",
          answers: [
            ["Helping users understand and navigate the structure of information", true],
            ["Increasing processor speed", false],
            ["Replacing visual design entirely", false],
            ["Managing application servers", false]
          ]
        },
        {
          question: "Why should complex user flows account for edge cases?",
          answers: [
            ["Users may encounter conditions outside the normal successful path", true],
            ["Edge cases only affect database administrators", false],
            ["Edge cases automatically disappear in production", false],
            ["They determine the brand's primary color", false]
          ]
        },
        {
          question: "What does cognitive load refer to in interface design?",
          answers: [
            ["The mental effort required to understand and use an interface", true],
            ["The physical weight of a mobile device", false],
            ["The size of a design file", false],
            ["The number of developers on a project", false]
          ]
        },
        {
          question: "Which approach can reduce unnecessary cognitive load?",
          answers: [
            ["Using familiar patterns, clear hierarchy, and focused choices", true],
            ["Adding unrelated interface elements", false],
            ["Hiding important navigation controls", false],
            ["Using different interaction patterns for identical actions", false]
          ]
        },
        {
          question: "Interaction design considers how users and interfaces respond to one another.",
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
    title: "Design Systems & Advanced Visual Design",
    description:
      "Learn how to create consistent interfaces using reusable components, tokens, typography, color, and layout systems.",
    objectives: [
      "Understand the purpose of a design system.",
      "Create reusable interface components.",
      "Apply consistent typography and spacing systems.",
      "Use color intentionally for hierarchy and communication.",
      "Document reusable design patterns."
    ],
    resources: [
      {
        title: "Material Design: Design System",
        type: "documentation",
        url: "https://m3.material.io/"
      },
      {
        title: "Figma: Design Systems",
        type: "documentation",
        url: "https://help.figma.com/hc/en-us/articles/14553024826775-Guide-to-design-systems"
      }
    ],
    quiz: {
      title: "Design Systems & Advanced Visual Design Quiz",
      questions: [
        {
          question: "What is a design system?",
          answers: [
            ["A collection of reusable components, patterns, guidelines, and design principles", true],
            ["A database server", false],
            ["A single finished screen", false],
            ["A programming compiler", false]
          ]
        },
        {
          question: "Why are reusable components valuable?",
          answers: [
            ["They improve consistency and can make design and development more efficient", true],
            ["They guarantee perfect usability without testing", false],
            ["They eliminate the need for content", false],
            ["They automatically write all application code", false]
          ]
        },
        {
          question: "What is visual hierarchy used for?",
          answers: [
            ["Guiding attention and communicating the relative importance of content", true],
            ["Increasing network bandwidth", false],
            ["Managing database permissions", false],
            ["Replacing information architecture", false]
          ]
        },
        {
          question: "Why should color be used intentionally in interface design?",
          answers: [
            ["Color can communicate hierarchy, meaning, states, and emphasis", true],
            ["Color determines the device's processor speed", false],
            ["Color eliminates accessibility concerns", false],
            ["Color automatically fixes navigation problems", false]
          ]
        },
        {
          question: "A design system can help maintain consistency across multiple screens and products.",
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
    title: "Accessibility & Inclusive Product Design",
    description:
      "Apply accessibility principles to interfaces and design products that work for people with diverse abilities and contexts.",
    objectives: [
      "Understand core principles of digital accessibility.",
      "Design interfaces that support keyboard and assistive technology users.",
      "Use appropriate contrast and readable typography.",
      "Design accessible forms, navigation, and interactive controls.",
      "Identify accessibility issues during design reviews."
    ],
    resources: [
      {
        title: "W3C Web Accessibility Initiative: Introduction",
        type: "documentation",
        url: "https://www.w3.org/WAI/fundamentals/accessibility-intro/"
      },
      {
        title: "W3C WCAG 2.2",
        type: "documentation",
        url: "https://www.w3.org/TR/WCAG22/"
      }
    ],
    quiz: {
      title: "Accessibility & Inclusive Product Design Quiz",
      questions: [
        {
          question: "What is the primary goal of digital accessibility?",
          answers: [
            ["Ensuring digital products can be used by people with diverse abilities", true],
            ["Making every interface use the same color", false],
            ["Limiting products to desktop computers", false],
            ["Removing all visual content", false]
          ]
        },
        {
          question: "Why is keyboard accessibility important?",
          answers: [
            ["Some users navigate interfaces without relying on a mouse or touch input", true],
            ["It increases database storage", false],
            ["It determines the application's programming language", false],
            ["It removes the need for navigation", false]
          ]
        },
        {
          question: "Why is sufficient color contrast important?",
          answers: [
            ["It helps users distinguish text and interface elements from their backgrounds", true],
            ["It guarantees faster internet connections", false],
            ["It replaces semantic HTML", false],
            ["It prevents every possible usability problem", false]
          ]
        },
        {
          question: "Which approach supports accessible forms?",
          answers: [
            ["Providing clear labels and useful error information", true],
            ["Using placeholder text as the only permanent label", false],
            ["Removing error messages", false],
            ["Making every form field visually identical without context", false]
          ]
        },
        {
          question: "Accessibility should be considered throughout product design and development.",
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
    title: "Product Design, Prototyping & Portfolio Project",
    description:
      "Bring research, structure, visual design, prototyping, and testing together in a complete product-design workflow.",
    objectives: [
      "Plan an end-to-end product design workflow.",
      "Create high-fidelity screens and interactive prototypes.",
      "Connect research findings to design decisions.",
      "Run usability tests and iterate on the design.",
      "Present a complete case study showing the design process and outcomes."
    ],
    resources: [
      {
        title: "Figma: Prototyping",
        type: "documentation",
        url: "https://help.figma.com/hc/en-us/categories/360002051613-Design"
      },
      {
        title: "Nielsen Norman Group: UX Case Studies",
        type: "documentation",
        url: "https://www.nngroup.com/articles/ux-case-study/"
      }
    ],
    quiz: {
      title: "Product Design & Portfolio Project Quiz",
      questions: [
        {
          question: "What should a strong UX case study communicate?",
          answers: [
            ["The problem, research, design decisions, iterations, and outcome", true],
            ["Only the final screenshots", false],
            ["Only the designer's preferred colors", false],
            ["Only the project's source code", false]
          ]
        },
        {
          question: "Why should prototypes be tested before final implementation?",
          answers: [
            ["Testing can reveal usability problems while changes are still relatively easy to make", true],
            ["Testing guarantees that implementation will contain no bugs", false],
            ["Testing eliminates the need for research", false],
            ["Testing automatically generates production code", false]
          ]
        },
        {
          question: "What does iteration mean in product design?",
          answers: [
            ["Improving a design through repeated cycles of evaluation and refinement", true],
            ["Deleting every previous design immediately", false],
            ["Publishing a product without testing", false],
            ["Changing the programming language after every screen", false]
          ]
        },
        {
          question: "Why should design decisions be explained in a portfolio case study?",
          answers: [
            ["They show how evidence, constraints, and reasoning influenced the final design", true],
            ["They prove that the designer never made mistakes", false],
            ["They replace the need for a working prototype", false],
            ["They determine the client's budget automatically", false]
          ]
        },
        {
          question: "A product-design portfolio can demonstrate both the final result and the reasoning behind the design process.",
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

    console.log(`UI/UX Design Intermediate path ready (ID ${pathId})`);
  } catch (error) {
    console.error("Seed failed:", error);
  } finally {
    await pool.end();
  }
}

seed();
