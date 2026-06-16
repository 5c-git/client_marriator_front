import { useTranslation } from "react-i18next";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { StyledSmsField } from "~/shared/ui/StyledSmsField/StyledSmsField";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

type ConfirmPersonalCodeProps = {
  translation: "confirmPersonalEmail" | "confirmPersonalPhone";
  seconds: number;
  onBack: () => void;
  onSubmitCode: (code: string) => void;
  onSendAgain: () => void;
};

export function ConfirmPersonalCode(props: ConfirmPersonalCodeProps) {
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
      z.object({
        code: z
          .string({ error: t("inputValidation") })
          .length(4, { error: t("inputValidation_lenght") }),
      }),
    ),
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
          onSubmit={handleSubmit((values) => {
            props.onSubmitCode(values.code);
          })}
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
