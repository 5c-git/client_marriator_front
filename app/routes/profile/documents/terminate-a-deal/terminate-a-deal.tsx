import { useNavigate, useSubmit } from "react-router";
import type { Route } from "./+types/terminate-a-deal";

import { withLocale } from "~/shared/withLocale";

import { TerminateADealView } from "./_views/TerminateADealView";
import { terminateADealContainer } from "./terminate-a-deal.module";
import { terminateADealTokens } from "./terminate-a-deal.tokens";

export type CheckboxItem = { uuid: string; name: string };

export function generateDefaultValues(items: CheckboxItem[]) {
  const defaultValues: { [key: string]: boolean } = {};
  items.forEach((item) => {
    defaultValues[item.uuid] = false;
  });
  return defaultValues;
}

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
  const navigate = useNavigate();
  const submit = useSubmit();

  return (
    <TerminateADealView
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
