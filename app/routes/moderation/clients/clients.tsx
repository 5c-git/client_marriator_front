import type { Route } from "./+types/clients";

import { UsersListView } from "~/shared/views/UsersList/UsersListView";
import { UserLine } from "~/shared/ui/UserPreview/UserLine";

import { withLocale } from "~/shared/withLocale";

import { clientsContainer } from "./clients.module";
import { clientsTokens } from "./clients.tokens";

export async function clientLoader() {
  return await clientsContainer
    .get(clientsTokens.clientsService)
    .getClientsMobileModeData();
}

export default function Clients({ loaderData }: Route.ComponentProps) {
  return (
    <UsersListView
      translation="clients"
      users={loaderData.users}
      usersListView={(user) => (
        <UserLine
          user={user}
          to={withLocale(`/moderation/clients/${user.id}`)}
          isActive={false}
        />
      )}
      usersTableView={() => {}}
    />
  );
}
