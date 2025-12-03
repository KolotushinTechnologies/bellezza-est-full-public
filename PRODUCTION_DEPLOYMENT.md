# Production Deployment Guide

## Доменная структура

- **Client (Основной сайт)**: `bellezza-est.ru` или `www.bellezza-est.ru`
- **CRM (Админ-панель)**: `crm.bellezza-est.ru`
- **API (Backend)**: `api.bellezza-est.ru`

---

## 1. Server (Backend API)

### Настройка

**Домен**: `api.bellezza-est.ru`

**Порт**: 8080 (или любой другой, настроенный в nginx)

### Environment Variables

Создайте файл `server/.env`:

```env
NODE_ENV=production
PORT=8080
MONGODB_URI=mongodb://localhost:27017/bellezza_estetica
JWT_SECRET=your-super-secret-jwt-key-here
UPLOAD_DIR=uploads
API_BASE_URL=https://api.bellezza-est.ru
```

**Важно**: `API_BASE_URL` должен быть установлен на production домен для корректной работы загрузки изображений через HTTPS.

### CORS настроен для:
- `https://bellezza-est.ru`
- `https://www.bellezza-est.ru`
- `https://crm.bellezza-est.ru`
- `https://api.bellezza-est.ru`
- Localhost для разработки

### Запуск

```bash
cd server
npm install
npm run build
npm start
```

### Nginx конфигурация (пример)

```nginx
server {
    listen 80;
    server_name api.bellezza-est.ru;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 2. Client (Основной сайт)

### Настройка

**Домен**: `bellezza-est.ru`

### Environment Variables

Создайте файл `client/.env.production`:

```env
NEXT_PUBLIC_API_URL=https://api.bellezza-est.ru/api
NEXT_PUBLIC_SITE_URL=https://bellezza-est.ru
```

### Build & Deploy

```bash
cd client
npm install
npm run build
```

Результат будет в папке `.next` - это нужно развернуть на сервере.

### Запуск в production

```bash
npm start
```

Или используйте PM2:

```bash
pm2 start npm --name "bellezza-client" -- start
```

### Nginx конфигурация (пример)

```nginx
server {
    listen 80;
    server_name bellezza-est.ru www.bellezza-est.ru;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 3. CRM (Админ-панель)

### Настройка

**Домен**: `crm.bellezza-est.ru`

### Environment Variables

Создайте файл `crm-client/.env.production`:

```env
VITE_API_URL=https://api.bellezza-est.ru/api
```

### Build

```bash
cd crm-client
npm install
npm run build
```

Результат будет в папке `dist` - это статические файлы.

### Deploy

Просто скопируйте содержимое папки `dist` на веб-сервер.

### Nginx конфигурация (пример)

```nginx
server {
    listen 80;
    server_name crm.bellezza-est.ru;
    root /var/www/bellezza-crm/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## Локальная разработка

### Server

```bash
cd server
npm run dev
```

### Client

Создайте `client/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

```bash
cd client
npm run dev
```

### CRM

Создайте `crm-client/.env.local`:
```env
VITE_API_URL=http://localhost:8080/api
```

```bash
cd crm-client
npm run dev
```

---

## SSL/HTTPS

Используйте Let's Encrypt для получения бесплатных SSL сертификатов:

```bash
sudo certbot --nginx -d bellezza-est.ru -d www.bellezza-est.ru
sudo certbot --nginx -d crm.bellezza-est.ru
sudo certbot --nginx -d api.bellezza-est.ru
```

---

## Проверка

После развертывания проверьте:

1. **API**: `https://api.bellezza-est.ru/health`
2. **Client**: `https://bellezza-est.ru`
3. **CRM**: `https://crm.bellezza-est.ru`

---

## Важные замечания

1. **MongoDB** должна быть запущена и доступна
2. **Uploads** папка должна быть доступна для записи
3. **CORS** настроен только для указанных доменов
4. **JWT_SECRET** должен быть уникальным и секретным
5. Все `.env` файлы должны быть в `.gitignore`
