import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import schemaSuccess from "./postCheckPinSuccess.schema.json";
import schemaError from "./postCheckPinError.schema.json";

const Mock = () => <></>;

const meta = {
  title: "Сетевые запросы/Внутренние/postCheckPin",
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
          <h3>переменная: VITE_CHECK_PIN</h3>
          <h3>адрес: {import.meta.env.VITE_CHECK_PIN}</h3>

          <h2>Payload</h2>
          <DocBlock.Source
            language="json"
            code={JSON.stringify(
              {
                headers: {
                  Authorization: "Bearer ${accessToken}",
                },
                body: {
                  pin: "string",
                },
              },
              null,
              2
            )}
          />

          <h2>Response Success JSON Schema</h2>
          <DocBlock.Source
            language="json"
            code={JSON.stringify(schemaSuccess, null, 2)}
          />

          <h2>Response Error JSON Schema</h2>
          <DocBlock.Source
            language="json"
            code={JSON.stringify(schemaError, null, 2)}
          />
        </>
      ),
    },
  },
};
