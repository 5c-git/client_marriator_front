/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GET_FORM: string;
  readonly VITE_SAVE_FORM: string;
  readonly VITE_SEND_FILE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
