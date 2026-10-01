import { reactRouter } from "@react-router/dev/vite";
import preview from "../../../.storybook/preview";

// import { reactRouterParameters } from "storybook-addon-remix-react-router";

import DayReview from "~/routes/bids/day-review/day-review";

import DashboardLayout from "~/shared/layouts/DashboardLayout/DashboardLayout";
import { DashboardView } from "~/shared/views/EntitiesList/DashboardView";

import { t } from "i18next";
import { ProfileIcon } from "~/routes/profile/_icons/ProfileIcon";
import { BidIcon } from "~/shared/layouts/DashboardLayout/icons/BidIcon";
import { ClientIcon } from "~/shared/layouts/DashboardLayout/icons/ClientIcon";
import { JobIcon } from "~/shared/layouts/DashboardLayout/icons/JobIcon";
import { ManagerIcon } from "~/shared/layouts/DashboardLayout/icons/ManagerIcon";
import { OrderIcon } from "~/shared/layouts/DashboardLayout/icons/OrderIcon";
import { SupervisorIcon } from "~/shared/layouts/DashboardLayout/icons/SupervisorIcon";
import { TaskIcon } from "~/shared/layouts/DashboardLayout/icons/TaskIcon";
import { WalletIcon } from "~/shared/ui/Menu/icons/WalletIcon";
import { withLocale } from "~/shared/withLocale";
import { useTranslation } from "react-i18next";
import { EntityCard } from "~/shared/ui/EntityCard/EntityCard";

const meta = preview.meta({
  component: DayReview,
});

