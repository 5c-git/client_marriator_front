import { Controller } from "react-hook-form";
import { Link, type useFetcher } from "react-router";

import type { UseFormReturn } from "react-hook-form";
import type { TFunction } from "i18next";

import { withLocale } from "~/shared/withLocale";
import { statusCodeMap } from "~/shared/usersStatusCodeMap";

import {
  Button,
  IconButton,
  Avatar,
  Typography,
  TextField,
  SwipeableDrawer,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";
import { StyledTextField } from "~/shared/ui/StyledTextField/StyledTextField";
import { StyledPhoneField } from "~/shared/ui/StyledPhoneField/StyledPhoneField";
import { StyledRadioButton } from "~/shared/ui/StyledRadioButton/StyledRadioButton";
import { StyledCheckboxMultiple } from "~/shared/ui/StyledCheckboxMultiple/StyledCheckboxMultiple";
import { StyledSearchBar } from "~/shared/ui/StyledSearchBar/StyledSearchBar";
import { TimeField } from "~/shared/ui/TimeField/TimeField";
import { MaskedField } from "~/shared/ui/MaskedField/MaskedField";
import { CheckboxSearchableDrawer } from "~/shared/ui/CheckboxSearchableDrawer/CheckboxSearchableDrawer";

import { S_SwipeableDrawer } from "../supervisor.styled";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import { FileIcon } from "~/shared/icons/FileIcon";
import { PointerIcon } from "~/shared/icons/PointerIcon";
import { CheckIcon } from "~/shared/icons/CheckIcon";
import { DeleteIcon } from "~/shared/icons/DeleteIcon";

import type { SupervisorLoaderData } from "../supervisor.mapper";
import type { SupervisorFormValues } from "../supervisor.hooks";

const getRadioButtons = (list: { id: number; name: string; logo: string }[]) =>
  list.map((item) => ({
    id: item.id,
    value: item.logo,
    label: item.name,
    disabled: false,
    image: `${import.meta.env.VITE_ASSET_PATH}${item.logo}`,
  }));

type SupervisorViewProps = {
  loaderData: SupervisorLoaderData;
  userRole: string | null | undefined;
  isLoading: boolean;
  open: boolean;
  setOpen: (v: boolean) => void;
  openCounterparty: boolean;
  setOpenCounterparty: (v: boolean) => void;
  searchManagers: boolean;
  setSearchManagers: (v: boolean) => void;
  selectedManagers: SupervisorLoaderData["managersToSelect"];
  setSelectedManagers: (v: SupervisorLoaderData["managersToSelect"]) => void;
  form: UseFormReturn<SupervisorFormValues>;
  managerForm: UseFormReturn<{ searchbar: string; managers: string[] }>;
  onBack: () => void;
  onDecline: () => void;
  onSubmitConfirm: (evt: React.FormEvent<HTMLFormElement>) => void;
  fetcher: Pick<ReturnType<typeof useFetcher>, "submit">;
  t: TFunction<"users_supervisor">;
};

export function SupervisorView(props: SupervisorViewProps) {
  const { errors } = props.form.formState;
  return (
    <>
      {props.isLoading ? <Loader /> : null}

      <Box
        sx={{
          paddingBottom: "54px",
        }}
      >
        <TopNavigation
          header={{
            text: props.t("header"),
            bold: false,
          }}
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
              {props.t("avatar")}
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
                props.setOpen(true);
              }}
            >
              <Typography
                component="p"
                variant="Reg_12"
                sx={{
                  color: (theme) => theme.vars.palette["Grey_2"],
                }}
              >
                {props.t("fields.avatarPlaceholder")}
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
                  {props.t("fields.avatarValue")}
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
                {props.t("statusText")}
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
                        props.loaderData.client.status as keyof typeof statusCodeMap
                      ].color,
                  }}
                  sx={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                  }}
                ></Box>
                <Typography component="p" variant="Reg_14">
                  {props.t(
                    `status.${statusCodeMap[props.loaderData.client.status as keyof typeof statusCodeMap].value}`,
                  )}
                </Typography>
              </Box>
            </Box>

            <Controller
              name="phone"
              control={props.form.control}
              render={({ field }) => (
                <StyledPhoneField
                  inputType="phone"
                  placeholder={props.t("fields.phonePlaceholder")}
                  onImmediateChange={() => {}}
                  validation="none"
                  error={errors.phone?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="name"
              control={props.form.control}
              render={({ field }) => (
                <StyledTextField
                  inputType="text"
                  placeholder={props.t("fields.name")}
                  onImmediateChange={() => {}}
                  validation="none"
                  error={errors.name?.message}
                  {...field}
                />
              )}
            />

            {props.form.getValues("counterparty").length > 0 ? (
              <Typography component="p" variant="Bold_14">
                {props.t("counterparty")}
              </Typography>
            ) : null}

            <Stack
              sx={{
                rowGap: "14px",
              }}
            >
              {props.form.getValues("counterparty").map((counterparty) => (
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

                  {props.form.getValues("counterparty").length > 1 ? (
                    <IconButton
                      onClick={() => {
                        const currentList = props.form.getValues("counterparty");
                        const updatedList = currentList.filter(
                          (item) => item.name !== counterparty.name,
                        );
                        props.form.setValue("counterparty", updatedList);
                        props.form.trigger("counterparty");

                        props.fetcher.submit(
                          JSON.stringify({
                            _action: "_deleteCounterparty",
                            userId: props.loaderData.client.id,
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
                props.setOpenCounterparty(true);
              }}
              variant="outlined"
            >
              {props.t("counterpartySelector")}
            </Button>

            {props.form.getValues("organizations").length > 0 ? (
              <Typography component="p" variant="Bold_14">
                {props.t("project")}
              </Typography>
            ) : null}

            <Stack
              sx={{
                rowGap: "14px",
              }}
            >
              {props.form.getValues("organizations").map((organization) => (
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

                  {props.form.getValues("organizations").length > 1 ? (
                    <IconButton
                      onClick={() => {
                        const currentList = props.form.getValues("organizations");
                        const updatedList = currentList.filter(
                          (item) => item.name !== organization.name,
                        );
                        props.form.setValue("organizations", updatedList);
                        props.form.trigger("organizations");

                        props.fetcher.submit(
                          JSON.stringify({
                            _action: "_deleteProject",
                            userId: props.loaderData.client.id,
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
              to={withLocale(`/users/${props.loaderData.client.id}/select-projects`)}
              state={{
                from: `/users/supervisor/${props.loaderData.client.id}`,
                // status: state.status,
                // statusColor: state.statusColor,
              }}
              variant="outlined"
              startIcon={<FileIcon />}
            >
              {props.t("projectSelector")}
            </Button>

            {props.form.getValues("locations").length > 0 ? (
              <Typography component="p" variant="Bold_14">
                {props.t("location")}
              </Typography>
            ) : null}

            <Stack
              sx={{
                rowGap: "14px",
              }}
            >
              {props.form.getValues("locations").map((location, index) => (
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
                      const currentList = props.form.getValues("locations");
                      const updatedList = currentList.filter(
                        (item) => item.address !== location.address,
                      );
                      props.form.setValue("locations", updatedList);
                      props.form.trigger("locations");

                      props.fetcher.submit(
                        JSON.stringify({
                          _action: "_deletePlace",
                          userId: props.loaderData.client.id,
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
              to={withLocale(`/users/${props.loaderData.client.id}/select-locations`)}
              state={{
                from: `/users/supervisor/${props.loaderData.client.id}`,
                // status: state.status,
                // statusColor: state.statusColor,
              }}
              variant="outlined"
              startIcon={<PointerIcon />}
            >
              {props.t("locationSelector")}
            </Button>

            {props.loaderData.currentManagers.length > 0 ? (
              <>
                {" "}
                <Typography component="p" variant="Bold_14">
                  {props.t("manager")}
                </Typography>{" "}
                <Stack
                  sx={{
                    rowGap: "14px",
                  }}
                >
                  {props.loaderData.currentManagers.map((manager, index) => (
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

                      {props.userRole === "admin" ? (
                        <IconButton
                          onClick={() => {
                            props.fetcher.submit(
                              JSON.stringify({
                                _action: "_deleteManager",
                                userId: props.loaderData.client.id,
                                managerId: manager.id,
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
              </>
            ) : null}

            {props.userRole === "admin" ? (
              <Button
                variant="outlined"
                onClick={() => {
                  props.setSearchManagers(true);
                }}
                // startIcon={<PointerIcon />}
              >
                {props.t("managerInviteButton")}
              </Button>
            ) : null}

            <Controller
              name="repeat_bid"
              control={props.form.control}
              render={({ field }) => (
                <TimeField
                  placeholder={props.t("fields.applicationFrequencyPlaceholder")}
                  error={errors.repeat_bid?.message}
                  {...field}
                  value={field.value.toISOString()}
                  onChange={(value) => {
                    props.form.setValue("repeat_bid", new Date(value));
                  }}
                />
              )}
            />
            <Controller
              name="leave_bid"
              control={props.form.control}
              render={({ field }) => (
                <TimeField
                  placeholder={props.t("fields.applicationCountdownPlaceholder")}
                  error={errors.leave_bid?.message}
                  {...field}
                  value={field.value.toISOString()}
                  onChange={(value) => {
                    props.form.setValue("leave_bid", new Date(value));
                  }}
                />
              )}
            />
            <Controller
              name="live_task"
              control={props.form.control}
              render={({ field }) => (
                <TimeField
                  placeholder={props.t("fields.taskCountdownCancelPlaceholder")}
                  error={errors.live_task?.message}
                  {...field}
                  value={field.value.toISOString()}
                  onChange={(value) => {
                    props.form.setValue("live_task", new Date(value));
                  }}
                />
              )}
            />

            <Controller
              name="waiting_task"
              control={props.form.control}
              render={({ field }) => (
                <TextField
                  label={props.t("fields.taskCountdownCancelDurationPlaceholder")}
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
              control={props.form.control}
              render={({ field }) => (
                <TimeField
                  placeholder={props.t("fields.refusalTaskPlaceholder")}
                  error={errors.refusal_task?.message}
                  {...field}
                  value={field.value.toISOString()}
                  onChange={(value) => {
                    props.form.setValue("refusal_task", new Date(value));
                  }}
                />
              )}
            />

            <Controller
              name="count_wait_bid"
              control={props.form.control}
              render={({ field }) => (
                <TextField
                  // label={props.t("fields.taskCountdownCancelDurationPlaceholder")}
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
              control={props.form.control}
              render={({ field }) => (
                <TextField
                  // label={props.t("fields.taskCountdownCancelDurationPlaceholder")}
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
              control={props.form.control}
              render={({ field }) => (
                <TextField
                  // label={props.t("fields.taskCountdownCancelDurationPlaceholder")}
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
                {props.t("user_id")}
              </Typography>
              <Typography
                component="p"
                variant="Reg_14"
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                })}
              >
                {props.loaderData.client.id}
              </Typography>
            </Box>

            {props.userRole === "admin" || props.userRole === "manager" ? (
              <>
                {" "}
                <Button
                  variant="contained"
                  type="submit"
                  startIcon={<CheckIcon />}
                >
                  {props.loaderData.client.confirmRegister
                    ? props.t("saveButton")
                    : props.t("confirmButton")}
                </Button>
                <Button variant="text" onClick={props.onDecline}>
                  {props.t("excludeButton")}
                </Button>
              </>
            ) : null}
          </Box>
        </form>
      </Box>

      <S_SwipeableDrawer
        open={props.open}
        onClose={() => {
          props.setOpen(false);
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
            control={props.form.control}
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

      <SwipeableDrawer
        open={props.searchManagers}
        onClose={() => {
          props.managerForm.reset();
          props.setSearchManagers(false);
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
            text: props.t("managerHeader"),
            bold: false,
          }}
        />
        <form
          onSubmit={props.managerForm.handleSubmit(() => {
            props.fetcher.submit(
              JSON.stringify({
                _action: "_inviteManagers",
                userId: props.loaderData.client.id,
                managers: props.managerForm.getValues("managers"),
              }),
              { method: "POST", encType: "application/json" },
            );
            props.managerForm.reset();
            props.setSearchManagers(false);
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
              control={props.managerForm.control}
              render={({ field }) => (
                <StyledSearchBar
                  placeholder={props.t("fields.managerSearchPlaceholder")}
                  {...field}
                  onChange={(evt) => {
                    const currentFieldValue = new RegExp(
                      `${evt.target.value}`,
                      "i",
                    );

                    let matchingManagers: typeof props.loaderData.managersToSelect =
                      [];

                    if (evt.target.value !== "") {
                      matchingManagers = [
                        ...props.selectedManagers.filter((item) =>
                          currentFieldValue.test(item.label),
                        ),
                      ];
                    } else {
                      matchingManagers = [...props.loaderData.managersToSelect];
                    }

                    props.setSelectedManagers(matchingManagers);

                    field.onChange(evt);
                  }}
                />
              )}
            />

            <Controller
              name="managers"
              control={props.managerForm.control}
              render={({ field }) => (
                <StyledCheckboxMultiple
                  inputType="checkboxMultiple"
                  onImmediateChange={() => {}}
                  options={props.selectedManagers}
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
              <Button type="submit" variant="contained" startIcon={<AddIcon />}>
                {props.t("managerInviteButton")}
              </Button>
            </Box>
          </Box>
        </form>
      </SwipeableDrawer>

      <CheckboxSearchableDrawer
        translation="counterparty"
        open={props.openCounterparty}
        onClose={() => {
          props.setOpenCounterparty(false);
        }}
        onSubmit={(counterparties) => {
          props.fetcher.submit(
            JSON.stringify({
              _action: "_setCounterparty",
              userId: props.loaderData.client.id,
              counterparties,
            }),
            {
              method: "POST",
              encType: "application/json",
            },
          );
        }}
        items={props.loaderData.counterparty}
        value={props.loaderData.client.counterparty.map((item) => item.id.toString())}
      />
    </>
  );
}
