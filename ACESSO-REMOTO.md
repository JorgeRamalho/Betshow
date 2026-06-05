# Acesso remoto ao BetShow

## Stack do projeto

| Arquivo / pasta | Função |
|-----------------|--------|
| `index.html` | Página HTML raiz; carrega React em `#root` |
| `src/main.tsx` | Entrada **TypeScript** → monta o app React |
| `src/App.tsx` | Componente principal React |
| `src/styles/global.css` | Estilos globais (equivalente ao **style.css** do site) |
| `src/components/*.css` | CSS por seção |
| `vite.config.ts` | Servidor de desenvolvimento e build |
| `dist/` | Site pronto após `npm run build` (HTML + JS + CSS) |

O navegador recebe **JavaScript** compilado a partir de **TypeScript** e **React**.

---

## 1. Rede local (celular ou outro PC no mesmo Wi-Fi)

```powershell
cd "c:\Users\jorge\OneDrive\Desktop\Fron_End\Projetos\Projeto-Betshow"
npm run dev:remote
```

Ou:

```powershell
.\scripts\start-remote.ps1
```

No terminal o Vite mostra algo como:

- **Local:** `http://localhost:5173/`
- **Network:** `http://192.168.x.x:5173/`

Abra o link **Network** no celular (mesma rede Wi-Fi do PC).

### Firewall Windows

Se não abrir no celular, permita o Node/Vite no firewall ou execute uma vez como administrador:

```powershell
New-NetFirewallRule -DisplayName "BetShow Vite" -Direction Inbound -Protocol TCP -LocalPort 5173 -Action Allow
```

---

## 2. Versão de produção na rede local

```bash
npm run build
npm run preview:remote
```

Link típico: `http://192.168.x.x:4173/`

---

## 3. Internet pública (acesso de qualquer lugar)

O Vite só expõe na sua rede. Para link público use um túnel:

### ngrok (rápido para teste)

1. Instale: https://ngrok.com/download  
2. Com o site rodando (`npm run dev:remote`):

```bash
ngrok http 5173
```

3. Use a URL `https://xxxx.ngrok-free.app` que aparecer no terminal.

### Cloudflare Tunnel (grátis, estável)

```bash
npx cloudflared tunnel --url http://localhost:5173
```

---

## Scripts npm

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Desenvolvimento (já escuta em `0.0.0.0`) |
| `npm run dev:remote` | Igual ao dev + mensagem de rede |
| `npm run build` | Gera `dist/` |
| `npm run preview:remote` | Preview da build na rede local |
| `npm run serve` | Build + preview remoto |

---

## Porta customizada

```powershell
$env:PORT=3000; npm run dev:remote
```
