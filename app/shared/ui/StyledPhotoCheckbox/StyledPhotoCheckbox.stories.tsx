import type { StoryObj, Meta } from "@storybook/react";

import { useArgs } from "@storybook/preview-api";
import * as DocBlock from "@storybook/blocks";

import { StyledPhotoCheckbox } from "./StyledPhotoCheckbox";

import schema from "./StyledPhotoCheckbox.schema.json";

/**
 * тип - photoCheckbox
 * <p>Основан на https://mui.com/material-ui/react-checkbox/</p>
 */
const meta = {
  title: "Общие компоненты/Поля ввода/photoCheckbox",
  component: StyledPhotoCheckbox,
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
} satisfies Meta<typeof StyledPhotoCheckbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "photoCheckbox (базовый вид)",
  args: {
    inputtype: "photoCheckbox",
    validation: "none",
    name: "radio",
    value: [],
    options: [
      {
        value: "summer",
        label: "лето",
        text: "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
        img: "/client_marriator_front/mockImg/stash.jpg",
        disabled: false,
        details: {
          text: "Название деятельности",
          img: "/client_marriator_front/mockImg/stash.jpg",
          link: {
            text: "Link",
            type: "external",
            path: "https://www.google.co.uk/",
          },
          details:
            "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
        },
      },
      {
        value: "winter",
        label: "Зима",
        text: "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
        img: "/client_marriator_front/mockImg/products.jpg",
        disabled: false,
        details: {
          text: "Название деятельности",
          img: "/client_marriator_front/mockImg/products.jpg",
          link: {
            text: "Link",
            type: "external",
            path: "https://www.google.co.uk/",
          },
          details:
            "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
        },
      },
    ],
    onChange: () => {},
    // error: "Ошибка!",

    // heading: "Заголовок раздела с радиокнопками",

    // helperInfo: {
    //   text: "Текст и ",
    //   link: {
    //     type: "external",
    //     path: "https://www.google.com/",
    //     text: "cсылка",
    //   },
    // },

    // dividerBottom: true,
    // dividerTop: true,
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <StyledPhotoCheckbox
        inputtype={args.inputtype}
        value={args.value}
        validation={args.validation}
        name={args.name}
        options={args.options}
        error={args.error}
        dividerBottom={args.dividerBottom}
        dividerTop={args.dividerTop}
        heading={args.heading}
        helperInfo={args.helperInfo}
        onChange={(values) => {
          updateArgs({ value: values });
        }}
      />
    );
  },
};

export const PrimarySelected: Story = {
  name: "photoCheckbox (выбранный пункт)",
  args: {
    inputtype: "photoCheckbox",
    name: "radio",
    value: ["winter"],
    validation: "none",
    options: [
      {
        value: "summer",
        label: "лето",
        text: "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
        img: "/client_marriator_front/mockImg/stash.jpg",
        disabled: false,
        details: {
          text: "Название деятельности",
          img: "/client_marriator_front/mockImg/stash.jpg",
          link: {
            text: "Link",
            type: "external",
            path: "https://www.google.co.uk/",
          },
          details:
            "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
        },
      },
      {
        value: "winter",
        label: "Зима",
        text: "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
        img: "/client_marriator_front/mockImg/products.jpg",
        disabled: false,
        details: {
          text: "Название деятельности",
          img: "/client_marriator_front/mockImg/products.jpg",
          link: {
            text: "Link",
            type: "external",
            path: "https://www.google.co.uk/",
          },
          details:
            "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
        },
      },
    ],
    onChange: () => {},
    // error: "Ошибка!",

    // heading: "Заголовок раздела с радиокнопками",

    // helperInfo: {
    //   text: "Текст и ",
    //   link: {
    //     type: "external",
    //     path: "https://www.google.com/",
    //     text: "cсылка",
    //   },
    // },

    // dividerBottom: true,
    // dividerTop: true,
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <StyledPhotoCheckbox
        inputtype={args.inputtype}
        value={args.value}
        name={args.name}
        validation={args.validation}
        options={args.options}
        error={args.error}
        dividerBottom={args.dividerBottom}
        dividerTop={args.dividerTop}
        heading={args.heading}
        helperInfo={args.helperInfo}
        onChange={(values) => {
          updateArgs({ value: values });
        }}
      />
    );
  },
};

