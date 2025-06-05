import { ChangeEvent, useEffect, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { useFetcher, useNavigate } from "react-router";
import type { Route } from "./+types/work-radius";

import type {
  YMap,
  YMapMarker,
  YMapListener,
  YMapFeature,
  PolygonGeometry,
} from "ymaps3";

import { useForm, Controller } from "react-hook-form";

import { circle } from "@turf/turf";

import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { TextField, Snackbar, Alert, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

import { useStore } from "~/store/store";

import { getGeoData } from "~/requests/getGeoData/getGeoData";
import { getMapField } from "~/requests/_personal/getMapField/getMapField";
import { getSettingsFromKey } from "~/requests/_settings/getSettingsFromKey/getSettingsFromKey";
import { postSetMapField } from "~/requests/_personal/postSetMapField/postSetMapField";

import { MarkerIcon } from "./icons/MarkerIcon";

import { MaskedField } from "~/shared/ui/MaskedField/MaskedField";
import { debounce } from "~/shared/debounce";

declare const window: {
  ymaps3: typeof ymaps3 | undefined;
} & Window;

type Coordinates = [lon: number, lat: number];

const langMap = {
  ru: "ru_RU",
  en: "en_RU",
};

const loadMap = async (locale: string): Promise<typeof ymaps3> => {
  return new Promise((resolve) => {
    if (window.ymaps3 === undefined) {
      // Create script element and set attributes
      const script = document.createElement("script");
      script.type = "text/javascript";

      script.id = "ymapsScript";
      script.src = `https://api-maps.yandex.ru/v3/?apikey=${
        import.meta.env.VITE_YANDEX_GEO_KEY
      }&lang=${locale}`;

      // Append the script to the DOM
      const el = document.getElementsByTagName("script")[0];
      const parentNode = el.parentNode as ParentNode;
      parentNode.insertBefore(script, el);

      // Wait for script to load, then resolve the promise
      script.onload = async () => {
        await ymaps3.ready;
        resolve(ymaps3);
      };
    } else {
      resolve(ymaps3);
    }
  });
};

const getCircleGeoJSON = (
  center: Coordinates,
  radiusMeters: number
): PolygonGeometry => {
  const { geometry } = circle(center, radiusMeters, {
    units: "kilometers",
  });
  return geometry as PolygonGeometry;
};

export async function clientLoader() {
  const language = i18next.language as "en" | "ru";

  const ymaps = await loadMap(langMap[language]);

  const accessToken = useStore.getState().accessToken;

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

  if (accessToken) {
    const mapData = await getMapField(accessToken);
    const settingsData = await getSettingsFromKey(accessToken, "radius");

    const coordinates: Coordinates =
      mapData.result.coordinates !== null
        ? [
            Number(mapData.result.coordinates.split(" ")[0]),
            Number(mapData.result.coordinates.split(" ")[1]),
          ]
        : geolocation;

    return {
      language,
      address: mapData.result.mapAddress,
      coordinates,
      radius:
        mapData.result.mapRadius === ""
          ? settingsData.result
          : mapData.result.mapRadius,
      ymaps,
    };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const { _action, ...clientGeoData } = await request.json();
  const accessToken = useStore.getState().accessToken;

  if (_action === "reset") {
    return { reset: "reset" };
  }

  if (clientGeoData.value === "") {
    return { error: 400 };
  }

  if (clientGeoData.radius === "") {
    return { error: 402 };
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
      return { error: 404 };
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

export default function WorkRadius({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("workRadius");
  const fetcher = useFetcher<typeof clientAction>();
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState<boolean>(false);
  const [mapController, setMapController] = useState<{
    map: YMap;
    marker: YMapMarker;
    radius: YMapFeature;
    listener: YMapListener;
  }>();

  const { control, reset, getValues } = useForm({
    defaultValues: {
      address: loaderData.address,
      coordinates: loaderData.coordinates,
      radius: loaderData.radius,
    },
  });

  useEffect(() => {
    // here we init map, so it renders only once
    const {
      YMap,
      YMapDefaultSchemeLayer,
      YMapDefaultFeaturesLayer,
      YMapListener,
      YMapMarker,
      YMapFeature,
    } = loaderData.ymaps;

    const container = document.querySelector("#map") as HTMLElement;

    const markerElement = document.createElement("div");

    const markerIcon = renderToStaticMarkup(
      <MarkerIcon
        style={{
          position: "absolute",
          left: "-8.5px",
          top: "-20px",
          color: "var(--mui-palette-Corp_1)",
        }}
      />
    );

    markerElement.innerHTML = markerIcon;

    const map = new YMap(container, {
      location: { center: [37.623082, 55.75254], zoom: 12 },
    });

    map.addChild(new YMapDefaultSchemeLayer({}));
    map.addChild(new YMapDefaultFeaturesLayer({}));

    const listener = new YMapListener({
      layer: "any",
      onTouchStart: () => {
        setIsActive(true);
      },
    });
    const marker = new YMapMarker(
      {
        coordinates: [37.623082, 55.75254],
      },
      markerElement
    );
    const radius = new YMapFeature({
      geometry: getCircleGeoJSON([37.623082, 55.75254], 2),
      style: {
        simplificationRate: 0,
        stroke: [{ color: "var(--mui-palette-Corp_1)", width: 3 }],
        fill: "rgba(56, 56, 219, 0)",
      },
    });

    map.addChild(listener);
    map.addChild(marker);

    setMapController({
      map,
      marker,
      radius,
      listener,
    });

    return () => {
      map.destroy();
    };
  }, [loaderData.ymaps]);

  useEffect(() => {
    // here we update and sync map with server data
    mapController?.map.setLocation({
      center: loaderData.coordinates,
      zoom: 12,
    });

    mapController?.marker.update({
      coordinates: loaderData.coordinates,
    });

    mapController?.listener.update({
      onClick: (_, event) => {
        fetcher.submit(
          JSON.stringify({
            value: `${event.coordinates[0]},${event.coordinates[1]}`,
            radius: loaderData.radius,
          }),
          {
            method: "POST",
            encType: "application/json",
          }
        );
      },
    });

    if (getValues("radius") !== "") {
      mapController?.radius.update({
        geometry: getCircleGeoJSON(
          loaderData.coordinates,
          Number(getValues("radius"))
        ),
      });
      mapController?.map.addChild(mapController.radius);
    } else {
      mapController?.map.removeChild(mapController.radius);
    }
  }, [
    fetcher,
    getValues,
    loaderData.coordinates,
    loaderData.radius,
    mapController?.listener,
    mapController?.map,
    mapController?.marker,
    mapController?.radius,
  ]);

  useEffect(() => {
    // here we update and sync form with server data
    reset({
      address: loaderData.address,
      coordinates: loaderData.coordinates,
      radius: loaderData.radius,
    });
  }, [reset, loaderData.address, loaderData.coordinates, loaderData.radius]);

  const debouncedTextFieldSubmit = debounce(
    (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      fetcher.submit(
        JSON.stringify({
          value: evt.target.value.replaceAll(" ", "+"),
          radius: loaderData.radius,
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
          value: `${loaderData.coordinates[0]},${loaderData.coordinates[1]}`,
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
            text: t("header"),
            bold: false,
          }}
          backAction={() => {
            navigate(withLocale("/profile/my-profile"), {
              viewTransition: true,
            });
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
              sx={(theme) => ({
                textAlign: "center",
                color: theme.vars.palette["Black"],
              })}
            >
              {t("header_text")}
            </Typography>

            <Typography
              component="p"
              variant="Reg_14"
              sx={(theme) => ({
                textAlign: "center",
                color: theme.vars.palette["Grey_2"],
              })}
            >
              {t("header_expl")}
            </Typography>
          </Box>

          <form
            style={{
              display: "grid",
              rowGap: "16px",
            }}
            onSubmit={(evt) => {
              evt.preventDefault();
            }}
          >
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("input_address")}
                  fullWidth
                  slotProps={{
                    input: {
                      endAdornment: (
                        <MarkerIcon
                          sx={(theme) => ({
                            color: theme.vars.palette["Grey_3"],
                          })}
                        />
                      ),
                    },
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
                  label={t("input_radius")}
                  slotProps={{
                    input: {
                      inputComponent: MaskedField as never,
                      inputProps: {
                        mask: "00",
                      },
                      inputMode: "numeric",
                      type: "tel",
                    },
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
            id="map"
            style={{
              "--filter":
                loaderData.address === "" && isActive === false
                  ? "grayscale(1)"
                  : "grayscale(0)",
            }}
            sx={{
              height: "380px",
              borderRadius: "6px",
              overflow: "hidden",
              filter: "var(--filter)",
            }}
          >
            {/* <YMapComponentsProvider
              lang={langMap[loaderData.language]}
              apiKey={import.meta.env.VITE_YANDEX_GEO_KEY}
            >
              <YMap location={{ center: loaderData.coordinates, zoom: 12 }}>
                <YMapListener
                  layer="any"
                  onTouchStart={() => {
                    setIsActive(true);
                  }}
                  onClick={(_, event) => {
                    fetcher.submit(
                      JSON.stringify({
                        value: `${event.coordinates[0]},${event.coordinates[1]}`,
                        radius: loaderData.radius,
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

                {loaderData.address !== "" ? (
                  <YMapMarker coordinates={loaderData.coordinates}>
                    <MarkerIcon
                      sx={{
                        position: "absolute",
                        left: "-8.5px",
                        top: "-20px",
                        color: theme.vars.palette["Corp_1"],
                      }}
                    />
                  </YMapMarker>
                ) : null}

                {watch("radius") !== "" ? (
                  <YMapFeature
                    geometry={getCircleGeoJSON(
                      loaderData.coordinates,
                      Number(watch("radius"))
                    )}
                    style={{
                      simplificationRate: 0,
                      stroke: [{ color: theme.vars.palette["Corp_1"], width: 3 }],
                      fill: "rgba(56, 56, 219, 0)",
                    }}
                  />
                ) : null}
              </YMap>
            </YMapComponentsProvider> */}
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
          {fetcher.data && "error" in fetcher.data && fetcher.data.error === 400
            ? t("error_400")
            : null}
          {fetcher.data && "error" in fetcher.data && fetcher.data.error === 402
            ? t("error_402")
            : null}
          {fetcher.data && "error" in fetcher.data && fetcher.data.error === 404
            ? t("error_404")
            : null}
        </Alert>
      </Snackbar>
    </>
  );
}
