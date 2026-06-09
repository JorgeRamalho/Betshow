# 📂 ESTRUTURA DE ARQUIVOS - BetShow

## 🌳 Árvore Completa do Projeto

```
Projeto-Betshow/
│
├── 📄 Arquivos Raiz
│   ├── index.html                    # Arquivo HTML raiz com Vite redirect
│   ├── package.json                  # Dependências (React, Router, Vite)
│   ├── tsconfig.json                # Configuração TypeScript
│   ├── vite.config.ts               # Configuração Vite
│   ├── README.md                    # Overview rápido
│   ├── DOCUMENTACAO-COMPLETA.md     # Documentação extensa (40+ seções)
│   ├── GUIA-DESENVOLVIMENTO.md      # Referência para desenvolvedores
│   ├── SUMARIO-EXECUTIVO.md         # Este sumário
│   ├── ESTRUTURA-ARQUIVOS.md        # Este arquivo
│   └── ACESSO-REMOTO.md             # Instruções de acesso remoto
│
├── 📁 src/ - Código-fonte principal
│   │
│   ├── 📁 components/ - Componentes reutilizáveis (20+)
│   │   ├── Header.tsx + Header.css            # Navegação principal
│   │   ├── Footer.tsx + Footer.css            # Rodapé com links
│   │   ├── Hero.tsx + Hero.css                # Seção hero
│   │   ├── TrustBar.tsx + TrustBar.css        # Barra de confiança
│   │   ├── PromoCards.tsx + PromoCards.css    # Cards de promoção
│   │   ├── Copa2026Banner.tsx + Copa2026Banner.css  # Banner Copa
│   │   ├── Ambassadors.tsx + Ambassadors.css  # Embaixadores
│   │   ├── AmbassadorSuggestions.tsx + .css   # Sugestões embaixadores
│   │   ├── LiveOdds.tsx + LiveOdds.css        # Odds ao vivo
│   │   ├── SportsArena.tsx + SportsArena.css  # Arena de esportes
│   │   ├── CommunityAffinity.tsx + .css       # Comunidade
│   │   ├── FamilyClub.tsx + FamilyClub.css    # Programa VIP
│   │   ├── RegisterCPF.tsx + RegisterCPF.css  # CTA cadastro
│   │   ├── PhotoCloseup.tsx + PhotoCloseup.css # Fotos
│   │   ├── Avatar.tsx + Avatar.css            # Avatares de usuários
│   │   ├── InfoCard.tsx + InfoCard.css        # Card de informação [NOVO]
│   │   ├── Modal.tsx + Modal.css              # Diálogo modal [NOVO]
│   │   ├── Spinner.tsx + Spinner.css          # Loader/spinner [NOVO]
│   │   └── 📁 brand/
│   │       ├── Logo.tsx + Logo.css            # Logo BetShow
│   │
│   ├── 📁 pages/ - Páginas principais
│   │   ├── HomePage.tsx                       # Home/Landing page
│   │   ├── 📁 auth/
│   │   │   ├── LoginPage.tsx                  # Login com email/senha
│   │   │   └── RegisterPage.tsx               # Cadastro em 5 passos
│   │   ├── 📁 payment/
│   │   │   └── PaymentPage.tsx                # Depósito/pagamento
│   │   ├── 📁 user/
│   │   │   └── UserDashboardPage.tsx          # Dashboard usuário
│   │   └── 📁 admin/
│   │       └── AdminDashboardPage.tsx         # Dashboard admin
│   │
│   ├── 📁 layouts/ - Layouts estruturais
│   │   └── DashboardLayout.tsx                # Layout dashboards (sidebar + main)
│   │
│   ├── 📁 contexts/ - React Context (State global)
│   │   └── AuthContext.tsx                    # Autenticação global + user state
│   │
│   ├── 📁 types/ - Tipos TypeScript
│   │   ├── user.ts                            # UserProfile, RegisterFormData, etc
│   │   ├── bet.ts                             # Bet, UserBetStats, BetStatus
│   │   └── payment.ts                         # Transaction, FinancialSummary
│   │
│   ├── 📁 utils/ - Funções utilitárias
│   │   ├── validators.ts                      # isValidCPF, isValidEmail, etc
│   │   └── formatters.ts                      # formatCurrency, formatDate, etc
│   │
│   ├── 📁 data/ - Dados mock e constantes
│   │   ├── brand.ts                           # BRAND (nome, slogan, cores)
│   │   ├── ambassadors.ts                     # Lista de embaixadores
│   │   ├── ambassadorSuggestions.ts           # Sugestões de embaixadores
│   │   ├── avatars.ts                         # Lista de avatares
│   │   ├── mockUserDashboard.ts               # Mock stats, bets, chart data
│   │   └── mockAdminDashboard.ts              # Mock financeiro, transactions, users
│   │
│   ├── 📁 styles/ - Folhas de estilo CSS
│   │   ├── tokens.css                         # Design system (cores, tipografia, espaçamento)
│   │   ├── global.css                         # Estilos globais + animações + botões
│   │   ├── forms.css                          # Estilos de formulários
│   │   └── dashboard.css                      # Estilos de dashboards + tabelas
│   │
│   ├── 📁 routes/ - Roteamento
│   │   └── AppRouter.tsx                      # Todas as rotas da aplicação
│   │
│   ├── App.tsx                                # Componente raiz (BrowserRouter + AuthProvider)
│   └── main.tsx                               # Ponto de entrada React
│
├── 📁 public/ - Arquivos estáticos
│   └── assets/                                # Imagens, ícones, etc
│
├── 📁 docs/ - Documentação
│   ├── ESTRUTURA-ARQUIVOS.md                  # Este arquivo
│   └── chat-history/                          # Histórico de conversas (dev)
│
└── 📁 scripts/ - Scripts utilitários
    ├── start-public.ps1                       # Script PowerShell acesso público
    ├── start-remote.ps1                       # Script PowerShell acesso remoto
    └── export-chat-history.mjs                # Exportar histórico
```

