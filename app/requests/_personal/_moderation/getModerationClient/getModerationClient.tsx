import { http, delay, HttpResponse } from "msw";

import {
  getModerationClientSuccessSchema,
  GetModerationClientSuccess,
} from "./getModerationClientSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const roleMap = {
  admin: "1",
  client: "2",
  manager: "3",
  recruiter: "4",
  specialist: "5",
  supervisor: "6",
};

export const getModerationClientKeys = ["getModerationClient"];

export const getModerationClient = async (
  accessToken: string,
  perPage: number,
  role: // | "admin"
    | "client"
    | "manager"
    // | "recruiter"
    | "specialist"
    | "supervisor",
  page: string | null,

  status: string | null,
  sort: string | null,
  search: string | null,
): Promise<GetModerationClientSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_MODERATION_CLIENT);

    if (page) {
      url.searchParams.append("page", page);
    } else {
      url.searchParams.append("page", "1");
    }

    if (status) {
      url.searchParams.append("status", status);
    }
    if (sort) {
      url.searchParams.append("sort", sort);
    }
    if (search) {
      url.searchParams.append("search", search);
    }

    url.searchParams.append("perPage", perPage.toString());

    url.searchParams.append("role", roleMap[role]);

    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const response = await request.json();

    let data;

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    const parsed = getModerationClientSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса getModerationClient не валидны схеме`);
    }

    return data;
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }

    if (error instanceof Error) {
      throw new UnxpectedError(error.message);
    } else {
      throw new UnxpectedError("Unknown unexpected error");
    }
  }
};

// MOCKS
export const mockResponseSuccess: GetModerationClientSuccess = {
  data: [
    {
      id: 537,
      name: "Пятерочка Тест Тестович",
      phone: 79009876541,
      email: "tetetetepet@mail.ru",
      logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
      project: [
        {
          id: 1,
          name: "Договор на оказание услуг Пятёрочка",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-31T00:00:00.000000Z",
          brand: [
            {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          ],
        },
      ],
      place: [
        {
          id: 3,
          name: "Пятёрочка МСК ул. Арбат д. 24",
          latitude: "37.59217700",
          longitude: "55.75007900",
          address_kladr: "ул. Арбат д. 24  г.Москва",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          region: {
            id: 2,
            name: "Москва",
          },
          brand: {
            id: 1,
            name: "Пятёрочка",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            description:
              "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
          },
        },
        {
          id: 4,
          name: "Пятёрочка Аметьевская ул, д. 24, г. Казань",
          latitude: "49.15342300",
          longitude: "55.77318600",
          address_kladr: "Аметьевская ул, д. 24, г. Казань, Татарстан респ.",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          region: {
            id: 1,
            name: "Татарстан Респ",
          },
          brand: {
            id: 1,
            name: "Пятёрочка",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            description:
              "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
          },
        },
      ],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "21:00:00",
      cancel_order: "21:15:00",
      live_order: "21:30:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: true,
      finishRegister: true,
    },
    {
      id: 536,
      name: "Пятерочкин Иван Иванович",
      phone: 79001234567,
      email: "clientppp1@mail.ru",
      logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
      project: [
        {
          id: 1,
          name: "Договор на оказание услуг Пятёрочка",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-31T00:00:00.000000Z",
          brand: [
            {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          ],
        },
      ],
      place: [
        {
          id: 3,
          name: "Пятёрочка МСК ул. Арбат д. 24",
          latitude: "37.59217700",
          longitude: "55.75007900",
          address_kladr: "ул. Арбат д. 24  г.Москва",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          region: {
            id: 2,
            name: "Москва",
          },
          brand: {
            id: 1,
            name: "Пятёрочка",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            description:
              "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
          },
        },
        {
          id: 4,
          name: "Пятёрочка Аметьевская ул, д. 24, г. Казань",
          latitude: "49.15342300",
          longitude: "55.77318600",
          address_kladr: "Аметьевская ул, д. 24, г. Казань, Татарстан респ.",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          region: {
            id: 1,
            name: "Татарстан Респ",
          },
          brand: {
            id: 1,
            name: "Пятёрочка",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            description:
              "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
          },
        },
      ],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "02:00",
      cancel_order: "02:00",
      live_order: "02:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: false,
      finishRegister: false,
    },
    {
      id: 528,
      name: "ЮЛИЯ КЛИЕНТ ПЯТЕРОЧКА",
      phone: 79128466666,
      email: "yulcliepet6@mail.ru",
      logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
      project: [
        {
          id: 1,
          name: "Договор на оказание услуг Пятёрочка",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-31T00:00:00.000000Z",
          brand: [
            {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          ],
        },
      ],
      place: [
        {
          id: 3,
          name: "Пятёрочка МСК ул. Арбат д. 24",
          latitude: "37.59217700",
          longitude: "55.75007900",
          address_kladr: "ул. Арбат д. 24  г.Москва",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          region: {
            id: 2,
            name: "Москва",
          },
          brand: {
            id: 1,
            name: "Пятёрочка",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            description:
              "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
          },
        },
        {
          id: 4,
          name: "Пятёрочка Аметьевская ул, д. 24, г. Казань",
          latitude: "49.15342300",
          longitude: "55.77318600",
          address_kladr: "Аметьевская ул, д. 24, г. Казань, Татарстан респ.",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          region: {
            id: 1,
            name: "Татарстан Респ",
          },
          brand: {
            id: 1,
            name: "Пятёрочка",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            description:
              "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
          },
        },
      ],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "23:00:00",
      cancel_order: "23:00:00",
      live_order: "23:00:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: true,
      finishRegister: true,
    },
    {
      id: 525,
      name: null,
      phone: 77713571957,
      email: "fvfdkfvffdfdfv@tt.tt",
      logo: null,
      project: [
        {
          id: 6,
          name: "Зеленое яблоко",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-09T00:00:00.000000Z",
          brand: [
            {
              id: 5,
              name: "Зеленое яблоко",
              logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
              description: "Зеленое яблоко",
            },
          ],
        },
      ],
      place: [],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "02:00",
      cancel_order: "02:00",
      live_order: "02:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: false,
      finishRegister: false,
    },
    {
      id: 524,
      name: null,
      phone: 777135717957,
      email: "fvfdfvffdfdfv@tt.tt",
      logo: null,
      project: [
        {
          id: 6,
          name: "Зеленое яблоко",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-09T00:00:00.000000Z",
          brand: [
            {
              id: 5,
              name: "Зеленое яблоко",
              logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
              description: "Зеленое яблоко",
            },
          ],
        },
      ],
      place: [],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "02:00",
      cancel_order: "02:00",
      live_order: "02:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: false,
      finishRegister: false,
    },
    {
      id: 523,
      name: null,
      phone: 77713571757,
      email: "fvdfvffdfdfv@tt.tt",
      logo: null,
      project: [
        {
          id: 6,
          name: "Зеленое яблоко",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-09T00:00:00.000000Z",
          brand: [
            {
              id: 5,
              name: "Зеленое яблоко",
              logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
              description: "Зеленое яблоко",
            },
          ],
        },
      ],
      place: [],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "02:00",
      cancel_order: "02:00",
      live_order: "02:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: false,
      finishRegister: false,
    },
    {
      id: 522,
      name: null,
      phone: 77713577757,
      email: "fvdfvdfdfv@tt.tt",
      logo: null,
      project: [
        {
          id: 6,
          name: "Зеленое яблоко",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-09T00:00:00.000000Z",
          brand: [
            {
              id: 5,
              name: "Зеленое яблоко",
              logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
              description: "Зеленое яблоко",
            },
          ],
        },
      ],
      place: [],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "02:00",
      cancel_order: "02:00",
      live_order: "02:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: false,
      finishRegister: false,
    },
    {
      id: 517,
      name: null,
      phone: 77713577777,
      email: "fvdfvddfv@tt.tt",
      logo: null,
      project: [
        {
          id: 6,
          name: "Зеленое яблоко",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-09T00:00:00.000000Z",
          brand: [
            {
              id: 5,
              name: "Зеленое яблоко",
              logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
              description: "Зеленое яблоко",
            },
          ],
        },
      ],
      place: [],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "02:00",
      cancel_order: "02:00",
      live_order: "02:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: false,
      finishRegister: false,
    },
    {
      id: 513,
      name: null,
      phone: 79881010121,
      email: "client121@mail.ru",
      logo: null,
      project: [
        {
          id: 1,
          name: "Договор на оказание услуг Пятёрочка",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-31T00:00:00.000000Z",
          brand: [
            {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          ],
        },
      ],
      place: [],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "02:00",
      cancel_order: "02:00",
      live_order: "02:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: false,
      finishRegister: false,
    },
    {
      id: 512,
      name: null,
      phone: 79881010120,
      email: "client120@mail.ru",
      logo: null,
      project: [
        {
          id: 1,
          name: "Договор на оказание услуг Пятёрочка",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-31T00:00:00.000000Z",
          brand: [
            {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          ],
        },
        {
          id: 2,
          name: "45342345345234 Ашан",
          dateStart: "2025-12-09T19:36:52.000000Z",
          dateEnd: "2025-12-09T19:36:52.000000Z",
          brand: [
            {
              id: 2,
              name: "Ашан",
              logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
              description:
                "Розничная сеть Auchan Retail является основной составляющей группы ELO, которая, в свою очередь, контролируется семейной корпорацией «Ассоциация семьи Мюлье».",
            },
          ],
        },
        {
          id: 6,
          name: "Зеленое яблоко",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-09T00:00:00.000000Z",
          brand: [
            {
              id: 5,
              name: "Зеленое яблоко",
              logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
              description: "Зеленое яблоко",
            },
          ],
        },
        {
          id: 8,
          name: "АШАН 2",
          dateStart: "2025-12-09T19:36:52.000000Z",
          dateEnd: "2025-12-09T19:36:52.000000Z",
          brand: [
            {
              id: 2,
              name: "Ашан",
              logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
              description:
                "Розничная сеть Auchan Retail является основной составляющей группы ELO, которая, в свою очередь, контролируется семейной корпорацией «Ассоциация семьи Мюлье».",
            },
          ],
        },
      ],
      place: [],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "02:00",
      cancel_order: "02:00",
      live_order: "02:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: false,
      finishRegister: false,
    },
    {
      id: 506,
      name: null,
      phone: 79881010117,
      email: "client117@mail.ru",
      logo: null,
      project: [
        {
          id: 1,
          name: "Договор на оказание услуг Пятёрочка",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-31T00:00:00.000000Z",
          brand: [
            {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          ],
        },
        {
          id: 6,
          name: "Зеленое яблоко",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-09T00:00:00.000000Z",
          brand: [
            {
              id: 5,
              name: "Зеленое яблоко",
              logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
              description: "Зеленое яблоко",
            },
          ],
        },
      ],
      place: [],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "02:00",
      cancel_order: "02:00",
      live_order: "02:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: false,
      finishRegister: false,
    },
    {
      id: 504,
      name: null,
      phone: 79881010116,
      email: "client116@mail.ru",
      logo: null,
      project: [
        {
          id: 1,
          name: "Договор на оказание услуг Пятёрочка",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-31T00:00:00.000000Z",
          brand: [
            {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          ],
        },
        {
          id: 6,
          name: "Зеленое яблоко",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-09T00:00:00.000000Z",
          brand: [
            {
              id: 5,
              name: "Зеленое яблоко",
              logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
              description: "Зеленое яблоко",
            },
          ],
        },
      ],
      place: [],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "02:00",
      cancel_order: "02:00",
      live_order: "02:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: false,
      finishRegister: false,
    },
    {
      id: 499,
      name: null,
      phone: 78654321123,
      email: "tet@gmail.com",
      logo: null,
      project: [
        {
          id: 1,
          name: "Договор на оказание услуг Пятёрочка",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-31T00:00:00.000000Z",
          brand: [
            {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          ],
        },
      ],
      place: [],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "02:00",
      cancel_order: "02:00",
      live_order: "02:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: false,
      finishRegister: false,
    },
    {
      id: 498,
      name: null,
      phone: 79896322222,
      email: "peterclient222@mail.ru",
      logo: null,
      project: [
        {
          id: 1,
          name: "Договор на оказание услуг Пятёрочка",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-31T00:00:00.000000Z",
          brand: [
            {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          ],
        },
      ],
      place: [],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "02:00",
      cancel_order: "02:00",
      live_order: "02:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: false,
      finishRegister: false,
    },
    {
      id: 493,
      name: "КЛИЕНТ АШАН 2",
      phone: 79881010111,
      email: "client111@mail.ru",
      logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
      project: [
        {
          id: 2,
          name: "45342345345234 Ашан",
          dateStart: "2025-12-09T19:36:52.000000Z",
          dateEnd: "2025-12-09T19:36:52.000000Z",
          brand: [
            {
              id: 2,
              name: "Ашан",
              logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
              description:
                "Розничная сеть Auchan Retail является основной составляющей группы ELO, которая, в свою очередь, контролируется семейной корпорацией «Ассоциация семьи Мюлье».",
            },
          ],
        },
        {
          id: 8,
          name: "АШАН 2",
          dateStart: "2025-12-09T19:36:52.000000Z",
          dateEnd: "2025-12-09T19:36:52.000000Z",
          brand: [
            {
              id: 2,
              name: "Ашан",
              logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
              description:
                "Розничная сеть Auchan Retail является основной составляющей группы ELO, которая, в свою очередь, контролируется семейной корпорацией «Ассоциация семьи Мюлье».",
            },
          ],
        },
      ],
      place: [
        {
          id: 1,
          name: "Ашан МСК Рязанский пр-т, д. 2, корп. 2, Москва",
          latitude: "37.73043700",
          longitude: "55.72987300",
          address_kladr: "Рязанский пр-т, д. 2, корп. 2, Москва",
          logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
          region: {
            id: 2,
            name: "Москва",
          },
          brand: {
            id: 2,
            name: "Ашан",
            logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
            description:
              "Розничная сеть Auchan Retail является основной составляющей группы ELO, которая, в свою очередь, контролируется семейной корпорацией «Ассоциация семьи Мюлье».",
          },
        },
        {
          id: 11,
          name: "Ашан Раменки",
          latitude: "37.53385600",
          longitude: "55.69889900",
          address_kladr: "Ленинские горы м-н 1, Раменки, Москва",
          logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
          region: {
            id: 2,
            name: "Москва",
          },
          brand: {
            id: 2,
            name: "Ашан",
            logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
            description:
              "Розничная сеть Auchan Retail является основной составляющей группы ELO, которая, в свою очередь, контролируется семейной корпорацией «Ассоциация семьи Мюлье».",
          },
        },
      ],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "23:30:00",
      cancel_order: "02:30:00",
      live_order: "15:30:00",
      change_task: "15:30:00",
      cancel_task: "15:30:00",
      live_task: "15:30:00",
      repeat_bid: "15:30:00",
      leave_bid: "15:30:00",
      refusal_task: "15:30:00",
      waiting_task: 2,
      count_wait_bid: 1,
      time_answer_bid: 24,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [
        {
          id: 1,
          name: 'ООО "ФАВОРИТ"',
          ogrn: "1040501262867",
          legal_address: "115054, город Москва, Дубининская ул., д.57 стр.1",
          legal_email: "115054, город Москва, Дубининская ул., д.57 стр.1",
        },
      ],
      confirmRegister: true,
      finishRegister: true,
    },
    {
      id: 490,
      name: "КЛИЕНТ ЗЯ",
      phone: 79881010110,
      email: "client.z.yabl10@mail.ru",
      logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
      project: [
        {
          id: 6,
          name: "Зеленое яблоко",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-09T00:00:00.000000Z",
          brand: [
            {
              id: 5,
              name: "Зеленое яблоко",
              logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
              description: "Зеленое яблоко",
            },
          ],
        },
      ],
      place: [
        {
          id: 8,
          name: "Зеленое яблоко , ул. Арбат д. 20  г.Москва",
          latitude: "37.59350700",
          longitude: "55.75033500",
          address_kladr: "ул. Арбат д. 20  г.Москва",
          logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
          region: {
            id: 2,
            name: "Москва",
          },
          brand: {
            id: 5,
            name: "Зеленое яблоко",
            logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
            description: "Зеленое яблоко",
          },
        },
        {
          id: 9,
          name: "Зеленое яблоко, Раменки",
          latitude: "37.53385600",
          longitude: "55.69889900",
          address_kladr: "Ленинские горы м-н, Раменки, Москва",
          logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
          region: {
            id: 2,
            name: "Москва",
          },
          brand: {
            id: 5,
            name: "Зеленое яблоко",
            logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
            description: "Зеленое яблоко",
          },
        },
        {
          id: 10,
          name: "Зеленое яблоко , ул. Арбат д. 24  г.Москва",
          latitude: "37.59217700",
          longitude: "55.75007900",
          address_kladr: "ул. Арбат д. 24  г.Москва",
          logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
          region: {
            id: 2,
            name: "Москва",
          },
          brand: {
            id: 5,
            name: "Зеленое яблоко",
            logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
            description: "Зеленое яблоко",
          },
        },
      ],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "23:00:00",
      cancel_order: "23:00:00",
      live_order: "23:00:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: true,
      finishRegister: true,
    },
    {
      id: 489,
      name: null,
      phone: 79886951723,
      email: "erfvggdvf@tt.tt",
      logo: null,
      project: [
        {
          id: 1,
          name: "Договор на оказание услуг Пятёрочка",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-31T00:00:00.000000Z",
          brand: [
            {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          ],
        },
        {
          id: 2,
          name: "45342345345234 Ашан",
          dateStart: "2025-12-09T19:36:52.000000Z",
          dateEnd: "2025-12-09T19:36:52.000000Z",
          brand: [
            {
              id: 2,
              name: "Ашан",
              logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
              description:
                "Розничная сеть Auchan Retail является основной составляющей группы ELO, которая, в свою очередь, контролируется семейной корпорацией «Ассоциация семьи Мюлье».",
            },
          ],
        },
        {
          id: 8,
          name: "АШАН 2",
          dateStart: "2025-12-09T19:36:52.000000Z",
          dateEnd: "2025-12-09T19:36:52.000000Z",
          brand: [
            {
              id: 2,
              name: "Ашан",
              logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
              description:
                "Розничная сеть Auchan Retail является основной составляющей группы ELO, которая, в свою очередь, контролируется семейной корпорацией «Ассоциация семьи Мюлье».",
            },
          ],
        },
      ],
      place: [],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "02:00",
      cancel_order: "02:00",
      live_order: "02:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: false,
      finishRegister: false,
    },
    {
      id: 476,
      name: null,
      phone: 79884561235,
      email: "client.b@mail.ru",
      logo: null,
      project: [
        {
          id: 1,
          name: "Договор на оказание услуг Пятёрочка",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-31T00:00:00.000000Z",
          brand: [
            {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          ],
        },
        {
          id: 2,
          name: "45342345345234 Ашан",
          dateStart: "2025-12-09T19:36:52.000000Z",
          dateEnd: "2025-12-09T19:36:52.000000Z",
          brand: [
            {
              id: 2,
              name: "Ашан",
              logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
              description:
                "Розничная сеть Auchan Retail является основной составляющей группы ELO, которая, в свою очередь, контролируется семейной корпорацией «Ассоциация семьи Мюлье».",
            },
          ],
        },
      ],
      place: [],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "02:00",
      cancel_order: "02:00",
      live_order: "02:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: false,
      finishRegister: false,
    },
    {
      id: 475,
      name: null,
      phone: 79886541235,
      email: "client.z.ya555@mail.ru",
      logo: null,
      project: [
        {
          id: 2,
          name: "45342345345234 Ашан",
          dateStart: "2025-12-09T19:36:52.000000Z",
          dateEnd: "2025-12-09T19:36:52.000000Z",
          brand: [
            {
              id: 2,
              name: "Ашан",
              logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
              description:
                "Розничная сеть Auchan Retail является основной составляющей группы ELO, которая, в свою очередь, контролируется семейной корпорацией «Ассоциация семьи Мюлье».",
            },
          ],
        },
        {
          id: 6,
          name: "Зеленое яблоко",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-09T00:00:00.000000Z",
          brand: [
            {
              id: 5,
              name: "Зеленое яблоко",
              logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
              description: "Зеленое яблоко",
            },
          ],
        },
      ],
      place: [],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "02:00",
      cancel_order: "02:00",
      live_order: "02:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: false,
      finishRegister: false,
    },
    {
      id: 474,
      name: "Клиент ОБЩИЙ",
      phone: 79884561232,
      email: "client.z.yab22@mail.ru",
      logo: null,
      project: [
        {
          id: 6,
          name: "Зеленое яблоко",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-09T00:00:00.000000Z",
          brand: [
            {
              id: 5,
              name: "Зеленое яблоко",
              logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
              description: "Зеленое яблоко",
            },
          ],
        },
      ],
      place: [],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "02:00",
      cancel_order: "02:00",
      live_order: "02:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: false,
      finishRegister: false,
    },
    {
      id: 472,
      name: "КЛИЕНТ З.ЯБЛОКО",
      phone: 79881010104,
      email: "client.z.yab@mail.ru",
      logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
      project: [
        {
          id: 1,
          name: "Договор на оказание услуг Пятёрочка",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-31T00:00:00.000000Z",
          brand: [
            {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          ],
        },
        {
          id: 2,
          name: "45342345345234 Ашан",
          dateStart: "2025-12-09T19:36:52.000000Z",
          dateEnd: "2025-12-09T19:36:52.000000Z",
          brand: [
            {
              id: 2,
              name: "Ашан",
              logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
              description:
                "Розничная сеть Auchan Retail является основной составляющей группы ELO, которая, в свою очередь, контролируется семейной корпорацией «Ассоциация семьи Мюлье».",
            },
          ],
        },
        {
          id: 6,
          name: "Зеленое яблоко",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-09T00:00:00.000000Z",
          brand: [
            {
              id: 5,
              name: "Зеленое яблоко",
              logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
              description: "Зеленое яблоко",
            },
          ],
        },
      ],
      place: [
        {
          id: 1,
          name: "Ашан МСК Рязанский пр-т, д. 2, корп. 2, Москва",
          latitude: "37.73043700",
          longitude: "55.72987300",
          address_kladr: "Рязанский пр-т, д. 2, корп. 2, Москва",
          logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
          region: {
            id: 2,
            name: "Москва",
          },
          brand: {
            id: 2,
            name: "Ашан",
            logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
            description:
              "Розничная сеть Auchan Retail является основной составляющей группы ELO, которая, в свою очередь, контролируется семейной корпорацией «Ассоциация семьи Мюлье».",
          },
        },
        {
          id: 2,
          name: "Ашан ТАТ ул Бурхана Шахиди , д. 17 , Респ Татарстан , г Казань, респ. Татарстан",
          latitude: "49.10654900",
          longitude: "55.78676900",
          address_kladr:
            "ул Бурхана Шахиди , д. 17 , Респ Татарстан , г Казань, респ. Татарстан",
          logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
          region: {
            id: 1,
            name: "Татарстан Респ",
          },
          brand: {
            id: 2,
            name: "Ашан",
            logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
            description:
              "Розничная сеть Auchan Retail является основной составляющей группы ELO, которая, в свою очередь, контролируется семейной корпорацией «Ассоциация семьи Мюлье».",
          },
        },
        {
          id: 3,
          name: "Пятёрочка МСК ул. Арбат д. 24",
          latitude: "37.59217700",
          longitude: "55.75007900",
          address_kladr: "ул. Арбат д. 24  г.Москва",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          region: {
            id: 2,
            name: "Москва",
          },
          brand: {
            id: 1,
            name: "Пятёрочка",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            description:
              "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
          },
        },
        {
          id: 4,
          name: "Пятёрочка Аметьевская ул, д. 24, г. Казань",
          latitude: "49.15342300",
          longitude: "55.77318600",
          address_kladr: "Аметьевская ул, д. 24, г. Казань, Татарстан респ.",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          region: {
            id: 1,
            name: "Татарстан Респ",
          },
          brand: {
            id: 1,
            name: "Пятёрочка",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            description:
              "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
          },
        },
        {
          id: 8,
          name: "Зеленое яблоко , ул. Арбат д. 20  г.Москва",
          latitude: "37.59350700",
          longitude: "55.75033500",
          address_kladr: "ул. Арбат д. 20  г.Москва",
          logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
          region: {
            id: 2,
            name: "Москва",
          },
          brand: {
            id: 5,
            name: "Зеленое яблоко",
            logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
            description: "Зеленое яблоко",
          },
        },
        {
          id: 9,
          name: "Зеленое яблоко, Раменки",
          latitude: "37.53385600",
          longitude: "55.69889900",
          address_kladr: "Ленинские горы м-н, Раменки, Москва",
          logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
          region: {
            id: 2,
            name: "Москва",
          },
          brand: {
            id: 5,
            name: "Зеленое яблоко",
            logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
            description: "Зеленое яблоко",
          },
        },
        {
          id: 10,
          name: "Зеленое яблоко , ул. Арбат д. 24  г.Москва",
          latitude: "37.59217700",
          longitude: "55.75007900",
          address_kladr: "ул. Арбат д. 24  г.Москва",
          logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
          region: {
            id: 2,
            name: "Москва",
          },
          brand: {
            id: 5,
            name: "Зеленое яблоко",
            logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
            description: "Зеленое яблоко",
          },
        },
      ],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "02:00",
      cancel_order: "02:00",
      live_order: "02:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: true,
      finishRegister: false,
    },
    {
      id: 458,
      name: "КЛИЕНТ АШАН ЮЛЯ",
      phone: 79872222222,
      email: "ashancliyul@mail.ru",
      logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
      project: [
        {
          id: 2,
          name: "45342345345234 Ашан",
          dateStart: "2025-12-09T19:36:52.000000Z",
          dateEnd: "2025-12-09T19:36:52.000000Z",
          brand: [
            {
              id: 2,
              name: "Ашан",
              logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
              description:
                "Розничная сеть Auchan Retail является основной составляющей группы ELO, которая, в свою очередь, контролируется семейной корпорацией «Ассоциация семьи Мюлье».",
            },
          ],
        },
      ],
      place: [
        {
          id: 1,
          name: "Ашан МСК Рязанский пр-т, д. 2, корп. 2, Москва",
          latitude: "37.73043700",
          longitude: "55.72987300",
          address_kladr: "Рязанский пр-т, д. 2, корп. 2, Москва",
          logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
          region: {
            id: 2,
            name: "Москва",
          },
          brand: {
            id: 2,
            name: "Ашан",
            logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
            description:
              "Розничная сеть Auchan Retail является основной составляющей группы ELO, которая, в свою очередь, контролируется семейной корпорацией «Ассоциация семьи Мюлье».",
          },
        },
        {
          id: 2,
          name: "Ашан ТАТ ул Бурхана Шахиди , д. 17 , Респ Татарстан , г Казань, респ. Татарстан",
          latitude: "49.10654900",
          longitude: "55.78676900",
          address_kladr:
            "ул Бурхана Шахиди , д. 17 , Респ Татарстан , г Казань, респ. Татарстан",
          logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
          region: {
            id: 1,
            name: "Татарстан Респ",
          },
          brand: {
            id: 2,
            name: "Ашан",
            logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
            description:
              "Розничная сеть Auchan Retail является основной составляющей группы ELO, которая, в свою очередь, контролируется семейной корпорацией «Ассоциация семьи Мюлье».",
          },
        },
      ],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "02:00",
      cancel_order: "02:00",
      live_order: "02:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: true,
      finishRegister: true,
    },
    {
      id: 455,
      name: "КЛИЕНТ АШАН НОВЫЙ",
      phone: 79886565553,
      email: "client12@mail.ru",
      logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
      project: [
        {
          id: 2,
          name: "45342345345234 Ашан",
          dateStart: "2025-12-09T19:36:52.000000Z",
          dateEnd: "2025-12-09T19:36:52.000000Z",
          brand: [
            {
              id: 2,
              name: "Ашан",
              logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
              description:
                "Розничная сеть Auchan Retail является основной составляющей группы ELO, которая, в свою очередь, контролируется семейной корпорацией «Ассоциация семьи Мюлье».",
            },
          ],
        },
      ],
      place: [
        {
          id: 1,
          name: "Ашан МСК Рязанский пр-т, д. 2, корп. 2, Москва",
          latitude: "37.73043700",
          longitude: "55.72987300",
          address_kladr: "Рязанский пр-т, д. 2, корп. 2, Москва",
          logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
          region: {
            id: 2,
            name: "Москва",
          },
          brand: {
            id: 2,
            name: "Ашан",
            logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
            description:
              "Розничная сеть Auchan Retail является основной составляющей группы ELO, которая, в свою очередь, контролируется семейной корпорацией «Ассоциация семьи Мюлье».",
          },
        },
        {
          id: 2,
          name: "Ашан ТАТ ул Бурхана Шахиди , д. 17 , Респ Татарстан , г Казань, респ. Татарстан",
          latitude: "49.10654900",
          longitude: "55.78676900",
          address_kladr:
            "ул Бурхана Шахиди , д. 17 , Респ Татарстан , г Казань, респ. Татарстан",
          logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
          region: {
            id: 1,
            name: "Татарстан Респ",
          },
          brand: {
            id: 2,
            name: "Ашан",
            logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
            description:
              "Розничная сеть Auchan Retail является основной составляющей группы ELO, которая, в свою очередь, контролируется семейной корпорацией «Ассоциация семьи Мюлье».",
          },
        },
      ],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "20:59:00",
      cancel_order: "20:59:00",
      live_order: "20:59:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: true,
      finishRegister: true,
    },
    {
      id: 454,
      name: null,
      phone: 798879518899,
      email: "client123456@mail.ru",
      logo: null,
      project: [
        {
          id: 2,
          name: "45342345345234 Ашан",
          dateStart: "2025-12-09T19:36:52.000000Z",
          dateEnd: "2025-12-09T19:36:52.000000Z",
          brand: [
            {
              id: 2,
              name: "Ашан",
              logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
              description:
                "Розничная сеть Auchan Retail является основной составляющей группы ELO, которая, в свою очередь, контролируется семейной корпорацией «Ассоциация семьи Мюлье».",
            },
          ],
        },
      ],
      place: [],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "02:00",
      cancel_order: "02:00",
      live_order: "02:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: false,
      finishRegister: false,
    },
    {
      id: 449,
      name: "ТЕСТОВЫЙ КЛИЕНТ 5",
      phone: 79884561231,
      email: "client231@mail.ru",
      logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
      project: [
        {
          id: 1,
          name: "Договор на оказание услуг Пятёрочка",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-31T00:00:00.000000Z",
          brand: [
            {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          ],
        },
      ],
      place: [
        {
          id: 3,
          name: "Пятёрочка МСК ул. Арбат д. 24",
          latitude: "37.59217700",
          longitude: "55.75007900",
          address_kladr: "ул. Арбат д. 24  г.Москва",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          region: {
            id: 2,
            name: "Москва",
          },
          brand: {
            id: 1,
            name: "Пятёрочка",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            description:
              "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
          },
        },
        {
          id: 4,
          name: "Пятёрочка Аметьевская ул, д. 24, г. Казань",
          latitude: "49.15342300",
          longitude: "55.77318600",
          address_kladr: "Аметьевская ул, д. 24, г. Казань, Татарстан респ.",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          region: {
            id: 1,
            name: "Татарстан Респ",
          },
          brand: {
            id: 1,
            name: "Пятёрочка",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            description:
              "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
          },
        },
      ],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "03:59:00",
      cancel_order: "20:59:00",
      live_order: "20:59:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: true,
      finishRegister: true,
    },
    {
      id: 447,
      name: "Тест КЛИЕНТ",
      phone: 79887951919,
      email: "clienttest@mail.ru",
      logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
      project: [
        {
          id: 1,
          name: "Договор на оказание услуг Пятёрочка",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-31T00:00:00.000000Z",
          brand: [
            {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          ],
        },
      ],
      place: [
        {
          id: 3,
          name: "Пятёрочка МСК ул. Арбат д. 24",
          latitude: "37.59217700",
          longitude: "55.75007900",
          address_kladr: "ул. Арбат д. 24  г.Москва",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          region: {
            id: 2,
            name: "Москва",
          },
          brand: {
            id: 1,
            name: "Пятёрочка",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            description:
              "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
          },
        },
        {
          id: 4,
          name: "Пятёрочка Аметьевская ул, д. 24, г. Казань",
          latitude: "49.15342300",
          longitude: "55.77318600",
          address_kladr: "Аметьевская ул, д. 24, г. Казань, Татарстан респ.",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          region: {
            id: 1,
            name: "Татарстан Респ",
          },
          brand: {
            id: 1,
            name: "Пятёрочка",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            description:
              "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
          },
        },
      ],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "05:00:00",
      cancel_order: "20:59:00",
      live_order: "20:59:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: true,
      finishRegister: true,
    },
    {
      id: 445,
      name: "ТЕСТ",
      phone: 79884561212,
      email: "manager4561212@mail.ru",
      logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
      project: [
        {
          id: 1,
          name: "Договор на оказание услуг Пятёрочка",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-31T00:00:00.000000Z",
          brand: [
            {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          ],
        },
      ],
      place: [],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "02:00",
      cancel_order: "02:00",
      live_order: "02:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: false,
      finishRegister: false,
    },
    {
      id: 442,
      name: null,
      phone: 79281112233,
      email: "client2233@mail.ru",
      logo: null,
      project: [
        {
          id: 1,
          name: "Договор на оказание услуг Пятёрочка",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-31T00:00:00.000000Z",
          brand: [
            {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          ],
        },
      ],
      place: [],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "02:00",
      cancel_order: "02:00",
      live_order: "02:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: false,
      finishRegister: false,
    },
    {
      id: 440,
      name: "НОВЫЙ КЛИЕНТ ПЯТЕРОЧКА",
      phone: 79287774411,
      email: "client666@mail.ru",
      logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
      project: [
        {
          id: 1,
          name: "Договор на оказание услуг Пятёрочка",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-31T00:00:00.000000Z",
          brand: [
            {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          ],
        },
      ],
      place: [
        {
          id: 3,
          name: "Пятёрочка МСК ул. Арбат д. 24",
          latitude: "37.59217700",
          longitude: "55.75007900",
          address_kladr: "ул. Арбат д. 24  г.Москва",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          region: {
            id: 2,
            name: "Москва",
          },
          brand: {
            id: 1,
            name: "Пятёрочка",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            description:
              "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
          },
        },
        {
          id: 4,
          name: "Пятёрочка Аметьевская ул, д. 24, г. Казань",
          latitude: "49.15342300",
          longitude: "55.77318600",
          address_kladr: "Аметьевская ул, д. 24, г. Казань, Татарстан респ.",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          region: {
            id: 1,
            name: "Татарстан Респ",
          },
          brand: {
            id: 1,
            name: "Пятёрочка",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            description:
              "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
          },
        },
      ],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "23:30:00",
      cancel_order: "02:30:00",
      live_order: "15:30:00",
      change_task: "15:30:00",
      cancel_task: "15:30:00",
      live_task: "15:30:00",
      repeat_bid: "15:30:00",
      leave_bid: "15:30:00",
      refusal_task: "15:30:00",
      waiting_task: 2,
      count_wait_bid: 1,
      time_answer_bid: 24,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: false,
      finishRegister: false,
    },
    {
      id: 427,
      name: "КЛИЕНТ тест",
      phone: 79885000555,
      email: "client09@mail.ru",
      logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
      project: [
        {
          id: 1,
          name: "Договор на оказание услуг Пятёрочка",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-31T00:00:00.000000Z",
          brand: [
            {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          ],
        },
      ],
      place: [
        {
          id: 3,
          name: "Пятёрочка МСК ул. Арбат д. 24",
          latitude: "37.59217700",
          longitude: "55.75007900",
          address_kladr: "ул. Арбат д. 24  г.Москва",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          region: {
            id: 2,
            name: "Москва",
          },
          brand: {
            id: 1,
            name: "Пятёрочка",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            description:
              "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
          },
        },
      ],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "20:59:00",
      cancel_order: "20:59:00",
      live_order: "20:59:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: true,
      finishRegister: true,
    },
    {
      id: 425,
      name: "КЛИЕНТ 5",
      phone: 79887771122,
      email: "client1122@mail.ru",
      logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
      project: [],
      place: [],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "02:00",
      cancel_order: "02:00",
      live_order: "02:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: false,
      finishRegister: false,
    },
    {
      id: 424,
      name: "КЛИЕНТ 5",
      phone: 79887950000,
      email: "client0000@mail.ru",
      logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
      project: [],
      place: [],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "02:00",
      cancel_order: "02:00",
      live_order: "02:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: false,
      finishRegister: false,
    },
    {
      id: 423,
      name: null,
      phone: 79887958888,
      email: "client888@mail.ru",
      logo: null,
      project: [
        {
          id: 1,
          name: "Договор на оказание услуг Пятёрочка",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-31T00:00:00.000000Z",
          brand: [
            {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          ],
        },
      ],
      place: [],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "02:00",
      cancel_order: "02:00",
      live_order: "02:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: false,
      finishRegister: false,
    },
    {
      id: 422,
      name: "КЛИЕНТ ПЯТЁРОЧКА САИДА",
      phone: 79887959999,
      email: "client9999@mail.ru",
      logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
      project: [
        {
          id: 1,
          name: "Договор на оказание услуг Пятёрочка",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-31T00:00:00.000000Z",
          brand: [
            {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          ],
        },
      ],
      place: [
        {
          id: 3,
          name: "Пятёрочка МСК ул. Арбат д. 24",
          latitude: "37.59217700",
          longitude: "55.75007900",
          address_kladr: "ул. Арбат д. 24  г.Москва",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          region: {
            id: 2,
            name: "Москва",
          },
          brand: {
            id: 1,
            name: "Пятёрочка",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            description:
              "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
          },
        },
      ],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "02:00",
      cancel_order: "02:00",
      live_order: "02:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [
        {
          id: 2,
          name: 'ООО "РИТЕЙЛ"',
          ogrn: "1247700388187",
          legal_address:
            "107078, г. Москва, вн.тер.г. Муниципальный Округ Красносельский, пер Докучаев, д. 2, помещ. 2/1",
          legal_email:
            "107078, г. Москва, вн.тер.г. Муниципальный Округ Красносельский, пер Докучаев, д. 2, помещ. 2/1",
        },
      ],
      confirmRegister: false,
      finishRegister: false,
    },
    {
      id: 420,
      name: "КЛИЕНТ ТЕСТ ПЯТЁРОЧКА",
      phone: 79887955151,
      email: "client5151@mail.ru",
      logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
      project: [
        {
          id: 1,
          name: "Договор на оказание услуг Пятёрочка",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-31T00:00:00.000000Z",
          brand: [
            {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          ],
        },
      ],
      place: [
        {
          id: 3,
          name: "Пятёрочка МСК ул. Арбат д. 24",
          latitude: "37.59217700",
          longitude: "55.75007900",
          address_kladr: "ул. Арбат д. 24  г.Москва",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          region: {
            id: 2,
            name: "Москва",
          },
          brand: {
            id: 1,
            name: "Пятёрочка",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            description:
              "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
          },
        },
      ],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "19:59:00",
      cancel_order: "19:59:00",
      live_order: "19:59:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: true,
      finishRegister: true,
    },
    {
      id: 419,
      name: null,
      phone: 79887956161,
      email: "client6161@mail.ru",
      logo: null,
      project: [
        {
          id: 1,
          name: "Договор на оказание услуг Пятёрочка",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-31T00:00:00.000000Z",
          brand: [
            {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          ],
        },
      ],
      place: [
        {
          id: 3,
          name: "Пятёрочка МСК ул. Арбат д. 24",
          latitude: "37.59217700",
          longitude: "55.75007900",
          address_kladr: "ул. Арбат д. 24  г.Москва",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          region: {
            id: 2,
            name: "Москва",
          },
          brand: {
            id: 1,
            name: "Пятёрочка",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            description:
              "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
          },
        },
      ],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "02:00",
      cancel_order: "02:00",
      live_order: "02:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: false,
      finishRegister: false,
    },
    {
      id: 418,
      name: "КЛИЕНТ ДВА ПЯТЁРОЧКА",
      phone: 79887959191,
      email: "client9191@mail.ru",
      logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
      project: [
        {
          id: 1,
          name: "Договор на оказание услуг Пятёрочка",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-31T00:00:00.000000Z",
          brand: [
            {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          ],
        },
      ],
      place: [
        {
          id: 3,
          name: "Пятёрочка МСК ул. Арбат д. 24",
          latitude: "37.59217700",
          longitude: "55.75007900",
          address_kladr: "ул. Арбат д. 24  г.Москва",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          region: {
            id: 2,
            name: "Москва",
          },
          brand: {
            id: 1,
            name: "Пятёрочка",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            description:
              "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
          },
        },
      ],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "20:59:00",
      cancel_order: "20:59:00",
      live_order: "20:59:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: true,
      finishRegister: true,
    },
    {
      id: 417,
      name: "КЛИЕНТ САИДА ПЯТЁРОЧКА",
      phone: 79887958181,
      email: "client8181@mail.ru",
      logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
      project: [
        {
          id: 1,
          name: "Договор на оказание услуг Пятёрочка",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-31T00:00:00.000000Z",
          brand: [
            {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          ],
        },
      ],
      place: [
        {
          id: 3,
          name: "Пятёрочка МСК ул. Арбат д. 24",
          latitude: "37.59217700",
          longitude: "55.75007900",
          address_kladr: "ул. Арбат д. 24  г.Москва",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          region: {
            id: 2,
            name: "Москва",
          },
          brand: {
            id: 1,
            name: "Пятёрочка",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            description:
              "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
          },
        },
        {
          id: 4,
          name: "Пятёрочка Аметьевская ул, д. 24, г. Казань",
          latitude: "49.15342300",
          longitude: "55.77318600",
          address_kladr: "Аметьевская ул, д. 24, г. Казань, Татарстан респ.",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          region: {
            id: 1,
            name: "Татарстан Респ",
          },
          brand: {
            id: 1,
            name: "Пятёрочка",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            description:
              "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
          },
        },
      ],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "19:59:00",
      cancel_order: "19:59:00",
      live_order: "19:59:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: true,
      finishRegister: true,
    },
    {
      id: 410,
      name: "Клиент Юля Тестовый",
      phone: 79899991113,
      email: "yuclient01@mail.ru",
      logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
      project: [
        {
          id: 1,
          name: "Договор на оказание услуг Пятёрочка",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-31T00:00:00.000000Z",
          brand: [
            {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          ],
        },
      ],
      place: [
        {
          id: 3,
          name: "Пятёрочка МСК ул. Арбат д. 24",
          latitude: "37.59217700",
          longitude: "55.75007900",
          address_kladr: "ул. Арбат д. 24  г.Москва",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          region: {
            id: 2,
            name: "Москва",
          },
          brand: {
            id: 1,
            name: "Пятёрочка",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            description:
              "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
          },
        },
        {
          id: 4,
          name: "Пятёрочка Аметьевская ул, д. 24, г. Казань",
          latitude: "49.15342300",
          longitude: "55.77318600",
          address_kladr: "Аметьевская ул, д. 24, г. Казань, Татарстан респ.",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          region: {
            id: 1,
            name: "Татарстан Респ",
          },
          brand: {
            id: 1,
            name: "Пятёрочка",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            description:
              "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
          },
        },
      ],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "21:00:00",
      cancel_order: "21:00:00",
      live_order: "21:00:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: true,
      finishRegister: true,
    },
    {
      id: 407,
      name: "КЛИЕНТ ЧЕТВЕРТЫЙ ПЯТЁРОЧКА",
      phone: 79880001122,
      email: "client00@mail.ru",
      logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
      project: [],
      place: [],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "23:30:00",
      cancel_order: "02:30:00",
      live_order: "15:30:00",
      change_task: "15:30:00",
      cancel_task: "15:30:00",
      live_task: "15:30:00",
      repeat_bid: "15:30:00",
      leave_bid: "15:30:00",
      refusal_task: "15:30:00",
      waiting_task: 2,
      count_wait_bid: 1,
      time_answer_bid: 24,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: true,
      finishRegister: false,
    },
    {
      id: 401,
      name: "КЛИЕНТ ТРЕТИЙ АШАН",
      phone: 79887773333,
      email: "client3@mail.ru",
      logo: "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
      project: [],
      place: [],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "02:00",
      cancel_order: "02:00",
      live_order: "02:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: true,
      finishRegister: true,
    },
    {
      id: 399,
      name: "КЛИЕНТ ВТОРОЙ ПЯТЕРОЧКА",
      phone: 79887772222,
      email: "client2@mail.ru",
      logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
      project: [
        {
          id: 1,
          name: "Договор на оказание услуг Пятёрочка",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-31T00:00:00.000000Z",
          brand: [
            {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          ],
        },
      ],
      place: [
        {
          id: 3,
          name: "Пятёрочка МСК ул. Арбат д. 24",
          latitude: "37.59217700",
          longitude: "55.75007900",
          address_kladr: "ул. Арбат д. 24  г.Москва",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          region: {
            id: 2,
            name: "Москва",
          },
          brand: {
            id: 1,
            name: "Пятёрочка",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            description:
              "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
          },
        },
        {
          id: 4,
          name: "Пятёрочка Аметьевская ул, д. 24, г. Казань",
          latitude: "49.15342300",
          longitude: "55.77318600",
          address_kladr: "Аметьевская ул, д. 24, г. Казань, Татарстан респ.",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          region: {
            id: 1,
            name: "Татарстан Респ",
          },
          brand: {
            id: 1,
            name: "Пятёрочка",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            description:
              "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
          },
        },
      ],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "02:00",
      cancel_order: "02:00",
      live_order: "02:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: true,
      finishRegister: true,
    },
    {
      id: 392,
      name: "КЛИЕНТ ПЕРВЫЙ ПЯТЕРОЧКА",
      phone: 79887777777,
      email: "client@mail.ru",
      logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
      project: [
        {
          id: 1,
          name: "Договор на оказание услуг Пятёрочка",
          dateStart: "2025-12-09T00:00:00.000000Z",
          dateEnd: "2026-12-31T00:00:00.000000Z",
          brand: [
            {
              id: 1,
              name: "Пятёрочка",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              description:
                "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
            },
          ],
        },
      ],
      place: [
        {
          id: 3,
          name: "Пятёрочка МСК ул. Арбат д. 24",
          latitude: "37.59217700",
          longitude: "55.75007900",
          address_kladr: "ул. Арбат д. 24  г.Москва",
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          region: {
            id: 2,
            name: "Москва",
          },
          brand: {
            id: 1,
            name: "Пятёрочка",
            logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
            description:
              "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
          },
        },
      ],
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
      change_order: "02:00",
      cancel_order: "02:00",
      live_order: "02:00",
      change_task: "02:00",
      cancel_task: "02:00",
      live_task: "02:00",
      repeat_bid: "02:00",
      leave_bid: "02:00",
      refusal_task: "02:00",
      waiting_task: 60,
      count_wait_bid: 1,
      time_answer_bid: 12,
      notification_start: 60,
      supervisors: [],
      manager: [],
      counterparty: [],
      confirmRegister: true,
      finishRegister: true,
    },
  ],
  links: {
    first:
      "http://preprod.marriator-api.fivecorners.ru/api/personal/moderation/getModerationClient?page=1",
    last: null,
    prev: null,
    next: null,
  },
  meta: {
    current_page: 1,
    from: 1,
    path: "http://preprod.marriator-api.fivecorners.ru/api/personal/moderation/getModerationClient",
    per_page: 1000000,
    to: 43,
  },
};

export const mockResponseSuccessShort = {};

export const mockResponseEmpty = {
  data: [],
  links: {
    first: "http://localhost/api/personal/getModerationClient?page=1",
    last: null,
    prev: "http://localhost/api/personal/getModerationClient?page=29",
    next: null,
  },
  meta: {
    current_page: 30,
    from: null,
    path: "http://localhost/api/personal/getModerationClient",
    per_page: 2,
    to: null,
  },
};

export const getModerationClientMockResponse = http.get(
  `${import.meta.env.VITE_GET_MODERATION_CLIENT}`,
  async ({ request }) => {
    const url = new URL(request.url);

    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);

    // const scenario = "step1";
    // const scenario = "error";

    // if (scenario === "success") {
    //   await delay(2000);
    //   return HttpResponse.json(mockStep1ResponseSuccess);
    // } else if (scenario === "error") {
    //   await delay(2000);
    //   return HttpResponse.json(mockResponseError);
    // }
  },
);
