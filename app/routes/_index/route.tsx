import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { t, i18n } = useTranslation();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix and Storybook</h1>
      <h2>{t("Index.title")}</h2>
      {/* <h2>{t("Index.title")}</h2> */}

      <Link
        to={`/ru`}
        onClick={() => {
          i18n.changeLanguage("ru");
        }}
      >
        russian
      </Link>
      <div>-----------</div>
      <Link
        to={`/en`}
        onClick={() => {
          i18n.changeLanguage("en");
        }}
      >
        english
      </Link>
      <div>-----------</div>
      <Link to="registration/step1">Registration Step 1</Link>
    </div>
  );
}
