import dotenv from "dotenv";
import pg from "pg";
import bcrypt from "bcryptjs";

dotenv.config();

const ADMIN_EMAIL = "admin@betshow.com";
const ADMIN_PASSWORD = "Admin@2026";

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL não definido no backend/.env");
    process.exit(1);
  }

  const pool = new pg.Pool({ connectionString: databaseUrl });

  try {
    const existing = await pool.query("SELECT id FROM users WHERE email = $1", [ADMIN_EMAIL]);
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);

    if (existing.rows.length > 0) {
      await pool.query(
        `UPDATE users
         SET role = 'admin',
             password_hash = $1,
             full_name = 'Administrador BetShow',
             kyc_verified = true
         WHERE email = $2`,
        [passwordHash, ADMIN_EMAIL]
      );
      console.log("Admin atualizado:", ADMIN_EMAIL);
    } else {
      await pool.query(
        `INSERT INTO users
          (matricula, full_name, cpf, birth_date, email, phone, address, payment_method, role, password_hash, balance, bonus_balance, cashback_earned, kyc_verified, created_at)
         VALUES
          ('BS-ADMIN-001', 'Administrador BetShow', '000.000.000-00', '1990-01-01', $1, '(11) 99999-0000',
           'Av. Paulista, 1000, São Paulo - SP, 01310-100', 'pix', 'admin', $2, 0, 0, 0, true, NOW())`,
        [ADMIN_EMAIL, passwordHash]
      );
      console.log("Admin criado:", ADMIN_EMAIL);
    }

    console.log("Senha:", ADMIN_PASSWORD);
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error("Falha ao criar admin:", error);
  process.exit(1);
});