export const PrimaryDisabled: Story = {
  name: "photoCheckbox (отключенный пункт)",
  args: {
    inputtype: "photoCheckbox",
    name: "radio",
    validation: "none",
    value: [],
    options: [
      {
        value: "summer",
        label: "лето",
        text: "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
        img: "/client_marriator_front/mockImg/stash.jpg",
        disabled: true,
        details: {
          text: "Название деятельности",
          img: "/client_marriator_front/mockImg/stash.jpg",
          link: {
            text: "Link",
            type: "external",
            path: "https://www.google.co.uk/",
          },
          details:
            "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
        },
      },
      {
        value: "winter",
        label: "Зима",
        text: "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
        img: "/client_marriator_front/mockImg/products.jpg",
        disabled: false,
        details: {
          text: "Название деятельности",
          img: "/client_marriator_front/mockImg/products.jpg",
          link: {
            text: "Link",
            type: "external",
            path: "https://www.google.co.uk/",
          },
          details:
            "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
        },
      },
    ],
    onChange: () => {},
    // error: "Ошибка!",

    // heading: "Заголовок раздела с радиокнопками",

    // helperInfo: {
    //   text: "Текст и ",
    //   link: {
    //     type: "external",
    //     path: "https://www.google.com/",
    //     text: "cсылка",
    //   },
    // },

    // dividerBottom: true,
    // dividerTop: true,
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <StyledPhotoCheckbox
        inputtype={args.inputtype}
        value={args.value}
        name={args.name}
        options={args.options}
        error={args.error}
        validation={args.validation}
        dividerBottom={args.dividerBottom}
        dividerTop={args.dividerTop}
        heading={args.heading}
        helperInfo={args.helperInfo}
        onChange={(values) => {
          updateArgs({ value: values });
        }}
      />
    );
  },
};

export const PrimaryError: Story = {
  name: "photoCheckbox (ошибка)",
  args: {
    inputtype: "photoCheckbox",
    name: "radio",
    value: [],
    validation: "none",
    options: [
      {
        value: "summer",
        label: "лето",
        text: "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
        img: "/client_marriator_front/mockImg/stash.jpg",
        disabled: false,
        details: {
          text: "Название деятельности",
          img: "/client_marriator_front/mockImg/stash.jpg",
          link: {
            text: "Link",
            type: "external",
            path: "https://www.google.co.uk/",
          },
          details:
            "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
        },
      },
      {
        value: "winter",
        label: "Зима",
        text: "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
        img: "/client_marriator_front/mockImg/products.jpg",
        disabled: false,
        details: {
          text: "Название деятельности",
          img: "/client_marriator_front/mockImg/products.jpg",
          link: {
            text: "Link",
            type: "external",
            path: "https://www.google.co.uk/",
          },
          details:
            "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
        },
      },
    ],
    onChange: () => {},
    error: "Ошибка!",

    // heading: "Заголовок раздела с радиокнопками",

    // helperInfo: {
    //   text: "Текст и ",
    //   link: {
    //     type: "external",
    //     path: "https://www.google.com/",
    //     text: "cсылка",
    //   },
    // },

    // dividerBottom: true,
    // dividerTop: true,
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <StyledPhotoCheckbox
        inputtype={args.inputtype}
        value={args.value}
        name={args.name}
        options={args.options}
        error={args.error}
        validation={args.validation}
        dividerBottom={args.dividerBottom}
        dividerTop={args.dividerTop}
        heading={args.heading}
        helperInfo={args.helperInfo}
        onChange={(values) => {
          updateArgs({ value: values });
        }}
      />
    );
  },
};

export const PrimaryHeading: Story = {
  name: "photoCheckbox (заголовок)",
  args: {
    inputtype: "photoCheckbox",
    name: "radio",
    value: [],
    validation: "none",
    options: [
      {
        value: "summer",
        label: "лето",
        text: "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
        img: "/client_marriator_front/mockImg/stash.jpg",
        disabled: false,
        details: {
          text: "Название деятельности",
          img: "/client_marriator_front/mockImg/stash.jpg",
          link: {
            text: "Link",
            type: "external",
            path: "https://www.google.co.uk/",
          },
          details:
            "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
        },
      },
      {
        value: "winter",
        label: "Зима",
        text: "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
        img: "/client_marriator_front/mockImg/products.jpg",
        disabled: false,
        details: {
          text: "Название деятельности",
          img: "/client_marriator_front/mockImg/products.jpg",
          link: {
            text: "Link",
            type: "external",
            path: "https://www.google.co.uk/",
          },
          details:
            "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
        },
      },
    ],
    onChange: () => {},
    // error: "Ошибка!",

    heading: "Заголовок раздела",

    // helperInfo: {
    //   text: "Текст и ",
    //   link: {
    //     type: "external",
    //     path: "https://www.google.com/",
    //     text: "cсылка",
    //   },
    // },

    // dividerBottom: true,
    // dividerTop: true,
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <StyledPhotoCheckbox
        inputtype={args.inputtype}
        value={args.value}
        name={args.name}
        options={args.options}
        error={args.error}
        validation={args.validation}
        dividerBottom={args.dividerBottom}
        dividerTop={args.dividerTop}
        heading={args.heading}
        helperInfo={args.helperInfo}
        onChange={(values) => {
          updateArgs({ value: values });
        }}
      />
    );
  },
};

