const express = require("express");
const {
  getQuizById,
  submitQuiz,
} = require("../controllers/quizController");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

router.get("/:id", authenticateToken, getQuizById);
router.post("/:id/submit", authenticateToken, submitQuiz);

module.exports = router;
