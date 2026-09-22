require("dotenv").config();

const pool = require("./db/db");

async function main() {
  await pool.query(
    `UPDATE stages
     SET description = $1
     WHERE id = 9`,
    ["Learn JavaScript fundamentals and basic interaction with webpages."]
  );

  await pool.query(
    `DELETE FROM stage_objectives
     WHERE stage_id = 9`
  );

  await pool.query(
    `INSERT INTO stage_objectives (stage_id, objective)
     VALUES
       (9, 'Understand JavaScript variables, values, and basic data types'),
       (9, 'Write and use functions with parameters and return values'),
       (9, 'Work with arrays and objects to organize data'),
       (9, 'Use basic operators and control flow in JavaScript'),
       (9, 'Understand how JavaScript interacts with webpages through the DOM')`
  );

  await pool.query(
    `DELETE FROM resources
     WHERE stage_id = 9`
  );

  await pool.query(
    `INSERT INTO resources (stage_id, title, type, url)
     VALUES
       (9, 'JavaScript First Steps', 'article', 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting'),
       (9, 'Variables and Data Types', 'article', 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Variables'),
       (9, 'Functions', 'article', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions'),
       (9, 'Arrays and Objects', 'article', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections'),
       (9, 'DOM Scripting Introduction', 'article', 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/DOM_scripting')`
  );

  console.log("Stage 3 updated successfully.");

  await pool.end();
}

main().catch(async (error) => {
  console.error(error);
  await pool.end();
  process.exit(1);
});
