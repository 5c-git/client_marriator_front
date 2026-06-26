import { Link } from "react-router";
import { useState } from "react";

import type { NewTaskMobileViewInterface } from "./NewTaskMobileViewInterface";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm, Controller } from "react-hook-form";

import Box from "@mui/material/Box";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { StyledSelect } from "~/shared/ui/StyledSelect/StyledSelect";
import { StyledCheckbox } from "~/shared/ui/StyledCheckbox/StyledCheckbox";

import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

export function NewTaskMobileView(props: NewTaskMobileViewInterface) {
  const { t } = useTranslation("m_tasks_newTask");

  const [serviceToDelete, setServiceToDelete] = useState<{
    id: number;
    count: number;
    name: string;
  } | null>(null);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: props.task.place.id,
      project: props.task.projectId ? props.task.projectId : "",
      selfEmployed: props.task.selfEmployed,
    },
    resolver: zodResolver(
      z.object({
        location: z.string(t("text", { ns: "constructorFields" })),
        project: z.string(t("text", { ns: "constructorFields" })),
        selfEmployed: z.boolean(),
      }),
    ),
    mode: "onChange",
  });

  return (
    <>
      <TopNavigation
        header={{
          text: t(`header`),
          bold: false,
        }}
        backAction={props.headerBackAction}
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
          onSubmit={handleSubmit((values) => {})}
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
                placeholder={t(`fields.locationPlaceholder`)}
                onImmediateChange={() => {
                  props.submitAction(
                    getValues("location"),
                    getValues("project"),
                    getValues("selfEmployed"),
                  );
                }}
                validation="none"
                error={errors.location?.message}
                options={props.placesOptions}
                {...field}
              />
            )}
          />

          <Controller
            name="project"
            control={control}
            render={({ field }) =>
              props.projectsOptions.length > 0 ? (
                <StyledSelect
                  inputType="select"
                  placeholder={t(`fields.projectPlaceholder`)}
                  onImmediateChange={() => {
                    props.submitAction(
                      getValues("location"),
                      getValues("project"),
                      getValues("selfEmployed"),
                    );
                  }}
                  validation="none"
                  error={errors.project?.message}
                  options={props.projectsOptions}
                  {...field}
                />
              ) : (
                <></>
              )
            }
          />

          {!props.task.isNewTask ? (
            <Controller
              name="selfEmployed"
              control={control}
              render={({ field }) => (
                <StyledCheckbox
                  inputType="checkbox"
                  label={t(`fields.selfEmployedPlaceholder`)}
                  onImmediateChange={() => {
                    props.submitAction(
                      getValues("location"),
                      getValues("project"),
                      getValues("selfEmployed"),
                    );
                  }}
                  validation="none"
                  error={errors.selfEmployed?.message}
                  {...field}
                />
              )}
            />
          ) : null}
        </form>

        {props.task.taskServices.length > 0 ? (
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
              {t(`services`)}
            </Typography>
            {props.task.taskServices.map((item) => (
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
                    textDecoration: "none",
                  }}
                  component={Link}
                  to={withLocale(
                    `/tasks/${props.task.id}/service/${item.id}?new=true`,
                  )}
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
                    {t(`serviceAmount`)} {item.count}
                  </Typography>
                </Box>

                <IconButton
                  sx={{
                    padding: 0,
                  }}
                  onClick={() => {
                    setServiceToDelete(item);
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
          to={withLocale(`/tasks/${props.task.id}/service?new=true`)}
          variant="outlined"
          disabled={props.task.isNewTask}
          startIcon={<AddIcon />}
        >
          {t(`serviceButton`)}
        </Button>

        {props.task.invitedSupervisors.length > 0 ? (
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
              {t(`invitedSupervisors`)}
            </Typography>
            {props.task.invitedSupervisors.map((supervisor) => (
              <Box
                key={supervisor.id}
                sx={{
                  display: "flex",
                  columnGap: "4px",
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
                  sx={(theme) => ({
                    color: theme.vars.palette["Black"],
                  })}
                >
                  {supervisor.id}
                </Typography>
                <Typography
                  component="p"
                  variant="Reg_14"
                  sx={(theme) => ({
                    color: theme.vars.palette["Black"],
                  })}
                >
                  {supervisor.name}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : null}

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={props.drawerAction}
          disabled={props.task.isNewTask || props.task.taskServices.length < 1}
        >
          {t(`supervisorButton`)}
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
            disabled={props.task.isNewTask}
            onClick={props.cancelAction}
          >
            {t(`cancelButton`)}
          </Button>
        </Box>
      </Box>

      <Dialog
        open={serviceToDelete ? true : false}
        onClose={() => {
          setServiceToDelete(null);
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
          {t(`dialog.title`)}&nbsp;"
          {serviceToDelete?.name}"&nbsp;?
        </DialogTitle>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setServiceToDelete(null);
            }}
          >
            {t(`dialog.no`)}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              props.deleteAction(serviceToDelete?.id as number);
              setServiceToDelete(null);
            }}
          >
            {t(`dialog.yes`)}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
