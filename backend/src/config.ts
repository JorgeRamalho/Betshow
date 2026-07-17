import dotenv from "dotenv";

dotenv.config();

export const PORT = Number(process.env.PORT ?? 4000);
export const DATABASE_URL = process.env.DATABASE_URL ?? "";
export const JWT_SECRET = process.env.JWT_SECRET ?? "change-me";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "1d";
export const FRONTEND_URL = process.env.FRONTEND_URL ?? "http://localhost:5173";
/** Origens permitidas no CORS (separadas por vírgula). */
export const FRONTEND_ORIGINS = (
  process.env.FRONTEND_URLS ??
  [
    FRONTEND_URL,
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:4173",
    "http://127.0.0.1:4173",
    "https://betshow.netlify.app",
    "https://jorgeramalho.github.io",
  ].join(",")
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY ?? "";
export const EMAIL_HOST = process.env.EMAIL_HOST ?? "";
export const EMAIL_PORT = Number(process.env.EMAIL_PORT ?? 587);
export const EMAIL_USER = process.env.EMAIL_USER ?? "";
export const EMAIL_PASS = process.env.EMAIL_PASS ?? "";
export const SMS_ACCOUNT_SID = process.env.SMS_ACCOUNT_SID ?? "";
export const SMS_AUTH_TOKEN = process.env.SMS_AUTH_TOKEN ?? "";
export const SMS_FROM = process.env.SMS_FROM ?? "";
