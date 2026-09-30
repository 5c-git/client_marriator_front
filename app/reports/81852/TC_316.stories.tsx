import preview from "../../../.storybook/preview";

// import { reactRouterParameters } from "storybook-addon-remix-react-router";

import Order from "~/routes/orders/order/order";

const meta = preview.meta({
  component: Order,
});

// @ts-expect-error: `matches` won't align between test code and app code
export const TC_316 = meta.story({
  args: {
    loaderData: {
      intervals: {
        id: 526,
        create_bid_interval: 2,
        cancel_order_interval: 2,
        repeat_order_interval: 2,
      },
      order: {
        id: "854",
        status: 3,
        place: {
          id: 3,
          name: "«Пятёрочка» на Арбате д. 24  г.Москва",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          region: "Москва",
        },
        selfEmployed: false,
        route: 0,
        services: [
          {
            id: 568,
            count: 1,
            name: "Пекарь (Физическое лицо)",
            route: 0,
            dateStart: "2026-10-01T07:00:00.000000Z",
            dateEnd: "2026-10-04T16:00:00.000000Z",
            countSearch: 0,
            buttonBidNeed: true,
            buttonSearchNeed: false,
          },
        ],
        project: null,
        creatingPerson: {
          id: 913,
          role: "client",
          name: "Клиент Для Теста",
          phone: 79128491111,
          email: "testclientmar@mail.ru",
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
        invitedPersons: [],
        duration: {
          start: "2026-09-01T17:00:00.000000Z",
          end: "2026-10-04T16:00:00.000000Z",
        },
        userId: 913,
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
          value: "526",
          label: "Назначить себя",
          disabled: false,
        },
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
      userRole: "manager",
    },
  },
  decorators: [
    (Story) => (
      <div>
        <p>
          TC-316 Кнопка "Создать заявку" в поручении активна при нарушении
          временного интервала (менее 2 часов до начала услуги) Факт: Кнопка
          "Создать заявку" отображается активной
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
