import { useTranslation } from "react-i18next";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { StyledSmsField } from "~/shared/ui/StyledSmsField/StyledSmsField";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

type ConfirmPersonalCodeTranslation =
  | "confirmPersonalEmail"
  | "confirmPersonalPhone";

type ConfirmPersonalCodeViewProps = {
  translation: ConfirmPersonalCodeTranslation;
  seconds: number;
  onBack: () => void;
  onSubmitCode: (code: string) => void;
  onSendAgain: () => void;
};

const createFormSchema = (requiredError: string, lengthError: string) =>
  z.object({
    code: z
      .string({ error: requiredError })
      .length(4, { error: lengthError }),
  });

export function ConfirmPersonalCodeView(props: ConfirmPersonalCodeViewProps) {
  const { t } = useTranslation(props.translation);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(
      createFormSchema(t("inputValidation"), t("inputValidation_lenght")),
    ),
  });

  const submitForm = handleSubmit((values) => {
    props.onSubmitCode(values.code);
  });

  return (
    <Box>
      <TopNavigation
        header={{
          text: t("header"),
          bold: false,
        }}
        backAction={props.onBack}
      />

      <Box
        sx={{
          padding: "20px 16px",
        }}
      >
        <form
          style={{
            display: "grid",
            rowGap: "4px",
          }}
          onSubmit={submitForm}
        >
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <StyledSmsField
                inputType="sms"
                error={errors.code?.message}
                placeholder={t("inputPlaceholder")}
                onImmediateChange={handleSubmit((values) => {
                  props.onSubmitCode(values.code);
                })}
                {...field}
              />
            )}
          />
        </form>

        <Button
          type="button"
          variant="text"
          disabled={props.seconds > 0}
          sx={{
            fontSize: "1rem",
            lineHeight: "1.25rem",
          }}
          onClick={props.onSendAgain}
        >
          {t("sendAgain")}
        </Button>

        {props.seconds !== 0 ? (
          <Typography
            component="p"
            variant="Reg_12"
            sx={(theme) => ({
              color: theme.vars.palette["Black"],
              textAlign: "center",
            })}
          >
            {t("timer")}{" "}
            <Typography
              component="span"
              variant="Bold_12"
              sx={(theme) => ({
                color: theme.vars.palette["Black"],
              })}
            >
              {Math.floor(props.seconds / 60) < 10
                ? `0${Math.floor(props.seconds / 60)}`
                : Math.floor(props.seconds / 60)}
              :
              {props.seconds % 60 < 10
                ? `0${props.seconds % 60}`
                : props.seconds % 60}
            </Typography>
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
}
