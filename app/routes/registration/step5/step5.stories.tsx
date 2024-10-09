import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { http, delay, HttpResponse } from "msw";

import Step5 from "./step5";
import { getForm } from "~/requests/getForm/getForm";
import {
  postSaveForm,
  // mockResponseNeedRequired,
  mockResponseAllowedNewStep,
} from "~/requests/postSaveForm/postSaveForm";
import { json } from "@remix-run/react";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";

const meta = {
  title: "Страницы/Регистрация/Шаг5",
  component: Step5,
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
          <h2>Адрес страницы: /registration/step5</h2>
          <h3>Используемые запросы:</h3>
          <p>getForm() - VITE_GET_FORM - {import.meta.env.VITE_GET_FORM}</p>
          <p>
            postSaveForm() - VITE_SAVE_FORM - {import.meta.env.VITE_SAVE_FORM}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof Step5>;

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
              step: 5,
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
        path: "/registration/step5",
        loader: async () => {
          const data = await getForm("token", 5);

          return json({
            formFields: data.result.formData,
            formStatus: data.result.type,
          });
        },
        action: async ({ request }) => {
          const fields = await request.json();

          const data = await postSaveForm("token", 5, fields);

          if (data.result.type === "allowedNewStep") {
            alert("Переходим на следующий шаг!");
          }

          return data;
        },
      },
    }),
  },
};
