import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";

import { http, delay, HttpResponse } from "msw";

import BillingAdd from "./billing-add";

import { getBik, mockResponseSuccess } from "~/requests/getBik/getBik";

import { json } from "@remix-run/react";

const meta = {
  title: "Страницы/Внутренние/Профиль/Платёжные реквизиты(добавление)",
  component: BillingAdd,
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
          <h2>Адрес страницы: /profile/billing-add</h2>
          <h3>Используемые запросы:</h3>
          <p>getBik() - VITE_GET_BIK - {import.meta.env.VITE_GET_BIK}</p>
          <p>
            postSaveRequisitesData() - VITE_SAVE_REQUISITES_DATA -{" "}
            {import.meta.env.VITE_SAVE_REQUISITES_DATA}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof BillingAdd>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Страница",
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
        loader: async () => {
          const bik = await getBik("token");

          return json({ bikOptions: bik.result.bankData });
        },
        action: async () => {
          return null;
        },
      },
    }),
  },
};
