import type { Route } from "./+types/selectProjects";
import { withLocale } from "~/shared/withLocale";
import { redirect } from "react-router";

import { selectProjectsContainer } from "./selectProjects.module";
import { selectProjectsTokens } from "./selectProjects.tokens";
import {
  type SelectProjectsActionPayload,
  useSelectProjectsHooks,
} from "./selectProjects.hooks";
import { SelectProjectsView } from "./_views/SelectProjectsView";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return await selectProjectsContainer
    .get(selectProjectsTokens.selectProjectsService)
    .getSelectProjectsData(Number(params.user));
}

export async function clientAction({
  params,
  request,
}: Route.ClientActionArgs) {
  const payload = (await request.json()) as SelectProjectsActionPayload;
  const result = await selectProjectsContainer
    .get(selectProjectsTokens.selectProjectsService)
    .saveSelectedProjects(params.user, payload.projects);
  if (result.kind === "redirect") {
    throw redirect(withLocale(payload.from));
  }
}

export default function SelectProjects({ loaderData }: Route.ComponentProps) {
  const ui = useSelectProjectsHooks(loaderData);
  return <SelectProjectsView loaderData={loaderData} ui={ui} />;
}
