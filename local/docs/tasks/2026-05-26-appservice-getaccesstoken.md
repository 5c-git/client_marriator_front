# Задача: `AppService.getAccessToken()`

## Контекст

В проекте есть общий сервис `AppService` (`app/shared/container/container.service.ts`), который инкапсулирует получение access token из DI (`brandi`) через `appPrivateTokens.getAccessToken`.

Часть кода ожидает, что в `AppService` будет публичный метод с названием `getAccessToken()`, а не только `getToken()`.

## Что сделано

- В `AppService` добавлен публичный метод `getAccessToken(): string`, который:
  - читает токен из внедрённой функции `getAccessToken: () => string | null`
  - бросает `Error`, если токен отсутствует
  - возвращает строковый токен, если он есть
- Метод `getToken()` оставлен как алиас для обратной совместимости и просто вызывает `getAccessToken()`.

## Изменённые файлы

- `app/shared/container/container.service.ts`
- `local/docs/tasks/2026-05-26-appservice-getaccesstoken.md`