// @ts-expect-error: `matches` won't align between test code and app code
export const TC_325 = meta.story({
  args: {
    loaderData: {
      days: [
        {
          id: 82,
          date: "2026-09-29T09:53:47.000000Z",
          unitPrice: "1000",
          unitAmount: "1",
          photos: [
            "https://sarin-production.ru/wp-content/uploads/2025/12/про-2048x1486.jpg",
            "https://cm-s.author.today/content/2025/08/04/8aae01a5081f47d786ae0a002a2ade5c.jpg",
            "https://academcity.org/sites/default/files/docs/images/10115.jpg",
            "https://i.ytimg.com/vi/s2DY1fN3EJA/maxresdefault.jpg",
          ],
          criteria: [],
        },
      ],
      reasons: [
        {
          amount: -5000,
          label:
            "Качество: Некорректное (грубое) обращение с целевой аудиторией, посетителями или сотрудниками Клиента в месте оказания услуг  (повтор) 5000 руб.",
          value: "1",
        },
        {
          amount: -1000,
          label:
            "Качество: Ведение переговоров на иностранном языке в месте оказания услуг (повтор) 1000 руб.",
          value: "2",
        },
        {
          amount: -1000,
          label:
            "Качество: Курение или употребление пищи вне установленных Клиентом помещений (повтор) 1000 руб.",
          value: "3",
        },
        {
          amount: -1000,
          label:
            "Качество: Нарушение униформы. Неопрятная одежда; отсутствие униформы Клиента (повтор) 1000 руб.",
          value: "4",
        },
        {
          amount: -1000,
          label:
            "Комплектность: Непредоставление документов (Несвоевременное или неполное предоставление документов, предусмотренных Договором) (документ) 1000 руб.",
          value: "5",
        },
        {
          amount: -50,
          label:
            "Своевременность: Нарушение согласованного в Задании режима оказания услуг (опоздание, досрочный уход) (минута)             50 руб.",
          value: "6",
        },
        {
          amount: -1000,
          label:
            "Своевременность: Новый график. Согласование изменений в графике оказания услуг в течение 4 и менее часов с момента извещения Заказчиком (повтор)                                              1000руб.",
          value: "8",
        },
      ],
      bidId: "549",
      specialistId: "911",
    },
  },
  decorators: [
    (Story) => {
      const { t } = useTranslation(["m_layout_home", "m_layout_moderation"]);

      return (
        <>
          <script
            src={`https://api-maps.yandex.ru/v3/?apikey=${
              import.meta.env.VITE_YANDEX_GEO_KEY
            }&lang=ru_RU`}
          ></script>
          <DashboardLayout
            loaderData={{
              userRole: "manager",
              entitiesMenu: {
                admin: [],
                manager: [
                  {
                    icon: (
                      <OrderIcon style={{ width: "18px", height: "18px" }} />
                    ),
                    label: t("tabs.order", { ns: "m_layout_home" }),
                    to: withLocale("/dashboard/orders"),
                    key: "orders",
                  },
                  {
                    icon: (
                      <TaskIcon style={{ width: "18px", height: "18px" }} />
                    ),
                    label: t("tabs.task", { ns: "m_layout_home" }),
                    to: withLocale("/dashboard/tasks"),
                    key: "tasks",
                  },
                  {
                    icon: <BidIcon style={{ width: "18px", height: "18px" }} />,
                    label: t("tabs.bid", { ns: "m_layout_home" }),
                    to: withLocale("/dashboard/bids"),
                    key: "bids",
                  },
                  {
                    icon: <JobIcon style={{ width: "18px", height: "18px" }} />,
                    label: t("tabs.job", { ns: "m_layout_home" }),
                    to: withLocale("/dashboard/jobs"),
                    key: "jobs",
                  },
                ],
                supervisor: [
                  {
                    icon: (
                      <OrderIcon style={{ width: "18px", height: "18px" }} />
                    ),
                    label: t("tabs.order", { ns: "m_layout_home" }),
                    to: withLocale("/dashboard/orders"),
                    key: "orders",
                  },
                  {
                    icon: (
                      <TaskIcon style={{ width: "18px", height: "18px" }} />
                    ),
                    label: t("tabs.task", { ns: "m_layout_home" }),
                    to: withLocale("/dashboard/tasks"),
                    key: "tasks",
                  },
                  {
                    icon: <BidIcon style={{ width: "18px", height: "18px" }} />,
                    label: t("tabs.bid", { ns: "m_layout_home" }),
                    to: withLocale("/dashboard/bids"),
                    key: "bids",
                  },
                  {
                    icon: <JobIcon style={{ width: "18px", height: "18px" }} />,
                    label: t("tabs.job", { ns: "m_layout_home" }),
                    to: withLocale("/dashboard/jobs"),
                    key: "jobs",
                  },
                ],
                client: [
                  {
                    icon: (
                      <OrderIcon style={{ width: "18px", height: "18px" }} />
                    ),
                    label: t("tabs.order", { ns: "m_layout_home" }),
                    to: withLocale("/dashboard/orders"),
                    key: "orders",
                  },
                ],
                specialist: [
                  {
                    icon: <JobIcon style={{ width: "18px", height: "18px" }} />,
                    label: t("tabs.job", { ns: "m_layout_home" }),
                    to: withLocale("/dashboard/jobs"),
                    key: "jobs",
                  },
                ],
              },
              moderationMenu: {
                admin: [
                  {
                    icon: (
                      <ManagerIcon sx={{ width: "18px", height: "18px" }} />
                    ),
                    label: t("tabs.manager", { ns: "m_layout_moderation" }),
                    to: withLocale("/dashboard/moderation/managers"),
                    key: "managers",
                  },
                  {
                    icon: (
                      <SupervisorIcon sx={{ width: "18px", height: "18px" }} />
                    ),
                    label: t("tabs.supervisor", { ns: "m_layout_moderation" }),
                    to: withLocale("/dashboard/moderation/supervisors"),
                    key: "supervisors",
                  },
                  {
                    icon: <ClientIcon sx={{ width: "18px", height: "18px" }} />,
                    label: t("tabs.client", { ns: "m_layout_moderation" }),
                    to: withLocale("/dashboard/moderation/clients"),
                    key: "clients",
                  },
                ],
                manager: [
                  {
                    icon: (
                      <SupervisorIcon sx={{ width: "18px", height: "18px" }} />
                    ),
                    label: t("tabs.supervisor", { ns: "m_layout_moderation" }),
                    to: withLocale("/dashboard/moderation/supervisors"),
                    key: "supervisors",
                  },
                  {
                    icon: <ClientIcon sx={{ width: "18px", height: "18px" }} />,
                    label: t("tabs.client", { ns: "m_layout_moderation" }),
                    to: withLocale("/dashboard/moderation/clients"),
                    key: "clients",
                  },
                ],
                supervisor: [
                  {
                    icon: <ClientIcon sx={{ width: "18px", height: "18px" }} />,
                    label: t("tabs.client", { ns: "m_layout_moderation" }),
                    to: withLocale("/dashboard/moderation/clients"),
                    key: "clients",
                  },
                ],
                client: [],
                specialist: [],
              },
              menu: {
                admin: [
                  {
                    icon: (
                      <ProfileIcon style={{ width: "18px", height: "18px" }} />
                    ),
                    label: t("menu.profile", { ns: "m_layout_home" }),
                    to: withLocale("/dashboard/profile"),
                    key: "Profile",
                  },
                ],
                manager: [
                  {
                    icon: (
                      <ProfileIcon style={{ width: "18px", height: "18px" }} />
                    ),
                    label: t("menu.profile", { ns: "m_layout_home" }),
                    to: withLocale("/dashboard/profile"),
                    key: "Profile",
                  },
                ],
                supervisor: [
                  {
                    icon: (
                      <ProfileIcon style={{ width: "18px", height: "18px" }} />
                    ),
                    label: t("menu.profile", { ns: "m_layout_home" }),
                    to: withLocale("/dashboard/profile"),
                    key: "Profile",
                  },
                ],
                client: [
                  {
                    icon: (
                      <WalletIcon style={{ width: "18px", height: "18px" }} />
                    ),
                    label: t("menu.wallet", { ns: "m_layout_home" }),
                    to: withLocale("/dashboard/wallet"),
                    key: "Wallet",
                    disabled: true,
                  },
                  {
                    icon: (
                      <ProfileIcon style={{ width: "18px", height: "18px" }} />
                    ),
                    label: t("menu.profile", { ns: "m_layout_home" }),
                    to: withLocale("/dashboard/profile"),
                    key: "Profile",
                  },
                ],
                specialist: [
                  {
                    icon: (
                      <WalletIcon style={{ width: "18px", height: "18px" }} />
                    ),
                    label: t("menu.wallet", { ns: "m_layout_home" }),
                    to: withLocale("/dashboard/wallet"),
                    key: "Wallet",
                    disabled: true,
                  },
                  {
                    icon: (
                      <ProfileIcon style={{ width: "18px", height: "18px" }} />
                    ),
                    label: t("menu.profile", { ns: "m_layout_home" }),
                    to: withLocale("/dashboard/profile"),
                    key: "Profile",
                  },
                ],
              },
            }}
          />
          <DashboardView
            translation="jobs"
            view={"list"}
            setView={() => {}}
            entityType="job"
            entities={[
              {
                id: 556,
                userId: 916,
                status: 1,
                statusColor: "var(--mui-palette-Grey_1)",
                header: "Продавец  (Физическое лицо)",
                subHeader: "1000",
                address: {
                  logo: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
                  text: "ул. Новый Арбат, д. 15,  г.Москва",
                },
                duration: {
                  start: "2026-10-01T14:00:00.000000Z",
                  end: "2026-10-03T11:00:00.000000Z",
                },
                coordinates: [55.751933, 37.593066],
                units: "Трудосмена",
                currency: "₽",
                createdAt: "2026-10-01T15:08:18.000000Z",
                placeName: "Перекрёсток",
              },
              {
                id: 556,
                userId: 897,
                status: 5,
                statusColor: "var(--mui-palette-Green)",
                header: "Продавец  (Физическое лицо)",
                subHeader: "1000",
                address: {
                  logo: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
                  text: "ул. Новый Арбат, д. 15,  г.Москва",
                },
                duration: {
                  start: "2026-10-01T14:00:00.000000Z",
                  end: "2026-10-03T11:00:00.000000Z",
                },
                coordinates: [55.751933, 37.593066],
                units: "Трудосмена",
                currency: "₽",
                createdAt: "2026-10-01T15:08:18.000000Z",
                placeName: "Перекрёсток",
              },
              {
                id: 556,
                userId: 891,
                status: 5,
                statusColor: "var(--mui-palette-Green)",
                header: "Продавец  (Физическое лицо)",
                subHeader: "1000",
                address: {
                  logo: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
                  text: "ул. Новый Арбат, д. 15,  г.Москва",
                },
                duration: {
                  start: "2026-10-01T14:00:00.000000Z",
                  end: "2026-10-03T11:00:00.000000Z",
                },
                coordinates: [55.751933, 37.593066],
                units: "Трудосмена",
                currency: "₽",
                createdAt: "2026-10-01T15:08:18.000000Z",
                placeName: "Перекрёсток",
              },
              {
                id: 556,
                userId: 859,
                status: 1,
                statusColor: "var(--mui-palette-Grey_1)",
                header: "Продавец  (Физическое лицо)",
                subHeader: "1000",
                address: {
                  logo: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
                  text: "ул. Новый Арбат, д. 15,  г.Москва",
                },
                duration: {
                  start: "2026-10-01T14:00:00.000000Z",
                  end: "2026-10-03T11:00:00.000000Z",
                },
                coordinates: [55.751933, 37.593066],
                units: "Трудосмена",
                currency: "₽",
                createdAt: "2026-10-01T15:08:18.000000Z",
                placeName: "Перекрёсток",
              },
              {
                id: 556,
                userId: 847,
                status: 1,
                statusColor: "var(--mui-palette-Grey_1)",
                header: "Продавец  (Физическое лицо)",
                subHeader: "1000",
                address: {
                  logo: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
                  text: "ул. Новый Арбат, д. 15,  г.Москва",
                },
                duration: {
                  start: "2026-10-01T14:00:00.000000Z",
                  end: "2026-10-03T11:00:00.000000Z",
                },
                coordinates: [55.751933, 37.593066],
                units: "Трудосмена",
                currency: "₽",
                createdAt: "2026-10-01T15:08:18.000000Z",
                placeName: "Перекрёсток",
              },
              {
                id: 556,
                userId: 772,
                status: 1,
                statusColor: "var(--mui-palette-Grey_1)",
                header: "Продавец  (Физическое лицо)",
                subHeader: "1000",
                address: {
                  logo: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
                  text: "ул. Новый Арбат, д. 15,  г.Москва",
                },
                duration: {
                  start: "2026-10-01T14:00:00.000000Z",
                  end: "2026-10-03T11:00:00.000000Z",
                },
                coordinates: [55.751933, 37.593066],
                units: "Трудосмена",
                currency: "₽",
                createdAt: "2026-10-01T15:08:18.000000Z",
                placeName: "Перекрёсток",
              },
              {
                id: 551,
                userId: 896,
                status: 5,
                statusColor: "var(--mui-palette-Green)",
                header: "Продавец  (Физическое лицо)",
                subHeader: "1000",
                address: {
                  logo: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
                  text: "ул. Новый Арбат, д. 15,  г.Москва",
                },
                duration: {
                  start: "2026-09-30T16:55:00.000000Z",
                  end: "2026-10-02T12:00:00.000000Z",
                },
                coordinates: [55.751933, 37.593066],
                units: "Трудосмена",
                currency: "₽",
                createdAt: "2026-09-30T16:54:45.000000Z",
                placeName: "Перекрёсток",
              },
              {
                id: 551,
                userId: 799,
                status: 5,
                statusColor: "var(--mui-palette-Green)",
                header: "Продавец  (Физическое лицо)",
                subHeader: "1000",
                address: {
                  logo: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
                  text: "ул. Новый Арбат, д. 15,  г.Москва",
                },
                duration: {
                  start: "2026-09-30T16:55:00.000000Z",
                  end: "2026-10-02T12:00:00.000000Z",
                },
                coordinates: [55.751933, 37.593066],
                units: "Трудосмена",
                currency: "₽",
                createdAt: "2026-09-30T16:54:45.000000Z",
                placeName: "Перекрёсток",
              },
              {
                id: 549,
                userId: 911,
                status: 5,
                statusColor: "var(--mui-palette-Green)",
                header: "Продавец  (Физическое лицо)",
                subHeader: "1000",
                address: {
                  logo: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
                  text: "ул. Новый Арбат, д. 15,  г.Москва",
                },
                duration: {
                  start: "2026-09-29T07:00:00.000000Z",
                  end: "2026-10-03T15:00:00.000000Z",
                },
                coordinates: [55.751933, 37.593066],
                units: "Трудосмена",
                currency: "₽",
                createdAt: "2026-09-24T10:26:34.000000Z",
                placeName: "Перекрёсток",
              },
              {
                id: 514,
                userId: 896,
                status: 3,
                statusColor: "var(--mui-palette-Grey_1)",
                header: "Продавец  (Физическое лицо)",
                subHeader: "1000",
                address: {
                  logo: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
                  text: "ул. Новый Арбат, д. 15,  г.Москва",
                },
                duration: {
                  start: "2026-09-20T07:00:00.000000Z",
                  end: "2026-10-01T17:00:00.000000Z",
                },
                coordinates: [55.751933, 37.593066],
                units: "Трудосмена",
                currency: "₽",
                createdAt: "2026-09-10T14:57:47.000000Z",
                placeName: "Перекрёсток",
              },
              {
                id: 555,
                userId: 920,
                status: 1,
                statusColor: "var(--mui-palette-Grey_1)",
                header: "Продавец  (Физическое лицо)",
                subHeader: "1000",
                address: {
                  logo: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
                  text: "ул. Новый Арбат, д. 15,  г.Москва",
                },
                duration: {
                  start: "2026-10-04T07:00:00.000000Z",
                  end: "2026-10-04T12:00:00.000000Z",
                },
                coordinates: [55.751933, 37.593066],
                units: "Трудосмена",
                currency: "₽",
                createdAt: "2026-10-01T12:21:24.000000Z",
                placeName: "Перекрёсток",
              },
              {
                id: 555,
                userId: 911,
                status: 1,
                statusColor: "var(--mui-palette-Grey_1)",
                header: "Продавец  (Физическое лицо)",
                subHeader: "1000",
                address: {
                  logo: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
                  text: "ул. Новый Арбат, д. 15,  г.Москва",
                },
                duration: {
                  start: "2026-10-04T07:00:00.000000Z",
                  end: "2026-10-04T12:00:00.000000Z",
                },
                coordinates: [55.751933, 37.593066],
                units: "Трудосмена",
                currency: "₽",
                createdAt: "2026-10-01T12:21:24.000000Z",
                placeName: "Перекрёсток",
              },
              {
                id: 555,
                userId: 907,
                status: 1,
                statusColor: "var(--mui-palette-Grey_1)",
                header: "Продавец  (Физическое лицо)",
                subHeader: "1000",
                address: {
                  logo: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
                  text: "ул. Новый Арбат, д. 15,  г.Москва",
                },
                duration: {
                  start: "2026-10-04T07:00:00.000000Z",
                  end: "2026-10-04T12:00:00.000000Z",
                },
                coordinates: [55.751933, 37.593066],
                units: "Трудосмена",
                currency: "₽",
                createdAt: "2026-10-01T12:21:24.000000Z",
                placeName: "Перекрёсток",
              },
              {
                id: 555,
                userId: 894,
                status: 1,
                statusColor: "var(--mui-palette-Grey_1)",
                header: "Продавец  (Физическое лицо)",
                subHeader: "1000",
                address: {
                  logo: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
                  text: "ул. Новый Арбат, д. 15,  г.Москва",
                },
                duration: {
                  start: "2026-10-04T07:00:00.000000Z",
                  end: "2026-10-04T12:00:00.000000Z",
                },
                coordinates: [55.751933, 37.593066],
                units: "Трудосмена",
                currency: "₽",
                createdAt: "2026-10-01T12:21:24.000000Z",
                placeName: "Перекрёсток",
              },
              {
                id: 555,
                userId: 799,
                status: 5,
                statusColor: "var(--mui-palette-Green)",
                header: "Продавец  (Физическое лицо)",
                subHeader: "1000",
                address: {
                  logo: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
                  text: "ул. Новый Арбат, д. 15,  г.Москва",
                },
                duration: {
                  start: "2026-10-04T07:00:00.000000Z",
                  end: "2026-10-04T12:00:00.000000Z",
                },
                coordinates: [55.751933, 37.593066],
                units: "Трудосмена",
                currency: "₽",
                createdAt: "2026-10-01T12:21:24.000000Z",
                placeName: "Перекрёсток",
              },
              {
                id: 522,
                userId: 896,
                status: 5,
                statusColor: "var(--mui-palette-Green)",
                header: "Продавец  (Физическое лицо)",
                subHeader: "2000",
                address: {
                  logo: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
                  text: "г. Москва, просп. Мира, 119 (ВДНХ)",
                },
                duration: {
                  start: "2026-10-05T11:00:00.000000Z",
                  end: "2026-10-08T18:00:00.000000Z",
                },
                coordinates: [55.828693, 37.633724],
                units: "Трудосмена",
                currency: "₽",
                createdAt: "2026-09-15T12:09:40.000000Z",
                placeName: "Перекрёсток",
              },
              {
                id: 510,
                userId: 799,
                status: 5,
                statusColor: "var(--mui-palette-Green)",
                header: "Продавец  (Физическое лицо)",
                subHeader: "2000",
                address: {
                  logo: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
                  text: "г. Москва, просп. Мира, 119 (ВДНХ)",
                },
                duration: {
                  start: "2026-10-05T09:00:00.000000Z",
                  end: "2026-10-10T07:00:00.000000Z",
                },
                coordinates: [55.828693, 37.633724],
                units: "Трудосмена",
                currency: "₽",
                createdAt: "2026-09-10T14:09:11.000000Z",
                placeName: "Перекрёсток",
              },
              {
                id: 519,
                userId: 896,
                status: 5,
                statusColor: "var(--mui-palette-Green)",
                header: "Продавец  (Физическое лицо)",
                subHeader: "2000",
                address: {
                  logo: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
                  text: "г. Москва, просп. Мира, 119 (ВДНХ)",
                },
                duration: {
                  start: "2026-10-15T07:00:00.000000Z",
                  end: "2026-10-17T16:00:00.000000Z",
                },
                coordinates: [55.828693, 37.633724],
                units: "Трудосмена",
                currency: "₽",
                createdAt: "2026-09-11T12:03:50.000000Z",
                placeName: "Перекрёсток",
              },
            ]}
            sorting="ascending"
            entityListView={(entity) => (
              <EntityCard
                key={entity.id + entity.userId}
                isActive={true}
                to={"/"}
                status={
                  entity.status === 1 || entity.status === 4
                    ? t("bidStatus")
                    : t("jobStatus")
                }
                statusColor={entity.statusColor}
                // header={`${t("cardHeader")} ${entity.header}`}
                header={entity.header}
                subHeader={{
                  text: t("amount", {
                    price: entity.subHeader,
                    curency: entity.currency,
                    measure: entity.units,
                  }),
                  bold: true,
                }}
                id={entity.id.toString()}
                address={entity.address}
                duration={entity.duration}
              />
            )}
            entityTableView={(entity) => {}}
            entityMapView={(entity) => {}}
          />

          {/* <Story /> */}
        </>
      );
    },
  ],
});
