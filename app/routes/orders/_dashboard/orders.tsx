import {
  useFetcher,
  useSubmit,
  useNavigate,
  useParams,
  redirect,
} from "react-router";
import { useState } from "react";
import type { Route } from "./+types/orders";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { useStore } from "~/store/store";

import { DashboardHeader } from "~/shared/ui/DashboardHeader/DashboardHeader";
import { DashboardView } from "~/shared/views/EntitiesList/DashboardView";

import { EntityCard } from "~/shared/ui/EntityCard/EntityCard";
import { EntityCell } from "~/shared/ui/EntityCell/EntityCell";

import { Button, Dialog, DialogActions, DialogTitle, Fab } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { newOrderContainer } from "../new-order/new-order.module";
import { newOrderTokens } from "../new-order/new-order.tokens";

import { ordersContainer } from "../orders.module";
import { ordersTokens } from "../orders.tokens";

const ORDERS_ACTIONS = {
  repeat: "repeat",
  cancel: "cancel",
  create: "create",
} as const;

export async function clientLoader() {
  const ordersService = ordersContainer.get(ordersTokens.ordersService);

  const orders = await ordersService.getOrders();
  const intervals = await ordersService.getUserIntervals();
  const userRole = ordersService.getUserRole();

  return {
    orders,
    intervals,
    userRole,
  };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const ordersService = ordersContainer.get(ordersTokens.ordersService);
  const newOrderService = newOrderContainer.get(newOrderTokens.newOrderService);

  const { _action, ...fields } = await request.json();

  if (_action === ORDERS_ACTIONS.repeat) {
    await ordersService.repeatOrder(fields.orderId);
  } else if (_action === ORDERS_ACTIONS.cancel) {
    await ordersService.cancelOrder(fields.orderId);
  } else if (_action === ORDERS_ACTIONS.create) {
    const order = await newOrderService.createOrder(false);

    throw redirect(withLocale(`/dashboard/orders/new-order/${order.data.id}`));
  }
}

export default function Orders({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("m_orders");

  const navigate = useNavigate();
  const fetcher = useFetcher();
  const submit = useSubmit();

  const view = useStore((state) => state.entitiesView);
  const setView = useStore((state) => state.setEntitiesView);

  const [orderToAct, setOrderToAct] = useState<{
    action: "cancel" | "repeat";
    id: number;
  } | null>(null);

  const { orderId } = useParams();

  return (
    <>
      <DashboardHeader header={t("orders")} />

      <DashboardView
        translation="orders"
        view={view}
        setView={setView}
        entityType="order"
        entities={loaderData.orders}
        sorting="ascending"
        entityListView={(entity) => (
          <EntityCard
            key={entity.id}
            to={withLocale(`/dashboard/orders/${entity.id}`)}
            statusColor={entity.statusColor}
            isActive={orderId && Number(orderId) === entity.id ? true : false}
            header={`${t("cardHeader")} ${entity.header}`}
            subHeader={{
              text: entity.subHeader,
              bold: false,
            }}
            id={entity.id.toString()}
            address={entity.address}
            duration={entity.duration}
            divider
          />
        )}
        entityTableView={(entity) => (
          <EntityCell
            key={entity.id}
            to={withLocale(`/dashboard/orders/${entity.id}`)}
            id={entity.id.toString()}
            logo={entity.address.logo}
            name={entity.placeName}
            address={entity.address.text}
            isActive={orderId && Number(orderId) === entity.id ? true : false}
          />
        )}
        entityMapView={(entity) => {
          navigate(withLocale(`/dashboard/orders/${entity.id}`));
        }}
      />
      {(!orderId && view !== "map" && loaderData.userRole === "client") ||
      (loaderData.orders.length === 0 && loaderData.userRole === "client") ? (
        <Fab
          onClick={() => {
            submit(
              JSON.stringify({
                _action: ORDERS_ACTIONS.create,
              }),
              {
                method: "POST",
                encType: "application/json",
              },
            );
          }}
          color="Corp_1"
          aria-label="Create new order"
          sx={{
            position: "fixed",
            bottom: "60px",
            right: "16px",
            width: "60px",
            height: "60px",
            zIndex: 1,
          }}
        >
          <AddIcon
            sx={{
              fontSize: "2rem",
            }}
          />
        </Fab>
      ) : null}
      <Dialog
        open={orderToAct ? true : false}
        onClose={() => {
          setOrderToAct(null);
        }}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "8px",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "400",
            fontSize: "1.125rem",
          }}
        >
          {orderToAct
            ? `${t(`dialog.${orderToAct.action}`)} ${t("dialog.title")} ?`
            : null}
          {}
        </DialogTitle>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setOrderToAct(null);
            }}
          >
            {t("dialog.no")}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              fetcher.submit(
                JSON.stringify({
                  _action: orderToAct?.action,
                  orderId: orderToAct?.id,
                }),
                {
                  method: "POST",
                  encType: "application/json",
                },
              );
              setOrderToAct(null);
            }}
          >
            {t("dialog.yes")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
