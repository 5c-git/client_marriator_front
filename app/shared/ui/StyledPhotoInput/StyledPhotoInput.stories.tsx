import type { StoryObj, Meta } from "@storybook/react";

import { useArgs } from "@storybook/preview-api";
import * as DocBlock from "@storybook/blocks";

import { StyledPhotoInput } from "./StyledPhotoInput";

import schema from "./StyledPhotoInput.schema.json";

/**
 * тип - photo
 */
const meta = {
  title: "Общие компоненты/Поля ввода/photo",
  component: StyledPhotoInput,
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
} satisfies Meta<typeof StyledPhotoInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "photo",
  args: {
    inputtype: "photo",
    name: "photo",
    // value: "https://mui.com/static/images/avatar/1.jpg",
    value: "",
    url: import.meta.env.VITE_SEND_FILE,
    // url: "",
    // placeholder: "Приложи документ",
    validation: "none",
    onChange: () => {},
    onImmediateChange: () => {},
    triggerValidation: () => {},

    // dividerTop: true,
    // dividerBottom: true,
    // heading: "This is heading",
    // error: "Ошибка!",
    // status: "warning",
    // disabled: true,
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

    function onChange(name: string, value: unknown) {
      updateArgs({ value });
    }

    return (
      <StyledPhotoInput
        inputtype={args.inputtype}
        name={args.name}
        value={args.value}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        triggerValidation={args.triggerValidation}
        url={args.url}
        error={args.error}
        status={args.status}
        validation={args.validation}
        dividerTop={args.dividerTop}
        dividerBottom={args.dividerBottom}
        heading={args.heading}
        helperInfo={args.helperInfo}
        disabled={args.disabled}
      />
    );
  },
};

export const PrimaryFilled: Story = {
  name: "photo (заполненный)",
  args: {
    inputtype: "photo",
    name: "photo",
    value: "https://mui.com/static/images/avatar/1.jpg",
    url: import.meta.env.VITE_SEND_FILE,
    validation: "none",
    onChange: () => {},
    onImmediateChange: () => {},
    triggerValidation: () => {},

    // dividerTop: true,
    // dividerBottom: true,
    // heading: "This is heading",
    // error: "Ошибка!",
    // status: "warning",
    // disabled: true,
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

    function onChange(name: string, value: unknown) {
      updateArgs({ value });
    }

    return (
      <StyledPhotoInput
        inputtype={args.inputtype}
        name={args.name}
        value={args.value}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        triggerValidation={args.triggerValidation}
        url={args.url}
        error={args.error}
        status={args.status}
        validation={args.validation}
        dividerTop={args.dividerTop}
        dividerBottom={args.dividerBottom}
        heading={args.heading}
        helperInfo={args.helperInfo}
        disabled={args.disabled}
      />
    );
  },
};

export const PrimaryDisabled: Story = {
  name: "photo (отключенный)",
  args: {
    inputtype: "photo",
    name: "photo",
    value: "",
    url: import.meta.env.VITE_SEND_FILE,
    validation: "none",
    onChange: () => {},
    onImmediateChange: () => {},
    triggerValidation: () => {},

    // dividerTop: true,
    // dividerBottom: true,
    // heading: "This is heading",
    // error: "Ошибка!",
    // status: "warning",
    disabled: true,
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

    function onChange(name: string, value: unknown) {
      updateArgs({ value });
    }

    return (
      <StyledPhotoInput
        inputtype={args.inputtype}
        name={args.name}
        value={args.value}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        triggerValidation={args.triggerValidation}
        url={args.url}
        error={args.error}
        status={args.status}
        validation={args.validation}
        dividerTop={args.dividerTop}
        dividerBottom={args.dividerBottom}
        heading={args.heading}
        helperInfo={args.helperInfo}
        disabled={args.disabled}
      />
    );
  },
};

export const PrimaryStatus: Story = {
  name: "photo (статус)",
  args: {
    inputtype: "photo",
    name: "photo",
    value: "",
    url: import.meta.env.VITE_SEND_FILE,
    validation: "none",
    onChange: () => {},
    onImmediateChange: () => {},
    triggerValidation: () => {},

    // dividerTop: true,
    // dividerBottom: true,
    // heading: "This is heading",
    // error: "Ошибка!",
    status: "warning",
    // disabled: true,
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

    function onChange(name: string, value: unknown) {
      updateArgs({ value });
    }

    return (
      <StyledPhotoInput
        inputtype={args.inputtype}
        name={args.name}
        value={args.value}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        triggerValidation={args.triggerValidation}
        url={args.url}
        error={args.error}
        status={args.status}
        validation={args.validation}
        dividerTop={args.dividerTop}
        dividerBottom={args.dividerBottom}
        heading={args.heading}
        helperInfo={args.helperInfo}
        disabled={args.disabled}
      />
    );
  },
};

