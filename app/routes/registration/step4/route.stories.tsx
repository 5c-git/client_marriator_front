import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { createRemixStub } from "@remix-run/testing";
import { http, delay, HttpResponse } from "msw";

import Step4 from "./route";
import { getRegStep2 } from "~/requests/getRegStep2/getRegStep2";
import { postRegStep2 } from "~/requests/postRegStep2/postRegStep2";

const meta = {
  title: "Страницы/Регистрация/Шаг4",
  component: Step4,
  tags: ["autodocs"],
  parameters: {
    layout: {
      padded: false,
    },
    docs: {
      page: () => (
        <>
          <DocBlock.Title />
          <h2>Адрес страницы: /registration/step4</h2>
          <h3>Используемые запросы:</h3>
          <p>
            getRegStep4() - VITE_REG_STEP_4 - {import.meta.env.VITE_REG_STEP_4}
          </p>
          <p>
            postRegStep4() - VITE_REG_STEP_4 - {import.meta.env.VITE_REG_STEP_4}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof Step4>;

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
                inputtype: "photo",
                name: "photo",
                value: "",
                url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
                validation: "default",
              },
              {
                inputtype: "text",
                name: "lastName",
                value: "",
                placeholder: "Фамилия",
                validation: "default",
              },
              {
                inputtype: "text",
                name: "name",
                value: "",
                placeholder: "Имя",
                validation: "default",
              },
              {
                inputtype: "radio",
                value: "",
                name: "isMiddleName",
                validation: "default",
                options: [
                  {
                    value: "dontHave",
                    label: "Нет отчества",
                    disabled: false,
                  },
                  {
                    value: "have",
                    label: "Есть отчество",
                    disabled: false,
                  },
                ],
              },
              {
                inputtype: "text",
                name: "middleName",
                value: "",
                placeholder: "Отчество",
                validation: "default",
              },
              {
                inputtype: "date",
                name: "birthday",
                value: null,
                error: "tet",
                placeholder: "Дата рождения",
                validation: "16years",
              },
              {
                inputtype: "select",
                name: "sex",
                value: "",
                placeholder: "Пол",
                validation: "default",
                options: [
                  {
                    value: "male",
                    label: "Мужской",
                    disabled: false,
                  },
                  {
                    value: "female",
                    label: "Женский",
                    disabled: false,
                  },
                ],
              },
              {
                inputtype: "phone",
                name: "phone",
                value: "",
                placeholder: "Мобильный телефон",
                validation: "default",
                dividerTop: true,
                helperInfo: {
                  text: "Будет отправлен код подтверждения",
                },
              },
              {
                inputtype: "radio",
                value: "",
                name: "messenger",
                validation: "default",
                options: [
                  {
                    value: "whatsApp",
                    label: "WhatsApp",
                    icon: "whatsapp",
                    disabled: false,
                  },
                  {
                    value: "telegram",
                    label: "Telegram",
                    icon: "telegram",
                    disabled: false,
                  },
                  {
                    value: "viber",
                    label: "Viber",
                    icon: "viber",
                    disabled: false,
                  },
                  {
                    value: "no",
                    label: "Я не пользуюсь",
                    disabled: false,
                  },
                ],
                heading: "Выбери мессенджер:",
              },
              {
                inputtype: "text",
                name: "email",
                value: "",
                placeholder: "E-mail",
                validation: "emailReq",
                helperInfo: {
                  text: "Будет отправлен код подтверждения",
                },
              },
              {
                inputtype: "radio",
                value: "",
                name: "passport",
                validation: "default",
                options: [
                  {
                    value: "passport",
                    label: "Паспорт",
                    disabled: false,
                  },
                  {
                    value: "blank",
                    label: "Анкета соискателя",
                    disabled: false,
                  },
                ],
                dividerTop: true,
                heading: "Документ удостоверяющий личность",
                helperInfo: {
                  text: "Для изменения данных выбери тип документа и загрузи его фотографии",
                },
              },
              {
                inputtype: "file",
                name: "passportDoc",
                value: "",
                url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
                placeholder: "Приложи документ",
                validation: "default",
              },
              {
                inputtype: "file",
                name: "you",
                value: "",
                url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
                placeholder: "Приложи документ",
                validation: "default",
                heading: "Справка самозанятого",
                helperInfo: {
                  text: "Для подтверждения приложи фотографию документа",
                },
              },
              {
                inputtype: "file",
                name: "parents",
                value: "",
                url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
                placeholder: "Приложи документ",
                validation: "default",
                heading: "Согласие родителей",
                dividerTop: true,
                helperInfo: {
                  text: "Для подтверждения приложи фотографию документа",
                  link: {
                    type: "external",
                    path: "https://www.google.com/",
                    text: " Скачать шаблон.",
                  },
                },
              },

              {
                inputtype: "select",
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
                inputtype: "select",
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
                inputtype: "select",
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
                inputtype: "file",
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
                inputtype: "file",
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
                inputtype: "file",
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
                inputtype: "radio",
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
                inputtype: "file",
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
