require("dotenv").config();

const pool = require("./db");

async function seed() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const pathResult = await client.query(
      `INSERT INTO learning_paths (goal, level, title, description)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [
        "Web Development",
        "Beginner",
        "Web Development Beginner Route",
        "A structured route for learning the fundamentals of web development from HTML through building and deploying a real project.",
      ]
    );

    const learningPathId = pathResult.rows[0].id;

    const stages = [
      {
        title: "HTML Fundamentals",
        description: "Learn the structure and essential elements of HTML.",
        objectives: [
          "Understand HTML structure",
          "Learn common HTML elements",
          "Build a basic webpage",
        ],
        resources: [
          ["HTML Basics", "article", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content"],
          ["Semantic HTML", "article", "https://developer.mozilla.org/en-US/docs/Glossary/Semantics"],
          ["Forms and Inputs", "article", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms"],
        ],
        quiz: {
          title: "HTML Fundamentals Quiz",
          questions: [
            {
              question: "What does HTML stand for?",
              answers: [
                ["HyperText Markup Language", true],
                ["HighText Machine Language", false],
                ["Hyperlink Text Management Language", false],
                ["Home Tool Markup Language", false],
              ],
            },
            {
              question: "Which element is used for the main heading of a page?",
              answers: [
                ["<h1>", true],
                ["<head>", false],
                ["<heading>", false],
                ["<title>", false],
              ],
            },
            {
              question: "Which element creates a link?",
              answers: [
                ["<a>", true],
                ["<link>", false],
                ["<url>", false],
                ["<href>", false],
              ],
            },
            {
              question: "Which element is commonly used to create a paragraph?",
              answers: [
                ["<p>", true],
                ["<para>", false],
                ["<text>", false],
                ["<paragraph>", false],
              ],
            },
            {
              question: "Which attribute specifies the destination of a link?",
              answers: [
                ["href", true],
                ["src", false],
                ["link", false],
                ["target-url", false],
              ],
            },
          ],
        },
      },
      {
        title: "CSS Fundamentals",
        description: "Learn how to style webpages and create basic layouts.",
        objectives: [
          "Understand selectors",
          "Style HTML elements",
          "Use the box model",
          "Build basic layouts",
        ],
        resources: [
          ["CSS Basics", "article", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics"],
          ["CSS Box Model", "article", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model"],
          ["Flexbox", "article", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox"],
        ],
        quiz: {
          title: "CSS Fundamentals Quiz",
          questions: [
            {
              question: "What does CSS stand for?",
              answers: [
                ["Cascading Style Sheets", true],
                ["Computer Style System", false],
                ["Creative Style Syntax", false],
                ["Cascading System Sheets", false],
              ],
            },
            {
              question: "Which symbol targets a class selector?",
              answers: [
                [".", true],
                ["#", false],
                ["@", false],
                ["*", false],
              ],
            },
            {
              question: "Which property changes text color?",
              answers: [
                ["color", true],
                ["text-color", false],
                ["font-color", false],
                ["foreground", false],
              ],
            },
            {
              question: "Which CSS layout system is designed for one-dimensional layouts?",
              answers: [
                ["Flexbox", true],
                ["Grid", false],
                ["Float", false],
                ["Position", false],
              ],
            },
            {
              question: "What does the CSS box model include?",
              answers: [
                ["Content, padding, border, and margin", true],
                ["Only content and padding", false],
                ["Only margin and border", false],
                ["Content and margin only", false],
              ],
            },
          ],
        },
      },
      {
        title: "JavaScript Basics",
        description: "Learn JavaScript fundamentals and basic interaction with webpages.",
        objectives: [
          "Understand variables",
          "Learn functions",
          "Work with arrays and objects",
          "Perform basic DOM manipulation",
        ],
        resources: [
          ["JavaScript Basics", "article", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting"],
          ["Functions", "article", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions"],
          ["DOM Introduction", "article", "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction"],
        ],
        quiz: {
          title: "JavaScript Basics Quiz",
          questions: [
            {
              question: "Which keyword can declare a block-scoped variable?",
              answers: [
                ["let", true],
                ["varname", false],
                ["define", false],
                ["value", false],
              ],
            },
            {
              question: "Which symbol is commonly used for strict equality?",
              answers: [
                ["===", true],
                ["=", false],
                ["==", false],
                ["!==", false],
              ],
            },
            {
              question: "Which method adds an item to the end of an array?",
              answers: [
                ["push()", true],
                ["add()", false],
                ["append()", false],
                ["insert()", false],
              ],
            },
            {
              question: "What does DOM stand for?",
              answers: [
                ["Document Object Model", true],
                ["Data Object Method", false],
                ["Document Order Manager", false],
                ["Digital Object Model", false],
              ],
            },
            {
              question: "Which keyword defines a function?",
              answers: [
                ["function", true],
                ["method", false],
                ["def", false],
                ["func", false],
              ],
            },
          ],
        },
      },
      {
        title: "Frontend Frameworks",
        description: "Understand component-based development and the basics of React.",
        objectives: [
          "Understand component-based development",
          "Learn basic React",
          "Build reusable UI components",
        ],
        resources: [
          ["React Fundamentals", "article", "https://react.dev/learn"],
          ["Components", "article", "https://react.dev/learn/your-first-component"],
          ["Props and State", "article", "https://react.dev/learn/state-a-components-memory"],
        ],
        quiz: {
          title: "Frontend Frameworks Quiz",
          questions: [
            {
              question: "What is React primarily used for?",
              answers: [
                ["Building user interfaces", true],
                ["Managing databases", false],
                ["Creating operating systems", false],
                ["Running SQL queries", false],
              ],
            },
            {
              question: "What is a React component?",
              answers: [
                ["A reusable piece of UI", true],
                ["A database table", false],
                ["A CSS file", false],
                ["A server port", false],
              ],
            },
            {
              question: "What are props commonly used for?",
              answers: [
                ["Passing data to components", true],
                ["Creating database tables", false],
                ["Starting a server", false],
                ["Installing packages", false],
              ],
            },
            {
              question: "Where is state commonly used in React?",
              answers: [
                ["To manage changing component data", true],
                ["To store server passwords", false],
                ["To configure DNS", false],
                ["To create SQL tables", false],
              ],
            },
            {
              question: "Which command commonly creates a new React project with Vite?",
              answers: [
                ["npm create vite@latest", true],
                ["npm install react-project", false],
                ["react new project", false],
                ["create-react-app vite", false],
              ],
            },
          ],
        },
      },
      {
        title: "Build a Real Project",
        description: "Apply the skills learned throughout the route to build and deploy a real project.",
        objectives: [
          "Plan a project",
          "Build the project",
          "Apply HTML, CSS, and JavaScript",
          "Deploy the project",
        ],
        resources: [
          ["Project Planning", "article", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website"],
          ["Building the Project", "article", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core"],
          ["Deployment Basics", "article", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards"],
        ],
        quiz: {
          title: "Final Project Quiz",
          questions: [
            {
              question: "What should you normally do before building a project?",
              answers: [
                ["Plan what the project should accomplish", true],
                ["Delete the source code", false],
                ["Skip requirements", false],
                ["Deploy immediately", false],
              ],
            },
            {
              question: "What is one purpose of testing a project before deployment?",
              answers: [
                ["To identify and fix problems", true],
                ["To remove all features", false],
                ["To hide the project", false],
                ["To delete the database", false],
              ],
            },
            {
              question: "What does deployment generally mean?",
              answers: [
                ["Making an application available for users", true],
                ["Deleting an application", false],
                ["Writing only CSS", false],
                ["Changing a password", false],
              ],
            },
            {
              question: "Which technologies are central to this beginner route?",
              answers: [
                ["HTML, CSS, and JavaScript", true],
                ["Only SQL", false],
                ["Only Python", false],
                ["Only Java", false],
              ],
            },
            {
              question: "What is a useful final step after deploying a project?",
              answers: [
                ["Verify that the deployed project works", true],
                ["Delete the project", false],
                ["Remove all users", false],
                ["Disable the website", false],
              ],
            },
          ],
        },
      },
    ];

    for (let i = 0; i < stages.length; i++) {
      const stage = stages[i];

      const stageResult = await client.query(
        `INSERT INTO stages
         (learning_path_id, order_index, title, description)
         VALUES ($1, $2, $3, $4)
         RETURNING id`,
        [
          learningPathId,
          i + 1,
          stage.title,
          stage.description,
        ]
      );

      const stageId = stageResult.rows[0].id;

      for (const objective of stage.objectives) {
        await client.query(
          `INSERT INTO stage_objectives (stage_id, objective)
           VALUES ($1, $2)`,
          [stageId, objective]
        );
      }

      for (const resource of stage.resources) {
        await client.query(
          `INSERT INTO resources (stage_id, title, type, url)
           VALUES ($1, $2, $3, $4)`,
          [stageId, resource[0], resource[1], resource[2]]
        );
      }

      const quizResult = await client.query(
        `INSERT INTO quizzes (stage_id, title, passing_percentage)
         VALUES ($1, $2, $3)
         RETURNING id`,
        [stageId, stage.quiz.title, 70]
      );

      const quizId = quizResult.rows[0].id;

      for (const item of stage.quiz.questions) {
        const questionResult = await client.query(
          `INSERT INTO questions (quiz_id, question_text)
           VALUES ($1, $2)
           RETURNING id`,
          [quizId, item.question]
        );

        const questionId = questionResult.rows[0].id;

        for (const answer of item.answers) {
          await client.query(
            `INSERT INTO answers (question_id, answer_text, is_correct)
             VALUES ($1, $2, $3)`,
            [questionId, answer[0], answer[1]]
          );
        }
      }
    }

    await client.query("COMMIT");

    console.log("StudyRoute seed completed successfully.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Seed error:", error);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
