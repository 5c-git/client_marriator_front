import type { ComponentPropsWithoutRef } from "react";
import { Controller } from "react-hook-form";
import { Link } from "react-router";

import type { UseFormReturn } from "react-hook-form";

import type { TFunction } from "i18next";
import type { ClientFormValues } from "../client.hooks";

import type { CheckboxSearchableDrawer } from "~/shared/ui/CheckboxSearchableDrawer/CheckboxSearchableDrawer";

import { withLocale } from "~/shared/withLocale";
import { statusCodeMap } from "~/shared/usersStatusCodeMap";

import { Button, IconButton, Avatar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";
import { StyledTextField } from "~/shared/ui/StyledTextField/StyledTextField";
import { StyledPhoneField } from "~/shared/ui/StyledPhoneField/StyledPhoneField";
import { StyledRadioButton } from "~/shared/ui/StyledRadioButton/StyledRadioButton";
import { TimeField } from "~/shared/ui/TimeField/TimeField";
import { CheckboxSearchableDrawer as CheckboxSearchableDrawerComponent } from "~/shared/ui/CheckboxSearchableDrawer/CheckboxSearchableDrawer";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FileIcon } from "~/shared/icons/FileIcon";
import { PointerIcon } from "~/shared/icons/PointerIcon";
import { CheckIcon } from "~/shared/icons/CheckIcon";
import { DeleteIcon } from "~/shared/icons/DeleteIcon";

import type { ClientLoaderData } from "../client.mapper";

import { S_SwipeableDrawer } from "../client.styled";

const getRadioButtons = (list: { id: number; name: string; logo: string }[]) => {
  return list.map((item) => ({
    id: item.id,
    value: item.logo,
    label: item.name,
    disabled: false,
    image: `${import.meta.env.VITE_ASSET_PATH}${item.logo}`,
  }));
};

type ClientViewProps = {
  loaderData: ClientLoaderData;
  userRole: string | null | undefined;
  isLoading: boolean;

  open: boolean;
  setOpen: (v: boolean) => void;
  openCounterparty: boolean;
  setOpenCounterparty: (v: boolean) => void;

  form: UseFormReturn<ClientFormValues>

  onBack: () => void;
  onDecline: () => void;
  onSubmitConfirm: (evt: React.FormEvent<HTMLFormElement>) => void;

  fetcher: {
    submit: (data: any, opts: any) => void;
  };

  t: TFunction<"users_client">;
};

