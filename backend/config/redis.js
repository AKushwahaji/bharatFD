import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URI || "redis://localhost:6379",
});

redisClient.on("error", (err) => console.error("Redis Error:", err));

redisClient.connect().then(() => console.log("Connected to Redis"));

export default redisClient;
