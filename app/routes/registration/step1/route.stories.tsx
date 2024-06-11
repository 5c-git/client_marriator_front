import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { createRemixStub } from "@remix-run/testing";
import { http, delay, HttpResponse } from "msw";

import Step1 from "./route";
import {
  mockResponseSuccess,
  getRegStep1,
} from "~/requests/getRegStep1/getRegStep1";

import { postRegStep1 } from "~/requests/postRegStep1/postRegStep1";

const meta = {
  title: "Страницы/Регистрация/Шаг1",
  component: Step1,
  tags: ["autodocs"],
  parameters: {
    layout: {
      padded: false,
    },
    docs: {
      page: () => (
        <>
          <DocBlock.Title />
          <h2>Адрес страницы: /registration/step1</h2>
          <h3>Используемые запросы:</h3>
          <p>
            getRegStep1() - VITE_REG_STEP_1 - {import.meta.env.VITE_REG_STEP_1}
          </p>
          <p>
            postRegStep2() - VITE_REG_STEP_1 - {import.meta.env.VITE_REG_STEP_1}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof Step1>;

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
            const data = await getRegStep1();

            return data;
          },
          action: async () => {
            const data = await postRegStep1({ test: "test" });

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
        http.get(import.meta.env.VITE_REG_STEP_1, async () => {
          await delay(2000);
          return HttpResponse.json(mockResponseSuccess);
        }),
        http.post(import.meta.env.VITE_REG_STEP_1, async () => {
          await delay(2000);
          return HttpResponse.json(mockResponseSuccess);
        }),
      ],
    },
  },
};
