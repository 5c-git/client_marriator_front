import type { StoryObj, Meta } from "@storybook/react";

import { useArgs } from "@storybook/preview-api";
import * as DocBlock from "@storybook/blocks";

import { StyledRadioButton } from "./StyledRadioButton";

import schema from "./StyledRadioButton.schema.json";

/**
 * тип - radio
 * <p>Основан на https://mui.com/material-ui/react-checkbox/</p>
 */
const meta = {
  title: "Общие компоненты/Поля ввода/radio",
  component: StyledRadioButton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => (
        <>
          <DocBlock.Title />
          <DocBlock.Description />
          <h2>JSON Schema</h2>
          <DocBlock.Source
            language="json"
            code={JSON.stringify(schema, null, 2)}
          />
          <DocBlock.Canvas />
          <DocBlock.ArgTypes />
          <DocBlock.Stories />
        </>
      ),
    },
  },
} satisfies Meta<typeof StyledRadioButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "radio (Базовый)",
  args: {
    inputType: "radio",
    value: "",
    name: "radio",
    validation: "none",
    options: [
      {
        value: "winter",
        label: "Зима",
        disabled: false,
      },
      {
        value: "spring",
        label: "Весна",
        disabled: false,
      },
      {
        value: "summer",
        label: "Лето",
        disabled: false,
      },
      {
        value: "authum",
        label: "Осень",
        disabled: false,
      },
    ],
    onChange: () => {},
    // helperInfo: {
    //   text: "Текст и ",
    //   link: {
    //     type: "external",
    //     path: "https://www.google.com/",
    //     text: "cсылка",
    //   },
    // },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <StyledRadioButton
        inputType="radio"
        validation={args.validation}
        value={args.value}
        name={args.name}
        options={args.options}
        status={args.status}
        onChange={(evt) => {
          updateArgs({ value: evt.target.value });
        }}
        heading={args.heading}
        error={args.error}
        helperInfo={args.helperInfo}
      />
    );
  },
};

export const PrimarySelected: Story = {
  name: "radio (выбранный)",
  args: {
    inputType: "radio",
    value: "spring",
    name: "radio",
    validation: "none",
    // status: "warning",
    // error: "Ошибка!",
    // dividerBottom: true,
    // heading: "Заголовок раздела с радиокнопками",
    options: [
      {
        value: "winter",
        label: "Зима",
        disabled: false,
      },
      {
        value: "spring",
        label: "Весна",
        disabled: false,
      },
      {
        value: "summer",
        label: "Лето",
        disabled: false,
      },
      {
        value: "authum",
        label: "Осень",
        disabled: false,
      },
    ],
    onChange: () => {},
    // helperInfo: {
    //   text: "Текст",
    // },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <StyledRadioButton
        inputType="radio"
        value={args.value}
        validation={args.validation}
        name={args.name}
        options={args.options}
        status={args.status}
        onChange={(evt) => {
          updateArgs({ value: evt.target.value });
        }}
        heading={args.heading}
        error={args.error}
        helperInfo={args.helperInfo}
      />
    );
  },
};

export const PrimaryIcon: Story = {
  name: "radio (иконки)",
  args: {
    inputType: "radio",
    value: "spring",
    name: "radio",
    validation: "none",
    // status: "warning",
    // error: "Ошибка!",
    // dividerBottom: true,
    // heading: "Заголовок раздела с радиокнопками",
    options: [
      {
        value: "winter",
        label: "Зима",
        icon: "whatsapp",
        disabled: false,
      },
      {
        value: "spring",
        label: "Весна",
        icon: "telegram",
        disabled: false,
      },
      {
        value: "summer",
        label: "Лето",
        icon: "viber",
        disabled: false,
      },
      {
        value: "authum",
        label: "Осень",
        disabled: false,
      },
    ],
    onChange: () => {},
    // helperInfo: {
    //   text: "Текст",
    // },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <StyledRadioButton
        inputType="radio"
        value={args.value}
        validation={args.validation}
        name={args.name}
        options={args.options}
        status={args.status}
        onChange={(evt) => {
          updateArgs({ value: evt.target.value });
        }}
        heading={args.heading}
        error={args.error}
        helperInfo={args.helperInfo}
      />
    );
  },
};

