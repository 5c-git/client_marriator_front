import { useNavigation, useNavigate } from "react-router";
import type { Route } from "./+types/terminate-a-deal";

import { withLocale } from "~/shared/withLocale";

import { TerminateADealView } from "./_views/TerminateADealView";
import type { CheckboxItem } from "./terminate-a-deal.hooks";
import { useTerminateADealHooks } from "./terminate-a-deal.hooks";
import { terminateADealContainer } from "./terminate-a-deal.module";
import { terminateADealTokens } from "./terminate-a-deal.tokens";

export async function clientLoader() {
  return await terminateADealContainer
    .get(terminateADealTokens.terminateADealService)
    .loadOrganizations();
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const fields = (await request.json()) as string[];
  await terminateADealContainer
    .get(terminateADealTokens.terminateADealService)
    .submitSelection(fields);
  return null;
}

export default function TerminateADeal({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const navigate = useNavigate();

  const typedLoaderData = loaderData as unknown as CheckboxItem[];
  const { defaultValues, submitSelection } = useTerminateADealHooks(
    typedLoaderData,
  );

  return (
    <TerminateADealView
      loaderData={typedLoaderData}
      isLoading={navigation.state !== "idle"}
      backAction={() => {
        navigate(withLocale("/profile/documents"), {
          viewTransition: true,
        });
      }}
      defaultValues={defaultValues}
      submitSelection={submitSelection}
    />
  );
}
