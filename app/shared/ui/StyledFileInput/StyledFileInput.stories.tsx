import type { StoryObj, Meta } from "@storybook/react";

import { useArgs } from "@storybook/preview-api";
import * as DocBlock from "@storybook/blocks";

import { StyledFileInput } from "./StyledFileInput";

import schema from "./StyledFileInput.schema.json";

/**
 * тип - file
 */
const meta = {
  title: "Общие компоненты/Поля ввода/file",
  component: StyledFileInput,
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
} satisfies Meta<typeof StyledFileInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "file",
  args: {
    inputType: "file",
    token: "token",
    name: "file",
    value: "",
    url: import.meta.env.VITE_SEND_FILE,
    placeholder: "Приложи документ",
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
    drawerInfo: {
      text: "Поясняющий текст, который может быть очень длинным, но не совсем уж очень сильно длинным, в общем 3 строки.",
      images: [
        "/client_marriator_front/mockImg/drawerImage.jpg",
        "/client_marriator_front/mockImg/drawerImage.jpg",
        "/client_marriator_front/mockImg/drawerImage.jpg",
        "/client_marriator_front/mockImg/drawerImage.jpg",
      ],
    },
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
      <StyledFileInput
        inputType={args.inputType}
        token={args.token}
        name={args.name}
        value={args.value}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        triggerValidation={args.triggerValidation}
        url={args.url}
        error={args.error}
        status={args.status}
        placeholder={args.placeholder}
        validation={args.validation}
        drawerInfo={args.drawerInfo}
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
  name: "file (отключенный)",
  args: {
    inputType: "file",
    token: "token",
    name: "file",
    value: "",
    url: import.meta.env.VITE_SEND_FILE,
    placeholder: "Приложи документ",
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
    drawerInfo: {
      text: "Поясняющий текст, который может быть очень длинным, но не совсем уж очень сильно длинным, в общем 3 строки.",
      images: [
        "/client_marriator_front/mockImg/drawerImage.jpg",
        "/client_marriator_front/mockImg/drawerImage.jpg",
        "/client_marriator_front/mockImg/drawerImage.jpg",
        "/client_marriator_front/mockImg/drawerImage.jpg",
      ],
    },
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
      <StyledFileInput
        inputType={args.inputType}
        token={args.token}
        name={args.name}
        value={args.value}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        triggerValidation={args.triggerValidation}
        url={args.url}
        error={args.error}
        status={args.status}
        placeholder={args.placeholder}
        validation={args.validation}
        drawerInfo={args.drawerInfo}
        dividerTop={args.dividerTop}
        dividerBottom={args.dividerBottom}
        heading={args.heading}
        helperInfo={args.helperInfo}
        disabled={args.disabled}
      />
    );
  },
};

export const PrimaryNothing: Story = {
  name: "file (без доп информации)",
  args: {
    inputType: "file",
    token: "token",
    name: "file",
    value: "",
    url: import.meta.env.VITE_SEND_FILE,
    placeholder: "Приложи документ",
    validation: "none",
    onChange: () => {},
    onImmediateChange: () => {},
    triggerValidation: () => {},

    // dividerTop: true,
    // dividerBottom: true,
    // heading: "This is heading",
    // error: "Ошибка!",
    // status: "warning",
    // drawerInfo: {
    //   text: "Поясняющий текст, который может быть очень длинным, но не совсем уж очень сильно длинным, в общем 3 строки.",
    //   images: [
    //     "/client_marriator_front/mockImg/drawerImage.jpg",
    //     "/client_marriator_front/mockImg/drawerImage.jpg",
    //     "/client_marriator_front/mockImg/drawerImage.jpg",
    //     "/client_marriator_front/mockImg/drawerImage.jpg",
    //   ],
    // },
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
      <StyledFileInput
        inputType={args.inputType}
        token={args.token}
        name={args.name}
        value={args.value}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        triggerValidation={args.triggerValidation}
        url={args.url}
        error={args.error}
        status={args.status}
        placeholder={args.placeholder}
        validation={args.validation}
        drawerInfo={args.drawerInfo}
        dividerTop={args.dividerTop}
        dividerBottom={args.dividerBottom}
        heading={args.heading}
        helperInfo={args.helperInfo}
      />
    );
  },
};

export const PrimaryFilled: Story = {
  name: "file (заполненный)",
  args: {
    inputType: "file",
    token: "token",
    name: "file",
    value: "{Номер телефона} - {Наименование документа}.pdf",
    url: import.meta.env.VITE_SEND_FILE,
    placeholder: "Приложи документ",
    validation: "none",
    onChange: () => {},
    onImmediateChange: () => {},
    triggerValidation: () => {},

    // dividerTop: true,
    // dividerBottom: true,
    // heading: "This is heading",
    // error: "Ошибка!",
    // status: "warning",
    drawerInfo: {
      text: "Поясняющий текст, который может быть очень длинным, но не совсем уж очень сильно длинным, в общем 3 строки.",
      images: [
        "/client_marriator_front/mockImg/drawerImage.jpg",
        "/client_marriator_front/mockImg/drawerImage.jpg",
        "/client_marriator_front/mockImg/drawerImage.jpg",
        "/client_marriator_front/mockImg/drawerImage.jpg",
      ],
    },
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
      <StyledFileInput
        inputType={args.inputType}
        token={args.token}
        name={args.name}
        value={args.value}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        triggerValidation={args.triggerValidation}
        url={args.url}
        error={args.error}
        status={args.status}
        placeholder={args.placeholder}
        validation={args.validation}
        drawerInfo={args.drawerInfo}
        dividerTop={args.dividerTop}
        dividerBottom={args.dividerBottom}
        heading={args.heading}
        helperInfo={args.helperInfo}
      />
    );
  },
};

