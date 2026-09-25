const express = require("express");

const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const { uploadProfilePicture } = require("../controllers/profileController");

const authenticateToken = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticateToken, getMe);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.post(
  "/profile-picture",
  authenticateToken,
  upload.single("profilePicture"),
  uploadProfilePicture
);

module.exports = router;
