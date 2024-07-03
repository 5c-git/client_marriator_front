import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import * as i18n from "./i18n/i18n";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  return;

  const { worker } = await import("./mockWorker/mockWorker");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({
    onUnhandledRequest: "bypass",
  });
}

async function hydrate() {
  // eslint-disable-next-line import/no-named-as-default-member
  await i18next
    .use(LanguageDetector) // Setup a client-side language detector
    .use(initReactI18next) // Tell i18next to use the react-i18next plugin
    .init({
      ...i18n, // spread the configuration
    });

  enableMocking().then(() => {
    startTransition(() => {
      hydrateRoot(
        document,
        <I18nextProvider i18n={i18next}>
          <StrictMode>
            <RemixBrowser />
          </StrictMode>
        </I18nextProvider>
      );
    });
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}
