import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import os from "node:os";

const PORT = Number(process.env.PORT) || 5173;
const PREVIEW_PORT = Number(process.env.PREVIEW_PORT) || 4173;

function getLocalIPv4(): string {
  const nets = os.networkInterfaces();
  for (const list of Object.values(nets)) {
    if (!list) continue;
    for (const net of list) {
      const isV4 = net.family === "IPv4" || net.family === 4;
      if (isV4 && !net.internal) return net.address;
    }
  }
  return "127.0.0.1";
}

/** Remove redirecionamento do Live Server do build (só vale no index.html da raiz) */
function stripLiveServerRedirect(): Plugin {
  return {
    name: "betshow-strip-live-redirect",
    transformIndexHtml(html) {
      const withoutRedirect = html.replace(
        /<script id="live-server-redirect">[\s\S]*?<\/script>\s*/g,
        ""
      );

      const fileProtocolGuard = `<script>
if (location.protocol === "file:") {
  document.addEventListener("DOMContentLoaded", function () {
    document.body.innerHTML =
      '<div style="font-family:sans-serif;max-width:520px;margin:3rem auto;padding:1.5rem;line-height:1.6">' +
      "<h1>BetShow</h1><p>Abra com um servidor local — não use duplo clique no arquivo.</p>" +
      "<p><strong>Live Server:</strong> rode <code>npm run live:server</code> e acesse " +
      '<a href="http://127.0.0.1:5500/">http://127.0.0.1:5500/</a></p>' +
      "<p><strong>Desenvolvimento:</strong> <code>npm run dev</code> → " +
      '<a href="http://localhost:5173/">http://localhost:5173/</a></p></div>';
  });
}
</script>`;

      return withoutRedirect.replace("</head>", `    ${fileProtocolGuard}\n  </head>`);
    },
  };
}

/** Exibe no terminal o link para celular / outro PC na mesma rede */
function remoteAccessBanner(mode: "dev" | "preview"): Plugin {
  return {
    name: "betshow-remote-access",
    configureServer(server) {
      server.httpServer?.once("listening", () => {
        const addr = server.httpServer?.address();
        const port =
          typeof addr === "object" && addr && "port" in addr
            ? addr.port
            : server.config.server.port ?? PORT;
        const ip = getLocalIPv4();
        const label = mode === "dev" ? "desenvolvimento" : "preview";
        console.log(
          `\n  ═══ BetShow (${label}) ═══\n` +
            `  Local:    http://localhost:${port}/\n` +
            `  Remoto:   http://${ip}:${port}/  ← use no celular (mesmo Wi-Fi)\n` +
            `  Docs:     ACESSO-REMOTO.md (internet pública: ngrok)\n`
        );
      });
    },
  };
}

export default defineConfig({
  base: "./",
  plugins: [react(), stripLiveServerRedirect(), remoteAccessBanner("dev")],
  server: {
    host: "0.0.0.0",
    port: PORT,
    strictPort: false,
    proxy: {
      // Túnel/celular: /api → backend local (login, mercados, cadastro)
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: "0.0.0.0",
    port: PREVIEW_PORT,
    strictPort: false,
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});

