# Refactor managers как clients

## Задача

Привести папку `app/routes/users/managers` к тому же принципу организации, что уже используется в `app/routes/users/clients`:
- отделить бизнес-логику загрузки данных от route-файла;
- вынести отображение списка в отдельный view-компонент;
- подключить DI-контейнер и токены для сервиса.

## Что сделано

1. Вынесена логика загрузки списка менеджеров в `ManagersService`:
   - файл: `app/routes/users/managers/managers.service.ts`;
   - использован `AppService.getToken()` и private token для API запроса.

2. Добавлены DI-слои:
   - `app/routes/users/managers/managers.tokens.ts`;
   - `app/routes/users/managers/managers.private-tokens.ts`;
   - `app/routes/users/managers/managers.module.ts`.

3. UI списка вынесен в отдельный view:
   - `app/routes/users/managers/_views/ManagersView.tsx`.

4. Упрощен route `app/routes/users/managers/managers.tsx`:
   - loader делегирует работу сервису;
   - компонент использует `useAppHooks()` и `Loader`, как в `clients`;
   - рендер списка делегирован `ManagersView`.

## Примечания

- Поведение фильтрации статусов и отображения списка сохранено.
- Избыточное логгирование не добавлялось, так как задача про структурный рефакторинг без изменения поведения.

## Дополнение: refactor `users/managers/manager`

1. Добавлены DI-слои для страницы конкретного менеджера:
   - `app/routes/users/managers/manager/manager.tokens.ts`;
   - `app/routes/users/managers/manager/manager.private-tokens.ts`;
   - `app/routes/users/managers/manager/manager.module.ts`.

2. Вынесена бизнес-логика `loader/action` в `ManagerService`:
   - `app/routes/users/managers/manager/manager.service.ts`;
   - загрузка данных (`getManagerData`) и обработка `_action` (`handleAction`) теперь работают через `AppService.getToken()` и private tokens.

3. Обновлен route `app/routes/users/managers/manager/manager.tsx`:
   - `clientLoader` теперь делегирует загрузку в контейнер `managerContainer`;
   - `clientAction` теперь делегирует обработку в `ManagerService` и делает redirect только по результату сервиса;
   - UI и пользовательские сценарии оставлены без изменения.