export const PrimaryStatus: Story = {
  name: "radio (статус)",
  args: {
    inputType: "radio",
    value: "",
    name: "radio",
    status: "warning",
    validation: "none",
    // error: "Ошибка!",
    // dividerBottom: true,
    // heading: "Заголовок раздела с радиокнопками",
    options: [
      {
        value: "winter",
        label: "Зима",
        disabled: false,
      },
      {
        value: "spring",
        label: "Весна",
        disabled: false,
      },
      {
        value: "summer",
        label: "Лето",
        disabled: false,
      },
      {
        value: "authum",
        label: "Осень",
        disabled: false,
      },
    ],
    onChange: () => {},
    // helperInfo: {
    //   text: "Текст",
    // },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <StyledRadioButton
        inputType="radio"
        value={args.value}
        name={args.name}
        validation={args.validation}
        options={args.options}
        status={args.status}
        onChange={(evt) => {
          updateArgs({ value: evt.target.value });
        }}
        heading={args.heading}
        error={args.error}
        helperInfo={args.helperInfo}
      />
    );
  },
};

export const PrimaryError: Story = {
  name: "radio (ошибка)",
  args: {
    inputType: "radio",
    value: "",
    name: "radio",
    // status: "warning",
    error: "Ошибка!",
    validation: "none",
    // dividerBottom: true,
    // heading: "Заголовок раздела с радиокнопками",
    options: [
      {
        value: "winter",
        label: "Зима",
        disabled: false,
      },
      {
        value: "spring",
        label: "Весна",
        disabled: false,
      },
      {
        value: "summer",
        label: "Лето",
        disabled: false,
      },
      {
        value: "authum",
        label: "Осень",
        disabled: false,
      },
    ],
    onChange: () => {},
    // helperInfo: {
    //   text: "Текст",
    // },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <StyledRadioButton
        inputType="radio"
        value={args.value}
        name={args.name}
        validation={args.validation}
        options={args.options}
        status={args.status}
        onChange={(evt) => {
          updateArgs({ value: evt.target.value });
        }}
        heading={args.heading}
        error={args.error}
        helperInfo={args.helperInfo}
      />
    );
  },
};

export const PrimaryDisabled: Story = {
  name: "radio (отключенный)",
  args: {
    inputType: "radio",
    value: "",
    name: "radio",
    validation: "none",
    // status: "warning",
    // error: "Ошибка!",
    // dividerBottom: true,
    // heading: "Заголовок раздела с радиокнопками",
    options: [
      {
        value: "winter",
        label: "Зима",
        disabled: true,
      },
      {
        value: "spring",
        label: "Весна",
        disabled: true,
      },
      {
        value: "summer",
        label: "Лето",
        disabled: true,
      },
      {
        value: "authum",
        label: "Осень",
        disabled: true,
      },
    ],
    onChange: () => {},
    // helperInfo: {
    //   text: "Текст",
    // },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <StyledRadioButton
        inputType="radio"
        value={args.value}
        name={args.name}
        validation={args.validation}
        options={args.options}
        status={args.status}
        onChange={(evt) => {
          updateArgs({ value: evt.target.value });
        }}
        heading={args.heading}
        error={args.error}
        helperInfo={args.helperInfo}
      />
    );
  },
};

export const PrimaryHeading: Story = {
  name: "radio (заголовок)",
  args: {
    inputType: "radio",
    value: "",
    name: "radio",
    validation: "none",
    // status: "warning",
    // error: "Ошибка!",
    // dividerBottom: true,
    heading: "Заголовок раздела с радиокнопками",
    options: [
      {
        value: "winter",
        label: "Зима",
        disabled: false,
      },
      {
        value: "spring",
        label: "Весна",
        disabled: false,
      },
      {
        value: "summer",
        label: "Лето",
        disabled: false,
      },
      {
        value: "authum",
        label: "Осень",
        disabled: false,
      },
    ],
    onChange: () => {},
    // helperInfo: {
    //   text: "Текст",
    // },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <StyledRadioButton
        inputType="radio"
        value={args.value}
        name={args.name}
        validation={args.validation}
        options={args.options}
        status={args.status}
        onChange={(evt) => {
          updateArgs({ value: evt.target.value });
        }}
        heading={args.heading}
        error={args.error}
        helperInfo={args.helperInfo}
      />
    );
  },
};

