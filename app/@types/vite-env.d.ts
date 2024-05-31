/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REG_STEP_1: string;
  readonly VITE_REG_STEP_2: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
