# Demo Mobile PWA

Простое PWA-приложение на Vite + React без бэкенда, авторизации и API.

## Что внутри

- 4 экрана: Home, Games, Bonuses, Profile
- Простая мобильная навигация
- `manifest.webmanifest`
- `service-worker.js`
- Иконки `192x192` и `512x512`
- Готово для установки на Android через Chrome

## Запуск локально

```bash
npm install
npm run dev
```

Откройте адрес из терминала, обычно это `http://localhost:5173`.

## Проверка PWA

Для service worker нужен production build или preview:

```bash
npm run build
npm run preview
```

Откройте preview-адрес в Chrome. На Android в меню Chrome появится действие установки приложения, если сайт открыт по HTTPS или на localhost.

## Деплой на Vercel

1. Загрузите проект в GitHub.
2. Откройте [Vercel](https://vercel.com/) и создайте новый проект из репозитория.
3. Настройки обычно определятся автоматически:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. После деплоя откройте HTTPS-ссылку на Android в Chrome.
5. В меню Chrome выберите `Install app` или `Add to Home screen`.

## Деплой на Netlify

1. Загрузите проект в GitHub.
2. Откройте [Netlify](https://www.netlify.com/) и создайте новый сайт из репозитория.
3. Укажите:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. После деплоя откройте HTTPS-ссылку на Android в Chrome.
5. В меню Chrome выберите `Install app` или `Add to Home screen`.

## Важно

PWA устанавливается на Android, когда сайт доступен по HTTPS, содержит корректный manifest, service worker и подходящие иконки.
