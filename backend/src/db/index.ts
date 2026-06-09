import { Pool } from "pg";
import { DATABASE_URL } from "../config.js";

const pool = new Pool({
  connectionString: DATABASE_URL,
  ...(process.env.NODE_ENV === "production" ? { ssl: { rejectUnauthorized: false } } : {}),
});

export async function query<T = any>(text: string, params: any[] = []) {
  const result = await pool.query<T>(text, params);
  return result.rows;
}

export default pool;
