// lib/redis.js
const Redis = require("ioredis");

const redis = new Redis(process.env.REDIS_URL); // Or UPSTASH_REDIS_REST_URL for Upstash

module.exports = redis;
