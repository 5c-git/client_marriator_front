import type { Control, FieldErrors, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import { generateInputsMarkup } from "~/shared/constructor/constructor";
import type { UserActivitiesLoaderData } from "../user-activities.service";

type UserActivitiesViewProps = {
  loaderData: UserActivitiesLoaderData;
  step: number;
  control: Control<Record<string, unknown>>;
  errors: FieldErrors<Record<string, unknown>>;
  setValue: UseFormSetValue<Record<string, unknown>>;
  trigger: UseFormTrigger<Record<string, unknown>>;
  onBack: () => void;
  onFormSubmit: () => void;
  onFinishClick: () => void;
  onFieldChange: () => void;
};

export function UserActivitiesView(props: UserActivitiesViewProps) {
  const { t } = useTranslation("UserActivitiesView");

  return (
    <Box
      sx={{
        paddingBottom: "80px",
      }}
    >
      <TopNavigation
        header={{
          text: t("header"),
          bold: true,
        }}
        label={`${t("step")} ${props.step}`}
        backAction={props.onBack}
      />

      {props.step === 3 ? (
        <Box
          sx={{
            padding: "20px 16px",
            paddingBottom: "0",
          }}
        >
          <Typography
            component="p"
            variant="Reg_18"
            sx={(theme) => ({
              color: theme.vars.palette["Black"],
              paddingBottom: "14px",
            })}
          >
            {t("additional")}{" "}
          </Typography>
        </Box>
      ) : null}

      <form
        style={{
          display: "grid",
          rowGap: "16px",
          marginTop: "16px",
        }}
        onSubmit={(event) => {
          event.preventDefault();
          props.onFormSubmit();
        }}
      >
        {generateInputsMarkup(
          props.loaderData.formFields,
          props.errors,
          props.control,
          props.setValue,
          props.trigger,
          props.onFieldChange,
          props.loaderData.accessToken,
        )}

        <Box
          sx={(theme) => ({
            position: "fixed",
            zIndex: 1,
            width: "100%",
            bottom: "0",
            left: "0",
            padding: "10px 16px 64px 16px",
            backgroundColor: theme.vars.palette["White"],
          })}
        >
          <Button variant="contained" onClick={props.onFinishClick}>
            {t("finishButton")}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
