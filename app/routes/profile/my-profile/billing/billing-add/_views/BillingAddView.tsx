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

type BillingAddViewProps = {
  data: BillingRequisiteLoaderData;
  onBack: () => void;
  onSubmit: (values: BillingFormValues) => void;
};

const defaultValues: BillingFormValues = {
  confidant: false,
  fio: "",
  bik: "",
  account: "",
  card: "",
  payWithCard: "yes",
  cardDue: null,
};

export function BillingAddView(props: BillingAddViewProps) {
  const { t } = useTranslation("m_profile_myProfile_billing_billingAdd");
  const [openDialog, setOpenDialog] = useState(false);
  const form = useBillingRequisiteForm(
    "m_profile_myProfile_billing_billingAdd",
    defaultValues,
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

      <form onSubmit={form.handleSubmit(props.onSubmit)}>
        <BillingRequisiteFormFields
          translation="m_profile_myProfile_billing_billingAdd"
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

          <Button type="submit" variant="contained">
            {t("button_save")}
          </Button>
        </Box>
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
              form.reset(defaultValues);
              setOpenDialog(false);
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
