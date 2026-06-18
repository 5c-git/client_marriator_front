import type { ReactNode, Ref } from "react";
import { useState } from "react";

import { Link } from "react-router";

import { useTranslation } from "react-i18next";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

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

import { MaskedField } from "~/shared/ui/MaskedField/MaskedField";
import { TimeField } from "~/shared/ui/TimeField/TimeField";
import { S_SwipeableDrawer } from "../manager.styled";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FileIcon } from "~/shared/icons/FileIcon";
import { PointerIcon } from "~/shared/icons/PointerIcon";
import { DeleteIcon } from "~/shared/icons/DeleteIcon";
import { ManagerData } from "../manager.mapper";

type ManagerFormValues = {
  logo: string;
  phone: string;
  name: string;
  counterparty: { id: number; name: string }[];
  organizations: { id: number; logo: string; name: string }[];
  locations: { id: number; logo: string; address: string }[];
  change_task: Date;
  cancel_task: Date;
  live_task: Date;
  repeat_bid: Date;
  leave_bid: Date;
  notification_start: string;
};

type ManagerViewProps = {
  data: ManagerData;
  supervisorsActionSlot: ReactNode;
  counterpartyActionSlot: ReactNode;
  bottomSlot: ReactNode;
  ref: Ref<HTMLFormElement>;

  onBack: () => void;
  onSubmit: (values: ManagerFormValues) => void;
  onSaveLogo: (values: { userId: number; projectId: number }) => void;

  onDeleteCounterparty: (values: {
    userId: number;
    counterpartyId: number;
  }) => void;
  onDeleteProject: (values: { userId: number; projectId: number }) => void;
  onDeletePlace: (values: { userId: number; projectId: number }) => void;
  onDeleteSupervisor: (values: {
    userId: number;
    supervisorId: number;
  }) => void;
  onDecline: () => void;
};

