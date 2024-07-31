import type { StoryObj, Meta } from "@storybook/react";

import { useArgs } from "@storybook/preview-api";
import * as DocBlock from "@storybook/blocks";

import { StyledAutocomplete } from "./StyledAutocomplete";

import schema from "./StyledAutocomplete.schema.json";

/**
 * тип - autocomplete
 * <p>Основан на https://mui.com/material-ui/react-autocomplete/</p>
 */
const meta = {
  title: "Общие компоненты/Поля ввода/autocomplete",
  component: StyledAutocomplete,
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
} satisfies Meta<typeof StyledAutocomplete>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "autocomplete (базовый вид)",
  args: {
    inputType: "autocomplete",
    name: "autocomplete",
    value: "",
    placeholder: "Выберете пункт",
    onChange: () => {},
    onImmediateChange: () => {},
    options: [
      {
        value: "first",
        label: "Первый",
        disabled: false,
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

    function onChange(value: string) {
      updateArgs({ value });
    }

    return (
      <StyledAutocomplete
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
  name: "autocomplete (отключенный)",
  args: {
    inputType: "autocomplete",
    name: "select",
    value: "",
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

    function onChange(value: string) {
      updateArgs({ value });
    }

    return (
      <StyledAutocomplete
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
  name: "autocomplete (с заголовком)",
  args: {
    inputType: "autocomplete",
    name: "select",
    value: "",
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

    function onChange(value: string) {
      updateArgs({ value });
    }

    return (
      <StyledAutocomplete
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
  name: "autocomplete (ошибка)",
  args: {
    inputType: "autocomplete",
    name: "select",
    value: "",
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

    function onChange(value: string) {
      updateArgs({ value });
    }

    return (
      <StyledAutocomplete
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
  name: "autocomplete (статус)",
  args: {
    inputType: "autocomplete",
    name: "select",
    value: "",
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

    function onChange(value: string) {
      updateArgs({ value });
    }

    return (
      <StyledAutocomplete
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
  name: "autocomplete (вспомогательная информация)",
  args: {
    inputType: "autocomplete",
    name: "select",
    value: "",
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

    function onChange(value: string) {
      updateArgs({ value });
    }

    return (
      <StyledAutocomplete
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
  name: "autocomplete (разделители)",
  args: {
    inputType: "autocomplete",
    name: "select",
    value: "",
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

    function onChange(value: string) {
      updateArgs({ value });
    }

    return (
      <StyledAutocomplete
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
