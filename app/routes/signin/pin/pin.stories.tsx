import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { http, delay, HttpResponse } from "msw";

import Pin from "./pin";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";

const meta = {
  title: "Страницы/Вход/Пин",
  component: Pin,
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
          <h2>Адрес страницы: /signin/pin</h2>
          <h3>Используемые запросы:</h3>
          {/* <p>
            getRegStep2() - VITE_REG_STEP_2 - {import.meta.env.VITE_REG_STEP_2}
          </p> */}
        </>
      ),
    },
  },
} satisfies Meta<typeof Pin>;

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
        path: "/signin/pin",
        action: () => {
          return null;
        },
      },
    }),
  },
};