export const PrimaryError: Story = {
  name: "photo (ошибка)",
  args: {
    inputtype: "photo",
    name: "photo",
    value: "",
    url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
    validation: "none",
    onChange: () => {},
    onImmediateChange: () => {},
    triggerValidation: () => {},

    // dividerTop: true,
    // dividerBottom: true,
    // heading: "This is heading",
    error: "Ошибка!",
    // status: "warning",
    // disabled: true,
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

    function onChange(name: string, value: unknown) {
      updateArgs({ value });
    }

    return (
      <StyledPhotoInput
        inputtype={args.inputtype}
        name={args.name}
        value={args.value}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        triggerValidation={args.triggerValidation}
        url={args.url}
        error={args.error}
        status={args.status}
        validation={args.validation}
        dividerTop={args.dividerTop}
        dividerBottom={args.dividerBottom}
        heading={args.heading}
        helperInfo={args.helperInfo}
        disabled={args.disabled}
      />
    );
  },
};

export const PrimaryHeading: Story = {
  name: "photo (заголовок)",
  args: {
    inputtype: "photo",
    name: "photo",
    value: "",
    url: import.meta.env.VITE_SEND_FILE,
    validation: "none",
    onChange: () => {},
    onImmediateChange: () => {},
    triggerValidation: () => {},

    // dividerTop: true,
    // dividerBottom: true,
    heading: "Это заголовок",
    // error: "Ошибка!",
    // status: "warning",
    // disabled: true,
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

    function onChange(name: string, value: unknown) {
      updateArgs({ value });
    }

    return (
      <StyledPhotoInput
        inputtype={args.inputtype}
        name={args.name}
        value={args.value}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        triggerValidation={args.triggerValidation}
        url={args.url}
        error={args.error}
        status={args.status}
        validation={args.validation}
        dividerTop={args.dividerTop}
        dividerBottom={args.dividerBottom}
        heading={args.heading}
        helperInfo={args.helperInfo}
        disabled={args.disabled}
      />
    );
  },
};

export const PrimaryHelper: Story = {
  name: "photo (вспомогательная иформация)",
  args: {
    inputtype: "photo",
    name: "photo",
    value: "",
    url: import.meta.env.VITE_SEND_FILE,
    validation: "none",
    onChange: () => {},
    onImmediateChange: () => {},
    triggerValidation: () => {},

    // dividerTop: true,
    // dividerBottom: true,
    // heading: "Это заголовок",
    // error: "Ошибка!",
    // status: "warning",
    // disabled: true,
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

    function onChange(name: string, value: unknown) {
      updateArgs({ value });
    }

    return (
      <StyledPhotoInput
        inputtype={args.inputtype}
        name={args.name}
        value={args.value}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        triggerValidation={args.triggerValidation}
        url={args.url}
        error={args.error}
        status={args.status}
        validation={args.validation}
        dividerTop={args.dividerTop}
        dividerBottom={args.dividerBottom}
        heading={args.heading}
        helperInfo={args.helperInfo}
        disabled={args.disabled}
      />
    );
  },
};

export const PrimaryDividers: Story = {
  name: "photo (разделители)",
  args: {
    inputtype: "photo",
    name: "photo",
    value: "",
    url: import.meta.env.VITE_SEND_FILE,
    validation: "none",
    onChange: () => {},
    onImmediateChange: () => {},
    triggerValidation: () => {},

    dividerTop: true,
    dividerBottom: true,
    // heading: "Это заголовок",
    // error: "Ошибка!",
    // status: "warning",
    // disabled: true,
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

    function onChange(name: string, value: unknown) {
      updateArgs({ value });
    }

    return (
      <StyledPhotoInput
        inputtype={args.inputtype}
        name={args.name}
        value={args.value}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        triggerValidation={args.triggerValidation}
        url={args.url}
        error={args.error}
        status={args.status}
        validation={args.validation}
        dividerTop={args.dividerTop}
        dividerBottom={args.dividerBottom}
        heading={args.heading}
        helperInfo={args.helperInfo}
        disabled={args.disabled}
      />
    );
  },
};
