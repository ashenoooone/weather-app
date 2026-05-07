# Weather App

React-приложение с локальным mock REST API для разработки.

## Скрипты

Установка зависимостей:

```bash
npm install
```

Запуск frontend и mock backend вместе:

```bash
npm run dev
```

Запуск только frontend:

```bash
npm run dev:front
```

Запуск только mock backend:

```bash
npm run mock
```

Mock API запускается на:

```text
http://localhost:3001
```

## Конфиг

Доступ к env-переменным и базовый URL backend вынесены в:

```text
src/4_shared/model/config.ts
```

Использование:

```ts
import { BACKEND_BASE_URL, config } from '@shared/model/config'
```

Значение по умолчанию:

```text
http://localhost:3001
```

Переопределение:

```bash
VITE_API_BASE_URL=http://localhost:3001 npm run dev
```

## Тестовый пользователь

```text
login: admin
password: 123456
role: weather_reader
```

Для авторизации frontend может вызвать `GET /users?login=admin&password=123456`, затем сохранить `mock-token` в `localStorage`. Mock backend токены не генерирует.

## Примеры запросов

Проверка пользователя:

```bash
curl "http://localhost:3001/users?login=admin&password=123456"
```

Регистрация пользователя:

```bash
curl -X POST "http://localhost:3001/users" \
  -H "Content-Type: application/json" \
  -d '{"login":"user1","password":"123456","role":"weather_reader"}'
```

Получение списка городов:

```bash
curl "http://localhost:3001/cities"
```

Получение погодных данных по городу:

```bash
curl "http://localhost:3001/weather?city=Saratov"
```

Получение погодных данных по городу и периоду:

```bash
curl "http://localhost:3001/weather?city=Saratov&date_gte=2026-05-01&date_lte=2026-05-07"
```

## Данные

Mock-данные лежат в `mock/db.json`.

Сущности:

- `users`: `id`, `login`, `password`, `role`
- `cities`: `id`, `name`
- `weather`: `id`, `city`, `date`, `temperature`, `humidity`

Даты используют формат `YYYY-MM-DD`. Погодные данные есть за 14 дней для `Saratov`, `Moscow`, `Saint Petersburg`.
