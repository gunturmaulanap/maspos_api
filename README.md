# MASPOS V2 Backend

MASPOS V2 adalah backend REST API untuk aplikasi Point of Sale (POS) berbasis Node.js, Express, Knex, Objection, dan PostgreSQL.

# API DOCUMENTATION

maspos_api.vercel.app

## Instalasi & Setup

1. **Clone repository**
   ```sh
   git clone https://github.com/gunturmaulanap/MASPOS_V2.git
   cd MASPOS_V2/backend
   ```

2. **Copy file environment**
   ```sh
   cp .env.example .env
   # Edit .env sesuai konfigurasi database PostgreSQL Railway
   ```

3. **Install dependencies**
   ```sh
   npm install
   ```

4. **Connect ke PostgreSQL Railway**
   - Pastikan DATABASE_URL di file `.env` sudah sesuai dengan connection string Railway PostgreSQL.

5. **Migrasi dan seeder database**
   ```sh
   NODE_ENV=production npx knex migrate:latest
   NODE_ENV=production npx knex seed:run
   ```

6. **Jalankan server**
   ```sh
   npm start
   # atau
   node app.js
   ```

## Fitur
- Autentikasi JWT
- CRUD Produk, Kategori, User
- Upload gambar produk
- Dokumentasi Swagger

## Dokumentasi API
Swagger UI tersedia di endpoint `/api-docs` setelah server berjalan.

## Konfigurasi
- Semua konfigurasi environment ada di file `.env`
- Contoh file: `.env.example`

## Kontribusi
Pull request dan issue sangat diterima!

## Lisensi
MIT
