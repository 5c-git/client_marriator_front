import { useTranslation } from "react-i18next";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";

import { StyledOptField } from "~/shared/ui/StyledOtpField/StyledOtpField";

type PinViewProps = {
  submitPinAction: (pin: string) => void;
  submitRestorePinAction: () => void;
};

const createFormSchema = () =>
  z.object({
    pin: z.string().length(4),
  });

export function PinView(props: PinViewProps) {
  const { t } = useTranslation("m_signin_pin");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pin: "",
    },
    resolver: zodResolver(createFormSchema()),
  });

  const submitForm = handleSubmit((values) => {
    props.submitPinAction(values.pin);
  });

  return (
    <Box
      sx={{
        paddingTop: "38px",
        paddingLeft: "16px",
        paddingRight: "16px",
      }}
    >
      <Typography
        component="p"
        variant="Bold_28"
        sx={(theme) => ({
          color: theme.vars.palette["Black"],
          textAlign: "center",
          paddingBottom: "8px",
        })}
      >
        {t(`header`)}
      </Typography>

      <Typography
        component="p"
        variant="Reg_18"
        sx={(theme) => ({
          color: theme.vars.palette["Black"],
          textAlign: "center",
          paddingBottom: "37px",
        })}
      >
        {t(`intro`)}
      </Typography>

      <Typography
        component="p"
        variant="Reg_14"
        sx={(theme) => ({
          color: theme.vars.palette["Black"],
          textAlign: "center",
          paddingBottom: "20px",
        })}
      >
        {t(`text`)}
      </Typography>

      <form
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        onSubmit={submitForm}
      >
        <Controller
          name="pin"
          control={control}
          render={({ field }) => (
            <StyledOptField
              error={errors.pin ? true : false}
              onComplete={(value) => {
                props.submitPinAction(value);
              }}
              {...field}
            />
          )}
        />
      </form>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          columnGap: "10px",
          paddingTop: "20px",
        }}
      >
        <Typography
          component="p"
          variant="Reg_16"
          sx={(theme) => ({
            color: theme.vars.palette["Black"],
          })}
        >
          {t(`forgetPin`)}
        </Typography>

        <Button
          type="button"
          sx={{
            textDecoration: "none",
            width: "unset",
            padding: 0,
          }}
          onClick={props.submitRestorePinAction}
        >
          <Typography
            component="p"
            variant="Bold_16"
            sx={(theme) => ({
              color: theme.vars.palette["Corp_1"],
            })}
          >
            {t(`restorePin`)}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}
