import i18next from "i18next";

export const withLocale = (to: string): string => {
  const activeLocale = i18next.language;

  if (activeLocale !== "ru") {
    return `/${activeLocale}${to}`;
  }

  return to;
};
