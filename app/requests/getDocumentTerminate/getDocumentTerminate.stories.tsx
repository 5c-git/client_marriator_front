import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import schema from "./getDocumentTerminateSuccess.schema.json";

const Mock = () => <></>;

const meta = {
  title: "Сетевые запросы/Внутренние/getDocumentTerminate",
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

          <h1>method: GET</h1>
          <h3>переменная: VITE_GET_DOCUMENT_TERMINATE</h3>
          <h3>адрес: {import.meta.env.VITE_GET_DOCUMENT_TERMINATE}</h3>

          <h2>Payload</h2>
          <DocBlock.Source
            language="json"
            code={JSON.stringify(
              {
                headers: {
                  Authorization: "Bearer ${accessToken}",
                },
              },
              null,
              2
            )}
          />

          <h2>Response JSON Schema</h2>
          <DocBlock.Source
            language="json"
            code={JSON.stringify(schema, null, 2)}
          />
        </>
      ),
    },
  },
};
