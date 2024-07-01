import IndexRU from "../routes/_index/locales/ru.json";
import IndexEN from "../routes/_index/locales/en.json";

import RootErrorBoundryRU from "../routes/rootErrorBoundry/locales/ru.json";
import RootErrorBoundryEN from "../routes/rootErrorBoundry/locales/en.json";

import PhoneRU from "../routes/signin/phone/locales/ru.json";
import PhoneEN from "../routes/signin/phone/locales/en.json";

import SmsRU from "../routes/signin/sms/locales/ru.json";
import SmsEN from "../routes/signin/sms/locales/en.json";

import CreatePinRU from "../routes/signin/createPin/locales/ru.json";
import CreatePinEN from "../routes/signin/createPin/locales/en.json";

import PinRU from "../routes/signin/pin/locales/ru.json";
import PinEN from "../routes/signin/pin/locales/en.json";

// This is the list of languages your application supports
export const supportedLngs = ["ru", "en"];

// This is the language you want to use in case
// if the user language is not in the supportedLngs
export const fallbackLng = "ru";

export const resources = {
  ru: {
    translation: {
      Index: IndexRU,
      RootErrorBoundry: RootErrorBoundryRU,
      Phone: PhoneRU,
      Sms: SmsRU,
      Pin: PinRU,
      CreatePin: CreatePinRU,
    },
  },
  en: {
    translation: {
      Index: IndexEN,
      RootErrorBoundry: RootErrorBoundryEN,
      Phone: PhoneEN,
      Sms: SmsEN,
      Pin: PinEN,
      CreatePin: CreatePinEN,
    },
  },
};
