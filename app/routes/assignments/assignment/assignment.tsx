import { useState } from "react";
import { useNavigation, useNavigate, useFetcher, Link } from "react-router";
import type { Route } from "./+types/assignment";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import Box from "@mui/material/Box";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";

import { Loader } from "~/shared/ui/Loader/Loader";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { EditIcon } from "~/shared/icons/EditIcon";

import { useStore } from "~/store/store";

import { statusCodeMap } from "~/shared/status";

import { RouteIcon } from "~/shared/icons/RouteIcon";

import { getOrder } from "~/requests/_personal/getOrder/getOrder";
import { postDeleteOrderActivity } from "~/requests/_personal/postDeleteOrderActivity/postDeleteOrderActivity";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const accessToken = useStore.getState().accessToken;

  const order: {
    id: string;
    status: number;
    place: {
      id: number;
      name: string;
      logo: string;
      region: string;
    };
    selfEmployed: boolean;
    orderActivities: {
      id: number;
      count: number;
      name: string;
      route: number;
    }[];
    route: number;
    acceptUser: null | {
      id: number;
      phone: number;
      email: string;
      logo: string;
    };
  } = {
    id: params.orderId,
    status: -1,
    place: {
      id: -1,
      name: "",
      logo: "",
      region: "",
    },
    selfEmployed: false,
    orderActivities: [],
    route: 0,
    acceptUser: null,
  };

  if (accessToken) {
    const orderData = await getOrder(accessToken, params.orderId);

    order.status = orderData.data.status;
    order.place.name = orderData.data.place.name;
    order.place.logo = orderData.data.place.logo;
    order.place.region = orderData.data.place.region.name;
    order.selfEmployed = orderData.data.selfEmployed;
    order.acceptUser = orderData.data.acceptUser
      ? orderData.data.acceptUser
      : null;

    orderData.data.orderActivities.forEach((item) => {
      let routeCount = 0;
      // считаем количество точек в маршруте
      item.dateActivity.forEach((t) => {
        routeCount = routeCount + t.places.length;
      });
      // считаем количество точек в маршруте

      order.orderActivities.push({
        id: item.id,
        count: item.count,
        name: item.viewActivity.name,
        route: routeCount,
      });
    });

    return { order, orderActivities: orderData.data.orderActivities };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  // const currentURL = new URL(request.url);
  const fields = await request.json();
  const accessToken = useStore.getState().accessToken;
  if (accessToken) {
    await postDeleteOrderActivity(
      accessToken,
      fields.orderId,
      fields.orderActivityId
    );
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Assignment({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { t } = useTranslation("assignment");

  const fetcher = useFetcher();

  const [editMode, setEditMode] = useState<boolean>(false);
  const [activityToDelete, setActivityToDelete] = useState<{
    id: number;
    count: number;
    name: string;
  } | null>(null);

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <TopNavigation
        header={{
          text: `${t("header")} ${loaderData.order.id}`,
          bold: false,
        }}
        backAction={() => {
          navigate(withLocale("/assignments"), {
            viewTransition: true,
          });
        }}
        {...(!editMode
          ? {
              buttonAction: {
                text: "",
                icon: (
                  <EditIcon
                    sx={{
                      width: "16px",
                      height: "16px",
                    }}
                  />
                ),
                action: () => {
                  setEditMode(true);
                },
              },
            }
          : {})}
      />

      <Box
        sx={{
          height: "calc(100vh - 120px)",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          rowGap: "14px",
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingTop: "20px",
        }}
      >
        {!editMode ? (
          <Avatar
            src={`${import.meta.env.VITE_ASSET_PATH}${loaderData.order.place.logo}`}
            sx={{ width: "100px", height: "100px", margin: "0 auto" }}
          />
        ) : null}

        <Box
          sx={{
            display: "grid",
            rowGap: "4px",
          }}
        >
          <Typography
            component="p"
            variant="Reg_12"
            sx={(theme) => ({
              color: theme.vars.palette["Grey_2"],
            })}
          >
            {t("statusPlaceholder")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              columnGap: "8px",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "14px",
                height: "14px",
                borderRadius: "50px",
              }}
              style={{
                backgroundColor:
                  statusCodeMap[
                    loaderData.order.status as keyof typeof statusCodeMap
                  ].color,
              }}
            ></Box>
            <Typography
              component="p"
              variant="Reg_14"
              sx={(theme) => ({
                color: theme.vars.palette["Black"],
              })}
            >
              {t(
                `status.${
                  statusCodeMap[
                    loaderData.order.status as keyof typeof statusCodeMap
                  ].value
                }`
              )}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            rowGap: "4px",
          }}
        >
          <Typography
            component="p"
            variant="Reg_12"
            sx={(theme) => ({
              color: theme.vars.palette["Grey_2"],
            })}
          >
            {t("locationPlaceholder")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              columnGap: "8px",
              alignItems: "center",
            }}
          >
            <Avatar
              src={`${import.meta.env.VITE_ASSET_PATH}${loaderData.order.place.logo}`}
              sx={{ width: "30px", height: "30px" }}
            />
            <Typography
              component="p"
              variant="Reg_14"
              sx={(theme) => ({ color: theme.vars.palette["Black"] })}
            >
              {loaderData.order.place.name}
            </Typography>
          </Box>
        </Box>

        {loaderData.order.acceptUser ? (
          <>
            <Box>
              <Typography
                component="p"
                variant="Reg_12"
                sx={(theme) => ({
                  color: theme.vars.palette["Grey_2"],
                })}
              >
                {t("responsiblePlaceholder")}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  columnGap: "8px",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={`${import.meta.env.VITE_ASSET_PATH}${loaderData.order.acceptUser.logo}`}
                  sx={{ width: "30px", height: "30px" }}
                />
                <Typography
                  component="p"
                  variant="Reg_14"
                  sx={(theme) => ({ color: theme.vars.palette["Black"] })}
                >
                  {loaderData.order.acceptUser.email}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography
                component="p"
                variant="Reg_12"
                sx={(theme) => ({
                  color: theme.vars.palette["Grey_2"],
                })}
              >
                {t("responsiblePhonePlaceholder")}
              </Typography>
              <Typography
                component="a"
                variant="Reg_14"
                href={`tel:${loaderData.order.acceptUser.phone}`}
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                  textDecoration: "none",
                })}
              >
                {loaderData.order.acceptUser.phone}
              </Typography>
            </Box>
          </>
        ) : null}

        {loaderData.order.orderActivities.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              rowGap: "14px",
            }}
          >
            <Typography
              component="p"
              variant="Bold_14"
              sx={(theme) => ({
                color: theme.vars.palette["Black"],
              })}
            >
              {t("activities")}
            </Typography>
            {loaderData.order.orderActivities.map((item) => (
              <Box
                key={item.id}
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
                      `/assignments/${loaderData.order.id}/edit-service/${item.id}`
                    )}
                    state={{
                      service: loaderData.orderActivities.find(
                        (service) => service.id === item.id
                      ),
                    }}
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
                      {item.name}
                    </Typography>
                    <Typography
                      component="p"
                      variant="Reg_12"
                      sx={(theme) => ({
                        color: theme.vars.palette["Grey_1"],
                      })}
                    >
                      {t("activityAmount")} {item.count}
                    </Typography>
                  </Box>

                  {editMode ? (
                    <IconButton
                      sx={{
                        padding: 0,
                      }}
                      onClick={() => {
                        setActivityToDelete(item);
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                  ) : null}
                </Box>

                {item.route > 0 && !editMode ? (
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
                        {t("route", { count: item.route })}
                      </Typography>
                    </Box>
                  </>
                ) : null}
              </Box>
            ))}
          </Box>
        ) : null}

        {editMode ? (
          <Button
            component={Link}
            to={withLocale(
              `/new-assignment/${loaderData.order.id}/new-service?edit=true`
            )}
            variant="outlined"
            startIcon={<AddIcon />}
          >
            {t("serviceButton")}
          </Button>
        ) : null}

        {editMode ? (
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
              to={withLocale(`/assignments`)}
              variant="contained"
            >
              {t("sendButton")}
            </Button>
          </Box>
        ) : null}
      </Box>

      <Dialog
        open={activityToDelete ? true : false}
        onClose={() => {
          setActivityToDelete(null);
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
          {t("dialog.title")}&nbsp;&quot;{activityToDelete?.name}&quot;&nbsp;?
        </DialogTitle>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setActivityToDelete(null);
            }}
          >
            {t("dialog.no")}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              fetcher.submit(
                JSON.stringify({
                  orderId: loaderData.order.id,
                  orderActivityId: activityToDelete?.id,
                }),
                {
                  method: "POST",
                  encType: "application/json",
                }
              );
              setActivityToDelete(null);
            }}
          >
            {t("dialog.yes")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
