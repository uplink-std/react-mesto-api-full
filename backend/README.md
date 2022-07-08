[![Tests](https://github.com/uplink-std/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/uplink-std/express-mesto-gha/actions/workflows/tests-13-sprint.yml) [![Tests](https://github.com/uplink-std/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/uplink-std/express-mesto-gha/actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд



## Настройка бейджей статуса тестов
Перед началом работы над проектом рекомендуется исправить бейджи, отражающие статус прохождения тестов.
Для этого замените разметку бейджей на следующий фрагмент, подставив вместо `${имя_пользователя}` и `${имя_репозитория}` соответствующие значения.

```
[![Tests for sprint 13](https://github.com/${имя_пользователя}/${имя репозитория}/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/${имя_пользователя}/${имя репозитория}/actions/workflows/tests-13-sprint.yml) 

[![Tests for sprint 14](https://github.com/${имя_пользователя}/${имя репозитория}/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/${имя_пользователя}/${имя репозитория}/actions/workflows/tests-14-sprint.yml)
```


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

| Переменная окружения | Назначение         | Значение по умолчанию              | Пример                                                             |
|----------------------|--------------------|------------------------------------|--------------------------------------------------------------------|
| PORT                 | порт сервера       | 3000                               | 8080                                                               |
| MONGODB_URL          | строка подключения | mongodb://localhost:27017/mestodb  | mongodb://admin:adminpass@127.0.0.1:27017/mestodb?authSource=admin |
