// playwright.setup.ts
import { test as testBase } from "@playwright/test";
import { type AnyHandler } from "msw";
import { defineNetworkFixture, type NetworkFixture } from "@msw/playwright";

import { Login, LoginHandlers, userRoleHandlers } from "./tests/fixtures/Login";

interface Fixtures {
  handlers: Array<AnyHandler>;
  network: NetworkFixture;
  loginAs: (
    role: "admin" | "manager" | "supervisor" | "client" | "specialist",
  ) => Promise<void>;
}

export const test = testBase.extend<Fixtures>({
  // Initial list of the network handlers.
  handlers: [[], { option: true }],
  // A fixture you use to control the network in your tests.
  network: [
    async ({ context, handlers }, use) => {
      const network = defineNetworkFixture({
        context,
        handlers,
      });

      await network.enable();
      await use(network);
      await network.disable();
    },
    { auto: true },
  ],

  //custom fixtures
  loginAs: async ({ page, network }, use) => {
    network.use(...LoginHandlers);

    const loginFunc = async (
      role: "admin" | "manager" | "supervisor" | "client" | "specialist",
    ) => {
      const roleHandler = userRoleHandlers[role];

      network.use(roleHandler);

      const loginAs = new Login(page);
      await loginAs.login();
    };

    // Use the fixture value in the test.
    await use(loginFunc);
  },
});
