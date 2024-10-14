import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import СonfirmEmail from "./confirm-email";
import { json } from "@remix-run/react";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
const meta = {
  title: "Страницы/Регистрация/Подтверждение email",
  component: СonfirmEmail,
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
  name: "Page",
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: "/registration/confirm-email",
        loader: async () => {
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
