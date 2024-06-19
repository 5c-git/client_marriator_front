import IndexRU from "../routes/_index/locales/ru.json";

import PhoneRU from "../routes/signin/phone/locales/ru.json";

import "i18next";
declare module "i18next" {
  interface CustomTypeOptions {
    // custom resources type
    resources: {
      translation: {
        Index: typeof IndexRU;
        Phone: typeof PhoneRU;
      };
    };
  }
}
