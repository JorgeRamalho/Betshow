# BetShow — Apostas Esportivas Premium

Plataforma de apostas esportivas com foco na **Copa do Mundo 2026**.  
React 19 + TypeScript + Vite 6 · Backend Node.js + PostgreSQL.

---

## Sites online

| Ambiente | URL |
|----------|-----|
| Netlify | https://betshow.netlify.app/ |
| GitHub Pages | https://jorgeramalho.github.io/Betshow/ |

## Repositório

https://github.com/JorgeRamalho/Betshow

---

## Início rápido

```bash
npm install
npm run dev          # http://localhost:5173
npm run live:server  # http://127.0.0.1:5500 (build + Live Server)
```

---

## Documentação

Toda a documentação está organizada em **[docs/00-INDEX.md](./docs/00-INDEX.md)**.

| Documento | Descrição |
|-----------|-----------|
| [Leia Primeiro](./docs/01-inicio/LEIA-PRIMEIRO.md) | Resumo do projeto |
| [Setup](./docs/01-inicio/SETUP.md) | Instalação |
| [Guia de Desenvolvimento](./docs/02-desenvolvimento/GUIA-DESENVOLVIMENTO.md) | Referência técnica |
| [Estrutura de Arquivos](./docs/03-arquitetura/ESTRUTURA-ARQUIVOS.md) | Mapa do código |
| [Auditoria Completa](./docs/06-auditoria/AUDITORIA-COMPLETA-2026-08-07.md) | SEO, UX, UI, a11y |

---

## Stack

- **Frontend:** React 19, TypeScript 5.7, Vite 6, React Router 7
- **Backend:** Node.js, Express, PostgreSQL, JWT
- **Deploy:** Netlify, GitHub Pages, Docker Compose
- **Design:** CSS custom properties (69 tokens), Barlow Condensed + Plus Jakarta Sans

---

## Credenciais de teste

```
Admin:  admin@betshow.com / Admin@2026
Usuário: cadastre-se em /cadastro
```

## Qualidade (Sprint 2–3)

```bash
npm run test:e2e      # 17 testes Playwright (home, SEO, legal, auth, tema, PWA)
npm run lighthouse    # Lighthouse CI (performance, a11y, SEO)
```

**Sprint 3:** fontes self-hosted, tema claro/escuro, PWA instalável, analytics GA4/PostHog (com consentimento).

CI automático: `.github/workflows/quality.yml` (E2E + Lighthouse em push/PR na `main`).

---

## Autor

**Jorge R. Barbosa**  
[LinkedIn](https://www.linkedin.com/in/jorge-r-barbosa-aabb0417b/) · [GitHub](https://github.com/JorgeRamalho)

---

> *"Sua paixão vira vitória!"* ⚽🏆
