import { defineMain } from "@storybook/react-vite/node";

export default defineMain({
  framework: "@storybook/react-vite",
  staticDirs: [
    { from: "../public/client_marriator_front/mockImg/", to: "/mockImg/" },
  ],
  core: {
    builder: {
      name: "@storybook/builder-vite",
      options: {
        viteConfigPath: "vite.storybook.config.ts",
      },
    },
  },
  stories: ["../app/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "storybook-addon-remix-react-router",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
});
