import { ComponentPropsWithoutRef, useState } from "react";
import {
  useNavigation,
  useNavigate,
  useFetcher,
  Link,
  redirect,
} from "react-router";

import type { Route } from "./+types/order";
import type { EntityMobileViewInterface } from "../../../shared/ui/EntityMobileView/EntityMobileViewInterface";
import type { RequestSearchDrawerInterface } from "~/shared/views/RequestSearchDrawer/RequestSearchDrawerInterface";
import type { PostUpdateSearchPayload } from "~/requests/_personal/postUpdateSearch/postUpdateSearch";

import { determineRole } from "~/shared/determineRole";

import { t, loadNamespaces } from "i18next";
import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { useStore } from "~/store/store";

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

import { Loader } from "~/shared/ui/Loader/Loader";
import { StyledRadioButton } from "~/shared/ui/StyledRadioButton/StyledRadioButton";
import { RadioSearchableDrawer } from "../../../shared/ui/RadioSearchableDrawer/RadioSearchableDrawer";
import { RequestSearchDrawer } from "~/shared/views/RequestSearchDrawer/RequestSearchDrawer";

import { EntityStaticMobileView } from "../../../shared/ui/EntityMobileView/EntityStaticMobileView";
import { EntityEditMobileView } from "../../../shared/ui/EntityMobileView/EntityEditMobileView";

import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import LogoutIcon from "@mui/icons-material/Logout";
import { RouteIcon } from "~/shared/icons/RouteIcon";

import { getOrder } from "~/requests/_personal/getOrder/getOrder";
import { postDeleteOrderActivity } from "~/requests/_personal/postDeleteOrderActivity/postDeleteOrderActivity";
import { postConvertTask } from "~/requests/_personal/postConvertTask/postConvertTask";
import { postAcceptOrder } from "~/requests/_personal/postAcceptOrder/postAcceptOrder";
import { postSendOrder } from "~/requests/_personal/postSendOrder/postSendOrder";
import { getSupervisorsForTask } from "~/requests/_personal/getSupervisorsForTask/getSupervisorsForTask";
import { postCreateBidFromOrder } from "~/requests/_personal/postCreateBidFromOrder/postCreateBidFromOrder";
import { postCreateSearchFromOrder } from "~/requests/_personal/postCreateSearchFromOrder/postCreateSearchFromOrder";
import { postUpdateSearch } from "~/requests/_personal/postUpdateSearch/postUpdateSearch";
import { getPlaceForBid } from "~/requests/_personal/getPlaceForBid/getPlaceForBid";

