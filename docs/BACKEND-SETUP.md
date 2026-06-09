# Backend BetShow — Configuração e Integração

Este documento descreve a nova camada de backend do BetShow e as etapas necessárias para levar a plataforma a produção.

## Onde está o backend

A nova API está em `backend/`.

## O que está incluído

- Node.js + Express API
- TypeScript com `ts-node-dev` para desenvolvimento rápido
- PostgreSQL via `pg`
- Autenticação JWT segura
- Integração com Stripe (pagamentos)
- Envio de e-mail via Nodemailer
- Envio de SMS via Twilio
- Esquema SQL inicial em `backend/db/schema.sql`

## Arquivos principais

- `backend/src/index.ts` — inicializa o servidor
- `backend/src/app.ts` — configura o Express e as rotas
- `backend/src/config.ts` — variáveis de ambiente
- `backend/src/db/index.ts` — conexão com PostgreSQL
- `backend/src/controllers/` — lógica de autenticação, usuários e pagamentos
- `backend/src/routes/` — rotas REST
- `backend/src/services/` — JWT, criptografia, e-mails e SMS

## Variáveis de ambiente

Copie `.env.example` para `.env` e configure os valores:

- `PORT`
- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `FRONTEND_URL`
- `STRIPE_SECRET_KEY`
- `EMAIL_HOST`
- `EMAIL_PORT`
- `EMAIL_USER`
- `EMAIL_PASS`
- `SMS_ACCOUNT_SID`
- `SMS_AUTH_TOKEN`
- `SMS_FROM`

## Como iniciar

No root do projeto:

```bash
npm run backend:dev
```

Ou diretamente no backend:

```bash
cd backend
npm install
npm run dev
```

## Integração com frontend

Para o frontend se comunicar com o backend local, configure um arquivo `.env` na raiz do projeto com:

```env
VITE_API_URL=http://localhost:4000
```

O frontend já inclui um helper `src/services/api.ts` que utiliza essa variável para chamar os endpoints.

## Próximos passos para produção

1. Configurar PostgreSQL e rodar `backend/db/schema.sql`.
2. Criar `DATABASE_URL` seguro e `JWT_SECRET` forte.
3. Ajustar CORS de produção em `FRONTEND_URL`.
4. Configurar Stripe com credenciais reais.
5. Configurar SMTP e Twilio em ambiente seguro.
6. Implementar validações adicionais e testes de integração.
