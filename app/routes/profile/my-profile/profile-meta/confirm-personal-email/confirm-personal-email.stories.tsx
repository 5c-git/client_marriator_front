import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import ConfirmPersonalEmail from "./confirm-personal-email";
import { json } from "react-router";
import { reactRouterParameters } from "storybook-addon-remix-react-router";
import { loadNamespaces } from "i18next";

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
  name: "Page",
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: "/profile/my-profile/profile-meta/confirm-personal-email",
        loader: async () => {
          await loadNamespaces("confirmPersonalEmail");

          return json({ email: "test@mail.ru", ttl: "120" });
        },
        action: async () => {
          // const data = await postRegStep2({ test: "test" });
          // return data;

          return null;
        },
      },
    }),
  },
};
