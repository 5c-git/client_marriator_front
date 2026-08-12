import type { Route } from "./+types/supervisors";

import { withLocale } from "~/shared/withLocale";

import { UsersListView } from "~/shared/views/UsersList/UsersListView";
import { UserLine } from "~/shared/ui/UserPreview/UserLine";

import { supervisorsContainer } from "./supervisors.module";
import { supervisorsTokens } from "./supervisors.tokens";

export async function clientLoader() {
  return await supervisorsContainer
    .get(supervisorsTokens.supervisorsService)
    .getSupervisorsMobileModeData();
}

export default function Supervisors({ loaderData }: Route.ComponentProps) {
  return (
    <UsersListView
      translation="supervisors"
      users={loaderData.users}
      usersListView={(user) => (
        <UserLine
          user={user}
          to={withLocale(`/moderation/supervisors/${user.id}`)}
          isActive={false}
        />
      )}
      usersTableView={() => {}}
    />
  );
}