export const PrimaryHelperInfo: Story = {
  name: "photoCheckbox (вспомогательная информация)",
  args: {
    inputtype: "photoCheckbox",
    name: "radio",
    value: [],
    validation: "none",
    options: [
      {
        value: "summer",
        label: "лето",
        text: "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
        img: "/client_marriator_front/mockImg/stash.jpg",
        disabled: false,
        details: {
          text: "Название деятельности",
          img: "/client_marriator_front/mockImg/stash.jpg",
          link: {
            text: "Link",
            type: "external",
            path: "https://www.google.co.uk/",
          },
          details:
            "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
        },
      },
      {
        value: "winter",
        label: "Зима",
        text: "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
        img: "/client_marriator_front/mockImg/products.jpg",
        disabled: false,
        details: {
          text: "Название деятельности",
          img: "/client_marriator_front/mockImg/products.jpg",
          link: {
            text: "Link",
            type: "external",
            path: "https://www.google.co.uk/",
          },
          details:
            "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
        },
      },
    ],
    onChange: () => {},
    // error: "Ошибка!",

    // heading: "Заголовок раздела",

    helperInfo: {
      text: "Текст и ",
      link: {
        type: "external",
        path: "https://www.google.com/",
        text: "cсылка",
      },
    },

    // dividerBottom: true,
    // dividerTop: true,
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <StyledPhotoCheckbox
        inputtype={args.inputtype}
        value={args.value}
        name={args.name}
        options={args.options}
        error={args.error}
        validation={args.validation}
        dividerBottom={args.dividerBottom}
        dividerTop={args.dividerTop}
        heading={args.heading}
        helperInfo={args.helperInfo}
        onChange={(values) => {
          updateArgs({ value: values });
        }}
      />
    );
  },
};

export const PrimaryDividers: Story = {
  name: "photoCheckbox (разделители)",
  args: {
    inputtype: "photoCheckbox",
    name: "radio",
    value: [],
    validation: "none",
    options: [
      {
        value: "summer",
        label: "лето",
        text: "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
        img: "/client_marriator_front/mockImg/stash.jpg",
        disabled: false,
        details: {
          text: "Название деятельности",
          img: "/client_marriator_front/mockImg/stash.jpg",
          link: {
            text: "Link",
            type: "external",
            path: "https://www.google.co.uk/",
          },
          details:
            "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
        },
      },
      {
        value: "winter",
        label: "Зима",
        text: "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
        img: "/client_marriator_front/mockImg/products.jpg",
        disabled: false,
        details: {
          text: "Название деятельности",
          img: "/client_marriator_front/mockImg/products.jpg",
          details:
            "Сложно сказать, почему средства индивидуальной защиты оказались бесполезны Сложно сказать, почему средства индивидуальной защиты оказались бесполезны",
        },
      },
    ],
    onChange: () => {},
    // error: "Ошибка!",

    heading: "Заголовок раздела",

    helperInfo: {
      text: "Текст и ",
      link: {
        type: "external",
        path: "https://www.google.com/",
        text: "cсылка",
      },
    },

    dividerBottom: true,
    dividerTop: true,
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <StyledPhotoCheckbox
        inputtype={args.inputtype}
        value={args.value}
        name={args.name}
        options={args.options}
        error={args.error}
        validation={args.validation}
        dividerBottom={args.dividerBottom}
        dividerTop={args.dividerTop}
        heading={args.heading}
        helperInfo={args.helperInfo}
        onChange={(values) => {
          updateArgs({ value: values });
        }}
      />
    );
  },
};
