
import redisClient from "../config/redisClient.js";

const cacheMiddleware = async (req, res, next) => {
  const lang = req.query.lang || "en";
  const cacheKey = `faqs_${lang}`;

  try {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }
    next();
  } catch (error) {
    console.error("Redis Cache Error:", error);
    next();
  }
};

export default cacheMiddleware;
