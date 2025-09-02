import { HydratedRouter } from "react-router/dom";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

import i18next, { use } from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import HawkCatcher from "@hawk.so/javascript";

export const supportedLngs = ["ru", "en"];

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  // return;

  const { worker } = await import("./mockWorker/mockWorker");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({
    onUnhandledRequest: "bypass",
  });
}

export let hawk: HawkCatcher | null = null;
if (process.env.NODE_ENV !== "development") {
  hawk = new HawkCatcher({
    token: import.meta.env.VITE_HAWK_KEY,
    release: window.HAWK_RELEASE,
  });
}

async function hydrate() {
  await use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      supportedLngs,
      lng: "ru", // default language
      fallbackLng: "ru",
      ns: ["rootErrorBoundry", "constructorFields"],
      partialBundledLanguages: true,
      backend: {
        backends: [HttpBackend],
      },
    });

  enableMocking().then(() => {
    startTransition(() => {
      hydrateRoot(
        document,
        <I18nextProvider i18n={i18next}>
          <StrictMode>
            <HydratedRouter />
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
