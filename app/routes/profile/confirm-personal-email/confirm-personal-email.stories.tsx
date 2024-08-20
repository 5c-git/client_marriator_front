import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { createRemixStub } from "@remix-run/testing";
// import { http, delay, HttpResponse } from "msw";

import СonfirmEmail from "./confirm-email";
import { json } from "@remix-run/react";

const meta = {
  title: "Страницы/Регистрация/Подтверждение emailkkkkk",
  component: СonfirmEmail,
  tags: ["autodocs"],
  parameters: {
    layout: {
      padded: false,
    },
    docs: {
      page: () => (
        <>
          <DocBlock.Title />
          <h2>Адрес страницы: /registration/confirm-email</h2>
          <h3>Используемые запросы:</h3>
          <p>
            postSetUserEmail() - VITE_SET_USER_EMAIL -{" "}
            {import.meta.env.VITE_SET_USER_EMAIL}
          </p>
          <p>
            postCheckEmailCode() - VITE_CHECK_EMAIL_CODE -{" "}
            {import.meta.env.VITE_CHECK_EMAIL_CODE}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof СonfirmEmail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Страница",
  decorators: [
    (Story) => {
      const RemixStub = createRemixStub([
        {
          path: "/confirm-email",
          Component: Story,
          loader: async () => {
            return json({ email: "test@mail.ru", ttl: "120" });
          },
          action: async () => {
            // const data = await postRegStep2({ test: "test" });
            // return data;

            return null;
          },
        },
      ]);

      return <RemixStub initialEntries={["/confirm-email"]} />;
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
