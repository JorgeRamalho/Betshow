# 🎯 BetShow - Plataforma de Apostas Esportivas

**Betshow** é uma plataforma moderna de apostas esportivas com foco na Copa do Mundo 2026, desenvolvida com React, TypeScript e Vite. — Apostas Esportivas

Landing page em **HTML + CSS + TypeScript + React**, com servidor configurado para **acesso remoto** na rede local.

## Acesso ao site (links)

### Neste computador

```bash
npm install
npm run dev
```

Abra: **http://localhost:5173/**

### Celular ou outro PC (mesma rede Wi-Fi)

```bash
npm run dev:remote
```

ou no Windows:

```powershell
npm start
```

No terminal aparecerá o link **Remoto**, por exemplo: `http://192.168.1.10:5173/`

Guia completo (firewall, internet pública): **[ACESSO-REMOTO.md](./ACESSO-REMOTO.md)**

### Produção na rede

```bash
npm run serve
```

Link típico: `http://192.168.x.x:4173/`

## Arquivos do projeto

Ver **[docs/ESTRUTURA-ARQUIVOS.md](./docs/ESTRUTURA-ARQUIVOS.md)** — `index.html`, CSS, React e TypeScript.

## Embaixadores e sugestões

- Ativos no site: `src/data/ambassadors.ts`
- **12 perfis sugeridos** (6 futebol + 6 basquete): `src/data/ambassadorSuggestions.ts`
- Seção no site: `#sugestoes-embaixadores`

## Scripts

| Script | Uso |
|--------|-----|
| `npm run dev` | Desenvolvimento + link remoto no terminal |
| `npm run dev:remote` | Igual ao `dev` |
| `npm start` | PowerShell com IPs exibidos |
| `npm run build` | Gera pasta `dist/` |
| `npm run preview:remote` | Preview da build na rede |
| `npm run serve` | Build + preview |
| `npm run backend:dev` | Inicia o backend Express local em `backend/` |
| `npm run backend:build` | Verifica o backend TypeScript |

## Backend para produção

A estrutura de backend está em `backend/` e foi criada para suportar:
- API REST em Node.js + Express
- Banco de dados PostgreSQL
- Autenticação JWT segura
- Integração com Stripe para pagamentos
- Esquema de e-mail (nodemailer) e SMS (Twilio) para notificações

Use `backend/.env.example` como referência de variáveis de ambiente.

## Frontend e API local

Configure a URL do backend no frontend com um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:4000
```

Se preferir, copie também `.env.example` e ajuste o valor.

## Aviso legal

Demonstração front-end. Apostas no Brasil exigem licença e conformidade (Lei 14.790/23).
