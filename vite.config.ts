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
  plugins: [react(), remoteAccessBanner("dev")],
  server: {
    host: "0.0.0.0",
    port: PORT,
    strictPort: false,
  },
  preview: {
    host: "0.0.0.0",
    port: PREVIEW_PORT,
    strictPort: false,
  },
});
