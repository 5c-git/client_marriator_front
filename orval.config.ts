import { defineConfig } from "orval";

export default defineConfig({
  spec: {
    input: {
      target: "./petstore.yaml",
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
