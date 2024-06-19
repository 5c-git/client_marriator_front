import type { StoryObj, Meta } from "@storybook/react";

import { useArgs } from "@storybook/preview-api";
import * as DocBlock from "@storybook/blocks";

import { SelectChangeEvent } from "@mui/material";
import { StyledSelect } from "./StyledSelect";

import schema from "./StyledSelect.schema.json";

/**
 * тип - select
 * <p>Основан на https://mui.com/material-ui/react-select/</p>
 */
const meta = {
  title: "Общие компоненты/Поля ввода/select",
  component: StyledSelect,
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
} satisfies Meta<typeof StyledSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "select (базовый вид)",
  args: {
    inputType: "select",
    name: "select",
    value: "",
    placeholder: "Выберете пункт",
    onChange: () => {},
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

    function onChange(evt: SelectChangeEvent) {
      updateArgs({ value: evt.target.value });
    }

    return (
      <StyledSelect
        inputType="select"
        name={args.name}
        value={args.value}
        placeholder={args.placeholder}
        onChange={onChange}
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
  name: "select (отключенный)",
  args: {
    inputType: "select",
    name: "select",
    value: "",
    placeholder: "Выберете пункт",
    onChange: () => {},
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

    function onChange(evt: SelectChangeEvent) {
      updateArgs({ value: evt.target.value });
    }

    return (
      <StyledSelect
        inputType="select"
        name={args.name}
        value={args.value}
        placeholder={args.placeholder}
        onChange={onChange}
        options={args.options}
        disabled={args.disabled}
      />
    );
  },
};

export const PrimaryHeading: Story = {
  name: "select (с заголовком)",
  args: {
    inputType: "select",
    name: "select",
    value: "",
    placeholder: "Выберете пункт",
    onChange: () => {},
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

    function onChange(evt: SelectChangeEvent) {
      updateArgs({ value: evt.target.value });
    }

    return (
      <StyledSelect
        inputType="select"
        name={args.name}
        value={args.value}
        placeholder={args.placeholder}
        onChange={onChange}
        options={args.options}
        heading={args.heading}
      />
    );
  },
};

export const PrimaryError: Story = {
  name: "select (ошибка)",
  args: {
    inputType: "select",
    name: "select",
    value: "",
    placeholder: "Выберете пункт",
    onChange: () => {},
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

    function onChange(evt: SelectChangeEvent) {
      updateArgs({ value: evt.target.value });
    }

    return (
      <StyledSelect
        inputType="select"
        name={args.name}
        value={args.value}
        placeholder={args.placeholder}
        onChange={onChange}
        options={args.options}
        error={args.error}
      />
    );
  },
};

export const PrimaryStatus: Story = {
  name: "select (статус)",
  args: {
    inputType: "select",
    name: "select",
    value: "",
    placeholder: "Выберете пункт",
    onChange: () => {},
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

    function onChange(evt: SelectChangeEvent) {
      updateArgs({ value: evt.target.value });
    }

    return (
      <StyledSelect
        inputType="select"
        name={args.name}
        value={args.value}
        placeholder={args.placeholder}
        onChange={onChange}
        options={args.options}
        status={args.status}
      />
    );
  },
};

export const PrimaryHelper: Story = {
  name: "select (вспомогательная информация)",
  args: {
    inputType: "select",
    name: "select",
    value: "",
    placeholder: "Выберете пункт",
    onChange: () => {},
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

    function onChange(evt: SelectChangeEvent) {
      updateArgs({ value: evt.target.value });
    }

    return (
      <StyledSelect
        inputType="select"
        name={args.name}
        value={args.value}
        placeholder={args.placeholder}
        onChange={onChange}
        options={args.options}
        helperInfo={args.helperInfo}
      />
    );
  },
};

export const PrimaryDividers: Story = {
  name: "select (разделители)",
  args: {
    inputType: "select",
    name: "select",
    value: "",
    placeholder: "Выберете пункт",
    onChange: () => {},
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

    function onChange(evt: SelectChangeEvent) {
      updateArgs({ value: evt.target.value });
    }

    return (
      <StyledSelect
        inputType="select"
        name={args.name}
        value={args.value}
        placeholder={args.placeholder}
        onChange={onChange}
        options={args.options}
        dividerTop={args.dividerTop}
        dividerBottom={args.dividerBottom}
      />
    );
  },
};
