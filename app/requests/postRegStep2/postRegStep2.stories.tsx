import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import successSchema from "./success.schema.json";

const Mock = () => <></>;

const meta = {
  title: "Сетевые запросы/Регистрация/ТЕСТОВЫЙ",
  component: Mock,
  tags: ["autodocs"],
} satisfies Meta<typeof Mock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  parameters: {
    docs: {
      page: () => (
        <>
          <DocBlock.Title />
          <DocBlock.Description />

          <h1>method: POST</h1>
          {/* <h3>переменная: VITE_REG_STEP_2</h3> */}
          {/* <h3>адрес: {import.meta.env.VITE_GET_FORM}</h3> */}

          <h2>Принимаемые парметры</h2>
          {/* <p>—</p> */}

          {/* <DocBlock.Source
            language="json"
            code={JSON.stringify(
              {
                urlSearchParams: {
                  login: "string",
                },
                body: {
                  JSON: {
                    field: "value",
                  },
                },
              },
              null,
              2
            )}
          /> */}

          <h2>Success JSON Schema (ВРЕМЕННАЯ НЕПОЛНАЯ)</h2>
          <DocBlock.Source
            language="json"
            code={JSON.stringify(successSchema, null, 2)}
          />
        </>
      ),
    },
  },
};
