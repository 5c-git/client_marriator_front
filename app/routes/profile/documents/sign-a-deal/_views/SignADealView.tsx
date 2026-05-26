import { useTranslation } from "react-i18next";

import { useForm, Controller } from "react-hook-form";

import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { StyledCheckbox } from "~/shared/ui/StyledCheckbox/StyledCheckbox";

import { Loader } from "~/shared/ui/Loader/Loader";

import type { CheckboxItem } from "../sign-a-deal.hooks";

type Props = {
  loaderData: CheckboxItem[];
  isLoading: boolean;
  backAction: () => void;
  defaultValues: Record<string, boolean>;
  submitSelection: (values: Record<string, boolean>) => void;
};

export function SignADealView({
  loaderData,
  isLoading,
  backAction,
  defaultValues,
  submitSelection,
}: Props) {
  const { t } = useTranslation("SignADealView");

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    defaultValues,
  });

  return (
    <>
      {isLoading ? <Loader /> : null}

      <Box
        sx={{
          height: "100%",
        }}
      >
        <TopNavigation
          header={{
            text: t("header"),
            bold: false,
          }}
          backAction={backAction}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "20px",
            paddingBottom: "20px",
            paddingRight: "16px",
            paddingLeft: "16px",
            height: "calc(100% - 56px)",
          }}
        >
          <Typography
            component="h1"
            variant="Reg_18"
            sx={(theme) => ({
              color: theme.vars.palette["Black"],
              paddingBottom: "8px",
            })}
          >
            {t("sign_header")}
          </Typography>

          <Typography
            component="p"
            variant="Reg_14"
            sx={(theme) => ({
              color: theme.vars.palette["Grey_2"],
              paddingBottom: "18px",
            })}
          >
            {t("sign_text")}
          </Typography>

          <form
            onSubmit={handleSubmit(submitSelection)}
            style={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              overflow: "auto",
              position: "relative",
              paddingBottom: "45px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                overflow: "auto",
              }}
            >
              {loaderData.map((item) => (
                <Controller
                  key={item.uuid}
                  name={item.uuid}
                  control={control}
                  render={({ field }) => (
                    <StyledCheckbox
                      inputType="checkbox"
                      validation="none"
                      onImmediateChange={() => {}}
                      label={item.name}
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              ))}
            </Box>

            <Button
              sx={{
                marginTop: "auto",
                position: "absolute",
                bottom: 0,
              }}
              variant="contained"
              type="submit"
              disabled={!isDirty}
            >
              {t("button_action")}
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
}

