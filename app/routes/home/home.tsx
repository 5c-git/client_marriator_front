import { redirect } from "react-router";

import { useStore } from "~/store/store";
import { withLocale } from "~/shared/withLocale";

export async function clientLoader() {
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const userRole = useStore.getState().userRole;

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
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function HomeIndex() {
  return <></>;
}
