import type { Route } from "./+types/profile";

import { ProfileView } from "./_views/ProfileView";
import { Loader } from "~/shared/ui/Loader/Loader";

import { useStore } from "~/store/store";

import { profileContainer } from "./profile.module";
import { profileTokens } from "./profile.tokens";
import { useAppHooks } from "~/shared/hooks/app.hooks";
import { useProfileHooks } from "./profile.hooks";


export async function clientLoader() {
  return await profileContainer.get(profileTokens.profileService).loadProfile();
}

export async function clientAction() {
  profileContainer.get(profileTokens.profileService).logout();
}

export default function Profile({ loaderData }: Route.ComponentProps) {
  const { isLoading } = useAppHooks();
  const { openDialog, openLogoutDialog, closeLogoutDialog, confirmLogout } =
    useProfileHooks();
  const userRole = useStore((state) => state.userRole);

  return (
    <>
      {isLoading ? <Loader /> : null}

      <ProfileView
        translation="profile"
        data={loaderData}
        userRole={userRole}
        openDialog={openDialog}
        onOpenLogoutDialog={openLogoutDialog}
        onCloseDialog={closeLogoutDialog}
        onConfirmLogout={confirmLogout}
      />
    </>
  );
}
