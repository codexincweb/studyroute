require("dotenv").config();

const pool = require("./db/db");

const questions = [
  ["What is a main benefit of component-based development?", ["Reusable and maintainable UI pieces", "Faster database queries", "Automatic server deployment", "Replacing JavaScript with CSS"]],
  ["What is a React component?", ["A reusable piece of UI", "A database table", "A CSS stylesheet", "A server endpoint"]],
  ["Which syntax is commonly used to write React components with JavaScript?", ["JSX", "SQL", "PHP", "XML only"]],
  ["What must a React component return when rendering UI?", ["A React element or renderable UI", "A database connection", "A CSS file", "An HTTP response"]],
  ["Which naming convention is commonly used for React component names?", ["PascalCase", "snake_case", "kebab-case", "UPPER_SNAKE_CASE"]],
  ["What are props in React?", ["Data passed from a parent component to a child", "Global database records", "CSS selectors", "Browser cookies"]],
  ["Are React props normally modified directly by the receiving component?", ["No", "Yes, always", "Only when using CSS", "Only during deployment"]],
  ["Which syntax passes a prop named title to a component?", ["<Card title=\"Hello\" />", "<Card title: \"Hello\" />", "<Card.title=\"Hello\" />", "<Card title => \"Hello\" />"]],
  ["What is React state used for?", ["Data that can change during a component's lifetime", "Defining CSS colors only", "Storing server passwords", "Creating database tables"]],
  ["Which React Hook is commonly used to add state to a function component?", ["useState", "useProps", "useData", "useValue"]],
  ["What does calling a state setter generally cause React to do?", ["Schedule a re-render with the new state", "Delete the component permanently", "Reload the database", "Change the browser URL automatically"]],
  ["How should state normally be updated when using useState?", ["Use the setter function returned by useState", "Modify the state variable directly", "Edit the HTML file", "Change package.json"]],
  ["What is an event handler used for in React?", ["Responding to user or browser events", "Creating database indexes", "Installing dependencies", "Writing CSS selectors"]],
  ["Which prop is commonly used to handle a click event in React?", ["onClick", "clickEvent", "whenClick", "handleClickEventOnly"]],
  ["Why are reusable components useful?", ["They reduce duplicated UI code", "They eliminate all application state", "They replace the browser", "They remove the need for JavaScript"]],
  ["What is the parent component in a React component relationship?", ["The component that renders another component", "The component with the shortest name", "The CSS parent selector", "The database parent row"]],
  ["What is JSX?", ["A syntax extension commonly used to describe UI in JavaScript", "A database language", "A CSS framework", "A browser protocol"]],
  ["Can a React component receive different prop values from different parents?", ["Yes", "No", "Only with CSS", "Only on mobile devices"]],
  ["What is one purpose of React state in an interactive UI?", ["Keeping track of changing UI data", "Creating DNS records", "Managing database schemas", "Compiling CSS into SQL"]],
  ["What happens when a user clicks a button whose React onClick handler updates state?", ["React can re-render the component with the updated state", "The browser must be restarted", "The database is automatically deleted", "The CSS file is permanently changed"]]
];

async function main() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const quizResult = await client.query(
      `SELECT id FROM quizzes WHERE id = 10`
    );

    if (quizResult.rows.length === 0) {
      throw new Error("Quiz 10 not found");
    }

    await client.query(
      `UPDATE quizzes
       SET title = $1,
           passing_percentage = 70
       WHERE id = 10`,
      ["Frontend Frameworks Quiz"]
    );

    await client.query(
      `DELETE FROM answers
       WHERE question_id IN (
         SELECT id FROM questions WHERE quiz_id = 10
       )`
    );

    await client.query(
      `DELETE FROM questions
       WHERE quiz_id = 10`
    );

    for (const [questionText, options] of questions) {
      const questionResult = await client.query(
        `INSERT INTO questions (quiz_id, question_text)
         VALUES (10, $1)
         RETURNING id`,
        [questionText]
      );

      const questionId = questionResult.rows[0].id;

      for (let i = 0; i < options.length; i++) {
        await client.query(
          `INSERT INTO answers (question_id, answer_text, is_correct)
           VALUES ($1, $2, $3)`,
          [questionId, options[i], i === 0]
        );
      }
    }

    await client.query("COMMIT");

    console.log("Quiz 10 created successfully with 20 questions.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

main();
