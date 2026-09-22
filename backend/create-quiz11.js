require("dotenv").config();

const pool = require("./db/db");

const questions = [
  ["What should be defined first when planning a web project?", ["The project's purpose and requirements", "The final domain price", "The database password", "The hosting invoice"]],
  ["Why is it useful to define project requirements before coding?", ["It clarifies what the project needs to accomplish", "It automatically writes all the code", "It removes the need for testing", "It guarantees unlimited traffic"]],
  ["Which technology is primarily used to structure webpage content?", ["HTML", "CSS", "JavaScript", "SQL"]],
  ["Which technology is primarily used to style webpage content?", ["CSS", "HTML", "JavaScript", "SQL"]],
  ["Which technology is commonly used to add interactive behavior to webpages?", ["JavaScript", "HTML", "CSS", "SQL"]],
  ["What is responsive web design intended to achieve?", ["A layout that adapts to different screen sizes", "A website that only works on desktop", "A faster database connection", "Automatic code generation"]],
  ["Why should a project be tested before deployment?", ["To find and fix problems before users encounter them", "To remove all HTML", "To change the project's purpose", "To prevent browsers from loading it"]],
  ["What is debugging?", ["Finding and fixing problems in code", "Designing a logo", "Buying a domain", "Creating a database account"]],
  ["What does deployment mean for a website?", ["Making the website available on a hosting environment", "Deleting the project files", "Writing only local code", "Changing HTML into CSS"]],
  ["What is a web host responsible for?", ["Serving website files so users can access them", "Writing the developer's code", "Designing every webpage automatically", "Replacing JavaScript"]],
  ["Why is semantic HTML useful?", ["It gives content meaningful structure", "It automatically hosts the website", "It replaces CSS", "It prevents JavaScript from running"]],
  ["Which practice helps keep CSS easier to maintain?", ["Using organized and consistent styles", "Putting unrelated styles everywhere", "Removing all selectors", "Using HTML instead of CSS"]],
  ["What is a useful way to organize JavaScript functionality?", ["Separate related logic into clear functions", "Put every operation into one enormous statement", "Avoid variables completely", "Replace JavaScript with HTML"]],
  ["What should you check after deploying a website?", ["That the live website loads and its main features work", "Only the local source code", "Only the project folder name", "Only the developer's editor"]],
  ["What is a viewport in responsive web design?", ["The visible area of a webpage on a device", "A database table", "A JavaScript function", "A hosting account"]],
  ["Why should images and other assets be optimized for a website?", ["To help pages load efficiently", "To remove HTML structure", "To disable CSS", "To prevent all browser caching"]],
  ["What is version control useful for during a project?", ["Tracking changes to project files", "Replacing web hosting", "Automatically designing interfaces", "Removing the need for testing"]],
  ["What is a production build generally intended for?", ["Preparing the application for use by end users", "Editing the developer's notes", "Creating a database password", "Deleting source files before coding"]],
  ["What is a good final deployment check?", ["Test the important user flows on the live site", "Delete the deployed files", "Remove all JavaScript", "Change every CSS selector"]],
  ["What does completing a real web project demonstrate?", ["Applying planning, development, testing, and deployment skills", "Only knowing HTML syntax", "Only knowing how to buy a domain", "Only knowing how to open a browser"]]
];

async function main() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const quizResult = await client.query(
      `SELECT id FROM quizzes WHERE id = 11`
    );

    if (quizResult.rows.length === 0) {
      throw new Error("Quiz 11 not found");
    }

    await client.query(
      `UPDATE quizzes
       SET title = $1,
           passing_percentage = 70
       WHERE id = 11`,
      ["Build a Real Project Quiz"]
    );

    await client.query(
      `DELETE FROM answers
       WHERE question_id IN (
         SELECT id FROM questions WHERE quiz_id = 11
       )`
    );

    await client.query(
      `DELETE FROM questions
       WHERE quiz_id = 11`
    );

    for (const [questionText, options] of questions) {
      const questionResult = await client.query(
        `INSERT INTO questions (quiz_id, question_text)
         VALUES (11, $1)
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

    console.log("Quiz 11 created successfully with 20 questions.");
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
