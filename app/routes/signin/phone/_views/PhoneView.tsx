import { CSSProperties } from "react";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { phoneRegExp } from "~/shared/validators";

import { useForm, Controller } from "react-hook-form";

import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { StyledPhoneField } from "~/shared/ui/StyledPhoneField/StyledPhoneField";

import marriator from "./marriator.svg";

type PhoneViewProps = {
  showLogo?: boolean;
  style?: CSSProperties;
  submitAction: (values: submitValues) => void;
};

type submitValues = z.output<ReturnType<typeof createFormSchema>>;

const createFormSchema = () =>
  z.object({
    phone: z
      .string({
        error: t(`inputValidation`, { ns: "PhoneView" }),
      })
      .regex(phoneRegExp, {
        error: t(`inputValidation_regExp`, { ns: "PhoneView" }),
      }),
  });

export function PhoneView(props: PhoneViewProps) {
  const { t } = useTranslation("m_signin_phone");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
    },
    resolver: zodResolver(createFormSchema()),
  });

  return (
    <Box sx={props.style}>
      {props.showLogo ? (
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
      ) : null}

      <form
        onSubmit={handleSubmit((values) => {
          props.submitAction(values);
        })}
      >
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <StyledPhoneField
              inputType="phone"
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

        <Button type="submit" variant="outlined">
          {t(`submitButton`)}
        </Button>
      </form>
    </Box>
  );
}
