import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { createRemixStub } from "@remix-run/testing";
import { http, delay, HttpResponse } from "msw";

import Step3 from "./route";
import { getRegStep2 } from "~/requests/getRegStep2/getRegStep2";
import { postRegStep2 } from "~/requests/postRegStep2/postRegStep2";

const meta = {
  title: "Страницы/Регистрация/Шаг3",
  component: Step3,
  tags: ["autodocs"],
  parameters: {
    layout: {
      padded: false,
    },
    docs: {
      page: () => (
        <>
          <DocBlock.Title />
          <h2>Адрес страницы: /registration/step3</h2>
          <h3>Используемые запросы:</h3>
          <p>
            getRegStep3() - VITE_REG_STEP_3 - {import.meta.env.VITE_REG_STEP_3}
          </p>
          <p>
            postRegStep3() - VITE_REG_STEP_3 - {import.meta.env.VITE_REG_STEP_3}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof Step3>;

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
                inputType: "text",
                name: "weight",
                value: "",
                placeholder: "Вес",
                validation: "default",
              },
              {
                inputType: "select",
                name: "height",
                value: "",
                placeholder: "Рост",
                validation: "default",
                options: [
                  {
                    value: "35.5",
                    label: "35.5",
                    disabled: false,
                  },
                  {
                    value: "41",
                    label: "41",
                    disabled: false,
                  },
                  {
                    value: "45",
                    label: "45",
                    disabled: false,
                  },
                ],
              },
              {
                inputType: "select",
                name: "clothes",
                value: "",
                placeholder: "Размер одежды",
                validation: "default",
                options: [
                  {
                    value: "44-46",
                    label: "44-46",
                    disabled: false,
                  },
                  {
                    value: "46-48",
                    label: "46-48",
                    disabled: false,
                  },
                  {
                    value: "48-50",
                    label: "48-50",
                    disabled: false,
                  },
                ],
              },
              {
                inputType: "select",
                name: "hairColor",
                value: "",
                placeholder: "Цвет волос",
                validation: "default",
                options: [
                  {
                    value: "light",
                    label: "светлые",
                    disabled: false,
                  },
                  {
                    value: "dark",
                    label: "тёмные",
                    disabled: false,
                  },
                ],
              },
              {
                inputType: "select",
                name: "hairLenght",
                value: "",
                placeholder: "Длина волос",
                validation: "default",
                options: [
                  {
                    value: "short",
                    label: "Короткие",
                    disabled: false,
                  },
                  {
                    value: "normal",
                    label: "Средние",
                    disabled: false,
                  },
                  {
                    value: "long",
                    label: "Длинные",
                    disabled: false,
                  },
                ],
              },
              {
                inputType: "file",
                name: "driverLicence",
                value: "",
                url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
                placeholder: "Приложи документ",
                validation: "default",
                heading: "Водительское удостоверение",
                dividerTop: true,
                helperInfo: {
                  text: "Для подтверждения приложи фотографию документа",
                },
              },
              {
                inputType: "file",
                name: "medicalDriverLicence",
                value: "",
                url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
                placeholder: "Приложи документ",
                validation: "default",
                heading: "Медицинский допуск к управлению ТС",

                helperInfo: {
                  text: "Для подтверждения приложи фотографию документа",
                },
              },
              {
                inputType: "file",
                name: "anyLicence",
                value: "",
                url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
                placeholder: "Приложи документ",
                validation: "default",
                heading: "Пример любого допуска к работе",
                helperInfo: {
                  text: "Для подтверждения приложи фотографию документа",
                },
              },
              {
                inputType: "radio",
                value: "",
                name: "medBook",
                validation: "default",
                dividerTop: true,
                heading: "Медкнижка",
                options: [
                  {
                    value: "have",
                    label: "В наличии",
                    disabled: false,
                  },
                  {
                    value: "dontHave",
                    label: "На оформлении",
                    disabled: false,
                  },
                ],
              },
              {
                inputType: "file",
                name: "medBookFile",
                value: "",
                url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
                placeholder: "Приложи документ",
                validation: "default",
                helperInfo: {
                  text: "Для подтверждения приложи фотографию документа",
                },
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
