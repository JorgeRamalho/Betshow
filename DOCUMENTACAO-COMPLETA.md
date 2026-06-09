# 🎯 BetShow - Plataforma de Apostas Esportivas Premium

**Betshow** é uma plataforma inovadora de apostas esportivas com foco na **Copa do Mundo 2026**, desenvolvida com React, TypeScript e Vite. Um projeto moderno que combina design impactante com funcionalidades robustas.

---

## 📋 Características Principais

### 🌟 Para Usuários
- ✅ **Cadastro completo com validação CPF** - 5 passos intuitivos
- ✅ **Login seguro** com autenticação via email/senha
- ✅ **Dashboard pessoal** com análise detalhada de apostas
- ✅ **Múltiplas opções de pagamento** (PIX, Cartão, Banco)
- ✅ **Sistema de bônus e cashback** - Promoção COPA2026
- ✅ **Dados em tempo real** de odds e eventos
- ✅ **Histórico de apostas** e estatísticas personalizadas

### 👨‍💼 Para Administradores
- ✅ **Dashboard financeiro completo**
- ✅ **Gestão de usuários e verificação KYC**
- ✅ **Monitoramento de apostas** e movimentações
- ✅ **Controle de pagamentos e saques**
- ✅ **Relatórios e análises** em tempo real

---

## 🎨 Design System

### Paleta de Cores
- **Verde Neon**: `#00ff87` (CTAs e destaques)
- **Ouro**: `#ffd700` (Premium e copa)
- **Ciano**: `#00d4ff` (Acentos)
- **Magenta**: `#ff006e` (Alertas)
- **Azul Copa**: `#1e3a8a` (Tema Copa 2026)

### Tipografia
- **Display**: Barlow Condensed (titles, headers)
- **Headlines**: Plus Jakarta Sans (700-800)
- **Body**: Plus Jakarta Sans (400-500)
- **Mono**: JetBrains Mono (dados)

### Componentes
```
Header | Navigation | Logo
Footer | Auth Pages | Dashboards
Forms  | Cards      | Tables
Badges | Alerts     | Modals
```

---

## 🚀 Como Começar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
# 1. Clonar repositório
git clone <repo-url>
cd Projeto-Betshow

# 2. Instalar dependências
npm install

# 3. Executar em desenvolvimento
npm run dev

# 4. Acessar em navegador
# http://localhost:5173
```

### Scripts Disponíveis

```bash
npm run dev          # Iniciar servidor de desenvolvimento (Vite)
npm run build        # Compilar para produção (dist/)
npm run preview      # Visualizar build em produção
npm run live         # Preparar para Live Server

