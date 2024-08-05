import i18next from "i18next";

export const withLocale = (to: string): string => {
  const activeLocale = i18next.language;
  const currentPath = window.location.pathname;

  if (activeLocale !== "ru") {
    if (to.startsWith("/")) {
      return `/${activeLocale}${to}`;
    } else {
      return `${currentPath}/${to}`;
    }
  }

  return to;
};
