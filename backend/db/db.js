const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 5,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 30000,
  keepAlive: true,
});

pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL error:", error);
});

module.exports = pool;