type MobileModeData = {
  mode: "mobile";
  entity: EntityMobileViewInterface["entity"];
  locations: {
    value: string;
    label: string;
    logo: string | null;
    disabled: boolean;
  }[];
  supervisorsToSelect: ComponentPropsWithoutRef<
    typeof StyledRadioButton
  >["options"];
};

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  await loadNamespaces("order");

  const mode = "mobile";

  const accessToken = useStore.getState().accessToken;
  const userRole = useStore.getState().userRole;

  let data;

  if (accessToken) {
    if (mode === "mobile") {
      const order: EntityMobileViewInterface["entity"] = {
        id: params.orderId,
        status: -1,
        place: {
          id: -1,
          name: "",
          logo: "",
          region: "",
        },
        selfEmployed: false,
        services: [],
        route: 0,
        project: null,
        creatingPerson: null,
        acceptingPerson: null,
        invitedPersons: [],
      };

      const locations: MobileModeData["locations"] = [];

      const supervisorsToSelect: ComponentPropsWithoutRef<
        typeof StyledRadioButton
      >["options"] = [];

      const orderData = await getOrder(accessToken, params.orderId);

      order.status = orderData.data.status;
      order.place.name = orderData.data.place.name;
      order.place.logo = orderData.data.place.logo;
      order.place.region = orderData.data.place.region.name;
      order.selfEmployed = orderData.data.selfEmployed;
      order.creatingPerson = orderData.data.user
        ? {
            id: orderData.data.user.id,
            role: determineRole(orderData.data.user.roles),
            name: orderData.data.user.name,
            phone: orderData.data.user.phone,
            email: orderData.data.user.email,
            logo: orderData.data.user.logo,
          }
        : null;
      order.acceptingPerson = orderData.data.acceptUser
        ? {
            id: orderData.data.acceptUser.id,
            role: determineRole(orderData.data.acceptUser.roles),
            name: orderData.data.acceptUser.name,
            phone: orderData.data.acceptUser.phone,
            email: orderData.data.acceptUser.email,
            logo: orderData.data.acceptUser.logo,
          }
        : null;

      orderData.data.orderActivities.forEach((item) => {
        let routeCount = 0;
        // считаем количество точек в маршруте
        item.dateActivity.forEach((t) => {
          routeCount = routeCount + t.places.length;
        });
        // считаем количество точек в маршруте

        order.services.push({
          id: item.id,
          count: item.count,
          name: item.viewActivity.name,
          route: routeCount,
          dateStart: item.dateStart,
          dateEnd: item.dateEnd,
          countSearch: item.countSearch,
          buttonBidNeed: item.buttonBidNeed,
          buttonSearchNeed: item.buttonSearchNeed,
        });
      });

      if (orderData.data.acceptUser) {
        supervisorsToSelect.push({
          value: orderData.data.acceptUser.id.toString(),
          label: t("yourselfOption", { ns: "order" }),
          disabled: false,
        });
      }

      if (userRole === "manager" || userRole === "supervisor") {
        const locationsData = await getPlaceForBid(accessToken);

        locationsData.data.forEach((item) => {
          locations.push({
            value: item.id.toString(),
            label: `${item.name} ${item.region.name}`,
            logo: item.logo,
            disabled: false,
          });
        });
      }

      if (userRole === "manager") {
        const supervisersData = await getSupervisorsForTask(
          accessToken,
          params.orderId,
        );

        supervisersData.data.forEach((item) => {
          supervisorsToSelect.push({
            value: item.id.toString(),
            label: item.name,

            disabled: false,
          });
        });
      }

      data = {
        mode: "mobile",
        entity: order,
        locations,
        orderActivities: orderData.data.orderActivities,
        supervisorsToSelect,
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
  if (accessToken) {
    if (_action === "deleteActivity") {
      await postDeleteOrderActivity(
        accessToken,
        fields.orderId,
        fields.orderActivityId,
      );
    } else if (_action === "transformAssignment") {
      const transformedTaskData = await postConvertTask(
        accessToken,
        fields.orderId,
        fields.responsibleId,
      );
      throw redirect(withLocale(`/tasks/${transformedTaskData.data.id}`));
    } else if (_action === "requestSearch") {
      const searchRequestData = await postCreateSearchFromOrder(
        accessToken,
        fields.orderId,
        fields.orderActivityId,
      );

      const entity: RequestSearchDrawerInterface["entity"] = {
        id: searchRequestData.data.id,
        logo: searchRequestData.data.viewActivity.logo,
        place: {
          id: searchRequestData.data.place.id,
          name: searchRequestData.data.place.name,
          logo: searchRequestData.data.place.logo,
        },
        project: {
          id: searchRequestData.data.project.id,
          name: searchRequestData.data.project.name,
        },
        activity: {
          id: searchRequestData.data.viewActivity.id,
          name: searchRequestData.data.viewActivity.name,
          travelling: searchRequestData.data.viewActivity.traveling,
        },
        unitPrice: searchRequestData.data.price
          ? searchRequestData.data.price
          : 0,
        finalPrice: searchRequestData.data.priceResult,
        radius: searchRequestData.data.radius
          ? searchRequestData.data.radius
          : 0,
        dateStart: new Date(searchRequestData.data.dateStart),
        dateEnd: new Date(searchRequestData.data.dateEnd),
        responsiblePerson: {
          id: searchRequestData.data.user.id,
          phone: searchRequestData.data.user.phone,
          email: searchRequestData.data.user.email,
          logo: searchRequestData.data.user.logo,
          roles: searchRequestData.data.user.roles,
        },
        taskId: searchRequestData.data.task
          ? searchRequestData.data.task.id
          : null,
        orderId: searchRequestData.data.order
          ? searchRequestData.data.order.id
          : null,
        selfEmployed: searchRequestData.data.selfEmployed,
        amount: searchRequestData.data.count,
        needDays: searchRequestData.data.dateActivity.length > 0,
        needFoto: searchRequestData.data.needFoto,
        days: (() => {
          const days: RequestSearchDrawerInterface["entity"]["days"] = [];

          searchRequestData.data.dateActivity.forEach((date) => {
            const locations: RequestSearchDrawerInterface["entity"]["days"][0]["locations"] =
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
      };

      return entity;
    } else if (_action === "_updateSearchRequest") {
      await postUpdateSearch(accessToken, fields.searchId, fields.payload);
    } else if (_action === "transformAssignmentToRequest") {
      const transformedRequestData = await postCreateBidFromOrder(
        accessToken,
        fields.orderId,
        fields.orderActivityId,
      );
      throw redirect(withLocale(`/requests/${transformedRequestData.data.id}`));
    } else if (_action === "acceptAssignment") {
      await postAcceptOrder(accessToken, fields.orderId);
      throw redirect(currentURL.toString());
    } else if (_action === "save") {
      await postSendOrder(accessToken, fields.orderId);
      throw redirect(currentURL.toString());
    }
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Order({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { t } = useTranslation("order");
  const userRole = useStore.getState().userRole;

  const fetcher = useFetcher<RequestSearchDrawerInterface["entity"]>();

  const [editMode, setEditMode] = useState<boolean>(false);
  const [serviceToDelete, setServiceToDelete] = useState<{
    id: number;
    count: number;
    name: string;
  } | null>(null);

  const [searchSupervisors, setSearchSupervisors] = useState<boolean>(false);

  return (
    <>
      {loaderData.mode === "mobile" ? (
        <>
          {navigation.state !== "idle" ? <Loader /> : null}{" "}
          {editMode ? (
            <EntityEditMobileView
              translation={"order"}
              entity={loaderData.entity}
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
                        `/orders/${loaderData.entity.id}/service/${service.id}`,
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
                    to={withLocale(`/orders/${loaderData.entity.id}/service`)}
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
              entity={loaderData.entity}
              headerBackAction={() => {
                navigate(withLocale("/orders"), {
                  viewTransition: true,
                });
              }}
              {...(userRole === "client" &&
              (loaderData.entity.status === 1 || loaderData.entity.status === 2)
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
                        `/orders/${loaderData.entity.id}/service/${service.id}`,
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

                  {userRole === "supervisor" &&
                  loaderData.entity.status === 3 &&
                  service.buttonBidNeed ? (
                    <Button
                      variant="contained"
                      sx={{
                        marginTop: "8px",
                      }}
                      startIcon={<CheckIcon />}
                      onClick={() => {
                        fetcher.submit(
                          JSON.stringify({
                            _action: "transformAssignmentToRequest",
                            orderId: loaderData.entity.id,
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

                  {(userRole === "manager" || userRole === "supervisor") &&
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
                            _action: "requestSearch",
                            orderId: loaderData.entity.id,
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
                        {t("searchRequest")}
                        {service.count}
                      </span>
                    </Button>
                  ) : null}
                </Box>
              )}
              actionSlot={() => (
                <>
                  {userRole === "manager" && loaderData.entity.status === 3 ? (
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

                  {(userRole === "manager" && loaderData.entity.status === 2) ||
                  (userRole === "supervisor" &&
                    loaderData.entity.status === 2) ? (
                    <Button
                      variant="contained"
                      sx={{
                        marginTop: "8px",
                      }}
                      startIcon={<CheckIcon />}
                      onClick={() => {
                        fetcher.submit(
                          JSON.stringify({
                            _action: "acceptAssignment",
                            orderId: loaderData.entity.id,
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

                  {loaderData.entity.status === 1 ? (
                    <Button
                      variant="contained"
                      onClick={() => {
                        fetcher.submit(
                          JSON.stringify({
                            _action: "save",
                            orderId: loaderData.entity.id,
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
                    _action: "_updateSearchRequest",
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
              fetcher.submit(
                JSON.stringify({
                  _action: "transformAssignment",
                  orderId: loaderData.entity.id,
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
                      _action: "deleteActivity",
                      orderId: loaderData.entity.id,
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
      ) : null}
    </>
  );
}
