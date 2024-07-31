import { ClientActionFunctionArgs, redirect } from "@remix-run/react";

import i18next from "i18next";

const activeLocale = i18next.language;

export async function clientLoader({ request }: ClientActionFunctionArgs) {
  const currentURL = new URL(request.url);
  if (!currentURL.pathname.endsWith("/")) {
    throw redirect(`/${activeLocale}/`);
  }

  return null;
}

export default function Home() {
  return <p>home</p>;
}