# Acesso remoto
npm start            # Iniciar com Cloudflared tunnel
npm run tunnel       # Abrir URL pública
npm run public       # Script PowerShell para acesso público
```

---

## 📁 Estrutura do Projeto

```
Projeto-Betshow/
├── src/
│   ├── components/          # Componentes React reutilizáveis
│   │   ├── Header.tsx       # Navegação principal
│   │   ├── Footer.tsx       # Rodapé
│   │   ├── Hero.tsx         # Seção hero
│   │   ├── Copa2026Banner.tsx
│   │   ├── Ambassadors.tsx  # Embaixadores da marca
│   │   ├── LiveOdds.tsx     # Odds em tempo real
│   │   ├── SportsArena.tsx  # Arena de esportes
│   │   ├── PromoCards.tsx   # Cards de promoção
│   │   ├── InfoCard.tsx     # Card de informação genérica
│   │   ├── Modal.tsx        # Diálogo modal
│   │   ├── Spinner.tsx      # Carregamento
│   │   └── brand/
│   │       └── Logo.tsx     # Logo BetShow
│   │
│   ├── pages/               # Páginas da aplicação
│   │   ├── HomePage.tsx     # Home principal
│   │   ├── auth/
│   │   │   ├── LoginPage.tsx      # Login
│   │   │   └── RegisterPage.tsx   # Cadastro (5 passos)
│   │   ├── payment/
│   │   │   └── PaymentPage.tsx    # Pagamento
│   │   ├── user/
│   │   │   └── UserDashboardPage.tsx  # Dashboard do usuário
│   │   └── admin/
│   │       └── AdminDashboardPage.tsx # Dashboard Admin
│   │
│   ├── layouts/             # Layouts reutilizáveis
│   │   └── DashboardLayout.tsx
│   │
│   ├── contexts/            # React Contexts
│   │   └── AuthContext.tsx  # Autenticação global
│   │
│   ├── types/               # Tipos TypeScript
│   │   ├── user.ts          # Tipos de usuário
│   │   ├── bet.ts           # Tipos de apostas
│   │   └── payment.ts       # Tipos de pagamento
│   │
│   ├── utils/               # Funções utilitárias
│   │   ├── validators.ts    # Validações (CPF, email, etc.)
│   │   └── formatters.ts    # Formatação (moeda, datas)
│   │
│   ├── data/                # Dados mock e constantes
│   │   ├── brand.ts         # Identidade visual
│   │   ├── ambassadors.ts   # Dados de embaixadores
│   │   ├── mockUserDashboard.ts    # Mock dados usuário
│   │   └── mockAdminDashboard.ts   # Mock dados admin
│   │
│   ├── styles/              # Estilos CSS
│   │   ├── tokens.css       # Design tokens (cores, tipografia)
│   │   ├── global.css       # Estilos globais
│   │   ├── forms.css        # Estilos de formulários
│   │   └── dashboard.css    # Estilos de dashboards
│   │
│   ├── routes/
│   │   └── AppRouter.tsx    # Definição de rotas
│   │
│   ├── App.tsx              # Componente raiz
│   └── main.tsx             # Ponto de entrada
│
├── public/                  # Arquivos estáticos
├── docs/                    # Documentação
├── index.html               # HTML raiz
├── package.json             # Dependências
├── tsconfig.json            # Config TypeScript
├── vite.config.ts           # Config Vite
└── README.md                # Este arquivo
```

---

## 🔐 Credenciais de Teste

### Usuário Regular
```
Email: teste@betshow.com
Senha: Senha123
```

### Admin
```
Email: admin@betshow.com
Senha: Admin@2026
```

---

## 📊 Funcionalidades Detalhadas

### 1️⃣ Autenticação & Cadastro

**RegisterPage** (5 Passos):
1. **Dados Pessoais** - Nome, CPF, Data de nascimento
2. **Contato** - Email, Telefone, Endereço
3. **Segurança** - Senha (min. 8 chars, 1 maiúscula, 1 número)
4. **Pagamento** - PIX, Cartão ou Banco
5. **Revisão** - Confirmar dados + aceitar termos

**Validações**:
- CPF válido com algoritmo real
- Email único
- Telefone com formato brasileiro
- Senha forte
- CEP com formatação automática

---

### 2️⃣ Dashboard do Usuário

**Seções**:
- **Visão Geral** - Saldo, bônus, cashback
- **Análise de Dados**
  - Total de apostas
  - Taxa de acerto (win rate)
  - Lucro/Prejuízo
  - ROI estimado
  - Performance mensal (gráfico)
  
- **Histórico de Apostas**
  - Status (pending, won, lost, cancelled)
  - Odds, Stakes, Retorno potencial
  - Filtros por esporte/liga

- **Atividades Recentes**
  - Apostas vencidas
  - Bônus creditados
  - Cashback recebido
  - Depósitos realizados

---

### 3️⃣ Dashboard Admin

**Gestão Financeira**:
- Total de depósitos e saques
- Volume de apostas (GMV)
- Receita da plataforma
- Payouts pendentes
- Análise de usuários ativos

**Gestão de Movimentações**:
- Transações recentes (deposit, withdrawal, win, bonus)
- Status de processamento
- Histórico com timestamps

**Gestão de Apostas**:
- Monitoramento em tempo real
- Status das apostas (pending, won, lost)
- Usuário responsável
- Valor da aposta

**Gestão de Usuários**:
- Lista completa de usuários
- Saldo individual
- Número de apostas
- Status KYC (verificação)
- Ações de gerenciamento

---

### 4️⃣ Página Home (Landing Page)

Seções principais:
- **Hero** - CTA principal e slogan
- **Copa 2026 Banner** - Destaque da promoção
- **Trust Bar** - Certificações
- **Promo Cards** - Ofertas especiais
- **Ambassadors** - Embaixadores da marca
- **Live Odds** - Odds em tempo real
- **Sports Arena** - Esportes disponíveis
- **Community Affinity** - Comunidade
- **Family Club** - Programa VIP
- **Register CPF** - CTA secundário

---

## 🎯 Fluxo de Usuário

```
Home
  ├─ [Não autenticado]
  │   ├─ Navegar pelo site
  │   ├─ Clicar "Cadastrar CPF"
  │   └─ → RegisterPage (5 passos)
  │       └─ Confirmar
  │           └─ → PaymentPage
  │               └─ Depósito
  │                   └─ → Dashboard (usuário)
  │
  └─ [Autenticado]
      ├─ Ir ao Dashboard
      ├─ Visualizar apostas
      ├─ Depositar (PaymentPage)
      └─ Sair
