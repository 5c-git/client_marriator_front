import type { StoryObj, Meta } from "@storybook/react";

import { useArgs } from "@storybook/preview-api";
import * as DocBlock from "@storybook/blocks";

import { StyledCardField } from "./StyledCardField";

import schema from "./StyledCardField.schema.json";

/**
 * тип - card
 * <p>Основан на https://mui.com/material-ui/react-text-field/</p>
 */
const meta = {
  title: "Общие компоненты/Поля ввода/card",
  component: StyledCardField,
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
} satisfies Meta<typeof StyledCardField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "card (базовый вид)",
  args: {
    inputtype: "card",
    name: "text",
    value: "",
    placeholder: "Номер банковской карты",
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
      <StyledCardField
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

export const PrimaryError: Story = {
  name: "card (ошибка)",
  args: {
    inputtype: "card",
    name: "phone",
    value: "",
    placeholder: "Номер банковской карты",
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
      <StyledCardField
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

export const PrimaryText: Story = {
  name: "card (вспомогательный текст)",
  args: {
    inputtype: "card",
    name: "text",
    value: "",
    placeholder: "Номер банковской карты",
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
      <StyledCardField
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

export const PrimaryLink: Story = {
  name: "card (вспомогательная ссылка)",
  args: {
    inputtype: "card",
    name: "text",
    value: "",
    placeholder: "Номер банковской карты",
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
      <StyledCardField
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

export const PrimaryCardLink: Story = {
  name: "card (вспомогательные текст и ссылка)",
  args: {
    inputtype: "card",
    name: "text",
    value: "",
    placeholder: "Номер банковской карты",
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
      <StyledCardField
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

export const PrimaryCardLinkError: Story = {
  name: "card (вспомогательные текст и ссылка и ошибка)",
  args: {
    inputtype: "card",
    name: "text",
    value: "",
    placeholder: "Номер банковской карты",
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
      <StyledCardField
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

export const PrimaryCardStatus: Story = {
  name: "card (статус поля)",
  args: {
    inputtype: "card",
    name: "text",
    value: "",
    placeholder: "Номер банковской карты",
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
      <StyledCardField
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

export const PrimaryCardDisabled: Story = {
  name: "phone (отключенное поле)",
  args: {
    inputtype: "card",
    name: "text",
    value: "",
    placeholder: "Номер банковской карты",
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
      <StyledCardField
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

export const PrimaryCardValue: Story = {
  name: "card (заполненное поле)",
  args: {
    inputtype: "card",
    name: "text",
    value: "2342342344234234",
    placeholder: "Номер банковской карты",
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
      <StyledCardField
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

export const PrimaryCardheading: Story = {
  name: "card (заголовок)",
  args: {
    inputtype: "card",
    name: "text",
    value: "",
    placeholder: "Номер банковской карты",
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
      <StyledCardField
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

export const PrimaryDividers: Story = {
  name: "card (разделители)",
  args: {
    inputtype: "card",
    name: "text",
    value: "",
    placeholder: "Номер банковской карты",
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
      <StyledCardField
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
