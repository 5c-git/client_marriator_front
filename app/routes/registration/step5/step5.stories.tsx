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
import { transformBikOptions } from "~/requests/getForm/getFormHooks";

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
                  name: "xId3LKEIZ1w1hidPtsoEP2jPLvJoCz",
                  value: false,
                  label: "Мое доверенное лицо",
                  disabled: false,
                  validation: "none",
                },
                {
                  inputType: "text",
                  name: "P93JuDTcWlnJfgOJOmM1VtP9vSVnK8",
                  value: "test",
                  disabled: false,
                  validation: "default",
                  placeholder: "ФИО получателя",
                },
                {
                  inputType: "autocomplete",
                  name: "5nibSuUwMDHHB965TRu8iT4exCxhRN",
                  value: "044525974",
                  placeholder: "БИК",
                  disabled: false,
                  options: [
                    {
                      value: "044525974",
                      label: "ТИНЬКОФФ-TEST",
                      disabled: false,
                    },
                    {
                      value: "044525225",
                      label: "СБЕРБАНК-TEST",
                      disabled: false,
                    },
                    {
                      value: "044525600",
                      label: "МИНБАНК-TEST",
                      disabled: false,
                    },
                  ],
                  validation: "default",
                },
                {
                  inputType: "account",
                  name: "n1bZyr8bWZYmCOcT5KFQg1MRqvQzj2",
                  value: "12312314444444444444",
                  label: "Лицевой счет",
                  disabled: false,
                  validation: "default",
                  placeholder: "Лицевой счет",
                },
              ],
              step: 5,
              type: "allowedNewStep",
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
          const rawData = await getForm("token", 5);

          const data = transformBikOptions(rawData);

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
