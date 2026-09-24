require("dotenv").config();

const pool = require("./db/db");

const path = {
  goal: "Data Science",
  level: "Beginner",
  title: "Data Science Beginner Route",
  description:
    "A practical beginner route covering data science foundations, Python, data cleaning, exploratory data analysis, visualization, and introductory statistical thinking."
};

const stages = [
  {
    orderIndex: 1,
    title: "Data Science Fundamentals",
    description:
      "Understand what data science is, how data is used, and the basic workflow involved in solving problems with data.",
    objectives: [
      "Understand the purpose and scope of data science.",
      "Identify common types and sources of data.",
      "Understand the basic data science workflow.",
      "Distinguish structured and unstructured data.",
      "Understand how data can support real-world decision making."
    ],
    resources: [
      {
        title: "IBM: What is Data Science?",
        type: "documentation",
        url: "https://www.ibm.com/think/topics/data-science"
      },
      {
        title: "Microsoft: What is Data Science?",
        type: "documentation",
        url: "https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-data-science"
      }
    ],
    quiz: {
      title: "Data Science Fundamentals Quiz",
      questions: [
        {
          question: "What is data science primarily concerned with?",
          answers: [
            ["Using data to discover insights and support decisions", true],
            ["Designing computer hardware", false],
            ["Installing operating systems", false],
            ["Creating internet cables", false]
          ]
        },
        {
          question: "Which is an example of structured data?",
          answers: [
            ["A table containing customer names, ages, and locations", true],
            ["An unlabelled video recording", false],
            ["A collection of raw audio recordings", false],
            ["A photograph without metadata", false]
          ]
        },
        {
          question: "Why is data cleaning performed?",
          answers: [
            ["To identify and correct problems such as missing or inconsistent data", true],
            ["To increase the physical size of a hard drive", false],
            ["To replace all data with random values", false],
            ["To prevent data from being analyzed", false]
          ]
        },
        {
          question: "Which activity is commonly part of a data science workflow?",
          answers: [
            ["Collecting, preparing, analyzing, and communicating data", true],
            ["Replacing the computer processor", false],
            ["Repairing network cables", false],
            ["Installing a new monitor", false]
          ]
        },
        {
          question: "Data science can be used to support decision making in real-world organizations.",
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
    title: "Python for Data Science",
    description:
      "Learn the Python programming foundations needed to work with data and perform basic analysis.",
    objectives: [
      "Understand Python variables and basic data types.",
      "Use lists, dictionaries, and other basic data structures.",
      "Write conditional statements and loops.",
      "Create and use simple Python functions.",
      "Read and manipulate basic datasets with Python."
    ],
    resources: [
      {
        title: "Python Documentation: Tutorial",
        type: "documentation",
        url: "https://docs.python.org/3/tutorial/"
      },
      {
        title: "Python Documentation: Built-in Types",
        type: "documentation",
        url: "https://docs.python.org/3/library/stdtypes.html"
      }
    ],
    quiz: {
      title: "Python for Data Science Quiz",
      questions: [
        {
          question: "Which language is widely used for data science?",
          answers: [
            ["Python", true],
            ["HTML", false],
            ["CSS", false],
            ["SQL-only", false]
          ]
        },
        {
          question: "Which Python structure stores multiple values in an ordered collection?",
          answers: [
            ["A list", true],
            ["A comment", false],
            ["A Boolean operator", false],
            ["A module name", false]
          ]
        },
        {
          question: "What is a Python function used for?",
          answers: [
            ["Grouping reusable instructions that can be called when needed", true],
            ["Increasing monitor resolution", false],
            ["Creating physical storage space", false],
            ["Connecting a computer to electricity", false]
          ]
        },
        {
          question: "What does a loop allow a Python program to do?",
          answers: [
            ["Repeat instructions according to specified conditions", true],
            ["Delete the Python interpreter", false],
            ["Replace the operating system", false],
            ["Automatically create a database server", false]
          ]
        },
        {
          question: "Python can be used to read, manipulate, and analyze data.",
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
    title: "Data Cleaning & Preparation",
    description:
      "Learn how to inspect, clean, transform, and prepare datasets before analysis.",
    objectives: [
      "Identify missing and inconsistent values.",
      "Understand duplicate records and data quality issues.",
      "Transform data into useful formats for analysis.",
      "Handle common data-cleaning problems.",
      "Prepare a dataset for exploratory analysis."
    ],
    resources: [
      {
        title: "Pandas Documentation: Getting Started",
        type: "documentation",
        url: "https://pandas.pydata.org/docs/getting_started/"
      },
      {
        title: "Pandas Documentation: Missing Data",
        type: "documentation",
        url: "https://pandas.pydata.org/docs/user_guide/missing_data.html"
      }
    ],
    quiz: {
      title: "Data Cleaning & Preparation Quiz",
      questions: [
        {
          question: "What is missing data?",
          answers: [
            ["A data value that is unavailable or not recorded", true],
            ["A value that is always zero", false],
            ["A duplicate column name only", false],
            ["A dataset stored on a computer", false]
          ]
        },
        {
          question: "Why should duplicate records sometimes be identified?",
          answers: [
            ["They can distort analysis if the same observation is counted more than intended", true],
            ["They automatically improve every dataset", false],
            ["They increase internet speed", false],
            ["They make all values statistically correct", false]
          ]
        },
        {
          question: "What is data transformation?",
          answers: [
            ["Changing data into a form suitable for analysis", true],
            ["Deleting the entire dataset", false],
            ["Changing a computer's physical hardware", false],
            ["Disconnecting a database from the network", false]
          ]
        },
        {
          question: "Which task is part of data preparation?",
          answers: [
            ["Checking data types and handling missing values", true],
            ["Replacing the computer's battery", false],
            ["Changing the monitor cable", false],
            ["Installing a printer driver", false]
          ]
        },
        {
          question: "Cleaning data before analysis can help reduce errors caused by poor-quality data.",
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
    title: "Exploratory Data Analysis",
    description:
      "Learn how to explore datasets using summaries, distributions, relationships, and basic statistical measures.",
    objectives: [
      "Understand the purpose of exploratory data analysis.",
      "Calculate and interpret basic descriptive statistics.",
      "Examine distributions and relationships between variables.",
      "Identify unusual values and possible outliers.",
      "Use exploratory findings to guide further analysis."
    ],
    resources: [
      {
        title: "Pandas Documentation: Descriptive Statistics",
        type: "documentation",
        url: "https://pandas.pydata.org/docs/user_guide/basics.html"
      },
      {
        title: "NIST: Exploratory Data Analysis",
        type: "documentation",
        url: "https://www.itl.nist.gov/div898/handbook/eda/eda.htm"
      }
    ],
    quiz: {
      title: "Exploratory Data Analysis Quiz",
      questions: [
        {
          question: "What is the main purpose of exploratory data analysis?",
          answers: [
            ["To understand patterns, distributions, relationships, and unusual observations in data", true],
            ["To permanently delete raw data", false],
            ["To replace statistical analysis entirely", false],
            ["To install programming software", false]
          ]
        },
        {
          question: "What does the mean represent?",
          answers: [
            ["The arithmetic average of a set of values", true],
            ["The largest value in every dataset", false],
            ["The number of columns in a table", false],
            ["The percentage of missing values only", false]
          ]
        },
        {
          question: "What is an outlier?",
          answers: [
            ["An observation that is unusually distant from the general pattern of the data", true],
            ["Any value that appears twice", false],
            ["A variable with no name", false],
            ["A dataset containing only numbers", false]
          ]
        },
        {
          question: "Why are distributions examined during exploratory analysis?",
          answers: [
            ["They help reveal how values are spread and where unusual patterns may occur", true],
            ["They automatically prove causation", false],
            ["They remove the need for data collection", false],
            ["They change the computer's operating system", false]
          ]
        },
        {
          question: "Exploratory data analysis can help identify patterns that deserve further investigation.",
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
    title: "Data Visualization & Statistical Thinking",
    description:
      "Learn to communicate data clearly with visualizations and develop basic statistical reasoning for interpreting results.",
    objectives: [
      "Choose appropriate charts for different types of data.",
      "Create clear and informative data visualizations.",
      "Understand basic statistical concepts.",
      "Distinguish association from causation.",
      "Communicate analytical findings accurately."
    ],
    resources: [
      {
        title: "Matplotlib Documentation",
        type: "documentation",
        url: "https://matplotlib.org/stable/users/explain/quick_start.html"
      },
      {
        title: "NIST: Exploratory Data Analysis",
        type: "documentation",
        url: "https://www.itl.nist.gov/div898/handbook/eda/eda.htm"
      }
    ],
    quiz: {
      title: "Data Visualization & Statistical Thinking Quiz",
      questions: [
        {
          question: "What is the purpose of data visualization?",
          answers: [
            ["To communicate patterns and information in data visually", true],
            ["To permanently remove numerical data", false],
            ["To replace every form of statistical analysis", false],
            ["To increase computer processing speed", false]
          ]
        },
        {
          question: "Which chart is commonly useful for showing the distribution of numerical values?",
          answers: [
            ["A histogram", true],
            ["A network cable diagram", false],
            ["A login form", false],
            ["A source-code editor", false]
          ]
        },
        {
          question: "What does correlation describe?",
          answers: [
            ["The degree to which variables are associated or related", true],
            ["Proof that one variable causes another", false],
            ["The number of rows in a dataset", false],
            ["The amount of computer memory available", false]
          ]
        },
        {
          question: "Why should a visualization have clear labels?",
          answers: [
            ["They help viewers understand what the variables and values represent", true],
            ["They automatically make the analysis causal", false],
            ["They remove all possible bias from the data", false],
            ["They increase the dataset size", false]
          ]
        },
        {
          question: "A correlation between two variables does not by itself establish that one variable causes the other.",
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

    console.log(`Data Science Beginner path ready (ID ${pathId})`);
  } catch (error) {
    console.error("Seed failed:", error);
  } finally {
    await pool.end();
  }
}

seed();