export const PrimaryError: Story = {
  name: "file (ошибка)",
  args: {
    inputType: "file",
    token: "token",
    name: "file",
    value: "",
    url: import.meta.env.VITE_SEND_FILE,
    placeholder: "Приложи документ",
    validation: "none",
    onChange: () => {},

    onImmediateChange: () => {},
    triggerValidation: () => {},

    // dividerTop: true,
    // dividerBottom: true,
    // heading: "This is heading",
    error: "Ошибка!",
    // status: "warning",
    drawerInfo: {
      text: "Поясняющий текст, который может быть очень длинным, но не совсем уж очень сильно длинным, в общем 3 строки.",
      images: [
        "/client_marriator_front/mockImg/drawerImage.jpg",
        "/client_marriator_front/mockImg/drawerImage.jpg",
        "/client_marriator_front/mockImg/drawerImage.jpg",
        "/client_marriator_front/mockImg/drawerImage.jpg",
      ],
    },
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
      <StyledFileInput
        inputType={args.inputType}
        token={args.token}
        name={args.name}
        value={args.value}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        triggerValidation={args.triggerValidation}
        url={args.url}
        error={args.error}
        status={args.status}
        placeholder={args.placeholder}
        validation={args.validation}
        drawerInfo={args.drawerInfo}
        dividerTop={args.dividerTop}
        dividerBottom={args.dividerBottom}
        heading={args.heading}
        helperInfo={args.helperInfo}
      />
    );
  },
};

export const PrimaryWarning: Story = {
  name: "file (статус  - warning)",
  args: {
    inputType: "file",
    token: "token",
    name: "file",
    value: "",
    url: import.meta.env.VITE_SEND_FILE,
    placeholder: "Приложи документ",
    validation: "none",
    onChange: () => {},
    onImmediateChange: () => {},
    triggerValidation: () => {},

    // dividerTop: true,
    // dividerBottom: true,
    // heading: "This is heading",
    // error: "Ошибка!",
    status: "warning",
    drawerInfo: {
      text: "Поясняющий текст, который может быть очень длинным, но не совсем уж очень сильно длинным, в общем 3 строки.",
      images: [
        "/client_marriator_front/mockImg/drawerImage.jpg",
        "/client_marriator_front/mockImg/drawerImage.jpg",
        "/client_marriator_front/mockImg/drawerImage.jpg",
        "/client_marriator_front/mockImg/drawerImage.jpg",
      ],
    },
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
      <StyledFileInput
        inputType={args.inputType}
        token={args.token}
        name={args.name}
        value={args.value}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        triggerValidation={args.triggerValidation}
        url={args.url}
        error={args.error}
        status={args.status}
        placeholder={args.placeholder}
        validation={args.validation}
        drawerInfo={args.drawerInfo}
        dividerTop={args.dividerTop}
        dividerBottom={args.dividerBottom}
        heading={args.heading}
        helperInfo={args.helperInfo}
      />
    );
  },
};

export const PrimaryHeading: Story = {
  name: "file (pаголовок)",
  args: {
    inputType: "file",
    token: "token",
    name: "file",
    value: "",
    url: import.meta.env.VITE_SEND_FILE,
    placeholder: "Приложи документ",
    validation: "none",
    onChange: () => {},
    onImmediateChange: () => {},
    triggerValidation: () => {},

    // dividerTop: true,
    // dividerBottom: true,
    heading: "Заголовок инпута",
    // error: "Ошибка!",
    // status: "warning",
    drawerInfo: {
      text: "Поясняющий текст, который может быть очень длинным, но не совсем уж очень сильно длинным, в общем 3 строки.",
      images: [
        "/client_marriator_front/mockImg/drawerImage.jpg",
        "/client_marriator_front/mockImg/drawerImage.jpg",
        "/client_marriator_front/mockImg/drawerImage.jpg",
        "/client_marriator_front/mockImg/drawerImage.jpg",
      ],
    },
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
      <StyledFileInput
        inputType={args.inputType}
        token={args.token}
        name={args.name}
        value={args.value}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        triggerValidation={args.triggerValidation}
        url={args.url}
        error={args.error}
        status={args.status}
        placeholder={args.placeholder}
        validation={args.validation}
        drawerInfo={args.drawerInfo}
        dividerTop={args.dividerTop}
        dividerBottom={args.dividerBottom}
        heading={args.heading}
        helperInfo={args.helperInfo}
      />
    );
  },
};

