require("dotenv").config();

const pool = require("./db/db");

const questions = [
  ["Which keyword declares a block-scoped variable that can be reassigned?", ["let", "const", "class", "import"]],
  ["Which keyword declares a variable that cannot be reassigned?", ["const", "let", "var", "function"]],
  ["What type of value is the result of 5 < 10?", ["boolean", "number", "string", "object"]],
  ["Which operator checks both value and type equality?", ["===", "=", "==", "!="]],
  ["What does an if statement allow a program to do?", ["Run code conditionally", "Declare an object", "Create an HTML element", "Define a CSS rule"]],
  ["Which structure is used to store an ordered collection of values?", ["Array", "Object", "Function", "Boolean"]],
  ["What is the index of the first element in a JavaScript array?", ["0", "1", "-1", "2"]],
  ["Which property gives the number of elements in an array?", ["length", "size", "count", "items"]],
  ["How do you access the name property of an object called user?", ["user.name", "user->name", "user:name", "user/name"]],
  ["What is a JavaScript object primarily made up of?", ["Key-value properties", "Only numbers", "Only functions", "HTML elements"]],
  ["What keyword is used to define a traditional JavaScript function?", ["function", "def", "func", "method"]],
  ["What does a return statement do inside a function?", ["Returns a value from the function", "Repeats the function", "Creates a variable", "Stops the browser"]],
  ["What happens when a function has no return statement?", ["It returns undefined", "It always returns null", "It returns false", "It causes a syntax error"]],
  ["Which loop is commonly used to repeat code while a condition remains true?", ["while", "select", "repeat", "condition"]],
  ["Which method adds an element to the end of an array?", ["push()", "add()", "append()", "insert()"]],
  ["What does the DOM represent in a webpage?", ["The document structure as objects", "The CSS file only", "The JavaScript source only", "The web server database"]],
  ["Which method can select the first element matching a CSS selector?", ["querySelector()", "getElement()", "selectFirst()", "findCSS()"]],
  ["Which object represents the webpage document in browser JavaScript?", ["document", "windowPage", "html", "browser"]],
  ["Which method can find an element by its ID?", ["getElementById()", "getById()", "findId()", "queryId()"]],
  ["Which JavaScript feature can be used to change text or content of a selected DOM element?", ["textContent", "textValue()", "changeText()", "innerTextOnly()"]]
];

async function main() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const quizResult = await client.query(
      `SELECT id FROM quizzes WHERE id = 9`
    );

    if (quizResult.rows.length === 0) {
      throw new Error("Quiz 9 not found");
    }

    await client.query(
      `UPDATE quizzes
       SET title = $1,
           passing_percentage = 70
       WHERE id = 9`,
      ["JavaScript Basics Quiz"]
    );

    await client.query(
      `DELETE FROM answers
       WHERE question_id IN (
         SELECT id FROM questions WHERE quiz_id = 9
       )`
    );

    await client.query(
      `DELETE FROM questions
       WHERE quiz_id = 9`
    );

    for (const [questionText, options] of questions) {
      const questionResult = await client.query(
        `INSERT INTO questions (quiz_id, question_text)
         VALUES (9, $1)
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

    console.log("Quiz 9 created successfully with 20 questions.");
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
