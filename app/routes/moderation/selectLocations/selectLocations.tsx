import type { Route } from "./+types/selectLocations";
import { withLocale } from "~/shared/withLocale";
import { redirect, useLocation, useNavigate, useSubmit } from "react-router";

import { selectLocationsContainer } from "./selectLocations.module";
import { selectLocationsTokens } from "./selectLocations.tokens";
import { SelectLocationsView } from "./_views/SelectLocationsView";

type LocationState = {
  from: string;
  status: string;
  statusColor: string;
};

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return await selectLocationsContainer
    .get(selectLocationsTokens.selectLocationsService)
    .getSelectLocationsData(Number(params.user));
}

export async function clientAction({
  params,
  request,
}: Route.ClientActionArgs) {
  const payload = await request.json();
  await selectLocationsContainer
    .get(selectLocationsTokens.selectLocationsService)
    .saveSelectedLocations(params.user, payload.locations);
  throw redirect(withLocale(payload.from));
}

export default function SelectLocations({ loaderData }: Route.ComponentProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const submit = useSubmit();

  const { state } = location as { state: LocationState };

  return (
    <SelectLocationsView
      data={loaderData}
      onBack={() => {
        navigate(withLocale(state.from), {
          viewTransition: true,
          state: {
            status: state.status,
            statusColor: state.statusColor,
          },
        });
      }}
      onSubmit={(values) => {
        submit(JSON.stringify({ from: state.from, locations: values }), {
          method: "POST",
          encType: "application/json",
        });
      }}
    />
  );
}
