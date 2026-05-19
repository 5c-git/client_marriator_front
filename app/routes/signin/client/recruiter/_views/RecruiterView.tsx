import { useTranslation } from "react-i18next";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { Avatar, Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { StyledTextField } from "~/shared/ui/StyledTextField/StyledTextField";

import type { RecruiterLoaderData } from "../recruiter.service";

type RecruiterViewProps = {
  translation: "recruiter";
  loaderData: RecruiterLoaderData;
  finishRegisterAction: (name: string) => void;
};

export function RecruiterView(props: RecruiterViewProps) {
  const { t } = useTranslation("RecruiterView");
  const { loaderData } = props;

  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fio: "",
      locations: loaderData.locations,
    },
    resolver: zodResolver(
      z.object({
        fio: z
          .string()
          .trim()
          .min(1, {
            error: t(`${props.translation}.form.fio`),
          }),
        locations: z
          .array(
            z.object({
              id: z.number(),
              name: z.string(),
              icon: z.string(),
              coordinates: z.array(z.string()).min(2).max(2),
              address: z.string(),
            }),
          )
          .min(1, { error: t(`${props.translation}.form.locations`) }),
      }),
    ),
    mode: "onChange",
  });

  return (
    <Box>
      <TopNavigation
        header={{
          text: t(`${props.translation}.header`),
          bold: false,
        }}
      />

      <form
        onSubmit={handleSubmit(() => {
          props.finishRegisterAction(getValues("fio"));
        })}
        style={{
          display: "grid",
          rowGap: "14px",
          paddingTop: "20px",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        <Controller
          name="fio"
          control={control}
          render={({ field }) => (
            <StyledTextField
              placeholder={t(`${props.translation}.fioPlaceholder`)}
              onImmediateChange={() => {}}
              inputType="text"
              error={errors.fio?.message}
              {...field}
            />
          )}
        />

        <Stack
          sx={{
            rowGap: "14px",
          }}
        >
          {getValues("locations").map((location) => (
            <Box
              key={location.name}
              sx={{
                display: "flex",
                columnGap: "12px",
                alignItems: "center",
              }}
            >
              <Avatar
                src={location.icon}
                sx={{ width: "30px", height: "30px" }}
              />

              <Typography
                component="p"
                variant="Reg_14"
                sx={{
                  flexGrow: "1",
                }}
              >
                {location.name}, {location.address}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Box
          sx={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            bottom: "0",
            left: "0",
            padding: "10px 16px 24px 16px",
            backgroundColor: (theme) => theme.vars.palette["White"],
          }}
        >
          <Button
            type="button"
            onClick={handleSubmit(() => {
              props.finishRegisterAction(getValues("fio"));
            })}
            variant="contained"
            disabled={!isValid}
          >
            {t(`${props.translation}.completeRegistration`)}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
