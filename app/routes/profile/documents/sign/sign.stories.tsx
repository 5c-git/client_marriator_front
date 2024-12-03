import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import Sign from "./sign";
import MenuLayout from "~/routes/menuLayout/menuLayout";

import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import {
  getDocumentSigned,
  mockResponseSuccess,
} from "~/requests/getDocumentSigned/getDocumentSigned";
import { json } from "react-router";
import { delay, http, HttpResponse } from "msw";

const meta = {
  title: "Страницы/Внутренние/Профиль/Документы/Необходимо подписать",
  component: Sign,
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
          <h2>Адрес страницы: /profile/documents/sign</h2>
          <h3>Используемые запросы:</h3>
          <p>
            getDocumentSigned() - VITE_GET_DOCUMENT_SIGNED -{" "}
            {import.meta.env.VITE_GET_DOCUMENT_SIGNED}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof Sign>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Page",
  parameters: {
    msw: {
      handlers: [
        http.get(import.meta.env.VITE_GET_DOCUMENT_SIGNED, async () => {
          await delay(2000);
          return HttpResponse.json(mockResponseSuccess);
        }),
      ],
    },
    reactRouter: reactRouterParameters({
      routing: {
        path: "/profile/documents/sign",
        Component: MenuLayout,
        children: [
          {
            index: true,
            useStoryElement: true,
            loader: async () => {
              const data = await getDocumentSigned("token");

              return json(data.result);
            },
          },
        ],
      },
    }),
  },
};
