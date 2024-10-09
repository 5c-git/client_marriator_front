import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { http, delay, HttpResponse } from "msw";

import Step7 from "./step7";

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
  title: "Страницы/Регистрация/Шаг7",
  component: Step7,
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
          <h2>Адрес страницы: /registration/step7</h2>
          <h3>Используемые запросы:</h3>
          <p>getForm() - VITE_GET_FORM - {import.meta.env.VITE_GET_FORM}</p>
          <p>
            postSaveForm() - VITE_SAVE_FORM - {import.meta.env.VITE_SAVE_FORM}
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
  parameters: {
    msw: {
      handlers: [
        http.get(import.meta.env.VITE_GET_FORM, async () => {
          await delay(2000);
          return HttpResponse.json({
            result: {
              formData: [
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
              step: 7,
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
        path: "/registration/step7",
        loader: async () => {
          const data = await getForm("token", 7);

          return json({
            formFields: data.result.formData,
            formStatus: data.result.type,
          });
        },
        action: async ({ request }) => {
          const fields = await request.json();

          const data = await postSaveForm("token", 7, fields);

          if (data.result.type === "allowedNewStep") {
            alert("Переходим на следующий шаг!");
          }

          return data;
        },
      },
    }),
  },
};
