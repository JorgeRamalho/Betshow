FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 4000

# Migra schema, garante admin e sobe a API
CMD ["sh", "-c", "node scripts/migrate.mjs && node scripts/seed-admin.mjs && npx tsx src/index.ts"]
