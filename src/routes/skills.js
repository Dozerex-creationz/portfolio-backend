const express = require("express");
const path = require("path");
const fs = require("fs").promises;
const cache = require("../utils/cache");

const router = express.Router();

const SKILLS_CACHE_KEY = "skills";

async function loadSkillsFromDisk() {
  const filePath = path.join(__dirname, "..", "data", "skills.json");
  const fileContents = await fs.readFile(filePath, "utf-8");
  return JSON.parse(fileContents);
}

router.get("/", async (req, res, next) => {
  try {
    let skills = cache.get(SKILLS_CACHE_KEY);
    if (!skills) {
      skills = await loadSkillsFromDisk();
      cache.set(SKILLS_CACHE_KEY, skills);
    }

    res.json({ data: skills });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
