import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { http, delay, HttpResponse } from "msw";

import UserActivities from "./user-activities";

import {
  getFormActivities,
  mockStep1ResponseSuccess,
} from "~/requests/getFormActivities/getFormActivities";

import { mockResponseAllowedNewStep } from "~/requests/postSaveUserFieldsActivities/postSaveUserFieldsActivities";

import { json } from "react-router";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import MenuLayout from "~/routes/menuLayout/menuLayout";

const meta = {
  title: "Страницы/Внутренние/Профиль/Мой профиль/Виды деятельности",
  component: UserActivities,
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
          <h2>Адрес страницы: /profile/my-profile/user-activities</h2>
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
  name: "Page",
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
    reactRouter: reactRouterParameters({
      routing: {
        path: "/profile/my-profile/user-activities",
        Component: MenuLayout,
        children: [
          {
            index: true,
            useStoryElement: true,
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
        ],
      },
    }),
  },
};
