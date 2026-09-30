import { definePreview } from "@storybook/react-vite";

import { withRouter } from "storybook-addon-remix-react-router";

import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

import { theme } from "../app/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

i18next
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["ru", "en"],
    lng: "ru", // default language
    fallbackLng: "ru",
    ns: ["constructor", "rootErrorBoundry"],
    backend: {
      loadPath: "/client_marriator_front/locales/{{lng}}/{{ns}}.json",
      backends: [HttpBackend],
    },
  });

export default definePreview({
  addons: [],
  parameters: {},
  decorators: [
    withRouter,
    (Story) => (
      <I18nextProvider i18n={i18next}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Story />
        </ThemeProvider>
      </I18nextProvider>
    ),
  ],
});
