import { defineConfig } from "orval";

export default defineConfig({
  spec: {
    input: {
      target: "./spec.yaml",
    },
    output: {
      mode: "tags-split",
      client: "fetch",
      target: "app/spec/api",
      schemas: {
        type: "zod",
        path: "app/spec/schemas",
      },
      override: {
        fetch: {
          runtimeValidation: true,
        },
      },
    },
  },
});
