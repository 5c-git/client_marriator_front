import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import DocumentsArchive from "./archive";
import MenuLayout from "~/routes/menuLayout/menuLayout";

import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import {
  getDocumentArchive,
  mockResponseSuccess,
} from "~/requests/getDocumentArchive/getDocumentArchive";
import { json } from "react-router";
import { delay, http, HttpResponse } from "msw";

const meta = {
  title: "Страницы/Внутренние/Профиль/Документы/Архив документов",
  component: DocumentsArchive,
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
          <h2>Адрес страницы: /profile/documents/archive</h2>
          <h3>Используемые запросы:</h3>
          <p>
            getDocumentArchive() - VITE_GET_DOCUMENT_ARCHIVE -{" "}
            {import.meta.env.VITE_GET_DOCUMENT_ARCHIVE}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof DocumentsArchive>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Page",
  parameters: {
    msw: {
      handlers: [
        http.get(import.meta.env.VITE_GET_DOCUMENT_ARCHIVE, async () => {
          await delay(2000);
          return HttpResponse.json(mockResponseSuccess);
        }),
      ],
    },
    reactRouter: reactRouterParameters({
      routing: {
        path: "/profile/documents/archive",
        Component: MenuLayout,
        children: [
          {
            index: true,
            useStoryElement: true,
            loader: async () => {
              const data = await getDocumentArchive("token");
              return json(data.result);
            },
          },
        ],
      },
    }),
  },
};
