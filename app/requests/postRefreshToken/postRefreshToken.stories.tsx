import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import responseSchemaSuccess from "./postRefreshTokenSuccess.schema.json";
import responseSchemaError from "./postRefreshTokenError.schema.json";

const Mock = () => <></>;

const meta = {
  title: "Сетевые запросы/Вход/refreshToken",
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
          <h3>переменная: VITE_REFRESH_TOKEN</h3>
          <h3>адрес: {import.meta.env.VITE_REFRESH_TOKEN}</h3>

          <h2>Payload</h2>
          <DocBlock.Source
            language="json"
            code={JSON.stringify(
              {
                body: {
                  JSON: {
                    refreshToken: "string",
                  },
                },
              },
              null,
              2
            )}
          />

          <h2>Response Success JSON Schema</h2>
          <DocBlock.Source
            language="json"
            code={JSON.stringify(responseSchemaSuccess, null, 2)}
          />

          <h2>Response Error JSON Schema</h2>
          <DocBlock.Source
            language="json"
            code={JSON.stringify(responseSchemaError, null, 2)}
          />
        </>
      ),
    },
  },
};
