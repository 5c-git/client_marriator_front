import { redirect, useNavigate } from "react-router";
import type { Route } from "./+types/location";

import { withLocale } from "~/shared/withLocale";

import { LocationView } from "./_views/LocationView";
import { locationContainer } from "./location.module";
import { locationTokens } from "./location.tokens";
import { useLocationHooks } from "./location.hooks";

export async function clientLoader() {
  const locationService = locationContainer.get(
    locationTokens.locationService,
  );

  return locationService.loadLocations();
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const shops = await request.json();
  const locationService = locationContainer.get(
    locationTokens.locationService,
  );

  await locationService.saveLocations(shops);

  throw redirect(withLocale("/signin/client/meta"));
}

export default function Location({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const { submitShops } = useLocationHooks();

  return (
      <LocationView
        translation="location"
        data={loaderData}
        backAction={() => {
          navigate(withLocale("/signin/client/meta"));
        }}
        submitShopsAction={submitShops}
      />
  );
}
