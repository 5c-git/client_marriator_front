import type { StoryObj, Meta } from "@storybook/react";

// import { useArgs } from "@storybook/preview-api";
import * as DocBlock from "@storybook/blocks";

// import { StyledInputText } from "./StyledInputText";

// import schema from "./StyledInputText.schema.json";

const Account = () => <></>;

// /**
//  * тип - text
//  * <p>Основан на https://primereact.org/inputtext/</p>
//  */
const meta = {
  title: "Общие компоненты/Поля ввода/account",
  component: Account,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => (
        <>
          <DocBlock.Title />
          <DocBlock.Description />
          <h2>WORK IN PROGRESS</h2>
          {/* <h2>JSON Schema</h2>
          <DocBlock.Source
            language="json"
            code={JSON.stringify(schema, null, 2)}
          /> */}
          {/* <DocBlock.Canvas />
          <DocBlock.ArgTypes />
          <DocBlock.Stories /> */}
        </>
      ),
    },
  },
} satisfies Meta<typeof Account>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "WIP",
  // args: {
  //   inputtype: "text",
  //   name: "text",
  //   value: "",
  //   placeholder: "Текстовое поле",
  //   validation: "none",
  //   onChange: () => {},
  // },
  // render: function Render(args) {
  //   const [, updateArgs] = useArgs();

  //   function onChange(evt: React.ChangeEvent<HTMLInputElement>) {
  //     updateArgs({ value: evt.target.value });
  //   }

  //   return (
  //     <StyledInputText
  //       inputtype="text"
  //       name={args.name}
  //       placeholder={args.placeholder}
  //       value={args.value}
  //       onChange={onChange}
  //       validation={args.validation}
  //     />
  //   );
  // },
};
