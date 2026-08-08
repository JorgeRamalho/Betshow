# 🚀 Guia Rápido de Desenvolvimento

## Início Rápido (5 minutos)

```bash
# 1. Instalar dependências
npm install

# 2. Rodar servidor de desenvolvimento
npm run dev

# 3. Abrir navegador
# http://localhost:5173
```

---

## Fluxo de Teste Recomendado

### 1. Home Page
- Visualizar design e hero
- Clicar em "Cadastrar CPF"

### 2. Cadastro (5 passos)
- **Passo 1**: Nome, CPF (ex: 111.444.777-35), Data de nascimento
- **Passo 2**: Email, Telefone, Endereço
- **Passo 3**: Senha (min. 8 chars, 1 maiúscula, 1 número)
- **Passo 4**: Selecionar método de pagamento (PIX)
- **Passo 5**: Revisar dados e confirmar

### 3. Pagamento
- Visualizar bônus aplicado
- Confirmar depósito simulado

### 4. Dashboard do Usuário
- Ver estatísticas
- Vizualizar apostas
- Analisar performance

### 5. Login Admin
- Email: `admin@betshow.com`
- Senha: `Admin@2026`
- Ver dashboard administrativo

---

## Arquivos Principais para Editar

### Páginas
- `/src/pages/HomePage.tsx` - Landing page
- `/src/pages/auth/LoginPage.tsx` - Login
- `/src/pages/auth/RegisterPage.tsx` - Cadastro
- `/src/pages/user/UserDashboardPage.tsx` - Dashboard usuário
- `/src/pages/admin/AdminDashboardPage.tsx` - Dashboard admin

### Componentes
- `/src/components/Header.tsx` - Navegação
- `/src/components/Footer.tsx` - Rodapé
- `/src/components/Hero.tsx` - Seção hero

### Estilos
- `/src/styles/tokens.css` - Cores, tipografia, espaçamento
- `/src/styles/global.css` - Estilos globais
- `/src/styles/forms.css` - Formulários
- `/src/styles/dashboard.css` - Dashboards

### Dados & Tipos
- `/src/types/` - Definições de tipos TypeScript
- `/src/data/` - Dados mock e constantes
- `/src/utils/validators.ts` - Validações
- `/src/utils/formatters.ts` - Formatação

---

## Validadores Disponíveis

```typescript
import { 
  isValidCPF, 
  isValidEmail, 
  isValidPassword,
  formatCPF,
  formatPhone,
  formatCEP,
  generateMatricula
} from '@/utils/validators';

// Usar em formulários
const cpfIsValid = isValidCPF('111.444.777-35');
const formatted = formatCPF('11144477735');
```

---

## Formatadores Disponíveis

```typescript
import { 
  formatCurrency, 
  formatPercent, 
  formatDate, 
  formatDateTime 
} from '@/utils/formatters';

formatCurrency(1250);      // R$ 1.250,00
formatPercent(58.5);       // 58.5%
formatDate('2026-06-08');  // 08 de jun de 2026
```

---

## Autenticação (Context)

```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout, register } = useAuth();
  
  if (!isAuthenticated) {
    return <p>Faça login primeiro</p>;
  }
  
  return <div>Bem-vindo, {user.fullName}!</div>;
}
```

---

## Adicionar Novo Componente

### 1. Criar arquivo TSX
```typescript
// src/components/MyComponent.tsx
import "./MyComponent.css";

type MyComponentProps = {
  title: string;
  onClick?: () => void;
};

export default function MyComponent({ title, onClick }: MyComponentProps) {
  return <div className="my-component" onClick={onClick}>{title}</div>;
}
```

### 2. Criar arquivo CSS
```css
/* src/components/MyComponent.css */
.my-component {
  background: var(--bg-card);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
}
```

### 3. Usar em outra página
```typescript
import MyComponent from "@/components/MyComponent";

export default function SomePage() {
  return <MyComponent title="Hello" onClick={() => console.log('clicked')} />;
}
```

---

## Adicionar Nova Página

### 1. Criar arquivo em `/src/pages`
```typescript
// src/pages/MyPage.tsx
export default function MyPage() {
  return <main>Minha página</main>;
}
```

### 2. Adicionar rota em `/src/routes/AppRouter.tsx`
```typescript
import MyPage from "../pages/MyPage";

<Route path="/mypage" element={<MyPage />} />
```

### 3. Vincular na navegação
```typescript
<Link to="/mypage">Minha página</Link>
```

---

## Design System (Tokens)

### Cores
```css
--neon-green: #00ff87
--gold: #ffd700
--cyan: #00d4ff
--magenta: #ff006e
--danger: #ef4444
--success: #22c55e
```

### Tipografia
```css
--font-display: "Barlow Condensed"
--font-headline: "Plus Jakarta Sans"
--font-body: "Plus Jakarta Sans"
--text-xs: 0.7rem
--text-sm: 0.82rem
--text-base: 1rem
--text-lg: 1.25rem
--text-xl: 1.5rem
```

### Espaçamento
```css
--space-xs: 0.25rem
--space-sm: 0.5rem
--space-md: 1rem
--space-lg: 1.5rem
--space-xl: 2rem
```

---

## Build & Deploy

```bash
# Build para produção
npm run build

# Visualizar build localmente
npm run preview

# Deploy no Vercel
vercel deploy

# Deploy no Netlify
netlify deploy --prod
```

---

## Troubleshooting

| Problema | Solução |
|----------|---------|
| Porta 5173 em uso | `npm run dev -- --port 5174` |
| Import não funciona | Verificar caminho (use `@` alias) |
| Estilos não carregam | Verificar se CSS está importado em `main.tsx` |
| Login não funciona | Verificar localStorage (abrir DevTools) |
| Build falha | Rodar `npm install` e tentar novamente |

---

## Recursos Úteis

- 📚 [React Docs](https://react.dev)
- 🎨 [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- 🛠️ [Vite Docs](https://vitejs.dev)
- 📘 [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Boa sorte! 🚀**
