import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { createRemixStub } from "@remix-run/testing";
import { http, delay, HttpResponse } from "msw";

import Profile from "./profile";
import MenuLayout from "~/routes/menuLayout/menuLayout";

import {
  getUserInfo,
  mockResponseSuccess,
} from "~/requests/getUserInfo/getUserInfo";

import { json } from "@remix-run/react";

const meta = {
  title: "Страницы/Внутренние/Профиль",
  component: Profile,
  tags: ["autodocs"],
  parameters: {
    layout: {
      padded: false,
    },
    docs: {
      page: () => (
        <>
          <DocBlock.Title />
          <h2>Адрес страницы: /profile</h2>
          <h3>Используемые запросы:</h3>
          <p>
            getUserInfo() - VITE_GET_USER_INFO -{" "}
            {import.meta.env.VITE_GET_USER_INFO}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof Profile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Страница",
  decorators: [
    (Story) => {
      const RemixStub = createRemixStub([
        {
          Component: MenuLayout,
          children: [
            {
              path: "/profile",
              Component: Story,
              loader: async () => {
                const data = await getUserInfo("token");

                return json(data);
              },
            },
          ],
        },
      ]);

      return <RemixStub initialEntries={["/profile"]} />;
    },
  ],
  parameters: {
    msw: {
      handlers: [
        http.get(import.meta.env.VITE_GET_USER_INFO, async () => {
          await delay(2000);
          return HttpResponse.json(mockResponseSuccess);
        }),
      ],
    },
  },
};
