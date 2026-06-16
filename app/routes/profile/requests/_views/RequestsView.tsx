import { useTranslation } from "react-i18next";

import { useForm, Controller, useFieldArray } from "react-hook-form";

import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { StyledCheckbox } from "~/shared/ui/StyledCheckbox/StyledCheckbox";

type Props = {
  data: { label: string; value: boolean }[];
  backAction: () => void;
  submitSelection: (values: { label: string; value: boolean }[]) => void;
};

export function RequestsView(props: Props) {
  const { t } = useTranslation("m_profile_requests");

  const form = useForm({
    defaultValues: {
      companies: props.data,
    },
  });
  const { fields } = useFieldArray({
    control: form.control,
    name: "companies",
  });

  return (
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
        backAction={props.backAction}
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

        <form
          onSubmit={form.handleSubmit((values) => {
            props.submitSelection(values.companies);
          })}
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
            {fields.map((item, index) => (
              <Controller
                key={item.id}
                name={`companies.${index}.value` as const}
                control={form.control}
                render={({ field }) => (
                  <StyledCheckbox
                    inputType="checkbox"
                    validation="none"
                    onImmediateChange={() => {}}
                    label={item.label}
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            ))}
          </Box>

          <Box
            sx={(theme) => ({
              display: "grid",
              rowGap: "12px",
              position: "fixed",
              zIndex: 1,
              width: "100%",
              bottom: "54px",
              left: "0",
              padding: "10px 16px 24px 16px",
              backgroundColor: theme.vars.palette["White"],
            })}
          >
            <Button
              variant="outlined"
              type="button"
              onClick={() => {
                form.reset({ companies: props.data });
              }}
            >
              {t("button_reset")}
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={!form.formState.isDirty}
            >
              {t("button_action")}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
