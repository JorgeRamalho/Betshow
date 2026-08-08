# Auditoria Completa — BetShow

**Data:** 07 de agosto de 2026  
**Ambiente testado:** http://127.0.0.1:5500/ (Live Server — build `dist/`)  
**Ferramenta:** Playwright MCP  
**Versão:** React 19 + TypeScript 5.7 + Vite 6  

---

## Sumário executivo

| Área | Nota | Status |
|------|------|--------|
| SEO técnico | 6.5/10 | ⚠️ Melhorias necessárias |
| Acessibilidade | 6.0/10 | ⚠️ Imagens sem alt (82%) |
| Performance (local) | 9.0/10 | ✅ DCL ~280ms |
| Responsividade | 8.0/10 | ✅ Sem overflow horizontal |
| Identidade visual | 9.5/10 | ✅ Design system robusto |
| UX / UI | 8.5/10 | ✅ Landing rica, fluxos claros |
| Estrutura de código | 9.0/10 | ✅ Bem organizado |
| Documentação | 8.5/10 | ✅ Reorganizada nesta auditoria |
| Regulatório (BR) | 7.0/10 | ⚠️ Links legais incompletos |

**Nota geral: 8.0/10** — Projeto maduro e pronto para evolução; priorizar SEO, acessibilidade e páginas legais.

---

## 1. SEO (Search Engine Optimization)

### 1.1 Resultados Playwright

| Elemento | Valor | Avaliação |
|----------|-------|-----------|
| `<title>` | BetShow — Apostas Esportivas Premium (36 chars) | ✅ Ideal (50–60) |
| `meta description` | 121 chars — bônus, CPF, regulada | ✅ Adequado |
| `lang` | `pt-BR` | ✅ Correto |
| `<h1>` | 1 único — "Sua paixão pelo jogo vira vitória" | ✅ Correto |
| `<h2>` | 9 seções | ✅ Hierarquia boa |
| `canonical` | Ausente | ❌ Adicionar |
| `robots` | Ausente | ⚠️ Definir em produção |
| Open Graph | Ausente (og:title, og:description, og:image) | ❌ Crítico para compartilhamento |
| Twitter Cards | Ausente | ❌ Adicionar |
| JSON-LD | 0 scripts | ❌ Adicionar Organization + WebSite |
| Imagens sem `alt` | **28 de 34 (82%)** | ❌ Crítico |
| Links sem texto | 0 | ✅ OK |
| Favicon | `favicon.svg` presente | ✅ OK |

### 1.2 Recomendações SEO

```html
<!-- Adicionar em index.html -->
<link rel="canonical" href="https://betshow.netlify.app/" />
<meta property="og:title" content="BetShow — Apostas Esportivas Premium" />
<meta property="og:description" content="Apostas esportivas seguras, bônus exclusivos e Copa 2026." />
<meta property="og:image" content="https://betshow.netlify.app/assets/og-cover.jpg" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
```

**Prioridade:** Alta — impacto direto em CTR e compartilhamento social.

---

## 2. Acessibilidade (WCAG 2.1)

### 2.1 Resultados

