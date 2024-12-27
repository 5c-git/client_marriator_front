import { ClientActionFunctionArgs, redirect } from "react-router";

// import { useTranslation } from "react-i18next";
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
  // const { t } = useTranslation("home");

  return (
    <>
      <p>home</p>
    </>
  );
}
