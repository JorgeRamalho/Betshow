import { Request, Response } from "express";
import { query, withTransaction } from "../db/index.js";
import { hashPassword, comparePassword } from "../services/passwordService.js";
import { signToken } from "../services/jwtService.js";
import { sendWelcomeEmail } from "../services/emailService.js";
import { sendSms } from "../services/smsService.js";
import { AuthRequest } from "../middleware/authMiddleware.js";

const WELCOME_BONUS = 500;

function generateMatricula() {
  return `BET-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

function mapAuthUser(user: any) {
  return {
    id: String(user.id),
    matricula: user.matricula,
    fullName: user.full_name,
    email: user.email,
    role: user.role,
    balance: Number(user.balance ?? 0),
    bonusBalance: Number(user.bonus_balance ?? 0),
    cashbackEarned: Number(user.cashback_earned ?? 0),
    kycVerified: Boolean(user.kyc_verified),
    cpf: user.cpf,
    birthDate: user.birth_date,
    phone: user.phone,
    paymentMethod: user.payment_method,
    createdAt: user.created_at,
  };
}

export async function register(req: Request, res: Response) {
  try {
    const {
      fullName,
      cpf,
      birthDate,
      email,
      phone,
      address,
      paymentMethod,
      password,
    } = req.body;

    if (!fullName || !cpf || !birthDate || !email || !phone || !address || !paymentMethod || !password) {
      return res.status(400).json({ error: "Campos obrigatórios faltando." });
    }

    const existing = await query("SELECT id FROM users WHERE email = $1 OR cpf = $2", [email, cpf]);
    if (existing.length > 0) {
      return res.status(409).json({ error: "Usuário já cadastrado com este e-mail ou CPF." });
    }

    const passwordHash = await hashPassword(password);
    const matricula = generateMatricula();

    const user = await withTransaction(async (client) => {
      const inserted = await client.query(
        `INSERT INTO users
          (matricula, full_name, cpf, birth_date, email, phone, address, payment_method, role, password_hash, balance, bonus_balance, cashback_earned, kyc_verified, created_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,0,$11,0,false,NOW())
         RETURNING id, matricula, full_name, email, role, balance, bonus_balance, cashback_earned, kyc_verified, cpf, birth_date, phone, payment_method, created_at`,
        [
          matricula,
          fullName,
          cpf,
          birthDate,
          email,
          phone,
          address,
          paymentMethod,
          "user",
          passwordHash,
          WELCOME_BONUS,
        ]
      );

      const created = inserted.rows[0];

      await client.query(
        `INSERT INTO transactions (user_id, type, amount, status, method, description, created_at)
         VALUES ($1, 'bonus', $2, 'completed', 'welcome', $3, NOW())`,
        [created.id, WELCOME_BONUS, "Bônus de boas-vindas BETSHOW500"]
      );

      return created;
    });

    const userData = mapAuthUser(user);
    const token = signToken({ userId: String(user.id), role: user.role });

    await sendWelcomeEmail(user.email, user.full_name);
    await sendSms(phone, `Bem-vindo ao BetShow, ${fullName}! Sua conta foi criada com sucesso.`);

    res.status(201).json({ token, user: userData });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Falha ao registrar usuário." });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
    }

    const results = await query(
      `SELECT id, matricula, full_name, email, role, password_hash, balance, bonus_balance, cashback_earned, kyc_verified, cpf, birth_date, phone, payment_method, created_at
       FROM users WHERE email = $1`,
      [email]
    );

    if (results.length === 0) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const user = results[0];
    const isValid = await comparePassword(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const token = signToken({ userId: String(user.id), role: user.role });
    res.json({
      token,
      user: mapAuthUser(user),
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Falha ao autenticar usuário." });
  }
}

export async function profile(req: Request, res: Response) {
  try {
    const authReq = req as AuthRequest;
    const userId = authReq.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    const rows = await query(
      `SELECT id, matricula, full_name, cpf, birth_date, email, phone, address, payment_method, role, balance, bonus_balance, cashback_earned, kyc_verified, created_at
       FROM users WHERE id = $1`,
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const user = rows[0];
    res.json({
      user: {
        ...mapAuthUser(user),
        address: user.address,
      },
    });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ error: "Falha ao buscar perfil." });
  }
}
