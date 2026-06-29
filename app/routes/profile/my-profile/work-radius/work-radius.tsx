import type { Route } from "./+types/work-radius";
import { useNavigate } from "react-router";

import { WorkRadiusView } from "./_views/WorkRadiusView";

import { workRadiusContainer } from "./work-radius.module";
import { workRadiusTokens } from "./work-radius.tokens";
import { useWorkRadiusHooks } from "./work-radius.hooks";
import { withLocale } from "~/shared/withLocale";

export async function clientLoader() {
  return await workRadiusContainer
    .get(workRadiusTokens.workRadiusService)
    .loadWorkRadiusData();
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const payload = await request.json();

  await workRadiusContainer
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
  const navigate = useNavigate();
  const hooks = useWorkRadiusHooks(loaderData);

  return (
    <WorkRadiusView
      form={hooks.form}
      isMapGrayscale={hooks.isMapGrayscale}
      fetcherError={hooks.fetcherError}
      onBack={() => {
        navigate(withLocale("/profile/my-profile"));
      }}
      onAddressChange={hooks.debouncedTextFieldSubmit}
      onRadiusChange={hooks.debouncedRadiusFieldSubmit}
      onSnackbarClose={hooks.resetFetcherError}
    />
  );
}
