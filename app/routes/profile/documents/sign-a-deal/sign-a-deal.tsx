import { useNavigation, useNavigate } from "react-router";
import type { Route } from "./+types/sign-a-deal";

import { withLocale } from "~/shared/withLocale";

import { SignADealView } from "./_views/SignADealView";
import type { CheckboxItem } from "./sign-a-deal.hooks";
import { useSignADealHooks } from "./sign-a-deal.hooks";
import { signADealContainer } from "./sign-a-deal.module";
import { signADealTokens } from "./sign-a-deal.tokens";

export async function clientLoader() {
  return await signADealContainer
    .get(signADealTokens.signADealService)
    .loadOrganizations();
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const fields = (await request.json()) as string[];
  await signADealContainer
    .get(signADealTokens.signADealService)
    .submitSelection(fields);
  return null;
}

export default function SignADeal({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const navigate = useNavigate();

  const { defaultValues, submitSelection } = useSignADealHooks(loaderData);

  return (
    <SignADealView
      loaderData={loaderData}
      isLoading={navigation.state !== "idle"}
      backAction={() => {
        navigate(withLocale("/profile/documents"), {
          viewTransition: true,
        });
      }}
      defaultValues={defaultValues}
      submitSelection={(values) => {
        submitSelection(values);
      }}
    />
  );
}
