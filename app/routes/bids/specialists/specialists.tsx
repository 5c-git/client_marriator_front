import { useSubmit, redirect, useOutletContext } from "react-router";
import type { Route } from "./+types/specialists";
import type { SpecialistMobileViewInterface } from "./SpecialitstMobileView/SpecialistMobileViewInterface";
import type { GetBidSuccess } from "~/requests/_personal/getBid/getBidSuccess.schema";

import { useStore } from "~/store/store";

import { withLocale } from "~/shared/withLocale";

import { SpecialistInviteFormMobileView } from "./SpecialitstMobileView/SpecialistInviteFormMobileView";
import SpecialistStaticMobileView from "./SpecialitstMobileView/SpecialistStaticMobileView";

import { getSpecialistForBid } from "~/requests/_personal/getSpecialistForBid/getSpecialistForBid";
import { getRadiusSelect } from "~/requests/_personal/getRadiusSelect/getRadiusSelect";
import { postInvoiceBid } from "~/requests/_personal/postInvoiceBid/postInvoiceBid";
import { determineRole } from "~/shared/determineRole";

type MobileModeData = SpecialistMobileViewInterface & { mode: "mobile" };

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const mode = "mobile";

  let data;

  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    if (mode === "mobile") {
      const radiuses: MobileModeData["radiuses"] = [];
      const specialists: MobileModeData["specialists"] = [];

      const radiusData = await getRadiusSelect(accessToken);
      const specialistsData = await getSpecialistForBid(
        accessToken,
        params.bidId,
      );

      radiusData.data.forEach((item) => {
        radiuses.push({
          value: item.id.toString(),
          label: `${item.id.toString()} км`,
          disabled: false,
        });
      });

      specialistsData.data.forEach((item) => {
        specialists.push({
          id: item.id,
          phone: item.phone,
          email: item.email,
          logo: item.logo ? item.logo : "",
          roles: item.roles,
          radius: item.radius,
          name: item.name,
          age: item.age,
          country: item.country,
          viewActivities: item.viewActivities,
          status: 1,
        });
      });
      let startingRadius = 1;

      const defaultRadius = radiusData.data.find(
        (item) => item.default === true,
      );

      if (defaultRadius) {
        startingRadius = defaultRadius.id;
      }

      data = {
        mode,
        specialists,
        radiuses,
        startingRadius,
      } as MobileModeData;
    }

    return data as MobileModeData | { mode: "desktop" };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({
  params,
  request,
}: Route.ClientActionArgs) {
  const fields = await request.json();
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    await postInvoiceBid(accessToken, params.bidId, fields);
    throw redirect(withLocale(`/bids/${params.bidId}/specialists`));
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Specialists({ loaderData }: Route.ComponentProps) {
  const submit = useSubmit();

  const { bidMobileData } = useOutletContext<{
    bidMobileData: GetBidSuccess["data"];
    editMode: boolean;
  }>();

  return loaderData.mode === "mobile" ? (
    <>
      {bidMobileData.acceptingUsers.length === 0 ? (
        <SpecialistInviteFormMobileView
          specialists={loaderData.specialists}
          radiuses={loaderData.radiuses}
          startingRadius={loaderData.startingRadius}
          activeService={bidMobileData.viewActivity.name}
          submitAction={(values) => {
            submit(JSON.stringify(values), {
              method: "POST",
              encType: "application/json",
            });
          }}
        />
      ) : (
        <SpecialistStaticMobileView
          specialists={bidMobileData.acceptingUsers}
          activeService={bidMobileData.viewActivity.name}
          bid={{
            id: bidMobileData.id,
            dateStart: new Date(bidMobileData.dateStart),
            dateEnd: new Date(bidMobileData.dateEnd),
          }}
        />
      )}
    </>
  ) : null;
}
