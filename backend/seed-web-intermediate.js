require("dotenv").config();

const pool = require("./db/db");

const path = {
  goal: "Web Development",
  level: "Intermediate",
  title: "Web Development Intermediate Route",
  description:
    "A practical intermediate route covering modern JavaScript, responsive CSS, Git, APIs, React, accessibility, performance, security, and deployment.",
};

const stages = [
  {
    orderIndex: 1,
    title: "Modern JavaScript & DOM",
    description: "Build stronger JavaScript skills and use the DOM to create interactive web experiences.",
    objectives: [
      "Use modern JavaScript syntax including let, const, destructuring, spread, and template literals.",
      "Manipulate HTML elements through the DOM.",
      "Handle browser events and user interactions.",
      "Use common array methods and functions effectively."
    ],
    resources: [
      {
        title: "MDN JavaScript Guide",
        type: "documentation",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
      },
      {
        title: "MDN DOM Introduction",
        type: "documentation",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction"
      }
    ],
    quiz: {
      title: "Modern JavaScript & DOM Quiz",
      questions: [
        {
          question: "Which method is commonly used to select the first element matching a CSS selector?",
          answers: [
            ["document.querySelector()", true],
            ["document.createElement()", false],
            ["document.appendChild()", false],
            ["document.writeSelector()", false]
          ]
        },
        {
          question: "What does destructuring allow you to do in JavaScript?",
          answers: [
            ["Extract values from arrays or properties from objects into variables", true],
            ["Convert CSS into JavaScript", false],
            ["Create database tables automatically", false],
            ["Deploy a website to a server", false]
          ]
        },
        {
          question: "Which event is commonly used when a user presses a button?",
          answers: [
            ["click", true],
            ["hover", false],
            ["submitPage", false],
            ["pressButton", false]
          ]
        },
        {
          question: "What does the map() array method return?",
          answers: [
            ["A new array containing the transformed results", true],
            ["The original array's first element", false],
            ["A boolean indicating whether all items match", false],
            ["The number of items removed", false]
          ]
        },
        {
          question: "The DOM represents the structure of a web page as objects that JavaScript can interact with.",
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
    title: "Advanced CSS & Responsive Design",
    description: "Create flexible, responsive interfaces using modern CSS layout and styling techniques.",
    objectives: [
      "Build layouts using Flexbox and CSS Grid.",
      "Use media queries to adapt interfaces to different screen sizes.",
      "Use CSS custom properties for reusable styling values.",
      "Create responsive interfaces for phones, tablets, and desktops."
    ],
    resources: [
      {
        title: "MDN CSS Layout",
        type: "documentation",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout"
      },
      {
        title: "MDN Media Queries",
        type: "documentation",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries"
      }
    ],
    quiz: {
      title: "Advanced CSS & Responsive Design Quiz",
      questions: [
        {
          question: "Which CSS layout system is designed primarily for arranging items along one dimension?",
          answers: [
            ["Flexbox", true],
            ["CSS Grid", false],
            ["Float", false],
            ["Positioning", false]
          ]
        },
        {
          question: "What are media queries commonly used for?",
          answers: [
            ["Applying styles based on conditions such as screen width", true],
            ["Creating JavaScript variables", false],
            ["Connecting to a database", false],
            ["Compressing images automatically", false]
          ]
        },
        {
          question: "Which CSS feature allows a layout to define rows and columns?",
          answers: [
            ["CSS Grid", true],
            ["Flexbox", false],
            ["z-index", false],
            ["box-shadow", false]
          ]
        },
        {
          question: "What is a CSS custom property useful for?",
          answers: [
            ["Storing reusable CSS values", true],
            ["Running JavaScript functions", false],
            ["Creating HTML elements", false],
            ["Uploading files to a server", false]
          ]
        },
        {
          question: "Responsive web design aims to make interfaces adapt to different screen sizes and devices.",
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
    title: "Git & GitHub",
    description: "Use Git and GitHub confidently to manage source code and collaborate on projects.",
    objectives: [
      "Create commits and manage project history with Git.",
      "Work with branches and merge changes.",
      "Use GitHub repositories for remote source-code management.",
      "Handle common collaboration workflows."
    ],
    resources: [
      {
        title: "Git Documentation",
        type: "documentation",
        url: "https://git-scm.com/doc"
      },
      {
        title: "GitHub Docs",
        type: "documentation",
        url: "https://docs.github.com/en"
      }
    ],
    quiz: {
      title: "Git & GitHub Quiz",
      questions: [
        {
          question: "Which command creates a new Git repository in the current directory?",
          answers: [
            ["git init", true],
            ["git start", false],
            ["git create", false],
            ["git repository", false]
          ]
        },
        {
          question: "What does git commit do?",
          answers: [
            ["Records staged changes in the repository history", true],
            ["Uploads files directly to a website", false],
            ["Deletes the entire repository", false],
            ["Creates a database", false]
          ]
        },
        {
          question: "What is a Git branch commonly used for?",
          answers: [
            ["Developing changes separately from another line of development", true],
            ["Increasing internet speed", false],
            ["Storing database passwords", false],
            ["Compressing images", false]
          ]
        },
        {
          question: "What is GitHub primarily used for?",
          answers: [
            ["Hosting and collaborating on Git repositories", true],
            ["Replacing JavaScript in browsers", false],
            ["Creating CSS automatically", false],
            ["Running SQL queries only", false]
          ]
        },
        {
          question: "A Git commit records a snapshot of changes in the repository history.",
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
    title: "APIs & Asynchronous Web",
    description: "Work with APIs and asynchronous JavaScript to build applications that communicate with external services.",
    objectives: [
      "Understand how HTTP APIs exchange data.",
      "Send requests using fetch().",
      "Work with promises and async/await.",
      "Handle loading states and request errors."
    ],
    resources: [
      {
        title: "MDN Fetch API",
        type: "documentation",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"
      },
      {
        title: "MDN async function",
        type: "documentation",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function"
      }
    ],
    quiz: {
      title: "APIs & Asynchronous Web Quiz",
      questions: [
        {
          question: "Which browser API is commonly used to make HTTP requests from JavaScript?",
          answers: [
            ["Fetch API", true],
            ["Canvas API", false],
            ["Storage API", false],
            ["History API", false]
          ]
        },
        {
          question: "What does async/await make easier to work with?",
          answers: [
            ["Asynchronous operations and promises", true],
            ["CSS selectors", false],
            ["HTML attributes only", false],
            ["Git branches", false]
          ]
        },
        {
          question: "What does a successful HTTP 200 response generally indicate?",
          answers: [
            ["The request was successfully processed", true],
            ["The server was permanently deleted", false],
            ["Authentication always failed", false],
            ["The request must be retried", false]
          ]
        },
        {
          question: "Why should API requests handle errors?",
          answers: [
            ["Network and server failures can occur", true],
            ["Errors can never happen in production", false],
            ["It automatically improves CSS", false],
            ["It removes the need for APIs", false]
          ]
        },
        {
          question: "A Promise can represent the eventual result of an asynchronous operation.",
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
    title: "React & Component Architecture",
    description: "Build reusable interfaces with React components, state, props, and modern component patterns.",
    objectives: [
      "Understand React component architecture.",
      "Pass data using props.",
      "Manage component state.",
      "Build reusable UI components."
    ],
    resources: [
      {
        title: "React Documentation",
        type: "documentation",
        url: "https://react.dev/learn"
      },
      {
        title: "Thinking in React",
        type: "documentation",
        url: "https://react.dev/learn/thinking-in-react"
      }
    ],
    quiz: {
      title: "React & Component Architecture Quiz",
      questions: [
        {
          question: "What is a React component?",
          answers: [
            ["A reusable piece of UI and its associated behavior", true],
            ["A database table", false],
            ["A Git repository", false],
            ["A CSS media query", false]
          ]
        },
        {
          question: "What are props commonly used for in React?",
          answers: [
            ["Passing data from one component to another", true],
            ["Connecting directly to PostgreSQL", false],
            ["Creating Git commits", false],
            ["Changing the operating system", false]
          ]
        },
        {
          question: "What is state used for in a React component?",
          answers: [
            ["Managing data that can change and affect rendering", true],
            ["Hosting a Git repository", false],
            ["Defining CSS media queries", false],
            ["Creating DNS records", false]
          ]
        },
        {
          question: "Why are reusable components useful?",
          answers: [
            ["They reduce duplication and make interfaces easier to maintain", true],
            ["They prevent all network requests", false],
            ["They replace databases", false],
            ["They automatically deploy applications", false]
          ]
        },
        {
          question: "React applications can be composed from multiple reusable components.",
          answers: [
            ["True", true],
            ["False", false]
          ]
        }
      ]
    }
  },
  {
    orderIndex: 6,
    title: "Web Accessibility & Performance",
    description: "Improve usability, accessibility, and performance so web applications work well for more users.",
    objectives: [
      "Use semantic HTML and accessible interface patterns.",
      "Understand keyboard navigation and accessible controls.",
      "Identify common web performance bottlenecks.",
      "Optimize assets and loading behavior."
    ],
    resources: [
      {
        title: "MDN Accessibility",
        type: "documentation",
        url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility"
      },
      {
        title: "web.dev Performance",
        type: "documentation",
        url: "https://web.dev/learn/performance"
      }
    ],
    quiz: {
      title: "Web Accessibility & Performance Quiz",
      questions: [
        {
          question: "Why is semantic HTML useful for accessibility?",
          answers: [
            ["It gives content meaningful structure that assistive technologies can understand", true],
            ["It automatically encrypts user data", false],
            ["It replaces JavaScript", false],
            ["It increases database storage", false]
          ]
        },
        {
          question: "Why should interactive controls be usable with a keyboard?",
          answers: [
            ["Some users navigate interfaces without a mouse or touchscreen", true],
            ["Keyboard access removes the need for HTML", false],
            ["It prevents all server errors", false],
            ["It automatically compresses images", false]
          ]
        },
        {
          question: "Which can improve web page performance?",
          answers: [
            ["Optimizing large images and unnecessary assets", true],
            ["Adding more unused JavaScript", false],
            ["Loading every resource twice", false],
            ["Increasing image file sizes", false]
          ]
        },
        {
          question: "What is lazy loading intended to do?",
          answers: [
            ["Delay loading some resources until they are needed", true],
            ["Delete unused database records", false],
            ["Disable accessibility features", false],
            ["Remove all JavaScript", false]
          ]
        },
        {
          question: "Accessibility and performance are both important considerations when building production web applications.",
          answers: [
            ["True", true],
            ["False", false]
          ]
        }
      ]
    }
  },
  {
    orderIndex: 7,
    title: "Web Security & Deployment",
    description: "Apply practical web security principles and deploy applications reliably to production.",
    objectives: [
      "Understand common web security risks.",
      "Apply safer authentication and authorization practices.",
      "Protect applications from common input and configuration issues.",
      "Deploy web applications and manage production configuration."
    ],
    resources: [
      {
        title: "OWASP Top 10",
        type: "documentation",
        url: "https://owasp.org/www-project-top-ten/"
      },
      {
        title: "Vercel Documentation",
        type: "documentation",
        url: "https://vercel.com/docs"
      }
    ],
    quiz: {
      title: "Web Security & Deployment Quiz",
      questions: [
        {
          question: "What is the purpose of input validation?",
          answers: [
            ["To ensure submitted data meets expected rules before processing", true],
            ["To make every website load without a server", false],
            ["To replace database backups", false],
            ["To automatically create user accounts", false]
          ]
        },
        {
          question: "What does authentication verify?",
          answers: [
            ["The identity of a user or system", true],
            ["The size of an image", false],
            ["The speed of a network cable", false],
            ["The number of HTML elements", false]
          ]
        },
        {
          question: "Why should sensitive configuration values be kept out of source code?",
          answers: [
            ["It reduces the risk of exposing secrets such as API keys", true],
            ["It makes CSS load faster", false],
            ["It removes the need for authentication", false],
            ["It guarantees zero server errors", false]
          ]
        },
        {
          question: "What is deployment?",
          answers: [
            ["Making an application available in a target environment for users", true],
            ["Deleting the application's source code", false],
            ["Changing every HTML tag into JavaScript", false],
            ["Removing all application dependencies", false]
          ]
        },
        {
          question: "HTTPS helps protect data exchanged between a browser and a web server.",
          answers: [
            ["True", true],
            ["False", false]
          ]
        }
      ]
    }
  },
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

    console.log(`Web Development Intermediate path ready (ID ${learningPathId})`);
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
