import type { Route } from "./+types/managers";

import { withLocale } from "~/shared/withLocale";

import { UserLine } from "~/shared/ui/UserPreview/UserLine";
import { UsersListView } from "~/shared/views/UsersList/UsersListView";

import { managersContainer } from "./managers.module";
import { managersTokens } from "./managers.tokens";

export async function clientLoader() {
  return await managersContainer
    .get(managersTokens.managersService)
    .getManagersMobileModeData();
}

export default function Managers({ loaderData }: Route.ComponentProps) {
  return (
    <UsersListView
      translation="managers"
      users={loaderData.users}
      usersListView={(user) => (
        <UserLine
          user={user}
          to={withLocale(`/moderation/managers/${user.id}`)}
          isActive={false}
        />
      )}
      usersTableView={() => {}}
    />
  );
}
