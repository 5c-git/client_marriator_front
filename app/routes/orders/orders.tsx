import {
  Link,
  useOutletContext,
  useFetcher,
  useNavigation,
} from "react-router";
import { useState } from "react";

import type { Route } from "./+types/orders";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { statusCodeMap } from "~/shared/status";

import { useStore } from "~/store/store";
import {
  canCancelNewOrNotAccepted,
  canCancelAccepted,
  canRepeatCancelled,
} from "~/shared/buttonHelpers";

import { EntitiesListView } from "~/shared/views/EntitiesListView/EntitiesListView";
import type { EntitiesListViewInterface } from "~/shared/views/EntitiesListView/EntitesListViewInterface";

import { EntityCard } from "~/shared/ui/EntityCard/EntityCard";
import { Loader } from "~/shared/ui/Loader/Loader";

import { Button, Dialog, DialogActions, DialogTitle, Fab } from "@mui/material";

import LoopIcon from "@mui/icons-material/Loop";
import AddIcon from "@mui/icons-material/Add";

import { getOrders } from "~/requests/_personal/getOrders/getOrders";
import { postCancelOrder } from "~/requests/_personal/postCancelOrder/postCancelOrder";
import { postRepeatOrder } from "~/requests/_personal/postRepeatOrder/postRepeatOrder";

type MobileModeData = {
  mode: "mobile";
  assignments: EntitiesListViewInterface["entities"];
};

export async function clientLoader() {
  const mode = "mobile";

  let data;

  const accessToken = useStore.getState().accessToken;

  const assignments: EntitiesListViewInterface["entities"] = [];

  if (accessToken) {
    if (mode === "mobile") {
      const assignmentsData = await getOrders(accessToken);

      assignmentsData.data.forEach((item) => {
        const earliestStartDate: string[] = [];
        const latestEndDate: string[] = [];

        item.orderActivities.forEach((item) => {
          earliestStartDate.push(item.dateStart);
        });

        item.orderActivities.forEach((item) => {
          latestEndDate.push(item.dateEnd);
        });

        earliestStartDate.sort(
          (a, b) => new Date(a).valueOf() - new Date(b).valueOf(),
        );

        latestEndDate.sort(
          (a, b) => new Date(b).valueOf() - new Date(a).valueOf(),
        );

        assignments.push({
          id: item.id,
          userId: item.user.id,
          status: item.status,
          statusColor: statusCodeMap[item.status].color,
          header: item.orderActivities.length.toString(),
          subHeader: item.orderActivities
            .map((activity) => `${activity.viewActivity.name}`)
            .join(", "),
          address: {
            logo: `${import.meta.env.VITE_ASSET_PATH}${item.place.logo}`,
            text: item.place.address_kladr,
          },
          duration: {
            start: earliestStartDate.length > 0 ? earliestStartDate[0] : null,
            end: latestEndDate.length > 0 ? latestEndDate[0] : null,
          },
          coordinates: [
            Number(item.place.latitude),
            Number(item.place.longitude),
          ],
        });
      });

      data = {
        mode: "mobile",
        assignments: assignments,
      } as MobileModeData;
    }

    return data as MobileModeData | { mode: "desktop" };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const { _action, ...fields } = await request.json();

  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    if (_action === "repeat") {
      await postRepeatOrder(accessToken, fields.orderId);
    } else if (_action === "cancel") {
      await postCancelOrder(accessToken, fields.orderId);
    }
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Orders({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("orders");
  const navigation = useNavigation();
  const userRole = useStore.getState().userRole;
  const userId = useStore.getState().userId;

  const showMap = useOutletContext<boolean>();
  const fetcher = useFetcher();

  const [assignmentToAct, setAssignmentToAct] = useState<{
    action: "cancel" | "repeat";
    id: number;
  } | null>(null);

  return (
    <>
      {loaderData.mode === "mobile" ? (
        <>
          {navigation.state !== "idle" ? <Loader /> : null}{" "}
          <EntitiesListView
            translation="orders"
            mapView={showMap}
            entityType="order"
            entities={loaderData.assignments}
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
                canCancelNewOrNotAccepted(
                  userId ? userId : -1,
                  entity.userId,
                  entity.status,
                  entity.duration.start,
                )
                  ? {
                      buttonAction: {
                        action: () => {
                          setAssignmentToAct({
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
                canCancelAccepted(
                  userId ? userId : -1,
                  entity.userId,
                  entity.status,
                  entity.duration.end,
                )
                  ? {
                      buttonAction: {
                        action: () => {
                          setAssignmentToAct({
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
                canRepeatCancelled(
                  userId ? userId : -1,
                  entity.userId,
                  entity.status,
                  entity.duration.start,
                )
                  ? {
                      buttonAction: {
                        action: () => {
                          setAssignmentToAct({
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
                canCancelNewOrNotAccepted(
                  userId ? userId : -1,
                  entity.userId,
                  entity.status,
                  entity.duration.start,
                )
                  ? {
                      buttonAction: {
                        action: () => {
                          setAssignmentToAct({
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
                canCancelAccepted(
                  userId ? userId : -1,
                  entity.userId,
                  entity.status,
                  entity.duration.end,
                )
                  ? {
                      buttonAction: {
                        action: () => {
                          setAssignmentToAct({
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
                canRepeatCancelled(
                  userId ? userId : -1,
                  entity.userId,
                  entity.status,
                  entity.duration.start,
                )
                  ? {
                      buttonAction: {
                        action: () => {
                          setAssignmentToAct({
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
          {(!showMap && userRole === "client") ||
          (loaderData.assignments.length === 0 && userRole === "client") ? (
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
            open={assignmentToAct ? true : false}
            onClose={() => {
              setAssignmentToAct(null);
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
              {assignmentToAct
                ? `${t(`dialog.${assignmentToAct.action}`)} ${t("dialog.title")} ?`
                : null}
              {}
            </DialogTitle>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={() => {
                  setAssignmentToAct(null);
                }}
              >
                {t("dialog.no")}
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  fetcher.submit(
                    JSON.stringify({
                      _action: assignmentToAct?.action,
                      orderId: assignmentToAct?.id,
                    }),
                    {
                      method: "POST",
                      encType: "application/json",
                    },
                  );
                  setAssignmentToAct(null);
                }}
              >
                {t("dialog.yes")}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : null}
    </>
  );
}
