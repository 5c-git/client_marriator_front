import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import { http, delay, HttpResponse } from "msw";

import MyProfile from "./my-profile";
import MenuLayout from "~/routes/menuLayout/menuLayout";

import { json } from "react-router";
import {
  getUserPersonalMenu,
  mockResponseSuccess,
} from "~/requests/getUserPersonalMenu/getUserPersonalMenu";

const meta = {
  title: "Страницы/Внутренние/Профиль/Мой профиль",
  component: MyProfile,
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
          <h2>Адрес страницы: /profile/my-profile</h2>
          <h3>Используемые запросы:</h3>
          <p>
            getUserPersonalMenu() - VITE_GET_USER_PERSONAL_MENU -{" "}
            {import.meta.env.VITE_GET_USER_PERSONAL_MENU}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof MyProfile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Page",
  parameters: {
    msw: {
      handlers: [
        http.get(import.meta.env.VITE_GET_USER_PERSONAL_MENU, async () => {
          await delay(2000);
          return HttpResponse.json(mockResponseSuccess);
        }),
      ],
    },
    reactRouter: reactRouterParameters({
      routing: {
        path: "/profile/my-profile",
        Component: MenuLayout,
        children: [
          {
            index: true,
            useStoryElement: true,
            loader: async () => {
              const data = await getUserPersonalMenu("token");

              return json(data);
            },
          },
        ],
      },
    }),
  },
};
