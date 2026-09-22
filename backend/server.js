require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const learningPathRoutes = require("./routes/learningPaths");
const stageRoutes = require("./routes/stages");
const progressRoutes = require("./routes/progress");
const quizRoutes = require("./routes/quizzes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/learning-paths", learningPathRoutes);
app.use("/api/stages", stageRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/quizzes", quizRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`StudyRoute backend running on port ${PORT}`);
});
