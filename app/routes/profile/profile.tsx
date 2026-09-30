import type { Route } from "./+types/profile";

import { ProfileView } from "./_views/ProfileView";

import { profileContainer } from "./profile.module";
import { profileTokens } from "./profile.tokens";
import { useProfileHooks } from "./profile.hooks";

export const PROFILE_ACTIONS = {
  logout: "logout",
  changeRole: "changeRole",
} as const;

export async function clientLoader() {
  return await profileContainer.get(profileTokens.profileService).loadProfile();
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const { _action, ...fields } = await request.json();

  if (_action === PROFILE_ACTIONS.logout) {
    profileContainer.get(profileTokens.profileService).logout();
  } else if (_action === PROFILE_ACTIONS.changeRole) {
    profileContainer
      .get(profileTokens.profileService)
      .changeUserRole(fields.newRole);
  }
}

export default function Profile({ loaderData }: Route.ComponentProps) {
  const {
    openDialog,
    openLogoutDialog,
    closeLogoutDialog,
    confirmLogout,
    changeUserRole,
  } = useProfileHooks();

  return (
    <ProfileView
      data={loaderData}
      userRole={loaderData.userRole}
      openDialog={openDialog}
      onOpenLogoutDialog={openLogoutDialog}
      onCloseDialog={closeLogoutDialog}
      onConfirmLogout={confirmLogout}
      onUserRoleChange={changeUserRole}
    />
  );
}
