import IndexRU from "../routes/_index/locales/ru.json";
import IndexEN from "../routes/_index/locales/en.json";

// This is the list of languages your application supports
export const supportedLngs = ["ru", "en"];

// This is the language you want to use in case
// if the user language is not in the supportedLngs
export const fallbackLng = "ru";

export const resources = {
  ru: {
    translation: {
      Index: IndexRU,
    },
  },
  en: {
    translation: {
      Index: IndexEN,
    },
  },
};
