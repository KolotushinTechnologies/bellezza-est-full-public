# Bellezza Estetica - Инструкции по запуску

## Быстрый старт

### 1. Запуск Server

```bash
cd server
npm install
npm run dev
```

Server запустится на `http://localhost:8080`

### 2. Заполнение базы данных

Выполните следующие команды для заполнения базы данных тестовыми данными:

```bash
# В директории server

# 1. Создать админа (email: admin@example.com, password: admin123)
npm run seed:admin

# 2. Заполнить все данные (услуги, портфолио, статьи по уходу, блог)
npm run seed:all
```

Или по отдельности:

```bash
npm run seed:services    # Услуги салона
npm run seed:portfolio   # Портфолио работ
npm run seed:care        # Статьи по уходу
npm run seed:blog        # Блог посты
```

### 3. Запуск CRM

```bash
cd crm-client
npm install
npm run dev
```

CRM запустится на `http://localhost:5173`

**Данные для входа:**
- Email: `admin@example.com`
- Password: `admin123`

### 4. Запуск Frontend Client

```bash
cd client
npm install
npm run dev
```

Frontend запустится на `http://localhost:3000`

## Структура проекта

```
bellezza-est-full-public/
├── server/                          # Backend API
│   ├── src/
│   │   ├── models/                  # Модели данных
│   │   │   ├── service.model.ts     # Услуги (БЕЗ price!)
│   │   │   ├── client.model.ts      # Клиенты
│   │   │   ├── appointment.model.ts # Записи
│   │   │   ├── portfolio.model.ts   # Портфолио
│   │   │   ├── care-article.model.ts # Статьи по уходу
│   │   │   └── blog-post.model.ts   # Блог
│   │   ├── controllers/             # Контроллеры
│   │   ├── routes/                  # API routes
│   │   └── utils/                   # Утилиты и seed скрипты
│   └── package.json
├── client/                          # Frontend сайт (Next.js)
│   ├── app/
│   │   ├── services/               # Страница услуг
│   │   ├── portfolio/              # Страница портфолио
│   │   ├── care/                   # Страница ухода
│   │   └── blog/                   # Страница блога
│   └── components/
├── crm-client/                      # CRM система
│   ├── src/
│   │   ├── api.ts                  # API для старых данных
│   │   ├── api-beauty.ts           # API для салона красоты
│   │   └── components/
│   └── package.json
└── SETUP_INSTRUCTIONS.md           # Этот файл
```

## API Endpoints

### Services (Услуги)
```
GET    /api/services              - Все услуги
GET    /api/services/featured     - Избранные услуги
GET    /api/services/:id          - Услуга по ID
POST   /api/services              - Создать услугу (admin)
PUT    /api/services/:id          - Обновить услугу (admin)
DELETE /api/services/:id          - Удалить услугу (admin)
```

### Portfolio (Портфолио)
```
GET    /api/portfolio             - Все работы
GET    /api/portfolio/featured    - Избранные работы
GET    /api/portfolio/:id         - Работа по ID
POST   /api/portfolio             - Добавить работу (admin)
PUT    /api/portfolio/:id         - Обновить работу (admin)
DELETE /api/portfolio/:id         - Удалить работу (admin)
```

### Care Articles (Статьи по уходу)
```
GET    /api/care                  - Все статьи
GET    /api/care/featured         - Избранные статьи
GET    /api/care/:id              - Статья по ID
POST   /api/care                  - Создать статью (admin)
PUT    /api/care/:id              - Обновить статью (admin)
DELETE /api/care/:id              - Удалить статью (admin)
```

### Blog Posts (Блог)
```
GET    /api/blog                  - Все посты
GET    /api/blog/featured         - Избранные посты
GET    /api/blog/slug/:slug       - Пост по slug
GET    /api/blog/:id              - Пост по ID
POST   /api/blog                  - Создать пост (admin)
PUT    /api/blog/:id              - Обновить пост (admin)
DELETE /api/blog/:id              - Удалить пост (admin)
```

### Clients (Клиенты)
```
GET    /api/clients                    - Все клиенты (admin)
GET    /api/clients/:id                - Клиент по ID (admin)
GET    /api/clients/search/phone/:phone - Поиск по телефону (admin)
POST   /api/clients                    - Создать клиента (admin)
PUT    /api/clients/:id                - Обновить клиента (admin)
DELETE /api/clients/:id                - Удалить клиента (admin)
```

### Appointments (Записи)
```
GET    /api/appointments                  - Все записи (admin)
GET    /api/appointments/:id              - Запись по ID (admin)
GET    /api/appointments/client/:clientId - Записи клиента (admin)
GET    /api/appointments/range            - Записи за период (admin)
POST   /api/appointments                  - Создать запись (admin)
PUT    /api/appointments/:id              - Обновить запись (admin)
DELETE /api/appointments/:id              - Удалить запись (admin)
```

## Важные изменения

### ✅ Что сделано:

1. **Server адаптирован под салон красоты:**
   - Убрано поле `price` из модели Service
   - Созданы модели: Portfolio, CareArticle, BlogPost
   - Все API endpoints готовы к использованию

2. **CRM обновлен:**
   - Название: "Bellezza CRM"
   - Брендинг: "Bellezza Админ"
   - Иконка: Sparkles вместо Flower2
   - API URL: `http://localhost:8080`

3. **База данных:**
   - MongoDB: `bellezza_estetica`
   - Готовые seed скрипты для заполнения данных

4. **CORS:**
   - Настроен для всех localhost портов
   - Разрешены запросы без origin

### 📝 Следующие шаги:

1. **Интегрировать API в Frontend Client:**
   - Загружать услуги из `/api/services`
   - Загружать портфолио из `/api/portfolio`
   - Загружать статьи из `/api/care`
   - Загружать блог из `/api/blog`

2. **Обновить CRM интерфейс:**
   - Создать страницу "Услуги" (вместо "Товары")
   - Создать страницу "Портфолио"
   - Создать страницу "Статьи по уходу"
   - Создать страницу "Блог"
   - Создать страницу "Клиенты"
   - Создать страницу "Записи" с календарем

## Тестирование

### Проверка API:

```bash
# Получить все услуги
curl http://localhost:8080/api/services

# Получить портфолио
curl http://localhost:8080/api/portfolio

# Получить статьи по уходу
curl http://localhost:8080/api/care

# Получить блог посты
curl http://localhost:8080/api/blog
```

### Проверка авторизации:

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

## Troubleshooting

### Проблема: CORS ошибка
**Решение:** Убедитесь, что server запущен и CORS настроен правильно. Server должен разрешать все localhost origins.

### Проблема: MongoDB connection error
**Решение:** Убедитесь, что MongoDB запущен:
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Проблема: Не могу авторизоваться в CRM
**Решение:** 
1. Убедитесь, что выполнили `npm run seed:admin`
2. Используйте данные: `admin@example.com` / `admin123`
3. Проверьте, что server запущен

## Контакты

При возникновении вопросов обращайтесь к документации или создавайте issue в репозитории.
