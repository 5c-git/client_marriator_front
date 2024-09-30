import { ChangeEvent, useEffect, useState } from "react";
import {
  useFetcher,
  useLoaderData,
  useNavigate,
  ClientActionFunctionArgs,
  json,
} from "@remix-run/react";

import { useForm, Controller } from "react-hook-form";

import { circle } from "@turf/turf";

import i18next, { t } from "i18next";
import { withLocale } from "~/shared/withLocale";

import {
  useTheme,
  Box,
  TextField,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

import { getAccessToken } from "~/preferences/token/token";

import { getGeoData } from "~/requests/getGeoData/getGeoData";
import { getMapField } from "~/requests/getMapField/getMapField";
import { postSetMapField } from "~/requests/postSetMapField/postSetMapField";

import { MarkerIcon } from "./icons/MarkerIcon";

import {
  YMap,
  YMapComponentsProvider,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapListener,
  YMapMarker,
  YMapFeature,
} from "ymap3-components";

import { PolygonGeometry } from "@yandex/ymaps3-types";
import { MaskedField } from "~/shared/ui/MaskedField/MaskedField";
import { debounce } from "~/shared/debounce";

type Coordinates = [lon: number, lat: number];

const getCircleGeoJSON = (
  center: Coordinates,
  radiusMeters: number
): PolygonGeometry => {
  const { geometry } = circle(center, radiusMeters, {
    units: "kilometers",
  });
  return geometry as PolygonGeometry;
};

const langMap = {
  ru: "ru_RU",
  en: "en_RU",
};

export async function clientLoader() {
  const accessToken = await getAccessToken();

  const geolocation = [] as unknown as Coordinates;
  navigator.geolocation.getCurrentPosition(
    (position) => {
      geolocation.push(position.coords.longitude);
      geolocation.push(position.coords.latitude);
    },
    () => {
      geolocation.push(37.623082);
      geolocation.push(55.75254);
    },
    {
      maximumAge: 1000,
    }
  );

  const language = i18next.language as "en" | "ru";

  if (accessToken) {
    const mapData = await getMapField(accessToken);

    const coordinates: Coordinates =
      mapData.result.coordinates !== null
        ? [
            Number(mapData.result.coordinates.split(" ")[0]),
            Number(mapData.result.coordinates.split(" ")[1]),
          ]
        : geolocation;

    return json({
      language,
      address: mapData.result.mapAddress,
      coordinates,
      radius: mapData.result.mapRadius,
    });
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const { _action, ...clientGeoData } = await request.json();
  const accessToken = await getAccessToken();

  if (_action === "reset") {
    return json({ reset: "reset" });
  }

  const yandexGeoData = await getGeoData(clientGeoData.value);

  if (accessToken) {
    if (yandexGeoData.response.GeoObjectCollection.featureMember.length !== 0) {
      await postSetMapField(
        accessToken,
        yandexGeoData.response.GeoObjectCollection.featureMember[0].GeoObject
          .metaDataProperty.GeocoderMetaData.text,
        yandexGeoData.response.GeoObjectCollection.featureMember[0].GeoObject
          .Point.pos,
        clientGeoData.radius
      );
      return null;
    } else {
      return json({ error: "Указанный адрес не удалось найти!" });
    }
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export function shouldRevalidate({
  actionResult,
  defaultShouldRevalidate,
}: {
  actionResult: { [key: string]: string } | null;
  defaultShouldRevalidate: boolean;
}) {
  if (actionResult) {
    return false;
  }
  return defaultShouldRevalidate;
}

export default function WorkRadius() {
  const theme = useTheme();
  const fetcher = useFetcher<typeof clientAction>();
  const navigate = useNavigate();

  const { language, address, radius, coordinates } =
    useLoaderData<typeof clientLoader>();

  const [isActive, setIsActive] = useState<boolean>(false);

  const { control, watch, reset } = useForm({
    defaultValues: {
      address,
      coordinates,
      radius,
    },
  });

  useEffect(() => {
    setTimeout(() => {
      reset({
        address,
        coordinates,
        radius,
      });
    });
  }, [address, radius, coordinates, reset]);

  const debouncedTextFieldSubmit = debounce(
    (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      fetcher.submit(
        JSON.stringify({
          value: evt.target.value.replaceAll(" ", "+"),
          radius,
        }),
        {
          method: "POST",
          encType: "application/json",
        }
      );
    },
    1000
  );

  const debouncedRadiusFieldSubmit = debounce(
    (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      fetcher.submit(
        JSON.stringify({
          value: `${coordinates[0]},${coordinates[1]}`,
          radius: evt.target.value,
        }),
        {
          method: "POST",
          encType: "application/json",
        }
      );
    },
    1000
  );

  return (
    <>
      {fetcher.state !== "idle" ? <Loader /> : null}

      <Box>
        <TopNavigation
          header={{
            text: t("WorkRadius.header"),
            bold: false,
          }}
          backAction={() => {
            navigate(withLocale("/profile/my-profile"));
          }}
        />

        <Box
          sx={{
            display: "grid",
            rowGap: "16px",
            paddingX: "16px",
            paddingTop: "20px",
          }}
        >
          <Box
            sx={{
              display: "grid",
              rowGap: "8px",
            }}
          >
            <Typography
              component="h1"
              variant="Reg_18"
              sx={{
                textAlign: "center",
                color: theme.palette["Black"],
              }}
            >
              {t("WorkRadius.header_text")}
            </Typography>

            <Typography
              component="p"
              variant="Reg_14"
              sx={{
                textAlign: "center",
                color: theme.palette["Grey_2"],
              }}
            >
              {t("WorkRadius.header_expl")}
            </Typography>
          </Box>

          <form
            style={{
              display: "grid",
              rowGap: "16px",
            }}
          >
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("WorkRadius.input_address")}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <MarkerIcon
                        sx={{
                          color: theme.palette["Grey_3"],
                        }}
                      />
                    ),
                  }}
                  onChange={(evt) => {
                    field.onChange(evt);
                    debouncedTextFieldSubmit(evt);
                  }}
                />
              )}
            />

            <Controller
              name="radius"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("WorkRadius.input_radius")}
                  InputProps={{
                    inputComponent: MaskedField as never,
                    inputProps: {
                      mask: "00",
                    },
                    inputMode: "numeric",
                    type: "tel",
                  }}
                  onChange={(evt) => {
                    field.onChange(evt);
                    debouncedRadiusFieldSubmit(evt);
                  }}
                />
              )}
            />
          </form>

          <Box
            sx={{
              height: "380px",
              borderRadius: "6px",
              overflow: "hidden",
              filter:
                address === "" && isActive === false
                  ? "grayscale(1)"
                  : "grayscale(0)",
            }}
          >
            <YMapComponentsProvider
              lang={langMap[language]}
              apiKey={import.meta.env.VITE_YANDEX_GEO_KEY}
            >
              <YMap location={{ center: coordinates, zoom: 12 }}>
                <YMapListener
                  layer="any"
                  onTouchStart={() => {
                    setIsActive(true);
                  }}
                  onClick={(_, event) => {
                    fetcher.submit(
                      JSON.stringify({
                        value: `${event.coordinates[0]},${event.coordinates[1]}`,
                        radius,
                      }),
                      {
                        method: "POST",
                        encType: "application/json",
                      }
                    );
                  }}
                />
                <YMapDefaultSchemeLayer />
                <YMapDefaultFeaturesLayer />

                {address !== "" ? (
                  <YMapMarker coordinates={coordinates}>
                    <MarkerIcon
                      sx={{
                        position: "absolute",
                        left: "-8.5px",
                        top: "-20px",
                        color: theme.palette["Corp_1"],
                      }}
                    />
                  </YMapMarker>
                ) : null}

                {watch("radius") !== "" ? (
                  <YMapFeature
                    geometry={getCircleGeoJSON(
                      coordinates,
                      Number(watch("radius"))
                    )}
                    style={{
                      simplificationRate: 0,
                      stroke: [{ color: theme.palette["Corp_1"], width: 3 }],
                      fill: "rgba(56, 56, 219, 0)",
                    }}
                  />
                ) : null}
              </YMap>
            </YMapComponentsProvider>
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={fetcher.data && "error" in fetcher.data ? true : false}
        onClose={() => {
          fetcher.submit(
            JSON.stringify({
              _action: "reset",
            }),
            {
              method: "POST",
              encType: "application/json",
            }
          );
        }}
        autoHideDuration={3000}
      >
        <Alert
          severity="info"
          variant="small"
          color="Banner_Error"
          sx={{
            width: "100%",
          }}
        >
          {t("WorkRadius.error_not-found")}
        </Alert>
      </Snackbar>
    </>
  );
}
