import type { StoryObj, Meta } from "@storybook/react";

import { useArgs } from "@storybook/preview-api";
import * as DocBlock from "@storybook/blocks";

import { StyledDateField } from "./StyledDateField";

import schema from "./StyledDateField.schema.json";

/**
 * тип - date
 * <p>Основан на https://mui.com/x/react-date-pickers/date-picker/</p>
 */
const meta = {
  title: "Общие компоненты/Поля ввода/date",
  component: StyledDateField,
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
} satisfies Meta<typeof StyledDateField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "date (базовый вид)",
  args: {
    inputtype: "date",
    name: "date",
    value: null,
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
      <StyledDateField
        inputtype={args.inputtype}
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
  name: "date (ошибка)",
  args: {
    inputtype: "date",
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
      <StyledDateField
        inputtype={args.inputtype}
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

export const PrimaryDateText: Story = {
  name: "date (вспомогательный текст)",
  args: {
    inputtype: "date",
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
      <StyledDateField
        inputtype={args.inputtype}
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

export const PrimaryDateWithLink: Story = {
  name: "date (вспомогательная ссылка)",
  args: {
    inputtype: "date",
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
      <StyledDateField
        inputtype={args.inputtype}
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

export const PrimaryDateLink: Story = {
  name: "date (вспомогательные текст и ссылка)",
  args: {
    inputtype: "date",
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
      <StyledDateField
        inputtype={args.inputtype}
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

export const PrimaryDateLinkError: Story = {
  name: "date (вспомогательные текст и ссылка и ошибка)",
  args: {
    inputtype: "date",
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
      <StyledDateField
        inputtype={args.inputtype}
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

export const PrimaryDateStatus: Story = {
  name: "date (статус поля)",
  args: {
    inputtype: "date",
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
      <StyledDateField
        inputtype={args.inputtype}
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

export const PrimaryDateDisabled: Story = {
  name: "date (отключенное поле)",
  args: {
    inputtype: "date",
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
      <StyledDateField
        inputtype={args.inputtype}
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

export const PrimaryDateValue: Story = {
  name: "date (заполненное поле)",
  args: {
    inputtype: "date",
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
      <StyledDateField
        inputtype={args.inputtype}
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

export const PrimaryDateHeading: Story = {
  name: "date (заголовок)",
  args: {
    inputtype: "date",
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
      <StyledDateField
        inputtype={args.inputtype}
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

export const PrimaryDateDividers: Story = {
  name: "date (разделители)",
  args: {
    inputtype: "date",
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
      <StyledDateField
        inputtype={args.inputtype}
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
