/// <reference types="vite/client" />

import { string } from "yup";

interface ImportMetaEnv {
  readonly VITE_ASSET_PATH: string;
  readonly VITE_HAWK_KEY: string;
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
  readonly VITE_SET_USER_EMAIL: string;
  readonly VITE_CHECK_EMAIL_CODE: string;
  readonly VITE_START_RESTORE_PIN: string;
  readonly VITE_CHECK_CODE_RESTORE: string;
  readonly VITE_SAVE_USER_FIELDS: string;
  readonly VITE_SET_PERSONAL_USER_EMAIL: string;
  readonly VITE_CHANGE_USER_PHONE: string;
  readonly VITE_SEND_PERSONAL_PHOTO: string;
  readonly VITE_PERSONAL_CHECK_EMAIL_CODE: string;
  readonly VITE_CONFIRM_CHANGE_USER_PHONE: string;
  readonly VITE_GET_FORM_ACTIVITIES: string;
  readonly VITE_SAVE_USER_FIELDS_ACTIVITIES: string;
  readonly VITE_GET_REQUISITES_DATA: string;
  readonly VITE_SAVE_REQUISITES_DATA: string;
  readonly VITE_GET_BIK: string;
  readonly VITE_DELETE_REQUISITE: string;
  readonly VITE_YANDEX_GEO_KEY: string;
  readonly VITE_GET_MAP_FIELD: string;
  readonly VITE_POST_MAP_FIELD: string;
  readonly VITE_SETTINGS_FROM_KEY: string;
  readonly VITE_GET_DOCUMENT_SIGNED: string;
  readonly VITE_GET_DOCUMENT_CONCLUDE: string;
  readonly VITE_SET_CONCLUDE: string;
  readonly VITE_GET_DOCUMENT_TERMINATE: string;
  readonly VITE_SET_TERMINATE: string;
  readonly VITE_GET_DOCUMENT_ARCHIVE: string;
  readonly VITE_GET_DOCUMENTS_INQUIRIES: string;
  readonly VITE_GET_COMPANY_AND_CERTIFICATES_INQUIRIES: string;
  readonly VITE_REQUEST_INQUIRIES: string;
  readonly VITE_GET_MODERATION_CLIENT: string;
  readonly VITE_GET_USER_BY_HASH: string;
  readonly VITE_POST_CONFIRM_USER_REGISTER: string;
  readonly VITE_GET_BRAND: string;
  readonly VITE_POST_SET_BRAND_IMG: string;
  readonly VITE_GET_PLACE: string;
  readonly VITE_POST_SET_PLACE: string;
  readonly VITE_POST_DEL_PLACE: string;
  readonly VITE_POST_SET_USER_DATA: string;
  readonly VITE_GET_PROJECT: string;
  readonly VITE_GET_PLACE_MODERATION: string;
  readonly VITE_GET_MODERATION_SINGLE_CLIENT: string;
  readonly VITE_POST_DEL_PROJECT: string;
  readonly VITE_POST_SET_USER_IMG: string;
  readonly VITE_POST_SET_PROJECT: string;
  readonly VITE_POST_SET_PLACE_MODERATION: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
