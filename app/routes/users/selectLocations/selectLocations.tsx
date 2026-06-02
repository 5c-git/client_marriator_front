import type { Route } from "./+types/selectLocations";
import { withLocale } from "~/shared/withLocale";
import { redirect } from "react-router";

import {
  selectLocationsContainer,
} from "./selectLocations.module";
import { selectLocationsTokens } from "./selectLocations.tokens";
import {
  type SelectLocationsActionPayload,
  useSelectLocationsHooks,
} from "./selectLocations.hooks";
import { SelectLocationsView } from "./_views/SelectLocationsView";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return await selectLocationsContainer
    .get(selectLocationsTokens.selectLocationsService)
    .getSelectLocationsData(Number(params.user));
}

export async function clientAction({
  params,
  request,
}: Route.ClientActionArgs) {
  const payload = (await request.json()) as SelectLocationsActionPayload;
  const result = await selectLocationsContainer
    .get(selectLocationsTokens.selectLocationsService)
    .saveSelectedLocations(params.user, payload.locations);
  if (result.kind === "redirect") {
    throw redirect(withLocale(payload.from));
  }
}

export default function SelectLocations({ loaderData }: Route.ComponentProps) {
  const ui = useSelectLocationsHooks(loaderData);
  return <SelectLocationsView loaderData={loaderData} ui={ui} />;
}
