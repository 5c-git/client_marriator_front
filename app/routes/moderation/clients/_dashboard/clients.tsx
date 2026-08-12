import type { Route } from "./+types/clients";
import { useParams } from "react-router";

import { UsersDashboardView } from "~/shared/views/UsersList/UsersDashboardView";
import { UserCard } from "~/shared/ui/UserPreview/UserCard";
import { UserCell } from "~/shared/ui/UserPreview/UserCell";

import { useStore } from "~/store/store";

import { withLocale } from "~/shared/withLocale";

import { clientsContainer } from "../clients.module";
import { clientsTokens } from "../clients.tokens";

export async function clientLoader() {
  return await clientsContainer
    .get(clientsTokens.clientsService)
    .getClientsMobileModeData();
}

export default function Clients({ loaderData }: Route.ComponentProps) {
  const view = useStore((state) => state.entitiesView);
  const setView = useStore((state) => state.setEntitiesView);

  const { user } = useParams();

  return (
    <UsersDashboardView
      translation="clients"
      users={loaderData.users}
      view={view}
      setView={setView}
      usersListView={(userData) => (
        <UserCard
          user={userData}
          to={withLocale(`/dashboard/moderation/clients/${userData.id}`)}
          isActive={user && Number(user) === userData.id ? true : false}
        />
      )}
      usersTableView={(userData) => (
        <UserCell
          user={userData}
          to={withLocale(`/dashboard/moderation/clients/${userData.id}`)}
          isActive={user && Number(user) === userData.id ? true : false}
        />
      )}
    />
  );
}
