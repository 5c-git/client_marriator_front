import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import { http, delay, HttpResponse } from "msw";

import Billing from "./billing";

import {
  getRequisitesData,
  mockResponseSuccess,
} from "~/requests/getRequisitesData/getRequisitesData";

import { json } from "@remix-run/react";

const meta = {
  title: "Страницы/Внутренние/Профиль/Платёжные реквизиты",
  component: Billing,
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
          <h2>Адрес страницы: /profile/billing</h2>
          <h3>Используемые запросы:</h3>
          <p>
            getRequisitesData() - VITE_GET_REQUISITES_DATA -{" "}
            {import.meta.env.VITE_GET_REQUISITES_DATA}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof Billing>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Страница",
  parameters: {
    msw: {
      handlers: [
        http.get(import.meta.env.VITE_GET_REQUISITES_DATA, async () => {
          await delay(2000);
          return HttpResponse.json(mockResponseSuccess);
        }),
      ],
    },
    reactRouter: reactRouterParameters({
      routing: {
        loader: async () => {
          const requisitesData = await getRequisitesData("token");

          return json({ billingArray: requisitesData.result });
        },
        action: async () => {
          return null;
        },
      },
    }),
  },
};
