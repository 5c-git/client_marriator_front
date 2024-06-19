import type { StoryObj, Meta } from "@storybook/react";

import { useArgs } from "@storybook/preview-api";
import * as DocBlock from "@storybook/blocks";

import { StyledInnField } from "./StyledInnField";

import schema from "./StyledInnField.schema.json";

/**
 * тип - inn
 * <p>Основан на https://mui.com/material-ui/react-text-field/</p>
 */
const meta = {
  title: "Общие компоненты/Поля ввода/inn",
  component: StyledInnField,
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
} satisfies Meta<typeof StyledInnField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "inn  (базовый вид)",
  args: {
    inputType: "inn",
    name: "text",
    value: "",
    placeholder: "ИНН",
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
      <StyledInnField
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
  name: "inn  (ошибка)",
  args: {
    inputType: "inn",
    name: "phone",
    value: "",
    placeholder: "ИНН",
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
      <StyledInnField
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

export const PrimaryInn: Story = {
  name: "inn (вспомогательный текст)",
  args: {
    inputType: "inn",
    name: "text",
    value: "",
    placeholder: "ИНН",
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
      <StyledInnField
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
  name: "inn  (вспомогательная ссылка)",
  args: {
    inputType: "inn",
    name: "text",
    value: "",
    placeholder: "ИНН",
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
      <StyledInnField
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

export const PrimaryInnLink: Story = {
  name: "inn  (вспомогательные текст и ссылка)",
  args: {
    inputType: "inn",
    name: "text",
    value: "",
    placeholder: "ИНН",
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
      <StyledInnField
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

export const PrimaryInnLinkError: Story = {
  name: "inn  (вспомогательные текст и ссылка и ошибка)",
  args: {
    inputType: "inn",
    name: "text",
    value: "",
    placeholder: "ИНН",
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
      <StyledInnField
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

export const PrimaryInnStatus: Story = {
  name: "inn  (статус поля)",
  args: {
    inputType: "inn",
    name: "text",
    value: "",
    placeholder: "ИНН",
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
      <StyledInnField
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

export const PrimaryInnDisabled: Story = {
  name: "inn  (отключенное поле)",
  args: {
    inputType: "inn",
    name: "text",
    value: "",
    placeholder: "ИНН",
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
      <StyledInnField
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

export const PrimaryInnValue: Story = {
  name: "inn  (заполненное поле)",
  args: {
    inputType: "inn",
    name: "text",
    value: "123456123456",
    placeholder: "ИНН",
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
      <StyledInnField
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

export const PrimaryInnheading: Story = {
  name: "inn  (заголовок)",
  args: {
    inputType: "inn",
    name: "text",
    value: "",
    placeholder: "ИНН",
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
      <StyledInnField
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
  name: "inn  (разделители)",
  args: {
    inputType: "inn",
    name: "text",
    value: "",
    placeholder: "ИНН",
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
      <StyledInnField
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
