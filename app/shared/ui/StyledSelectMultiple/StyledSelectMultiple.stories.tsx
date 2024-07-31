import type { StoryObj, Meta } from "@storybook/react";

import { useArgs } from "@storybook/preview-api";
import * as DocBlock from "@storybook/blocks";

import { StyledSelectMultiple } from "./StyledSelectMultiple";

import schema from "./StyledSelectMultiple.schema.json";

/**
 * тип - selectMultiple
 * <p>Основан на https://mui.com/material-ui/react-select/</p>
 */
const meta = {
  title: "Общие компоненты/Поля ввода/selectMultiple",
  component: StyledSelectMultiple,
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
} satisfies Meta<typeof StyledSelectMultiple>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "selectMultiple (базовый вид)",
  args: {
    inputType: "selectMultiple",
    name: "select",
    value: [],
    placeholder: "Выберете пункт",
    onChange: () => {},
    onImmediateChange: () => {},
    options: [
      {
        value: "first",
        label: "Первый",
        disabled: true,
      },
      {
        value: "second",
        label: "Второй",
        disabled: false,
      },
      {
        value: "third",
        label: "Третий",
        disabled: false,
      },
      {
        value: "fourth",
        label: "Четвёртый",
        disabled: false,
      },
      {
        value: "fifth",
        label: "Пятый",
        disabled: false,
      },
    ],

    // heading: "This is header",
    // dividerTop: true,
    // dividerBottom: true,
    // error: "Ошибка!",
    // status: "warning",
    // helperInfo: {
    //   text: "Вспомогательный текст и",
    //   link: {
    //     type: "external",
    //     path: "https://www.google.com/",
    //     text: "ссылка",
    //   },
    // },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(evt: string[]) {
      updateArgs({ value: evt });
    }

    return (
      <StyledSelectMultiple
        inputType={args.inputType}
        name={args.name}
        value={args.value}
        placeholder={args.placeholder}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        options={args.options}
        error={args.error}
        helperInfo={args.helperInfo}
        status={args.status}
        heading={args.heading}
        dividerTop={args.dividerTop}
        dividerBottom={args.dividerBottom}
      />
    );
  },
};

export const PrimaryDisabled: Story = {
  name: "selectMultiple (отключенный)",
  args: {
    inputType: "selectMultiple",
    name: "select",
    value: [],
    placeholder: "Выберете пункт",
    onChange: () => {},
    onImmediateChange: () => {},
    options: [
      {
        value: "first",
        label: "Первый",
        disabled: true,
      },
      {
        value: "second",
        label: "Второй",
        disabled: false,
      },
      {
        value: "third",
        label: "Третий",
        disabled: false,
      },
      {
        value: "fourth",
        label: "Четвёртый",
        disabled: false,
      },
      {
        value: "fifth",
        label: "Пятый",
        disabled: false,
      },
    ],
    disabled: true,
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(evt: string[]) {
      updateArgs({ value: evt });
    }

    return (
      <StyledSelectMultiple
        inputType={args.inputType}
        name={args.name}
        value={args.value}
        placeholder={args.placeholder}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        options={args.options}
        disabled={args.disabled}
      />
    );
  },
};

export const PrimaryHeading: Story = {
  name: "selectMultiple (с заголовком)",
  args: {
    inputType: "selectMultiple",
    name: "select",
    value: [],
    placeholder: "Выберете пункт",
    onChange: () => {},
    onImmediateChange: () => {},
    options: [
      {
        value: "first",
        label: "Первый",
        disabled: true,
      },
      {
        value: "second",
        label: "Второй",
        disabled: false,
      },
      {
        value: "third",
        label: "Третий",
        disabled: false,
      },
      {
        value: "fourth",
        label: "Четвёртый",
        disabled: false,
      },
      {
        value: "fifth",
        label: "Пятый",
        disabled: false,
      },
    ],
    heading: "Заголовок",
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(evt: string[]) {
      updateArgs({ value: evt });
    }

    return (
      <StyledSelectMultiple
        inputType={args.inputType}
        name={args.name}
        value={args.value}
        placeholder={args.placeholder}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        options={args.options}
        heading={args.heading}
      />
    );
  },
};

