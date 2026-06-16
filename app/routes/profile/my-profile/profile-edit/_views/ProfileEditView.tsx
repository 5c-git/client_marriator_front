import { useTranslation } from "react-i18next";
import {
  useForm,
  type Control,
  type FieldErrors,
  type UseFormSetValue,
  type UseFormTrigger,
} from "react-hook-form";

import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import {
  generateDefaultValues,
  generateInputsMarkup,
  generateValidationSchema,
} from "~/shared/constructor/constructor";
import type { Inputs } from "~/shared/constructor/inputs.schema";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

type ProfileEditViewProps = {
  headerText: string;
  formFields: Inputs;
  accessToken: string;
  onBack: () => void;
  onSubmit: (values: unknown) => void;
};

export function ProfileEditView(props: ProfileEditViewProps) {
  const { t } = useTranslation("m_profile_myProfile_profileEdit");

  const form = useForm({
    defaultValues: generateDefaultValues(props.formFields),
    resolver: zodResolver(generateValidationSchema(props.formFields)),
    mode: "onChange",
    shouldUnregister: true,
  });

  useEffect(() => {
    setTimeout(() => {
      form.reset(generateDefaultValues(props.formFields));
    });
  }, [props.formFields, form.reset]);

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
          onSubmit={form.handleSubmit((values) => {
            props.onSubmit(values);
          })}
        >
          {generateInputsMarkup(
            props.formFields,
            form.formState.errors,
            form.control,
            form.setValue,
            form.trigger,
            () => {},
            props.accessToken,
          )}

          <Box
            style={{
              "--opacity": form.formState.isDirty ? 1 : 0,
              "--pointerEvents": form.formState.isDirty ? "auto" : "none",
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
            <Button
              variant="outlined"
              onClick={() => {
                form.reset(generateDefaultValues(props.formFields));
              }}
            >
              {t("button_cancel")}
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                form.trigger();
                form.handleSubmit((values) => {
                  props.onSubmit(values);
                });
              }}
            >
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
