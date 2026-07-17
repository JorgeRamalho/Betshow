# Setup local BetShow

## 1. Subir o banco
```bash
docker compose up -d
```

## 2. Backend
```bash
cd backend
npm install
# .env já aponta para localhost:5433
npm run db:migrate
npm run db:seed
npm run dev
```

API: http://localhost:4000

Admin:
- admin@betshow.com
- Admin@2026

## 3. Frontend
```bash
npm install
# .env com VITE_API_URL=http://localhost:4000
npm run dev
```

Site: http://localhost:5173
