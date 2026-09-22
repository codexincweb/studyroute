const express = require("express");
const {
  getLearningPaths,
  getLearningPathById,
} = require("../controllers/learningPathController");

const router = express.Router();

router.get("/", getLearningPaths);
router.get("/:id", getLearningPathById);

module.exports = router;
