import { useTranslation } from "react-i18next";
import type { Control, FieldErrors, UseFormSetValue, UseFormTrigger } from "react-hook-form";

import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { generateInputsMarkup } from "~/shared/constructor/constructor";
import type { Inputs } from "~/shared/constructor/inputs.schema";

type ProfileEditViewProps = {
  headerText: string;
  formFields: Inputs;
  accessToken: string;
  errors: FieldErrors;
  control: Control;
  isDirty: boolean;
  onBack: () => void;
  onSubmit: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  setValue: UseFormSetValue<{
    [x: string]: unknown;
    [x: number]: unknown;
  }>;
  trigger: UseFormTrigger<{
    [x: string]: unknown;
    [x: number]: unknown;
  }>;
};

export function ProfileEditView(props: ProfileEditViewProps) {
  const { t } = useTranslation("profileEdit");

  return (
    <Box
      sx={{
        paddingBottom: "92px",
      }}
    >
      <TopNavigation
        header={{
          text: props.headerText,
          bold: false,
        }}
        backAction={props.onBack}
      />

      {props.formFields.length > 0 ? (
        <form
          style={{
            display: "grid",
            rowGap: "16px",
            paddingTop: "26px",
          }}
          onSubmit={props.onSubmit}
        >
          {generateInputsMarkup(
            props.formFields,
            props.errors,
            props.control,
            props.setValue,
            props.trigger,
            () => {},
            props.accessToken,
          )}

          <Box
            style={{
              "--opacity": props.isDirty ? 1 : 0,
              "--pointerEvents": props.isDirty ? "auto" : "none",
            }}
            sx={(theme) => ({
              position: "fixed",
              display: "flex",
              columnGap: "8px",
              zIndex: 1,
              width: "100%",
              bottom: "54px",
              left: "0",
              padding: "21px 16px 21px 16px",
              backgroundColor: theme.vars.palette["White"],
              transition: "0.3s",
              opacity: "var(--opacity)",
              pointerEvents: "var(--pointerEvents)",
            })}
          >
            <Button variant="outlined" onClick={props.onCancel}>
              {t("button_cancel")}
            </Button>
            <Button variant="contained" onClick={props.onConfirm}>
              {t("button_confirm")}
            </Button>
          </Box>
        </form>
      ) : (
        <Typography
          component="p"
          variant="Reg_18"
          sx={{
            color: (theme) => theme.vars.palette["Black"],
            textAlign: "center",
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingTop: "16px",
          }}
        >
          {t("emptyFields")}
        </Typography>
      )}
    </Box>
  );
}
