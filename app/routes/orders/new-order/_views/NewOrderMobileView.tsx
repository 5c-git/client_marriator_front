import { useState } from "react";
import { Link } from "react-router";

import type { NewOrderMobileViewInterface } from "./NewOrderMobileViewInterface";

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
} from "@mui/material";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { StyledSelect } from "~/shared/ui/StyledSelect/StyledSelect";
import { StyledCheckbox } from "~/shared/ui/StyledCheckbox/StyledCheckbox";

import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import ClearIcon from "@mui/icons-material/Clear";

export default function NewOrderMobileView(props: NewOrderMobileViewInterface) {
  const { t } = useTranslation("OrderMobileView");

  const [serviceToDelete, setServiceToDelete] = useState<{
    id: number;
    count: number;
    name: string;
  } | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: props.order.place.id,
      project: props.order.projectId ? props.order.projectId : "",
      selfEmployed: props.order.selfEmployed,
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
                options={props.options}
                {...field}
              />
            )}
          />

          <Controller
            name="project"
            control={control}
            render={({ field }) =>
              props.projectOptions.length > 0 ? (
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
                  options={props.projectOptions}
                  {...field}
                />
              ) : (
                <></>
              )
            }
          />

          {!props.order.isNewOrder ? (
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

        {props.order.orderServices.length > 0 ? (
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
            {props.order.orderServices.map((item) => (
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
                    `/orders/${props.order.id}/service/${item.id}?new=true`,
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
          to={withLocale(`/orders/${props.order.id}/service?new=true`)}
          variant="outlined"
          disabled={props.order.isNewOrder || watch('project') === ''}
          startIcon={<AddIcon />}
        >
          {t(`serviceButton`)}
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
            disabled={props.order.isNewOrder}
            onClick={props.cancelAction}
          >
            {t(`cancelButton`)}
          </Button>
          <Button
            variant="contained"
            disabled={props.order.orderServices.length === 0}
            onClick={props.saveAction}
            startIcon={
              <LogoutIcon
                sx={{
                  transform: "rotate(-90deg)",
                }}
              />
            }
          >
            {t(`sendButton`)}
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
