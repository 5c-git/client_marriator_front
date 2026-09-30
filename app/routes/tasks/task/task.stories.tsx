import preview from "../../../../.storybook/preview";

// import { reactRouterParameters } from "storybook-addon-remix-react-router";

import Task from "./task";

const meta = preview.meta({
  component: Task,
});

// @ts-expect-error: `matches` won't align between test code and app code
export const PrimaryEditable = meta.story({
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
        cancel_task_interval: 2,
        repeat_task_interval: 2,
      },
    },
  },
});
