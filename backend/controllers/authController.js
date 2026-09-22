const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db/db");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: {
          message: "Name, email and password are required",
        },
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [normalizedEmail]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        error: {
          message: "Email is already registered",
        },
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email`,
      [name.trim(), normalizedEmail, passwordHash]
    );

    const user = result.rows[0];

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      user,
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      error: {
        message: "Something went wrong",
      },
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: {
          message: "Email and password are required",
        },
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const result = await pool.query(
      `SELECT id, name, email, password_hash
       FROM users
       WHERE email = $1`,
      [normalizedEmail]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: {
          message: "Invalid email or password",
        },
      });
    }

    const user = result.rows[0];

    const passwordMatches = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        error: {
          message: "Invalid email or password",
        },
      });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      error: {
        message: "Something went wrong",
      },
    });
  }
}

async function getMe(req, res) {
  try {
    const result = await pool.query(
      `SELECT id, name, email
       FROM users
       WHERE id = $1`,
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: {
          message: "User not found",
        },
      });
    }

    return res.json({
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Get user error:", error);

    return res.status(500).json({
      error: {
        message: "Something went wrong",
      },
    });
  }
}

module.exports = {
  register,
  login,
  getMe,
};
