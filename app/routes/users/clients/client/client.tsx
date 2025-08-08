import { useState } from "react";
import {
  useNavigate,
  useNavigation,
  useLocation,
  useSubmit,
  useFetcher,
  redirect,
  Link,
} from "react-router";
import type { Route } from "./+types/client";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { Button, IconButton, Avatar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";
import { StyledSelect } from "~/shared/ui/StyledSelect/StyledSelect";
import { StyledTextField } from "~/shared/ui/StyledTextField/StyledTextField";
import { StyledPhoneField } from "~/shared/ui/StyledPhoneField/StyledPhoneField";
import { StyledRadioButton } from "~/shared/ui/StyledRadioButton/StyledRadioButton";
import { TimeField } from "~/shared/ui/TimeField/TimeField";

import { S_SwipeableDrawer } from "./client.styled";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FileIcon } from "~/shared/icons/FileIcon";
import { PointerIcon } from "~/shared/icons/PointerIcon";
import { CheckIcon } from "~/shared/icons/CheckIcon";
import { DeleteIcon } from "~/shared/icons/DeleteIcon";

import { useStore } from "~/store/store";

import { getModerationSingleClient } from "~/requests/_personal/_moderation/getModerationSingleClient/getModerationSingleClient";

import { postSetUserImg } from "~/requests/_personal/_moderation/postSetUserImg/postSetUserImg";
import { postDelProject } from "~/requests/_personal/_moderation/delProject/delProject";
import { postDelPlaceModeration } from "~/requests/_personal/_moderation/postDelPlaceModeration/postDelPlaceModeration";
import { postConfirmUserRegister } from "~/requests/_personal/_moderation/postConfirmUserRegister/postConfirmUserRegister";

type client = {
  id: number;
  logo: string | null;
  agent: string;
  phone: string;
  name: string;
  status: string;
  statusColor: string;
  organizations: {
    logo: string;
    name: string;
  }[];
  locations: {
    logo: string;
    address: string;
  }[];
  change_order: string;
  cancel_order: string;
  live_order: string;
};

