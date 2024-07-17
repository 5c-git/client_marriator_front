import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { createRemixStub } from "@remix-run/testing";
import { http, delay, HttpResponse } from "msw";

import Step3 from "./step3";

import { getForm } from "~/requests/getForm/getForm";
import {
  postSaveForm,
  // mockResponseNeedRequired,
  mockResponseAllowedNewStep,
} from "~/requests/postSaveForm/postSaveForm";
import { json } from "@remix-run/react";

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
          <p>getForm() - VITE_GET_FORM - {import.meta.env.VITE_GET_FORM}</p>
          <p>
            postSaveForm() - VITE_SAVE_FORM - {import.meta.env.VITE_SAVE_FORM}
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
            const data = await getForm("token", 3);

            return json({
              formFields: data.result.formData,
              formStatus: data.result.type,
            });
          },
          action: async ({ request }) => {
            const fields = await request.json();

            const data = await postSaveForm("token", 3, fields);

            if (data.result.type === "allowedNewStep") {
              alert("Переходим на следующий шаг!");
            }

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
        http.get(import.meta.env.VITE_GET_FORM, async () => {
          await delay(2000);
          return HttpResponse.json({
            result: {
              formData: [
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
              step: 3,
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
  },
};
