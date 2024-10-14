import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import Documents from "./documents";
import MenuLayout from "~/routes/menuLayout/menuLayout";

import {
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
        </>
      ),
    },
  },
} satisfies Meta<typeof Documents>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Page",
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: "/profile/documents",
        Component: MenuLayout,
        children: [
          {
            index: true,
            useStoryElement: true,
          },
        ],
      },
    }),
  },
};
