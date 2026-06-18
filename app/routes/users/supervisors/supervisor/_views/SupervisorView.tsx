import { Link } from "react-router";
import { ReactNode, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { useTranslation } from "react-i18next";

import { withLocale } from "~/shared/withLocale";
import { statusCodeMap } from "~/shared/usersStatusCodeMap";

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

import { StyledTextField } from "~/shared/ui/StyledTextField/StyledTextField";
import { StyledPhoneField } from "~/shared/ui/StyledPhoneField/StyledPhoneField";
import { StyledRadioButton } from "~/shared/ui/StyledRadioButton/StyledRadioButton";

import { TimeField } from "~/shared/ui/TimeField/TimeField";
import { MaskedField } from "~/shared/ui/MaskedField/MaskedField";

import { S_SwipeableDrawer } from "../supervisor.styled";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { FileIcon } from "~/shared/icons/FileIcon";
import { PointerIcon } from "~/shared/icons/PointerIcon";
import { DeleteIcon } from "~/shared/icons/DeleteIcon";

import type { SupervisorData } from "../supervisor.mapper";

const getRadioButtons = (list: { id: number; name: string; logo: string }[]) =>
  list.map((item) => ({
    id: item.id,
    value: item.logo,
    label: item.name,
    disabled: false,
    image: `${import.meta.env.VITE_ASSET_PATH}${item.logo}`,
  }));

export type SupervisorFormValues = {
  logo: string;
  phone: string;
  name: string;
  counterparty: { id: number; name: string }[];
  organizations: { id: number; logo: string; name: string }[];
  locations: { id: number; logo: string; address: string }[];
  repeat_bid: Date;
  leave_bid: Date;
  live_task: Date;
  waiting_task: string;
  refusal_task: Date;
  count_wait_bid: string;
  time_answer_bid: string;
  notification_start: string;
};

type SupervisorViewProps = {
  data: SupervisorData;
  onSubmit: (values: SupervisorFormValues) => void;
  onBack: () => void;

  onSaveLogo: (values: { userId: number; projectId: number }) => void;
  onDeleteProject: (values: { userId: number; projectId: number }) => void;
  onDeletePlace: (values: { userId: number; projectId: number }) => void;

  deleteManagerSlot: (values: {
    userId: number;
    managerId: number;
  }) => ReactNode;
  onDeleteCounterparty: (values: {
    userId: number;
    counterpartyId: number;
  }) => void;

  managersActionSlot: ReactNode;
  counterpartyActionSlot: ReactNode;
  bottomSlot: ReactNode;
};

export function SupervisorView(props: SupervisorViewProps) {
  const { t } = useTranslation("m_users_supervisor");

  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      logo: props.data.client.logo ? props.data.client.logo : "",
      phone: props.data.client.phone,
      name: props.data.client.name,
      counterparty: props.data.client.counterparty,
      organizations: props.data.client.organizations,
      locations: props.data.client.locations,
      repeat_bid: new Date(`2000-01-01T${props.data.client.repeat_bid}`),
      leave_bid: new Date(`2000-01-01T${props.data.client.leave_bid}`),
      live_task: new Date(`2000-01-01T${props.data.client.live_task}`),
      waiting_task: props.data.client.waiting_task
        ? props.data.client.waiting_task.toString()
        : "",
      refusal_task: new Date(`2000-01-01T${props.data.client.refusal_task}`),
      count_wait_bid: props.data.client.count_wait_bid.toString(),
      time_answer_bid: props.data.client.time_answer_bid.toString(),
      notification_start: props.data.client.notification_start.toString(),
    },
    resolver: zodResolver(
      z.object({
        logo: z.string({ error: t("text", { ns: "constructorFields" }) }),
        phone: z.string({ error: t("text", { ns: "constructorFields" }) }),
        name: z.string({ error: t("text", { ns: "constructorFields" }) }),
        counterparty: z
          .array(z.object({ id: z.number(), name: z.string() }))
          .min(1),
        organizations: z
          .array(
            z.object({ id: z.number(), logo: z.string(), name: z.string() }),
          )
          .min(1),
        locations: z
          .array(
            z.object({ id: z.number(), logo: z.string(), address: z.string() }),
          )
          .min(1),
        repeat_bid: z.date({ error: t("text", { ns: "constructorFields" }) }),
        leave_bid: z.date({ error: t("text", { ns: "constructorFields" }) }),
        live_task: z.date({ error: t("text", { ns: "constructorFields" }) }),
        waiting_task: z.string({
          error: t("text", { ns: "constructorFields" }),
        }),
        refusal_task: z.date({ error: t("text", { ns: "constructorFields" }) }),
        count_wait_bid: z.string({
          error: t("text", { ns: "constructorFields" }),
        }),
        time_answer_bid: z.string({
          error: t("text", { ns: "constructorFields" }),
        }),
        notification_start: z.string({
          error: t("text", { ns: "constructorFields" }),
        }),
      }),
    ),
  });

  return (
    <>
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
          backAction={props.onBack}
        />

        <form
          onSubmit={form.handleSubmit((values) => {
            props.onSubmit(values);
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
              src={`${import.meta.env.VITE_ASSET_PATH}${form.getValues().logo}`}
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
                {t("statusText")}
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
                        props.data.client.status as keyof typeof statusCodeMap
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
                    `status.${statusCodeMap[props.data.client.status as keyof typeof statusCodeMap].value}`,
                  )}
                </Typography>
              </Box>
            </Box>

            <Controller
              name="phone"
              control={form.control}
              render={({ field }) => (
                <StyledPhoneField
                  inputType="phone"
                  placeholder={t("fields.phonePlaceholder")}
                  onImmediateChange={() => {}}
                  validation="none"
                  error={form.formState.errors.phone?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="name"
              control={form.control}
              render={({ field }) => (
                <StyledTextField
                  inputType="text"
                  placeholder={t("fields.name")}
                  onImmediateChange={() => {}}
                  validation="none"
                  error={form.formState.errors.name?.message}
                  {...field}
                />
              )}
            />

            {form.getValues("counterparty").length > 0 ? (
              <Typography component="p" variant="Bold_14">
                {t("counterparty")}
              </Typography>
            ) : null}

            <Stack
              sx={{
                rowGap: "14px",
              }}
            >
              {form.getValues("counterparty").map((counterparty) => (
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

                  {form.getValues("counterparty").length > 1 ? (
                    <IconButton
                      onClick={() => {
                        const currentList = form.getValues("counterparty");
                        const updatedList = currentList.filter(
                          (item) => item.name !== counterparty.name,
                        );
                        form.setValue("counterparty", updatedList);
                        form.trigger("counterparty");

                        props.onDeleteCounterparty({
                          userId: props.data.client.id,
                          counterpartyId: counterparty.id,
                        });
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

            {props.counterpartyActionSlot}

            {form.getValues("organizations").length > 0 ? (
              <Typography component="p" variant="Bold_14">
                {t("project")}
              </Typography>
            ) : null}

            <Stack
              sx={{
                rowGap: "14px",
              }}
            >
              {form.getValues("organizations").map((organization) => (
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

                  {form.getValues("organizations").length > 1 ? (
                    <IconButton
                      onClick={() => {
                        const currentList = form.getValues("organizations");
                        const updatedList = currentList.filter(
                          (item) => item.name !== organization.name,
                        );
                        form.setValue("organizations", updatedList);
                        form.trigger("organizations");

                        props.onDeleteProject({
                          userId: props.data.client.id,
                          projectId: organization.id,
                        });
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
              to={withLocale(`/users/${props.data.client.id}/select-projects`)}
              state={{
                from: `/users/supervisor/${props.data.client.id}`,
              }}
              variant="outlined"
              startIcon={<FileIcon />}
            >
              {t("projectSelector")}
            </Button>

            {form.getValues("locations").length > 0 ? (
              <Typography component="p" variant="Bold_14">
                {t("location")}
              </Typography>
            ) : null}

            <Stack
              sx={{
                rowGap: "14px",
              }}
            >
              {form.getValues("locations").map((location, index) => (
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
                      const currentList = form.getValues("locations");
                      const updatedList = currentList.filter(
                        (item) => item.address !== location.address,
                      );
                      form.setValue("locations", updatedList);
                      form.trigger("locations");

                      props.onDeletePlace({
                        userId: props.data.client.id,
                        projectId: location.id,
                      });
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
              to={withLocale(`/users/${props.data.client.id}/select-locations`)}
              state={{
                from: `/users/supervisor/${props.data.client.id}`,
                // status: state.status,
                // statusColor: state.statusColor,
              }}
              variant="outlined"
              startIcon={<PointerIcon />}
            >
              {t("locationSelector")}
            </Button>

            {props.data.currentManagers.length > 0 ? (
              <>
                {" "}
                <Typography component="p" variant="Bold_14">
                  {t("manager")}
                </Typography>{" "}
                <Stack
                  sx={{
                    rowGap: "14px",
                  }}
                >
                  {props.data.currentManagers.map((manager, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        columnGap: "12px",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        src={`${import.meta.env.VITE_ASSET_PATH}${manager.logo}`}
                        sx={{ width: "30px", height: "30px" }}
                      />

                      <Typography
                        component="p"
                        variant="Reg_14"
                        sx={{
                          flexGrow: "1",
                        }}
                      >
                        {manager.email}
                      </Typography>

                      {props.deleteManagerSlot({
                        userId: props.data.client.id,
                        managerId: manager.id,
                      })}
                    </Box>
                  ))}
                </Stack>
              </>
            ) : null}

            {props.managersActionSlot}

            <Controller
              name="repeat_bid"
              control={form.control}
              render={({ field }) => (
                <TimeField
                  placeholder={t("fields.applicationFrequencyPlaceholder")}
                  error={form.formState.errors.repeat_bid?.message}
                  {...field}
                  value={field.value.toISOString()}
                  onChange={(value) => {
                    form.setValue("repeat_bid", new Date(value));
                  }}
                />
              )}
            />
            <Controller
              name="leave_bid"
              control={form.control}
              render={({ field }) => (
                <TimeField
                  placeholder={t("fields.applicationCountdownPlaceholder")}
                  error={form.formState.errors.leave_bid?.message}
                  {...field}
                  value={field.value.toISOString()}
                  onChange={(value) => {
                    form.setValue("leave_bid", new Date(value));
                  }}
                />
              )}
            />
            <Controller
              name="live_task"
              control={form.control}
              render={({ field }) => (
                <TimeField
                  placeholder={t("fields.taskCountdownCancelPlaceholder")}
                  error={form.formState.errors.live_task?.message}
                  {...field}
                  value={field.value.toISOString()}
                  onChange={(value) => {
                    form.setValue("live_task", new Date(value));
                  }}
                />
              )}
            />

            <Controller
              name="waiting_task"
              control={form.control}
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

            <Controller
              name="refusal_task"
              control={form.control}
              render={({ field }) => (
                <TimeField
                  placeholder={t("fields.refusalTaskPlaceholder")}
                  error={form.formState.errors.refusal_task?.message}
                  {...field}
                  value={field.value.toISOString()}
                  onChange={(value) => {
                    form.setValue("refusal_task", new Date(value));
                  }}
                />
              )}
            />

            <Controller
              name="count_wait_bid"
              control={form.control}
              render={({ field }) => (
                <TextField
                  // label={t("fields.taskCountdownCancelDurationPlaceholder")}
                  label={"count_wait_bid"}
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

            <Controller
              name="time_answer_bid"
              control={form.control}
              render={({ field }) => (
                <TextField
                  // label={t("fields.taskCountdownCancelDurationPlaceholder")}
                  label={"time_answer_bid"}
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

            <Controller
              name="notification_start"
              control={form.control}
              render={({ field }) => (
                <TextField
                  // label={t("fields.taskCountdownCancelDurationPlaceholder")}
                  label={"notification_start"}
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
                {props.data.client.id}
              </Typography>
            </Box>

            {props.bottomSlot}
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
            control={form.control}
            render={({ field }) => (
              <StyledRadioButton
                onImmediateChange={() => {}}
                inputType="radio"
                validation="none"
                options={getRadioButtons(props.data.client.organizations)}
                {...field}
                onChange={(evt) => {
                  field.onChange(evt);

                  const selectedOrganization =
                    props.data.client.organizations.find(
                      (item) => item.logo === evt.target.value,
                    );

                  if (selectedOrganization) {
                    props.onSaveLogo({
                      userId: props.data.client.id,
                      projectId: selectedOrganization.id,
                    });
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
