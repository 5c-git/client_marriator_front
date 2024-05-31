import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { createRemixStub } from "@remix-run/testing";
import { http, delay, HttpResponse } from "msw";

import Step2 from "./route";
import {
  mockResponseSuccess,
  getRegStep2,
} from "~/requests/getRegStep2/getRegStep2";
import {
  postRegStep2,
  mockResponseSuccess as postRegStep2MockResponseSuccess,
} from "~/requests/postRegStep2/postRegStep2";

const meta = {
  title: "Страницы/Регистрация/Шаг2",
  component: Step2,
  tags: ["autodocs"],
  parameters: {
    layout: {
      padded: false,
    },
    docs: {
      page: () => (
        <>
          <DocBlock.Title />
          <h2>Адрес страницы: /registration/step2</h2>
          <h3>Используемые запросы:</h3>
          <p>
            getRegStep2() - VITE_REG_STEP_2 - {import.meta.env.VITE_REG_STEP_2}
          </p>
          <p>
            postRegStep2() - VITE_REG_STEP_2 - {import.meta.env.VITE_REG_STEP_2}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof Step2>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Страница",
  decorators: [
    (Story) => {
      const RemixStub = createRemixStub([
        {
          path: "/",
          Component: Story,
          loader: async () => {
            const data = await getRegStep2();

            return data;
          },
          action: async () => {
            const data = await postRegStep2({ test: "test" });

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
        http.get(import.meta.env.VITE_REG_STEP_2, async () => {
          await delay(2000);
          return HttpResponse.json(mockResponseSuccess);
        }),
        http.post(import.meta.env.VITE_REG_STEP_2, async () => {
          await delay(2000);
          return HttpResponse.json(postRegStep2MockResponseSuccess);
        }),
      ],
    },
  },
};
