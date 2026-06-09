import nodemailer from "nodemailer";
import { EMAIL_HOST, EMAIL_PASS, EMAIL_PORT, EMAIL_USER } from "../config.js";

const isConfigured = Boolean(EMAIL_HOST && EMAIL_USER && EMAIL_PASS);

export async function sendEmail(to: string, subject: string, text: string, html?: string) {
  if (!isConfigured) {
    console.log("[email] disabled, would send:", { to, subject, text });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: EMAIL_PORT === 465,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: EMAIL_USER,
    to,
    subject,
    text,
    html,
  });
}

export async function sendWelcomeEmail(to: string, fullName: string) {
  const subject = "Bem-vindo ao BetShow";
  const text = `Olá ${fullName},\n\nSeu cadastro no BetShow foi concluído com sucesso. Explore a plataforma, acompanhe suas apostas e aproveite as promoções da Copa 2026.`;
  const html = `<p>Olá <strong>${fullName}</strong>,</p><p>Seu cadastro no <strong>BetShow</strong> foi concluído com sucesso.</p><p>Aproveite a Copa 2026 com ofertas exclusivas e segurança total.</p>`;

  await sendEmail(to, subject, text, html);
}
