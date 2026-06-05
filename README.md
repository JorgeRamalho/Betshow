# BetShow — Apostas Esportivas

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

## Aviso legal

Demonstração front-end. Apostas no Brasil exigem licença e conformidade (Lei 14.790/23).
