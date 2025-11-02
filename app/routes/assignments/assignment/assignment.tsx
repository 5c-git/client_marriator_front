import { ComponentPropsWithoutRef, useState } from "react";
import {
  useNavigation,
  useNavigate,
  useFetcher,
  Link,
  redirect,
} from "react-router";
import type { Route } from "./+types/assignment";

import { t, loadNamespaces } from "i18next";
import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { useStore } from "~/store/store";

import { statusCodeMap } from "~/shared/status";

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
  SwipeableDrawer,
} from "@mui/material";

import { Loader } from "~/shared/ui/Loader/Loader";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { StyledSearchBar } from "~/shared/ui/StyledSearchBar/StyledSearchBar";
import { StyledRadioButton } from "~/shared/ui/StyledRadioButton/StyledRadioButton";

import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import LogoutIcon from "@mui/icons-material/Logout";
import { RouteIcon } from "~/shared/icons/RouteIcon";
import { EditIcon } from "~/shared/icons/EditIcon";

import { getOrder } from "~/requests/_personal/getOrder/getOrder";
import { postDeleteOrderActivity } from "~/requests/_personal/postDeleteOrderActivity/postDeleteOrderActivity";
import { postConvertTask } from "~/requests/_personal/postConvertTask/postConvertTask";
import { postAcceptOrder } from "~/requests/_personal/postAcceptOrder/postAcceptOrder";
import { postSendOrder } from "~/requests/_personal/postSendOrder/postSendOrder";
import { getSupervisorsForTask } from "~/requests/_personal/getSupervisorsForTask/getSupervisorsForTask";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  await loadNamespaces("assignment");
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

  const supervisorsToSelect: ComponentPropsWithoutRef<
    typeof StyledRadioButton
  >["options"] = [];

  if (accessToken) {
    const orderData = await getOrder(accessToken, params.orderId);
    const supervisersData = await getSupervisorsForTask(
      accessToken,
      params.orderId
    );

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

    if (orderData.data.acceptUser) {
      supervisorsToSelect.push({
        value: orderData.data.acceptUser.id.toString(),
        label: t("resposiblePopUp.yourselfOption", { ns: "assignment" }),
        disabled: false,
      });
    }

    supervisersData.data.forEach((item) => {
      supervisorsToSelect.push({
        value: item.id.toString(),
        label: item.name,

        disabled: false,
      });
    });

    return {
      order,
      orderActivities: orderData.data.orderActivities,
      supervisorsToSelect,
    };
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
        fields.orderActivityId
      );
    } else if (_action === "transformAssignment") {
      const transformedTaskData = await postConvertTask(
        accessToken,
        fields.orderId,
        fields.responsibleId
      );
      throw redirect(withLocale(`/tasks/${transformedTaskData.data.id}`));
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

export default function Assignment({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { t } = useTranslation("assignment");
  const userRole = useStore.getState().userRole;

  const fetcher = useFetcher();

  const [editMode, setEditMode] = useState<boolean>(false);
  const [activityToDelete, setActivityToDelete] = useState<{
    id: number;
    count: number;
    name: string;
  } | null>(null);

  const [searchSupervisors, setSearchSupervisors] = useState<boolean>(false);
  const [selectedSupervisors, setSelectedSupervisors] = useState(
    loaderData.supervisorsToSelect
  );

  const {
    control: controlSupervisor,
    getValues: getValuesSupervisor,
    reset: resetSupervisor,
    handleSubmit: handleSupervisorSubmit,
    formState: { errors },
  } = useForm<{
    searchbar: string;
    supervisor: string;
  }>({
    defaultValues: {
      searchbar: "",
      supervisor: "",
    },
    // @ts-expect-error
    resolver: yupResolver(
      Yup.object({
        searchbar: Yup.string().notRequired(),
        supervisor: Yup.string().required(t("resposiblePopUp.error")),
      })
    ),
  });

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

        {(!editMode && userRole === "admin" && loaderData.order.status === 3) ||
        (!editMode &&
          userRole === "manager" &&
          loaderData.order.status === 3) ? (
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

        {(!editMode && userRole === "admin" && loaderData.order.status === 2) ||
        (!editMode &&
          userRole === "manager" &&
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
                  _action: "acceptAssignment",
                  orderId: loaderData.order.id,
                }),
                {
                  method: "POST",
                  encType: "application/json",
                }
              );
            }}
          >
            {t("acceptButton")}
          </Button>
        ) : null}

        {!editMode && loaderData.order.status === 1 ? (
          <Button
            variant="contained"
            onClick={() => {
              fetcher.submit(
                JSON.stringify({
                  _action: "save",
                  orderId: loaderData.order.id,
                }),
                {
                  method: "POST",
                  encType: "application/json",
                }
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
                  _action: "deleteActivity",
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

      <SwipeableDrawer
        open={searchSupervisors}
        onClose={() => {
          resetSupervisor();
          setSearchSupervisors(false);
        }}
        onOpen={() => {}}
        disableBackdropTransition={true}
        disableSwipeToOpen={true}
        anchor="bottom"
        sx={{
          "& .MuiDrawer-paper": {
            borderRadius: "6px",
          },
        }}
      >
        <TopNavigation
          header={{
            text: t("resposiblePopUp.header"),
            bold: false,
          }}
        />
        <form
          onSubmit={handleSupervisorSubmit(() => {
            const selectedSupervisor = getValuesSupervisor("supervisor");

            fetcher.submit(
              JSON.stringify({
                _action: "transformAssignment",
                orderId: loaderData.order.id,
                responsibleId: selectedSupervisor,
              }),
              {
                method: "POST",
                encType: "application/json",
              }
            );

            resetSupervisor();
            setSearchSupervisors(false);
          })}
        >
          <Box
            sx={{
              position: "relative",
              display: "grid",
              alignContent: "flex-start",
              rowGap: "14px",
              paddingTop: "20px",
              paddingLeft: "16px",
              paddingRight: "16px",
              height: "85vh",
            }}
          >
            <Controller
              name="searchbar"
              control={controlSupervisor}
              render={({ field }) => (
                <StyledSearchBar
                  placeholder={t("resposiblePopUp.searchbar")}
                  {...field}
                  onChange={(evt) => {
                    const currentFieldValue = new RegExp(
                      `^${evt.target.value}`,
                      "i"
                    );

                    let matchingSupervisors: typeof loaderData.supervisorsToSelect =
                      [];

                    if (evt.target.value !== "") {
                      matchingSupervisors = [
                        ...selectedSupervisors.filter((item) =>
                          currentFieldValue.test(item.label)
                        ),
                      ];
                    } else {
                      matchingSupervisors = [...loaderData.supervisorsToSelect];
                    }

                    setSelectedSupervisors(matchingSupervisors);

                    field.onChange(evt);
                  }}
                />
              )}
            />

            <Controller
              name="supervisor"
              control={controlSupervisor}
              render={({ field }) => (
                <StyledRadioButton
                  inputType="radio"
                  validation="none"
                  onImmediateChange={() => {}}
                  options={selectedSupervisors}
                  error={errors.supervisor?.message}
                  {...field}
                />
              )}
            />

            <Box
              sx={(theme) => ({
                display: "flex",
                columnGap: "14px",
                padding: "10px",
                backgroundColor: theme.vars.palette["White"],
                position: "fixed",
                zIndex: 1,
                width: "100%",
                bottom: "0",
                left: "0",
              })}
            >
              <Button type="submit" variant="contained">
                {t("resposiblePopUp.submit")}
              </Button>
            </Box>
          </Box>
        </form>
      </SwipeableDrawer>
    </>
  );
}
