import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/client_marriator_front/" : "/",
  resolve: {
    tsconfigPaths: true,
  },
});
