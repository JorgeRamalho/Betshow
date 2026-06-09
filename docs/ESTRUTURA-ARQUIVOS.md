# Estrutura de arquivos — HTML, CSS, JavaScript, React, TypeScript

```
Projeto-Betshow/
├── index.html              ← HTML principal (ponto de entrada no navegador)
├── public/                 ← Arquivos estáticos (favicon, etc.)
├── src/
│   ├── main.tsx            ← TypeScript: inicia React
│   ├── App.tsx             ← TypeScript + React: monta todas as seções
│   ├── vite-env.d.ts       ← Tipos do Vite
│   ├── styles/
│   │   └── global.css      ← CSS global (paleta, botões, tipografia)
│   ├── components/
│   │   ├── *.tsx           ← Componentes React (TypeScript)
│   │   └── *.css           ← Estilos de cada seção
│   └── data/
│       └── *.ts            ← Dados (embaixadores, avatares)
├── vite.config.ts          ← Servidor de acesso local/remoto
├── package.json            ← Scripts npm
├── ACESSO-REMOTO.md        ← Links para celular e internet
└── dist/                   ← Gerado por npm run build (HTML+JS+CSS prontos)
└── backend/                ← API Node.js + Express, PostgreSQL, JWT, pagamentos e notificações
```

## Fluxo no navegador

1. O navegador abre **index.html**.
2. Carrega **main.tsx** (compilado para JavaScript no dev/build).
3. **React** renderiza **App.tsx** dentro de `<div id="root">`.
4. Os estilos vêm de **global.css** e dos CSS dos componentes.

## Equivalência que você pediu

| Você mencionou | No projeto |
|---------------|------------|
| index.html | `index.html` na raiz |
| style.css | `src/styles/global.css` + `src/components/*.css` |
| JavaScript | Gerado pelo Vite a partir de TypeScript/TSX |
| React | `src/**/*.tsx` |
| TypeScript | `src/**/*.tsx`, `src/**/*.ts` |
