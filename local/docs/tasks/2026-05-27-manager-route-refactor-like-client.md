# Refactor `manager` как `client`

## Задача

Привести route `app/routes/users/managers/manager` к той же структуре, что и `app/routes/users/clients/client`:
- тонкий route-файл;
- отдельный hooks-слой;
- отдельный view-слой.

## Что сделано

1. Добавлен hooks-слой:
   - `app/routes/users/managers/manager/manager.hooks.ts`.
   - Вынесены:
     - состояние UI (`open`, `openCounterparty`, `searchSupervisors`);
     - формы (`form`, `supervisorForm`);
     - submit-обработчики (`onSubmitConfirm`, `onDecline`);
     - навигация назад.

2. Добавлен view-слой:
   - `app/routes/users/managers/manager/_views/ManagerView.tsx`.
   - UI из `manager.tsx` перенесен в компонент-представление.

3. Упрощен route:
   - `app/routes/users/managers/manager/manager.tsx`.
   - Оставлены `clientLoader/clientAction` + связывание `hooks -> view`.

4. Обновлены типы маппера под фактические данные сервиса:
   - `app/routes/users/managers/manager/manager.mapper.ts`.

## Примечания

- Поведение формы и действий сохранено.
- Избыточное логгирование не добавлялось, так как изменение структурное и без новой бизнес-логики.
