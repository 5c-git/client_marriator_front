import { renderToStaticMarkup } from "react-dom/server";
import { useState, useEffect } from "react";
import {
  useSubmit,
  useNavigate,
  useNavigation,
  useLocation,
  redirect,
} from "react-router";
import type { Route } from "./+types/selectLocations";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, get } from "react-hook-form";

import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

//map
import { YMap, LngLat, YMapMarker } from "ymaps3";
import { loadMap, langMap } from "~/shared/ymap/ymap";
import type { Coordinates } from "~/shared/ymap/ymap";
//map

import { Button } from "@mui/material";
import Box from "@mui/material/Box";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";
import { LocationCheckboxMultiple } from "~/shared/ui/LocationCheckboxMultiple/LocationCheckboxMultiple";
import { StyledSearchBar } from "~/shared/ui/StyledSearchBar/StyledSearchBar";
import { StyledDropdown } from "~/shared/ui/StyledDropdown/StyledDropdown";

import { MapIcon } from "~/shared/icons/MapIcon";

import { useStore } from "~/store/store";

import { getPlaceModeration } from "~/requests/_personal/_moderation/getPlaceModeration/getPlaceModeration";
import { postSetPlaceModeration } from "~/requests/_personal/_moderation/postSetPlaceModeration/postSetPlaceModeration";

const renderIcon = (image: string, borderColor: string) => {
  return renderToStaticMarkup(
    <div
      style={{
        position: "absolute",
        left: "-50%",
        top: "-50%",
        width: "41px",
        height: "41px",
        border: "5px solid",
        borderRadius: "50%",
        overflow: "hidden",
        borderColor: borderColor,
      }}
    >
      <img
        src={image}
        style={{
          // position: "relative",
          height: "100%",
          width: "100%",
          objectFit: "cover",
        }}
        alt="shop logo"
      />
    </div>
  );
};

