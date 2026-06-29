import { useFetcher, useNavigate, useSearchParams } from "react-router";
import type { Route } from "./+types/user-activities";

import { UserActivitiesView } from "./_views/UserActivitiesView";

import { userActivitiesContainer } from "./user-activities.module";
import { userActivitiesTokens } from "./user-activities.tokens";
import { withLocale } from "~/shared/withLocale";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const currentURL = new URL(request.url);
  const step = currentURL.searchParams.get("step");

  if (!step) {
    throw new Response("Параметр step не указан!", { status: 400 });
  }

  return await userActivitiesContainer
    .get(userActivitiesTokens.userActivitiesService)
    .loadFormActivities(Number(step));
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const currentURL = new URL(request.url);
  const fields = await request.json();
  const step = currentURL.searchParams.get("step");

  if (!step) {
    throw new Response("Параметр step не указан!", { status: 400 });
  }

  await userActivitiesContainer
    .get(userActivitiesTokens.userActivitiesService)
    .saveFormFields(Number(step), fields);
}

export default function UserActivities({ loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const stepParams = searchParams.get("step");
  const step = stepParams ? Number(stepParams) : 1;

  return (
    <UserActivitiesView
      data={loaderData}
      step={step}
      onBack={() => {
        if (step === 1) {
          navigate(withLocale("/profile/my-profile"));
        } else {
          setSearchParams((prev) => {
            prev.set("step", (step - 1).toString());
            return prev;
          });
        }
      }}
      onFormSubmit={() => {
        if (loaderData.formStatus === "allowedNewStep" && step !== 3) {
          setSearchParams((prev) => {
            prev.set("step", (step + 1).toString());
            return prev;
          });
        } else if (loaderData.formStatus === "allowedNewStep") {
          navigate(withLocale("/profile/my-profile"));
        }
      }}
      onFieldChange={(values) => {
        fetcher.submit(JSON.stringify(values), {
          method: "POST",
          encType: "application/json",
        });
      }}
    />
  );
}
