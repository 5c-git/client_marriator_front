import { Link, useOutletContext, useFetcher } from "react-router";
import type { Route } from "./+types/orders";
import { useState } from "react";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { EntitiesListView } from "~/shared/views/EntitiesListView/EntitiesListView";

import { EntityCard } from "~/shared/ui/EntityCard/EntityCard";

import { Button, Dialog, DialogActions, DialogTitle, Fab } from "@mui/material";

import LoopIcon from "@mui/icons-material/Loop";
import AddIcon from "@mui/icons-material/Add";

import { ordersContainer } from "./orders.module";
import { ordersTokens } from "./orders.tokens";
import { ButtonActionMapper } from "~/shared/mappers/buttonActionMapper";

const ORDERS_ACTIONS = {
  repeat: "repeat",
  cancel: "cancel",
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

  const { _action, ...fields } = await request.json();

  if (_action === ORDERS_ACTIONS.repeat) {
    await ordersService.repeatOrder(fields.orderId);
  } else if (_action === ORDERS_ACTIONS.cancel) {
    await ordersService.cancelOrder(fields.orderId);
  }
}

export default function Orders({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("m_orders");

  const showMap = useOutletContext<boolean>();
  const fetcher = useFetcher();

  const [orderToAct, setOrderToAct] = useState<{
    action: "cancel" | "repeat";
    id: number;
  } | null>(null);

  return (
    <>
      <EntitiesListView
        translation="orders"
        mapView={showMap}
        entityType="order"
        entities={loaderData.orders}
        sorting="ascending"
        entityListView={(entity) => (
          <EntityCard
            key={entity.id}
            to={withLocale(`/orders/${entity.id}`)}
            statusColor={entity.statusColor}
            header={`${t("cardHeader")} ${entity.header}`}
            subHeader={{
              text: entity.subHeader,
              bold: false,
            }}
            id={entity.id.toString()}
            address={entity.address}
            duration={entity.duration}
            divider
            {...(entity.duration.start &&
            ButtonActionMapper.canCancelNewOrNotAccepted(
              loaderData.intervals.id,
              entity.userId,
              entity.status,
              loaderData.intervals.cancel_order_interval,
              entity.duration.start,
            )
              ? {
                  buttonAction: {
                    action: () => {
                      setOrderToAct({
                        action: "cancel",
                        id: entity.id,
                      });
                    },
                    text: t("cancelAssignmentButton"),
                    variant: "text",
                  },
                }
              : {})}
            {...(entity.duration.end &&
            ButtonActionMapper.canCancelAccepted(
              loaderData.intervals.id,
              entity.userId,
              entity.status,
              entity.duration.end,
            )
              ? {
                  buttonAction: {
                    action: () => {
                      setOrderToAct({
                        action: "cancel",
                        id: entity.id,
                      });
                    },
                    text: t("cancelAssignmentButton"),
                    variant: "text",
                  },
                }
              : {})}
            {...(entity.duration.start &&
            ButtonActionMapper.canRepeatCancelled(
              loaderData.intervals.id,
              entity.userId,
              entity.status,
              loaderData.intervals.repeat_order_interval,
              entity.duration.start,
            )
              ? {
                  buttonAction: {
                    action: () => {
                      setOrderToAct({
                        action: "repeat",
                        id: entity.id,
                      });
                    },
                    text: t("repeatAssignmentButton"),
                    variant: "contained",
                    icon: (
                      <LoopIcon
                        sx={{
                          transform: "rotate(90deg)",
                          marginRight: "8px",
                        }}
                      />
                    ),
                  },
                }
              : {})}
          />
        )}
        entityMapView={(entity) => (
          <EntityCard
            to={withLocale(`/orders/${entity.id}`)}
            header={`${t("cardHeader")} ${entity.header}`}
            subHeader={{
              text: entity.subHeader,
              bold: false,
            }}
            id={entity.id.toString()}
            address={entity.address}
            duration={entity.duration}
            divider
            {...(entity.duration.start &&
            ButtonActionMapper.canCancelNewOrNotAccepted(
              loaderData.intervals.id,
              entity.userId,
              entity.status,
              loaderData.intervals.cancel_order_interval,
              entity.duration.start,
            )
              ? {
                  buttonAction: {
                    action: () => {
                      setOrderToAct({
                        action: "cancel",
                        id: entity.id,
                      });
                    },
                    text: t("cancelAssignmentButton"),
                    variant: "text",
                  },
                }
              : null)}
            {...(entity.duration.end &&
            ButtonActionMapper.canCancelAccepted(
              loaderData.intervals.id,
              entity.userId,
              entity.status,
              entity.duration.end,
            )
              ? {
                  buttonAction: {
                    action: () => {
                      setOrderToAct({
                        action: "cancel",
                        id: entity.id,
                      });
                    },
                    text: t("cancelAssignmentButton"),
                    variant: "text",
                  },
                }
              : null)}
            {...(entity.duration.start &&
            ButtonActionMapper.canRepeatCancelled(
              loaderData.intervals.id,
              entity.userId,
              entity.status,
              loaderData.intervals.repeat_order_interval,
              entity.duration.start,
            )
              ? {
                  buttonAction: {
                    action: () => {
                      setOrderToAct({
                        action: "repeat",
                        id: entity.id,
                      });
                    },
                    text: t("repeatAssignmentButton"),
                    variant: "contained",
                    icon: (
                      <LoopIcon
                        sx={{
                          transform: "rotate(90deg)",
                          marginRight: "8px",
                        }}
                      />
                    ),
                  },
                }
              : null)}
          />
        )}
      />
      {(!showMap && loaderData.userRole === "client") ||
      (loaderData.orders.length === 0 && loaderData.userRole === "client") ? (
        <Fab
          component={Link}
          to={withLocale("/orders/new-order")}
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
