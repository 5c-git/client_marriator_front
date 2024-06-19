import type { StoryObj, Meta } from "@storybook/react";

import { useArgs } from "@storybook/preview-api";
import * as DocBlock from "@storybook/blocks";

import { StyledPhoneField } from "./StyledPhoneField";

import schema from "./StyledPhoneField.schema.json";

/**
 * тип - phone
 * <p>Основан на https://mui.com/material-ui/react-text-field/</p>
 */
const meta = {
  title: "Общие компоненты/Поля ввода/phone",
  component: StyledPhoneField,
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
} satisfies Meta<typeof StyledPhoneField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "phone (базовый вид)",
  args: {
    inputType: "phone",
    name: "text",
    value: "",
    placeholder: "Мобильный телефон",
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
      <StyledPhoneField
        inputType="phone"
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
  name: "phone (ошибка)",
  args: {
    inputType: "phone",
    name: "phone",
    value: "",
    placeholder: "Мобильный телефон",
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
      <StyledPhoneField
        inputType="phone"
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

export const PrimaryText: Story = {
  name: "phone (вспомогательный текст)",
  args: {
    inputType: "phone",
    name: "text",
    value: "",
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

    function onChange(
      evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
      updateArgs({ value: evt.target.value });
    }

    return (
      <StyledPhoneField
        inputType="phone"
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
  name: "phone (вспомогательная ссылка)",
  args: {
    inputType: "phone",
    name: "text",
    value: "",
    placeholder: "Мобильный телефон",
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
      <StyledPhoneField
        inputType="phone"
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

export const PrimaryPhoneLink: Story = {
  name: "phone (вспомогательные текст и ссылка)",
  args: {
    inputType: "phone",
    name: "text",
    value: "",
    placeholder: "Мобильный телефон",
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
      <StyledPhoneField
        inputType="phone"
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

export const PrimaryPhoneLinkError: Story = {
  name: "phone (вспомогательные текст и ссылка и ошибка)",
  args: {
    inputType: "phone",
    name: "text",
    value: "",
    placeholder: "Мобильный телефон",
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
      <StyledPhoneField
        inputType="phone"
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

export const PrimaryPhoneStatus: Story = {
  name: "phone (статус поля)",
  args: {
    inputType: "phone",
    name: "text",
    value: "",
    placeholder: "Мобильный телефон",
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
      <StyledPhoneField
        inputType="phone"
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

export const PrimaryPhoneDisabled: Story = {
  name: "phone (отключенное поле)",
  args: {
    inputType: "phone",
    name: "text",
    value: "",
    placeholder: "Мобильный телефон",
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
      <StyledPhoneField
        inputType="phone"
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

export const PrimaryPhoneValue: Story = {
  name: "phone (заполненное поле)",
  args: {
    inputType: "phone",
    name: "text",
    value: "+79152142630",
    placeholder: "Мобильный телефон",
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
      <StyledPhoneField
        inputType="phone"
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

export const PrimaryPhoneheading: Story = {
  name: "phone (заголовок)",
  args: {
    inputType: "phone",
    name: "text",
    value: "",
    placeholder: "Мобильный телефон",
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
      <StyledPhoneField
        inputType="phone"
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
  name: "phone (разделители)",
  args: {
    inputType: "phone",
    name: "text",
    value: "",
    placeholder: "Мобильный телефон",
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
      <StyledPhoneField
        inputType="phone"
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
