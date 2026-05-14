import { useFetcher, useNavigation, redirect } from "react-router";
import type { Route } from "./+types/recruiter";

import {zodResolver} from "@hookform/resolvers/zod";
import {z} from 'zod';
import { useForm, Controller } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { Avatar, Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { StyledTextField } from "~/shared/ui/StyledTextField/StyledTextField";
import { Loader } from "~/shared/ui/Loader/Loader";

import { useStore } from "~/store/store";

import { getPlace } from "~/api/getPlace/getPlace";
import { postSetUserData } from "~/api/postSetUserData/postSetUserData";
import { postFinishRegister } from "~/api/postFinishRegister/postFinishRegister";

export async function clientLoader() {
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const locationsData = await getPlace(accessToken);

    const locations: {
      id: number;
      name: string;
      icon: string;
      coordinates: string[];
      address: string;
    }[] = [];

    locationsData.data.forEach((item) =>
      locations.push({
        id: item.id,
        name: item.name,
        icon: item.logo,
        coordinates: [item.latitude, item.longitude],
        address: item.address_kladr,
        // region: "Центральный федеральный округ",
      })
    );

    return {
      locations,
    };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const fields = await request.json();

  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    await postSetUserData(accessToken, { name: fields.name });
    const data = await postFinishRegister(accessToken);

    // useStore.getState().setAccessToken(data.result.token.access_token);
    // useStore.getState().setRefreshToken(data.result.token.refresh_token);
    // throw redirect(withLocale("/registration/registration-complete"));

    useStore.getState().clearStore();
    throw redirect(withLocale("/signin/client/registration-complete"));
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Recruiter({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("signin_client_recruiter");
  const fetcher = useFetcher();
  const navigation = useNavigation();

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
        fio: z.string().trim().min(1, {error: t("form.fio")}),
        locations: z.array(z.object({
          id: z.number(),
          name: z.string(),
          icon: z.string(),
          coordinates: z.array(z.string()).min(2).max(2),
          address: z.string(),
        })).min(1, {error: t("form.locations")}),
      })
    ),
    mode: "onChange",
  });

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box>
        <TopNavigation
          header={{
            text: t("header"),
            bold: false,
          }}
        />

        <form
          onSubmit={handleSubmit(() => {
            fetcher.submit(
              JSON.stringify({
                name: getValues("fio"),
              }),
              {
                method: "POST",
                encType: "application/json",
              }
            );
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
                placeholder={t("fioPlaceholder")}
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
                fetcher.submit(JSON.stringify({ name: getValues("fio") }), {
                  method: "POST",
                  encType: "application/json",
                });
              })}
              variant="contained"
              disabled={!isValid}
            >
              {t("completeRegistration")}
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
