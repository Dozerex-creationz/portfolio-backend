const express = require("express");
const path = require("path");
const fs = require("fs").promises;
const cache = require("../utils/cache");

const router = express.Router();

const PROJECTS_CACHE_KEY = "projects";

async function loadProjectsFromDisk() {
  const filePath = path.join(__dirname, "..", "data", "projects.json");
  const fileContents = await fs.readFile(filePath, "utf-8");
  return JSON.parse(fileContents);
}

function parsePositiveInt(value, defaultValue) {
  const parsed = parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed <= 0) {
    return defaultValue;
  }
  return parsed;
}

router.get("/", async (req, res, next) => {
  try {
    let allProjects = cache.get(PROJECTS_CACHE_KEY);
    if (!allProjects) {
      allProjects = await loadProjectsFromDisk();
      cache.set(PROJECTS_CACHE_KEY, allProjects);
    }

    const page = parsePositiveInt(req.query.page, 1);
    const limit = parsePositiveInt(req.query.limit, 10);

    const totalItems = allProjects.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / limit));
    const currentPage = Math.min(page, totalPages);

    const startIndex = (currentPage - 1) * limit;
    const endIndex = Math.min(startIndex + limit, totalItems);

    const data = allProjects.slice(startIndex, endIndex);

    res.json({
      data,
      pagination: {
        page: currentPage,
        limit,
        totalItems,
        totalPages,
        hasPrevPage: currentPage > 1,
        hasNextPage: currentPage < totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
