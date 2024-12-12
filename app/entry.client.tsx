import { HydratedRouter } from "react-router/dom";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

import * as Sentry from "@sentry/react";

import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

export const supportedLngs = ["ru", "en"];

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
    .use(HttpBackend)
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

Sentry.init({
  dsn: "https://816fb007beea5e30d58ee8d9f36315c1@o4508450042740736.ingest.de.sentry.io/4508450158936144",
  integrations: [Sentry.replayIntegration()],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  tracesSampleRate: 1.0,
  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost"],
});

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}
