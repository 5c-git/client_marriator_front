import { redirect } from "react-router";

import { withLocale } from "~/shared/withLocale";

import { appContainer } from "~/shared/container/container";
import { appTokens } from "~/shared/container/container.tokens";

export async function clientLoader() {
  const appSerivce = appContainer.get(appTokens.appService);
  const userRole = appSerivce.getUserRole();

  if (userRole === "admin") {
    throw redirect(withLocale("/users"));
  } else if (
    userRole === "supervisor" ||
    userRole === "manager" ||
    userRole === "client"
  ) {
    throw redirect(withLocale("/orders"));
  } else if (userRole === "specialist") {
    throw redirect(withLocale("/jobs"));
  }
}

export default function HomeIndex() {
  return <></>;
}
