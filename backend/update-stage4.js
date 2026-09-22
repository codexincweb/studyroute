require("dotenv").config();

const pool = require("./db/db");

async function main() {
  await pool.query(
    `UPDATE stages
     SET description = $1
     WHERE id = 10`,
    ["Understand component-based frontend development and the basics of React."]
  );

  await pool.query(
    `DELETE FROM stage_objectives
     WHERE stage_id = 10`
  );

  await pool.query(
    `INSERT INTO stage_objectives (stage_id, objective)
     VALUES
       (10, 'Understand the purpose of component-based frontend development'),
       (10, 'Understand the basic structure of a React application'),
       (10, 'Create reusable React components'),
       (10, 'Pass and use data with React props'),
       (10, 'Understand basic React state and event handling')`
  );

  await pool.query(
    `DELETE FROM resources
     WHERE stage_id = 10`
  );

  await pool.query(
    `INSERT INTO resources (stage_id, title, type, url)
     VALUES
       (10, 'React Fundamentals', 'documentation', 'https://react.dev/learn'),
       (10, 'Your First Component', 'documentation', 'https://react.dev/learn/your-first-component'),
       (10, 'Passing Props to a Component', 'documentation', 'https://react.dev/learn/passing-props-to-a-component'),
       (10, 'State: A Component''s Memory', 'documentation', 'https://react.dev/learn/state-a-components-memory'),
       (10, 'Responding to Events', 'documentation', 'https://react.dev/learn/responding-to-events')`
  );

  console.log("Stage 4 updated successfully.");

  await pool.end();
}

main().catch(async (error) => {
  console.error(error);
  await pool.end();
  process.exit(1);
});
