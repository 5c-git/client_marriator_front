import { useState } from "react";
import { useOutletContext, redirect, useSubmit } from "react-router";
import type { Route } from "./+types/bid";
import type { GetBidSuccess } from "~/api/_personal/getBid/getBidSuccess.schema";
import type { BidMobileViewInterface } from "./_views/BidMobileView/BidMobileViewInterface";
import type { postUpdateBidPayload } from "~/api/_personal/postUpdateBid/postUpdateBid";

import { useTranslation } from "react-i18next";

import { useStore } from "~/store/store";

import { statusCodeMap } from "~/shared/specialistStatus";

import { BidFormMobileView } from "./_views/BidMobileView/BidFormMobileView";
import { BidStaticMobileView } from "./_views/BidMobileView/BidStaticMobileView";

import { getPlaceForBid } from "~/api/_personal/getPlaceForBid/getPlaceForBid";
import { getRadiusSelect } from "~/api/_personal/getRadiusSelect/getRadiusSelect";
import { postUpdateBid } from "~/api/_personal/postUpdateBid/postUpdateBid";
import { postCancelBid } from "~/api/_personal/postCancelBid/postCancelBid";
import { getSettingsFromKey } from "~/api/_settings/getSettingsFromKey/getSettingsFromKey";

type MobileModeData = {
  mode: "mobile";
  locations: BidMobileViewInterface["locations"];
  radiuses: BidMobileViewInterface["radiuses"];
} & {
  defaultTimeRange: {
    start: Date;
    end: Date;
  };
};

