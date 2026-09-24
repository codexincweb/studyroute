require("dotenv").config();

const pool = require("./db/db");

const path = {
  goal: "Data Science",
  level: "Intermediate",
  title: "Data Science Intermediate Route",
  description:
    "A practical intermediate route covering advanced Python data analysis, statistics, data visualization, machine learning fundamentals, model evaluation, and applied data science workflows."
};

const stages = [
  {
    orderIndex: 1,
    title: "Advanced Python Data Analysis",
    description:
      "Develop stronger Python skills for efficient data manipulation, analysis, and reproducible workflows.",
    objectives: [
      "Use NumPy arrays for numerical data processing.",
      "Perform advanced data manipulation with pandas.",
      "Combine and transform multiple datasets.",
      "Write reusable analysis functions.",
      "Build organized and reproducible data analysis workflows."
    ],
    resources: [
      {
        title: "NumPy Documentation",
        type: "documentation",
        url: "https://numpy.org/doc/stable/user/quickstart.html"
      },
      {
        title: "Pandas User Guide",
        type: "documentation",
        url: "https://pandas.pydata.org/docs/user_guide/"
      }
    ],
    quiz: {
      title: "Advanced Python Data Analysis Quiz",
      questions: [
        {
          question: "What is NumPy primarily designed for?",
          answers: [
            ["Numerical computing and array-based data operations", true],
            ["Creating HTML page layouts", false],
            ["Managing web domain registrations", false],
            ["Editing video files", false]
          ]
        },
        {
          question: "What is pandas commonly used for?",
          answers: [
            ["Manipulating and analyzing structured data", true],
            ["Designing computer processors", false],
            ["Managing Wi-Fi hardware", false],
            ["Creating operating systems", false]
          ]
        },
        {
          question: "Why might two datasets be merged?",
          answers: [
            ["To combine related information using shared keys or columns", true],
            ["To automatically remove every missing value", false],
            ["To increase computer memory", false],
            ["To encrypt the operating system", false]
          ]
        },
        {
          question: "What is the benefit of reusable analysis functions?",
          answers: [
            ["They reduce duplicated code and make analysis easier to maintain", true],
            ["They prevent datasets from being stored", false],
            ["They eliminate the need for data validation", false],
            ["They automatically prove statistical conclusions", false]
          ]
        },
        {
          question: "NumPy and pandas are widely used Python tools for data analysis.",
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
    title: "Statistics for Data Science",
    description:
      "Build practical statistical knowledge for describing data, estimating relationships, and interpreting analytical results.",
    objectives: [
      "Understand probability and statistical distributions.",
      "Calculate and interpret measures of variability.",
      "Understand sampling and sampling distributions.",
      "Interpret confidence intervals and hypothesis tests.",
      "Distinguish statistical association from causal conclusions."
    ],
    resources: [
      {
        title: "NIST: Engineering Statistics Handbook",
        type: "documentation",
        url: "https://www.itl.nist.gov/div898/handbook/"
      },
      {
        title: "OpenStax: Introductory Statistics",
        type: "documentation",
        url: "https://openstax.org/details/books/introductory-statistics-2e"
      }
    ],
    quiz: {
      title: "Statistics for Data Science Quiz",
      questions: [
        {
          question: "What does standard deviation measure?",
          answers: [
            ["The spread of observations around their mean", true],
            ["The number of variables in a dataset", false],
            ["The maximum possible sample size", false],
            ["The number of database tables", false]
          ]
        },
        {
          question: "What is a confidence interval used for?",
          answers: [
            ["Providing an interval estimate for a population parameter under a specified method", true],
            ["Guaranteeing that every individual observation lies inside the interval", false],
            ["Deleting outliers automatically", false],
            ["Replacing the original dataset", false]
          ]
        },
        {
          question: "What is a hypothesis test used for?",
          answers: [
            ["Evaluating evidence about a statistical claim using sample data", true],
            ["Increasing the amount of collected data automatically", false],
            ["Creating database tables", false],
            ["Formatting a programming language", false]
          ]
        },
        {
          question: "Why is sampling important in statistics?",
          answers: [
            ["It allows researchers to learn about a population using observations from a sample", true],
            ["It guarantees that every sample is perfectly representative", false],
            ["It removes all uncertainty from analysis", false],
            ["It eliminates the need to define a population", false]
          ]
        },
        {
          question: "A statistically significant association does not automatically establish a causal relationship.",
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
    title: "Advanced Data Visualization",
    description:
      "Create effective analytical visualizations and communicate complex patterns clearly.",
    objectives: [
      "Choose visualization techniques based on analytical questions.",
      "Create multi-variable visualizations.",
      "Use appropriate scales and labels.",
      "Identify misleading visualization practices.",
      "Communicate analytical findings through effective visual storytelling."
    ],
    resources: [
      {
        title: "Matplotlib Documentation",
        type: "documentation",
        url: "https://matplotlib.org/stable/"
      },
      {
        title: "Seaborn Documentation",
        type: "documentation",
        url: "https://seaborn.pydata.org/"
      }
    ],
    quiz: {
      title: "Advanced Data Visualization Quiz",
      questions: [
        {
          question: "Why should chart types be selected based on the analytical question?",
          answers: [
            ["Different charts reveal different types of patterns and relationships", true],
            ["Every chart communicates data in exactly the same way", false],
            ["Chart types determine the sample size", false],
            ["Charts automatically remove statistical uncertainty", false]
          ]
        },
        {
          question: "Which visualization is useful for examining relationships between two numerical variables?",
          answers: [
            ["A scatter plot", true],
            ["A login form", false],
            ["A file directory", false],
            ["A navigation menu", false]
          ]
        },
        {
          question: "Why are axis labels important?",
          answers: [
            ["They identify what the displayed values represent", true],
            ["They guarantee that the data is normally distributed", false],
            ["They automatically remove outliers", false],
            ["They increase the number of observations", false]
          ]
        },
        {
          question: "What can a misleading axis scale do?",
          answers: [
            ["Make differences appear larger or smaller than they actually are", true],
            ["Guarantee a causal relationship", false],
            ["Increase the dataset size", false],
            ["Remove missing values", false]
          ]
        },
        {
          question: "Effective data visualization should make important patterns easier to understand.",
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
    title: "Machine Learning Fundamentals",
    description:
      "Understand the foundations of machine learning and learn how supervised and unsupervised methods are applied to data.",
    objectives: [
      "Understand the purpose of machine learning.",
      "Distinguish supervised and unsupervised learning.",
      "Understand features, labels, and training data.",
      "Recognize common regression and classification tasks.",
      "Understand the basic machine learning workflow."
    ],
    resources: [
      {
        title: "Google Machine Learning Crash Course",
        type: "course",
        url: "https://developers.google.com/machine-learning/crash-course"
      },
      {
        title: "scikit-learn User Guide",
        type: "documentation",
        url: "https://scikit-learn.org/stable/user_guide.html"
      }
    ],
    quiz: {
      title: "Machine Learning Fundamentals Quiz",
      questions: [
        {
          question: "What is machine learning?",
          answers: [
            ["A method of building systems that learn patterns from data", true],
            ["A method for physically repairing computers", false],
            ["A replacement for all statistical methods", false],
            ["A type of computer network cable", false]
          ]
        },
        {
          question: "What is supervised learning?",
          answers: [
            ["Learning from examples that include target labels", true],
            ["Learning without any input data", false],
            ["Training a computer without observations", false],
            ["Designing a database schema", false]
          ]
        },
        {
          question: "What is a feature in machine learning?",
          answers: [
            ["An input variable used by a model", true],
            ["The final computer prediction only", false],
            ["A database password", false],
            ["A network protocol", false]
          ]
        },
        {
          question: "Which task is an example of classification?",
          answers: [
            ["Predicting whether an email is spam or not spam", true],
            ["Predicting the exact height of a person", false],
            ["Calculating the average of a dataset", false],
            ["Sorting files alphabetically", false]
          ]
        },
        {
          question: "Regression can be used to predict continuous numerical outcomes.",
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
    title: "Model Evaluation & Applied Data Science",
    description:
      "Learn how to evaluate machine learning models and apply a structured workflow to real-world data science problems.",
    objectives: [
      "Understand the purpose of training and test datasets.",
      "Interpret common model evaluation metrics.",
      "Recognize overfitting and underfitting.",
      "Compare model performance appropriately.",
      "Build a structured workflow for an applied data science project."
    ],
    resources: [
      {
        title: "scikit-learn: Model Evaluation",
        type: "documentation",
        url: "https://scikit-learn.org/stable/modules/model_evaluation.html"
      },
      {
        title: "Google: Machine Learning Problem Framing",
        type: "documentation",
        url: "https://developers.google.com/machine-learning/problem-framing"
      }
    ],
    quiz: {
      title: "Model Evaluation & Applied Data Science Quiz",
      questions: [
        {
          question: "Why is a test dataset used?",
          answers: [
            ["To evaluate how a trained model performs on data not used for training", true],
            ["To increase the amount of training data automatically", false],
            ["To replace the model's training process", false],
            ["To guarantee perfect predictions", false]
          ]
        },
        {
          question: "What is overfitting?",
          answers: [
            ["When a model fits training data too closely and performs poorly on new data", true],
            ["When a dataset contains no variables", false],
            ["When a model has no training data", false],
            ["When all predictions are guaranteed to be correct", false]
          ]
        },
        {
          question: "Why are evaluation metrics important?",
          answers: [
            ["They provide quantitative ways to assess model performance", true],
            ["They automatically improve every model", false],
            ["They eliminate the need for test data", false],
            ["They guarantee causal conclusions", false]
          ]
        },
        {
          question: "Why should a data science project begin with a clearly defined problem?",
          answers: [
            ["It helps determine what data, analysis, and evaluation are appropriate", true],
            ["It guarantees the model will be accurate", false],
            ["It eliminates the need for data preparation", false],
            ["It prevents models from being evaluated", false]
          ]
        },
        {
          question: "A model that performs well on training data can still perform poorly on unseen data.",
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

    console.log(`Data Science Intermediate path ready (ID ${pathId})`);
  } catch (error) {
    console.error("Seed failed:", error);
  } finally {
    await pool.end();
  }
}

seed();
