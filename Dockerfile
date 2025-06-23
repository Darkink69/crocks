# Базовый образ для сборки
FROM node:20-alpine AS builder

# Установка рабочей директории
WORKDIR /app

# 1. Копируем только package.json и package-lock.json (или yarn.lock)
COPY package.json package-lock.json ./

# 2. Устанавливаем зависимости
RUN npm install

# 3. Копируем ВСЕ остальные файлы проекта
# (это делаем после установки зависимостей для лучшего кэширования)
COPY . .

# 4. Сборка приложения
RUN npm run build

# Базовый образ для запуска
FROM nginx:alpine

# Копирование собранного приложения в nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Копирование конфигурации nginx (если есть)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открытие порта 80
EXPOSE 80

# Запуск nginx
CMD ["nginx", "-g", "daemon off;"]