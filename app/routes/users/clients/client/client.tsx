import { useState, ComponentPropsWithoutRef, useEffect } from "react";
import {
  useNavigate,
  useNavigation,
  useSubmit,
  useFetcher,
  redirect,
  Link,
} from "react-router";
import type { Route } from "./+types/client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { statusCodeMap } from "~/shared/usersStatusCodeMap";

import { Button, IconButton, Avatar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";
// import { StyledSelect } from "~/shared/ui/StyledSelect/StyledSelect";
import { StyledTextField } from "~/shared/ui/StyledTextField/StyledTextField";
import { StyledPhoneField } from "~/shared/ui/StyledPhoneField/StyledPhoneField";
import { StyledRadioButton } from "~/shared/ui/StyledRadioButton/StyledRadioButton";
import { TimeField } from "~/shared/ui/TimeField/TimeField";
import { CheckboxSearchableDrawer } from "~/shared/ui/CheckboxSearchableDrawer/CheckboxSearchableDrawer";

import { S_SwipeableDrawer } from "./client.styled";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FileIcon } from "~/shared/icons/FileIcon";
import { PointerIcon } from "~/shared/icons/PointerIcon";
import { CheckIcon } from "~/shared/icons/CheckIcon";
import { DeleteIcon } from "~/shared/icons/DeleteIcon";

import { useStore } from "~/store/store";

import { getCounterparty } from "~/requests/_personal/_moderation/getCounterparty/getCounterparty";
import { getModerationSingleClient } from "~/requests/_personal/_moderation/getModerationSingleClient/getModerationSingleClient";
import { postSetUserImg } from "~/requests/_personal/_moderation/postSetUserImg/postSetUserImg";
import { postDelProject } from "~/requests/_personal/_moderation/delProject/delProject";
import { postDelPlaceModeration } from "~/requests/_personal/_moderation/postDelPlaceModeration/postDelPlaceModeration";
import { postConfirmUserRegister } from "~/requests/_personal/_moderation/postConfirmUserRegister/postConfirmUserRegister";
import { postSetCounterparty } from "~/requests/_personal/_moderation/postSetCounterparty/postSetCounterparty";
import { postDeleteCounterparty } from "~/requests/_personal/_moderation/postDeleteCounterparty/postDeleteCounterparty";

