import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { createRemixStub } from "@remix-run/testing";
import { http, delay, HttpResponse } from "msw";

import Phone from "./phone";

import {
  postSendPhone,
  mockPostSendPhoneResponseRegister,
} from "~/requests/postSendPhone/postSendPhone";

const meta = {
  title: "Страницы/Вход/Телефон",
  component: Phone,
  tags: ["autodocs"],
  parameters: {
    layout: {
      padded: false,
    },
    docs: {
      page: () => (
        <>
          <DocBlock.Title />
          <h2>Адрес страницы: /signin/phone</h2>
          <h3>Используемые запросы:</h3>
          <p>
            postSendPhone() - VITE_SEND_PHONE -{" "}
            {import.meta.env.VITE_SEND_PHONE}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof Phone>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Страница (переход на регистрацию)",
  decorators: [
    (Story) => {
      const RemixStub = createRemixStub([
        {
          path: "/",
          Component: Story,
          action: async ({ request }) => {
            const fields = await request.json();

            const data = await postSendPhone(fields.phone);

            // if (data) {
            //   throw redirect("/");
            // }

            return data;
          },
        },
      ]);

      return <RemixStub />;
    },
  ],
  parameters: {
    msw: {
      handlers: [
        http.post(import.meta.env.VITE_SEND_PHONE, async () => {
          await delay(2000);
          return HttpResponse.json(mockPostSendPhoneResponseRegister);
        }),
      ],
    },
  },
};
