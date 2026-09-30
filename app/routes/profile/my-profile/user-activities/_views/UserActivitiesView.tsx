import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import {
  generateDefaultValues,
  generateInputsMarkup,
  generateValidationSchema,
} from "~/shared/constructor/constructor";
import type { UserActivitiesLoaderData } from "../user-activities.service";
import { zodResolver } from "@hookform/resolvers/zod";

type UserActivitiesViewProps = {
  data: UserActivitiesLoaderData;
  step: number;
  onBack: () => void;
  onFormSubmit: (values: unknown) => void;
  onFieldChange: (values: unknown) => void;
};

export function UserActivitiesView(props: UserActivitiesViewProps) {
  const { t } = useTranslation("m_profile_myProfile_userActivities");

  const form = useForm({
    defaultValues: generateDefaultValues(props.data.formFields),
    resolver: zodResolver(generateValidationSchema(props.data.formFields)),
    mode: "onChange",
    shouldUnregister: true,
  });

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
        onSubmit={form.handleSubmit((values) => {
          props.onFormSubmit(values);
        })}
      >
        {generateInputsMarkup(
          props.data.formFields,
          form.formState.errors,
          form.control,
          form.setValue,
          form.trigger,
          () => {
            props.onFieldChange(form.getValues());
          },
          props.data.accessToken,
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
          <Button
            variant="contained"
            onClick={form.handleSubmit((values) => {
              props.onFormSubmit(values);
            })}
          >
            {t("finishButton")}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
