import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { TopNavigation } from "./TopNavigation";

const meta = {
  title: "Общие компоненты/TopNavigation",
  component: TopNavigation,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => (
        <>
          <DocBlock.Title />
          <DocBlock.Description />
          <DocBlock.Canvas />
          <DocBlock.ArgTypes />
          <DocBlock.Stories />
        </>
      ),
    },
  },
} satisfies Meta<typeof TopNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "TopNavigation (базовый вид)",
  args: {
    header: {
      text: "Текст заголовка",
      bold: false,
    },
    // label: "Шаг 1",
    // backAction: () => {},
    // buttonAction: {
    //   text: "+Добавить",
    //   action: () => {},
    // },
  },
};
export const PrimaryBold: Story = {
  name: "TopNavigation (жирный текст)",
  args: {
    header: {
      text: "Текст заголовка",
      bold: true,
    },
    // label: "Шаг 1",
    // backAction: () => {},
    // buttonAction: {
    //   text: "+Добавить",
    //   action: () => {},
    // },
  },
};

export const PrimaryLabel: Story = {
  name: "TopNavigation (лейбл)",
  args: {
    header: {
      text: "Текст заголовка",
      bold: false,
    },
    label: "Лейбл",
    // backAction: () => {},
    // buttonAction: {
    //   text: "+Добавить",
    //   action: () => {},
    // },
  },
};

export const PrimaryBack: Story = {
  name: "TopNavigation (кнопка назад)",
  args: {
    header: {
      text: "Текст заголовка",
      bold: false,
    },
    label: "Лейбл",
    backAction: () => {},
    // buttonAction: {
    //   text: "+Добавить",
    //   action: () => {},
    // },
  },
};

export const PrimaryAction: Story = {
  name: "TopNavigation (кнопка-действие)",
  args: {
    header: {
      text: "Текст заголовка",
      bold: false,
    },
    label: "Лейбл",
    // backAction: () => {},
    buttonAction: {
      text: "Действие",
      action: () => {},
    },
  },
};

export const PrimaryAll: Story = {
  name: "TopNavigation (все элементы)",
  args: {
    header: {
      text: "Текст заголовка",
      bold: false,
    },
    label: "Лейбл",
    backAction: () => {},
    buttonAction: {
      text: "Действие",
      action: () => {},
    },
  },
};
