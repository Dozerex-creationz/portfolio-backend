const express = require("express");
const router = express.Router();

// Import route modules
const skillsRoutes = require("./skills");
const projectsRoutes = require("./projects");

// Mount route modules
router.use("/skills", skillsRoutes);
router.use("/projects", projectsRoutes);

// Example API endpoint
router.get("/info", (req, res) => {
  res.json({
    name: "Portfolio Backend API",
    version: "1.0.0",
    description: "Backend API server for portfolio frontend",
    frontendUrl: process.env.FRONTEND_URL,
  });
});

module.exports = router;
