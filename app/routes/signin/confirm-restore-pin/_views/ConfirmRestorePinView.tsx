import { useTranslation } from "react-i18next";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { StyledSmsField } from "~/shared/ui/StyledSmsField/StyledSmsField";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

type ConfirmRestorePinViewProps = {
  translation: "confirmRestorePin";
  seconds: number;
  backAction: () => void;
  submitCodeAction: (code: string) => void;
  submitSendAgainAction: () => void;
};

const createFormSchema = (
  requiredError: string,
  lengthError: string,
) =>
  z.object({
    code: z
      .string({ error: requiredError })
      .length(4, { error: lengthError }),
  });

export function ConfirmRestorePinView(props: ConfirmRestorePinViewProps) {
  const { t } = useTranslation("ConfirmRestorePinView");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(
      createFormSchema(t(`${props.translation}.inputValidation`), t(`${props.translation}.inputValidation_lenght`)),
    ),
  });

  const submitForm = handleSubmit((values) => {
    props.submitCodeAction(values.code);
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
            name="code"
            control={control}
            render={({ field }) => (
              <StyledSmsField
                inputType="sms"
                error={errors.code?.message}
                placeholder={t(`${props.translation}.inputPlaceholder`)}
                onImmediateChange={handleSubmit((values) => {
                  props.submitCodeAction(values.code);
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
          onClick={props.submitSendAgainAction}
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
