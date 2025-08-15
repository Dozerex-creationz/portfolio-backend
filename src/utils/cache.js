const NodeCache = require("node-cache");

const defaultTtlSeconds = parseInt(process.env.CACHE_TTL_SECONDS || "300", 10);

const cache = new NodeCache({
  stdTTL: defaultTtlSeconds,
  checkperiod: Math.max(30, Math.ceil(defaultTtlSeconds * 0.2)),
  useClones: false,
});

module.exports = cache;
