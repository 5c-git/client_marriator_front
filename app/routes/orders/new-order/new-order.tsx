import { useNavigation, useNavigate, useFetcher, redirect } from "react-router";
import type { Route } from "./+types/new-order";

import { withLocale } from "~/shared/withLocale";

import { Loader } from "~/shared/ui/Loader/Loader";
import OrderMobileView from "./_views/OrderMobileView";
import type { OrderMobileViewInterface } from "./_views/OrderMobileViewInterface";

import { useStore } from "~/store/store";

import { getOrder } from "~/requests/_personal/getOrder/getOrder";
import { getPlaceForOrder } from "~/requests/_personal/getPlaceForOrder/getPlaceForOrder";
import { postCreateOrder } from "~/requests/_personal/postCreateOrder/postCreateOrder";
import { postUpdateOrder } from "~/requests/_personal/postUpdateOrder/postUpdateOrder";
import { postDeleteOrderActivity } from "~/requests/_personal/postDeleteOrderActivity/postDeleteOrderActivity";
import { postCancelOrder } from "~/requests/_personal/postCancelOrder/postCancelOrder";
import { postSendOrder } from "~/requests/_personal/postSendOrder/postSendOrder";

type MobileModeData = {
  mode: "mobile";
  order: OrderMobileViewInterface["order"];
  options: OrderMobileViewInterface["options"];
};

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const mode = "mobile";

  const currentURL = new URL(request.url);
  const accessToken = useStore.getState().accessToken;
  const orderId = currentURL.searchParams.get("orderId");

  let data;

  if (accessToken) {
    if (mode === "mobile") {
      const order: MobileModeData["order"] = {
        id: "",
        place: {
          id: "",
          name: "",
          region: "",
        },
        selfEmployed: false,
        isNewOrder: true,
        orderServices: [],
      };

      const options: MobileModeData["options"] = [];

      if (orderId) {
        const orderData = await getOrder(accessToken, orderId);

        order.id = orderId;
        order.place.id = orderData.data.place.id.toString();
        order.place.name = orderData.data.place.name;
        order.place.region = orderData.data.place.region.name;
        order.selfEmployed = orderData.data.selfEmployed;
        order.isNewOrder = false;

        orderData.data.orderActivities.forEach((item) => {
          order.orderServices.push({
            id: item.id,
            count: item.count,
            name: item.viewActivity.name,
          });
        });
      }

      const optionsData = await getPlaceForOrder(accessToken);

      optionsData.data.forEach((item) => {
        options.push({
          value: item.id.toString(),
          label: `${item.name} ${item.region.name}`,
          disabled: false,
        });
      });

      data = {
        mode: "mobile",
        order,
        options,
      } as MobileModeData;
    }

    return data as MobileModeData | { mode: "desktop" };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const currentURL = new URL(request.url);

  const { _action, ...fields } = await request.json();

  const accessToken = useStore.getState().accessToken;

  const orderId = currentURL.searchParams.get("orderId");

  if (accessToken) {
    if (_action === "_create") {
      const order = await postCreateOrder(
        accessToken,
        fields.placeId,
        fields.selfEmployed,
      );
      currentURL.searchParams.set("orderId", order.data.id.toString());

      throw redirect(currentURL.toString());
    } else if (_action === "_update" && orderId) {
      await postUpdateOrder(
        accessToken,
        fields.placeId,
        Number(orderId),
        fields.selfEmployed,
      );
    } else if (_action === "_delete" && orderId) {
      await postDeleteOrderActivity(
        accessToken,
        orderId,
        fields.orderActivityId,
      );
    } else if (_action === "_cancel" && orderId) {
      await postCancelOrder(accessToken, orderId);
      throw redirect(withLocale("/"));
    } else if (_action === "_save" && orderId) {
      await postSendOrder(accessToken, orderId);
      throw redirect(withLocale("/"));
    }
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function NewAssignment({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const fetcher = useFetcher();

  return loaderData.mode === "mobile" ? (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <OrderMobileView
        translation="new-order"
        order={loaderData.order}
        options={loaderData.options}
        headerBackAction={() => {
          navigate(withLocale("/"), {
            viewTransition: true,
          });
        }}
        submitAction={(placeId, selfEmployed) => {
          if (loaderData.order.isNewOrder) {
            fetcher.submit(
              JSON.stringify({
                _action: "_create",
                placeId: placeId,
                selfEmployed: selfEmployed,
              }),
              {
                method: "POST",
                encType: "application/json",
              },
            );
          } else {
            fetcher.submit(
              JSON.stringify({
                _action: "_update",
                placeId: placeId,
                selfEmployed: selfEmployed,
                orderId: fetcher.data,
              }),
              {
                method: "POST",
                encType: "application/json",
              },
            );
          }
        }}
        cancelAction={() => {
          fetcher.submit(
            JSON.stringify({
              _action: "_cancel",
              orderId: loaderData.order.id,
            }),
            {
              method: "POST",
              encType: "application/json",
            },
          );
        }}
        saveAction={() => {
          fetcher.submit(
            JSON.stringify({
              _action: "_save",
              orderId: loaderData.order.id,
            }),
            {
              method: "POST",
              encType: "application/json",
            },
          );
        }}
        deleteAction={(serviceId) => {
          fetcher.submit(
            JSON.stringify({
              _action: "_delete",
              orderId: loaderData.order.id,
              orderActivityId: serviceId,
            }),
            {
              method: "POST",
              encType: "application/json",
            },
          );
        }}
      />
    </>
  ) : null;
}
