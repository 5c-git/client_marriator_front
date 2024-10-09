import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { http, delay, HttpResponse } from "msw";

import RegistrationComplete from "./registration-complete";
import MenuLayout from "~/routes/menuLayout/menuLayout";

import {
  getUserInfo,
  mockResponseSuccess,
} from "~/requests/getUserInfo/getUserInfo";

import { json } from "@remix-run/react";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";

const meta = {
  title: "Страницы/Регистрация/Завершение регистрации",
  component: RegistrationComplete,
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
          <h2>Адрес страницы: /registration/registration-complete</h2>
          {/* <h3>Используемые запросы:</h3>
          <p>
            getUserInfo() - VITE_GET_USER_INFO -{" "}
            {import.meta.env.VITE_GET_USER_INFO}
          </p> */}
        </>
      ),
    },
  },
} satisfies Meta<typeof RegistrationComplete>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Page",
  parameters: {
    msw: {
      handlers: [
        http.get(import.meta.env.VITE_GET_USER_INFO, async () => {
          await delay(2000);
          return HttpResponse.json(mockResponseSuccess);
        }),
      ],
    },
    reactRouter: reactRouterParameters({
      routing: {
        path: "/registration/registration-complete",
        Component: MenuLayout,
        children: [
          {
            index: true,
            useStoryElement: true,
            loader: async () => {
              const data = await getUserInfo("token");

              return json(data);
            },
          },
        ],
      },
    }),
  },
};
