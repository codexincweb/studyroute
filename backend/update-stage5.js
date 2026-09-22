require("dotenv").config();

const pool = require("./db/db");

async function main() {
  await pool.query(
    `UPDATE stages
     SET description = $1
     WHERE id = 11`,
    ["Plan, build, test, and deploy a complete web project."]
  );

  await pool.query(
    `DELETE FROM stage_objectives
     WHERE stage_id = 11`
  );

  await pool.query(
    `INSERT INTO stage_objectives (stage_id, objective)
     VALUES
       (11, 'Plan a web project by defining its purpose, features, and structure'),
       (11, 'Build a responsive interface using HTML and CSS'),
       (11, 'Add interactivity and functionality with JavaScript'),
       (11, 'Test the project and fix common issues before deployment'),
       (11, 'Deploy a completed web project and verify that it works online')`
  );

  await pool.query(
    `DELETE FROM resources
     WHERE stage_id = 11`
  );

  await pool.query(
    `INSERT INTO resources (stage_id, title, type, url)
     VALUES
       (11, 'Planning a Web Project', 'article', 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website'),
       (11, 'Building the Website', 'article', 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content'),
       (11, 'Making the Website Interactive', 'article', 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting'),
       (11, 'Responsive Web Design', 'article', 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design'),
       (11, 'Publishing Your Website', 'article', 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Publishing_your_website')`
  );

  console.log("Stage 5 updated successfully.");

  await pool.end();
}

main().catch(async (error) => {
  console.error(error);
  await pool.end();
  process.exit(1);
});
