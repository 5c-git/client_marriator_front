import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import СonfirmRestorePin from "./confirm-restore-pin";
import { json } from "react-router";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import { loadNamespaces } from "i18next";

const meta = {
  title: "Страницы/Вход/Восстановление пин-кода",
  component: СonfirmRestorePin,
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
          <h2>Адрес страницы: /signin/confirm-restore-pin</h2>
          <h3>Используемые запросы:</h3>
          <p>
            postStartRestorePin() - VITE_START_RESTORE_PIN -{" "}
            {import.meta.env.VITE_START_RESTORE_PIN}
          </p>
          <p>
            postCheckCodeRestore() - VITE_CHECK_CODE_RESTORE -{" "}
            {import.meta.env.VITE_CHECK_CODE_RESTORE}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof СonfirmRestorePin>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Page",
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: "/signin/confirm-restore-pin",
        loader: async () => {
          await loadNamespaces("confirmRestorePin");
          return json({ ttl: 120 });
        },
        action: async () => {
          return null;
        },
      },
    }),
  },
};
