import { redirect } from "react-router";
import type { Route } from "./+types/recruiter";

import { withLocale } from "~/shared/withLocale";

import { RecruiterView } from "./_views/RecruiterView";
import { recruiterContainer } from "./recruiter.module";
import { recruiterTokens } from "./recruiter.tokens";
import { useRecruiterHooks } from "./recruiter.hooks";

export async function clientLoader() {
  const recruiterService = recruiterContainer.get(
    recruiterTokens.recruiterService,
  );

  return recruiterService.loadRecruiter();
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const fields = await request.json();
  const recruiterService = recruiterContainer.get(
    recruiterTokens.recruiterService,
  );

  await recruiterService.finishRegister(fields.name);
  throw redirect(withLocale("/signin/client/registration-complete"));
}

export default function Recruiter({ loaderData }: Route.ComponentProps) {
  const { finishRegister } = useRecruiterHooks();

  return (
    <RecruiterView data={loaderData} finishRegisterAction={finishRegister} />
  );
}
