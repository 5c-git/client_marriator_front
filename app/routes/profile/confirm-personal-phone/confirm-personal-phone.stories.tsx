import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { createRemixStub } from "@remix-run/testing";
// import { http, delay, HttpResponse } from "msw";

import СonfirmPersonalPhone from "./confirm-personal-phone";
import { json } from "@remix-run/react";

const meta = {
  title: "Страницы/Внутренние/Профиль/Подтверждение личного телефона",
  component: СonfirmPersonalPhone,
  tags: ["autodocs"],
  parameters: {
    layout: {
      padded: false,
    },
    docs: {
      page: () => (
        <>
          <DocBlock.Title />
          <h2>Адрес страницы: /profile/confirm-personal-phone</h2>
          <h3>Используемые запросы:</h3>
          <p>
            postChangeUserPhone() - VITE_CHANGE_USER_PHONE -{" "}
            {import.meta.env.VITE_CHANGE_USER_PHONE}
          </p>
          <p>
            postConfirmChangeUserPhone() - VITE_CONFIRM_CHANGE_USER_PHONE -{" "}
            {import.meta.env.VITE_CONFIRM_CHANGE_USER_PHONE}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof СonfirmPersonalPhone>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Страница",
  decorators: [
    (Story) => {
      const RemixStub = createRemixStub([
        {
          path: "/profile/confirm-personal-phone",
          Component: Story,
          loader: async () => {
            return json({ phone: "79152142635", ttl: "120" });
          },
          action: async () => {
            // const data = await postRegStep2({ test: "test" });
            // return data;

            return null;
          },
        },
      ]);

      return <RemixStub initialEntries={["/profile/confirm-personal-phone"]} />;
    },
  ],
  parameters: {
    // msw: {
    //   handlers: [
    //     http.post(import.meta.env.VITE_GET_FORM, async () => {
    //       await delay(2000);
    //       return HttpResponse.json({
    //         status: "Success",
    //       });
    //     }),
    //   ],
    // },
  },
};
