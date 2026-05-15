import {t} from 'i18next';
import { useTranslation } from 'react-i18next';

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { phoneRegExp } from "~/shared/validators";

import { useForm, Controller } from "react-hook-form";

import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { StyledPhoneField } from "~/shared/ui/StyledPhoneField/StyledPhoneField";

import marriator from './marriator.svg';

type PhoneViewInterface = {
    translation: "phone";
    submitAction: (values: submitValues) => void;
  };

type submitValues = z.output<ReturnType<typeof createFormSchema>>;

const createFormSchema = (translation:PhoneViewInterface['translation'] ) => z.object({
    phone: z
      .string({ error: t(`${translation}.inputValidation`, {ns: "PhoneView"}) })
      .regex(phoneRegExp, { error: t(`${translation}.inputValidation_regExp`, {ns: "PhoneView"}) }),
  });


export function PhoneView(props: PhoneViewInterface) {
    const { t } = useTranslation("PhoneView");

    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues: {
          phone: "",
        },
        resolver: zodResolver(createFormSchema(props.translation)),
      });

    return (
    <Box
        sx={{
          paddingRight: "16px",
          paddingLeft: "16px",
          paddingTop: "60px",
        }}
      >
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
                placeholder={t(`${props.translation}.inputPlaceholder`)}
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
            {t(`${props.translation}.submitButton`)}
          </Button>
        </form>
      </Box>)
}