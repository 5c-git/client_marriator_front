import type { StoryObj, Meta } from "@storybook/react";

import { useArgs } from "@storybook/preview-api";
import * as DocBlock from "@storybook/blocks";

import { StyledFileInput } from "./StyledFileInput";

import schema from "./StyledFileInput.schema.json";
import schemaResponseSuccess from "./sendFile/sendFileSuccess.schema.json";
import schemaResponseError from "./sendFile/sendFileError.schema.json";

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

          <h2>JSON Schema (Ответ сервера - Успешная загрузка файлов)</h2>
          <DocBlock.Source
            language="json"
            code={JSON.stringify(schemaResponseSuccess, null, 2)}
          />

          <h2>JSON Schema (Ответ сервера - Ошибка загрузки файлов)</h2>
          <DocBlock.Source
            language="json"
            code={JSON.stringify(schemaResponseSuccess, null, 2)}
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
    inputtype: "file",
    name: "file",
    value: "",
    url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
    placeholder: "Приложи документ",
    validation: "none",
    onChange: () => {},
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
        inputtype={args.inputtype}
        name={args.name}
        value={args.value}
        onChange={onChange}
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

export const PrimaryNothing: Story = {
  name: "file (без доп информации)",
  args: {
    inputtype: "file",
    name: "file",
    value: "",
    url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
    placeholder: "Приложи документ",
    validation: "none",
    onChange: () => {},
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
        inputtype={args.inputtype}
        name={args.name}
        value={args.value}
        onChange={onChange}
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
    inputtype: "file",
    name: "file",
    value: "{Номер телефона} - {Наименование документа}.pdf",
    url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
    placeholder: "Приложи документ",
    validation: "none",
    onChange: () => {},
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
        inputtype={args.inputtype}
        name={args.name}
        value={args.value}
        onChange={onChange}
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
    inputtype: "file",
    name: "file",
    value: "",
    url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
    placeholder: "Приложи документ",
    validation: "none",
    onChange: () => {},
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
        inputtype={args.inputtype}
        name={args.name}
        value={args.value}
        onChange={onChange}
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
    inputtype: "file",
    name: "file",
    value: "",
    url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
    placeholder: "Приложи документ",
    validation: "none",
    onChange: () => {},
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
        inputtype={args.inputtype}
        name={args.name}
        value={args.value}
        onChange={onChange}
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
    inputtype: "file",
    name: "file",
    value: "",
    url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
    placeholder: "Приложи документ",
    validation: "none",
    onChange: () => {},
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
        inputtype={args.inputtype}
        name={args.name}
        value={args.value}
        onChange={onChange}
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
    inputtype: "file",
    name: "file",
    value: "",
    url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
    placeholder: "Приложи документ",
    validation: "none",
    onChange: () => {},
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
        inputtype={args.inputtype}
        name={args.name}
        value={args.value}
        onChange={onChange}
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
    inputtype: "file",
    name: "file",
    value: "",
    url: "http://preprod.marriator-api.fivecorners.ru/api/saveFile",
    placeholder: "Приложи документ",
    validation: "none",
    onChange: () => {},
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
        inputtype={args.inputtype}
        name={args.name}
        value={args.value}
        onChange={onChange}
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
