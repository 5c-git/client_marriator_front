import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { http, delay, HttpResponse } from "msw";

import Sms from "./sms";
import { json } from "react-router";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import { loadNamespaces } from "i18next";

const meta = {
  title: "Страницы/Вход/Смс-код",
  component: Sms,
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
          <h2>Адрес страницы: /signin/sms</h2>
          <h3>Используемые запросы:</h3>
          <p>
            postSendPhone() - VITE_SEND_PHONE -{" "}
            {import.meta.env.VITE_SEND_PHONE}
          </p>
          <p>
            postCheckCode() - VITE_CHECK_CODE -{" "}
            {import.meta.env.VITE_CHECK_CODE}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof Sms>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Page",
  parameters: {
    msw: {
      handlers: [
        http.post(import.meta.env.VITE_GET_FORM, async () => {
          await delay(2000);
          return HttpResponse.json({
            status: "Success",
          });
        }),
      ],
    },
    reactRouter: reactRouterParameters({
      routing: {
        path: "/signin/sms",
        loader: async ({ request }) => {
          loadNamespaces("sms");

          const currentURL = new URL(request.url);

          const ttl = currentURL.searchParams.get("ttl");

          return json({ phone: "+79123152151", ttl });
        },
        action: async () => {
          // const data = await postRegStep2({ test: "test" });
          // return data;

          return null;
        },
      },
    }),
  },
};
