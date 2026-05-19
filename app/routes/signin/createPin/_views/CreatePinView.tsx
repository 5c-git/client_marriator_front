import { useState } from "react";
import { useTranslation } from "react-i18next";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { Typography, Snackbar, Alert, Divider } from "@mui/material";
import Box from "@mui/material/Box";

import { StyledOptField } from "~/shared/ui/StyledOtpField/StyledOtpField";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

type CreatePinViewInterface = {
  translation: "createPin";
  backAction: () => void;
  submitPinAction: (pin: string) => void;
};

const createFormSchema = (mismatchError: string) =>
  z
    .object({
      pin: z.string().length(4),
      confirmPin: z.string(),
    })
    .superRefine(({ confirmPin, pin }, ctx) => {
      if (confirmPin !== pin) {
        ctx.addIssue({
          code: "custom",
          message: mismatchError,
          input: confirmPin,
          path: ["confirmPin"],
        });
      }
    });

export function CreatePinView(props: CreatePinViewInterface) {
  const { t } = useTranslation("CreatePinView");

  const [step, setStep] = useState<1 | 2>(1);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      pin: "",
      confirmPin: "",
    },
    resolver: zodResolver(createFormSchema(t(`${props.translation}.error`))),
  });

  const submitForm = handleSubmit(() => {
    props.submitPinAction(getValues("confirmPin"));
  });

  return (
    <>
      <Box>
        <TopNavigation
          header={{
            text: t(`${props.translation}.header`),
            bold: false,
          }}
          backAction={() => {
            if (step === 2) {
              setStep(1);
              reset();
            } else {
              props.backAction();
            }
          }}
        />

        <Box
          sx={{
            paddingTop: "24px",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <Typography
            component="p"
            variant="Reg_18"
            sx={(theme) => ({
              color: theme.vars.palette["Black"],
              textAlign: "center",
              paddingBottom: "24px",
            })}
          >
            {t(`${props.translation}.intro`)}
          </Typography>

          <Divider />

          <Typography
            component="p"
            variant="Reg_14"
            sx={(theme) => ({
              color: theme.vars.palette["Black"],
              textAlign: "center",
              paddingTop: "24px",
              paddingBottom: "20px",
            })}
          >
            {step === 1 ? t(`${props.translation}.text`) : t(`${props.translation}.text_step2`)}
          </Typography>

          <form
            style={{
              display: "grid",
              rowGap: "4px",
            }}
            onSubmit={submitForm}
          >
            {step === 1 ? (
              <Controller
                name="pin"
                control={control}
                render={({ field }) => (
                  <StyledOptField
                    error={errors.pin ? true : false}
                    style={{
                      margin: "0 auto",
                    }}
                    onComplete={() => {
                      setStep(2);
                    }}
                    {...field}
                  />
                )}
              />
            ) : null}

            {step === 2 ? (
              <Controller
                name="confirmPin"
                control={control}
                render={({ field }) => (
                  <StyledOptField
                    error={errors.confirmPin ? true : false}
                    style={{
                      margin: "0 auto",
                    }}
                    onComplete={(value) => {
                      handleSubmit(() => {
                        props.submitPinAction(value);
                      })();
                    }}
                    {...field}
                  />
                )}
              />
            ) : null}
          </form>
        </Box>
      </Box>

      <Snackbar
        open={errors.confirmPin || errors.pin ? true : false}
        autoHideDuration={3000}
      >
        <Alert
          severity="info"
          variant="small"
          color="Banner_Error"
          sx={{
            width: "100%",
          }}
        >
          {t(`${props.translation}.error`)}
        </Alert>
      </Snackbar>
    </>
  );
}
