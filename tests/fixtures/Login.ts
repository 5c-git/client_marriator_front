import type { Page } from "@playwright/test";

import { http, HttpResponse } from "msw";

const refresh_token = {
  status: "success",
  result: {
    token: {
      token_type: "Bearer",
      expires_in: 10800,
      access_token: "access_token",
      refresh_token: "refresh_token",
    },
  },
};
const sendPhoneAuth = {
  result: {
    type: "auth",
    code: {
      status: "success",
      code: 1111,
      ttl: 120,
    },
  },
  status: "success",
};
const sendSmsAuth = {
  result: {
    token: {
      token_type: "Bearer",
      expires_in: 10800,
      access_token: "access_token",
      refresh_token: "refresh_token",
    },
  },
  status: "success",
};
const sendPinAuth = {
  result: {
    token: {
      token_type: "Bearer",
      expires_in: 10800,
      access_token: "access_token",
      refresh_token: "refresh_token",
    },
  },
  status: "success",
};
const setTimeZone = {
  data: {
    success: true,
  },
};

const getManagerData = {
  data: {
    id: 900,
    timezone: "UTC",
    name: "Менеджер ТАТА",
    phone: 79999999999,
    email: "test31318@bk.ru",
    logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
    project: [
      {
        id: 11,
        name: "78954612 Перекресток будущий проект",
        dateStart: "2026-10-05T00:00:00.000000Z",
        dateEnd: "2026-12-05T00:00:00.000000Z",
        timeStart: "06:00",
        timeEnd: "18:00",
        brand: [
          {
            id: 6,
            name: "Перекрёсток",
            logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
            description:
              "Бренд «Перекрёсток» — одна из ведущих розничных сетей супермаркетов в России",
          },
        ],
      },
      {
        id: 12,
        name: "78412552 Пятерочка",
        dateStart: "2026-01-20T00:00:00.000000Z",
        dateEnd: "2026-12-30T00:00:00.000000Z",
        timeStart: "06:00",
        timeEnd: "18:00",
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
        id: 14,
        name: "Перекресток проект с 20.07.2026",
        dateStart: "2026-07-20T00:00:00.000000Z",
        dateEnd: "2026-11-05T00:00:00.000000Z",
        timeStart: "07:00",
        timeEnd: "20:00",
        brand: [
          {
            id: 6,
            name: "Перекрёсток",
            logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
            description:
              "Бренд «Перекрёсток» — одна из ведущих розничных сетей супермаркетов в России",
          },
        ],
      },
      {
        id: 17,
        name: "Проект самозанятый",
        dateStart: "2026-07-01T00:00:00.000000Z",
        dateEnd: "2026-10-31T00:00:00.000000Z",
        timeStart: "06:00",
        timeEnd: "20:00",
        brand: [
          {
            id: 6,
            name: "Перекрёсток",
            logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
            description:
              "Бренд «Перекрёсток» — одна из ведущих розничных сетей супермаркетов в России",
          },
        ],
      },
    ],
    place: [
      {
        id: 3,
        name: "«Пятёрочка» на Арбате д. 24  г.Москва",
        latitude: "55.75007900",
        longitude: "37.59217700",
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
        latitude: "55.77318600",
        longitude: "49.15342300",
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
        id: 13,
        name: "Перекрёсток» на Новом Арбате",
        latitude: "55.75193300",
        longitude: "37.59306600",
        address_kladr: "ул. Новый Арбат, д. 15,  г.Москва",
        logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
        region: {
          id: 2,
          name: "Москва",
        },
        brand: {
          id: 6,
          name: "Перекрёсток",
          logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
          description:
            "Бренд «Перекрёсток» — одна из ведущих розничных сетей супермаркетов в России",
        },
      },
      {
        id: 14,
        name: "«Перекрёсток» на Профсоюзной",
        latitude: "55.61880000",
        longitude: "37.50684000",
        address_kladr: "ул. Профсоюзная, д. 129, ТЦ «Принц Плаза»  г.Москва",
        logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
        region: {
          id: 2,
          name: "Москва",
        },
        brand: {
          id: 6,
          name: "Перекрёсток",
          logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
          description:
            "Бренд «Перекрёсток» — одна из ведущих розничных сетей супермаркетов в России",
        },
      },
      {
        id: 15,
        name: "«Перекрёсток» на Долгоруковской",
        latitude: "55.77201800",
        longitude: "37.60316300",
        address_kladr: "Долгоруковская ул., д. 5 г.Москва",
        logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
        region: {
          id: 2,
          name: "Москва",
        },
        brand: {
          id: 6,
          name: "Перекрёсток",
          logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
          description:
            "Бренд «Перекрёсток» — одна из ведущих розничных сетей супермаркетов в России",
        },
      },
      {
        id: 16,
        name: "«Перекрёсток» на Большой Дорогомиловской",
        latitude: "55.74691000",
        longitude: "37.53526000",
        address_kladr: "Большая Дорогомиловская ул., д. 8,  г.Москва",
        logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
        region: {
          id: 2,
          name: "Москва",
        },
        brand: {
          id: 6,
          name: "Перекрёсток",
          logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
          description:
            "Бренд «Перекрёсток» — одна из ведущих розничных сетей супермаркетов в России",
        },
      },
      {
        id: 19,
        name: "Перекресток г. Москва, просп. Мира, 119 (ВДНХ)",
        latitude: "55.82869300",
        longitude: "37.63372400",
        address_kladr: "г. Москва, просп. Мира, 119 (ВДНХ)",
        logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
        region: {
          id: 2,
          name: "Москва",
        },
        brand: {
          id: 6,
          name: "Перекрёсток",
          logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
          description:
            "Бренд «Перекрёсток» — одна из ведущих розничных сетей супермаркетов в России",
        },
      },
      {
        id: 20,
        name: "Большая Грузинская улица, 1",
        latitude: "55.76239900",
        longitude: "37.57869300",
        address_kladr: "Большая Грузинская улица, 1",
        logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
        region: {
          id: 2,
          name: "Москва",
        },
        brand: {
          id: 6,
          name: "Перекрёсток",
          logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
          description:
            "Бренд «Перекрёсток» — одна из ведущих розничных сетей супермаркетов в России",
        },
      },
    ],
    roles: [
      {
        id: 3,
        name: "manager",
      },
    ],
    change_order: "02:00",
    cancel_order: "02:00",
    live_order: "02:00",
    change_task: "02:00:00",
    cancel_task: "02:00:00",
    live_task: "02:00:00",
    repeat_bid: "02:00:00",
    leave_bid: "02:00:00",
    refusal_task: "02:00",
    waiting_task: 60,
    count_wait_bid: 1,
    time_answer_bid: 12,
    notification_start: 60,
    supervisors: [
      {
        id: 406,
        phone: 79881234455,
        email: "test121@mail.ru",
        logo: "/storage/source/userImg/406/iFd0ZnKTlG1da5WiFdAG.jpeg",
        roles: [
          {
            id: 5,
            name: "specialist",
          },
          {
            id: 6,
            name: "supervisor",
          },
        ],
        name: "СПЕЦИАЛИСТ ТЕСТЕР",
      },
      {
        id: 589,
        phone: 79887951424,
        email: "test554h@mail.ru",
        logo: "/storage/source/userImg/589/cfIr4b4ZVRepN1K8GU4g.jpeg",
        roles: [
          {
            id: 5,
            name: "specialist",
          },
          {
            id: 6,
            name: "supervisor",
          },
        ],
        name: "тмтм ааппро",
      },
      {
        id: 847,
        phone: 79284512222,
        email: "Test123@mail.ru",
        logo: "/storage/source/userImg/847/HLdn9RuGcvK5B7CS6H74.jpeg",
        roles: [
          {
            id: 5,
            name: "specialist",
          },
          {
            id: 6,
            name: "supervisor",
          },
        ],
        name: "Тест Тест",
      },
      {
        id: 883,
        phone: 79865656665,
        email: "ffg@mail.ru",
        logo: "/storage/source/userImg/883/SU5yXOrBQEppd03sgBFq.jpeg",
        roles: [
          {
            id: 5,
            name: "specialist",
          },
          {
            id: 6,
            name: "supervisor",
          },
        ],
        name: "ТЕСТ ТЕСТ",
      },
      {
        id: 908,
        phone: 79846565662,
        email: "123@mail.ru",
        logo: "/storage/source/userImg/908/JcPSQT1dag4jh2sa0A9C.jpeg",
        roles: [
          {
            id: 5,
            name: "specialist",
          },
          {
            id: 6,
            name: "supervisor",
          },
        ],
        name: "Иванова Иванка",
      },
    ],
    manager: [],
    userManager: [],
    userSupervisors: [],
    counterparty: [
      {
        id: 2,
        name: 'Торговая сеть "Пятёрочка"',
        ogrn: "1027700070210",
        legal_address: "123087, г. Москва, ул. Бакунинская, д. 71, стр. 1",
        legal_email: "5ka@mail.ru",
      },
      {
        id: 4,
        name: 'ТОРГОВЫЙ ДОМ "ПЕРЕКРЕСТОК',
        ogrn: "1027700034493",
        legal_address:
          "г. Москва, вн.тер. г. муниципальный округ Нижегородский, ул. Средняя Калитниковская, д. 28, стр. 4",
        legal_email:
          "г. Москва, вн.тер. г. муниципальный округ Нижегородский, ул. Средняя Калитниковская, д. 28, стр. 4",
      },
    ],
    confirmRegister: true,
    finishRegister: true,
  },
};
const getSupervisorData = {
  data: {
    id: 800,
    timezone: "UTC",
    name: "Тестовый супервайзер",
    phone: 78888888888,
    email: "supertest@mail.ru",
    logo: "",
    project: [
      {
        id: 12,
        name: "78412552 Пятерочка",
        dateStart: "2026-01-20T00:00:00.000000Z",
        dateEnd: "2026-12-30T00:00:00.000000Z",
        timeStart: "06:00",
        timeEnd: "18:00",
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
        name: "«Пятёрочка» на Арбате д. 24  г.Москва",
        latitude: "55.75007900",
        longitude: "37.59217700",
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
        latitude: "55.77318600",
        longitude: "49.15342300",
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
        id: 17,
        name: "«Пятёрочка» на Новокузнецкой",
        latitude: "55.73426800",
        longitude: "37.62961200",
        address_kladr: "Новокузнецкая ул., д. 39, г.Москва",
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
        id: 18,
        name: "«Пятёрочка» на Садовой-Триумфальной",
        latitude: "55.77191000",
        longitude: "37.60406200",
        address_kladr: "Садовая-Триумфальная ул., д. 22/31,  г.Москва",
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
        id: 6,
        name: "supervisor",
      },
    ],
    change_order: "02:00",
    cancel_order: "02:00",
    live_order: "02:00",
    change_task: "02:00",
    cancel_task: "02:00",
    live_task: "02:00",
    repeat_bid: "02:00",
    leave_bid: "01:00",
    refusal_task: "02:00",
    waiting_task: 60,
    count_wait_bid: 1,
    time_answer_bid: 12,
    notification_start: 60,
    supervisors: [],
    manager: [
      {
        id: 526,
        phone: 79128444444,
        email: "yulmanpet4@mail.ru",
        logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        roles: [
          {
            id: 3,
            name: "manager",
          },
        ],
        name: "ЮЛИЯ МЕНЕДЖЕР ПЯТЕРОЧКА",
      },
      {
        id: 553,
        phone: 79281111111,
        email: "manager1111111@mail.ru",
        logo: "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
        roles: [
          {
            id: 3,
            name: "manager",
          },
        ],
        name: "МЕНЕДЖЕР НОВЫЙ ЗЯ",
      },
      {
        id: 910,
        phone: 79632158969,
        email: "manager45623@mail.ru",
        logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
        roles: [
          {
            id: 3,
            name: "manager",
          },
        ],
        name: "Менеджер Перекр Новый",
      },
    ],
    userManager: [],
    userSupervisors: [],
    counterparty: [
      {
        id: 2,
        name: 'Торговая сеть "Пятёрочка"',
        ogrn: "1027700070210",
        legal_address: "123087, г. Москва, ул. Бакунинская, д. 71, стр. 1",
        legal_email: "5ka@mail.ru",
      },
    ],
    confirmRegister: true,
    finishRegister: true,
  },
};
const getClientData = {
  data: {
    id: 700,
    timezone: "UTC",
    name: "Клиент Для Теста",
    phone: 77777777777,
    email: "testclientmar@mail.ru",
    logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
    project: [
      {
        id: 12,
        name: "78412552 Пятерочка",
        dateStart: "2026-01-20T00:00:00.000000Z",
        dateEnd: "2026-12-30T00:00:00.000000Z",
        timeStart: "06:00",
        timeEnd: "18:00",
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
        name: "«Пятёрочка» на Арбате д. 24  г.Москва",
        latitude: "55.75007900",
        longitude: "37.59217700",
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
        id: 17,
        name: "«Пятёрочка» на Новокузнецкой",
        latitude: "55.73426800",
        longitude: "37.62961200",
        address_kladr: "Новокузнецкая ул., д. 39, г.Москва",
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
        id: 18,
        name: "«Пятёрочка» на Садовой-Триумфальной",
        latitude: "55.77191000",
        longitude: "37.60406200",
        address_kladr: "Садовая-Триумфальная ул., д. 22/31,  г.Москва",
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
    change_order: "02:00:00",
    cancel_order: "02:00:00",
    live_order: "02:00:00",
    change_task: "02:00",
    cancel_task: "02:00",
    live_task: "02:00",
    repeat_bid: "02:00",
    leave_bid: "01:00",
    refusal_task: "02:00",
    waiting_task: 60,
    count_wait_bid: 1,
    time_answer_bid: 12,
    notification_start: 60,
    supervisors: [],
    manager: [],
    userManager: [],
    userSupervisors: [],
    counterparty: [
      {
        id: 2,
        name: 'Торговая сеть "Пятёрочка"',
        ogrn: "1027700070210",
        legal_address: "123087, г. Москва, ул. Бакунинская, д. 71, стр. 1",
        legal_email: "5ka@mail.ru",
      },
    ],
    confirmRegister: true,
    finishRegister: true,
  },
};
const getSpecialistData = {
  data: {
    id: 600,
    timezone: "UTC",
    name: "Тестовый специалист",
    phone: 76666666666,
    email: "specialist-test@mail.ru",
    logo: "",
    project: [],
    place: [],
    roles: [
      {
        id: 5,
        name: "specialist",
      },
    ],
    change_order: "02:00",
    cancel_order: "02:00",
    live_order: "02:00",
    change_task: "02:00",
    cancel_task: "02:00",
    live_task: "02:00",
    repeat_bid: "02:00",
    leave_bid: "01:00",
    refusal_task: "02:00",
    waiting_task: 60,
    count_wait_bid: 1,
    time_answer_bid: 12,
    notification_start: 60,
    supervisors: [],
    manager: [],
    userManager: [],
    userSupervisors: [
      {
        id: 800,
        phone: 78888888888,
        email: "supertest@mail.ru",
        logo: "",
        roles: [
          {
            id: 6,
            name: "supervisor",
          },
        ],
        name: "Тестовый супервайзер",
      },
    ],
    counterparty: [],
    confirmRegister: true,
    finishRegister: true,
  },
};

export const LoginHandlers = [
  http.post(process.env.VITE_REFRESH_TOKEN, () => {
    return HttpResponse.json(refresh_token);
  }),
  http.post(process.env.VITE_SEND_PHONE, () => {
    return HttpResponse.json(sendPhoneAuth);
  }),
  http.post(process.env.VITE_CHECK_CODE, () => {
    return HttpResponse.json(sendSmsAuth);
  }),
  http.post(process.env.VITE_CHECK_PIN, () => {
    return HttpResponse.json(sendPinAuth);
  }),
  http.post(process.env.VITE_POST_SET_TIME_ZONE, () => {
    return HttpResponse.json(setTimeZone);
  }),
];

export const userRoleHandlers = {
  admin: http.get(process.env.VITE_GET_DATA, () => {
    return HttpResponse.json(getManagerData);
  }),
  manager: http.get(process.env.VITE_GET_DATA, () => {
    return HttpResponse.json(getManagerData);
  }),
  supervisor: http.get(process.env.VITE_GET_DATA, () => {
    return HttpResponse.json(getSupervisorData);
  }),
  client: http.get(process.env.VITE_GET_DATA, () => {
    return HttpResponse.json(getClientData);
  }),
  specialist: http.get(process.env.VITE_GET_DATA, () => {
    return HttpResponse.json(getSpecialistData);
  }),
} as const;

export class Login {
  constructor(public readonly page: Page) {}

  async login() {
    //страница номера телефона
    await this.page.goto("");
    await this.page.getByLabel("Номер телефона").fill("70000000000");
    await this.page.getByText("Войти или зарегистрироваться").click();

    //страница sms кода
    await this.page.getByLabel("Код из смс").fill("0000");

    //страница pin кода
    await this.page.getByTestId("test_otp-input").fill("0000");
  }
}