```

---

## 🔌 Integração com Backend

Estrutura preparada para integração:

```typescript
// Exemplo de API call (mockado atualmente)
const [user, setUser] = useAuth();

// Para integrar com API real:
// const response = await fetch('/api/users/register', {
//   method: 'POST',
//   body: JSON.stringify(formData)
// });
```

---

## 📱 Responsividade

- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (320px - 767px)
- ✅ CSS Grid + Flexbox
- ✅ Viewport meta tag
- ✅ Media queries otimizadas

---

## ♿ Acessibilidade

- ✅ Semântica HTML5
- ✅ ARIA labels
- ✅ Contraste de cores (WCAG AA)
- ✅ Teclado navegável
- ✅ Redução de movimento (`prefers-reduced-motion`)
- ✅ Formulários com validação clara

---

## 🚀 Deploy

### Build para Produção
```bash
npm run build
# Gera pasta dist/ pronta para deploy
```

### Opções de Deploy
- **Vercel** - `vercel deploy`
- **Netlify** - Conectar repositório
- **GitHub Pages** - Settings → Pages
- **Cloudflare Pages** - Drag-and-drop dist/

---

## 🛠️ Tecnologias Utilizadas

| Categoria | Tecnologia |
|-----------|-----------|
| **Frontend** | React 19, TypeScript 5.7 |
| **Build** | Vite 6.0 |
| **Roteamento** | React Router 7.17 |
| **Fontes** | Google Fonts (Plus Jakarta Sans, Barlow) |
| **Ícones** | Emojis nativos |
| **CSS** | CSS3 (Grid, Flexbox, Animations) |

---

## 📝 Notas Importantes

### 🔴 Regulação
- Operação sob Lei 14.790/2023 (regulação brasileira)
- Verificação obrigatória de CPF (KYC)
- Recolhimento de impostos à Receita Federal
- Proibido para menores de 18 anos
- Jogo responsável implementado

### 🔵 Dados Mock
- Todos os dados atualmente são simulados
- Use para desenvolvimento e demonstração
- Dados persistem em localStorage (sessão do navegador)
- Integração com backend é necessária para produção

### 🟢 Segurança (Implementar em Produção)
- ❌ Senhas armazenadas em plain text (mock only!)
- ❌ localStorage não é seguro (use JWT + HttpOnly cookies)
- ❌ Sem validação server-side (essencial em produção)
- ⚠️ HTTPS obrigatório em produção
- ⚠️ CORS e CSRF protection necessários

---

## 🐛 Troubleshooting

### Porta 5173 já em uso?
```bash
npm run dev -- --port 5174
```

### Build errors?
```bash
# Limpar cache
rm -rf node_modules dist
npm install
npm run build
```

### Live Server não funciona?
```bash
# Rodar antes:
npm run live
# Depois abrir index.html com Live Server
```

---

## 📞 Suporte

- **Email**: support@betshow.com
- **Central 24/7**: 0800-000-0000
- **Ouvidoria**: ouvidoria@betshow.com
- **Jogo Responsável**: https://www.jogosresponsavel.gov.br

---

## 📄 Licença

Projeto fictício para demonstração e aprendizado. Simples, direto e com foco educativo.

**© 2026 BetShow. Todos os direitos reservados.**

---

## 🎉 Obrigado!

Obrigado por usar **BetShow**! Para mais informações, visite:
- 🌐 Website: https://betshow.com.br (fictício)
- 📱 Mobile: Apps iOS e Android em breve
- 🐦 Twitter: @BetShow2026
- 📸 Instagram: @BetShowBr

**Sua paixão vira vitória. 🎯⚽🏆**
