import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";

import СonfirmPersonalPhone from "./confirm-personal-phone";
import { json } from "@remix-run/react";
import { loadNamespaces } from "i18next";

const meta = {
  title:
    "Страницы/Внутренние/Профиль/Мой профиль/Входные данные/Подтверждение личного телефона",
  component: СonfirmPersonalPhone,
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
          <h2>
            Адрес страницы:
            /profile/my-profile/profile-meta/confirm-personal-phone
          </h2>
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
  name: "Page",
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: "/profile/my-profile/profile-meta/confirm-personal-phone",
        loader: async () => {
          await loadNamespaces("confirmPersonalPhone");

          return json({ phone: "79152142635", ttl: "120" });
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
