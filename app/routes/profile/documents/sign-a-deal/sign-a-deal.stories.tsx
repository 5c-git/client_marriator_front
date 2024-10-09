import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import SignADeal from "./sign-a-deal";
import MenuLayout from "~/routes/menuLayout/menuLayout";

import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import { json } from "@remix-run/react";
import {
  getDocumentConclude,
  mockResponseSuccess,
} from "~/requests/getDocumentConclude/getDocumentConclude";
import { delay, http, HttpResponse } from "msw";

const meta = {
  title: "Страницы/Внутренние/Профиль/Документы/Заключить договор",
  component: SignADeal,
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
          <h2>Адрес страницы: /profile/documents/sign-a-deal</h2>
          <h3>Используемые запросы:</h3>
          <p>
            getDocumentConclude() - VITE_GET_DOCUMENT_CONCLUDE -{" "}
            {import.meta.env.VITE_GET_DOCUMENT_CONCLUDE}
          </p>
          <p>
            postSetConclude() - VITE_SET_CONCLUDE -{" "}
            {import.meta.env.VITE_SET_CONCLUDE}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof SignADeal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Page",
  parameters: {
    msw: {
      handlers: [
        http.get(import.meta.env.VITE_GET_DOCUMENT_CONCLUDE, async () => {
          await delay(2000);
          return HttpResponse.json(mockResponseSuccess);
        }),
        http.post(import.meta.env.VITE_SET_CONCLUDE, async () => {
          await delay(2000);
          return HttpResponse.json({ success: "success" });
        }),
      ],
    },
    reactRouter: reactRouterParameters({
      routing: {
        path: "/profile/documents/sign-a-deal",
        Component: MenuLayout,
        children: [
          {
            index: true,
            useStoryElement: true,
            loader: async () => {
              const data = await getDocumentConclude("token");

              return json(data.result.organization);
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
