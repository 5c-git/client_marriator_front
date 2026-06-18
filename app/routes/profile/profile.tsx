import type { Route } from "./+types/profile";

import { ProfileView } from "./_views/ProfileView";

import { profileContainer } from "./profile.module";
import { profileTokens } from "./profile.tokens";
import { useProfileHooks } from "./profile.hooks";

export async function clientLoader() {
  return await profileContainer.get(profileTokens.profileService).loadProfile();
}

export async function clientAction() {
  profileContainer.get(profileTokens.profileService).logout();
}

export default function Profile({ loaderData }: Route.ComponentProps) {
  const { openDialog, openLogoutDialog, closeLogoutDialog, confirmLogout } =
    useProfileHooks();

  return (
    <ProfileView
      data={loaderData}
      userRole={loaderData.userRole}
      openDialog={openDialog}
      onOpenLogoutDialog={openLogoutDialog}
      onCloseDialog={closeLogoutDialog}
      onConfirmLogout={confirmLogout}
    />
  );
}
