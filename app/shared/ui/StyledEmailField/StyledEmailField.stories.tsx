import type { StoryObj, Meta } from "@storybook/react";

import { useArgs } from "@storybook/preview-api";
import * as DocBlock from "@storybook/blocks";

import { StyledEmailField } from "./StyledEmailField";

import schema from "./StyledEmailField.schema.json";

/**
 * тип - email
 * <p>Основан на https://mui.com/material-ui/react-text-field/</p>
 */
const meta = {
  title: "Общие компоненты/Поля ввода/email",
  component: StyledEmailField,
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
} satisfies Meta<typeof StyledEmailField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "email (базовый вид)",
  args: {
    inputType: "email",
    name: "text",
    value: "",
    placeholder: "E-mail",
    validation: "none",
    onChange: () => {},
    onImmediateChange: () => {},
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(
      evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
      updateArgs({ value: evt.target.value });
    }

    return (
      <StyledEmailField
        inputType="email"
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
  name: "email (ошибка)",
  args: {
    inputType: "email",
    name: "text",
    value: "",
    placeholder: "E-mail",
    error: "Ошибка!",
    validation: "none",
    onChange: () => {},
    onImmediateChange: () => {},
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(
      evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
      updateArgs({ value: evt.target.value });
    }

    return (
      <StyledEmailField
        inputType="email"
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

export const PrimaryEmail: Story = {
  name: "email (вспомогательный текст)",
  args: {
    inputType: "email",
    name: "text",
    value: "",
    placeholder: "E-mail",
    onChange: () => {},
    onImmediateChange: () => {},
    validation: "none",
    helperInfo: {
      text: "Вспомогательный текст",
    },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(
      evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
      updateArgs({ value: evt.target.value });
    }

    return (
      <StyledEmailField
        inputType="email"
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
  name: "email (вспомогательная ссылка)",
  args: {
    inputType: "email",
    name: "text",
    value: "",
    placeholder: "E-mail",
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

    function onChange(
      evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
      updateArgs({ value: evt.target.value });
    }

    return (
      <StyledEmailField
        inputType="email"
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

export const PrimaryEmailLink: Story = {
  name: "email (вспомогательные текст и ссылка)",
  args: {
    inputType: "email",
    name: "text",
    value: "",
    placeholder: "E-mail",
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

    function onChange(
      evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
      updateArgs({ value: evt.target.value });
    }

    return (
      <StyledEmailField
        inputType="email"
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

export const PrimaryEmailLinkError: Story = {
  name: "email (вспомогательные текст и ссылка и ошибка)",
  args: {
    inputType: "email",
    name: "text",
    value: "",
    placeholder: "E-mail",
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

    function onChange(
      evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
      updateArgs({ value: evt.target.value });
    }

    return (
      <StyledEmailField
        inputType="email"
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

export const PrimaryEmailStatus: Story = {
  name: "email (статус поля)",
  args: {
    inputType: "email",
    name: "text",
    value: "",
    placeholder: "E-mail",
    onChange: () => {},
    onImmediateChange: () => {},
    validation: "none",
    status: "warning",
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(
      evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
      updateArgs({ value: evt.target.value });
    }

    return (
      <StyledEmailField
        inputType="email"
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

export const PrimaryEmailDisabled: Story = {
  name: "email (отключенное поле)",
  args: {
    inputType: "email",
    name: "text",
    value: "",
    placeholder: "E-mail",
    onChange: () => {},
    onImmediateChange: () => {},
    validation: "none",
    disabled: true,
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(
      evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
      updateArgs({ value: evt.target.value });
    }

    return (
      <StyledEmailField
        inputType="email"
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

export const PrimaryEmailValue: Story = {
  name: "email (заполненное поле)",
  args: {
    inputType: "email",
    name: "text",
    value: "test@mail.ru",
    placeholder: "E-mail",
    validation: "none",
    onChange: () => {},
    onImmediateChange: () => {},
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(
      evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
      updateArgs({ value: evt.target.value });
    }

    return (
      <StyledEmailField
        inputType="email"
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

export const PrimaryEmailHeading: Story = {
  name: "email (заголовок)",
  args: {
    inputType: "email",
    name: "text",
    value: "",
    placeholder: "E-mail",
    validation: "none",
    onChange: () => {},
    onImmediateChange: () => {},
    heading: "Заголовок поля",
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(
      evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
      updateArgs({ value: evt.target.value });
    }

    return (
      <StyledEmailField
        inputType="email"
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
  name: "email (разделители)",
  args: {
    inputType: "email",
    name: "text",
    value: "",
    placeholder: "E-mail",
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

    function onChange(
      evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
      updateArgs({ value: evt.target.value });
    }

    return (
      <StyledEmailField
        inputType="email"
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
