import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { createRemixStub } from "@remix-run/testing";
// import { http, delay, HttpResponse } from "msw";

import ConfirmPersonalEmail from "./confirm-personal-email";
import { json } from "@remix-run/react";

const meta = {
  title:
    "Страницы/Внутренние/Профиль/Мой профиль/Входные данные/Подтверждение личного email",
  component: ConfirmPersonalEmail,
  tags: ["autodocs"],
  parameters: {
    layout: {
      padded: false,
    },
    docs: {
      page: () => (
        <>
          <DocBlock.Title />
          <h2>
            Адрес страницы:
            /profile/my-profile/profile-meta/confirm-personal-email
          </h2>
          <h3>Используемые запросы:</h3>
          <p>
            postPersonalSetUserEmail() - VITE_SET_PERSONAL_USER_EMAIL -{" "}
            {import.meta.env.VITE_SET_PERSONAL_USER_EMAIL}
          </p>
          <p>
            postPersonalCheckEmailCode() - VITE_PERSONAL_CHECK_EMAIL_CODE -{" "}
            {import.meta.env.VITE_CHECK_EMAIL_CODE}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof ConfirmPersonalEmail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Страница",
  decorators: [
    (Story) => {
      const RemixStub = createRemixStub([
        {
          path: "/profile/confirm-personal-email",
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

      return <RemixStub initialEntries={["/profile/confirm-personal-email"]} />;
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
