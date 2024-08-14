/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GET_FORM: string;
  readonly VITE_SAVE_FORM: string;
  readonly VITE_SEND_FILE: string;
  readonly VITE_SEND_PHOTO: string;
  readonly VITE_SEND_PHONE: string;
  readonly VITE_CHECK_CODE: string;
  readonly VITE_SET_USER_PIN: string;
  readonly VITE_REFRESH_TOKEN: string;
  readonly VITE_FINISH_REGISTER: string;
  readonly VITE_CHECK_PIN: string;
  readonly VITE_GET_USER_INFO: string;
  readonly VITE_GET_USER_PERSONAL_MENU: string;
  readonly VITE_GET_USER_FIELDS: string;
  readonly VITE_GET_STATIC_USER_INFO: string;
  readonly VITE_POST_SET_USER_EMAIL: string;
  readonly VITE_POST_CHECK_EMAIL_CODE: string;
  readonly VITE_START_RESTORE_PIN: string;
  readonly VITE_POST_CHECK_CODE_RESTORE: string;
  readonly VITE_POST_SAVE_USER_FIELDS: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
