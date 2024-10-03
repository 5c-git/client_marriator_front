import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { createRemixStub } from "@remix-run/testing";
import { http, delay, HttpResponse } from "msw";

import ProfileEdit from "./profile-edit";
import MenuLayout from "~/routes/menuLayout/menuLayout";

import { json } from "@remix-run/react";

const meta = {
  title: "Страницы/Внутренние/Профиль/Мой профиль/Редактирование профиля",
  component: ProfileEdit,
  tags: ["autodocs"],
  parameters: {
    layout: {
      padded: false,
    },
    docs: {
      page: () => (
        <>
          <DocBlock.Title />
          <h2>Адрес страницы: /profile/my-profile/profile-edit</h2>
          <h3>Используемые запросы:</h3>
          <p>
            getUserFields() - VITE_GET_USER_FIELDS -{" "}
            {import.meta.env.VITE_GET_USER_FIELDS}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof ProfileEdit>;

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
              path: "/profile/profile-edit",
              Component: Story,
              loader: async () => {
                // const data = await getUserInfo("token");

                return json({ data: "data" });
              },
            },
          ],
        },
      ]);

      return <RemixStub initialEntries={["/profile/profile-edit"]} />;
    },
  ],
  parameters: {
    msw: {
      handlers: [
        http.get(import.meta.env.VITE_GET_USER_FIELDS, async () => {
          await delay(2000);
          return HttpResponse.json({ data: "data" });
        }),
      ],
    },
  },
};
