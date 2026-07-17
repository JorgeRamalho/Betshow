# BetShow Backend

API REST com autenticação JWT, PostgreSQL, depósitos, apostas e ledger financeiro.

## Iniciar o backend

```bash
cd backend
npm install
cp .env.example .env
```

Configure `DATABASE_URL` no `.env`, depois:

```bash
npm run db:migrate
npm run db:seed
npm run dev
```

Admin padrão (seed):

- E-mail: `admin@betshow.com`
- Senha: `Admin@2026`

## Endpoints principais

### Auth / usuários
- `POST /api/auth/register` — Cadastro (grava em `users` + bônus de boas-vindas)
- `POST /api/auth/login` — Login
- `GET /api/auth/profile` — Perfil autenticado
- `GET /api/users/me` — Dashboard do usuário (stats reais)
- `GET /api/users` — Lista de usuários (admin)

### Pagamentos / extrato
- `POST /api/payments/deposit` — Depósito (+ linha em `transactions`)
- `GET /api/payments/balance` — Saldo
- `GET /api/payments/transactions` — Extrato do usuário
- `GET /api/payments/transactions/all` — Extrato geral (admin)
- `GET /api/payments/summary` — Resumo financeiro (admin)
- `POST /api/payments/webhook` — Webhook Stripe (stub)

### Apostas
- `POST /api/bets` — Registrar aposta (debita saldo + `transactions` tipo `bet`)
- `GET /api/bets/me` — Apostas do usuário
- `GET /api/bets` — Todas as apostas (admin)
- `PATCH /api/bets/:id/settle` — Liquidar aposta (`won|lost|cashout|cancelled`)

## Banco de dados

Schema em `backend/db/schema.sql` (`users`, `transactions`, `bets`).

Scripts:

- `npm run db:migrate` — aplica o schema
- `npm run db:seed` — cria/atualiza admin

Com Docker (recomendado em desenvolvimento):

```bash
# na raiz do projeto
docker compose up -d
cd backend
npm run db:migrate
npm run db:seed
npm run dev
```

O `DATABASE_URL` padrão no `.env` usa `localhost:5433` (container `betshow-db`).

## Integrações opcionais

- Stripe: `STRIPE_SECRET_KEY`
- E-mail: `EMAIL_HOST`, `EMAIL_USER`, `EMAIL_PASS`
- SMS: `SMS_ACCOUNT_SID`, `SMS_AUTH_TOKEN`, `SMS_FROM`
