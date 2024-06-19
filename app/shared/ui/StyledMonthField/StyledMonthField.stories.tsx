import type { StoryObj, Meta } from "@storybook/react";

import { useArgs } from "@storybook/preview-api";
import * as DocBlock from "@storybook/blocks";

import { StyledMonthField } from "./StyledMonthField";

import schema from "./StyledMonthField.schema.json";

/**
 * тип - month
 * <p>Основан на https://mui.com/x/react-date-pickers/date-picker/</p>
 */
const meta = {
  title: "Общие компоненты/Поля ввода/month",
  component: StyledMonthField,
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
} satisfies Meta<typeof StyledMonthField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "month (базовый вид)",
  args: {
    inputType: "month",
    name: "month",
    value: null,
    placeholder: "Срок окончания действия карты",
    validation: "none",
    onChange: () => {},
    onImmediateChange: () => {},
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(newValue: string) {
      updateArgs({ value: newValue });
    }

    return (
      <StyledMonthField
        inputType={args.inputType}
        name={args.name}
        placeholder={args.placeholder}
        value={args.value}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        validation={args.validation}
        status={args.status}
        error={args.error}
      />
    );
  },
};

export const PrimaryDateError: Story = {
  name: "month (ошибка)",
  args: {
    inputType: "month",
    name: "phone",
    value: "2024-04-27",
    placeholder: "Введите дату",
    error: "Ошибка!",
    validation: "none",
    onChange: () => {},
    onImmediateChange: () => {},
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(newValue: string) {
      updateArgs({ value: newValue });
    }

    return (
      <StyledMonthField
        inputType={args.inputType}
        name={args.name}
        placeholder={args.placeholder}
        value={args.value}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        error={args.error}
        validation={args.validation}
      />
    );
  },
};

export const PrimaryMonthText: Story = {
  name: "month (вспомогательный текст)",
  args: {
    inputType: "month",
    name: "text",
    value: null,
    placeholder: "Номер телефона",
    onChange: () => {},
    onImmediateChange: () => {},
    validation: "none",
    helperInfo: {
      text: "Вспомогательный текст",
    },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(newValue: string) {
      updateArgs({ value: newValue });
    }

    return (
      <StyledMonthField
        inputType={args.inputType}
        name={args.name}
        placeholder={args.placeholder}
        value={args.value}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        helperInfo={args.helperInfo}
        validation={args.validation}
      />
    );
  },
};

export const PrimaryMonhWithLink: Story = {
  name: "month (вспомогательная ссылка)",
  args: {
    inputType: "month",
    name: "text",
    value: null,
    placeholder: "Введите дату",
    onChange: () => {},
    onImmediateChange: () => {},
    validation: "none",
    helperInfo: {
      link: {
        type: "external",
        path: "https://www.google.com/",
        text: "Ссылка",
      },
    },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(newValue: string) {
      updateArgs({ value: newValue });
    }

    return (
      <StyledMonthField
        inputType={args.inputType}
        name={args.name}
        placeholder={args.placeholder}
        value={args.value}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        helperInfo={args.helperInfo}
        validation={args.validation}
      />
    );
  },
};

export const PrimaryMonthLink: Story = {
  name: "month (вспомогательные текст и ссылка)",
  args: {
    inputType: "month",
    name: "text",
    value: null,
    placeholder: "Введите дату",
    onChange: () => {},
    onImmediateChange: () => {},
    validation: "none",
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

    function onChange(newValue: string) {
      updateArgs({ value: newValue });
    }

    return (
      <StyledMonthField
        inputType={args.inputType}
        name={args.name}
        placeholder={args.placeholder}
        value={args.value}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        helperInfo={args.helperInfo}
        validation={args.validation}
      />
    );
  },
};

export const PrimaryMonthLinkError: Story = {
  name: "month (вспомогательные текст и ссылка и ошибка)",
  args: {
    inputType: "month",
    name: "text",
    value: null,
    placeholder: "Введите дату",
    onChange: () => {},
    onImmediateChange: () => {},
    error: "Ошибка!",
    validation: "none",
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

    function onChange(newValue: string) {
      updateArgs({ value: newValue });
    }

    return (
      <StyledMonthField
        inputType={args.inputType}
        name={args.name}
        placeholder={args.placeholder}
        value={args.value}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        error={args.error}
        helperInfo={args.helperInfo}
        validation={args.validation}
      />
    );
  },
};

export const PrimaryMonthStatus: Story = {
  name: "month (статус поля)",
  args: {
    inputType: "month",
    name: "text",
    value: null,
    placeholder: "Введите дату",
    onChange: () => {},
    onImmediateChange: () => {},
    validation: "none",
    status: "warning",
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(newValue: string) {
      updateArgs({ value: newValue });
    }

    return (
      <StyledMonthField
        inputType={args.inputType}
        name={args.name}
        placeholder={args.placeholder}
        value={args.value}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        status={args.status}
        validation={args.validation}
      />
    );
  },
};

export const PrimaryMonthDisabled: Story = {
  name: "month (отключенное поле)",
  args: {
    inputType: "month",
    name: "text",
    value: null,
    placeholder: "Введите дату",
    onChange: () => {},
    onImmediateChange: () => {},
    validation: "none",
    disabled: true,
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(newValue: string) {
      updateArgs({ value: newValue });
    }

    return (
      <StyledMonthField
        inputType={args.inputType}
        name={args.name}
        placeholder={args.placeholder}
        value={args.value}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        disabled={args.disabled}
        validation={args.validation}
      />
    );
  },
};

export const PrimaryMonthValue: Story = {
  name: "month (заполненное поле)",
  args: {
    inputType: "month",
    name: "text",
    value: "2024-04-27",
    placeholder: "Введите дату",
    validation: "none",
    onChange: () => {},
    onImmediateChange: () => {},
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(newValue: string) {
      updateArgs({ value: newValue });
    }

    return (
      <StyledMonthField
        inputType={args.inputType}
        name={args.name}
        placeholder={args.placeholder}
        value={args.value}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        validation={args.validation}
      />
    );
  },
};

export const PrimaryMonthHeading: Story = {
  name: "month (заголовок)",
  args: {
    inputType: "month",
    name: "text",
    value: null,
    placeholder: "Введите дату",
    validation: "none",
    onChange: () => {},
    onImmediateChange: () => {},
    heading: "Заголовок поля",
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(newValue: string) {
      updateArgs({ value: newValue });
    }

    return (
      <StyledMonthField
        inputType={args.inputType}
        name={args.name}
        placeholder={args.placeholder}
        value={args.value}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        heading={args.heading}
        validation={args.validation}
      />
    );
  },
};

export const PrimaryMonthDividers: Story = {
  name: "month (разделители)",
  args: {
    inputType: "month",
    name: "text",
    value: null,
    placeholder: "Введите дату",
    validation: "none",
    onChange: () => {},
    onImmediateChange: () => {},
    dividerTop: true,
    dividerBottom: true,
    inputStyles: {
      marginLeft: "16px",
    },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(newValue: string) {
      updateArgs({ value: newValue });
    }

    return (
      <StyledMonthField
        inputType={args.inputType}
        name={args.name}
        placeholder={args.placeholder}
        value={args.value}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        validation={args.validation}
        dividerTop={args.dividerTop}
        dividerBottom={args.dividerBottom}
        inputStyles={args.inputStyles}
      />
    );
  },
};
