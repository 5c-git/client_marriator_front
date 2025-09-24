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
import type { Route } from "./+types/supervisor";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import {
  Button,
  IconButton,
  Avatar,
  Typography,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";
import { StyledSelect } from "~/shared/ui/StyledSelect/StyledSelect";
import { StyledTextField } from "~/shared/ui/StyledTextField/StyledTextField";
import { StyledPhoneField } from "~/shared/ui/StyledPhoneField/StyledPhoneField";
import { StyledRadioButton } from "~/shared/ui/StyledRadioButton/StyledRadioButton";
import { TimeField } from "~/shared/ui/TimeField/TimeField";

import { S_SwipeableDrawer } from "./supervisor.styled";

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
import { MaskedField } from "~/shared/ui/MaskedField/MaskedField";

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

      repeat_bid: data.data.repeat_bid,
      leave_bid: data.data.leave_bid,
      live_task: data.data.live_task,
      waiting_task: data.data.waiting_task,
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
    }
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Supervisor({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("users_supervisor");
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
      repeat_bid:
        `2000-01-01T${loaderData.client.repeat_bid}` as unknown as string,
      leave_bid:
        `2000-01-01T${loaderData.client.leave_bid}` as unknown as string,
      live_task:
        `2000-01-01T${loaderData.client.live_task}` as unknown as string,
      waiting_task: loaderData.client.waiting_task
        ? `2000-01-01T${loaderData.client.waiting_task}`
        : "",
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
            }),
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
            }),
          )
          .required(t("text", { ns: "constructorFields" })),
        repeat_bid: Yup.string()
          .nullable()
          .required(t("text", { ns: "constructorFields" })),
        leave_bid: Yup.string()
          .nullable()
          .required(t("text", { ns: "constructorFields" })),
        live_task: Yup.string()
          .nullable()
          .required(t("text", { ns: "constructorFields" })),
        waiting_task: Yup.string().required(
          t("text", { ns: "constructorFields" }),
        ),
      }),
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
            navigate(withLocale("/users/supervisors"), {
              viewTransition: true,
            });
          }}
        />

        <form
          onSubmit={handleSubmit((values) => {
            const repeat_bid_formated = `${
              new Date(getValues("repeat_bid")).getUTCHours() > 10
                ? new Date(getValues("repeat_bid")).getUTCHours()
                : `0${new Date(getValues("repeat_bid")).getUTCHours()}`
            }:${
              new Date(getValues("repeat_bid")).getUTCMinutes() > 10
                ? new Date(getValues("repeat_bid")).getUTCMinutes()
                : `0${new Date(getValues("repeat_bid")).getUTCMinutes()}`
            }`;

            const leave_bid_formated = `${
              new Date(getValues("leave_bid")).getUTCHours() > 10
                ? new Date(getValues("leave_bid")).getUTCHours()
                : `0${new Date(getValues("leave_bid")).getUTCHours()}`
            }:${
              new Date(getValues("leave_bid")).getUTCMinutes() > 10
                ? new Date(getValues("leave_bid")).getUTCMinutes()
                : `0${new Date(getValues("leave_bid")).getUTCMinutes()}`
            }`;

            const live_task_formated = `${
              new Date(getValues("live_task")).getUTCHours() > 10
                ? new Date(getValues("live_task")).getUTCHours()
                : `0${new Date(getValues("live_task")).getUTCHours()}`
            }:${
              new Date(getValues("live_task")).getUTCMinutes() > 10
                ? new Date(getValues("live_task")).getUTCMinutes()
                : `0${new Date(getValues("live_task")).getUTCMinutes()}`
            }`;

            submit(
              JSON.stringify({
                _action: "_confirm",
                userId: loaderData.client.id,
                confirm: "1",
                fields: {
                  ...values,
                  repeat_bid: repeat_bid_formated,
                  leave_bid: leave_bid_formated,
                  live_task: live_task_formated,
                },
              }),
              {
                method: "POST",
                encType: "application/json",
              },
            );
          })}
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
                </Box>
              ))}
            </Stack>

            <Button
              component={Link}
              to={withLocale(`/users/${loaderData.client.id}/select-projects`)}
              state={{
                from: `/users/supervisor/${loaderData.client.id}`,
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
                from: `/users/supervisor/${loaderData.client.id}`,
                status: state.status,
                statusColor: state.statusColor,
              }}
              variant="outlined"
              startIcon={<PointerIcon />}
            >
              {t("locationSelector")}
            </Button>

            <Controller
              name="repeat_bid"
              control={control}
              render={({ field }) => (
                <TimeField
                  placeholder={t("fields.applicationFrequencyPlaceholder")}
                  error={errors.repeat_bid?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="leave_bid"
              control={control}
              render={({ field }) => (
                <TimeField
                  placeholder={t("fields.applicationCountdownPlaceholder")}
                  error={errors.leave_bid?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="live_task"
              control={control}
              render={({ field }) => (
                <TimeField
                  placeholder={t("fields.taskCountdownCancelPlaceholder")}
                  error={errors.live_task?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="waiting_task"
              control={control}
              render={({ field }) => (
                <TextField
                  label={t("fields.taskCountdownCancelDurationPlaceholder")}
                  slotProps={{
                    input: {
                      inputComponent: MaskedField as never,
                      inputProps: {
                        mask: "00",
                      },
                      inputMode: "numeric",
                      type: "tel",
                    },
                  }}
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
                  },
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
    </>
  );
}
