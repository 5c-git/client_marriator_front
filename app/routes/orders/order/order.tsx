import { ComponentPropsWithoutRef, useState } from "react";
import {
  useNavigate,
  useFetcher,
  Link,
  redirect,
  useSubmit,
} from "react-router";

import type { Route } from "./+types/order";
import type { RequestSearchDrawerInterface } from "~/shared/views/RequestSearchDrawer/RequestSearchDrawerInterface";
import type { PostUpdateSearchPayload } from "~/api/_personal/postUpdateSearch/postUpdateSearch";

import { t, loadNamespaces } from "i18next";
import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import Box from "@mui/material/Box";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";

import { StyledRadioButton } from "~/shared/ui/StyledRadioButton/StyledRadioButton";
import { RadioSearchableDrawer } from "../../../shared/ui/RadioSearchableDrawer/RadioSearchableDrawer";
import { RequestSearchDrawer } from "~/shared/views/RequestSearchDrawer/RequestSearchDrawer";

import { EntityStaticMobileView } from "../../../shared/views/EntityMobileView/EntityStaticMobileView";
import { EntityEditMobileView } from "../../../shared/views/EntityMobileView/EntityEditMobileView";

import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import LogoutIcon from "@mui/icons-material/Logout";
import { RouteIcon } from "~/shared/icons/RouteIcon";

import { orderContainer } from "./order.module";
import { orderTokens } from "./order.tokens";

const ORDER_ACTIONS = {
  deleteActivity: "deleteActivity",
  transformAssignment: "transformAssignment",
  requestSearch: "requestSearch",
  updateSearchRequest: "updateSearchRequest",
  transformAssignmentToRequest: "transformAssignmentToRequest",
  acceptAssignment: "acceptAssignment",
  save: "save",
} as const;

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  await loadNamespaces("m_order");

  const orderService = orderContainer.get(orderTokens.orderService);
  const userRole = orderService.getUserRole();

  const order = await orderService.getOrder(params.orderId);
  let locations: {
    value: string;
    label: string;
    logo: string | null;
    disabled: boolean;
  }[] = [];
  let supervisorsToSelect: ComponentPropsWithoutRef<
    typeof StyledRadioButton
  >["options"] = [];

  if (order.acceptingPerson) {
    supervisorsToSelect.push({
      value: order.acceptingPerson.id.toString(),
      label: t("yourselfOption", { ns: "m_order" }),
      disabled: false,
    });
  }

  if (userRole === "manager" || userRole === "supervisor") {
    locations = await orderService.getLocationOptions();
  }

  if (userRole === "manager") {
    const supervisersOptions = await orderService.getSupervisorsOptions(
      params.orderId,
    );

    supervisorsToSelect = [...supervisorsToSelect, ...supervisersOptions];
  }

  return { order, locations, supervisorsToSelect, userRole };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const orderService = orderContainer.get(orderTokens.orderService);
  const { _action, ...fields } = await request.json();

  if (_action === ORDER_ACTIONS.deleteActivity) {
    await orderService.deleteActivity(fields.orderId, fields.orderActivityId);
  } else if (_action === ORDER_ACTIONS.transformAssignment) {
    const taskData = await orderService.convertToTask(
      fields.orderId,
      fields.responsibleId,
    );

    throw redirect(withLocale(`/tasks/${taskData.data.id}`));
  } else if (_action === ORDER_ACTIONS.requestSearch) {
    await orderService.makeSearchRequest(
      fields.orderId,
      fields.orderActivityId,
    );
  } else if (_action === ORDER_ACTIONS.updateSearchRequest) {
    await orderService.updateSearchRequest(fields.searchId, fields.payload);
  } else if (_action === ORDER_ACTIONS.transformAssignmentToRequest) {
    const bidData = await orderService.convertToBid(
      fields.orderId,
      fields.orderActivityId,
    );
    throw redirect(withLocale(`/bids/${bidData.data.id}`));
  } else if (_action === ORDER_ACTIONS.acceptAssignment) {
    await orderService.acceptOrder(fields.orderId);
  } else if (_action === ORDER_ACTIONS.save) {
    await orderService.saveOrder(fields.orderId);
  }
}

