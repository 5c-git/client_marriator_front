import type { StoryObj, Meta } from "@storybook/react";

import { useArgs } from "@storybook/preview-api";
import * as DocBlock from "@storybook/blocks";

import { StyledAccountField } from "./StyledAccountField";

import schema from "./StyledAccountField.schema.json";

/**
 * тип - account
 * <p>Основан на https://mui.com/material-ui/react-text-field/</p>
 */
const meta = {
  title: "Общие компоненты/Поля ввода/account",
  component: StyledAccountField,
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
} satisfies Meta<typeof StyledAccountField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "account (базовый вид)",
  args: {
    inputType: "account",
    name: "text",
    value: "",
    placeholder: "Лицевой счет",
    validation: "none",
    onChange: () => {},
    onImmediateChange: () => {},
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(evt: string) {
      updateArgs({ value: evt });
    }

    return (
      <StyledAccountField
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

export const PrimaryError: Story = {
  name: "account (ошибка)",
  args: {
    inputType: "account",
    name: "phone",
    value: "",
    placeholder: "Лицевой счет",
    error: "Ошибка!",
    validation: "none",
    onChange: () => {},
    onImmediateChange: () => {},
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(evt: string) {
      updateArgs({ value: evt });
    }

    return (
      <StyledAccountField
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

export const PrimaryAccount: Story = {
  name: "account (вспомогательный текст)",
  args: {
    inputType: "account",
    name: "text",
    value: "",
    placeholder: "Лицевой счет",
    onChange: () => {},
    onImmediateChange: () => {},
    validation: "none",
    helperInfo: {
      text: "Вспомогательный текст",
    },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(evt: string) {
      updateArgs({ value: evt });
    }

    return (
      <StyledAccountField
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

export const PrimaryLink: Story = {
  name: "account (вспомогательная ссылка)",
  args: {
    inputType: "account",
    name: "text",
    value: "",
    placeholder: "Лицевой счет",
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

    function onChange(evt: string) {
      updateArgs({ value: evt });
    }

    return (
      <StyledAccountField
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

export const PrimaryAccountLink: Story = {
  name: "account (вспомогательные текст и ссылка)",
  args: {
    inputType: "account",
    name: "text",
    value: "",
    placeholder: "Лицевой счет",
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

    function onChange(evt: string) {
      updateArgs({ value: evt });
    }

    return (
      <StyledAccountField
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

export const PrimaryAccountLinkError: Story = {
  name: "account (вспомогательные текст и ссылка и ошибка)",
  args: {
    inputType: "account",
    name: "text",
    value: "",
    placeholder: "Лицевой счет",
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

    function onChange(evt: string) {
      updateArgs({ value: evt });
    }

    return (
      <StyledAccountField
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

export const PrimaryAccountStatus: Story = {
  name: "account (статус поля)",
  args: {
    inputType: "account",
    name: "text",
    value: "",
    placeholder: "Лицевой счет",
    onChange: () => {},
    onImmediateChange: () => {},
    validation: "none",
    status: "warning",
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(evt: string) {
      updateArgs({ value: evt });
    }

    return (
      <StyledAccountField
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

export const PrimaryAccountDisabled: Story = {
  name: "account (отключенное поле)",
  args: {
    inputType: "account",
    name: "text",
    value: "",
    placeholder: "Лицевой счет",
    onChange: () => {},
    onImmediateChange: () => {},
    validation: "none",
    disabled: true,
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(evt: string) {
      updateArgs({ value: evt });
    }

    return (
      <StyledAccountField
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

export const PrimaryAccountValue: Story = {
  name: "account (заполненное поле)",
  args: {
    inputType: "account",
    name: "text",
    value: "12345678901234567890",
    placeholder: "Лицевой счет",
    validation: "none",
    onChange: () => {},
    onImmediateChange: () => {},
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(evt: string) {
      updateArgs({ value: evt });
    }

    return (
      <StyledAccountField
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

export const PrimaryAccountheading: Story = {
  name: "account (заголовок)",
  args: {
    inputType: "account",
    name: "text",
    value: "",
    placeholder: "Лицевой счет",
    validation: "none",
    onChange: () => {},
    onImmediateChange: () => {},
    heading: "Заголовок поля",
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(evt: string) {
      updateArgs({ value: evt });
    }

    return (
      <StyledAccountField
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

export const PrimaryDividers: Story = {
  name: "account (разделители)",
  args: {
    inputType: "account",
    name: "text",
    value: "",
    placeholder: "Лицевой счет",
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

    function onChange(evt: string) {
      updateArgs({ value: evt });
    }

    return (
      <StyledAccountField
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
