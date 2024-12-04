import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { http, delay, HttpResponse } from "msw";

import Step1 from "./step1";

import { getForm, mockStep1ResponseSuccess } from "~/requests/getForm/getForm";
import { transformBikOptions } from "~/requests/getForm/getFormHooks";
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

const meta = {
  title: "Страницы/Регистрация/Шаг1",
  component: Step1,
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
          <h2>Адрес страницы: /registration/step1</h2>
          <h3>Используемые запросы:</h3>
          <p>getForm() - VITE_GET_FORM - {import.meta.env.VITE_GET_FORM}</p>
          <p>
            postSaveForm() - VITE_SAVE_FORM - {import.meta.env.VITE_SAVE_FORM}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof Step1>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Page",
  parameters: {
    msw: {
      handlers: [
        http.get(import.meta.env.VITE_GET_FORM, async () => {
          await delay(2000);
          return HttpResponse.json(mockStep1ResponseSuccess);
        }),
        http.post(import.meta.env.VITE_SAVE_FORM, async () => {
          await delay(2000);
          return HttpResponse.json(mockResponseAllowedNewStep);
        }),
      ],
    },
    reactRouter: reactRouterParameters({
      routing: {
        path: "/registration/step1",
        loader: async () => {
          const rawData = await getForm("token", 1);

          const data = transformBikOptions(rawData);

          return json({
            formFields: data.result.formData,
            formStatus: data.result.type,
          });
        },
        action: async ({ request }) => {
          const fields = await request.json();

          const data = await postSaveForm("token", 1, fields);

          if (data.result.type === "allowedNewStep") {
            alert("Переходим на следующий шаг!");
          }

          return data;
        },
      },
    }),
  },
};
