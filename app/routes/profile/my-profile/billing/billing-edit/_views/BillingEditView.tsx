import { useState } from "react";
import type { Control, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, Divider, Dialog, DialogTitle } from "@mui/material";
import Box from "@mui/material/Box";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { BillingRequisiteFormFields } from "../../_views/BillingRequisiteFormFields";
import type {
  BillingFormValues,
  BillingRequisiteLoaderData,
} from "../../billing.service";

type BillingEditViewProps = {
  loaderData: BillingRequisiteLoaderData;
  control: Control<BillingFormValues>;
  errors: FieldErrors<BillingFormValues>;
  handleSubmit: UseFormHandleSubmit<BillingFormValues>;
  onBack: () => void;
  onConfirmLeave: () => void;
  onSave: (values: BillingFormValues) => void;
  onDelete: () => void;
};

export function BillingEditView(props: BillingEditViewProps) {
  const { t } = useTranslation("billingEdit");
  const [openDialog, setOpenDialog] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
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
        onSubmit={props.handleSubmit((values) => {
          props.onSave(values);
        })}
      >
        <BillingRequisiteFormFields
          namespace="billingEdit"
          control={props.control}
          errors={props.errors}
          bikOptions={props.loaderData.bikOptions}
        />

        <Divider
          sx={{
            marginTop: "16px",
            marginBottom: "16px",
          }}
        />

        <Box
          sx={{
            display: "flex",
            columnGap: "8px",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <Button
            type="button"
            variant="outlined"
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            {t("button_cancel")}
          </Button>

          <Button
            type="button"
            onClick={props.handleSubmit(props.onSave)}
            variant="contained"
          >
            {t("button_save")}
          </Button>
        </Box>

        <Button
          onClick={() => {
            setOpenDelete(true);
          }}
          sx={{
            marginTop: "16px",
          }}
        >
          {t("button_delete")}
        </Button>
      </form>

      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
        sx={{
          "& .MuiDialog-paper": {
            padding: "16px",
            borderRadius: "8px",
          },
        }}
      >
        <DialogTitle
          sx={{
            padding: 0,
          }}
        >
          {t("dialog_title")}
        </DialogTitle>

        <Box
          sx={{
            display: "flex",
            columnGap: "8px",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              setOpenDialog(false);
            }}
            sx={{
              marginTop: "16px",
            }}
          >
            {t("button_no")}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              props.onConfirmLeave();
            }}
            sx={{
              marginTop: "16px",
            }}
          >
            {t("button_yes")}
          </Button>
        </Box>
      </Dialog>

      <Dialog
        open={openDelete}
        onClose={() => {
          setOpenDelete(false);
        }}
        sx={{
          "& .MuiDialog-paper": {
            padding: "16px",
            borderRadius: "8px",
          },
        }}
      >
        <DialogTitle
          sx={{
            padding: 0,
          }}
        >
          {t("delete_title")}
        </DialogTitle>

        <Box
          sx={{
            display: "flex",
            columnGap: "8px",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              setOpenDelete(false);
            }}
            sx={{
              marginTop: "16px",
            }}
          >
            {t("button_no")}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpenDelete(false);
              props.onDelete();
            }}
            sx={{
              marginTop: "16px",
            }}
          >
            {t("button_yes")}
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
}
