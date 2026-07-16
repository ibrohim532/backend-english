# English Learning Platform API (NestJS)

Ingliz tili o'rganish platformasi uchun **NestJS** backend loyihasi. Barcha ma'lumotlar **xotira ichida (in-memory)** saqlanadi — hech qanday tashqi server, DB yoki fetch talab qilinmaydi. Swagger UI avtomatik generatsiya qilinadi.

## Ishga tushirish

```bash
npm install
npm run start:dev
```

- API:      http://localhost:3000/api
- Swagger:  http://localhost:3000/docs

## Loyiha tuzilishi

```
src/
├── main.ts                # Kirish nuqta + Swagger sozlash
├── app.module.ts          # Root modul
├── common/
│   └── memory-store.ts    # In-memory saqlash (mock data)
└── modules/
    ├── auth/              # Ro'yxatdan o'tish, kirish
    ├── platform/          # Platforma info, o'qituvchi, testimonials, contact
    ├── profile/           # Shaxsiy kabinet, sozlamalar
    ├── courses/           # Kurslar, mening kurslarim, progress
    ├── lessons/           # Video, audio, konspekt (PDF), yuklab olish
    ├── tests/             # Dars testi, yakuniy test, natijalar
    ├── materials/         # PDF, Vocabulary, Grammar, Homework
    ├── results/           # Progress, ballar, reyting
    ├── live-classes/      # Zoom/Meet jadval va yozuvlar
    ├── qa/                # Savol-javob
    ├── notifications/     # Bildirishnomalar
    ├── certificates/      # Sertifikatlar (PDF)
    └── payments/          # To'lov, obuna, promo-kod
```

Har bir modul ichida:
- `*.controller.ts` — HTTP endpointlar (`@Controller`, `@Get`, `@Post`...)
- `*.service.ts` — biznes-logika (in-memory bilan)
- `*.module.ts` — Nest modul e'loni
- `dto/` — DTO klasslar (`class-validator` + `@ApiProperty`)

## VS Code

Loyihani VS Code'da oching:

```bash
code english-platform-api
```

Tavsiya etilgan extensionlar: **ESLint**, **Prettier**, **NestJS Files**.
# backend-english
