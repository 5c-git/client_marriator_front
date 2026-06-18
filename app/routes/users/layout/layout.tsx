import type { Route } from "./+types/layout";

import { loadNamespaces } from "i18next";

import { useLocation } from "react-router";
import { useStore } from "~/store/store";

import { UsersLayoutView } from "./_views/UsersLayoutView";
import { usersLayoutContainer } from "./layout.module";
import { layoutTokens } from "./layout.tokens";

export async function clientLoader() {
  await loadNamespaces("moderationLayout");

  return {
    tabsMap: usersLayoutContainer
      .get(layoutTokens.usersLayoutService)
      .getTabsMap(),
  };
}

export default function UsersLayout({ loaderData }: Route.ComponentProps) {
  const location = useLocation();
  const userRole = useStore((state) => state.userRole);

  return (
    <UsersLayoutView
      tabs={loaderData.tabsMap[userRole]}
      pathname={location.pathname}
    />
  );
}
