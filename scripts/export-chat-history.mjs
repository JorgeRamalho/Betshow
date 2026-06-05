import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

const transcriptPath =
  "C:/Users/jorge/.cursor/projects/c-Users-jorge-OneDrive-Desktop-Fron-End-Projetos-Projeto-Betshow/agent-transcripts/bc7cdc68-e082-4a75-acd3-5c55975740c5/bc7cdc68-e082-4a75-acd3-5c55975740c5.jsonl";

const outDir = join(projectRoot, "docs", "chat-history");
mkdirSync(outDir, { recursive: true });

const raw = readFileSync(transcriptPath, "utf8");
const lines = raw.trim().split("\n").filter(Boolean);

let md = `# Histórico de Conversa — Projeto BetShow\n\n`;
md += `> Exportado automaticamente do Cursor em ${new Date().toISOString().split("T")[0]}\n\n`;
md += `**Sessão:** \`bc7cdc68-e082-4a75-acd3-5c55975740c5\`\n\n`;
md += `**Total de mensagens:** ${lines.length}\n\n---\n\n`;

let messageIndex = 0;

for (const line of lines) {
  let entry;
  try {
    entry = JSON.parse(line);
  } catch {
    continue;
  }

  const role = entry.role === "user" ? "Usuário" : "Assistente";
  const blocks = entry.message?.content ?? [];

  const textParts = [];
  const toolNames = [];

  for (const block of blocks) {
    if (block.type === "text" && block.text) {
      const text = block.text
        .replace(/<user_query>\n?/g, "")
        .replace(/<\/user_query>/g, "")
        .replace(/\[REDACTED\]/g, "")
        .trim();
      if (text) textParts.push(text);
    }
    if (block.type === "tool_use" && block.name) {
      toolNames.push(block.name);
    }
  }

  if (!textParts.length && !toolNames.length) continue;

  messageIndex++;
  md += `## ${messageIndex}. ${role}\n\n`;

  if (textParts.length) {
    md += textParts.join("\n\n") + "\n\n";
  }

  if (toolNames.length) {
    md += `*Ferramentas usadas:* ${[...new Set(toolNames)].join(", ")}\n\n`;
  }

  md += `---\n\n`;
}

const mdPath = join(outDir, "HISTORICO-CONVERSA.md");
const jsonlPath = join(outDir, "transcript.jsonl");

writeFileSync(mdPath, md, "utf8");
copyFileSync(transcriptPath, jsonlPath);

console.log(`Exportado: ${mdPath}`);
console.log(`Cópia JSONL: ${jsonlPath}`);
console.log(`Mensagens processadas: ${messageIndex}`);
