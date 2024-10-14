import {
  useNavigation,
  useNavigate,
  json,
  useLoaderData,
  useSubmit,
  ClientActionFunctionArgs,
} from "@remix-run/react";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { useTranslation } from "react-i18next";

import { withLocale } from "~/shared/withLocale";

import {
  useTheme,
  Box,
  Button,
  Typography,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { StyledSelect } from "~/shared/ui/StyledSelect/StyledSelect";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import { Loader } from "~/shared/ui/Loader/Loader";

import { getAccessToken } from "~/preferences/token/token";
import { getDocumentInquiries } from "~/requests/getDocumentInquiries/getDocumentInquiries";
import { getCompanyAndCertificatesInquiries } from "~/requests/getCompanyAndCertificatesInquiries/getCompanyAndCertificatesInquiries";
import { postRequestInquiries } from "~/requests/postRequestInquiries/postRequestInquiries";

const generateOrganizationOptions = (
  organizations: {
    uuid: string;
    name: string;
  }[]
) => {
  const options: {
    value: string;
    label: string;
    disabled: boolean;
  }[] = [];

  organizations.forEach((item) => {
    options.push({
      value: item.uuid,
      label: item.name,
      disabled: false,
    });
  });

  return options;
};

const generateCertificateOptions = (
  certificates: {
    id: number;
    key: string;
    value: string;
  }[]
) => {
  const options: {
    value: string;
    label: string;
    disabled: boolean;
  }[] = [];

  certificates.forEach((item) => {
    options.push({
      value: item.value,
      label: item.key,
      disabled: false,
    });
  });

  return options;
};

export async function clientLoader() {
  const accessToken = await getAccessToken();

  if (accessToken) {
    const certificatesData = await getDocumentInquiries(accessToken);
    const fieldsData = await getCompanyAndCertificatesInquiries(accessToken);

    return json({
      certificates: certificatesData.result,
      fields: fieldsData.result,
    });
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const fields = await request.json();
  const accessToken = await getAccessToken();

  if (accessToken) {
    await postRequestInquiries(
      accessToken,
      fields.organization,
      fields.certificate
    );
    return null;
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Certificates() {
  const { t } = useTranslation("certificates");
  const theme = useTheme();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const submit = useSubmit();

  const { fields, certificates } = useLoaderData<typeof clientLoader>();

  const organizationOptions = generateOrganizationOptions(fields.organization);
  const certificateOptions = generateCertificateOptions(fields.certificates);

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: {
      organization: "",
      certificate: "",
    },
    resolver: yupResolver(
      Yup.object({
        organization: Yup.string().required(
          t("select", { ns: "constructorFields" })
        ),
        certificate: Yup.string().required(
          t("select", { ns: "constructorFields" })
        ),
      })
    ),
  });

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

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
          backAction={() => {
            navigate(withLocale("/profile/documents"));
          }}
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
              sx={{
                color: theme.palette["Black"],
                paddingBottom: "16px",
              }}
            >
              {t("header_text")}
            </Typography>

            <form
              onSubmit={handleSubmit((values) => {
                submit(JSON.stringify(values), {
                  method: "POST",
                  encType: "application/json",
                });
                // console.log(values);
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
                    options={organizationOptions}
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
                    options={certificateOptions}
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
            sx={{
              backgroundColor: theme.palette["Grey_4"],
            }}
          />

          {certificates.length !== 0 ? (
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
                sx={{
                  color: theme.palette["Black"],
                }}
              >
                {t("done_documents")}
              </Typography>

              {certificates.map((item) => (
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
                    {/* <Typography
                      component="p"
                      variant="Reg_14"
                      sx={{
                        color: theme.palette["Black"],
                      }}
                    >
                      Организация №2
                    </Typography> */}
                    <Typography
                      component="p"
                      variant="Reg_14"
                      sx={{
                        color: theme.palette["Black"],
                      }}
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
                      sx={{
                        color: theme.palette["Black"],
                      }}
                    />
                  </IconButton>
                </Box>
              ))}
            </Box>
          ) : null}
        </Box>
      </Box>
    </>
  );
}
