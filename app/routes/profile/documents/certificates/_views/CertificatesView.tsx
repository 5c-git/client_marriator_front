import { useTranslation } from "react-i18next";
import { useSubmit } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";

import { Button, Typography, Divider, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { StyledSelect } from "~/shared/ui/StyledSelect/StyledSelect";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

type Option = { value: string; label: string; disabled: boolean };

type Props = {
  certificates: { uuid: string; name: string; path: string }[];
  organizationOptions: Option[];
  certificateOptions: Option[];
  backAction: () => void;
};

export function CertificatesView(props: Props) {
  const { t } = useTranslation("m_profile_documents_certificates");
  const submit = useSubmit();

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: {
      organization: "",
      certificate: "",
    },
    resolver: zodResolver(
      z.object({
        organization: z
          .string({ error: t("select", { ns: "constructorFields" }) })
          .trim()
          .min(1, { error: t("select", { ns: "constructorFields" }) }),
        certificate: z
          .string({ error: t("select", { ns: "constructorFields" }) })
          .trim()
          .min(1, { error: t("select", { ns: "constructorFields" }) }),
      }),
    ),
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
          height: "calc(100% - 56px)",
        }}
      >
        <Box
          sx={{
            paddingRight: "16px",
            paddingLeft: "16px",
            paddingBottom: "16px",
          }}
        >
          <Typography
            component="h1"
            variant="Reg_18"
            sx={(theme) => ({
              color: theme.vars.palette["Black"],
              paddingBottom: "16px",
            })}
          >
            {t("header_text")}
          </Typography>

          <form
            onSubmit={handleSubmit((values) => {
              submit(JSON.stringify(values), {
                method: "POST",
                encType: "application/json",
              });
            })}
            style={{
              display: "grid",
              rowGap: "16px",
            }}
          >
            <Controller
              name="organization"
              control={control}
              render={({ field }) => (
                <StyledSelect
                  inputType="select"
                  placeholder={t("input_organization")}
                  onImmediateChange={() => {}}
                  validation="none"
                  options={props.organizationOptions}
                  error={errors.organization?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="certificate"
              control={control}
              render={({ field }) => (
                <StyledSelect
                  inputType="select"
                  placeholder={t("input_certificate")}
                  onImmediateChange={() => {}}
                  validation="none"
                  options={props.certificateOptions}
                  error={errors.certificate?.message}
                  {...field}
                />
              )}
            />

            <Button variant="contained" disabled={!isDirty} type="submit">
              {t("button_action")}
            </Button>
          </form>
        </Box>
        <Divider
          sx={(theme) => ({
            backgroundColor: theme.vars.palette["Grey_4"],
          })}
        />

        {props.certificates.length !== 0 ? (
          <Box
            sx={{
              display: "grid",
              paddingTop: "16px",
              paddingRight: "16px",
              paddingLeft: "16px",
              rowGap: "8px",
            }}
          >
            <Typography
              component="p"
              variant="Bold_14"
              sx={(theme) => ({
                color: theme.vars.palette["Black"],
              })}
            >
              {t("done_documents")}
            </Typography>

            {props.certificates.map((item) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  columnGap: "8px",
                }}
                key={item.uuid}
              >
                <Stack>
                  <Typography
                    component="p"
                    variant="Reg_14"
                    sx={(theme) => ({
                      color: theme.vars.palette["Black"],
                    })}
                  >
                    {item.name}
                  </Typography>
                </Stack>

                <IconButton
                  LinkComponent="a"
                  href={item.path}
                  target="_blank"
                  rel="noreferrer"
                  edge="end"
                  aria-label="download file"
                >
                  <FileDownloadOutlinedIcon
                    sx={(theme) => ({
                      color: theme.vars.palette["Black"],
                    })}
                  />
                </IconButton>
              </Box>
            ))}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