export const PrimaryError: Story = {
  name: "selectMultiple (ошибка)",
  args: {
    inputType: "selectMultiple",
    name: "select",
    value: [],
    placeholder: "Выберете пункт",
    onChange: () => {},
    onImmediateChange: () => {},
    options: [
      {
        value: "first",
        label: "Первый",
        disabled: true,
      },
      {
        value: "second",
        label: "Второй",
        disabled: false,
      },
      {
        value: "third",
        label: "Третий",
        disabled: false,
      },
      {
        value: "fourth",
        label: "Четвёртый",
        disabled: false,
      },
      {
        value: "fifth",
        label: "Пятый",
        disabled: false,
      },
    ],
    error: "Ошибка!",
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(evt: string[]) {
      updateArgs({ value: evt });
    }

    return (
      <StyledSelectMultiple
        inputType={args.inputType}
        name={args.name}
        value={args.value}
        placeholder={args.placeholder}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        options={args.options}
        error={args.error}
      />
    );
  },
};

export const PrimaryStatus: Story = {
  name: "selectMultiple (статус)",
  args: {
    inputType: "selectMultiple",
    name: "select",
    value: [],
    placeholder: "Выберете пункт",
    onChange: () => {},
    onImmediateChange: () => {},
    options: [
      {
        value: "first",
        label: "Первый",
        disabled: true,
      },
      {
        value: "second",
        label: "Второй",
        disabled: false,
      },
      {
        value: "third",
        label: "Третий",
        disabled: false,
      },
      {
        value: "fourth",
        label: "Четвёртый",
        disabled: false,
      },
      {
        value: "fifth",
        label: "Пятый",
        disabled: false,
      },
    ],
    status: "warning",
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(evt: string[]) {
      updateArgs({ value: evt });
    }

    return (
      <StyledSelectMultiple
        inputType={args.inputType}
        name={args.name}
        value={args.value}
        placeholder={args.placeholder}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        options={args.options}
        status={args.status}
      />
    );
  },
};

export const PrimaryHelper: Story = {
  name: "selectMultiple (вспомогательная информация)",
  args: {
    inputType: "selectMultiple",
    name: "select",
    value: [],
    placeholder: "Выберете пункт",
    onChange: () => {},
    onImmediateChange: () => {},
    options: [
      {
        value: "first",
        label: "Первый",
        disabled: true,
      },
      {
        value: "second",
        label: "Второй",
        disabled: false,
      },
      {
        value: "third",
        label: "Третий",
        disabled: false,
      },
      {
        value: "fourth",
        label: "Четвёртый",
        disabled: false,
      },
      {
        value: "fifth",
        label: "Пятый",
        disabled: false,
      },
    ],
    helperInfo: {
      text: "Вспомогательный текст и",
      link: {
        type: "external",
        path: "https://www.google.com/",
        text: "ссылка",
      },
    },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(evt: string[]) {
      updateArgs({ value: evt });
    }

    return (
      <StyledSelectMultiple
        inputType={args.inputType}
        name={args.name}
        value={args.value}
        placeholder={args.placeholder}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        options={args.options}
        helperInfo={args.helperInfo}
      />
    );
  },
};

export const PrimaryDividers: Story = {
  name: "selectMultiple (разделители)",
  args: {
    inputType: "selectMultiple",
    name: "select",
    value: [],
    placeholder: "Выберете пункт",
    onChange: () => {},
    onImmediateChange: () => {},
    options: [
      {
        value: "first",
        label: "Первый",
        disabled: true,
      },
      {
        value: "second",
        label: "Второй",
        disabled: false,
      },
      {
        value: "third",
        label: "Третий",
        disabled: false,
      },
      {
        value: "fourth",
        label: "Четвёртый",
        disabled: false,
      },
      {
        value: "fifth",
        label: "Пятый",
        disabled: false,
      },
    ],
    dividerTop: true,
    dividerBottom: true,
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(evt: string[]) {
      updateArgs({ value: evt });
    }

    return (
      <StyledSelectMultiple
        inputType={args.inputType}
        name={args.name}
        value={args.value}
        placeholder={args.placeholder}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        options={args.options}
        dividerTop={args.dividerTop}
        dividerBottom={args.dividerBottom}
      />
    );
  },
};