export function ManagerView(props: ManagerViewProps) {
  const { t } = useTranslation("m_users_manager");

  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      logo: props.data.client.logo ? props.data.client.logo : "",
      phone: props.data.client.phone,
      name: props.data.client.name,
      counterparty: props.data.client.counterparty,
      organizations: props.data.client.organizations,
      locations: props.data.client.locations,
      change_task: new Date(`2000-01-01T${props.data.client.change_task}`),
      cancel_task: new Date(`2000-01-01T${props.data.client.cancel_task}`),
      live_task: new Date(`2000-01-01T${props.data.client.live_task}`),
      repeat_bid: new Date(`2000-01-01T${props.data.client.repeat_bid}`),
      leave_bid: new Date(`2000-01-01T${props.data.client.leave_bid}`),
      notification_start: props.data.client.notification_start,
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
        change_task: z.date({ error: t("text", { ns: "constructorFields" }) }),
        cancel_task: z.date({ error: t("text", { ns: "constructorFields" }) }),
        live_task: z.date({ error: t("text", { ns: "constructorFields" }) }),
        repeat_bid: z.date({ error: t("text", { ns: "constructorFields" }) }),
        leave_bid: z.date({ error: t("text", { ns: "constructorFields" }) }),
        notification_start: z.string({
          error: t("text", { ns: "constructorFields" }),
        }),
      }),
    ),
  });

  return (
    <>
      <Box sx={{ paddingBottom: "54px" }}>
        <TopNavigation
          header={{ text: t("header"), bold: false }}
          backAction={props.onBack}
        />
        <form
          onSubmit={form.handleSubmit((values) => {
            props.onSubmit(values);
          })}
          ref={props.ref}
        >
          <Box sx={{ display: "grid", rowGap: "14px", pt: "20px", px: "16px" }}>
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
              onClick={() => setOpen(true)}
            >
              <Typography
                component="p"
                variant="Reg_12"
                sx={{ color: (theme) => theme.vars.palette["Grey_2"] }}
              >
                {t("fields.avatarPlaceholder")}
              </Typography>
              <Stack
                direction="row"
                sx={{ width: "100%", alignItems: "center" }}
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
                </Typography>
                <KeyboardArrowDownIcon
                  sx={{ color: (theme) => theme.vars.palette["Grey_2"] }}
                />
              </Stack>
            </Button>

            <Box>
              <Typography
                component="p"
                variant="Reg_12"
                sx={(theme) => ({ color: theme.vars.palette.Grey_2 })}
              >
                {t("fields.statusPlaceholder")}
              </Typography>
              <Box
                sx={{ display: "flex", columnGap: "8px", alignItems: "center" }}
              >
                <Box
                  style={{
                    backgroundColor:
                      statusCodeMap[
                        props.data.client.status as keyof typeof statusCodeMap
                      ].color,
                  }}
                  sx={{ width: "14px", height: "14px", borderRadius: "50%" }}
                />
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
            <Stack sx={{ rowGap: "14px" }}>
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
                    sx={{ flexGrow: "1" }}
                  >
                    {counterparty.name}
                  </Typography>
                  {form.getValues("counterparty").length > 1 ? (
                    <IconButton
                      onClick={() => {
                        const updatedList = form
                          .getValues("counterparty")
                          .filter((item) => item.name !== counterparty.name);
                        form.setValue("counterparty", updatedList);
                        form.trigger("counterparty");

                        props.onDeleteCounterparty({
                          userId: props.data.client.id,
                          counterpartyId: counterparty.id,
                        });
                      }}
                      sx={{ width: "24px", height: "24px" }}
                    >
                      <DeleteIcon sx={{ width: "12px", height: "12px" }} />
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
            <Stack sx={{ rowGap: "14px" }}>
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
                    src={`${import.meta.env.VITE_ASSET_PATH}${organization.logo}`}
                    sx={{ width: "30px", height: "30px" }}
                  />
                  <Typography
                    component="p"
                    variant="Reg_14"
                    sx={{ flexGrow: "1" }}
                  >
                    {organization.name}
                  </Typography>
                  {form.getValues("organizations").length > 1 ? (
                    <IconButton
                      onClick={() => {
                        const updatedList = form
                          .getValues("organizations")
                          .filter((item) => item.name !== organization.name);
                        form.setValue("organizations", updatedList);
                        form.trigger("organizations");

                        props.onDeleteProject({
                          userId: props.data.client.id,
                          projectId: organization.id,
                        });
                      }}
                      sx={{ width: "24px", height: "24px" }}
                    >
                      <DeleteIcon sx={{ width: "12px", height: "12px" }} />
                    </IconButton>
                  ) : null}
                </Box>
              ))}
            </Stack>

            <Button
              component={Link}
              to={withLocale(`/users/${props.data.client.id}/select-projects`)}
              state={{ from: `/users/manager/${props.data.client.id}` }}
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
            <Stack sx={{ rowGap: "14px" }}>
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
                    sx={{ flexGrow: "1" }}
                  >
                    {location.address}
                  </Typography>
                  <IconButton
                    onClick={() => {
                      const updatedList = form
                        .getValues("locations")
                        .filter((item) => item.address !== location.address);
                      form.setValue("locations", updatedList);
                      form.trigger("locations");

                      props.onDeletePlace({
                        userId: props.data.client.id,
                        projectId: location.id,
                      });
                    }}
                    sx={{ width: "24px", height: "24px" }}
                  >
                    <DeleteIcon sx={{ width: "12px", height: "12px" }} />
                  </IconButton>
                </Box>
              ))}
            </Stack>

            <Button
              component={Link}
              to={withLocale(`/users/${props.data.client.id}/select-locations`)}
              state={{ from: `/users/manager/${props.data.client.id}` }}
              variant="outlined"
              startIcon={<PointerIcon />}
            >
              {t("locationSelector")}
            </Button>

            {props.data.currentSupervisors.length > 0 ? (
              <>
                <Typography component="p" variant="Bold_14">
                  {t("supervisor")}
                </Typography>
                <Stack sx={{ rowGap: "14px" }}>
                  {props.data.currentSupervisors.map((supervisor) => (
                    <Box
                      key={supervisor.id}
                      sx={{
                        display: "flex",
                        columnGap: "12px",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        src={`${import.meta.env.VITE_ASSET_PATH}${supervisor.logo}`}
                        sx={{ width: "30px", height: "30px" }}
                      />
                      <Typography
                        component="p"
                        variant="Reg_14"
                        sx={{ flexGrow: "1" }}
                      >
                        {supervisor.email}
                      </Typography>
                      <IconButton
                        onClick={() => {
                          props.onDeleteSupervisor({
                            userId: props.data.client.id,
                            supervisorId: supervisor.id,
                          });
                        }}
                        sx={{ width: "24px", height: "24px" }}
                      >
                        <DeleteIcon sx={{ width: "12px", height: "12px" }} />
                      </IconButton>
                    </Box>
                  ))}
                </Stack>
              </>
            ) : null}

            {props.supervisorsActionSlot}

            <Controller
              name="change_task"
              control={form.control}
              render={({ field }) => (
                <TimeField
                  placeholder={t("fields.editIntervalPlaceholder")}
                  error={form.formState.errors.change_task?.message}
                  {...field}
                  value={field.value.toISOString()}
                  onChange={(value) =>
                    form.setValue("change_task", new Date(value))
                  }
                />
              )}
            />
            <Controller
              name="cancel_task"
              control={form.control}
              render={({ field }) => (
                <TimeField
                  placeholder={t("fields.cancelIntervalPlaceholder")}
                  error={form.formState.errors.cancel_task?.message}
                  {...field}
                  value={field.value.toISOString()}
                  onChange={(value) =>
                    form.setValue("cancel_task", new Date(value))
                  }
                />
              )}
            />
            <Controller
              name="live_task"
              control={form.control}
              render={({ field }) => (
                <TimeField
                  placeholder={t("fields.durationIntervalPlaceholder")}
                  error={form.formState.errors.live_task?.message}
                  {...field}
                  value={field.value.toISOString()}
                  onChange={(value) =>
                    form.setValue("live_task", new Date(value))
                  }
                />
              )}
            />
            <Controller
              name="repeat_bid"
              control={form.control}
              render={({ field }) => (
                <TimeField
                  placeholder={t("fields.applicationFrequencyPlaceholder")}
                  error={form.formState.errors.repeat_bid?.message}
                  {...field}
                  value={field.value.toISOString()}
                  onChange={(value) =>
                    form.setValue("repeat_bid", new Date(value))
                  }
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
                  onChange={(value) =>
                    form.setValue("leave_bid", new Date(value))
                  }
                />
              )}
            />

            <Controller
              name="notification_start"
              control={form.control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("fields.specialistTimerPlaceholder")}
                  error={
                    form.formState.errors.notification_start?.message
                      ? true
                      : false
                  }
                  helperText={form.formState.errors.notification_start?.message}
                  slotProps={{
                    input: {
                      inputComponent: MaskedField as never,
                      inputProps: { mask: "00" },
                      inputMode: "numeric",
                      type: "tel",
                    },
                  }}
                />
              )}
            />

            <Box>
              <Typography
                component="p"
                variant="Reg_12"
                sx={(theme) => ({ color: theme.vars.palette["Grey_2"] })}
              >
                {t("user_id")}
              </Typography>
              <Typography
                component="p"
                variant="Reg_14"
                sx={(theme) => ({ color: theme.vars.palette["Black"] })}
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
        onClose={() => setOpen(false)}
        onOpen={() => {}}
        disableBackdropTransition={true}
        disableSwipeToOpen={true}
        anchor="bottom"
      >
        <Box sx={{ padding: "18px 16px" }}>
          <Controller
            name="logo"
            control={form.control}
            render={({ field }) => (
              <StyledRadioButton
                onImmediateChange={() => {}}
                inputType="radio"
                validation="none"
                options={props.data.organizationsToSelect}
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
