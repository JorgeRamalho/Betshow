import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schemaPath = path.resolve(__dirname, "../db/schema.sql");

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL não definido no backend/.env");
    process.exit(1);
  }

  const sql = fs.readFileSync(schemaPath, "utf8");
  const pool = new pg.Pool({ connectionString: databaseUrl });

  try {
    await pool.query(sql);
    console.log("Schema aplicado com sucesso:", schemaPath);
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error("Falha ao aplicar schema:", error);
  process.exit(1);
});
