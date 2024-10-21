import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { StyledChip } from "./StyledChip";

const meta = {
  title: "Общие компоненты/StyledChip",
  component: StyledChip,
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
} satisfies Meta<typeof StyledChip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "StyledChip (базовый вид)",
  args: {
    onClick: () => {},
    label: "Текст",
    count: 17,
    statusColor: "rgba(26, 182, 84, 1)",
    isActive: false,
  },
};

export const PrimaryActive: Story = {
  name: "StyledChip (активный)",
  args: {
    onClick: () => {},
    label: "Текст",
    count: 17,
    statusColor: "rgba(26, 182, 84, 1)",
    isActive: true,
  },
};