export async function clientLoader() {
  const mode = "mobile";

  let data;

  const accessToken = useStore.getState().accessToken;

  const locations: MobileModeData["locations"] = [];

  const radiuses: MobileModeData["radiuses"] = [];

  if (accessToken) {
    const locationsData = await getPlaceForBid(accessToken);

    locationsData.data.forEach((item) => {
      locations.push({
        value: item.id.toString(),
        label: `${item.name} ${item.region.name}`,
        logo: item.logo,
        disabled: false,
      });
    });

    const radiusData = await getRadiusSelect(accessToken);

    radiusData.data.forEach((item) => {
      radiuses.push({
        value: item.value.toString(),
        label: item.value.toString(),
        // label: item.id.toString(),
        disabled: false,
      });
    });

    const intervalDayStart = await getSettingsFromKey(
      accessToken,
      "intervalDayStart",
    );
    const intervalDayEnd = await getSettingsFromKey(
      accessToken,
      "intervalDayEnd",
    );

    data = {
      mode,
      locations,
      radiuses,
      defaultTimeRange: {
        start: new Date(
          `2026-03-12T${intervalDayStart.data.value.startsWith("0") ? intervalDayStart.data.value : `0${intervalDayStart.data.value}`}:00`,
        ),
        end: new Date(`2026-03-12T${intervalDayEnd.data.value}:00`),
      },
    } as MobileModeData;
    return data as MobileModeData | { mode: "desktop" };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({
  request,
  params,
}: Route.ClientActionArgs) {
  const { _action, ...fields } = await request.json();

  const accessToken = useStore.getState().accessToken;
  const currentURL = new URL(request.url);

  if (accessToken) {
    if (_action === "update") {
      await postUpdateBid(accessToken, fields.payload);
      throw redirect(currentURL.toString());
    } else if (_action === "cancel") {
      await postCancelBid(accessToken, params.bidId);
      throw redirect(currentURL.toString());
    }
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Bid({ loaderData }: Route.ComponentProps) {
  const submit = useSubmit();
  const { t } = useTranslation("SpecialistMobileView");
  const { bidMobileData, editMode } = useOutletContext<{
    bidMobileData: GetBidSuccess["data"];
    editMode: boolean;
  }>();

  const [mobileEntity] = useState<
    BidMobileViewInterface["entity"] | null
  >(() => {
    if (loaderData.mode === "mobile") {
       return  {
        logo: bidMobileData.viewActivity.logo,
        status: bidMobileData.status,
        place: {
          id: bidMobileData.place.id,
          name: bidMobileData.place.name,
          logo: bidMobileData.place.logo,
        },
        project: {
          id: bidMobileData.project.id,
          name: bidMobileData.project.name,
        },
        activity: {
          id: bidMobileData.viewActivity.id,
          name: bidMobileData.viewActivity.name,
          travelling: bidMobileData.viewActivity.traveling,
        },
        unitPrice: bidMobileData.price ? bidMobileData.price : 0,
        finalPrice: bidMobileData.priceResult,
        radius: bidMobileData.radius ? bidMobileData.radius : 0,
        dateStart: new Date(bidMobileData.dateStart),
        dateEnd: new Date(bidMobileData.dateEnd),
        responsiblePerson: {
          id: bidMobileData.user.id,
          phone: bidMobileData.user.phone,
          email: bidMobileData.user.email,
          logo: bidMobileData.user.logo,
          roles: bidMobileData.user.roles,
        },
        taskId: bidMobileData.task ? bidMobileData.task.id : null,
        orderId: bidMobileData.order ? bidMobileData.order.id : null,
        selfEmployed: bidMobileData.selfEmployed,
        progress: (() => {
          const acceptedSpecialists = bidMobileData.acceptingUsers.filter(
            (specialist) => specialist.status === 5,
          );
          return (acceptedSpecialists.length / bidMobileData.count) * 100;
        })(),
        counters: (() => {
          const counters: BidMobileViewInterface["entity"]["counters"] = [];

          bidMobileData.statistic.forEach((item) => {
            counters.push({
              label: t(
                `status.${statusCodeMap[item.accepted as keyof typeof statusCodeMap].value}`,
              ),
              count: item.count,
              color:
                statusCodeMap[item.accepted as keyof typeof statusCodeMap]
                  .color,
            });
          });

          return counters;
        })(),
        amount: bidMobileData.count,
        // taxStatus: bidData.selfEmployed ? t("selfEmployed") : t("notSelfEmployed"),
        needDays: bidMobileData.dateActivity.length > 0,
        needFoto: bidMobileData.needFoto,
        days: (() => {
          const days: BidMobileViewInterface["entity"]["days"] = [];

          bidMobileData.dateActivity.forEach((date) => {
            const locations: BidMobileViewInterface["entity"]["days"][0]["locations"] =
              [];

            date.places.forEach((location) => {
              locations.push({
                id: location.id.toString(),
                name: location.name,
                logo: location.logo ? location.logo : "",
              });
            });

            days.push({
              timeStart: new Date(date.timeStart),
              timeEnd: new Date(date.timeEnd),
              needRoute: locations.length > 0 ? true : false,
              locations: locations,
            });
          });

          return days;
        })(),
        units: bidMobileData.viewActivity.standard.name,
        currency: "₽",
      };


    } else {
      return null
    }
  });

  return loaderData.mode === "mobile" ? (
    <>
      {mobileEntity ? (
        <>
          {editMode ? (
            <BidFormMobileView
              entity={mobileEntity}
              locations={loaderData.locations}
              radiuses={loaderData.radiuses}
              defaultTimeRange={bidMobileData.project.timeStart && bidMobileData.project.timeEnd ? { 
                start: new Date(`2026-03-12T${bidMobileData.project.timeStart.startsWith("0") ? bidMobileData.project.timeStart : `0${bidMobileData.project.timeStart}`}:00`),
                end: new Date(`2026-03-12T${bidMobileData.project.timeEnd.startsWith("0") ? bidMobileData.project.timeEnd : `0${bidMobileData.project.timeEnd}`}:00`)
              }:loaderData.defaultTimeRange}
              submitAction={(values) => {
                const payload: postUpdateBidPayload = {
                  bidId: bidMobileData.id,
                  radius: Number(values.radius),
                  price: Number(values.unitPrice),
                  viewActivityId: values.activity,
                  count: values.amount,
                  dateStart: values.dateStart.toISOString(),
                  dateEnd: values.dateEnd.toISOString(),
                  needFoto: values.needFoto,
                  ...(values.days &&
                    values.days.length > 0 && {
                      dateActivity: (() => {
                        const days: {
                          timeStart: string;
                          timeEnd: string;
                          placeIds?: number[];
                        }[] = [];

                        values.days?.forEach((day) => {
                          const places: number[] = [];

                          day.locations?.forEach((location) => {
                            places.push(Number(location.id));
                          });

                          days.push({
                            timeStart: new Date(day.timeStart).toISOString(),
                            timeEnd: new Date(day.timeEnd).toISOString(),
                            ...(places.length > 0 && { placeIds: places }),
                          });
                        });

                        return days;
                      })(),
                    }),
                };

                submit(
                  JSON.stringify({
                    _action: "update",
                    payload,
                  }),
                  {
                    method: "POST",
                    encType: "application/json",
                  },
                );
              }}
              cancelAction={() => {
                submit(
                  JSON.stringify({
                    _action: "cancel",
                  }),
                  {
                    method: "POST",
                    encType: "application/json",
                  },
                );
              }}
            />
          ) : (
            <BidStaticMobileView
              entity={mobileEntity}
              locations={loaderData.locations}
              radiuses={loaderData.radiuses}
              defaultTimeRange={bidMobileData.project.timeStart && bidMobileData.project.timeEnd ? { 
                start: new Date(`2026-03-12T${bidMobileData.project.timeStart.startsWith("0") ? bidMobileData.project.timeStart : `0${bidMobileData.project.timeStart}`}:00`),
                end: new Date(`2026-03-12T${bidMobileData.project.timeEnd.startsWith("0") ? bidMobileData.project.timeEnd : `0${bidMobileData.project.timeEnd}`}:00`)
              }:loaderData.defaultTimeRange}
            />
          )}
        </>
      ) : null}
    </>
  ) : null;
}
