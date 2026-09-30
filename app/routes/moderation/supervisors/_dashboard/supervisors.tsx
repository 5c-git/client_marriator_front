import type { Route } from "./+types/supervisors";
import { useParams } from "react-router";

import { withLocale } from "~/shared/withLocale";

import { useStore } from "~/store/store";

import { UsersDashboardView } from "~/shared/views/UsersList/UsersDashboardView";
import { UserCard } from "~/shared/ui/UserPreview/UserCard";
import { UserCell } from "~/shared/ui/UserPreview/UserCell";

import { supervisorsContainer } from "../supervisors.module";
import { supervisorsTokens } from "../supervisors.tokens";

export async function clientLoader() {
  return await supervisorsContainer
    .get(supervisorsTokens.supervisorsService)
    .getSupervisorsMobileModeData();
}

export default function Supervisors({ loaderData }: Route.ComponentProps) {
  const view = useStore((state) => state.entitiesView);
  const setView = useStore((state) => state.setEntitiesView);

  const { user } = useParams();

  return (
    <UsersDashboardView
      translation="supervisors"
      users={loaderData.users}
      view={view}
      setView={setView}
      usersListView={(userData) => (
        <UserCard
          user={userData}
          to={withLocale(`/dashboard/moderation/supervisors/${userData.id}`)}
          isActive={user && Number(user) === userData.id ? true : false}
        />
      )}
      usersTableView={(userData) => (
        <UserCell
          user={userData}
          to={withLocale(`/dashboard/moderation/supervisors/${userData.id}`)}
          isActive={user && Number(user) === userData.id ? true : false}
        />
      )}
    />
  );
}
