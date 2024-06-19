import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { createRemixStub } from "@remix-run/testing";
import { http, delay, HttpResponse } from "msw";

import Step6 from "./route";
import { getRegStep2 } from "~/requests/getRegStep2/getRegStep2";
import { postRegStep2 } from "~/requests/postRegStep2/postRegStep2";

const meta = {
  title: "Страницы/Регистрация/Шаг6",
  component: Step6,
  tags: ["autodocs"],
  parameters: {
    layout: {
      padded: false,
    },
    docs: {
      page: () => (
        <>
          <DocBlock.Title />
          <h2>Адрес страницы: /registration/step6</h2>
          <h3>Используемые запросы:</h3>
          <p>
            getRegStep6() - VITE_REG_STEP_6 - {import.meta.env.VITE_REG_STEP_6}
          </p>
          <p>
            postRegStep6() - VITE_REG_STEP_6 - {import.meta.env.VITE_REG_STEP_6}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof Step6>;

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
                inputType: "inn",
                name: "inn",
                value: "",
                placeholder: "ИНН",
                validation: "default",
                link: {
                  type: "external",
                  path: "https://www.google.com/",
                  text: "Узнай свой ИНН",
                },
              },
              {
                inputType: "snils",
                name: "snils",
                value: "",
                placeholder: "СНИЛС",
                validation: "default",
                link: {
                  type: "external",
                  path: "https://www.google.com/",
                  text: "Электронные услуги и сервисы СФР",
                },
              },
              {
                inputType: "file",
                name: "registration",
                value: "",
                url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
                placeholder: "Приложи документ",
                validation: "default",
                heading: "Адрес регистрации",
                helperInfo: {
                  text: "Для подтверждения приложи фотографию документа",
                },
              },
              {
                inputType: "file",
                name: "migrationCard",
                value: "",
                url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
                placeholder: "Приложи документ",
                validation: "default",
                heading: "Миграционная карта",
                helperInfo: {
                  text: "Для подтверждения приложи фотографию документа",
                },
              },
              {
                inputType: "file",
                name: "fingerprints",
                value: "",
                url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
                placeholder: "Приложи документ",
                validation: "default",
                heading: "Дактилоскопия",
                helperInfo: {
                  text: "Для подтверждения приложи фотографию документа",
                },
              },
              {
                inputType: "file",
                name: "arrivalNotice",
                value: "",
                url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
                placeholder: "Приложи документ",
                validation: "default",
                heading: "Уведомление о прибытии",
                helperInfo: {
                  text: "Для подтверждения приложи фотографию документа",
                },
              },
              {
                inputType: "file",
                name: "patent",
                value: "",
                url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
                placeholder: "Приложи документ",
                validation: "default",
                heading: "Патент",
                helperInfo: {
                  text: "Для подтверждения приложи фотографию документа",
                },
                dividerTop: true,
              },
              {
                inputType: "file",
                name: "patentPayment",
                value: "",
                url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
                placeholder: "Приложи документ",
                validation: "default",
                heading: "Квитанция оплаты патента",
                helperInfo: {
                  text: "Для подтверждения приложи фотографию документа",
                },
              },
              {
                inputType: "file",
                name: "workPermit",
                value: "",
                url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
                placeholder: "Приложи документ",
                validation: "default",
                heading: "Разрешение на работу",
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
