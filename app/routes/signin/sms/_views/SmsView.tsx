import { t } from "i18next";
import { useTranslation } from "react-i18next";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { StyledSmsField } from "~/shared/ui/StyledSmsField/StyledSmsField";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

type SmsViewInterface = {
  translation: "sms";
  phone: string;
  seconds: number;
  backAction: () => void;
  submitSmsAction: (values: SubmitValues) => void;
  submitResendAction: () => void;
};

type SubmitValues = z.output<ReturnType<typeof createFormSchema>>;

const createFormSchema = (translation: SmsViewInterface["translation"]) =>
  z.object({
    phone: z.string().optional(),
    sms: z
      .string({ error: t(`${translation}.inputValidation`, { ns: "SmsView" }) })
      .length(4, {
        error: t(`${translation}.inputValidation_lenght`, { ns: "SmsView" }),
      }),
  });

export function SmsView(props: SmsViewInterface) {
  const { t } = useTranslation("SmsView");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: props.phone,
      sms: "",
    },
    resolver: zodResolver(createFormSchema(props.translation)),
  });

  const submitForm = handleSubmit((values) => {
    props.submitSmsAction(values);
  });

  return (
    <Box>
      <TopNavigation
        header={{
          text: t(`${props.translation}.header`),
          bold: false,
        }}
        backAction={props.backAction}
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
            name="sms"
            control={control}
            render={({ field }) => (
              <StyledSmsField
                inputType="sms"
                error={errors.sms?.message}
                placeholder={t(`${props.translation}.inputPlaceholder`)}
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
          {t(`${props.translation}.sendAgain`)}
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
            {t(`${props.translation}.timer`)}{" "}
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
