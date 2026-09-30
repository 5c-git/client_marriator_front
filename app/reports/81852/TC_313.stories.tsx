import preview from "../../../.storybook/preview";

// import { reactRouterParameters } from "storybook-addon-remix-react-router";

import Task from "~/routes/tasks/task/task";

const meta = preview.meta({
  component: Task,
});

// @ts-expect-error: `matches` won't align between test code and app code
export const TC_313 = meta.story({
  args: {
    loaderData: {
      entity: {
        id: "725",
        status: 4,
        place: {
          id: 4,
          name: "Пятёрочка Аметьевская ул, д. 24, г. Казань",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          region: "Татарстан Респ",
        },
        selfEmployed: false,
        route: 0,
        project: {
          id: 12,
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          name: "78412552 Пятерочка",
        },
        creatingPerson: {
          id: 526,
          role: "manager",
          name: "ЮЛИЯ МЕНЕДЖЕР ПЯТЕРОЧКА",
          phone: 79128444444,
          email: "yulmanpet4@mail.ru",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        },
        acceptingPerson: {
          id: 526,
          role: "manager",
          name: "ЮЛИЯ МЕНЕДЖЕР ПЯТЕРОЧКА",
          phone: 79128444444,
          email: "yulmanpet4@mail.ru",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        },
        services: [
          {
            id: 624,
            count: 1,
            name: "Пекарь (Физическое лицо)",
            route: 0,
            dateStart: "2026-10-19T07:00:00.000000Z",
            dateEnd: "2026-10-21T16:00:00.000000Z",
            countSearch: 0,
            buttonBidNeed: true,
            buttonSearchNeed: false,
          },
        ],
        invitedPersons: [
          {
            id: 527,
            role: "supervisor",
            name: "ЮЛИЯ СУПЕРВАЙЗЕР ПЯТЕРОЧКА",
            phone: 79128455555,
            email: "yulsyppet5@mail.ru",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          },
        ],
        duration: {
          start: "2026-10-19T07:00:00.000000Z",
          end: "2026-10-21T16:00:00.000000Z",
        },
        userId: 526,
      },
      locations: [
        {
          value: "3",
          label: "«Пятёрочка» на Арбате д. 24  г.Москва Москва",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          disabled: false,
        },
        {
          value: "4",
          label: "Пятёрочка Аметьевская ул, д. 24, г. Казань Татарстан Респ",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          disabled: false,
        },
        {
          value: "17",
          label: "«Пятёрочка» на Новокузнецкой Москва",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          disabled: false,
        },
        {
          value: "18",
          label: "«Пятёрочка» на Садовой-Триумфальной Москва",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          disabled: false,
        },
      ],
      supervisorsToSelect: [
        {
          value: "527",
          label: "ЮЛИЯ СУПЕРВАЙЗЕР ПЯТЕРОЧКА",
          disabled: false,
        },
        {
          value: "883",
          label: "ТЕСТ ТЕСТ",
          disabled: false,
        },
      ],
      userId: 526,
      userRole: "manager",
      intervals: {
        id: 526,
        create_bid_interval: 2,
        cancel_task_interval: 2,
        repeat_task_interval: 2,
      },
    },
  },
  decorators: [
    (Story) => (
      <div>
        <p>
          TC-313: Кнопка "Повторить" не отображается для отмененной задачи в
          пределах допустимого интервала
        </p>
        <div>
          <p>Результат</p>в duration задан интервал в будущем, в intervals
          repeat_task_interval задан на 2 часа Кнопка отображается
        </div>
        <Story />
      </div>
    ),
  ],
});

// @ts-expect-error: `matches` won't align between test code and app code
export const TC_317 = meta.story({
  args: {
    loaderData: {
      entity: {
        id: "725",
        status: 3,
        place: {
          id: 4,
          name: "Пятёрочка Аметьевская ул, д. 24, г. Казань",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          region: "Татарстан Респ",
        },
        selfEmployed: false,
        route: 0,
        project: {
          id: 12,
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          name: "78412552 Пятерочка",
        },
        creatingPerson: {
          id: 526,
          role: "manager",
          name: "ЮЛИЯ МЕНЕДЖЕР ПЯТЕРОЧКА",
          phone: 79128444444,
          email: "yulmanpet4@mail.ru",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        },
        acceptingPerson: {
          id: 526,
          role: "manager",
          name: "ЮЛИЯ МЕНЕДЖЕР ПЯТЕРОЧКА",
          phone: 79128444444,
          email: "yulmanpet4@mail.ru",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        },
        services: [
          {
            id: 624,
            count: 1,
            name: "Пекарь (Физическое лицо)",
            route: 0,
            dateStart: "2026-10-19T07:00:00.000000Z",
            dateEnd: "2026-10-21T16:00:00.000000Z",
            countSearch: 0,
            buttonBidNeed: true,
            buttonSearchNeed: false,
          },
        ],
        invitedPersons: [
          {
            id: 527,
            role: "supervisor",
            name: "ЮЛИЯ СУПЕРВАЙЗЕР ПЯТЕРОЧКА",
            phone: 79128455555,
            email: "yulsyppet5@mail.ru",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          },
        ],
        duration: {
          start: "2026-10-19T07:00:00.000000Z",
          end: "2026-10-21T16:00:00.000000Z",
        },
        userId: 526,
      },
      locations: [
        {
          value: "3",
          label: "«Пятёрочка» на Арбате д. 24  г.Москва Москва",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          disabled: false,
        },
        {
          value: "4",
          label: "Пятёрочка Аметьевская ул, д. 24, г. Казань Татарстан Респ",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          disabled: false,
        },
        {
          value: "17",
          label: "«Пятёрочка» на Новокузнецкой Москва",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          disabled: false,
        },
        {
          value: "18",
          label: "«Пятёрочка» на Садовой-Триумфальной Москва",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          disabled: false,
        },
      ],
      supervisorsToSelect: [
        {
          value: "527",
          label: "ЮЛИЯ СУПЕРВАЙЗЕР ПЯТЕРОЧКА",
          disabled: false,
        },
        {
          value: "883",
          label: "ТЕСТ ТЕСТ",
          disabled: false,
        },
      ],
      userId: 526,
      userRole: "manager",
      intervals: {
        id: 526,
        create_bid_interval: 2,
        cancel_task_interval: 2,
        repeat_task_interval: 2,
      },
    },
  },
  decorators: [
    (Story) => (
      <div>
        <p>
          TC-317 Кнопка "Создать заявку" в задаче активна при нарушении
          временного интервала (менее 2 часов до начала услуги) [MEDIUM] Факт:
          Кнопка "Создать заявку" отображается активной
        </p>
        <p>Результат</p>
        <p>
          Интервал leave_bid(в запросе)(create_bid_interval в приложении) теперь
          отнимается от даты начала услуги и проверятся что полученная дата
          находится в будущем, если в будущем кнопку показываем, нет - не
          показываем
        </p>
        <div></div>
        <Story />
      </div>
    ),
  ],
});
