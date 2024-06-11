import type { StoryObj, Meta } from "@storybook/react";

import { StyledOptField } from "./StyledOtpField";

/**
 * <p>Поле для ввода одноразовых паролей</p>
 * <p>Основана на https://github.com/guilhermerodz/input-otp</p>
 */
const meta = {
  title: "Общие компоненты/Поля ввода/otp",
  component: StyledOptField,
  tags: ["autodocs"],
} satisfies Meta<typeof StyledOptField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "otp",
  args: {
    onComplete: (value: string) => {
      alert(`Вы ввели код ${value}`);
    },
  },
};

export const PrimaryFilled: Story = {
  name: "otp (заполненное)",
  args: {
    value: "00000",
    onComplete: (value: string) => {
      alert(`Вы ввели код ${value}`);
    },
  },
};

export const PrimaryError: Story = {
  name: "otp (ошибка)",
  args: {
    onComplete: (value: string) => {
      alert(`Вы ввели код ${value}`);
    },
    error: true,
  },
};

export const PrimaryDisabled: Story = {
  name: "otp (отключенное)",
  args: {
    onComplete: (value: string) => {
      alert(`Вы ввели код ${value}`);
    },
    disabled: true,
  },
};

export const PrimaryErroDisabled: Story = {
  name: "otp (отключенное c ошибкой)",
  args: {
    onComplete: (value: string) => {
      alert(`Вы ввели код ${value}`);
    },
    error: true,
    disabled: true,
  },
};
