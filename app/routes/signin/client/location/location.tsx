import { renderToStaticMarkup } from "react-dom/server";
import { useState, useEffect } from "react";
import {
  useFetcher,
  useNavigate,
  useNavigation,
  Link,
  redirect,
} from "react-router";
import type { Route } from "./+types/location";

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

import { Button, Typography, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";
import { LocationCheckboxMultiple } from "~/shared/ui/LocationCheckboxMultiple/LocationCheckboxMultiple";
import { StyledSearchBar } from "~/shared/ui/StyledSearchBar/StyledSearchBar";
import { StyledDropdown } from "~/shared/ui/StyledDropdown/StyledDropdown";

import { MapIcon } from "./icons/MapIcon";
import { MarkerIcon } from "./icons/MarkerIcon";

const renderIcon = (image: string, borderColor: string) => {
  return renderToStaticMarkup(
    <MarkerIcon
      style={{
        position: "absolute",
        left: "-8.5px",
        top: "-20px",
        color: borderColor,
      }}
    />
  );
};

type Option = {
  value: string;
  name: string;
  icon: string;
  coordinates: Coordinates;
  address: string;
  region: string;
  disabled: boolean;
};

export async function clientAction({ request }: Route.ClientActionArgs) {
  // const params = new URLSearchParams();
  // const { _action, ...fields } = await request.json();
  //

  const language = i18next.language as "en" | "ru";

  const ymaps = await loadMap(langMap[language]);

  const shops: Option[] = [
    {
      value: "value",
      name: "Пятерочка",
      icon: "https://mui.com/static/images/avatar/1.jpg",
      coordinates: [37.588144, 55.733842],
      address: "ТЦ “Родео драйв”, пр. Науки, д. 24, к.1",
      region: "Центральный федеральный округ",
      disabled: false,
    },
    {
      value: "value1",
      name: "Перекресток",
      icon: "https://mui.com/static/images/avatar/2.jpg",
      coordinates: [36, 55],
      address: "ТЦ “Родео драйв”, пр. Науки, д. 24, к.1",
      region: "Центральный федеральный округ",
      disabled: false,
    },
    {
      value: "value2",
      name: "Чижик",
      icon: "https://mui.com/static/images/avatar/3.jpg",
      coordinates: [37, 55],
      address: "ТЦ “Родео драйв”, пр. Науки, д. 24, к.1",
      region: "Центральный федеральный округ",
      disabled: false,
    },
  ];
  const regions = [
    { value: "center", label: "Центральный", disabled: false },
    { value: "west", label: "Западный", disabled: false },
    { value: "south", label: "Южный", disabled: false },
  ];

  return {
    ymaps,
    shops,
    regions,
  };
}

export async function clientLoader() {
  const language = i18next.language as "en" | "ru";

  const ymaps = await loadMap(langMap[language]);

  const shops: Option[] = [
    {
      value: "value",
      name: "Пятерочка",
      icon: "https://mui.com/static/images/avatar/1.jpg",
      coordinates: [37.588144, 55.733842],
      address: "ТЦ “Родео драйв”, пр. Науки, д. 24, к.1",
      region: "Центральный федеральный округ",
      disabled: false,
    },
    {
      value: "value1",
      name: "Перекресток",
      icon: "https://mui.com/static/images/avatar/2.jpg",
      coordinates: [36, 55],
      address: "ТЦ “Родео драйв”, пр. Науки, д. 24, к.1",
      region: "Центральный федеральный округ",
      disabled: false,
    },
    {
      value: "value2",
      name: "Чижик",
      icon: "https://mui.com/static/images/avatar/3.jpg",
      coordinates: [37, 55],
      address: "ТЦ “Родео драйв”, пр. Науки, д. 24, к.1",
      region: "Центральный федеральный округ",
      disabled: false,
    },
  ];
  const regions = [
    { value: "center", label: "Центральный", disabled: false },
    { value: "west", label: "Западный", disabled: false },
    { value: "south", label: "Южный", disabled: false },
  ];

  return {
    ymaps,
    shops,
    regions,
  };
}

export default function Location({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("profileMeta");
  const fetcher = useFetcher<typeof clientAction>();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const [mapController, setMapController] = useState<{
    map: YMap | null;
    markers: YMapMarker[];
  }>({ map: null, markers: [] });

  const [showMap, setShowMap] = useState<boolean>(false);
  const [selectedShops, setSelectedShops] = useState(loaderData.shops);

  const {
    control,
    setValue,
    trigger,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<{
    searchbar: string;
    region: string;
    shops: string[];
  }>({
    defaultValues: {
      searchbar: "",
      region: "",
      shops: [],
    },
    // @ts-expect-error
    resolver: yupResolver(
      Yup.object({
        searchbar: Yup.string().notRequired(),
        region: Yup.string().notRequired(),
        shops: Yup.array().of(Yup.string()).min(1),
      })
    ),
    mode: "onChange",
  });

  useEffect(() => {
    if (showMap) {
      const {
        YMap,
        YMapDefaultSchemeLayer,
        YMapDefaultFeaturesLayer,
        YMapListener,
        YMapMarker,
      } = loaderData.ymaps;

      const container = document.querySelector("#map") as HTMLElement;

      const map = new YMap(container, {
        location: { center: [37.623082, 55.75254], zoom: 12 },
      });

      const markers: YMapMarker[] = [];

      const mapListener = new YMapListener({
        layer: "any",
        onClick: (object) => {
          if (object?.type === "marker") {
            if (object.entity.properties) {
              const clickedShop = object.entity.properties.id as string;
              const clickedShopCoordinates = object.entity.coordinates;

              const currentMarkers = [...mapController?.markers];

              const currentSelectedShops = getValues("shops");

              const isShopSelected = currentSelectedShops.findIndex(
                (shop) => shop === clickedShop
              );

              if (isShopSelected > -1) {
                currentSelectedShops.splice(isShopSelected, 1);
                map.removeChild(object.entity);

                const markerElement = document.createElement("div");
                const icon = renderIcon("image", "red");
                markerElement.innerHTML = icon;

                const marker = new YMapMarker(
                  {
                    coordinates: clickedShopCoordinates,
                    properties: {
                      id: clickedShop,
                    },
                  },
                  markerElement
                );

                currentMarkers.push(marker);

                map.addChild(marker);

                setMapController({
                  map,
                  markers: currentMarkers,
                });
                setValue("shops", currentSelectedShops);
              } else {
                currentSelectedShops.push(clickedShop);

                map.removeChild(object.entity);

                const markerElement = document.createElement("div");
                const icon = renderIcon("image", "var(--mui-palette-Corp_1)");
                markerElement.innerHTML = icon;

                const marker = new YMapMarker(
                  {
                    coordinates: clickedShopCoordinates,
                    properties: {
                      id: clickedShop,
                    },
                  },
                  markerElement
                );

                currentMarkers.push(marker);

                map.addChild(marker);

                setMapController({
                  map,
                  markers: currentMarkers,
                });

                setValue("shops", currentSelectedShops);
              }
            }
          }
        },
      });

      map.addChild(new YMapDefaultSchemeLayer({}));
      map.addChild(new YMapDefaultFeaturesLayer({}));

      map.addChild(mapListener);

      selectedShops.forEach((shop) => {
        const markerElement = document.createElement("div");

        const isShopSelected =
          getValues("shops").findIndex((item) => item === shop.value) !== -1;

        const icon = renderIcon(
          "image",
          isShopSelected ? "var(--mui-palette-Corp_1)" : "red"
        );

        markerElement.innerHTML = icon;

        const marker = new YMapMarker(
          {
            coordinates: shop.coordinates as LngLat,
            properties: {
              id: shop.value,
            },
          },
          markerElement
        );

        markers.push(marker);

        map.addChild(marker);
      });

      setMapController({
        map,
        markers,
      });
    }
  }, [showMap, loaderData.ymaps]);

  useEffect(() => {
    setTimeout(() => {
      reset();

      const markers: YMapMarker[] = [];

      mapController?.markers.forEach((marker) => {
        mapController.map?.removeChild(marker);
      });

      loaderData.shops.forEach((shop) => {
        const markerElement = document.createElement("div");

        const isShopSelected =
          getValues("shops").findIndex((item) => item === shop.value) !== -1;

        const icon = renderIcon(
          "image",
          isShopSelected ? "var(--mui-palette-Corp_1)" : "red"
        );

        markerElement.innerHTML = icon;

        const marker = new loaderData.ymaps.YMapMarker(
          {
            coordinates: shop.coordinates as LngLat,
            properties: {
              id: shop.value,
            },
          },
          markerElement
        );

        markers.push(marker);

        mapController.map?.addChild(marker);
      });

      setSelectedShops(loaderData.shops);
      setMapController((prev) => ({ map: prev.map, markers }));
    });
  }, [loaderData.shops, reset]);

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box>
        <TopNavigation
          header={{
            text: "Места проведения",
            bold: false,
          }}
          buttonAction={{
            text: showMap ? "Списком" : "Картой",
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
            navigate(withLocale("/signin/client/meta"), {
              viewTransition: true,
            });
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
                  placeholder="Найти..."
                  {...field}
                  onChange={(evt) => {
                    const currentFieldValue = new RegExp(
                      `^${evt.target.value}`,
                      "i"
                    );

                    const markers: YMapMarker[] = [];

                    const currentSelectedShops = getValues("shops");

                    const matchingShops = [
                      ...loaderData.shops.filter((item) =>
                        currentFieldValue.test(item.name)
                      ),
                    ];

                    //отчищаем карту от старых маркеров
                    mapController?.markers.forEach((marker) => {
                      mapController.map?.removeChild(marker);
                    });

                    // рисуем новые маркеры, с учетом того, выбранны они пользователем или нет
                    matchingShops.forEach((shop) => {
                      const isShopSelected = currentSelectedShops.findIndex(
                        (selectedShop) => shop.value === selectedShop
                      );

                      if (isShopSelected > -1) {
                        const markerElement = document.createElement("div");
                        const icon = renderIcon(
                          "image",
                          "var(--mui-palette-Corp_1)"
                        );
                        markerElement.innerHTML = icon;

                        const marker = new loaderData.ymaps.YMapMarker(
                          {
                            coordinates: shop.coordinates,
                            properties: {
                              id: shop.value,
                            },
                          },
                          markerElement
                        );

                        markers.push(marker);
                        mapController?.map?.addChild(marker);
                      } else {
                        const markerElement = document.createElement("div");
                        const icon = renderIcon("image", "red");
                        markerElement.innerHTML = icon;

                        const marker = new loaderData.ymaps.YMapMarker(
                          {
                            coordinates: shop.coordinates,
                            properties: {
                              id: shop.value,
                            },
                          },
                          markerElement
                        );

                        markers.push(marker);
                        mapController?.map?.addChild(marker);
                      }
                    });

                    setMapController((prev) => ({ map: prev.map, markers }));
                    setSelectedShops(matchingShops);

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
                  placeholder="Регион"
                  options={loaderData.regions}
                  {...field}
                  onChange={(evt) => {
                    fetcher.submit(JSON.stringify(getValues()), {
                      method: "POST",
                      encType: "application/json",
                    });
                    field.onChange(evt);
                  }}
                />
              )}
            />

            {!showMap ? (
              <Controller
                name="shops"
                control={control}
                render={({ field }) => (
                  <LocationCheckboxMultiple
                    options={selectedShops}
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
              <Button type="button">Отменить</Button>
              <Button type="submit" variant="contained">
                Выбрать{" "}
                {watch("shops").length > 0
                  ? ` ${getValues("shops").length}`
                  : null}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
}
