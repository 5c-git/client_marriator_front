import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { createRemixStub } from "@remix-run/testing";
import { http, delay, HttpResponse } from "msw";

import Step5 from "./route";
import { getRegStep2 } from "~/requests/getRegStep2/getRegStep2";
import { postRegStep2 } from "~/requests/postRegStep2/postRegStep2";

const meta = {
  title: "Страницы/Регистрация/Шаг5",
  component: Step5,
  tags: ["autodocs"],
  parameters: {
    layout: {
      padded: false,
    },
    docs: {
      page: () => (
        <>
          <DocBlock.Title />
          <h2>Адрес страницы: /registration/step5</h2>
          <h3>Используемые запросы:</h3>
          <p>
            getRegStep5() - VITE_REG_STEP_5 - {import.meta.env.VITE_REG_STEP_5}
          </p>
          <p>
            postRegStep5() - VITE_REG_STEP_5 - {import.meta.env.VITE_REG_STEP_5}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof Step5>;

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
                inputType: "checkbox",
                name: "trustPerson",
                value: false,
                label: "Моё доверенное лицо",
                validation: "checked",
              },
              {
                inputType: "text",
                name: "fio",
                value: "",
                placeholder: "ФИО получателя",
                validation: "default",
              },
              {
                inputType: "select",
                name: "bik",
                value: "",
                placeholder: "БИК",
                validation: "default",
                options: [
                  {
                    value: "123456789",
                    label: "123456789",
                    disabled: false,
                  },
                  {
                    value: "987654321",
                    label: "987654321",
                    disabled: false,
                  },
                ],
              },
              {
                inputType: "account",
                name: "account",
                value: "",
                placeholder: "Лицевой счет",
                validation: "default",
              },
              {
                inputType: "card",
                name: "card",
                value: "",
                placeholder: "Номер банковской карты",
                validation: "default",
              },
              {
                inputType: "radio",
                value: "yes",
                name: "payCard",
                validation: "default",
                heading: "Платежи по номеру банковской карты?",
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
                inputType: "month",
                name: "expireDate",
                value: null,
                placeholder: "Срок окончания действия карты",
                validation: "default",
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
