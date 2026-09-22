const express = require("express");
const {
  getStageById,
} = require("../controllers/stageController");
const {
  completeStage,
} = require("../controllers/progressController");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

router.get("/:id", getStageById);
router.post("/:id/complete", authenticateToken, completeStage);

module.exports = router;
