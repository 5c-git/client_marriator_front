import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import schema from "./postSetConcludeSuccess.schema.json";

const Mock = () => <></>;

const meta = {
  title: "Сетевые запросы/Внутренние/postSetConclude",
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
          <h3>ключ: VITE_SET_CONCLUDE</h3>
          <h3>адрес: {import.meta.env.VITE_SET_CONCLUDE}</h3>

          <h2>Payload</h2>
          <DocBlock.Source
            language="json"
            code={JSON.stringify(
              {
                headers: {
                  Authorization: "Bearer ${accessToken}",
                },
                body: {
                  JSON: {
                    uuid: "string[]",
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
            code={JSON.stringify(schema, null, 2)}
          />
        </>
      ),
    },
  },
};
