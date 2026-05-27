import type { Route } from "./+types/layout";

import { loadNamespaces } from "i18next";

import { Loader } from "~/shared/ui/Loader/Loader";

import { UsersLayoutView } from "./_views/UsersLayoutView";
import { usersLayoutContainer } from "./layout.module";
import { layoutTokens } from "./layout.tokens";
import { useUsersLayoutHooks } from "./layout.hooks";

export async function clientLoader() {
  await loadNamespaces("moderationLayout");

  return {
    tabsMap: usersLayoutContainer
      .get(layoutTokens.usersLayoutService)
      .getTabsMap(),
  };
}

export default function UsersLayout({ loaderData }: Route.ComponentProps) {
  const { userRole, pathname, isLoading } = useUsersLayoutHooks();

  return (
    <>
      {isLoading ? <Loader /> : null}

      <UsersLayoutView
        tabs={loaderData.tabsMap[userRole]}
        pathname={pathname}
      />
    </>
  );
}
