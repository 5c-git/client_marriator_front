import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import TerminateADeal from "./terminate-a-deal";
import MenuLayout from "~/routes/menuLayout/menuLayout";

import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import { json } from "react-router";

import {
  getDocumentTerminate,
  mockResponseSuccess,
} from "~/requests/getDocumentTerminate/getDocumentTerminate";
import { delay, http, HttpResponse } from "msw";

const meta = {
  title: "Страницы/Внутренние/Профиль/Документы/Расторгнуть договор",
  component: TerminateADeal,
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
          <h2>Адрес страницы: /profile/documents/terminate-a-deal</h2>
          <h3>Используемые запросы:</h3>
          <p>
            getDocumentTerminate() - VITE_GET_DOCUMENT_TERMINATE -{" "}
            {import.meta.env.VITE_GET_DOCUMENT_TERMINATE}
          </p>
          <p>
            postSetTerminate() - VITE_SET_TERMINATE -{" "}
            {import.meta.env.VITE_SET_TERMINATE}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof TerminateADeal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Page",
  parameters: {
    msw: {
      handlers: [
        http.get(import.meta.env.VITE_GET_DOCUMENT_TERMINATE, async () => {
          await delay(2000);
          return HttpResponse.json(mockResponseSuccess);
        }),
        http.post(import.meta.env.VITE_SET_TERMINATE, async () => {
          await delay(2000);
          return HttpResponse.json({ success: "success" });
        }),
      ],
    },
    reactRouter: reactRouterParameters({
      routing: {
        path: "/profile/documents/terminate-a-deal",
        Component: MenuLayout,
        children: [
          {
            index: true,
            useStoryElement: true,
            loader: async () => {
              const data = await getDocumentTerminate("token");

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
