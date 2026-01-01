export const SERVER_CONFIG = {
  PORT: process.env.PORT || 3001,
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
  NODE_ENV: process.env.NODE_ENV || "development",
} as const;

