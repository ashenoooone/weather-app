# Weather App

React 19, TS, Vite, TanStack Router/Query, Zustand (persist), Recharts. **Погода** — Open-Meteo (геокодинг + почасовой прогноз). **Пользователи** — json-server, `mock/db.json`.

## Запуск

```bash
npm install && npm run dev
```

Фронт + mock на `:3001`. Отдельно: `dev:front`, `mock`. URL API: `VITE_API_BASE_URL` → `src/4_shared/model/config.ts`.

## Важное

- **Структура:** `1_app` / `2_features` / `3_entities` / `4_shared` (близко к FSD).
- **Сессия:** токен в `localStorage`, Bearer в axios. Профиль: `GET /users?token=…` (у сидов разные токены; общий `userMe` для «кто я» не используем).
- **Роли:** `roles[]`, при регистрации добавляется `weather_reader`; доступ к `/weather` и пункт меню — на **клиенте**, json-server роли не проверяет.
- **403 в ТЗ** → редиректы: гость на логин, без роли погоды на `/forbidden`; залогиненный с `/forbidden` на `/user`.
- **Графики:** тренд, гистограмма, скользящая средняя, T° + влажность (2 оси Y или bar+line); диапазон дней и режимы отображения — в persist-сторе.
- **Оговорки:** RBAC только на клиенте; Open-Meteo нужна сеть; мок `userMe` может разъехаться с `users`; `weather` в JSON для графиков не используется.

## Логины для проверки (`mock/db.json`)

| Логин   | Пароль | Заметка        |
|---------|--------|----------------|
| `admin` | `123`  | есть погода    |
| `norole`| `123`  | без погоды     |

Логин: `GET /users?login=…&password=…` → сохраняем `token` из ответа.

## TODO

- `city-search.tsx` — infinite scroll при поиске городов.
- Бэкенд с JWT и проверкой ролей; e2e; битый токен; fallback при падении Open-Meteo.
