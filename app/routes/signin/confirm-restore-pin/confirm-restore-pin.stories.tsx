import type { StoryObj, Meta } from "@storybook/react";
import * as DocBlock from "@storybook/blocks";

import { createRemixStub } from "@remix-run/testing";
// import { http, delay, HttpResponse } from "msw";

import СonfirmRestorePin from "./confirm-restore-pin";
import { json } from "@remix-run/react";

const meta = {
  title: "Страницы/Вход/Восстановление пин-кода",
  component: СonfirmRestorePin,
  tags: ["autodocs"],
  parameters: {
    layout: {
      padded: false,
    },
    docs: {
      page: () => (
        <>
          <DocBlock.Title />
          <h2>Адрес страницы: /signin/confirm-restore-pin</h2>
          <h3>Используемые запросы:</h3>
          <p>
            postStartRestorePin() - VITE_START_RESTORE_PIN -{" "}
            {import.meta.env.VITE_START_RESTORE_PIN}
          </p>
          <p>
            postCheckCodeRestore() - VITE_CHECK_CODE_RESTORE -{" "}
            {import.meta.env.VITE_CHECK_CODE_RESTORE}
          </p>
        </>
      ),
    },
  },
} satisfies Meta<typeof СonfirmRestorePin>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Страница",
  decorators: [
    (Story) => {
      const RemixStub = createRemixStub([
        {
          path: "/confirm-restore-pin",
          Component: Story,
          loader: async () => {
            return json({ ttl: 120 });
          },
          action: async () => {
            // const data = await postRegStep2({ test: "test" });
            // return data;

            return null;
          },
        },
      ]);

      return <RemixStub initialEntries={["/confirm-restore-pin"]} />;
    },
  ],
  parameters: {
    // msw: {
    //   handlers: [
    //     http.post(import.meta.env.VITE_GET_FORM, async () => {
    //       await delay(2000);
    //       return HttpResponse.json({
    //         status: "Success",
    //       });
    //     }),
    //   ],
    // },
  },
};
