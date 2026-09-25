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
      `SELECT id, name, email, profile_picture_url AS "profilePicture", password_hash
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
      `SELECT id, name, email, profile_picture_url AS "profilePicture"
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
  forgotPassword,
  resetPassword,
};

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: {
          message: "Email is required",
        },
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const result = await pool.query(
      `SELECT id, name, email
       FROM users
       WHERE email = $1`,
      [normalizedEmail]
    );

    // Always return the same response, even when the email does not exist.
    // This prevents exposing which emails are registered.
    if (result.rows.length === 0) {
      return res.json({
        message: "If an account exists for this email, a password reset link has been sent.",
      });
    }

    const user = result.rows[0];

    const crypto = require("crypto");

    // Invalidate previous unused reset tokens for this user.
    await pool.query(
      `UPDATE password_reset_tokens
       SET used_at = NOW()
       WHERE user_id = $1
       AND used_at IS NULL`,
      [user.id]
    );

    const resetToken = crypto.randomBytes(32).toString("hex");

    const tokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    await pool.query(
      `INSERT INTO password_reset_tokens
       (user_id, token_hash, expires_at)
       VALUES ($1, $2, NOW() + INTERVAL '15 minutes')`,
      [user.id, tokenHash]
    );

    const resetUrl =
      `${process.env.PASSWORD_RESET_URL}?token=${encodeURIComponent(resetToken)}`;

    const emailResponse = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          sender: {
            email: process.env.BREVO_SENDER_EMAIL,
            name: process.env.BREVO_SENDER_NAME || "StudyRoute",
          },
          to: [
            {
              email: user.email,
              name: user.name,
            },
          ],
          subject: "Reset your StudyRoute password",
          htmlContent: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
              <h2>Reset your StudyRoute password</h2>
              <p>Hello ${user.name},</p>
              <p>We received a request to reset your StudyRoute password.</p>
              <p>
                <a href="${resetUrl}"
                   style="display:inline-block;padding:12px 20px;background:#2563eb;color:#ffffff;text-decoration:none;border-radius:6px;">
                  Reset Password
                </a>
              </p>
              <p>This link expires in 15 minutes and can only be used once.</p>
              <p>If you did not request a password reset, you can safely ignore this email.</p>
              <p>StudyRoute</p>
            </div>
          `,
        }),
      }
    );

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Brevo email error:", errorText);

      return res.status(500).json({
        error: {
          message: "Unable to send password reset email",
        },
      });
    }

    return res.json({
      message: "If an account exists for this email, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);

    return res.status(500).json({
      error: {
        message: "Something went wrong",
      },
    });
  }
}

async function resetPassword(req, res) {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        error: {
          message: "Reset token and new password are required",
        },
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: {
          message: "Password must be at least 6 characters",
        },
      });
    }

    const crypto = require("crypto");

    const tokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const result = await pool.query(
      `SELECT id, user_id
       FROM password_reset_tokens
       WHERE token_hash = $1
       AND used_at IS NULL
       AND expires_at > NOW()`,
      [tokenHash]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        error: {
          message: "Invalid or expired password reset token",
        },
      });
    }

    const resetRecord = result.rows[0];

    const passwordHash = await bcrypt.hash(password, 10);

    await pool.query(
      `UPDATE users
       SET password_hash = $1,
           updated_at = NOW()
       WHERE id = $2`,
      [passwordHash, resetRecord.user_id]
    );

    await pool.query(
      `UPDATE password_reset_tokens
       SET used_at = NOW()
       WHERE user_id = $1
       AND used_at IS NULL`,
      [resetRecord.user_id]
    );

    return res.json({
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);

    return res.status(500).json({
      error: {
        message: "Something went wrong",
      },
    });
  }
}
