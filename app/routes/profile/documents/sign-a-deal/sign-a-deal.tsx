import { useNavigate, useSubmit } from "react-router";
import type { Route } from "./+types/sign-a-deal";

import { withLocale } from "~/shared/withLocale";

import { SignADealView } from "./_views/SignADealView";
import { signADealContainer } from "./sign-a-deal.module";
import { signADealTokens } from "./sign-a-deal.tokens";

export type CheckboxItem = { uuid: string; name: string };

export function generateDefaultValues(items: CheckboxItem[]) {
  const defaultValues: { [key: string]: boolean } = {};
  items.forEach((item) => {
    defaultValues[item.uuid] = false;
  });
  return defaultValues;
}

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
  const navigate = useNavigate();
  const submit = useSubmit();

  return (
    <SignADealView
      data={loaderData}
      backAction={() => {
        navigate(withLocale("/profile/documents"), {
          viewTransition: true,
        });
      }}
      defaultValues={generateDefaultValues(loaderData)}
      submitSelection={(values) => {
        const checkedValues: string[] = [];
        for (const key in values) {
          if (values[key] === true) checkedValues.push(key);
        }

        submit(JSON.stringify(checkedValues), {
          method: "POST",
          encType: "application/json",
        });
      }}
    />
  );
}
