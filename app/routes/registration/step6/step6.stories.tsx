import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { http, delay, HttpResponse } from "msw";

import Step6 from "./step6";

import { getForm } from "~/requests/getForm/getForm";
import {
  postSaveForm,
  // mockResponseNeedRequired,
  mockResponseAllowedNewStep,
} from "~/requests/postSaveForm/postSaveForm";
import { json } from "react-router";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import { transformBikOptions } from "~/requests/getForm/getFormHooks";

const meta = {
  title: "Страницы/Регистрация/Шаг6",
  component: Step6,
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
          <h2>Адрес страницы: /registration/step6</h2>
          <h3>Используемые запросы:</h3>
          <p>getForm() - VITE_GET_FORM - {import.meta.env.VITE_GET_FORM}</p>
          <p>
            postSaveForm() - VITE_SAVE_FORM - {import.meta.env.VITE_SAVE_FORM}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof Step6>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Page",
  parameters: {
    msw: {
      handlers: [
        http.get(import.meta.env.VITE_GET_FORM, async () => {
          await delay(2000);
          return HttpResponse.json({
            result: {
              formData: [
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
              step: 6,
              type: "needRequired",
            },
            status: "success",
          });
        }),
        http.post(import.meta.env.VITE_SAVE_FORM, async () => {
          await delay(2000);
          return HttpResponse.json(mockResponseAllowedNewStep);
        }),
      ],
    },
    reactRouter: reactRouterParameters({
      routing: {
        path: "/registration/step6",
        loader: async () => {
          const rawData = await getForm("token", 6);

          const data = transformBikOptions(rawData);

          return json({
            formFields: data.result.formData,
            formStatus: data.result.type,
          });
        },
        action: async ({ request }) => {
          const fields = await request.json();

          const data = await postSaveForm("token", 6, fields);

          if (data.result.type === "allowedNewStep") {
            alert("Переходим на следующий шаг!");
          }

          return data;
        },
      },
    }),
  },
};
