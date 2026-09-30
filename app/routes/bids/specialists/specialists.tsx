import {
  useSubmit,
  redirect,
  useOutletContext,
  useSearchParams,
} from "react-router";
import type { Route } from "./+types/specialists";
import type { GetBidSuccess } from "~/api/_personal/getBid/getBidSuccess.schema";

import { withLocale } from "~/shared/withLocale";

import { SpecialistsInviteFormMobileView } from "./SpecialitstsMobileView/SpecialistsInviteFormMobileView";
import { SpecialistsStaticMobileView } from "./SpecialitstsMobileView/SpecialistsStaticMobileView";

import { specialistsContainer } from "./specialists.module";
import { specialistsTokens } from "./specialists.tokens";

export async function clientLoader({
  request,
  params,
}: Route.ClientLoaderArgs) {
  const currentURL = new URL(request.url);
  const radius = currentURL.searchParams.get("radius");

  const specialistsService = specialistsContainer.get(
    specialistsTokens.specialistsService,
  );

  const specialists = await specialistsService.getSpecialists(
    params.bidId,
    radius ? radius : undefined,
  );
  const { radiusOptions, defaultRadius } =
    await specialistsService.getRadiusOptions();

  return { specialists, radiusOptions, defaultRadius };
}

export async function clientAction({
  params,
  request,
}: Route.ClientActionArgs) {
  const specialistsService = specialistsContainer.get(
    specialistsTokens.specialistsService,
  );

  const fields = await request.json();

  await specialistsService.invoiceBid(params.bidId, fields);
  throw redirect(withLocale(`/bids/${params.bidId}/specialists`));
}

export default function Specialists({ loaderData }: Route.ComponentProps) {
  const submit = useSubmit();

  const [searchParams, setSearchParams] = useSearchParams();

  const currentRadius = searchParams.get("radius");

  const { bidMobileData } = useOutletContext<{
    bidMobileData: GetBidSuccess["data"];
    editMode: boolean;
  }>();

  const startingRadius = currentRadius
    ? Number(currentRadius)
    : bidMobileData.radius
      ? bidMobileData.radius
      : loaderData.defaultRadius;

  const radiuses =
    loaderData.radiusOptions.find(
      (item) => Number(item.value) === startingRadius,
    ) === undefined
      ? [
          {
            value: startingRadius.toString(),
            label: `${startingRadius} км`,
            disabled: false,
          },
          ...loaderData.radiusOptions,
        ].sort((a, b) => Number(a.value) - Number(b.value))
      : loaderData.radiusOptions.sort(
          (a, b) => Number(a.value) - Number(b.value),
        );

  console.log(radiuses);

  return bidMobileData.acceptingUsers.length === 0 ? (
    <SpecialistsInviteFormMobileView
      specialists={loaderData.specialists}
      radiuses={radiuses}
      startingRadius={startingRadius}
      activeService={bidMobileData.viewActivity.name}
      submitAction={(values) => {
        submit(JSON.stringify(values), {
          method: "POST",
          encType: "application/json",
        });
      }}
      submitRadiusAction={(value) => {
        setSearchParams({ radius: value });
      }}
    />
  ) : (
    <SpecialistsStaticMobileView
      specialists={bidMobileData.acceptingUsers}
      activeService={bidMobileData.viewActivity.name}
      bid={{
        id: bidMobileData.id,
        dateStart: new Date(bidMobileData.dateStart),
        dateEnd: new Date(bidMobileData.dateEnd),
      }}
    />
  );
}
