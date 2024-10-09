import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import { http, delay, HttpResponse } from "msw";

import WorkRadius from "./work-radius";

import {
  getMapField,
  mockResponseSuccess,
} from "~/requests/getMapField/getMapField";

import { json } from "@remix-run/react";
import MenuLayout from "~/routes/menuLayout/menuLayout";

const meta = {
  title: "Страницы/Внутренние/Профиль/Мой профиль/Радиус поиска",
  component: WorkRadius,
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
          <h2>Адрес страницы: /profile/my-profile/work-radius</h2>
          <h3>Используемые запросы:</h3>
          <p>
            getMapField() - VITE_GET_MAP_FIELD -{" "}
            {import.meta.env.VITE_GET_MAP_FIELD}
          </p>
          <p>
            postSetMapField() - VITE_POST_MAP_FIELD -{" "}
            {import.meta.env.VITE_POST_MAP_FIELD}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof WorkRadius>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Page",
  parameters: {
    msw: {
      handlers: [
        http.get(import.meta.env.VITE_GET_MAP_FIELD, async () => {
          await delay(2000);
          return HttpResponse.json(mockResponseSuccess);
        }),
        http.post(import.meta.env.VITE_POST_MAP_FIELD, async () => {
          await delay(2000);
          return HttpResponse.json({});
        }),
      ],
    },
    reactRouter: reactRouterParameters({
      routing: {
        path: "/profile/my-profile/work-radius",
        Component: MenuLayout,
        children: [
          {
            index: true,
            useStoryElement: true,
            loader: async () => {
              const mapData = await getMapField("token");

              const coordinates =
                mapData.result.coordinates !== null
                  ? [
                      Number(mapData.result.coordinates.split(" ")[0]),
                      Number(mapData.result.coordinates.split(" ")[1]),
                    ]
                  : [37.623082, 55.75254];

              return json({
                language: "ru",
                address: mapData.result.mapAddress,
                coordinates,
                radius: mapData.result.mapRadius,
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
