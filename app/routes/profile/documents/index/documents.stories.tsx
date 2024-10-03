import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import Documents from "./documents";
import MenuLayout from "~/routes/menuLayout/menuLayout";

import {
  reactRouterNestedAncestors,
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";

const meta = {
  title: "Страницы/Внутренние/Профиль/Документы",
  component: Documents,
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
          <h2>Адрес страницы: /profile/documents</h2>
          {/* <h3>Используемые запросы:</h3>
          <p>
            getUserInfo() - VITE_GET_USER_INFO -{" "}
            {import.meta.env.VITE_GET_USER_INFO}
          </p> */}
        </>
      ),
    },
  },
} satisfies Meta<typeof Documents>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Страница",
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterNestedAncestors({
        path: "/profile/documents",
        element: <MenuLayout />,
      }),
    }),
  },
};
