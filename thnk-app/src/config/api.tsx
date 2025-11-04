// src/config/api.ts
export const API_CONFIG =
  process.env.NODE_ENV === "production"
    ? "https://thnk-backend-production.up.railway.app/"
    : "http://localhost:5000/api";
