import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { http, delay, HttpResponse } from "msw";

import CreatePin from "./createPin";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";

const meta = {
  title: "Страницы/Вход/Создание пина",
  component: CreatePin,
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
          <h2>Адрес страницы: /signin/createPin</h2>
          <h3>Используемые запросы:</h3>
          <p>
            postSetUserPin() - VITE_SET_USER_PIN -{" "}
            {import.meta.env.VITE_SET_USER_PIN}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof CreatePin>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Page",
  parameters: {
    msw: {
      handlers: [
        http.post(import.meta.env.VITE_GET_FORM, async () => {
          await delay(2000);
          return HttpResponse.json({
            status: "Success",
          });
        }),
      ],
    },
    reactRouter: reactRouterParameters({
      routing: {
        path: "/signin/createPin",
        action: async () => {
          // const data = await postRegStep2({ test: "test" });
          return null;
        },
      },
    }),
  },
};
