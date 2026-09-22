const express = require("express");
const {
  getProgress,
} = require("../controllers/progressController");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticateToken, getProgress);

module.exports = router;
