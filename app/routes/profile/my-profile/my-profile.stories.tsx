import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { createRemixStub } from "@remix-run/testing";
import { http, delay, HttpResponse } from "msw";

import MyProfile from "./my-profile";
import MenuLayout from "~/routes/menuLayout/menuLayout";

import { json } from "@remix-run/react";

const meta = {
  title: "Страницы/Внутренние/Профиль/Мой профиль",
  component: MyProfile,
  tags: ["autodocs"],
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
  name: "Страница",
  decorators: [
    (Story) => {
      const RemixStub = createRemixStub([
        {
          Component: MenuLayout,
          children: [
            {
              path: "/profile/my-profile",
              Component: Story,
              loader: async () => {
                // const data = await getUserInfo("token");

                return json({ data: "data" });
              },
            },
          ],
        },
      ]);

      return <RemixStub initialEntries={["/profile/my-profile"]} />;
    },
  ],
  parameters: {
    msw: {
      handlers: [
        http.get(import.meta.env.VITE_GET_USER_PERSONAL_MENU, async () => {
          await delay(2000);
          return HttpResponse.json({ data: "data" });
        }),
      ],
    },
  },
};
