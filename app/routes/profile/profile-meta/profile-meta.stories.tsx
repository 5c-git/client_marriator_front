import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { createRemixStub } from "@remix-run/testing";
import { http, delay, HttpResponse } from "msw";

import ProfileMeta from "./profile-meta";

import {
  getUserInfo,
  mockResponseSuccess,
} from "~/requests/getUserInfo/getUserInfo";

import { json } from "@remix-run/react";

const meta = {
  title: "Страницы/Внутренние/Профиль/Входные данные",
  component: ProfileMeta,
  tags: ["autodocs"],
  parameters: {
    layout: {
      padded: false,
    },
    docs: {
      page: () => (
        <>
          <DocBlock.Title />
          <h2>Адрес страницы: /profile/profile-meta</h2>
          <h3>Используемые запросы:</h3>
          <p>
            getUserInfo() - VITE_GET_USER_INFO -{" "}
            {import.meta.env.VITE_GET_USER_INFO}
          </p>
          <p>
            postChangeUserPhone() - VITE_CHANGE_USER_PHONE -{" "}
            {import.meta.env.VITE_CHANGE_USER_PHONE}
          </p>
          <p>
            postPersonalSetUserEmail() - VITE_SET_PERSONAL_USER_EMAIL -{" "}
            {import.meta.env.VITE_SET_PERSONAL_USER_EMAIL}
          </p>
          <p>
            postSaveUserImg() - VITE_SEND_PERSONAL_PHOTO -{" "}
            {import.meta.env.VITE_SEND_PERSONAL_PHOTO}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof ProfileMeta>;

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
            const userInfo = await getUserInfo("token");

            return json({
              accessToken: "token",
              photo: userInfo.result.userData.img,
              phone: userInfo.result.userData.phone.toString(),
              email: userInfo.result.userData.email,
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
        http.get(import.meta.env.VITE_GET_USER_INFO, async () => {
          await delay(2000);
          return HttpResponse.json(mockResponseSuccess);
        }),
        http.post(import.meta.env.VITE_SAVE_FORM, async () => {
          await delay(2000);
          return HttpResponse.json({});
        }),
      ],
    },
  },
};
