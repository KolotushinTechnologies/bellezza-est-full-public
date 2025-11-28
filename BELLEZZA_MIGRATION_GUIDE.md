# Bellezza Estetica - Руководство по миграции

## Обзор изменений

Проект был успешно адаптирован из интернет-магазина цветов "Орхидея" в систему управления салоном красоты "Bellezza Estetica".

### Что было сделано:

## 1. Backend (Server)

### Новые модели данных:

#### Service (Услуги салона)
- `name` - название услуги
- `description` - описание услуги
- `price` - стоимость
- `duration` - продолжительность в минутах
- `category` - категория услуги
- `images` - фотографии
- `featured` - избранная услуга
- `tags` - теги
- `active` - активна ли услуга

**Файл:** `server/src/models/service.model.ts`

#### Client (Клиенты салона)
- `name` - имя клиента
- `phone` - телефон (уникальный)
- `email` - email (опционально)
- `birthDate` - дата рождения (опционально)
- `notes` - заметки о клиенте

**Файл:** `server/src/models/client.model.ts`

#### Appointment (Записи на услуги)
- `client` - ссылка на клиента
- `service` - ссылка на услугу
- `date` - дата записи
- `startTime` - время начала (формат HH:MM)
- `endTime` - время окончания (формат HH:MM)
- `status` - статус (pending/confirmed/completed/cancelled)
- `notes` - заметки к записи

**Файл:** `server/src/models/appointment.model.ts`

### Новые контроллеры:

- `server/src/controllers/service.controller.ts` - управление услугами
- `server/src/controllers/client.controller.ts` - управление клиентами
- `server/src/controllers/appointment.controller.ts` - управление записями

### Новые маршруты:

- `server/src/routes/service.routes.ts` - API для услуг
- `server/src/routes/client.routes.ts` - API для клиентов
- `server/src/routes/appointment.routes.ts` - API для записей

### API Endpoints:

#### Services (Услуги)
```
GET    /api/services              - Получить все услуги
GET    /api/services/featured     - Получить избранные услуги
GET    /api/services/:id          - Получить услугу по ID
POST   /api/services              - Создать услугу (admin)
PUT    /api/services/:id          - Обновить услугу (admin)
DELETE /api/services/:id          - Удалить услугу (admin)
```

#### Clients (Клиенты)
```
GET    /api/clients                    - Получить всех клиентов (admin)
GET    /api/clients/:id                - Получить клиента по ID (admin)
GET    /api/clients/search/phone/:phone - Поиск по телефону (admin)
POST   /api/clients                    - Создать клиента (admin)
PUT    /api/clients/:id                - Обновить клиента (admin)
DELETE /api/clients/:id                - Удалить клиента (admin)
```

#### Appointments (Записи)
```
GET    /api/appointments                  - Получить все записи (admin)
GET    /api/appointments/:id              - Получить запись по ID (admin)
GET    /api/appointments/client/:clientId - Записи клиента (admin)
GET    /api/appointments/range            - Записи за период (admin)
POST   /api/appointments                  - Создать запись (admin)
PUT    /api/appointments/:id              - Обновить запись (admin)
DELETE /api/appointments/:id              - Удалить запись (admin)
```

## 2. CRM Client

### Новый API модуль:

**Файл:** `crm-client/src/api-beauty.ts`

Содержит все функции для работы с:
- Услугами (Services)
- Клиентами (Clients)
- Записями (Appointments)

### Интерфейсы TypeScript:

```typescript
interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  images: string[];
  featured?: boolean;
  tags: string[];
  active: boolean;
  createdAt: Date;
}

interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  birthDate?: Date;
  notes?: string;
  createdAt: Date;
}

interface Appointment {
  id: string;
  client: {
    id: string;
    name: string;
    phone: string;
    email?: string;
  };
  service: {
    id: string;
    name: string;
    price: number;
    duration: number;
  };
  date: Date;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
}
```

## 3. Frontend Client (Bellezza Estetica)

Frontend уже готов и содержит:
- Главную страницу с информацией о салоне
- Страницу услуг (`/services`)
- Страницу портфолио (`/portfolio`)
- Страницу блога (`/blog`)
- Страницу контактов (`/contacts`)
- Страницу ухода (`/care`)

## Запуск проекта

### 1. Server

```bash
cd server
npm install
npm run dev
```

Сервер запустится на `http://localhost:8080`

### 2. CRM Client

```bash
cd crm-client
npm install
npm run dev
```

CRM запустится на `http://localhost:5173`

### 3. Frontend Client

```bash
cd client
npm install
npm run dev
```

Frontend запустится на `http://localhost:3000`

## Следующие шаги

### Для полной интеграции необходимо:

1. **Обновить CRM интерфейс:**
   - Заменить "Товары" на "Услуги"
   - Добавить страницу "Клиенты"
   - Добавить страницу "Записи" с календарем
   - Обновить Dashboard для отображения статистики салона

2. **Обновить названия:**
   - Изменить название CRM с "Орхидея" на "Bellezza Estetica"
   - Обновить логотипы и брендинг

3. **Добавить функциональность:**
   - Календарь записей
   - Уведомления клиентам
   - История посещений
   - Статистика по услугам

4. **Интеграция с Frontend:**
   - Форма онлайн-записи на сайте
   - Отображение услуг из базы данных
   - Галерея работ из CRM

## Тестирование

### Тестирование API:

```bash
# Получить все услуги
curl http://localhost:8080/api/services

# Создать клиента (требуется авторизация)
curl -X POST http://localhost:8080/api/clients \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Иван Иванов",
    "phone": "+79001234567",
    "email": "ivan@example.com"
  }'

# Создать запись (требуется авторизация)
curl -X POST http://localhost:8080/api/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "client": "CLIENT_ID",
    "service": "SERVICE_ID",
    "date": "2024-01-15",
    "startTime": "14:00",
    "endTime": "15:30",
    "status": "pending"
  }'
```

## Структура проекта

```
bellezza-est-full-public/
├── server/                 # Backend API
│   ├── src/
│   │   ├── models/        # Модели данных
│   │   ├── controllers/   # Контроллеры
│   │   ├── routes/        # Маршруты API
│   │   └── index.ts       # Точка входа
│   └── uploads/           # Загруженные файлы
├── client/                # Frontend сайт
│   ├── app/              # Next.js страницы
│   └── components/       # React компоненты
├── crm-client/           # CRM система
│   ├── src/
│   │   ├── api.ts        # API для товаров (старое)
│   │   ├── api-beauty.ts # API для салона (новое)
│   │   └── components/   # React компоненты
│   └── public/           # Статические файлы
└── BELLEZZA_MIGRATION_GUIDE.md  # Это руководство
```

## Важные замечания

1. **Старые модели сохранены:** Product, Category, Tag остались для обратной совместимости
2. **Новые модели добавлены:** Service, Client, Appointment
3. **API URL:** `https://api.orhideyanhk.ru/api`
4. **Авторизация:** Используется JWT токен
5. **CORS:** Настроен для работы с доменами проекта

## Контакты и поддержка

При возникновении вопросов обращайтесь к документации или создавайте issue в репозитории проекта.
