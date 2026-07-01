import { useSubmit, redirect, useOutletContext } from "react-router";
import type { Route } from "./+types/specialists";
import type { GetBidSuccess } from "~/api/_personal/getBid/getBidSuccess.schema";

import { withLocale } from "~/shared/withLocale";

import { SpecialistsInviteFormMobileView } from "./SpecialitstsMobileView/SpecialistsInviteFormMobileView";
import { SpecialistsStaticMobileView } from "./SpecialitstsMobileView/SpecialistsStaticMobileView";

import { specialistsContainer } from "./specialists.module";
import { specialistsTokens } from "./specialists.tokens";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const specialistsService = specialistsContainer.get(
    specialistsTokens.specialistsService,
  );

  const specialists = await specialistsService.getSpecialists(params.bidId);
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

  const { bidMobileData } = useOutletContext<{
    bidMobileData: GetBidSuccess["data"];
    editMode: boolean;
  }>();

  return bidMobileData.acceptingUsers.length === 0 ? (
    <SpecialistsInviteFormMobileView
      specialists={loaderData.specialists}
      radiuses={loaderData.radiusOptions}
      startingRadius={loaderData.defaultRadius}
      activeService={bidMobileData.viewActivity.name}
      submitAction={(values) => {
        submit(JSON.stringify(values), {
          method: "POST",
          encType: "application/json",
        });
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