const getRadioButtons = (
  list: { id: number; name: string; logo: string }[]
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
      Number(params.user)
    );

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
      agent: "AGENT PLACEHOLDER",
      phone: data.data.phone.toString(),
      name: data.data.name,
      organizations: organizations,
      locations: locations,
      change_order: data.data.change_order,
      cancel_order: data.data.cancel_order,
      live_order: data.data.live_order,
    };

    return { client };
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
        fields
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
        fields.projectId
      );
      return;
    } else if (_action === "_decline") {
      await postConfirmUserRegister(accessToken, fields.userId, fields.confirm);
      throw redirect(withLocale("/users"));
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
  const location = useLocation();

  const { state } = location as {
    state: { status: string; statusColor: string };
  };
  const [open, setOpen] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      logo: loaderData.client.logo ? loaderData.client.logo : "",
      // agent: state.agent,
      phone: loaderData.client.phone,
      name: loaderData.client.name,
      organizations: loaderData.client.organizations,
      locations: loaderData.client.locations,
      change_order:
        `2000-01-01T${loaderData.client.change_order}` as unknown as string,
      cancel_order:
        `2000-01-01T${loaderData.client.cancel_order}` as unknown as string,
      live_order:
        `2000-01-01T${loaderData.client.live_order}` as unknown as string,
    },
    resolver: yupResolver(
      Yup.object({
        logo: Yup.string().required(t("text", { ns: "constructorFields" })),
        // agent: Yup.string().required(t("text", { ns: "constructorFields" })),
        phone: Yup.string().required(t("text", { ns: "constructorFields" })),
        name: Yup.string().required(t("text", { ns: "constructorFields" })),
        organizations: Yup.array()
          .min(1)
          .of(
            Yup.object().shape({
              id: Yup.number().required(),
              logo: Yup.string().required(),
              name: Yup.string().required(),
            })
          )
          .required(t("text", { ns: "constructorFields" })),
        locations: Yup.array()
          .min(1)
          .of(
            Yup.object().shape({
              id: Yup.number().required(),
              logo: Yup.string().required(),
              address: Yup.string().required(),

              // name: Yup.string().required(),
              // coordinates: Yup.array().min(2).max(2).of(Yup.number()),
              // region: Yup.string().required(),
            })
          )
          .required(t("text", { ns: "constructorFields" })),
        change_order: Yup.string()
          .nullable()
          .required(t("text", { ns: "constructorFields" })),
        cancel_order: Yup.string()
          .nullable()
          .required(t("text", { ns: "constructorFields" })),
        live_order: Yup.string()
          .nullable()
          .required(t("text", { ns: "constructorFields" })),
      })
    ),
  });

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
                new Date(getValues("change_order")).getUTCHours() > 10
                  ? new Date(getValues("change_order")).getUTCHours()
                  : `0${new Date(getValues("change_order")).getUTCHours()}`
              }:${
                new Date(getValues("change_order")).getUTCMinutes() > 10
                  ? new Date(getValues("change_order")).getUTCMinutes()
                  : `0${new Date(getValues("change_order")).getUTCMinutes()}`
              }`;

              const cancel_order_formated = `${
                new Date(getValues("cancel_order")).getUTCHours() > 10
                  ? new Date(getValues("cancel_order")).getUTCHours()
                  : `0${new Date(getValues("cancel_order")).getUTCHours()}`
              }:${
                new Date(getValues("cancel_order")).getUTCMinutes() > 10
                  ? new Date(getValues("cancel_order")).getUTCMinutes()
                  : `0${new Date(getValues("cancel_order")).getUTCMinutes()}`
              }`;

              const live_order_formated = `${
                new Date(getValues("live_order")).getUTCHours() > 10
                  ? new Date(getValues("live_order")).getUTCHours()
                  : `0${new Date(getValues("live_order")).getUTCHours()}`
              }:${
                new Date(getValues("live_order")).getUTCMinutes() > 10
                  ? new Date(getValues("live_order")).getUTCMinutes()
                  : `0${new Date(getValues("live_order")).getUTCMinutes()}`
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
                }
              );
            },
            (errors) => {
              console.log(errors);
            }
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
                    backgroundColor: state.statusColor,
                  }}
                  sx={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                  }}
                ></Box>
                <Typography component="p" variant="Reg_14">
                  {state.status}
                </Typography>
              </Box>
            </Box>

            {/* <Controller
              name="agent"
              control={control}
              render={({ field }) => (
                <StyledSelect
                  inputType="select"
                  placeholder={t("fields.agentPlaceholder")}
                  onImmediateChange={() => {}}
                  validation="none"
                  error={errors.agent?.message}
                  options={[
                    {
                      value: "romashka",
                      label: "ООО Ромашка",
                      disabled: false,
                    },
                    {
                      value: "vasilek",
                      label: "ООО Василёк",
                      disabled: false,
                    },
                    {
                      value: "sunflower",
                      label: "ООО Подсолнух",
                      disabled: false,
                    },
                  ]}
                  {...field}
                />
              )}
            /> */}
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

                  <IconButton
                    onClick={() => {
                      const currentList = getValues("organizations");
                      const updatedList = currentList.filter(
                        (item) => item.name !== organization.name
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
                        }
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
              to={withLocale(`/users/${loaderData.client.id}/select-projects`)}
              state={{
                from: `/users/client/${loaderData.client.id}`,
                status: state.status,
                statusColor: state.statusColor,
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
                        (item) => item.address !== location.address
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
                        }
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
                status: state.status,
                statusColor: state.statusColor,
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
              {t("confirmButton")}
            </Button>
            <Button
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
            </Button>
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
                      (item) => item.logo === evt.target.value
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
                      }
                    );
                  }
                }}
              />
            )}
          />
        </Box>
      </S_SwipeableDrawer>
    </>
  );
}
