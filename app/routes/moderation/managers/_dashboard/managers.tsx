import type { Route } from "./+types/managers";
import { useParams } from "react-router";

import { withLocale } from "~/shared/withLocale";

import { useStore } from "~/store/store";

import { UsersDashboardView } from "~/shared/views/UsersList/UsersDashboardView";
import { UserCard } from "~/shared/ui/UserPreview/UserCard";
import { UserCell } from "~/shared/ui/UserPreview/UserCell";

import { managersContainer } from "../managers.module";
import { managersTokens } from "../managers.tokens";

export async function clientLoader() {
  return await managersContainer
    .get(managersTokens.managersService)
    .getManagersMobileModeData();
}

export default function Managers({ loaderData }: Route.ComponentProps) {
  const view = useStore((state) => state.entitiesView);
  const setView = useStore((state) => state.setEntitiesView);

  const { user } = useParams();
  return (
    <UsersDashboardView
      translation="managers"
      users={loaderData.users}
      view={view}
      setView={setView}
      usersListView={(userData) => (
        <UserCard
          user={userData}
          to={withLocale(`/dashboard/moderation/managers/${userData.id}`)}
          isActive={user && Number(user) === userData.id ? true : false}
        />
      )}
      usersTableView={(userData) => (
        <UserCell
          user={userData}
          to={withLocale(`/dashboard/moderation/managers/${userData.id}`)}
          isActive={user && Number(user) === userData.id ? true : false}
        />
      )}
    />
  );
}
