import { useState } from "react";
import { useNavigation, useNavigate, redirect, useSubmit } from "react-router";
import type { Route } from "./+types/edit-service";
import { withLocale } from "~/shared/withLocale";

import { ServiceFormMobileView } from "~/shared/views/service/ServiceFormMobileView/ServiceFormMobileView";
import { ServiceStaticMobileView } from "~/shared/views/service/ServiceStaticMobileView/ServiceStaticMobileView";

import { useStore } from "~/store/store";

import type { postUpdateOrderActivityPayload } from "~/requests/_personal/postUpdateOrderActivity/postUpdateOrderActivity";
import type { ServiceMobileViewInterface } from "~/shared/views/service/ServiceMobileViewInterface";

import { getOrder } from "~/requests/_personal/getOrder/getOrder";
import { getViewActivitiesForOrder } from "~/requests/_personal/getViewActivitiesForOrder/getViewActivitiesForOrder";
import { getPlaceForOrder } from "~/requests/_personal/getPlaceForOrder/getPlaceForOrder";
import { postUpdateOrderActivity } from "~/requests/_personal/postUpdateOrderActivity/postUpdateOrderActivity";

type MobileModeData = Omit<
  ServiceMobileViewInterface,
  | "translation"
  | "locationsTranslation"
  | "headerBackAction"
  | "headerButtonAction"
  | "cancelAction"
  | "submitAction"
> & {
  mode: "mobile";
  orderId: string;
  orderActivityId: string;
  canEdit: boolean;
};

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const accessToken = useStore.getState().accessToken;
  const userRole = useStore.getState().userRole;

  const mode = "mobile";

  let data;

  if (accessToken) {
    if (mode === "mobile") {
      const activities: MobileModeData["activities"] = [];
      const locations: MobileModeData["locations"] = [];

      const orderData = await getOrder(accessToken, params.orderId);

      const activitiesData = await getViewActivitiesForOrder(
        accessToken,
        params.orderId
      );

      const locationsData = await getPlaceForOrder(accessToken);

      const service = orderData.data.orderActivities.find(
        (item) => item.id.toString() === params.activityId
      );

      if (service) {
        const entity: MobileModeData["entity"] = {
          id: service.viewActivity.id.toString(),
          name: service.viewActivity.name,
          amount: service.count.toString(),
          dateStart: new Date(service.dateStart),
          dateEnd: new Date(service.dateEnd),
          needDays: service.dateActivity.length > 0 ? true : false,
          needPhoto: service.needFoto,
          days: (() => {
            const days: MobileModeData["entity"]["days"] = [];

            service.dateActivity.forEach((item) => {
              const locations: MobileModeData["entity"]["days"][0]["locations"] =
                [];

              item.places.forEach((location) => {
                locations.push({
                  id: location.id.toString(),
                  name: location.name,
                  logo: location.logo ? location.logo : "",
                });
              });

              days.push({
                timeStart: new Date(item.timeStart),
                timeEnd: new Date(item.timeEnd),
                needRoute: locations.length > 0 ? true : false,
                locations: locations,
              });
            });

            return days;
          })(),
        };

        activitiesData.data.forEach((item) => {
          activities.push({
            value: item.id.toString(),
            label: item.detailName,
            needRoute: item.traveling,
            disabled: false,
          });
        });

        locationsData.data.forEach((item) => {
          locations.push({
            value: item.id.toString(),
            label: `${item.name} ${item.region.name}`,
            logo: item.logo,
            disabled: false,
          });
        });

        console.log(userRole === "client" && orderData.data.status === 1);

        data = {
          mode: "mobile",
          orderId: params.orderId,
          orderActivityId: params.activityId,
          canEdit:
            userRole === "client" && orderData.data.status === 1 ? true : false,
          logo: service.viewActivity.logo,
          entity,
          activities,
          locations,
        } as MobileModeData;
      } else {
        throw redirect(withLocale(`/orders/${params.orderId}`));
      }
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
    await postUpdateOrderActivity(accessToken, fields);
    throw redirect(withLocale(`/orders/${params.orderId}`));
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function EditService({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const submit = useSubmit();

  const [editMode, setEditMode] = useState<boolean>(false);

  return loaderData.mode === "mobile" ? (
    editMode ? (
      <ServiceFormMobileView
        translation="service"
        locationsTranslation="address"
        entity={loaderData.entity}
        activities={loaderData.activities}
        locations={loaderData.locations}
        headerBackAction={() => {
          navigate(withLocale(`/orders/${loaderData.orderId}`));
        }}
        cancelAction={() => {
          setEditMode(false);
        }}
        submitAction={(values) => {
          if (values.dateStart && values.dateEnd) {
            const payload: postUpdateOrderActivityPayload = {
              orderId: Number(loaderData.orderId),
              orderActivity: Number(loaderData.orderActivityId),
              viewActivityId: Number(values.activity),
              count: Number(values.amount),
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

            submit(JSON.stringify(payload), {
              method: "POST",
              encType: "application/json",
            });
          }
        }}
      />
    ) : (
      <ServiceStaticMobileView
        translation="service"
        locationsTranslation="address"
        logo={loaderData.logo}
        entity={loaderData.entity}
        activities={loaderData.activities}
        locations={loaderData.locations}
        headerBackAction={() => {
          navigate(-1);
        }}
        {...(loaderData.canEdit
          ? {
              headerButtonAction: () => {
                setEditMode(true);
              },
            }
          : null)}
      />
    )
  ) : null;
}
