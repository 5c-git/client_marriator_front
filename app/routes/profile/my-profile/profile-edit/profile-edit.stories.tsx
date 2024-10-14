import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { http, delay, HttpResponse } from "msw";

import ProfileEdit from "./profile-edit";
import MenuLayout from "~/routes/menuLayout/menuLayout";

import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import {
  getUserFields,
  mockResponseSuccess,
} from "~/requests/getUserFields/getUserFields";
import { loadNamespaces, t } from "i18next";
import { json } from "@remix-run/react";

const meta = {
  title: "Страницы/Внутренние/Профиль/Мой профиль/Редактирование профиля",
  component: ProfileEdit,
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
          <h2>Адрес страницы: /profile/my-profile/profile-edit</h2>
          <h3>Используемые запросы:</h3>
          <p>
            getUserFields() - VITE_GET_USER_FIELDS -{" "}
            {import.meta.env.VITE_GET_USER_FIELDS}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof ProfileEdit>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Page",
  parameters: {
    msw: {
      handlers: [
        http.get(import.meta.env.VITE_GET_USER_FIELDS, async () => {
          await delay(2000);
          return HttpResponse.json(mockResponseSuccess);
        }),
      ],
    },
    reactRouter: reactRouterParameters({
      routing: {
        path: "/profile/my-profile/profile-edit",
        Component: MenuLayout,
        children: [
          {
            index: true,
            useStoryElement: true,
            loader: async () => {
              await loadNamespaces("profileEdit");

              const data = await getUserFields("token", "1");

              const curentSection = data.result.section.find(
                (item) => item.value === Number("1")
              );

              return json({
                accessToken: "token",
                formFields: data.result.formData,
                currentSection:
                  curentSection !== undefined
                    ? curentSection.name
                    : t("sectionHeader", { ns: "profileEdit" }),
              });
            },
          },
        ],
      },
    }),
  },
};
