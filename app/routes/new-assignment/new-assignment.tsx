import { useState, useEffect } from "react";
import {
  useNavigation,
  useNavigate,
  useFetcher,
  Link,
  redirect,
} from "react-router";
import type { Route } from "./+types/new-assignment";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import Box from "@mui/material/Box";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";

import { Loader } from "~/shared/ui/Loader/Loader";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { StyledSelect } from "~/shared/ui/StyledSelect/StyledSelect";
import { StyledCheckbox } from "~/shared/ui/StyledCheckbox/StyledCheckbox";

import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import ClearIcon from "@mui/icons-material/Clear";

import { useStore } from "~/store/store";

import { getOrder } from "~/requests/_personal/getOrder/getOrder";
import { getPlaceForOrder } from "~/requests/_personal/getPlaceForOrder/getPlaceForOrder";
import { postCreateOrder } from "~/requests/_personal/postCreateOrder/postCreateOrder";
import { postUpdateOrder } from "~/requests/_personal/postUpdateOrder/postUpdateOrder";
import { postDeleteOrderActivity } from "~/requests/_personal/postDeleteOrderActivity/postDeleteOrderActivity";
import { postCancelOrder } from "~/requests/_personal/postCancelOrder/postCancelOrder";
import { postSendOrder } from "~/requests/_personal/postSendOrder/postSendOrder";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const currentURL = new URL(request.url);
  const accessToken = useStore.getState().accessToken;
  const orderId = currentURL.searchParams.get("orderId");

  const order: {
    id: string;
    place: {
      id: number;
      name: string;
      region: string;
    };
    selfEmployed: boolean;
    isNewOrder: boolean;
    orderActivities: {
      id: number;
      count: number;
      name: string;
    }[];
  } = {
    id: (-1).toString(),
    place: {
      id: -1,
      name: "",
      region: "",
    },
    selfEmployed: false,
    isNewOrder: true,
    orderActivities: [],
  };

  const options: { value: string; label: string; disabled: boolean }[] = [];

  if (accessToken) {
    if (orderId) {
      const orderData = await getOrder(accessToken, orderId);

      order.id = orderId;
      order.place.id = orderData.data.place.id;
      order.place.name = orderData.data.place.name;
      order.place.region = orderData.data.place.region.name;
      order.selfEmployed = orderData.data.selfEmployed;
      order.isNewOrder = false;

      orderData.data.orderActivities.forEach((item) => {
        order.orderActivities.push({
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

    return { order, options };
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
        fields.selfEmployed
      );
      currentURL.searchParams.set("orderId", order.data.id.toString());

      throw redirect(currentURL.toString());
    } else if (_action === "_update" && orderId) {
      await postUpdateOrder(
        accessToken,
        fields.placeId,
        Number(orderId),
        fields.selfEmployed
      );
    } else if (_action === "_delete" && orderId) {
      await postDeleteOrderActivity(
        accessToken,
        orderId,
        fields.orderActivityId
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
  const { t } = useTranslation("new_assignment");

  const fetcher = useFetcher();

  const [activityToDelete, setActivityToDelete] = useState<{
    id: number;
    count: number;
    name: string;
  } | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location:
        loaderData.order.place.id === -1
          ? ""
          : loaderData.order.place.id.toString(),
      selfEmployed: loaderData.order.selfEmployed,
    },
    resolver: yupResolver(
      Yup.object({
        location: Yup.string().required(t("text", { ns: "constructorFields" })),
        selfEmployed: Yup.boolean().required(),
      })
    ),
    mode: "onChange",
    shouldUnregister: true,
  });

  useEffect(() => {
    setTimeout(() => {
      reset({
        location:
          loaderData.order.place.id === -1
            ? ""
            : loaderData.order.place.id.toString(),
        selfEmployed: loaderData.order.selfEmployed,
      });
    });
  }, [loaderData, reset]);

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <TopNavigation
        header={{
          text: t("header"),
          bold: false,
        }}
        backAction={() => {
          navigate(withLocale("/"), {
            viewTransition: true,
          });
        }}
      />
      <Box
        sx={{
          display: "grid",
          rowGap: "14px",
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingTop: "20px",
        }}
      >
        <form
          onSubmit={handleSubmit((values) => {
            // fetcher.submit(JSON.stringify(values), {
            //   method: "POST",
            //   encType: "application/json",
            // });
          })}
          style={{
            display: "grid",
            rowGap: "14px",
          }}
        >
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <StyledSelect
                inputType="select"
                placeholder={t("fields.locationPlaceholder")}
                onImmediateChange={() => {
                  if (loaderData.order.isNewOrder) {
                    fetcher.submit(
                      JSON.stringify({
                        _action: "_create",
                        placeId: getValues().location,
                        selfEmployed: getValues().selfEmployed,
                      }),
                      {
                        method: "POST",
                        encType: "application/json",
                      }
                    );
                  } else {
                    fetcher.submit(
                      JSON.stringify({
                        _action: "_update",
                        placeId: getValues().location,
                        orderId: fetcher.data,
                        selfEmployed: getValues().selfEmployed,
                      }),
                      {
                        method: "POST",
                        encType: "application/json",
                      }
                    );
                  }
                }}
                validation="none"
                error={errors.location?.message}
                options={loaderData.options}
                {...field}
              />
            )}
          />

          {!loaderData.order.isNewOrder ? (
            <Controller
              name="selfEmployed"
              control={control}
              render={({ field }) => (
                <StyledCheckbox
                  inputType="checkbox"
                  label={t("fields.selfEmployedPlaceholder")}
                  onImmediateChange={() => {
                    if (loaderData.order.isNewOrder) {
                      fetcher.submit(
                        JSON.stringify({
                          _action: "_create",
                          placeId: getValues().location,
                          selfEmployed: getValues().selfEmployed,
                        }),
                        {
                          method: "POST",
                          encType: "application/json",
                        }
                      );
                    } else {
                      fetcher.submit(
                        JSON.stringify({
                          _action: "_update",
                          placeId: getValues().location,
                          orderId: fetcher.data,
                          selfEmployed: getValues().selfEmployed,
                        }),
                        {
                          method: "POST",
                          encType: "application/json",
                        }
                      );
                    }
                  }}
                  validation="none"
                  error={errors.selfEmployed?.message}
                  {...field}
                />
              )}
            />
          ) : null}
        </form>

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
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  columnGap: "10px",
                  padding: "10px 14px",
                  border: "1px solid",
                  borderColor: theme.vars.palette["Grey_3"],
                  borderRadius: "6px",
                })}
              >
                <Box
                  sx={{
                    display: "grid",
                    rowGap: "4px",
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
              </Box>
            ))}
          </Box>
        ) : null}

        <Button
          component={Link}
          to={withLocale(`/new-assignment/${loaderData.order.id}/new-service`)}
          variant="outlined"
          disabled={loaderData.order.isNewOrder}
          startIcon={<AddIcon />}
        >
          {t("serviceButton")}
        </Button>

        <Box
          sx={{
            display: "grid",
            rowGap: "14px",
            position: "absolute",
            width: "100%",
            bottom: 0,
            left: 0,
            padding: "16px",
          }}
        >
          <Button
            variant="text"
            disabled={loaderData.order.isNewOrder}
            onClick={() => {
              fetcher.submit(
                JSON.stringify({
                  _action: "_cancel",
                  orderId: loaderData.order.id,
                }),
                {
                  method: "POST",
                  encType: "application/json",
                }
              );
            }}
          >
            {t("cancelButton")}
          </Button>
          <Button
            variant="contained"
            disabled={loaderData.order.orderActivities.length === 0}
            onClick={() => {
              fetcher.submit(
                JSON.stringify({
                  _action: "_save",
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
            {t("sendButton")}
          </Button>
        </Box>
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
          {t("dialog.title")}&nbsp;"{activityToDelete?.name}"&nbsp;?
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
                  _action: "_delete",
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