---

## 📊 Mapa de Dependências

```
App.tsx
├── BrowserRouter
├── AuthProvider (Context)
└── AppRouter
    ├── HomePage
    │   ├── Header
    │   ├── Hero
    │   ├── TrustBar
    │   ├── PromoCards
    │   ├── Copa2026Banner
    │   ├── Ambassadors
    │   ├── AmbassadorSuggestions
    │   ├── LiveOdds
    │   ├── CommunityAffinity
    │   ├── SportsArena
    │   ├── FamilyClub
    │   ├── RegisterCPF
    │   └── Footer
    │
    ├── LoginPage
    │   ├── Logo
    │   └── useAuth()
    │
    ├── RegisterPage (5 Steps)
    │   ├── Logo
    │   ├── Validadores
    │   ├── Formatadores
    │   └── useAuth()
    │
    ├── PaymentPage
    │   ├── Logo
    │   ├── useAuth()
    │   └── formatCurrency()
    │
    ├── UserDashboardPage
    │   ├── DashboardLayout
    │   │   ├── Logo
    │   │   ├── Sidebar Nav
    │   │   └── useAuth()
    │   ├── StatCards
    │   ├── ChartBars
    │   ├── DataTable
    │   └── Badges
    │
    └── AdminDashboardPage
        ├── DashboardLayout
        │   ├── Logo
        │   ├── Sidebar Nav
        │   └── useAuth()
        ├── StatCards
        ├── DataTables
        └── Badges
```

---

## 🎯 Fluxo de Dados (State Management)

```
AuthContext (Global State)
├── user: UserProfile | null
├── isAuthenticated: boolean
└── Métodos:
    ├── login(email, password) → Promise<boolean>
    ├── loginAsAdmin(email, password) → Promise<boolean>
    ├── register(user: UserProfile) → void
    └── logout() → void

LocalStorage
├── "betshow_auth" → Serialized UserProfile
└── Persiste através de navegação
```

---

## 📱 Rotas da Aplicação

| Rota | Componente | Autenticação | Tipo |
|------|-----------|--------------|------|
| `/` | HomePage | ❌ Pública | Landing |
| `/login` | LoginPage | ❌ Pública | Auth |
| `/cadastro` | RegisterPage | ❌ Pública | Auth |
| `/pagamento` | PaymentPage | ✅ Obrigatória | Pagamento |
| `/dashboard` | UserDashboardPage | ✅ User only | Dashboard |
| `/dashboard/apostas` | UserDashboardPage | ✅ User only | Dashboard |
| `/admin` | AdminDashboardPage | ✅ Admin only | Dashboard |
| `/admin/apostas` | AdminDashboardPage | ✅ Admin only | Dashboard |
| `/admin/usuarios` | AdminDashboardPage | ✅ Admin only | Dashboard |

---

## 🔑 Chaves de Acesso ao Projeto

### 1. Entender Arquitetura
1. Leia `App.tsx` (raiz)
2. Leia `routes/AppRouter.tsx` (rotas)
3. Leia `contexts/AuthContext.tsx` (autenticação)
4. Explore `pages/` (páginas principais)

### 2. Entender Design
1. Abra `styles/tokens.css` (variáveis CSS)
2. Abra `styles/global.css` (estilos base)
3. Veja componentes em `components/` (reutilizáveis)

