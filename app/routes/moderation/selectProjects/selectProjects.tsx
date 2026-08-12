import type { Route } from "./+types/selectProjects";
import { redirect, useLocation, useNavigate, useSubmit } from "react-router";

import { withLocale } from "~/shared/withLocale";

import { selectProjectsContainer } from "./selectProjects.module";
import { selectProjectsTokens } from "./selectProjects.tokens";

import { SelectProjectsView } from "./_views/SelectProjectsView";

type LocationState = {
  from: string;
  status: string;
  statusColor: string;
};

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return await selectProjectsContainer
    .get(selectProjectsTokens.selectProjectsService)
    .getSelectProjectsData(Number(params.user));
}

export async function clientAction({
  params,
  request,
}: Route.ClientActionArgs) {
  const payload = await request.json();
  await selectProjectsContainer
    .get(selectProjectsTokens.selectProjectsService)
    .saveSelectedProjects(params.user, payload.projects);
  throw redirect(withLocale(payload.from));
}

export default function SelectProjects({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const submit = useSubmit();
  const { state } = location as { state: LocationState };

  return (
    <SelectProjectsView
      data={loaderData}
      onBack={() => {
        // navigate(withLocale(state.from), {
        //   viewTransition: true,
        //   state: {
        //     status: state.status,
        //     statusColor: state.statusColor,
        //   },
        // });
        navigate(-1);
      }}
      onSubmit={(values) => {
        submit(JSON.stringify({ from: state.from, projects: values }), {
          method: "POST",
          encType: "application/json",
        });
      }}
    />
  );
}
