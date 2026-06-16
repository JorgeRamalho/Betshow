# Histórico de Sessão — Cursor IA (Jun/2026)

> Branch: `feature/atualizacao-historico-github-jun-2026`  
> Repositório: https://github.com/JorgeRamalho/betshow.git

## Resumo das interações

| # | Solicitação | Ação executada | Arquivos principais |
|---|-------------|----------------|---------------------|
| 1 | Site não está abrindo | Corrigido build TypeScript (`apiFetch`) e feedback no login | `api.ts`, `LoginPage.tsx` |
| 2 | Excluir bloco Futebol 8 perfis | Removida seção `AmbassadorSuggestions` e link do menu | `HomePage.tsx`, `Header.tsx` |
| 3 | Logar repositório GitHub | Remote `origin` alinhado para `betshow.git` | configuração git |
| 4 | Subir servidor Live Server | Script `live:server` e build de produção | `package.json` |
| 5 | Problemas de acesso persistem | Live Server serve `dist/`, normalização de rotas SPA | `normalizeStaticPath.ts`, `index.html`, `vite.config.ts`, `.vscode/settings.json` |
| 6 | Retirar bloco embaixadores | Removida seção `Ambassadors` e ajustes de navegação | `HomePage.tsx`, `Header.tsx`, `Hero.tsx` |

## Commits nesta branch

1. `fix(api): restaurar build e tipagem do apiFetch`
2. `refactor(home): remover seção de sugestões de embaixadores`
3. `fix(dev): corrigir acesso via Live Server e rotas estáticas`
4. `refactor(home): remover seção de embaixadores da landing`
5. `docs: registrar histórico da sessão Cursor Jun/2026`

## Como acessar o site

```bash
npm run live:server   # http://127.0.0.1:5500/
npm run dev           # http://localhost:5173/
```
