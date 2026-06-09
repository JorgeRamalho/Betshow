# BetShow Backend

Esta pasta contém o backend da plataforma BetShow com API REST, autenticação JWT, conexão PostgreSQL, pagamentos com Stripe e notificações por e-mail/SMS.

## Iniciar o backend

1. Entre na pasta do backend:

```bash
cd backend
```

2. Instale dependências:

```bash
npm install
```

3. Copie o modelo de variáveis de ambiente:

```bash
cp .env.example .env
```

4. Inicie em modo de desenvolvimento:

```bash
npm run dev
```

## Endpoints principais

- `POST /api/auth/register` — Cadastro de usuário
- `POST /api/auth/login` — Login com e-mail e senha
- `GET /api/auth/profile` — Perfil autenticado
- `GET /api/users/me` — Dashboard do usuário autenticado
- `GET /api/users` — Lista de usuários (admin)
- `POST /api/payments/deposit` — Criar depósito
- `GET /api/payments/balance` — Saldo do usuário
- `POST /api/payments/webhook` — Webhook de pagamentos

## Banco de dados

A pasta `backend/db/schema.sql` contém o esquema inicial de tabelas para `users`, `transactions` e `bets`.

## Integrações

- Stripe: `STRIPE_SECRET_KEY`
- E-mail: `EMAIL_HOST`, `EMAIL_USER`, `EMAIL_PASS`
- SMS: `SMS_ACCOUNT_SID`, `SMS_AUTH_TOKEN`, `SMS_FROM`

## Observações

A API já suporta autenticação JWT e separa o frontend em `FRONTEND_URL` para CORS.
