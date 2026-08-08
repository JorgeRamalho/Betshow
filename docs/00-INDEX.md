# BetShow — Índice de Documentação

**Última atualização:** 07 de agosto de 2026  
**Repositório:** [github.com/JorgeRamalho/Betshow](https://github.com/JorgeRamalho/Betshow)

---

## Navegação rápida

| Perfil | Documento | Tempo |
|--------|-----------|-------|
| Todos | [01-inicio/LEIA-PRIMEIRO.md](./01-inicio/LEIA-PRIMEIRO.md) | 2 min |
| Dev novo | [01-inicio/SETUP.md](./01-inicio/SETUP.md) | 5 min |
| Desenvolvedor | [02-desenvolvimento/GUIA-DESENVOLVIMENTO.md](./02-desenvolvimento/GUIA-DESENVOLVIMENTO.md) | 10 min |
| Arquiteto / Lead | [03-arquitetura/ESTRUTURA-ARQUIVOS.md](./03-arquitetura/ESTRUTURA-ARQUIVOS.md) | 20 min |
| Stakeholder | [04-produto/SUMARIO-EXECUTIVO.md](./04-produto/SUMARIO-EXECUTIVO.md) | 15 min |
| Produto completo | [04-produto/DOCUMENTACAO-COMPLETA.md](./04-produto/DOCUMENTACAO-COMPLETA.md) | 30 min |
| QA | [05-qualidade/VERIFICACAO-FINAL.md](./05-qualidade/VERIFICACAO-FINAL.md) | 10 min |
| Auditoria | [06-auditoria/AUDITORIA-COMPLETA-2026-08-07.md](./06-auditoria/AUDITORIA-COMPLETA-2026-08-07.md) | 25 min |
| Testes E2E | `npm run test:e2e` | — |
| Lighthouse CI | `npm run lighthouse` | — |

---

## Estrutura da pasta `docs/`

```
docs/
├── 00-INDEX.md                    ← Você está aqui
├── 01-inicio/                     ← Onboarding e setup
├── 02-desenvolvimento/            ← Guias técnicos e backend
├── 03-arquitetura/                ← Mapa de arquivos e dependências
├── 04-produto/                    ← Documentação de negócio
├── 05-qualidade/                  ← Checklists e verificação
├── 06-auditoria/                  ← Auditorias, pesquisa e screenshots
└── chat-history/                  ← Histórico de sessões (dev)
```

---

## Estrutura da raiz do projeto

```
Projeto-Betshow/
├── index.html              # Entry HTML (Vite + Live Server)
├── package.json            # Scripts e dependências frontend
├── vite.config.ts          # Build, proxy API, deploy
├── tsconfig.json           # TypeScript
├── docker-compose.yml      # Backend + PostgreSQL
├── netlify.toml            # Deploy Netlify
├── README.md               # Visão geral + links
│
├── src/                    # Frontend React 19 + TypeScript
├── public/                 # Assets estáticos
├── backend/                # API Node.js + Express
├── scripts/                # Automação PowerShell / Node
├── docs/                   # Toda a documentação
├── dist/                   # Build de produção (gerado)
└── .github/workflows/      # CI/CD (Netlify + GitHub Pages)
```

---

## URLs de execução

| Ambiente | Comando | URL |
|----------|---------|-----|
| Desenvolvimento | `npm run dev` | http://localhost:5173 |
| Preview build | `npm run preview` | http://localhost:4173 |
| Live Server | `npm run live:server` | http://127.0.0.1:5500 |
| Produção Netlify | deploy automático | https://betshow.netlify.app |
| Produção GitHub Pages | push na `main` | https://jorgeramalho.github.io/Betshow/ |

---

## Contato

**Autor:** Jorge R. Barbosa  
**GitHub:** [JorgeRamalho](https://github.com/JorgeRamalho)  
**LinkedIn:** [jorge-r-barbosa](https://www.linkedin.com/in/jorge-r-barbosa-aabb0417b/)
