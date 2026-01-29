import { useState, useEffect } from "react";
import { useFetcher, useNavigation, Link, redirect } from "react-router";
import type { Route } from "./+types/meta";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { Avatar, Button, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { S_SwipeableDrawer } from "./meta.styled";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { StyledTextField } from "~/shared/ui/StyledTextField/StyledTextField";
import { StyledRadioButton } from "~/shared/ui/StyledRadioButton/StyledRadioButton";
import { Loader } from "~/shared/ui/Loader/Loader";
import { PointerIcon } from "../../../../shared/icons/PointerIcon";
import { DeleteIcon } from "../../../../shared/icons/DeleteIcon";

import { useStore } from "~/store/store";

import { getData } from "~/requests/_personal/getData/getData";
import { getBrand } from "~/requests/getBrand/getBrand";
// import { getPlace } from "~/requests/getPlace/getPlace";
import { postDelPlace } from "~/requests/postDelPlace/postDelPlace";
import { postSetBrandImg } from "~/requests/postSetBrandImg/postSetBrandImg";
import { postSetUserData } from "~/requests/postSetUserData/postSetUserData";
import { postFinishRegister } from "~/requests/postFinishRegister/postFinishRegister";

export async function clientLoader() {
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const userData = await getData(accessToken);
    const brandsData = await getBrand(accessToken);
    // const locationsData = await getPlace(accessToken);

    const brands: {
      value: string;
      label: string;
      disabled: boolean;
      image: string | null;
    }[] = [];
    const locations: {
      id: number;
      name: string;
      icon: string;
      coordinates: string[];
      address: string;
    }[] = [];

    brandsData.data.forEach((item) =>
      brands.push({
        value: item.id.toString(),
        label: item.name,
        disabled: false,
        image: `${import.meta.env.VITE_ASSET_PATH}${item.logo}`,
      }),
    );

    userData.data.place.forEach((place) =>
      locations.push({
        id: place.id,
        name: place.name,
        icon: place.logo,
        coordinates: [place.latitude, place.longitude],
        address: place.address_kladr,
        // region: "Центральный федеральный округ",
      }),
    );

    return {
      userName: userData.data.name ? userData.data.name : "",
      userLogo: userData.data.logo ? userData.data.logo : "",
      brands,
      locations,
    };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const { _action, ...fields } = await request.json();
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    if (_action === "deleteLocation") {
      await postDelPlace(accessToken, fields.placeId);
    } else if (_action === "saveLogo") {
      await postSetBrandImg(accessToken, fields.logo);
    } else if (_action === "finishRegister") {
      await postSetUserData(accessToken, { name: fields.name });
      await postFinishRegister(accessToken);

      // useStore.getState().setAccessToken(data.result.token.access_token);
      // useStore.getState().setRefreshToken(data.result.token.refresh_token);
      // throw redirect(withLocale("/registration/registration-complete"));
      useStore.getState().clearStore();
      throw redirect(withLocale("/signin/client/registration-complete"));
    }
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Meta({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("signin_client_meta");
  const fetcher = useFetcher();
  const navigation = useNavigation();

  const [open, setOpen] = useState<boolean>(false);

  const {
    control,
    setValue,
    trigger,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: {
      logo: loaderData.userLogo,
      fio: loaderData.userName,
      locations: loaderData.locations,
    },
    resolver: zodResolver(
      z.object({
        logo: z.string({ error: t("form.logo") }),
        fio: z
          .string()
          .trim()
          .min(1, {
            error: t("form.fio"),
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
          .min(1, { error: t("form.locations") }),
      }),
    ),
    mode: "onChange",
  });

  useEffect(() => {
    setTimeout(() => {
      reset({
        logo: loaderData.userLogo,
        fio: getValues("fio"),
        locations: loaderData.locations,
      });
    });
  }, [loaderData, reset, getValues]);

  // const isLogoPresent = loaderData.brands.find(
  //   (item) => item.value === getValues().logo,
  // )?.image;

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box
        sx={{
          paddingBottom: "105px",
        }}
      >
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
                _action: "finishRegister",
                name: getValues("fio"),
              }),
              {
                method: "POST",
                encType: "application/json",
              },
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
          <Avatar
            // src={isLogoPresent ? isLogoPresent : undefined}
            src={`${import.meta.env.VITE_ASSET_PATH}${getValues("logo")}`}
            sx={(theme) => ({
              width: "88px",
              height: "88px",
              justifySelf: "center",
              ...theme.typography.Reg_16,
            })}
          >
            {t("avatar.placeholder")}
          </Avatar>

          <Box>
            <Button
              style={{
                "--borderColor": errors.logo?.message
                  ? "var(--mui-palette-Red)"
                  : "transparent",
              }}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                padding: "8px 12px",
                marginBottom: "4px",
                rowGap: "2px",
                backgroundColor: (theme) => theme.vars.palette["Grey_5"],
                borderRadius: "6px",
                border: "1px solid",
                borderColor: "var(--borderColor)",
              }}
              onClick={() => {
                setOpen(true);
              }}
            >
              <Typography
                component="p"
                variant="Reg_12"
                sx={{
                  color: (theme) => theme.vars.palette["Grey_2"],
                }}
              >
                {t("avatar.text")}
              </Typography>
              <Stack
                direction="row"
                sx={{
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Typography
                  component="p"
                  variant="Reg_14"
                  style={{
                    "--color": errors.logo?.message
                      ? "var(--mui-palette-Red)"
                      : "var(--mui-palette-Black)",
                  }}
                  sx={{
                    flexGrow: "1",
                    color: "var(--color)",
                    textAlign: "left",
                  }}
                >
                  {t("avatar.value")}
                </Typography>{" "}
                <KeyboardArrowDownIcon
                  sx={{
                    color: (theme) => theme.vars.palette["Grey_2"],
                  }}
                />
              </Stack>
            </Button>

            {errors.logo?.message ? (
              <Typography
                component="p"
                variant="Reg_12"
                sx={(theme) => ({
                  color: theme.vars.palette["Red"],
                })}
              >
                {t("form.logo")}
              </Typography>
            ) : null}
          </Box>

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
                  src={`${import.meta.env.VITE_ASSET_PATH}${location.icon}`}
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

                <IconButton
                  onClick={() => {
                    const currentList = getValues("locations");
                    const updatedList = currentList.filter(
                      (item) => item.id !== location.id,
                    );
                    setValue("locations", updatedList);
                    trigger("locations");

                    fetcher.submit(
                      JSON.stringify({
                        _action: "deleteLocation",
                        placeId: location.id,
                      }),
                      {
                        method: "POST",
                        encType: "application/json",
                      },
                    );
                  }}
                  sx={{
                    width: "24px",
                    height: "24px",
                  }}
                >
                  <DeleteIcon
                    sx={{
                      width: "12px",
                      height: "12px",
                    }}
                  />
                </IconButton>
              </Box>
            ))}
          </Stack>

          <Button
            component={Link}
            to="/signin/client/location"
            variant="outlined"
            startIcon={<PointerIcon />}
            style={{
              "--color": errors.locations?.message
                ? "var(--mui-palette-Red)"
                : "var(--mui-palette-Corp_1)",
            }}
            sx={{
              color: "var(--color)",
              borderColor: "var(--color)",
            }}
          >
            {t("locationsButton")}
          </Button>

          {errors.locations?.message ? (
            <Typography
              component="p"
              variant="Reg_14"
              sx={(theme) => ({
                color: theme.vars.palette["Red"],
                textAlign: "center",
              })}
            >
              {t("form.locations")}
            </Typography>
          ) : null}

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
                fetcher.submit(
                  JSON.stringify({
                    _action: "finishRegister",
                    name: getValues("fio"),
                  }),
                  {
                    method: "POST",
                    encType: "application/json",
                  },
                );
              })}
              variant="contained"
              disabled={!isValid}
            >
              {t("completeRegistration")}
            </Button>
          </Box>
        </form>
      </Box>

      <S_SwipeableDrawer
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onOpen={() => {}}
        disableBackdropTransition={true}
        disableSwipeToOpen={true}
        anchor="bottom"
      >
        <Box
          sx={{
            padding: "18px 16px",
          }}
        >
          <Controller
            name="logo"
            control={control}
            render={({ field }) => (
              <StyledRadioButton
                {...field}
                onImmediateChange={() => {
                  fetcher.submit(
                    JSON.stringify({
                      _action: "saveLogo",
                      logo: getValues("logo"),
                    }),
                    {
                      method: "POST",
                      encType: "application/json",
                    },
                  );
                }}
                inputType="radio"
                validation="none"
                options={loaderData.brands}
              />
            )}
          />
        </Box>
      </S_SwipeableDrawer>
    </>
  );
}
