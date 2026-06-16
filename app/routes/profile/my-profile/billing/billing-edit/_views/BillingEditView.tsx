import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button, Divider, Dialog, DialogTitle } from "@mui/material";
import Box from "@mui/material/Box";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { BillingRequisiteFormFields } from "../../_components/BillingRequisiteFormFields";
import type {
  BillingFormValues,
  BillingRequisiteLoaderData,
} from "../../billing.service";
import { useBillingRequisiteForm } from "../../billing-form.hooks";

type BillingEditViewProps = {
  data: BillingRequisiteLoaderData;
  defaultValues: BillingFormValues;
  onBack: () => void;
  onConfirmLeave: () => void;
  onSave: (values: BillingFormValues) => void;
  onDelete: () => void;
};

export function BillingEditView(props: BillingEditViewProps) {
  const { t } = useTranslation("m_profile_myProfile_billing_billingEdit");
  const [openDialog, setOpenDialog] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const form = useBillingRequisiteForm(
    "m_profile_myProfile_billing_billingEdit",
    props.defaultValues,
  );

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
        onSubmit={form.handleSubmit((values) => {
          props.onSave(values);
        })}
      >
        <BillingRequisiteFormFields
          translation="m_profile_myProfile_billing_billingEdit"
          control={form.control}
          errors={form.errors}
          bikOptions={props.data.bikOptions}
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
            onClick={form.handleSubmit(props.onSave)}
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
