import { useState, useEffect } from "react";
import {
  useFetcher,
  useNavigate,
  useNavigation,
  Link,
  redirect,
} from "react-router";
import type { Route } from "./+types/meta";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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

import { getBrand } from "~/requests/getBrand/getBrand";
import { getPlace } from "~/requests/getPlace/getPlace";
import { postDelPlace } from "~/requests/postDelPlace/postDelPlace";
import { postFinishRegister } from "~/requests/postFinishRegister/postFinishRegister";

export async function clientLoader() {
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const brandsData = await getBrand(accessToken);
    const locationsData = await getPlace(accessToken);

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
        image: item.logo,
      })
    );

    locationsData.data.forEach((item) =>
      locations.push({
        id: item.id,
        name: item.name,
        icon: "https://mui.com/static/images/avatar/1.jpg",
        coordinates: [item.latitude, item.longitude],
        address: item.address_kladr,
        // region: "Центральный федеральный округ",
      })
    );

    return {
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
      await postDelPlace("accessToken", fields.placeId);
    } else if (_action === "finishRegister") {
      const data = await postFinishRegister(accessToken);

      useStore.getState().setAccessToken(data.result.token.access_token);
      useStore.getState().setRefreshToken(data.result.token.refresh_token);

      throw redirect(withLocale("/registration/registration-complete"));
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
      logo: "",
      fio: "",
      locations: loaderData.locations,
    },
    resolver: yupResolver(
      Yup.object({
        logo: Yup.string().required(t("form.logo")),
        fio: Yup.string().required(t("form.fio")),
        locations: Yup.array()
          .min(1)
          .of(
            Yup.object().shape({
              id: Yup.number().required(),
              name: Yup.string().required(),
              icon: Yup.string().required(),
              coordinates: Yup.array().min(2).max(2).of(Yup.string()),
              address: Yup.string().required(),
              // region: Yup.string().required(),
            })
          )
          .required(t("form.locations")),
      })
    ),
    mode: "onChange",
  });

  useEffect(() => {
    setTimeout(() => {
      reset({
        logo: getValues("logo"),
        fio: getValues("fio"),
        locations: loaderData.locations,
      });
    });
  }, [loaderData, reset]);

  const isLogoPresent = loaderData.brands.find(
    (item) => item.value === getValues().logo
  )?.image;

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
          onSubmit={handleSubmit((values) => {
            console.log(values);
            // submit(JSON.stringify(values), {
            //   method: "POST",
            //   encType: "application/json",
            // });
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
            src={isLogoPresent ? isLogoPresent : undefined}
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

                <IconButton
                  onClick={() => {
                    const currentList = getValues("locations");
                    const updatedList = currentList.filter(
                      (item) => item.name !== location.name
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
                      }
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
                fetcher.submit(JSON.stringify({ _action: "finishRegister" }), {
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
                onImmediateChange={() => {}}
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