type Option = {
  value: string;
  name: string;
  icon: string;
  coordinates: Coordinates;
  address: string;
  region: string;
  regionId: string;
  disabled: boolean;
};

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const language = i18next.language as "en" | "ru";
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const ymaps = await loadMap(langMap[language]);

    const locationsData = await getPlaceModeration(
      accessToken,
      Number(params.user)
    );

    const locations: Option[] = [];

    const regions: { value: string; label: string; disabled: boolean }[] = [];

    locationsData.data.forEach((item, index) => {
      locations.push({
        value: item.id.toString(),
        name: item.name,
        icon: `${import.meta.env.VITE_ASSET_PATH}${item.logo}`,
        coordinates: [Number(item.latitude), Number(item.longitude)],
        address: item.address_kladr,
        region: item.region.name,
        regionId: item.region.id.toString(),
        disabled: false,
      });

      const match = regions.findIndex(
        (region) => region.value === item.region.id.toString()
      );

      if (match === -1) {
        regions.push({
          value: locationsData.data[index].region.id.toString(),
          label: locationsData.data[index].region.name,
          disabled: false,
        });
      }
    });

    return { userId: params.user, ymaps, locations, regions };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({
  params,
  request,
}: Route.ClientActionArgs) {
  const fields = await request.json();

  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    await postSetPlaceModeration(accessToken, params.user, fields.locations);

    throw redirect(withLocale(fields.from));
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function SelectLocations({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("users_select_locations");
  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();
  const submit = useSubmit();

  const { state } = location as {
    state: { from: string; status: string; statusColor: string };
  };

  const [showMap, setShowMap] = useState<boolean>(false);
  const [selectedLocations, setSelectedLocations] = useState(
    loaderData.locations
  );
  const [mapInstance, setMapInstance] = useState<YMap | null>(null);

  const { control, setValue, getValues, handleSubmit, reset, watch } = useForm<{
    searchbar: string;
    region: string;
    locations: string[];
  }>({
    defaultValues: {
      searchbar: "",
      region: "",
      locations: [],
    },
    // @ts-expect-error
    resolver: yupResolver(
      Yup.object({
        searchbar: Yup.string().notRequired(),
        region: Yup.string().notRequired(),
        locations: Yup.array().of(Yup.string()).min(1),
      })
    ),
    mode: "onChange",
  });

  // рисуем пустую карту
  useEffect(() => {
    if (showMap) {
      const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } =
        loaderData.ymaps;

      const container = document.querySelector("#map") as HTMLElement;

      const map = new YMap(container, {
        location: { center: selectedLocations[0].coordinates, zoom: 12 },
      });

      map.addChild(new YMapDefaultSchemeLayer({}));
      map.addChild(new YMapDefaultFeaturesLayer({}));

      setMapInstance(map);
    }
  }, [showMap, loaderData.ymaps]);

  // рисуем на карте маркеры, опираясь на данные(далее по коду работаем только с selectedLocations и этот эффект будет нам перерисовывать маркеры)
  useEffect(() => {
    const { YMapMarker } = loaderData.ymaps;

    const markers: YMapMarker[] = [];

    mapInstance?.children.forEach((child) => {
      if ("coordinates" in child) {
        markers.push(child as YMapMarker);
      }
    });

    markers.forEach((marker) => {
      mapInstance?.removeChild(marker);
    });

    //рисуем новые маркеры из свежих данных
    selectedLocations.forEach((location) => {
      const markerElement = document.createElement("div");

      const isShopSelected =
        getValues("locations").findIndex((item) => item === location.value) !==
        -1;

      const icon = renderIcon(
        location.icon,
        isShopSelected ? "var(--mui-palette-Corp_1)" : "transparent"
      );

      markerElement.innerHTML = icon;

      const marker = new YMapMarker(
        {
          coordinates: location.coordinates as LngLat,
          properties: {
            id: location.value,
            icon: location.icon,
          },
        },
        markerElement
      );

      // markers.push(marker);
      mapInstance?.addChild(marker);
    });
  }, [loaderData.ymaps, mapInstance, selectedLocations]);

  // обновляем слушатель событий
  useEffect(() => {
    const { YMapListener, YMapMarker } = loaderData.ymaps;

    const mapListener = new YMapListener({
      layer: "any",
      onClick: (object) => {
        if (object?.type === "marker") {
          if (object.entity.properties) {
            const clickedLocation = object.entity.properties.id as string;
            const clickedLocationIcon = object.entity.properties.icon as string;
            const clickedLocationCoordinates = object.entity.coordinates;

            const currentSelectedLocations = getValues("locations");

            const isLocationSelected = currentSelectedLocations.findIndex(
              (shop) => shop === clickedLocation
            );

            if (isLocationSelected > -1) {
              currentSelectedLocations.splice(isLocationSelected, 1);
            } else {
              currentSelectedLocations.push(clickedLocation);
            }

            mapInstance?.removeChild(object.entity);

            const markerElement = document.createElement("div");
            const icon = renderIcon(
              clickedLocationIcon,
              isLocationSelected > -1
                ? "transparent"
                : "var(--mui-palette-Corp_1)"
            );
            markerElement.innerHTML = icon;

            const marker = new YMapMarker(
              {
                coordinates: clickedLocationCoordinates,
                properties: {
                  id: clickedLocation,
                  icon: clickedLocationIcon,
                },
              },
              markerElement
            );

            mapInstance?.addChild(marker);
            setValue("locations", currentSelectedLocations);
          }
        }
      },
    });

    if (mapInstance) {
      mapInstance.addChild(mapListener);
    }
  }, [loaderData.ymaps, mapInstance]);

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box>
        <TopNavigation
          header={{
            text: t("header"),
            bold: false,
          }}
          buttonAction={{
            text: showMap ? t("headerListAction") : t("headerMapAction"),
            icon: (
              <MapIcon
                sx={{
                  width: "15px",
                  height: "15px",
                }}
              />
            ),
            action: () => {
              setShowMap(!showMap);
            },
          }}
          backAction={() => {
            navigate(withLocale(state.from), {
              viewTransition: true,
              state: {
                status: state.status,
                statusColor: state.statusColor,
              },
            });
          }}
        />

        <form
          onSubmit={handleSubmit((values) => {
            submit(
              JSON.stringify({ from: state.from, locations: values.locations }),
              {
                method: "POST",
                encType: "application/json",
              }
            );
          })}
        >
          <Box
            sx={{
              position: "relative",
              display: "grid",
              rowGap: "14px",
              paddingTop: "20px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            <Controller
              name="searchbar"
              control={control}
              render={({ field }) => (
                <StyledSearchBar
                  placeholder={t("searchbarPlaceholder")}
                  {...field}
                  onChange={(evt) => {
                    const currentFieldValue = new RegExp(
                      `^${evt.target.value}`,
                      "i"
                    );

                    let matchingLocations: Option[] = [];

                    if (evt.target.value !== "") {
                      matchingLocations = [
                        ...selectedLocations.filter(
                          (item) =>
                            currentFieldValue.test(item.name) ||
                            currentFieldValue.test(item.address)
                        ),
                      ];
                    } else {
                      const currentRegion = getValues("region");
                      matchingLocations =
                        currentRegion !== ""
                          ? [
                              ...loaderData.locations.filter(
                                (item) => item.regionId === currentRegion
                              ),
                            ]
                          : [...loaderData.locations];
                    }

                    setSelectedLocations(matchingLocations);

                    field.onChange(evt);
                  }}
                />
              )}
            />

            <Controller
              name="region"
              control={control}
              render={({ field }) => (
                <StyledDropdown
                  placeholder={t("regionPlaceholder")}
                  options={loaderData.regions}
                  {...field}
                  onChange={(evt) => {
                    const currentSearchbarValue = new RegExp(
                      `^${getValues("searchbar")}`,
                      "i"
                    );

                    const matchingRegionLocations =
                      evt.target.value !== ""
                        ? [
                            ...loaderData.locations.filter(
                              (item) => item.regionId === evt.target.value
                            ),
                          ]
                        : [...loaderData.locations];

                    const matchingLocations = [
                      ...matchingRegionLocations.filter((item) =>
                        currentSearchbarValue.test(item.name)
                      ),
                    ];

                    setSelectedLocations(matchingLocations);

                    field.onChange(evt);
                  }}
                />
              )}
            />

            {!showMap ? (
              <Controller
                name="locations"
                control={control}
                render={({ field }) => (
                  <LocationCheckboxMultiple
                    options={selectedLocations}
                    {...field}
                  />
                )}
              />
            ) : (
              <Box
                id="map"
                sx={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "calc(100vh - 60px)",
                  zIndex: "-1",
                }}
              ></Box>
            )}

            <Box
              sx={(theme) => ({
                display: "flex",
                columnGap: "14px",
                padding: "10px",
                backgroundColor: theme.vars.palette["White"],
                position: "fixed",
                zIndex: 1,
                width: "100%",
                bottom: "0",
                left: "0",
              })}
            >
              <Button
                type="button"
                onClick={() => {
                  reset();
                  setSelectedLocations(loaderData.locations);
                }}
              >
                {t("cancelButton")}
              </Button>
              <Button type="submit" variant="contained">
                {t("selectButton")}{" "}
                {watch("locations").length > 0
                  ? ` ${getValues("locations").length}`
                  : null}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
}
