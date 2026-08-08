# Plano de Pesquisa — BetShow

**Data:** 07 de agosto de 2026  
**Objetivo:** Definir metodologia, escopo e cronograma para auditoria contínua do projeto BetShow.

---

## 1. Escopo da pesquisa

### 1.1 Dimensões avaliadas

| Dimensão | Ferramentas | Critério de sucesso |
|----------|-------------|---------------------|
| SEO técnico | Playwright, Lighthouse, Search Console | Meta tags completas, H1 único, alt em imagens |
| Acessibilidade | Playwright, axe-core, leitores de tela | WCAG 2.1 AA mínimo |
| Performance | Lighthouse, Web Vitals | LCP < 2.5s, CLS < 0.1 |
| Responsividade | Playwright (375/768/1920px) | Sem overflow horizontal |
| UX / UI | Heurísticas Nielsen, teste de tarefas | Fluxo cadastro < 3 min |
| Identidade visual | Design tokens, brand.ts | Consistência 95%+ |
| Segurança | OWASP, revisão AuthContext | Sem secrets no frontend |
| Regulatório (BR) | Lei 14.790/2023 | Avisos legais visíveis |

### 1.2 Ambientes de teste

1. **Local Live Server** — `http://127.0.0.1:5500/` (build `dist/`)
2. **Vite Dev** — `http://localhost:5173/` (hot reload)
3. **Staging** — Netlify preview branches
4. **Produção** — betshow.netlify.app + GitHub Pages

---

## 2. Metodologia Playwright (aplicada em 07/08/2026)

### Fase 1 — Varredura automatizada
- [x] Navegação para home (`/`)
- [x] Extração de meta tags, headings, imagens, links
- [x] Análise de tipografia computada (font-family, sizes)
- [x] Inventário de CSS variables (`tokens.css`)
- [x] Landmarks ARIA e roles
- [x] Métricas de performance (DCL, recursos)
- [x] Screenshot desktop (1920×1080) e mobile (375×812)
- [x] Navegação para `/login`

### Fase 2 — Testes manuais recomendados
- [ ] Fluxo completo de cadastro (5 passos)
- [ ] Login admin + dashboard admin
- [ ] Login usuário + dashboard + depósito
- [ ] Cookie consent e páginas legais
- [ ] Menu mobile (breakpoint ≤ 900px)
- [ ] Teclado-only navigation (Tab)
- [ ] Lighthouse CI em pipeline

### Fase 3 — Benchmark competitivo
- [ ] Análise de 3 concorrentes (Betano, Sportingbet, Pixbet)
- [ ] Matriz de features (odds ao vivo, KYC, bônus)
- [ ] Comparação de UX mobile

---

## 3. Cronograma sugerido

| Semana | Atividade | Entregável |
|--------|-----------|------------|
| S1 | Auditoria técnica (esta) | AUDITORIA-COMPLETA |
| S2 | Correções SEO + a11y (alt, OG tags) | PR #1 |
| S3 | Testes E2E Playwright | `tests/e2e/` |
| S4 | Lighthouse CI + performance | Score > 90 |
| S5 | Integração backend real | API conectada |
| S6 | Re-auditoria completa | Relatório v2 |

---

## 4. Matriz de priorização (RICE)

| Item | Reach | Impact | Confidence | Effort | Score |
|------|-------|--------|------------|--------|-------|
| Alt text em imagens | 100% | Alto | 95% | Baixo | **Alta** |
| Open Graph / Twitter Cards | 80% | Alto | 90% | Baixo | **Alta** |
| JSON-LD structured data | 60% | Médio | 85% | Médio | Média |
| Skip navigation link | 15% | Alto | 95% | Baixo | Média |
| Páginas legais (Termos, Jogo Responsável) | 100% | Alto | 90% | Médio | **Alta** |
| Testes E2E automatizados | 100% | Alto | 80% | Alto | Média |
| Dark/Light mode | 40% | Baixo | 70% | Alto | Baixa |

---

## 5. Referências

- [Google Search Central — SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [Lei 14.790/2023 — Apostas esportivas](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2023/lei/l14790.htm)
- [Core Web Vitals](https://web.dev/vitals/)
- [React Router v7 docs](https://reactrouter.com/)

---

## 6. Próxima revisão

**Data prevista:** 14 de agosto de 2026  
**Responsável:** Equipe de desenvolvimento  
**Gatilho de re-auditoria:** Após merge de correções SEO/a11y ou integração backend
