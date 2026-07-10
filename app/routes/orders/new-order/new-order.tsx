import { useNavigate, useFetcher, redirect, useSubmit } from "react-router";
import type { Route } from "./+types/new-order";

import { withLocale } from "~/shared/withLocale";

import NewOrderMobileView from "./_views/NewOrderMobileView";
import type { NewOrderMobileViewInterface } from "./_views/NewOrderMobileViewInterface";

import { newOrderContainer } from "./new-order.module";
import { newOrderTokens } from "./new-order.tokens";

const NEW_ORDER_ACTIONS = {
  create: "create",
  update: "update",
  delete: "delete",
  cancel: "cancel",
  save: "save",
} as const;

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const newOrderService = newOrderContainer.get(newOrderTokens.newOrderService);
  const currentURL = new URL(request.url);
  const orderId = currentURL.searchParams.get("orderId");

  let order: NewOrderMobileViewInterface["order"] = {
    id: "",
    projectId: null,
    place: null,
    selfEmployed: false,
    isNewOrder: true,
    orderServices: [],
  };

  let projectOptions: NewOrderMobileViewInterface["projectOptions"] = [];
  let placesOptions: NewOrderMobileViewInterface["options"] = [];

  if (orderId) {
    order = await newOrderService.getOrder(orderId);
    projectOptions = await newOrderService.getProjectOptions(orderId);

    if (order.projectId) {
      placesOptions = await newOrderService.getPlaceOptions(orderId);
    }
  }

  return {
    order,
    placesOptions,
    projectOptions,
  };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const currentURL = new URL(request.url);
  const newOrderService = newOrderContainer.get(newOrderTokens.newOrderService);
  const { _action, ...fields } = await request.json();

  const orderId = currentURL.searchParams.get("orderId");

  if (_action === NEW_ORDER_ACTIONS.create) {
    const order = await newOrderService.createOrder(
      fields.placeId,
      fields.projectId,
      fields.selfEmployed,
    );
    currentURL.searchParams.set("orderId", order.data.id.toString());

    throw redirect(currentURL.toString());
  } else if (_action === NEW_ORDER_ACTIONS.update && orderId) {
    await newOrderService.updateOrder(fields);
  } else if (_action === NEW_ORDER_ACTIONS.delete && orderId) {
    await newOrderService.deleteActivity(orderId, fields.orderActivityId);
  } else if (_action === NEW_ORDER_ACTIONS.cancel && orderId) {
    await newOrderService.cancelOrder(orderId);
    throw redirect(withLocale("/"));
  } else if (_action === NEW_ORDER_ACTIONS.save && orderId) {
    await newOrderService.saveOrder(orderId);
    throw redirect(withLocale("/"));
  }
}

export default function NewOrder({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const submit = useSubmit();

  return (
    <NewOrderMobileView
      order={loaderData.order}
      options={loaderData.placesOptions}
      projectOptions={loaderData.projectOptions}
      headerBackAction={() => {
        navigate(withLocale("/"), {
          viewTransition: true,
        });
      }}
      submitAction={(placeId, projectId, selfEmployed) => {
        if (loaderData.order.isNewOrder) {
          fetcher.submit(
            JSON.stringify({
              _action: NEW_ORDER_ACTIONS.create,
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
              _action: NEW_ORDER_ACTIONS.update,
              selfEmployed: selfEmployed,
              orderId: loaderData.order.id,
              ...(projectId !== "" && { projectId: projectId }),
              ...(placeId !== "" && { placeId: placeId }),
            }),
            {
              method: "POST",
              encType: "application/json",
            },
          );
          console.log({
            _action: NEW_ORDER_ACTIONS.update,
            orderId: loaderData.order.id,
            selfEmployed: selfEmployed,
            ...(projectId !== "" && { projectId: projectId }),
            ...(placeId !== "" && { placeId: placeId }),
          });
        }
      }}
      cancelAction={() => {
        submit(
          JSON.stringify({
            _action: NEW_ORDER_ACTIONS.cancel,
            orderId: loaderData.order.id,
          }),
          {
            method: "POST",
            encType: "application/json",
          },
        );
      }}
      saveAction={() => {
        submit(
          JSON.stringify({
            _action: NEW_ORDER_ACTIONS.save,
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
            _action: NEW_ORDER_ACTIONS.delete,
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
  );
}
