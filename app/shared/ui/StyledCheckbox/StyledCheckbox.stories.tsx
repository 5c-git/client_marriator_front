import type { StoryObj, Meta } from "@storybook/react";

import { useArgs } from "@storybook/preview-api";
import * as DocBlock from "@storybook/blocks";

import { StyledCheckbox } from "./StyledCheckbox";

import schema from "./StyledCheckbox.schema.json";

/**
 * тип - checkbox
 * <p>Основан на https://mui.com/material-ui/react-checkbox/</p>
 */
const meta = {
  title: "Общие компоненты/Поля ввода/checkbox",
  component: StyledCheckbox,
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
} satisfies Meta<typeof StyledCheckbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "checkbox",
  args: {
    inputType: "checkbox",
    validation: "none",
    name: "radio",
    value: false,
    label: "Моё доверенное лицо",
    onChange: () => {},
    // error: "Ошибка!",
    // status: "warning",
    // disabled: true,

    // heading: "Заголовок раздела с радиокнопками",

    // dividerBottom: true,
    // dividerTop: true,

    // helperInfo: {
    //   text: "Текст и ",
    //   link: {
    //     type: "external",
    //     path: "https://www.google.com/",
    //     text: "cсылка",
    //   },
    // },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <StyledCheckbox
        inputType={args.inputType}
        value={args.value}
        name={args.name}
        label={args.label}
        error={args.error}
        validation={args.validation}
        status={args.status}
        disabled={args.disabled}
        dividerBottom={args.dividerBottom}
        dividerTop={args.dividerTop}
        heading={args.heading}
        helperInfo={args.helperInfo}
        onChange={(evt) => {
          updateArgs({ value: evt.target.checked });
        }}
      />
    );
  },
};

export const PrimaryChecked: Story = {
  name: "checkbox (заполненный)",
  args: {
    inputType: "checkbox",
    name: "radio",
    value: true,
    validation: "none",
    label: "Моё доверенное лицо",
    onChange: () => {},
    // error: "Ошибка!",
    // status: "warning",
    // disabled: true,

    // heading: "Заголовок раздела с радиокнопками",

    // dividerBottom: true,
    // dividerTop: true,

    // helperInfo: {
    //   text: "Текст и ",
    //   link: {
    //     type: "external",
    //     path: "https://www.google.com/",
    //     text: "cсылка",
    //   },
    // },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <StyledCheckbox
        inputType={args.inputType}
        value={args.value}
        name={args.name}
        label={args.label}
        error={args.error}
        validation={args.validation}
        status={args.status}
        disabled={args.disabled}
        dividerBottom={args.dividerBottom}
        dividerTop={args.dividerTop}
        heading={args.heading}
        helperInfo={args.helperInfo}
        onChange={(evt) => {
          updateArgs({ value: evt.target.checked });
        }}
      />
    );
  },
};

export const PrimaryError: Story = {
  name: "checkbox (ошибка)",
  args: {
    inputType: "checkbox",
    name: "radio",
    value: false,
    validation: "none",
    label: "Моё доверенное лицо",
    onChange: () => {},
    error: "Ошибка!",
    // status: "warning",
    // disabled: true,

    // heading: "Заголовок раздела с радиокнопками",

    // dividerBottom: true,
    // dividerTop: true,

    // helperInfo: {
    //   text: "Текст и ",
    //   link: {
    //     type: "external",
    //     path: "https://www.google.com/",
    //     text: "cсылка",
    //   },
    // },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <StyledCheckbox
        inputType={args.inputType}
        value={args.value}
        name={args.name}
        label={args.label}
        error={args.error}
        validation={args.validation}
        status={args.status}
        disabled={args.disabled}
        dividerBottom={args.dividerBottom}
        dividerTop={args.dividerTop}
        heading={args.heading}
        helperInfo={args.helperInfo}
        onChange={(evt) => {
          updateArgs({ value: evt.target.checked });
        }}
      />
    );
  },
};

export const PrimaryStatus: Story = {
  name: "checkbox (статус)",
  args: {
    inputType: "checkbox",
    name: "radio",
    value: true,
    validation: "none",
    label: "Моё доверенное лицо",
    onChange: () => {},
    // error: "Ошибка!",
    status: "warning",
    // disabled: true,

    // heading: "Заголовок раздела с радиокнопками",

    // dividerBottom: true,
    // dividerTop: true,

    // helperInfo: {
    //   text: "Текст и ",
    //   link: {
    //     type: "external",
    //     path: "https://www.google.com/",
    //     text: "cсылка",
    //   },
    // },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <StyledCheckbox
        inputType={args.inputType}
        value={args.value}
        name={args.name}
        label={args.label}
        error={args.error}
        status={args.status}
        validation={args.validation}
        disabled={args.disabled}
        dividerBottom={args.dividerBottom}
        dividerTop={args.dividerTop}
        heading={args.heading}
        helperInfo={args.helperInfo}
        onChange={(evt) => {
          updateArgs({ value: evt.target.checked });
        }}
      />
    );
  },
};

