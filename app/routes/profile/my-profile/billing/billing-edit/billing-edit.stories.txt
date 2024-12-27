import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { http, delay, HttpResponse } from "msw";

import BillingEdit from "./billing-edit";

import { getBik, mockResponseSuccess } from "~/requests/getBik/getBik";

import { json } from "react-router";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import MenuLayout from "~/routes/menuLayout/menuLayout";

const meta = {
  title:
    "Страницы/Внутренние/Профиль/Мой профиль/Платёжные реквизиты/Редактирование",
  component: BillingEdit,
  tags: ["autodocs"],
  decorators: [withRouter],
  parameters: {
    layout: {
      padded: false,
    },
    docs: {
      page: () => (
        <>
          <DocBlock.Title />
          <h2>Адрес страницы: /profile/my-profile/billing/billing-edit</h2>
          <h3>Используемые запросы:</h3>
          <p>getBik() - VITE_GET_BIK - {import.meta.env.VITE_GET_BIK}</p>

          <p>
            postSaveRequisitesData() - VITE_SAVE_REQUISITES_DATA -{" "}
            {import.meta.env.VITE_SAVE_REQUISITES_DATA}
          </p>
          <p>
            postDeleteRequisite() - VITE_DELETE_REQUISITE -{" "}
            {import.meta.env.VITE_DELETE_REQUISITE}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof getBik>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Page",
  parameters: {
    msw: {
      handlers: [
        http.get(import.meta.env.VITE_GET_BIK, async () => {
          await delay(2000);
          return HttpResponse.json(mockResponseSuccess);
        }),
      ],
    },
    reactRouter: reactRouterParameters({
      routing: {
        path: "/profile/my-profile/billing/billing-edit",
        Component: MenuLayout,
        children: [
          {
            index: true,
            useStoryElement: true,
            loader: async () => {
              const bik = await getBik("token");

              return json({ bikOptions: bik.result.bankData });
            },
            action: async () => {
              return null;
            },
          },
        ],
      },
      location: {
        state: {
          dataId: 0,
          bik: "sber1",
          fio: "John Johnson",
          card: "5535913757516790",
          account: "11111111111111111111",
          cardDue: "2024-12-27",
          confidant: true,
          payWithCard: "yes",
        },
      },
    }),
  },
};