export const PrimaryHelper: Story = {
  name: "file (вспомогательная информация)",
  args: {
    inputType: "file",
    token: "token",
    name: "file",
    value: "",
    url: import.meta.env.VITE_SEND_FILE,
    placeholder: "Приложи документ",
    validation: "none",
    onChange: () => {},
    onImmediateChange: () => {},
    triggerValidation: () => {},

    // dividerTop: true,
    // dividerBottom: true,
    // heading: "Заголовок инпута",
    // error: "Ошибка!",
    // status: "warning",
    drawerInfo: {
      text: "Поясняющий текст, который может быть очень длинным, но не совсем уж очень сильно длинным, в общем 3 строки.",
      images: [
        "/client_marriator_front/mockImg/drawerImage.jpg",
        "/client_marriator_front/mockImg/drawerImage.jpg",
        "/client_marriator_front/mockImg/drawerImage.jpg",
        "/client_marriator_front/mockImg/drawerImage.jpg",
      ],
    },
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
      <StyledFileInput
        inputType={args.inputType}
        token={args.token}
        name={args.name}
        value={args.value}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        triggerValidation={args.triggerValidation}
        url={args.url}
        error={args.error}
        status={args.status}
        placeholder={args.placeholder}
        validation={args.validation}
        drawerInfo={args.drawerInfo}
        dividerTop={args.dividerTop}
        dividerBottom={args.dividerBottom}
        heading={args.heading}
        helperInfo={args.helperInfo}
      />
    );
  },
};

export const PrimaryDividers: Story = {
  name: "file (разделители)",
  args: {
    inputType: "file",
    token: "token",
    name: "file",
    value: "",
    url: import.meta.env.VITE_SEND_FILE,
    placeholder: "Приложи документ",
    validation: "none",
    onChange: () => {},
    onImmediateChange: () => {},
    triggerValidation: () => {},

    dividerTop: true,
    dividerBottom: true,
    // heading: "Заголовок инпута",
    // error: "Ошибка!",
    // status: "warning",
    drawerInfo: {
      text: "Поясняющий текст, который может быть очень длинным, но не совсем уж очень сильно длинным, в общем 3 строки.",
      images: [
        "/client_marriator_front/mockImg/drawerImage.jpg",
        "/client_marriator_front/mockImg/drawerImage.jpg",
        "/client_marriator_front/mockImg/drawerImage.jpg",
        "/client_marriator_front/mockImg/drawerImage.jpg",
      ],
    },
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
      <StyledFileInput
        inputType={args.inputType}
        token={args.token}
        name={args.name}
        value={args.value}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        triggerValidation={args.triggerValidation}
        url={args.url}
        error={args.error}
        status={args.status}
        placeholder={args.placeholder}
        validation={args.validation}
        drawerInfo={args.drawerInfo}
        dividerTop={args.dividerTop}
        dividerBottom={args.dividerBottom}
        heading={args.heading}
        helperInfo={args.helperInfo}
      />
    );
  },
};

export const PrimaryMoreInfo: Story = {
  name: "file (дополнительная информация)",
  args: {
    inputType: "file",
    token: "token",
    name: "file",
    value: "",
    url: import.meta.env.VITE_SEND_FILE,
    placeholder: "Приложи документ",
    validation: "none",
    onChange: () => {},
    onImmediateChange: () => {},
    triggerValidation: () => {},

    dividerTop: true,
    dividerBottom: true,
    // heading: "Заголовок инпута",
    // error: "Ошибка!",
    // status: "warning",
    drawerInfo: {
      text: "Поясняющий текст, который может быть очень длинным, но не совсем уж очень сильно длинным, в общем 3 строки.",
      images: [
        "/client_marriator_front/mockImg/drawerImage.jpg",
        "/client_marriator_front/mockImg/drawerImage.jpg",
        "/client_marriator_front/mockImg/drawerImage.jpg",
        "/client_marriator_front/mockImg/drawerImage.jpg",
      ],
    },
    helperInfo: {
      text: "Текст и ",
      link: {
        type: "external",
        path: "https://www.google.com/",
        text: "cсылка",
      },
    },
    moreInfo: [
      {
        name: "Имя",
        value: "Андрей",
      },
      {
        name: "Фамилия",
        value: "Ястребцов",
      },
      {
        name: "Отчество",
        value: "Александрович",
      },
    ],
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    function onChange(name: string, value: unknown) {
      updateArgs({ value });
    }

    return (
      <StyledFileInput
        inputType={args.inputType}
        token={args.token}
        name={args.name}
        value={args.value}
        onChange={onChange}
        onImmediateChange={args.onImmediateChange}
        triggerValidation={args.triggerValidation}
        url={args.url}
        error={args.error}
        status={args.status}
        placeholder={args.placeholder}
        validation={args.validation}
        drawerInfo={args.drawerInfo}
        dividerTop={args.dividerTop}
        dividerBottom={args.dividerBottom}
        heading={args.heading}
        helperInfo={args.helperInfo}
        moreInfo={args.moreInfo}
      />
    );
  },
};
