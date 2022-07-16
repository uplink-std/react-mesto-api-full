# Проект Mesto: бэкенд

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
  
Остальные директории вспомогательные, создаются при необходимости разработчиком

## Пререквизиты

Для работы приложения необходим сервер mongodb
Для разработки можно использовать докер контейнер

Пример конфигурации для docker-compose:

```yaml
version: '3.1'
services:
  mongo:
    image: mongo:5.0.9
    restart: always
    ports:
      - "127.0.0.1:27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: adminpass
  mongo-express:
    image: mongo-express:0.54.0
    restart: always
    ports:
      - "127.0.0.1:27018:8081"
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: admin
      ME_CONFIG_MONGODB_ADMINPASSWORD: adminpass
      ME_CONFIG_MONGODB_URL: mongodb://admin:adminpass@mongo:27017/
```

## Запуск приложения

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

## Настройка сервера

Выполняется установкой переменных окружения:

| Переменная окружения | Назначение          | Значение по умолчанию             | Пример                                                             |
|----------------------|---------------------|-----------------------------------|--------------------------------------------------------------------|
| PORT                 | порт сервера        | 3000                              | 8080                                                               |
| MONGODB_URL          | строка подключения  | mongodb://localhost:27017/mestodb | mongodb://admin:adminpass@127.0.0.1:27017/mestodb?authSource=admin |
| CORS_CONFIG_ORIGIN   | настройка cors      | false                             | http://localhost:3000                                              |
| JWT_SECRET           | секрет для токена   | JWT_SECRET_KEY                    | 745d2a6d691cd3f267ac8f2693a9ebf3a912165b40625d87e0930ba046d41f51   |

генерация секрета может быть выполнена `node -e "console.log(require('crypto').randomBytes(32).toString('hex'));" `