export function ClientView(props: ClientViewProps) {
  const { t } = props;
  const { errors } = props.form.formState;

  return (
    <>
      {props.isLoading ? <Loader /> : null}

      <Box sx={{ paddingBottom: "54px" }}>
        <TopNavigation
          header={{ text: t("header"), bold: false }}
          backAction={props.onBack}
        />

        <form onSubmit={props.onSubmitConfirm}>
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
              src={`${import.meta.env.VITE_ASSET_PATH}${props.form.getValues().logo}`}
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
              onClick={() => props.setOpen(true)}
            >
              <Typography
                component="p"
                variant="Reg_12"
                sx={{ color: (theme) => theme.vars.palette["Grey_2"] }}
              >
                {t("fields.avatarPlaceholder")}
              </Typography>
              <Stack direction="row" sx={{ width: "100%", alignItems: "center" }}>
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
                Статус
              </Typography>
              <Box sx={{ display: "flex", columnGap: "8px", alignItems: "center" }}>
                <Box
                  style={{
                    backgroundColor:
                      statusCodeMap[
                        props.loaderData.client.status as keyof typeof statusCodeMap
                      ].color,
                  }}
                  sx={{ width: "14px", height: "14px", borderRadius: "50%" }}
                />
                <Typography component="p" variant="Reg_14">
                  {t(
                    `status.${statusCodeMap[props.loaderData.client.status as keyof typeof statusCodeMap].value}`,
                  )}
                </Typography>
              </Box>
            </Box>

            <Controller
              name="phone"
              control={props.form.control as any}
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
              control={props.form.control as any}
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

            {props.form.getValues("counterparty").length > 0 ? (
              <Typography component="p" variant="Bold_14">
                {t("counterparty")}
              </Typography>
            ) : null}

            <Stack sx={{ rowGap: "14px" }}>
              {props.form.getValues("counterparty").map((counterparty: any) => (
                <Box
                  key={counterparty.id}
                  sx={{ display: "flex", columnGap: "12px", alignItems: "center" }}
                >
                  <Typography component="p" variant="Reg_14" sx={{ flexGrow: "1" }}>
                    {counterparty.name}
                  </Typography>

                  {props.form.getValues("counterparty").length > 1 ? (
                    <IconButton
                      onClick={() => {
                        const currentList = props.form.getValues("counterparty");
                        const updatedList = currentList.filter(
                          (item: any) => item.name !== counterparty.name,
                        );
                        props.form.setValue("counterparty", updatedList);
                        void props.form.trigger("counterparty");

                        props.fetcher.submit(
                          JSON.stringify({
                            _action: "_deleteCounterparty",
                            userId: props.loaderData.client.id,
                            counterpartyId: counterparty.id,
                          }),
                          { method: "POST", encType: "application/json" },
                        );
                      }}
                      sx={{ width: "24px", height: "24px" }}
                    >
                      <DeleteIcon sx={{ width: "12px", height: "12px" }} />
                    </IconButton>
                  ) : null}
                </Box>
              ))}
            </Stack>

            <Button onClick={() => props.setOpenCounterparty(true)} variant="outlined">
              {t("counterpartySelector")}
            </Button>

            {props.form.getValues("organizations").length > 0 ? (
              <Typography component="p" variant="Bold_14">
                {t("project")}
              </Typography>
            ) : null}

            <Stack sx={{ rowGap: "14px" }}>
              {props.form.getValues("organizations").map((organization: any) => (
                <Box
                  key={organization.name}
                  sx={{ display: "flex", columnGap: "12px", alignItems: "center" }}
                >
                  <Avatar
                    src={`${import.meta.env.VITE_ASSET_PATH}${organization.logo}`}
                    sx={{ width: "30px", height: "30px" }}
                  />

                  <Typography component="p" variant="Reg_14" sx={{ flexGrow: "1" }}>
                    {organization.name}
                  </Typography>

                  {props.form.getValues("organizations").length > 1 ? (
                    <IconButton
                      onClick={() => {
                        const currentList = props.form.getValues("organizations");
                        const updatedList = currentList.filter(
                          (item: any) => item.name !== organization.name,
                        );
                        props.form.setValue("organizations", updatedList);
                        void props.form.trigger("organizations");

                        props.fetcher.submit(
                          JSON.stringify({
                            _action: "_deleteProject",
                            userId: props.loaderData.client.id,
                            projectId: organization.id,
                          }),
                          { method: "POST", encType: "application/json" },
                        );
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
              to={withLocale(`/users/${props.loaderData.client.id}/select-projects`)}
              state={{ from: `/users/client/${props.loaderData.client.id}` }}
              variant="outlined"
              startIcon={<FileIcon />}
            >
              {t("projectSelector")}
            </Button>

            {props.form.getValues("locations").length > 0 ? (
              <Typography component="p" variant="Bold_14">
                {t("location")}
              </Typography>
            ) : null}

            <Stack sx={{ rowGap: "14px" }}>
              {props.form.getValues("locations").map((location: any, index: number) => (
                <Box
                  key={index}
                  sx={{ display: "flex", columnGap: "12px", alignItems: "center" }}
                >
                  <Avatar
                    src={`${import.meta.env.VITE_ASSET_PATH}${location.logo}`}
                    sx={{ width: "30px", height: "30px" }}
                  />

                  <Typography component="p" variant="Reg_14" sx={{ flexGrow: "1" }}>
                    {location.address}
                  </Typography>

                  <IconButton
                    onClick={() => {
                      const currentList = props.form.getValues("locations");
                      const updatedList = currentList.filter(
                        (item: any) => item.address !== location.address,
                      );
                      props.form.setValue("locations", updatedList);
                      void props.form.trigger("locations");

                      props.fetcher.submit(
                        JSON.stringify({
                          _action: "_deletePlace",
                          userId: props.loaderData.client.id,
                          projectId: location.id,
                        }),
                        { method: "POST", encType: "application/json" },
                      );
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
              to={withLocale(`/users/${props.loaderData.client.id}/select-locations`)}
              state={{ from: `/users/client/${props.loaderData.client.id}` }}
              variant="outlined"
              startIcon={<PointerIcon />}
            >
              {t("locationSelector")}
            </Button>

            <Controller
              name="change_order"
              control={props.form.control as any}
              render={({ field }) => (
                <TimeField
                  placeholder={t("fields.editIntervalPlaceholder")}
                  error={errors.change_order?.message}
                  {...field}
                  value={field.value.toISOString()}
                  onChange={(value) => {
                    props.form.setValue("change_order", new Date(value));
                  }}
                />
              )}
            />
            <Controller
              name="cancel_order"
              control={props.form.control as any}
              render={({ field }) => (
                <TimeField
                  placeholder={t("fields.cancelIntervalPlaceholder")}
                  error={errors.cancel_order?.message}
                  {...field}
                  value={field.value.toISOString()}
                  onChange={(value) => {
                    props.form.setValue("cancel_order", new Date(value));
                  }}
                />
              )}
            />
            <Controller
              name="live_order"
              control={props.form.control as any}
              render={({ field }) => (
                <TimeField
                  placeholder={t("fields.durationIntervalPlaceholder")}
                  error={errors.live_order?.message}
                  {...field}
                  value={field.value.toISOString()}
                  onChange={(value) => {
                    props.form.setValue("live_order", new Date(value));
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
                {props.loaderData.client.id}
              </Typography>
            </Box>

            <Button variant="contained" type="submit" startIcon={<CheckIcon />}>
              {props.loaderData.client.confirmRegister
                ? t("saveButton")
                : t("confirmButton")}
            </Button>

            {props.userRole === "admin" ? (
              <Button variant="text" onClick={props.onDecline}>
                {t("excludeButton")}
              </Button>
            ) : null}
          </Box>
        </form>
      </Box>

      <S_SwipeableDrawer
        open={props.open}
        onClose={() => props.setOpen(false)}
        onOpen={() => {}}
        disableBackdropTransition={true}
        disableSwipeToOpen={true}
        anchor="bottom"
      >
        <Box sx={{ padding: "18px 16px" }}>
          <Controller
            name="logo"
            control={props.form.control as any}
            render={({ field }) => (
              <StyledRadioButton
                onImmediateChange={() => {}}
                inputType="radio"
                validation="none"
                options={getRadioButtons(props.loaderData.client.organizations)}
                {...field}
                onChange={(evt) => {
                  field.onChange(evt);

                  const selectedOrganization =
                    props.loaderData.client.organizations.find(
                      (item) => item.logo === evt.target.value,
                    );

                  if (selectedOrganization) {
                    props.fetcher.submit(
                      JSON.stringify({
                        _action: "_saveLogo",
                        userId: props.loaderData.client.id,
                        projectId: selectedOrganization.id,
                      }),
                      { method: "POST", encType: "application/json" },
                    );
                  }
                }}
              />
            )}
          />
        </Box>
      </S_SwipeableDrawer>

      <CheckboxSearchableDrawerComponent
        translation="counterparty"
        open={props.openCounterparty}
        onClose={() => props.setOpenCounterparty(false)}
        onSubmit={(counterparties) => {
          props.fetcher.submit(
            JSON.stringify({
              _action: "_setCounterparty",
              userId: props.loaderData.client.id,
              counterparties,
            }),
            { method: "POST", encType: "application/json" },
          );
        }}
        items={
          props.loaderData.counterparty as ComponentPropsWithoutRef<
            typeof CheckboxSearchableDrawer
          >["items"]
        }
        value={props.loaderData.client.counterparty.map((item) => item.id.toString())}
      />
    </>
  );
}

