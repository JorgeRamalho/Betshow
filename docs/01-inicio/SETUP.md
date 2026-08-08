# Setup local BetShow

## Opção A — Docker (banco + API)

```bash
docker compose up -d --build
```

- Postgres: `localhost:5433`
- API: http://localhost:4000
- Health: http://localhost:4000/api/health

Admin:
- admin@betshow.com
- Admin@2026

Só o banco (sem API no Docker):

```bash
docker compose up -d db
```

## Opção B — Backend local + banco Docker

```bash
docker compose up -d db
cd backend
npm install
# backend/.env com DATABASE_URL em localhost:5433
npm run db:migrate
npm run db:seed
npm run dev
```

API: http://localhost:4000

## Frontend

```bash
npm install
# .env com VITE_API_URL=http://localhost:4000
npm run dev
```

Site: http://localhost:5173

## Cadastro no site online

O frontend em Netlify/GitHub Pages precisa apontar `VITE_API_URL` para uma API pública
(túnel Cloudflare ou hospedagem). Enquanto a API rodar só em `localhost:4000`,
o cadastro online não grava no banco.
