import { t } from "i18next";
import { useTranslation } from "react-i18next";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { StyledPhoneField } from "~/shared/ui/StyledPhoneField/StyledPhoneField";
import { phoneRegExp } from "~/shared/validators";

import type { PhoneData } from "../phone.service";

import marriator from "../marriator.svg";

type ClientPhoneViewProps = {
  data: PhoneData;
  submitAction: (phone: string) => void;
};

const createFormSchema = () =>
  z.object({
    phone: z
      .string({ error: t(`inputValidation`, { ns: "ClientPhoneView" }) })
      .regex(phoneRegExp, {
        error: t(`inputValidation_regExp`, { ns: "ClientPhoneView" }),
      }),
  });

export function ClientPhoneView(props: ClientPhoneViewProps) {
  const { t } = useTranslation("m_signin_client_phone");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: props.data.userPhone,
    },
    resolver: zodResolver(createFormSchema()),
  });

  return (
    <Box
      sx={{
        paddingRight: "16px",
        paddingLeft: "16px",
        paddingTop: "16px",
      }}
    >
      <Typography
        component="p"
        variant="Reg_18"
        sx={{
          color: (theme) => theme.vars.palette["Black"],
          paddingBottom: "58px",
        }}
      >
        {t(`header`)}
      </Typography>
      <Box
        sx={{
          width: "164px",
          height: "78px",
          margin: "0 auto",
        }}
      >
        <img
          src={marriator}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
          alt="marriator"
        />
      </Box>

      <form
        onSubmit={handleSubmit((values) => {
          props.submitAction(values.phone);
        })}
      >
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <StyledPhoneField
              inputType="phone"
              disabled
              error={errors.phone?.message}
              placeholder={t(`inputPlaceholder`)}
              onImmediateChange={() => {}}
              style={{
                paddingBottom: "16px",
                paddingTop: "38px",
              }}
              {...field}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          sx={(theme) => ({
            paddingTop: "14px",
            paddingBottom: "14px",
            ...theme.typography.Bold_16,
          })}
        >
          {t(`submitButton`)}
        </Button>
      </form>
    </Box>
  );
}
