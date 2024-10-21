import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";
import { useArgs, useState } from "@storybook/preview-api";

import { TextField } from "@mui/material";

import { AvatarCheckbox } from "./AvatarCheckbox";

const meta = {
  title: "Общие компоненты/AvatarCheckbox",
  component: AvatarCheckbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => (
        <>
          <DocBlock.Title />
          <DocBlock.Description />
          <DocBlock.Canvas />
          <DocBlock.ArgTypes />
          <DocBlock.Stories />
        </>
      ),
    },
  },
} satisfies Meta<typeof AvatarCheckbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "AvatarCheckbox (базовый вид)",
  args: {
    onChange: () => {},
    checked: false,
    avatar: "/client_marriator_front/mockImg/avatar.jpg",
    header: "Иванов Сергей Николаевич",
    features: [
      {
        label: "Разнорабочий",
        active: false,
      },
      {
        label: "Грузчик",
        active: true,
      },
      {
        label: "Обработчик",
        active: false,
      },
    ],
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();

    return (
      <AvatarCheckbox
        onChange={(evt) => {
          updateArgs({ checked: evt.target.checked });
        }}
        checked={args.checked}
        avatar={args.avatar}
        header={args.header}
        features={args.features}
      />
    );
  },
};

export const PrimarySearch: Story = {
  name: "Демо-поиск",
  args: {
    onChange: () => {},
    checked: false,
    avatar: "/client_marriator_front/mockImg/avatar.jpg",
    header: "Иванов Сергей Николаевич",
    features: [
      {
        label: "Разнорабочий",
        active: false,
      },
      {
        label: "Грузчик",
        active: true,
      },
      {
        label: "Обработчик",
        active: false,
      },
    ],
  },
  render: function Render() {
    // const [, updateArgs] = useArgs();

    const data = [
      {
        avatar: "/client_marriator_front/mockImg/avatar.jpg",
        header: "Иванов Иван Иванович",
        features: [
          {
            label: "Разнорабочий",
            active: false,
          },
          {
            label: "Грузчик",
            active: true,
          },
          {
            label: "Обработчик",
            active: false,
          },
        ],
      },
      {
        avatar: "/client_marriator_front/mockImg/avatar.jpg",
        header: "Андреев Андрей Андреевич",
        features: [
          {
            label: "Разнорабочий",
            active: false,
          },
          {
            label: "Грузчик",
            active: true,
          },
          {
            label: "Обработчик",
            active: false,
          },
        ],
      },
      {
        avatar: "/client_marriator_front/mockImg/avatar.jpg",
        header: "Сергеев Сергей Сергеевич",
        features: [
          {
            label: "Разнорабочий",
            active: false,
          },
          {
            label: "Грузчик",
            active: true,
          },
          {
            label: "Обработчик",
            active: false,
          },
        ],
      },
      {
        avatar: "/client_marriator_front/mockImg/avatar.jpg",
        header: "Владимиров Владимир Владимирович",
        features: [
          {
            label: "Разнорабочий",
            active: false,
          },
          {
            label: "Грузчик",
            active: true,
          },
          {
            label: "Обработчик",
            active: false,
          },
        ],
      },
      {
        avatar: "/client_marriator_front/mockImg/avatar.jpg",
        header: "Дмитриев Дмитрий Дмитриевич",
        features: [
          {
            label: "Разнорабочий",
            active: false,
          },
          {
            label: "Грузчик",
            active: true,
          },
          {
            label: "Обработчик",
            active: false,
          },
        ],
      },
    ];

    const [activeData, setActiveData] = useState(data);

    const [value, setValue] = useState<string>("");

    return (
      <>
        <TextField
          value={value}
          placeholder="Поиск по ФИО чекбоксов"
          onChange={(evt) => {
            const currentFieldValue = new RegExp(`^${evt.target.value}`, "i");

            const patchedValues = [
              ...data.filter((item) => currentFieldValue.test(item.header)),
            ];

            console.log(patchedValues);

            //save patched array so we always have full current state
            setValue(evt.target.value);
            setActiveData(patchedValues);
          }}
        />

        {activeData.map((item) => (
          <AvatarCheckbox
            key={item.header}
            onChange={() => {}}
            checked={false}
            avatar={item.avatar}
            header={item.header}
            features={item.features}
          />
        ))}
      </>
    );
  },
};