| Critério | Resultado | Status |
|----------|-----------|--------|
| Skip link (`#main`) | Ausente | ❌ |
| Landmarks | header(5), nav(1), main(1), footer(1) | ⚠️ Múltiplos headers |
| Botões sem label | 0 de 65 | ✅ |
| Inputs sem label | 1 | ⚠️ Corrigir |
| Elementos focáveis | 116 | ✅ Navegação rica |
| ARIA roles | list, tablist, tab, dialog, region | ✅ Componentes interativos |
| Contraste | Neon verde (#00ff87) sobre fundo escuro | ✅ Alto contraste |
| Imagens decorativas | Sem `alt=""` explícito | ❌ |

### 2.2 Problemas críticos

1. **Hero sports carousel** — 10 imagens Unsplash sem `alt` descritivo
2. **Embaixadores / avatares** — fotos sem texto alternativo
3. **Ausência de skip navigation** — prejudica usuários de leitores de tela
4. **5 elementos `<header>`** — pode confundir navegação por landmarks

### 2.3 Ações recomendadas

```tsx
// Exemplo: Hero.tsx
<img src={sport.src} alt={`Apostas em ${sport.label}`} loading="lazy" />
```

```html
<!-- HomePage.tsx — adicionar no início -->
<a href="#main" className="skip-link">Ir para o conteúdo</a>
<main id="main">
```

---

## 3. Performance

### 3.1 Métricas (ambiente local build)

| Métrica | Valor |
|---------|-------|
| DOM Content Loaded | ~280ms |
| Load Complete | ~281ms |
| Recursos carregados | 21 |
| Scripts | 3 |
| Stylesheets | 2 |

### 3.2 Observações

- Build estático via Vite — excelente para CDN
- Google Fonts carregadas via CDN (preconnect presente)
- Imagens externas (Unsplash) — considerar self-hosting ou CDN com resize
- Sem lazy loading explícito nas imagens do Hero

### 3.3 Recomendações

- [ ] `loading="lazy"` em imagens below-the-fold
- [ ] `font-display: swap` já aplicado via Google Fonts URL
- [ ] Lighthouse CI no pipeline GitHub Actions
- [ ] Code splitting com `React.lazy()` para dashboards

---

## 4. Responsividade

### 4.1 Breakpoints testados

| Viewport | Largura | Resultado |
|----------|---------|-----------|
| Mobile | 375×812 | ✅ Layout adaptado |
| Tablet | 768×1024 | ✅ Grid responsivo |
| Desktop | 1920×1080 | ✅ Layout completo |

### 4.2 Comportamento mobile (≤ 900px)

- Menu hambúrguer ativado (`Header.tsx` — `MOBILE_MAX = 900`)
- `body.menu-lock` ao abrir menu
- Tipografia fluida via `clamp()` em `--text-hero`
- **Sem overflow horizontal** detectado

### 4.3 Screenshots

Capturas salvas em `docs/06-auditoria/screenshots/`:
- `audit-desktop-1920.png` — página completa desktop
- `audit-mobile-375.png` — página completa mobile
- `audit-mobile-hero-375.png` — viewport hero mobile

---

## 5. Layout e estrutura da página

### 5.1 Seções da Home (12 sections, ~8821px altura)

| Ordem | Seção | ID âncora | Componente |
|-------|-------|-----------|------------|
| 1 | Market Status | — | MarketStatusBar |
| 2 | Hero | `#hero-title` | Hero |
| 3 | Calendário | `#calendario` | MatchCalendar |
| 4 | Copa 2026 | `#copa2026` | Copa2026Banner |
| 5 | Trust Bar | — | TrustBar |
| 6 | Promoções | `#bonus` | PromoCards |
| 7 | Sports Ticker | — | SportsTicker |
| 8 | Odds ao vivo | `#odds` | LiveOdds |
| 9 | Comunidade | — | CommunityAffinity |
| 10 | Esportes | `#esportes` | SportsArena |
| 11 | Family Club | — | FamilyClub |
| 12 | Cadastro CPF | `#cadastro` | RegisterCPF |

### 5.2 Avaliação de layout

| Aspecto | Nota | Comentário |
|---------|------|------------|
| Hierarquia visual | 9/10 | Hero impactante, seções bem delimitadas |
| Densidade de informação | 8/10 | Rica mas não sobrecarregada |
| CTAs | 9/10 | Múltiplos pontos de conversão |
| Navegação sticky | 8/10 | Header com scroll threshold |
| Footer | 8/10 | Links legais parciais |
| Back to top | ✅ | Componente presente |
| Cookie consent | ✅ | Componente presente |

---

## 6. Identidade visual

### 6.1 Paleta (Design Tokens — `tokens.css`)

| Token | Valor | Uso |
|-------|-------|-----|
| `--neon-green` | `#00ff87` | CTA primário, destaques |
| `--gold` | `#ffd700` | Promoções, Copa 2026 |
| `--cyan` | `#00d4ff` | Acentos secundários |
| `--magenta` | `#ff006e` | Alertas, urgência |
| `--bg-deep` | `#050810` | Fundo principal |
| `--bg-card` | `#161f35` | Cards elevados |

**Total:** 69 variáveis CSS — design system profissional.

### 6.2 Brand (`brand.ts`)

- **Nome:** BetShow
- **Slogan:** "Sua paixão vira vitória"
- **Tagline:** Apostas esportivas premium · Copa 2026
- **Promo:** COPA2026 — R$ 500 bônus — 15% cashback

### 6.3 Conceito visual

- **Estética:** Dark mode premium com neon esportivo
- **Tema:** Copa do Mundo 2026 (EUA · Canadá · México)
- **Tom:** Energia, confiança, exclusividade
- **Consistência:** Alta entre componentes

---

## 7. Tipografia

### 7.1 Fontes

| Papel | Família | Peso | Uso |
|-------|---------|------|-----|
| Display | Barlow Condensed | 600–800 | H1, títulos hero |
| Body / Headline | Plus Jakarta Sans | 400–800 | Texto, subtítulos |
| Mono | JetBrains Mono | — | Código (definido, pouco usado) |

### 7.2 Escala (computada no Hero desktop)

| Elemento | Tamanho | Line-height |
|----------|---------|-------------|
| Body | 16px | 25.6px (1.6) |
| H1 Hero | 88px (desktop) / clamp mobile | 1.15 |

### 7.3 Avaliação

- ✅ Combinação display + sans-serif moderna
- ✅ Escala fluida com `clamp()`
- ✅ Preconnect para Google Fonts
- ⚠️ Dependência externa — considerar self-host para LGPD/performance

---

## 8. UX (User Experience)

### 8.1 Jornadas mapeadas

```
Visitante → Home → Cadastro (5 passos) → Pagamento → Dashboard
                → Login → Dashboard / Admin
```

### 8.2 Pontos fortes

- Cadastro wizard em 5 passos reduz fricção cognitiva
- Validação CPF real aumenta confiança
- Trust bar com selos de segurança
- Live odds simuladas criam senso de urgência
- Navegação por âncoras na home

### 8.3 Pontos de melhoria

| Problema | Impacto | Sugestão |
|----------|---------|----------|
| Footer "Termos de uso" → `#` | Legal | Criar página `/termos` |
| "Jogo responsável" → `#` | Regulatório | Página dedicada obrigatória |
| Título único em todas as rotas | SEO | `react-helmet` ou meta dinâmico |
| Auth mock (localStorage) | Segurança | Integrar backend JWT |
| Sem feedback de loading global | UX | Spinner em transições de rota |

### 8.4 Heurísticas de Nielsen

| Heurística | Nota |
|------------|------|
| Visibilidade do status | 8/10 — Market status bar |
| Correspondência sistema/mundo real | 9/10 — Terminologia de apostas |
| Controle e liberdade | 8/10 — Voltar no wizard cadastro |
| Consistência | 9/10 — Design system |
| Prevenção de erros | 9/10 — Validações robustas |
| Reconhecimento vs recall | 8/10 — Labels claros |
| Flexibilidade | 7/10 — Sem atalhos avançados |
| Design minimalista | 8/10 — Landing longa mas organizada |
| Recuperação de erros | 8/10 — Mensagens de validação |
| Ajuda | 6/10 — Suporte no footer sem página |

---

## 9. UI Design

### 9.1 Componentes avaliados

| Componente | Qualidade | Observação |
|------------|-----------|------------|
| Header | ⭐⭐⭐⭐⭐ | Sticky, mobile menu, auth state |
| Hero | ⭐⭐⭐⭐⭐ | Carousel, CTAs, social proof |
| PromoCards | ⭐⭐⭐⭐ | Cards com gradientes |
| LiveOdds | ⭐⭐⭐⭐ | Tabs interativas |
| SportsArena | ⭐⭐⭐⭐ | Grid de esportes |
| Modal | ⭐⭐⭐⭐ | ARIA dialog |
| CookieConsent | ⭐⭐⭐⭐ | LGPD compliance |
| Dashboard | ⭐⭐⭐⭐ | Sidebar + stats |

### 9.2 Microinterações

- Transições CSS (`--transition: 0.25s cubic-bezier`)
- Glow effects em CTAs (`--shadow-glow-green`)
- Hover states em cards e botões
- Scroll-triggered header background

---

## 10. Estratégias de desenvolvimento

### 10.1 Stack e padrões

| Camada | Tecnologia | Padrão |
|--------|------------|--------|
| UI | React 19 + TS | Componentes funcionais |
| Roteamento | React Router 7 | SPA com rotas protegidas |
| Estado | Context API | AuthContext global |
| Estilos | CSS Modules por componente | BEM-like naming |
| Build | Vite 6 | ESM, HMR, tree-shaking |
| Backend | Node + Express | REST API separada |
| Deploy | Netlify + GH Pages | CI/CD automático |

### 10.2 Qualidade de código

- ✅ TypeScript strict — zero erros
- ✅ Separação pages / components / utils / types
- ✅ Design tokens centralizados
- ✅ Validadores reutilizáveis (CPF, email, senha)
- ✅ Proxy `/api` no Vite para dev mobile

### 10.3 Débito técnico

| Item | Prioridade |
|------|------------|
| Testes automatizados (0%) | Alta |
| Meta tags dinâmicas por rota | Média |
| Alt text em imagens | Alta |
| Integração backend real | Alta |
| Páginas legais faltantes | Alta |

---

## 11. Formato e estrutura de texto

### 11.1 Tom de voz

- **Direto e motivacional:** "Sua paixão vira vitória"
- **Urgência controlada:** "Odds turbinadas", "Ao vivo"
- **Confiança:** "100% regulada", "CPF verificado"
- **Brasileiro:** Referências à Lei 14.790/2023, PIX, CPF

### 11.2 Consistência textual

| Elemento | Consistência |
|----------|--------------|
| Nome da marca | BetShow (B e S maiúsculos) — consistente |
| Slogan | Presente em brand.ts e Hero |
| CTAs | "Cadastre-se", "Apostar agora" — variados |
| Avisos legais | Footer completo, links parciais |

---

## 12. Páginas internas (amostra)

| Rota | Carregou | Formulário | Observação |
|------|----------|------------|------------|
| `/login` | ✅ | ✅ | Email + senha, link cadastro |
| `/cadastro` | ✅ | ✅ | Wizard 5 passos |
| `/privacidade` | ✅ | — | Página legal |
| `/cookies` | ✅ | — | Página legal |

---

## 13. Plano de ação priorizado

### 🔴 Prioridade alta (Sprint 1) — ✅ Concluída

1. ~~Adicionar `alt` em todas as imagens~~
2. ~~Implementar Open Graph + Twitter Cards~~
3. ~~Criar páginas `/termos` e `/jogo-responsavel`~~
4. ~~Adicionar skip navigation link~~
5. ~~Meta title dinâmico por rota~~

### 🟡 Prioridade média (Sprint 2) — ✅ Concluída

6. ~~JSON-LD structured data (Organization, WebSite)~~
7. ~~Link canonical em produção~~
8. ~~Lazy loading em imagens (Hero)~~
9. ~~Testes E2E Playwright (`tests/e2e/`)~~
10. ~~Lighthouse CI no GitHub Actions~~
11. ~~Imagem OG dedicada (`public/assets/og-cover.png`)~~

### 🟢 Prioridade baixa (Sprint 3) — ✅ Concluída

12. ~~Self-host Google Fonts~~ (`@fontsource`, subset latino)
13. ~~Dark/Light mode toggle~~ (`ThemeContext` + `ThemeToggle`)
14. ~~PWA + Service Worker~~ (`vite-plugin-pwa`, manifest, cache Unsplash)
15. ~~Analytics (GA4 + PostHog)~~ (`src/services/analytics.ts`, consent-aware)

---

## 14. Organização realizada nesta auditoria

### Documentação reorganizada

```
docs/
├── 00-INDEX.md
├── 01-inicio/          ← LEIA-PRIMEIRO, SETUP
├── 02-desenvolvimento/ ← GUIA, ACESSO-REMOTO, BACKEND-SETUP
├── 03-arquitetura/     ← ESTRUTURA-ARQUIVOS (consolidado)
├── 04-produto/         ← DOCUMENTACAO-COMPLETA, SUMARIO-EXECUTIVO
├── 05-qualidade/       ← VERIFICACAO-FINAL
└── 06-auditoria/       ← Este relatório + plano + mapeamento
```

### Raiz limpa

Mantidos apenas: configs, `index.html`, `package.json`, `README.md`, `docker-compose.yml`, `netlify.toml`.

---

## 15. Conclusão

O **BetShow** é um projeto frontend de **alto nível** para uma plataforma de apostas esportivas, com design system maduro, componentização exemplar e documentação profissional. A varredura Playwright em `http://127.0.0.1:5500/` confirmou carregamento rápido, layout responsivo e estrutura semântica adequada na home.

As principais lacunas estão em **SEO social** (Open Graph), **acessibilidade de imagens** (82% sem alt) e **completude legal** (termos e jogo responsável). Com as correções do plano de ação Sprint 1, o projeto estará pronto para indexação, compartilhamento e conformidade regulatória brasileira.

---

**Próxima auditoria:** 14/08/2026  
**Documentos relacionados:**
- [Plano de Pesquisa](./PLANO-DE-PESQUISA.md)
- [Mapeamento do Ecossistema](./MAPEAMENTO-ECOSSISTEMA.md)
- [Índice geral](../00-INDEX.md)

**© 2026 BetShow — Auditoria técnica**