### 3. Entender Validação
1. Abra `utils/validators.ts` (funções de validação)
2. Abra `pages/auth/RegisterPage.tsx` (uso de validadores)
3. Abra `types/user.ts` (tipos TypeScript)

### 4. Entender Estado
1. Abra `contexts/AuthContext.tsx` (context)
2. Veja uso com `useAuth()` em qualquer página

---

## 🛠️ Padrões de Código

### Componente Típico
```typescript
// src/components/MyComponent.tsx
import "./MyComponent.css";

type MyComponentProps = {
  title: string;
  onClick?: () => void;
};

export default function MyComponent({ title, onClick }: MyComponentProps) {
  return <div className="my-component">{title}</div>;
}
```

### Página Típica
```typescript
// src/pages/MyPage.tsx
import { useAuth } from "../contexts/AuthContext";

export default function MyPage() {
  const { user } = useAuth();
  
  return (
    <div className="page">
      <h1>Olá, {user?.fullName}</h1>
    </div>
  );
}
```

### Validação Típica
```typescript
import { isValidCPF, formatCPF } from "@/utils/validators";

const cpfValue = formatCPF(input);  // "111.444.777-35"
const isValid = isValidCPF(cpfValue); // true
```

---

## 📊 Contagem de Arquivos

| Tipo | Qtd | Detalhes |
|------|-----|----------|
| **Componentes TSX** | 20+ | Header, Footer, Pages, etc |
| **Estilos CSS** | 30+ | 1 por componente + globals |
| **Tipos TS** | 5 | user, bet, payment |
| **Páginas** | 6 | Home, Auth, Dashboard (user/admin), Payment |
| **Documentos MD** | 4 | README, Docs, Guia, Sumário |
| **Configuração** | 4 | vite.config, tsconfig, package.json |
| **Total** | 70+ | Projeto completo |

---

## ⚡ Performance Tips

### Otimizações Implementadas
- ✅ CSS crítico inlined em `global.css`
- ✅ Componentes com lazy loading ready
- ✅ Gradientes no CSS (não imagens)
- ✅ Animações em CSS/transforms (not JS)
- ✅ LocalStorage para cache de auth

### Otimizações Recomendadas (Produção)
- Code splitting com React.lazy()
- Image optimization com Vite
- CSS minification automática (Vite)
- Font preload em index.html
- Service Worker para offline support

---

## 🔒 Segurança por Arquivo

| Arquivo | Recomendação |
|---------|-------------|
| `AuthContext.tsx` | ⚠️ Implementar JWT tokens |
| `validators.ts` | ✅ Validações front-end completas |
| `utils/` | ✅ Sem lógica sensível |
| `types/` | ✅ Apenas tipos, sem secrets |
| `data/` | ✅ Dados mock apenas |

---

## 📦 Como Importar Módulos

```typescript
// Importar componente
import Header from "@/components/Header";

// Importar página
import HomePage from "@/pages/HomePage";

// Importar tipo
import type { UserProfile } from "@/types/user";

// Importar context
import { useAuth } from "@/contexts/AuthContext";

// Importar utils
import { formatCurrency } from "@/utils/formatters";
import { isValidEmail } from "@/utils/validators";

// Importar dados
import { BRAND } from "@/data/brand";
import { MOCK_USER_STATS } from "@/data/mockUserDashboard";
```

---

## 🚀 Próximos Passos para Desenvolvimento

### 1. Backend Integration (Prioridade Alta)
- [ ] Conectar API endpoints
- [ ] Substituir mock data por API calls
- [ ] Implementar JWT authentication
- [ ] Setup database

### 2. Testes (Prioridade Alta)
- [ ] Unit tests (Jest)
- [ ] Component tests (React Testing Library)
- [ ] E2E tests (Cypress)

### 3. Melhorias UX (Prioridade Média)
- [ ] Dark/Light mode toggle
- [ ] Notificações em tempo real
- [ ] Push notifications
- [ ] Analytics integration

### 4. DevOps (Prioridade Média)
- [ ] Docker setup
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Environment variables management
- [ ] Monitoring & logging

---

## 📞 Dúvidas Frequentes

**P: Onde mudo as cores?**  
R: Edite `styles/tokens.css` (seção `:root`)

**P: Como adiciono um componente novo?**  
R: Crie TSX + CSS em `components/`, importe em página

**P: Como integro API?**  
R: Substitua mock data por fetch/axios calls em pages

**P: Como faço login de verdade?**  
R: Integre JWT em `AuthContext.tsx`

**P: Onde são salvos os dados?**  
R: Atualmente em localStorage (mock only)

---

**Projeto pronto para desenvolvimento! 🚀**

**© 2026 BetShow**
