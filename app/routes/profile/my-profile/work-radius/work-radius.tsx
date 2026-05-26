import type { Route } from "./+types/work-radius";

import { WorkRadiusView } from "./_views/WorkRadiusView";
import { Loader } from "~/shared/ui/Loader/Loader";

import { workRadiusContainer } from "./work-radius.module";
import { workRadiusTokens } from "./work-radius.tokens";
import { useWorkRadiusHooks } from "./work-radius.hooks";
import { useAppHooks } from "~/shared/hooks/app.hooks";

export async function clientLoader() {
  return await workRadiusContainer
    .get(workRadiusTokens.workRadiusService)
    .loadWorkRadiusData();
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const payload = await request.json();

  return await workRadiusContainer
    .get(workRadiusTokens.workRadiusService)
    .submitGeoData(payload);
}

export function shouldRevalidate({
  actionResult,
  defaultShouldRevalidate,
}: {
  actionResult: { [key: string]: string } | null;
  defaultShouldRevalidate: boolean;
}) {
  if (actionResult) {
    return false;
  }
  return defaultShouldRevalidate;
}

export default function WorkRadius({ loaderData }: Route.ComponentProps) {
  const { navigateTo } = useAppHooks();
  const {
    control,
    isLoading,
    isMapGrayscale,
    fetcherError,
    debouncedTextFieldSubmit,
    debouncedRadiusFieldSubmit,
    resetFetcherError,
  } = useWorkRadiusHooks(loaderData);

  return (
    <>
      {isLoading ? <Loader /> : null}

      <WorkRadiusView
        control={control}
        isMapGrayscale={isMapGrayscale}
        fetcherError={fetcherError}
        onBack={() => {
          navigateTo("/profile/my-profile");
        }}
        onAddressChange={debouncedTextFieldSubmit}
        onRadiusChange={debouncedRadiusFieldSubmit}
        onSnackbarClose={resetFetcherError}
      />
    </>
  );
}
