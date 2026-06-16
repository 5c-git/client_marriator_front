import type { Route } from "./+types/requests";
import { useNavigate, useSubmit } from "react-router";

import { requestsContainer } from "./requests.module";
import { requestsTokens } from "./requests.tokens";

import { RequestsView } from "./_views/RequestsView";
import { withLocale } from "~/shared/withLocale";

export async function clientLoader() {
  return await requestsContainer
    .get(requestsTokens.requestsService)
    .getUserCompanies();
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const fields = await request.json();

  return await requestsContainer
    .get(requestsTokens.requestsService)
    .saveSelectedCompanies(fields);
}

export default function Requests({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const submit = useSubmit();

  return (
    <RequestsView
      backAction={() => {
        navigate(withLocale("/profile"));
      }}
      submitSelection={(values) => {
        const ids = values
          .filter((item) => item.value === true)
          .map((selected) => selected.label);

        console.log(ids);
        // submit(JSON.stringify(ids), {
        //   method: "POST",
        //   encType: "application/json",
        // });
      }}
      data={[
        { label: "Apple", value: false },
        { label: "Google", value: false },
        { label: "Microsoft", value: true },
      ]}
    />
  );
}
