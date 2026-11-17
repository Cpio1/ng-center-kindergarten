# NG-CENTER — сайт детского мини-центра

Одностраничный сайт на Next.js 16 (App Router), React 19, TypeScript и Tailwind CSS 4. Сайт двуязычный (KZ по умолчанию и RU) и работает только в светлой теме.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production-сборка (перед ней автоматически собирается список медиа)
npm run lint
```

## Как добавить материалы

| Что | Куда положить | Примечание |
|---|---|---|
| Главное фото | `public/main-page.jpg` (`.jpeg` / `.png` / `.webp`) | Если на фото обрезаются лица, поменяйте `heroObjectPosition` в `src/data/media.ts` |
| Видео | `public/main-page2.mp4` (можно добавить и `main-page2.webm`) | Обложка, если нужна: `public/main-page2-poster.jpg`. Видео появится в разделе «Біз туралы» |
| Фото галереи | `public/gallery/` | Подходят любые имена, в том числе с пробелами. Порядок — по имени файла |
| Документы | PDF в `public/documents/` и запись в `src/data/documents.ts` | Ссылки на Google Drive или Cloud Mail.ru указываются так же, с `type: "link"` |
| Instagram | `instagram` в `src/data/kindergarten.ts` | Кнопка появится автоматически |
| Точная точка в 2GIS | `twoGisUrl` в `src/data/kindergarten.ts` | Сейчас 2GIS открывается поиском по адресу |
| Домен | переменная окружения `NEXT_PUBLIC_SITE_URL` | Нужна для sitemap, robots и Open Graph |

Список медиа формирует скрипт `scripts/media-manifest.mjs`: он сам запускается перед `dev` и `build`, в том числе на Vercel. Если медиа нет, сайт показывает аккуратные заглушки: иллюстрацию вместо фото и сообщение в галерее. Видеоблок в этом случае не выводится.

## Где что лежит

- `src/data/kindergarten.ts` — контакты, адрес, часы работы, ссылки WhatsApp и 2GIS.
- `src/i18n/translations.ts` — все тексты на казахском и русском.
- `src/components/sections/*` — разделы страницы.
- `src/components/decor/Decor.tsx` — декоративные SVG-элементы.
