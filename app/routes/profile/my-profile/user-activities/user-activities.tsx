import type { Route } from "./+types/user-activities";

import { UserActivitiesView } from "./_views/UserActivitiesView";
import { Loader } from "~/shared/ui/Loader/Loader";

import { userActivitiesContainer } from "./user-activities.module";
import { userActivitiesTokens } from "./user-activities.tokens";
import { useUserActivitiesHooks } from "./user-activities.hooks";
import { useAppHooks } from "~/shared/hooks/app.hooks";

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

  return await userActivitiesContainer
    .get(userActivitiesTokens.userActivitiesService)
    .saveFormFields(Number(step), fields);
}

export default function UserActivities({ loaderData }: Route.ComponentProps) {
  const { isLoading } = useAppHooks();
  const {
    step,
    control,
    setValue,
    trigger,
    errors,
    goBack,
    handleFormSubmit,
    handleFinishClick,
    submitFormFields,
  } = useUserActivitiesHooks(loaderData);

  return (
    <>
      {isLoading ? <Loader /> : null}

      <UserActivitiesView
        loaderData={loaderData}
        step={step}
        control={control}
        errors={errors}
        setValue={setValue}
        trigger={trigger}
        onBack={goBack}
        onFormSubmit={handleFormSubmit}
        onFinishClick={handleFinishClick}
        onFieldChange={submitFormFields}
      />
    </>
  );
}