export const PrimaryDisabled: Story = {
  name: "checkbox (отключенный)",
  args: {
    inputType: "checkbox",
    name: "radio",
    value: false,
    validation: "none",
    label: "Моё доверенное лицо",
    onChange: () => {},
    // error: "Ошибка!",
    // status: "warning",
    disabled: true,

    // heading: "Заголовок раздела с радиокнопками",

    // dividerBottom: true,
    // dividerTop: true,

    // helperInfo: {
    //   text: "Текст и ",
    //   link: {
    //     type: "external",
    //     path: "https://www.google.com/",
    //     text: "cсылка",
    //   },
    // },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <StyledCheckbox
        inputType={args.inputType}
        value={args.value}
        name={args.name}
        label={args.label}
        error={args.error}
        status={args.status}
        disabled={args.disabled}
        validation={args.validation}
        dividerBottom={args.dividerBottom}
        dividerTop={args.dividerTop}
        heading={args.heading}
        helperInfo={args.helperInfo}
        onChange={(evt) => {
          updateArgs({ value: evt.target.checked });
        }}
      />
    );
  },
};

export const PrimaryHeading: Story = {
  name: "checkbox (заголовок)",
  args: {
    inputType: "checkbox",
    name: "radio",
    value: false,
    validation: "none",
    label: "Моё доверенное лицо",
    onChange: () => {},
    // error: "Ошибка!",
    // status: "warning",
    // disabled: true,

    heading: "Заголовок",

    // dividerBottom: true,
    // dividerTop: true,

    // helperInfo: {
    //   text: "Текст и ",
    //   link: {
    //     type: "external",
    //     path: "https://www.google.com/",
    //     text: "cсылка",
    //   },
    // },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <StyledCheckbox
        inputType={args.inputType}
        value={args.value}
        name={args.name}
        label={args.label}
        error={args.error}
        status={args.status}
        validation={args.validation}
        disabled={args.disabled}
        dividerBottom={args.dividerBottom}
        dividerTop={args.dividerTop}
        heading={args.heading}
        helperInfo={args.helperInfo}
        onChange={(evt) => {
          updateArgs({ value: evt.target.checked });
        }}
      />
    );
  },
};

export const PrimaryText: Story = {
  name: "checkbox (вспомогательный текст)",
  args: {
    inputType: "checkbox",
    name: "radio",
    value: false,
    validation: "none",
    label: "Моё доверенное лицо",
    onChange: () => {},
    // error: "Ошибка!",
    // status: "warning",
    // disabled: true,

    // heading: "Заголовок",

    // dividerBottom: true,
    // dividerTop: true,

    helperInfo: {
      text: "Текст",
      // link: {
      //   type: "external",
      //   path: "https://www.google.com/",
      //   text: "cсылка",
      // },
    },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <StyledCheckbox
        inputType={args.inputType}
        value={args.value}
        name={args.name}
        label={args.label}
        error={args.error}
        validation={args.validation}
        status={args.status}
        disabled={args.disabled}
        dividerBottom={args.dividerBottom}
        dividerTop={args.dividerTop}
        heading={args.heading}
        helperInfo={args.helperInfo}
        onChange={(evt) => {
          updateArgs({ value: evt.target.checked });
        }}
      />
    );
  },
};

export const PrimaryTextAndLink: Story = {
  name: "checkbox (вспомогательный текст и ссылка)",
  args: {
    inputType: "checkbox",
    name: "radio",
    value: false,
    validation: "none",
    label: "Моё доверенное лицо",
    onChange: () => {},
    // error: "Ошибка!",
    // status: "warning",
    // disabled: true,

    // heading: "Заголовок",

    // dividerBottom: true,
    // dividerTop: true,

    helperInfo: {
      text: "Текст и ",
      link: {
        type: "external",
        path: "https://www.google.com/",
        text: "cсылка",
      },
    },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <StyledCheckbox
        inputType={args.inputType}
        value={args.value}
        name={args.name}
        label={args.label}
        error={args.error}
        validation={args.validation}
        status={args.status}
        disabled={args.disabled}
        dividerBottom={args.dividerBottom}
        dividerTop={args.dividerTop}
        heading={args.heading}
        helperInfo={args.helperInfo}
        onChange={(evt) => {
          updateArgs({ value: evt.target.checked });
        }}
      />
    );
  },
};

export const PrimaryTextDividers: Story = {
  name: "checkbox (разделители)",
  args: {
    inputType: "checkbox",
    name: "radio",
    value: false,
    validation: "none",
    label: "Моё доверенное лицо",
    onChange: () => {},
    // error: "Ошибка!",
    // status: "warning",
    // disabled: true,

    // heading: "Заголовок",

    dividerBottom: true,
    dividerTop: true,

    // helperInfo: {
    //   text: "Текст и ",
    //   link: {
    //     type: "external",
    //     path: "https://www.google.com/",
    //     text: "cсылка",
    //   },
    // },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <StyledCheckbox
        inputType={args.inputType}
        value={args.value}
        validation={args.validation}
        name={args.name}
        label={args.label}
        error={args.error}
        status={args.status}
        disabled={args.disabled}
        dividerBottom={args.dividerBottom}
        dividerTop={args.dividerTop}
        heading={args.heading}
        helperInfo={args.helperInfo}
        onChange={(evt) => {
          updateArgs({ value: evt.target.checked });
        }}
      />
    );
  },
};