export const PrimaryHeadingError: Story = {
  name: "radio (заголовок c ошибкой)",
  args: {
    inputType: "radio",
    value: "",
    name: "radio",
    // status: "warning",
    error: "Ошибка!",
    validation: "none",
    // dividerBottom: true,
    heading: "Заголовок раздела с радиокнопками",
    options: [
      {
        value: "winter",
        label: "Зима",
        disabled: false,
      },
      {
        value: "spring",
        label: "Весна",
        disabled: false,
      },
      {
        value: "summer",
        label: "Лето",
        disabled: false,
      },
      {
        value: "authum",
        label: "Осень",
        disabled: false,
      },
    ],
    onChange: () => {},
    // helperInfo: {
    //   text: "Текст",
    // },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <StyledRadioButton
        inputType="radio"
        value={args.value}
        name={args.name}
        validation={args.validation}
        options={args.options}
        status={args.status}
        onChange={(evt) => {
          updateArgs({ value: evt.target.value });
        }}
        heading={args.heading}
        error={args.error}
        helperInfo={args.helperInfo}
      />
    );
  },
};

export const PrimaryHelpingText: Story = {
  name: "radio (вспомогательный текст)",
  args: {
    inputType: "radio",
    value: "",
    name: "radio",
    validation: "none",
    // status: "warning",
    // error: "Ошибка!",
    // dividerBottom: true,
    // heading: "Заголовок раздела с радиокнопками",
    options: [
      {
        value: "winter",
        label: "Зима",
        disabled: false,
      },
      {
        value: "spring",
        label: "Весна",
        disabled: false,
      },
      {
        value: "summer",
        label: "Лето",
        disabled: false,
      },
      {
        value: "authum",
        label: "Осень",
        disabled: false,
      },
    ],
    onChange: () => {},
    helperInfo: {
      text: "Текст",
    },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <StyledRadioButton
        inputType="radio"
        value={args.value}
        name={args.name}
        validation={args.validation}
        options={args.options}
        status={args.status}
        onChange={(evt) => {
          updateArgs({ value: evt.target.value });
        }}
        heading={args.heading}
        error={args.error}
        helperInfo={args.helperInfo}
      />
    );
  },
};

export const PrimaryHelpingTextLink: Story = {
  name: "radio (вспомогательный текст и ссылка)",
  args: {
    inputType: "radio",
    value: "",
    name: "radio",
    validation: "none",
    // status: "warning",
    // error: "Ошибка!",
    // dividerBottom: true,
    // heading: "Заголовок раздела с радиокнопками",
    options: [
      {
        value: "winter",
        label: "Зима",
        disabled: false,
      },
      {
        value: "spring",
        label: "Весна",
        disabled: false,
      },
      {
        value: "summer",
        label: "Лето",
        disabled: false,
      },
      {
        value: "authum",
        label: "Осень",
        disabled: false,
      },
    ],
    onChange: () => {},
    helperInfo: {
      text: "Текст и ",
      link: {
        type: "external",
        path: "https://www.google.com/",
        text: "cсылка",
      },
    },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <StyledRadioButton
        inputType="radio"
        value={args.value}
        name={args.name}
        validation={args.validation}
        options={args.options}
        status={args.status}
        onChange={(evt) => {
          updateArgs({ value: evt.target.value });
        }}
        heading={args.heading}
        error={args.error}
        helperInfo={args.helperInfo}
      />
    );
  },
};

export const PrimaryDivider: Story = {
  name: "radio (разделители)",
  args: {
    inputType: "radio",
    value: "",
    name: "radio",
    validation: "none",
    // status: "warning",
    // error: "Ошибка!",
    // dividerBottom: true,
    // heading: "Заголовок раздела с радиокнопками",
    options: [
      {
        value: "winter",
        label: "Зима",
        disabled: false,
      },
      {
        value: "spring",
        label: "Весна",
        disabled: false,
      },
      {
        value: "summer",
        label: "Лето",
        disabled: false,
      },
      {
        value: "authum",
        label: "Осень",
        disabled: false,
      },
    ],
    onChange: () => {},
    dividerTop: true,
    dividerBottom: true,
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <StyledRadioButton
        inputType="radio"
        value={args.value}
        name={args.name}
        validation={args.validation}
        options={args.options}
        status={args.status}
        onChange={(evt) => {
          updateArgs({ value: evt.target.value });
        }}
        heading={args.heading}
        error={args.error}
        helperInfo={args.helperInfo}
        dividerTop={args.dividerTop}
        dividerBottom={args.dividerBottom}
      />
    );
  },
};
