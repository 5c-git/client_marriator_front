import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { createRemixStub } from "@remix-run/testing";
import { http, delay, HttpResponse } from "msw";

import UserActivities from "./user-activities";

import {
  getFormActivities,
  mockStep1ResponseSuccess,
} from "~/requests/getFormActivities/getFormActivities";

import { mockResponseAllowedNewStep } from "~/requests/postSaveUserFieldsActivities/postSaveUserFieldsActivities";

import { json } from "@remix-run/react";

const meta = {
  title: "Страницы/Внутренние/Профиль/Виды деятельности",
  component: UserActivities,
  tags: ["autodocs"],
  parameters: {
    layout: {
      padded: false,
    },
    docs: {
      page: () => (
        <>
          <DocBlock.Title />
          <h2>Адрес страницы: /profile/user-activities</h2>
          <h3>Используемые запросы:</h3>
          <p>
            getFormActivities() - VITE_GET_FORM_ACTIVITIES -{" "}
            {import.meta.env.VITE_GET_FORM_ACTIVITIES}
          </p>
          <p>
            postSaveUserFieldsActivities() - VITE_SAVE_USER_FIELDS_ACTIVITIES -{" "}
            {import.meta.env.VITE_SAVE_USER_FIELDS_ACTIVITIES}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof UserActivities>;

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
            const data = await getFormActivities("token", 1);

            return json({
              formFields: data.result.formData,
              formStatus: data.result.type,
            });
          },
          action: async () => {
            return null;
          },
        },
      ]);

      return <RemixStub />;
    },
  ],
  parameters: {
    msw: {
      handlers: [
        http.get(import.meta.env.VITE_GET_FORM_ACTIVITIES, async () => {
          await delay(2000);
          return HttpResponse.json(mockStep1ResponseSuccess);
        }),
        http.post(
          import.meta.env.VITE_SAVE_USER_FIELDS_ACTIVITIES,
          async () => {
            await delay(2000);
            return HttpResponse.json(mockResponseAllowedNewStep);
          }
        ),
      ],
    },
  },
};
