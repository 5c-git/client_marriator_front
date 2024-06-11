import type { StoryObj, Meta } from "@storybook/react";

import { useArgs } from "@storybook/preview-api";
import * as DocBlock from "@storybook/blocks";

import { StyledSmsField } from "./StyledSmsField";

import schema from "./StyledSmsField.schema.json";

/**
 * тип - sms
 * <p>Основан на https://mui.com/material-ui/react-text-field/</p>
 */
const meta = {
  title: "Общие компоненты/Поля ввода/sms",
  component: StyledSmsField,
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
} satisfies Meta<typeof StyledSmsField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "sms (базовый вид)",
  args: {
    inputtype: "sms",
    name: "text",
    value: "",
    placeholder: "Код из смс",
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
      <StyledSmsField
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
  name: "sms (ошибка)",
  args: {
    inputtype: "sms",
    name: "phone",
    value: "",
    placeholder: "Код из смс",
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
      <StyledSmsField
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

export const PrimarySms: Story = {
  name: "sms (вспомогательный текст)",
  args: {
    inputtype: "sms",
    name: "text",
    value: "",
    placeholder: "Код из смс",
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
      <StyledSmsField
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
  name: "sms (вспомогательная ссылка)",
  args: {
    inputtype: "sms",
    name: "text",
    value: "",
    placeholder: "Код из смс",
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
      <StyledSmsField
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

export const PrimarySmsLink: Story = {
  name: "sms (вспомогательные текст и ссылка)",
  args: {
    inputtype: "sms",
    name: "text",
    value: "",
    placeholder: "Код из смс",
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
      <StyledSmsField
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

export const PrimarySmsLinkError: Story = {
  name: "sms (вспомогательные текст и ссылка и ошибка)",
  args: {
    inputtype: "sms",
    name: "text",
    value: "",
    placeholder: "Код из смс",
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
      <StyledSmsField
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

export const PrimarySmsStatus: Story = {
  name: "sms (статус поля)",
  args: {
    inputtype: "sms",
    name: "text",
    value: "",
    placeholder: "Код из смс",
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
      <StyledSmsField
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

export const PrimarySmsDisabled: Story = {
  name: "sms (отключенное поле)",
  args: {
    inputtype: "sms",
    name: "text",
    value: "",
    placeholder: "Код из смс",
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
      <StyledSmsField
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

export const PrimarySmsValue: Story = {
  name: "sms (заполненное поле)",
  args: {
    inputtype: "sms",
    name: "text",
    value: "123456123456",
    placeholder: "Код из смс",
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
      <StyledSmsField
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

export const PrimarySmsHeading: Story = {
  name: "sms(заголовок)",
  args: {
    inputtype: "sms",
    name: "text",
    value: "",
    placeholder: "Код из смс",
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
      <StyledSmsField
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
  name: "sms (разделители)",
  args: {
    inputtype: "sms",
    name: "text",
    value: "",
    placeholder: "Код из смс",
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
      <StyledSmsField
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
