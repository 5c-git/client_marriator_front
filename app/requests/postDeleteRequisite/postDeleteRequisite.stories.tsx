import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import schemaSuccess from "./postDeleteRequisiteSuccess.schema.json";

const Mock = () => <></>;

const meta = {
  title: "Сетевые запросы/Внутренние/postDeleteRequisite",
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
          <h3>переменная: VITE_DELETE_REQUISITE</h3>
          <h3>адрес: {import.meta.env.VITE_DELETE_REQUISITE}</h3>

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
                    dataId: "number",
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
            code={JSON.stringify(schemaSuccess, null, 2)}
          />
        </>
      ),
    },
  },
};