const getRadioButtons = (
  list: { id: number; name: string; logo: string }[],
) => {
  const options: {
    id: number;
    value: string;
    label: string;
    disabled: boolean;
    image: string;
  }[] = [];

  list.forEach((item) => {
    options.push({
      id: item.id,
      value: item.logo,
      label: item.name,
      disabled: false,
      image: `${import.meta.env.VITE_ASSET_PATH}${item.logo}`,
    });
  });

  return options;
};

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const accessToken = useStore.getState().accessToken;

  const counterparty: ComponentPropsWithoutRef<
    typeof CheckboxSearchableDrawer
  >["items"] = [];

  const currentCounterparty: {
    id: number;
    name: string;
  }[] = [];

  const organizations: {
    id: number;
    logo: string;
    name: string;
  }[] = [];

  const locations: {
    id: number;
    logo: string;
    address: string;
  }[] = [];

  if (accessToken) {
    const data = await getModerationSingleClient(
      accessToken,
      Number(params.user),
    );

    const counterpartyData = await getCounterparty(accessToken);

    counterpartyData.data.forEach((agent) => {
      counterparty.push({
        value: agent.id.toString(),
        label: agent.name,
        disabled: false,
      });
    });

    data.data.counterparty.forEach((party) => {
      currentCounterparty.push({
        id: party.id,
        name: party.name,
      });
    });

    data.data.project.forEach((org) => {
      organizations.push({
        id: org.id,
        logo: org.brand[0].logo,
        name: org.name,
      });
    });

    data.data.place.forEach((loc) => {
      locations.push({
        id: loc.id,
        logo: loc.logo,
        address: loc.address_kladr,
      });
    });

    const client = {
      id: data.data.id,
      logo: data.data.logo,
      phone: data.data.phone.toString(),
      name: data.data.name,
      counterparty: currentCounterparty,
      organizations: organizations,
      locations: locations,
      change_order: data.data.change_order,
      cancel_order: data.data.cancel_order,
      live_order: data.data.live_order,
      confirmRegister: data.data.confirmRegister,
      status: (() => {
        let status = 3;

        if (
          data.data.confirmRegister === false &&
          data.data.finishRegister === true
        ) {
          status = 1;
        } else if (
          data.data.confirmRegister === true &&
          data.data.finishRegister === true
        ) {
          status = 2;
        } else if (
          data.data.confirmRegister === false &&
          data.data.finishRegister === false
        ) {
          status = 3;
        }

        return status;
      })(),
    };

    return { client, counterparty };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const { _action, ...fields } = await request.json();

  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    if (_action === "_confirm") {
      await postConfirmUserRegister(
        accessToken,
        fields.userId,
        fields.confirm,
        fields,
      );
      throw redirect(withLocale("/users"));
    } else if (_action === "_saveLogo") {
      await postSetUserImg(accessToken, fields.userId, fields.projectId);
      return;
    } else if (_action === "_deleteProject") {
      await postDelProject(accessToken, fields.userId, fields.projectId);
      return;
    } else if (_action === "_deletePlace") {
      await postDelPlaceModeration(
        accessToken,
        fields.userId,
        fields.projectId,
      );
      return;
    } else if (_action === "_decline") {
      await postConfirmUserRegister(accessToken, fields.userId, fields.confirm);
      throw redirect(withLocale("/users"));
    } else if (_action === "_setCounterparty") {
      await postSetCounterparty(
        accessToken,
        fields.userId,
        fields.counterparties,
      );
    } else if (_action === "_deleteCounterparty") {
      await postDeleteCounterparty(
        accessToken,
        fields.userId,
        fields.counterpartyId,
      );
    }
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Client({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("users_client");
  const fetcher = useFetcher();
  const submit = useSubmit();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const [open, setOpen] = useState<boolean>(false);
  const [openCounterparty, setOpenCounterparty] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    trigger,

    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      logo: loaderData.client.logo ? loaderData.client.logo : "",
      phone: loaderData.client.phone,
      name: loaderData.client.name,
      counterparty: loaderData.client.counterparty,
      organizations: loaderData.client.organizations,
      locations: loaderData.client.locations,
      change_order: new Date(`2000-01-01T${loaderData.client.change_order}`),
      cancel_order: new Date(`2000-01-01T${loaderData.client.cancel_order}`),
      live_order: new Date(`2000-01-01T${loaderData.client.live_order}`),
    },
    resolver: zodResolver(
      z.object({
        logo: z.string({ error: t("text", { ns: "constructorFields" }) }),
        phone: z.string({ error: t("text", { ns: "constructorFields" }) }),
        name: z.string(t("text", { ns: "constructorFields" })),
        counterparty: z
          .array(
            z.object({
              id: z.number(),
              name: z.string(),
            }),
          )
          .min(1),
        organizations: z
          .array(
            z.object({
              id: z.number(),
              logo: z.string(),
              name: z.string(),
            }),
          )
          .min(1),
        locations: z
          .array(
            z.object({
              id: z.number(),
              logo: z.string(),
              address: z.string(),
            }),
          )
          .min(1),
        change_order: z.date({
          error: t("text", { ns: "constructorFields" }),
        }),
        cancel_order: z.date({
          error: t("text", { ns: "constructorFields" }),
        }),
        live_order: z.date({
          error: t("text", { ns: "constructorFields" }),
        }),
      }),
    ),
  });

  useEffect(() => {
    reset({
      logo: loaderData.client.logo ? loaderData.client.logo : "",
      phone: loaderData.client.phone,
      name: loaderData.client.name,
      counterparty: loaderData.client.counterparty,
      organizations: loaderData.client.organizations,
      locations: loaderData.client.locations,
      change_order: new Date(`2000-01-01T${loaderData.client.change_order}`),
      cancel_order: new Date(`2000-01-01T${loaderData.client.cancel_order}`),
      live_order: new Date(`2000-01-01T${loaderData.client.live_order}`),
    });
  }, [loaderData, reset]);

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box
        sx={{
          paddingBottom: "54px",
        }}
      >
        <TopNavigation
          header={{
            text: t("header"),
            bold: false,
          }}
          backAction={() => {
            navigate(withLocale("/users"), {
              viewTransition: true,
            });
          }}
        />

        <form
          onSubmit={handleSubmit(
            (values) => {
              const change_order_formated = `${
                new Date(getValues("change_order")).getHours() > 10
                  ? new Date(getValues("change_order")).getHours()
                  : `0${new Date(getValues("change_order")).getHours()}`
              }:${
                new Date(getValues("change_order")).getMinutes() > 10
                  ? new Date(getValues("change_order")).getMinutes()
                  : `0${new Date(getValues("change_order")).getMinutes()}`
              }`;

              const cancel_order_formated = `${
                new Date(getValues("cancel_order")).getHours() > 10
                  ? new Date(getValues("cancel_order")).getHours()
                  : `0${new Date(getValues("cancel_order")).getHours()}`
              }:${
                new Date(getValues("cancel_order")).getMinutes() > 10
                  ? new Date(getValues("cancel_order")).getMinutes()
                  : `0${new Date(getValues("cancel_order")).getMinutes()}`
              }`;

              const live_order_formated = `${
                new Date(getValues("live_order")).getHours() > 10
                  ? new Date(getValues("live_order")).getHours()
                  : `0${new Date(getValues("live_order")).getHours()}`
              }:${
                new Date(getValues("live_order")).getMinutes() > 10
                  ? new Date(getValues("live_order")).getMinutes()
                  : `0${new Date(getValues("live_order")).getMinutes()}`
              }`;

              submit(
                JSON.stringify({
                  _action: "_confirm",
                  userId: loaderData.client.id,
                  confirm: "1",
                  fields: {
                    ...values,
                    change_order: change_order_formated,
                    cancel_order: cancel_order_formated,
                    live_order: live_order_formated,
                  },
                }),
                {
                  method: "POST",
                  encType: "application/json",
                },
              );
            },
            (errors) => {
              console.log(errors);
            },
          )}
        >
          <Box
            sx={{
              display: "grid",
              rowGap: "14px",
              paddingTop: "20px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            <Avatar
              src={`${import.meta.env.VITE_ASSET_PATH}${getValues().logo}`}
              sx={(theme) => ({
                width: "88px",
                height: "88px",
                justifySelf: "center",
                ...theme.typography.Reg_16,
              })}
            >
              {t("avatar")}
            </Avatar>

            <Button
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                padding: "8px 12px",
                rowGap: "2px",
                backgroundColor: (theme) => theme.vars.palette["Grey_5"],
                borderRadius: "6px",
              }}
              onClick={() => {
                setOpen(true);
              }}
            >
              <Typography
                component="p"
                variant="Reg_12"
                sx={{
                  color: (theme) => theme.vars.palette["Grey_2"],
                }}
              >
                {t("fields.avatarPlaceholder")}
              </Typography>
              <Stack
                direction="row"
                sx={{
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Typography
                  component="p"
                  variant="Reg_14"
                  sx={{
                    flexGrow: "1",
                    color: (theme) => theme.vars.palette["Black"],
                    textAlign: "left",
                  }}
                >
                  {t("fields.avatarValue")}
                </Typography>{" "}
                <KeyboardArrowDownIcon
                  sx={{
                    color: (theme) => theme.vars.palette["Grey_2"],
                  }}
                />
              </Stack>
            </Button>

            <Box>
              <Typography
                component="p"
                variant="Reg_12"
                sx={(theme) => ({
                  color: theme.vars.palette.Grey_2,
                })}
              >
                Статус
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  columnGap: "8px",
                  alignItems: "center",
                }}
              >
                <Box
                  style={{
                    backgroundColor:
                      statusCodeMap[
                        loaderData.client.status as keyof typeof statusCodeMap
                      ].color,
                  }}
                  sx={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                  }}
                ></Box>
                <Typography component="p" variant="Reg_14">
                  {t(
                    `status.${statusCodeMap[loaderData.client.status as keyof typeof statusCodeMap].value}`,
                  )}
                </Typography>
              </Box>
            </Box>

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <StyledPhoneField
                  inputType="phone"
                  placeholder={t("fields.phonePlaceholder")}
                  onImmediateChange={() => {}}
                  validation="none"
                  error={errors.phone?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <StyledTextField
                  inputType="text"
                  placeholder={t("fields.name")}
                  onImmediateChange={() => {}}
                  validation="none"
                  error={errors.name?.message}
                  {...field}
                />
              )}
            />

            {getValues("counterparty").length > 0 ? (
              <Typography component="p" variant="Bold_14">
                {t("counterparty")}
              </Typography>
            ) : null}

            <Stack
              sx={{
                rowGap: "14px",
              }}
            >
              {getValues("counterparty").map((counterparty) => (
                <Box
                  key={counterparty.id}
                  sx={{
                    display: "flex",
                    columnGap: "12px",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    component="p"
                    variant="Reg_14"
                    sx={{
                      flexGrow: "1",
                    }}
                  >
                    {counterparty.name}
                  </Typography>

                  {getValues("counterparty").length > 1 ? (
                    <IconButton
                      onClick={() => {
                        const currentList = getValues("counterparty");
                        const updatedList = currentList.filter(
                          (item) => item.name !== counterparty.name,
                        );
                        setValue("counterparty", updatedList);
                        trigger("counterparty");

                        fetcher.submit(
                          JSON.stringify({
                            _action: "_deleteCounterparty",
                            userId: loaderData.client.id,
                            counterpartyId: counterparty.id,
                          }),
                          {
                            method: "POST",
                            encType: "application/json",
                          },
                        );
                      }}
                      sx={{
                        width: "24px",
                        height: "24px",
                      }}
                    >
                      <DeleteIcon
                        sx={{
                          width: "12px",
                          height: "12px",
                        }}
                      />
                    </IconButton>
                  ) : null}
                </Box>
              ))}
            </Stack>

            <Button
              onClick={() => {
                setOpenCounterparty(true);
              }}
              variant="outlined"
            >
              {t("counterpartySelector")}
            </Button>

            {getValues("organizations").length > 0 ? (
              <Typography component="p" variant="Bold_14">
                {t("project")}
              </Typography>
            ) : null}

            <Stack
              sx={{
                rowGap: "14px",
              }}
            >
              {getValues("organizations").map((organization) => (
                <Box
                  key={organization.name}
                  sx={{
                    display: "flex",
                    columnGap: "12px",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={`${import.meta.env.VITE_ASSET_PATH}${
                      organization.logo
                    }`}
                    sx={{ width: "30px", height: "30px" }}
                  />

                  <Typography
                    component="p"
                    variant="Reg_14"
                    sx={{
                      flexGrow: "1",
                    }}
                  >
                    {organization.name}
                  </Typography>

                  {getValues("organizations").length > 1 ? (
                    <IconButton
                      onClick={() => {
                        const currentList = getValues("organizations");
                        const updatedList = currentList.filter(
                          (item) => item.name !== organization.name,
                        );
                        setValue("organizations", updatedList);
                        trigger("organizations");

                        fetcher.submit(
                          JSON.stringify({
                            _action: "_deleteProject",
                            userId: loaderData.client.id,
                            projectId: organization.id,
                          }),
                          {
                            method: "POST",
                            encType: "application/json",
                          },
                        );
                      }}
                      sx={{
                        width: "24px",
                        height: "24px",
                      }}
                    >
                      <DeleteIcon
                        sx={{
                          width: "12px",
                          height: "12px",
                        }}
                      />
                    </IconButton>
                  ) : null}
                </Box>
              ))}
            </Stack>

            <Button
              component={Link}
              to={withLocale(`/users/${loaderData.client.id}/select-projects`)}
              state={{
                from: `/users/client/${loaderData.client.id}`,
                // status: state.status,
                // statusColor: state.statusColor,
              }}
              variant="outlined"
              startIcon={<FileIcon />}
            >
              {t("projectSelector")}
            </Button>

            {getValues("locations").length > 0 ? (
              <Typography component="p" variant="Bold_14">
                {t("location")}
              </Typography>
            ) : null}

            <Stack
              sx={{
                rowGap: "14px",
              }}
            >
              {getValues("locations").map((location, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    columnGap: "12px",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={`${import.meta.env.VITE_ASSET_PATH}${location.logo}`}
                    sx={{ width: "30px", height: "30px" }}
                  />

                  <Typography
                    component="p"
                    variant="Reg_14"
                    sx={{
                      flexGrow: "1",
                    }}
                  >
                    {/* {location.name},  */}
                    {location.address}
                  </Typography>

                  <IconButton
                    onClick={() => {
                      const currentList = getValues("locations");
                      const updatedList = currentList.filter(
                        (item) => item.address !== location.address,
                      );
                      setValue("locations", updatedList);
                      trigger("locations");

                      fetcher.submit(
                        JSON.stringify({
                          _action: "_deletePlace",
                          userId: loaderData.client.id,
                          projectId: location.id,
                        }),
                        {
                          method: "POST",
                          encType: "application/json",
                        },
                      );
                    }}
                    sx={{
                      width: "24px",
                      height: "24px",
                    }}
                  >
                    <DeleteIcon
                      sx={{
                        width: "12px",
                        height: "12px",
                      }}
                    />
                  </IconButton>
                </Box>
              ))}
            </Stack>

            <Button
              component={Link}
              to={withLocale(`/users/${loaderData.client.id}/select-locations`)}
              state={{
                from: `/users/client/${loaderData.client.id}`,
                // status: state.status,
                // statusColor: state.statusColor,
              }}
              variant="outlined"
              startIcon={<PointerIcon />}
            >
              {t("locationSelector")}
            </Button>

            <Controller
              name="change_order"
              control={control}
              render={({ field }) => (
                <TimeField
                  placeholder={t("fields.editIntervalPlaceholder")}
                  error={errors.change_order?.message}
                  {...field}
                  value={field.value.toISOString()}
                  onChange={(value) => {
                    setValue("change_order", new Date(value));
                  }}
                />
              )}
            />
            <Controller
              name="cancel_order"
              control={control}
              render={({ field }) => (
                <TimeField
                  placeholder={t("fields.cancelIntervalPlaceholder")}
                  error={errors.cancel_order?.message}
                  {...field}
                  value={field.value.toISOString()}
                  onChange={(value) => {
                    setValue("cancel_order", new Date(value));
                  }}
                />
              )}
            />
            <Controller
              name="live_order"
              control={control}
              render={({ field }) => (
                <TimeField
                  placeholder={t("fields.durationIntervalPlaceholder")}
                  error={errors.live_order?.message}
                  {...field}
                  value={field.value.toISOString()}
                  onChange={(value) => {
                    setValue("live_order", new Date(value));
                  }}
                />
              )}
            />

            <Box>
              <Typography
                component="p"
                variant="Reg_12"
                sx={(theme) => ({
                  color: theme.vars.palette["Grey_2"],
                })}
              >
                {t("user_id")}
              </Typography>
              <Typography
                component="p"
                variant="Reg_14"
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                })}
              >
                {loaderData.client.id}
              </Typography>
            </Box>

            <Button variant="contained" type="submit" startIcon={<CheckIcon />}>
              {loaderData.client.confirmRegister
                ? t("saveButton")
                : t("confirmButton")}
            </Button>
            {/* <Button
              variant="text"
              onClick={() => {
                submit(
                  JSON.stringify({
                    _action: "_decline",
                    userId: loaderData.client.id,
                    confirm: "0",
                  }),
                  {
                    method: "POST",
                    encType: "application/json",
                  }
                );
              }}
            >
              {t("excludeButton")}
            </Button> */}
          </Box>
        </form>
      </Box>

      <S_SwipeableDrawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onOpen={() => {}}
        disableBackdropTransition={true}
        disableSwipeToOpen={true}
        anchor="bottom"
      >
        <Box
          sx={{
            padding: "18px 16px",
          }}
        >
          <Controller
            name="logo"
            control={control}
            render={({ field }) => (
              <StyledRadioButton
                onImmediateChange={() => {}}
                inputType="radio"
                validation="none"
                options={getRadioButtons(loaderData.client.organizations)}
                {...field}
                onChange={(evt) => {
                  console.log(evt);
                  field.onChange(evt);

                  const selectedOrganization =
                    loaderData.client.organizations.find(
                      (item) => item.logo === evt.target.value,
                    );

                  if (selectedOrganization) {
                    fetcher.submit(
                      JSON.stringify({
                        _action: "_saveLogo",
                        userId: loaderData.client.id,
                        projectId: selectedOrganization.id,
                      }),
                      {
                        method: "POST",
                        encType: "application/json",
                      },
                    );
                  }
                }}
              />
            )}
          />
        </Box>
      </S_SwipeableDrawer>

      <CheckboxSearchableDrawer
        translation="counterparty"
        open={openCounterparty}
        onClose={() => {
          setOpenCounterparty(false);
        }}
        onSubmit={(counterparties) => {
          fetcher.submit(
            JSON.stringify({
              _action: "_setCounterparty",
              userId: loaderData.client.id,
              counterparties,
            }),
            {
              method: "POST",
              encType: "application/json",
            },
          );
        }}
        items={loaderData.counterparty}
      />
    </>
  );
}
