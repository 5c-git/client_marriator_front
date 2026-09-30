import { CSSProperties } from "react";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { StyledSmsField } from "~/shared/ui/StyledSmsField/StyledSmsField";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

type SmsViewProps = {
  phone: string;
  seconds: number;
  backAction: () => void;
  backActionType: "header" | "button";
  submitSmsAction: (values: SubmitValues) => void;
  submitResendAction: () => void;
  style?: CSSProperties;
};

type SubmitValues = z.output<ReturnType<typeof createFormSchema>>;

const createFormSchema = () =>
  z.object({
    phone: z.string().optional(),
    sms: z
      .string({ error: t(`inputValidation`, { ns: "m_signin_sms" }) })
      .length(4, {
        error: t(`inputValidation_lenght`, { ns: "m_signin_sms" }),
      }),
  });

export function SmsView(props: SmsViewProps) {
  const { t } = useTranslation("m_signin_sms");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: props.phone,
      sms: "",
    },
    resolver: zodResolver(createFormSchema()),
  });

  const submitForm = handleSubmit((values) => {
    props.submitSmsAction(values);
  });

  return (
    <Box sx={props.style}>
      {props.backActionType === "header" ? (
        <TopNavigation
          header={{
            text: t(`header`),
            bold: false,
          }}
          backAction={props.backAction}
        />
      ) : null}

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
            name="sms"
            control={control}
            render={({ field }) => (
              <StyledSmsField
                inputType="sms"
                error={errors.sms?.message}
                placeholder={t(`inputPlaceholder`)}
                onImmediateChange={submitForm}
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
          onClick={props.submitResendAction}
        >
          {t(`sendAgain`)}
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
            {t(`timer`)}{" "}
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

        {props.backActionType === "button" ? (
          <Button
            type="button"
            variant="contained"
            sx={{
              fontSize: "1rem",
              lineHeight: "1.25rem",
              marginTop: "20px",
            }}
            onClick={props.backAction}
          >
            {t(`goBack`)}
          </Button>
        ) : null}
      </Box>
    </Box>
  );
}