export default function Order({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const { t } = useTranslation("m_orders_order");

  const submit = useSubmit();
  const fetcher = useFetcher<RequestSearchDrawerInterface["entity"]>();

  const [editMode, setEditMode] = useState<boolean>(false);
  const [serviceToDelete, setServiceToDelete] = useState<{
    id: number;
    count: number;
    name: string;
  } | null>(null);

  const [searchSupervisors, setSearchSupervisors] = useState<boolean>(false);

  console.log(fetcher.data);

  return (
    <>
      {editMode ? (
        <EntityEditMobileView
          translation={"order"}
          entity={loaderData.order}
          headerBackAction={() => {
            navigate(withLocale("/orders"), {
              viewTransition: true,
            });
          }}
          serviceSlot={(service) => (
            <Box
              key={service.id}
              sx={(theme) => ({
                padding: "10px 14px",
                border: "1px solid",
                borderColor: theme.vars.palette["Grey_3"],
                borderRadius: "6px",
              })}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  columnGap: "10px",
                }}
              >
                <Box
                  component={Link}
                  to={withLocale(
                    `/orders/${loaderData.order.id}/service/${service.id}`,
                  )}
                  sx={{
                    display: "grid",
                    rowGap: "4px",
                    textDecoration: "none",
                  }}
                >
                  <Typography
                    component="p"
                    variant="Reg_16"
                    sx={(theme) => ({
                      color: theme.vars.palette["Black"],
                    })}
                  >
                    {service.name}
                  </Typography>
                  <Typography
                    component="p"
                    variant="Reg_12"
                    sx={(theme) => ({
                      color: theme.vars.palette["Grey_1"],
                    })}
                  >
                    {t("serviceAmount")} {service.count}
                  </Typography>
                </Box>

                <IconButton
                  sx={{
                    padding: 0,
                  }}
                  onClick={() => {
                    setServiceToDelete(service);
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </Box>
            </Box>
          )}
          actionSlot={() => (
            <>
              <Button
                component={Link}
                to={withLocale(`/orders/${loaderData.order.id}/service`)}
                variant="outlined"
                startIcon={<AddIcon />}
              >
                {t("serviceButton")}
              </Button>
              <Box
                sx={(theme) => ({
                  display: "flex",
                  rowGap: "14px",
                  position: "absolute",
                  width: "100%",
                  bottom: 0,
                  left: 0,
                  padding: "8px 16px",

                  zIndex: 2,
                  backgroundColor: theme.vars.palette["White"],
                })}
              >
                <Button
                  variant="text"
                  onClick={() => {
                    setEditMode(false);
                  }}
                >
                  {t("cancelButton")}
                </Button>
                <Button
                  component={Link}
                  to={withLocale(`/orders`)}
                  variant="contained"
                >
                  {t("sendButton")}
                </Button>
              </Box>
            </>
          )}
        />
      ) : (
        <EntityStaticMobileView
          translation={"order"}
          entity={loaderData.order}
          headerBackAction={() => {
            navigate(withLocale("/orders"), {
              viewTransition: true,
            });
          }}
          {...(loaderData.userRole === "client" &&
          (loaderData.order.status === 1 || loaderData.order.status === 2)
            ? {
                headerButtonAction: () => {
                  setEditMode(true);
                },
              }
            : null)}
          serviceSlot={(service) => (
            <Box
              key={service.id}
              sx={(theme) => ({
                padding: "10px 14px",
                border: "1px solid",
                borderColor: theme.vars.palette["Grey_3"],
                borderRadius: "6px",
              })}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  columnGap: "10px",
                }}
              >
                <Box
                  component={Link}
                  to={withLocale(
                    `/orders/${loaderData.order.id}/service/${service.id}`,
                  )}
                  sx={{
                    display: "grid",
                    rowGap: "4px",
                    textDecoration: "none",
                  }}
                >
                  <Typography
                    component="p"
                    variant="Reg_16"
                    sx={(theme) => ({
                      color: theme.vars.palette["Black"],
                    })}
                  >
                    {service.name}
                  </Typography>
                  <Typography
                    component="p"
                    variant="Reg_12"
                    sx={(theme) => ({
                      color: theme.vars.palette["Grey_1"],
                    })}
                  >
                    {t("serviceAmount")} {service.count}
                  </Typography>
                </Box>
              </Box>

              {service.route > 0 ? (
                <>
                  <Divider
                    sx={{
                      marginTop: "8px",
                      marginBottom: "8px",
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      columnGap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <RouteIcon
                      sx={(theme) => ({
                        color: theme.vars.palette["Grey_2"],
                        padding: "6px",
                        backgroundColor: theme.vars.palette["Grey_4"],
                        borderRadius: "4px",
                      })}
                    />
                    <Typography
                      component="p"
                      variant="Reg_12"
                      sx={(theme) => ({
                        color: theme.vars.palette["Black"],
                      })}
                    >
                      {t("route", { count: service.route })}
                    </Typography>
                  </Box>
                </>
              ) : null}

              {(loaderData.userRole === "manager" ||
                loaderData.userRole === "supervisor") &&
              loaderData.order.status === 3 &&
              service.buttonBidNeed ? (
                <Button
                  variant="contained"
                  sx={{
                    marginTop: "8px",
                  }}
                  startIcon={<CheckIcon />}
                  onClick={() => {
                    submit(
                      JSON.stringify({
                        _action: ORDER_ACTIONS.transformAssignmentToRequest,
                        orderId: loaderData.order.id,
                        orderActivityId: service.id,
                      }),
                      {
                        method: "POST",
                        encType: "application/json",
                      },
                    );
                  }}
                >
                  {t("convertToBid")}
                </Button>
              ) : null}

              {(loaderData.userRole === "manager" ||
                loaderData.userRole === "supervisor") &&
              service.buttonSearchNeed ? (
                <Button
                  variant="contained"
                  sx={{
                    flexDirection: "column",
                    marginTop: "8px",
                  }}
                  onClick={() => {
                    fetcher.submit(
                      JSON.stringify({
                        _action: ORDER_ACTIONS.requestSearch,
                        orderId: loaderData.order.id,
                        orderActivityId: service.id,
                      }),
                      {
                        method: "POST",
                        encType: "application/json",
                      },
                    );
                  }}
                >
                  {t("searchRequest")}{" "}
                  <span>
                    {t("searchRequestCount")}
                    {service.countSearch}
                  </span>
                </Button>
              ) : null}
            </Box>
          )}
          actionSlot={() => (
            <>
              {loaderData.userRole === "manager" &&
              loaderData.order.status === 3 ? (
                <Button
                  variant="contained"
                  sx={{
                    marginTop: "8px",
                  }}
                  startIcon={<CheckIcon />}
                  onClick={() => {
                    setSearchSupervisors(true);
                  }}
                >
                  {t("convertToTask")}
                </Button>
              ) : null}

              {(loaderData.userRole === "manager" &&
                loaderData.order.status === 2) ||
              (loaderData.userRole === "supervisor" &&
                loaderData.order.status === 2) ? (
                <Button
                  variant="contained"
                  sx={{
                    marginTop: "8px",
                  }}
                  startIcon={<CheckIcon />}
                  onClick={() => {
                    fetcher.submit(
                      JSON.stringify({
                        _action: ORDER_ACTIONS.acceptAssignment,
                        orderId: loaderData.order.id,
                      }),
                      {
                        method: "POST",
                        encType: "application/json",
                      },
                    );
                  }}
                >
                  {t("acceptButton")}
                </Button>
              ) : null}

              {loaderData.order.status === 1 ? (
                <Button
                  variant="contained"
                  onClick={() => {
                    fetcher.submit(
                      JSON.stringify({
                        _action: ORDER_ACTIONS.save,
                        orderId: loaderData.order.id,
                      }),
                      {
                        method: "POST",
                        encType: "application/json",
                      },
                    );
                  }}
                  startIcon={
                    <LogoutIcon
                      sx={{
                        transform: "rotate(-90deg)",
                      }}
                    />
                  }
                >
                  {t("saveButton")}
                </Button>
              ) : null}
            </>
          )}
        />
      )}
      {fetcher.data ? (
        <RequestSearchDrawer
          open={fetcher.data ? true : false}
          entity={fetcher.data}
          locations={loaderData.locations}
          submitAction={(values) => {
            const payload: PostUpdateSearchPayload = {
              place: values.place,
              activity: values.activity,
              amount: Number(values.amount),
              unitPrice: Number(values.unitPrice),
              radius: Number(values.radius),
              dateStart: values.dateStart.toISOString(),
              dateEnd: values.dateEnd.toISOString(),
              needDays: values.needDays,
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

            fetcher.submit(
              JSON.stringify({
                _action: ORDER_ACTIONS.updateSearchRequest,
                searchId: fetcher.data?.id,
                payload,
              }),
              {
                method: "POST",
                encType: "application/json",
              },
            );
          }}
          closeAction={() => {
            fetcher.reset();
          }}
        />
      ) : null}
      <RadioSearchableDrawer
        translation={"responsible"}
        open={searchSupervisors}
        onClose={() => {
          setSearchSupervisors(false);
        }}
        onSubmit={(selectedSupervisor) => {
          submit(
            JSON.stringify({
              _action: ORDER_ACTIONS.transformAssignment,
              orderId: loaderData.order.id,
              responsibleId: selectedSupervisor,
            }),
            {
              method: "POST",
              encType: "application/json",
            },
          );
        }}
        items={loaderData.supervisorsToSelect}
      />
      <Dialog
        open={serviceToDelete ? true : false}
        onClose={() => {
          setServiceToDelete(null);
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
          {t("dialog.title")}&nbsp;&quot;{serviceToDelete?.name}
          &quot;&nbsp;?
        </DialogTitle>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setServiceToDelete(null);
            }}
          >
            {t("dialog.no")}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              fetcher.submit(
                JSON.stringify({
                  _action: ORDER_ACTIONS.deleteActivity,
                  orderId: loaderData.order.id,
                  orderActivityId: serviceToDelete?.id,
                }),
                {
                  method: "POST",
                  encType: "application/json",
                },
              );
              setServiceToDelete(null);
            }}
          >
            {t("dialog.yes")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
