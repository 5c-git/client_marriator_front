import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { createRemixStub } from "@remix-run/testing";
import { http, delay, HttpResponse } from "msw";

import Step7 from "./route";
import { getRegStep2 } from "~/requests/getRegStep2/getRegStep2";
import { postRegStep2 } from "~/requests/postRegStep2/postRegStep2";

const meta = {
  title: "Страницы/Регистрация/Шаг7",
  component: Step7,
  tags: ["autodocs"],
  parameters: {
    layout: {
      padded: false,
    },
    docs: {
      page: () => (
        <>
          <DocBlock.Title />
          <h2>Адрес страницы: /registration/step7</h2>
          <h3>Используемые запросы:</h3>
          <p>
            getRegStep7() - VITE_REG_STEP_7 - {import.meta.env.VITE_REG_STEP_7}
          </p>
          <p>
            postRegStep7() - VITE_REG_STEP_7 - {import.meta.env.VITE_REG_STEP_7}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof Step7>;

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
          return HttpResponse.json({
            inputs: [
              {
                inputType: "radio",
                value: "no",
                name: "unlimitedRequests",
                validation: "default",
                heading: "Принимать заявки без ограничений?",
                options: [
                  {
                    value: "yes",
                    label: "Да",
                    disabled: false,
                  },
                  {
                    value: "no",
                    label: "Нет",
                    disabled: false,
                  },
                ],
              },
              {
                inputType: "checkboxMultiple",
                name: "organization",
                validation: "default",
                value: [],
                options: [
                  {
                    value: "organization1",
                    label: "Организация 1",
                    disabled: false,
                  },
                  {
                    value: "organization2",
                    label: "Организация 2",
                    disabled: false,
                  },
                  {
                    value: "organization3",
                    label: "Организация 3",
                    disabled: false,
                  },
                ],
              },
            ],
          });
        }),
        http.post(import.meta.env.VITE_REG_STEP_2, async () => {
          await delay(2000);
          return HttpResponse.json({
            status: "Success",
          });
        }),
      ],
    },
  },
};
