import { useState, useEffect, useEffectEvent } from "react";
import { useTranslation } from "react-i18next";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { YMap as YMapType, LngLat, YMapMarker as YMapMarkerType } from "ymaps3";
import { renderIcon } from "~/shared/ymap/ymap";
import {
  YMap,
  YMapMarker,
  YMapListener,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
} from "~/shared/ymap/map";

import { Button } from "@mui/material";
import Box from "@mui/material/Box";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { LocationCheckboxMultiple } from "~/shared/ui/LocationCheckboxMultiple/LocationCheckboxMultiple";
import { StyledSearchBar } from "~/shared/ui/StyledSearchBar/StyledSearchBar";
import { StyledDropdown } from "~/shared/ui/StyledDropdown/StyledDropdown";

import { MapIcon } from "~/shared/icons/MapIcon";

import type {
  LocationLoaderData,
} from "../location.service";

import type { LocationOption } from "../location.mapper";

type LocationViewInterface = {
  translation: "location";
  loaderData: LocationLoaderData;
  backAction: () => void;
  submitShopsAction: (shopIds: string[]) => void;
};

export function LocationView(props: LocationViewInterface) {
  const { t } = useTranslation("LocationView");
  const { loaderData } = props;

  const [showMap, setShowMap] = useState<boolean>(false);
  const [selectedShops, setSelectedShops] = useState(loaderData.shops);
  const [mapInstance, setMapInstance] = useState<YMapType | null>(null);

  const { control, setValue, getValues, handleSubmit, reset, watch } = useForm<{
    searchbar: string;
    region: string;
    shops: string[];
  }>({
    defaultValues: {
      searchbar: "",
      region: "",
      shops: loaderData.selectedLocations,
    },
    resolver: zodResolver(
      z.object({
        searchbar: z.string(),
        region: z.string(),
        shops: z.array(z.string()).min(1),
      }),
    ),
    mode: "onChange",
  });

  const drawEmptyMap = useEffectEvent(() => {
    const container = document.querySelector("#map") as HTMLElement;
    const map = new YMap(container, {
      location: { center: [37.588144, 55.733842], zoom: 12 },
    });
    map.addChild(new YMapDefaultSchemeLayer({}));
    map.addChild(new YMapDefaultFeaturesLayer({}));
    setMapInstance(map);
    return map;
  });

  useEffect(() => {
    let map: YMapType | null = null;

    if (showMap) {
      map = drawEmptyMap();
    }

    return () => {
      map?.destroy();
    };
  }, [showMap]);

  useEffect(() => {
    const markers: YMapMarkerType[] = [];

    mapInstance?.children.forEach((child) => {
      if ("coordinates" in child) {
        markers.push(child as YMapMarkerType);
      }
    });

    markers.forEach((marker) => {
      mapInstance?.removeChild(marker);
    });

    selectedShops.forEach((shop) => {
      const markerElement = document.createElement("div");

      const isShopSelected =
        getValues("shops").findIndex((item) => item === shop.value) !== -1;

      const icon = renderIcon(
        shop.icon,
        isShopSelected ? "var(--mui-palette-Corp_1)" : "transparent",
      );

      markerElement.innerHTML = icon;

      const marker = new YMapMarker(
        {
          coordinates: shop.coordinates as LngLat,
          properties: {
            id: shop.value,
            icon: shop.icon,
          },
        },
        markerElement,
      );

      markers.push(marker);
      mapInstance?.addChild(marker);
    });

    if (markers.length > 0) {
      mapInstance?.setLocation({ center: markers[0].coordinates });
    }
  }, [mapInstance, selectedShops, getValues]);

  useEffect(() => {
    const mapListener = new YMapListener({
      layer: "any",
      onClick: (object) => {
        if (object?.type === "marker") {
          if (object.entity.properties) {
            const clickedShop = object.entity.properties.id as string;
            const clickedShopIcon = object.entity.properties.icon as string;
            const clickedShopCoordinates = object.entity.coordinates;

            const currentSelectedShops = getValues("shops");

            const isShopSelected = currentSelectedShops.findIndex(
              (shop) => shop === clickedShop,
            );

            if (isShopSelected > -1) {
              currentSelectedShops.splice(isShopSelected, 1);
            } else {
              currentSelectedShops.push(clickedShop);
            }

            mapInstance?.removeChild(object.entity);

            const markerElement = document.createElement("div");
            const icon = renderIcon(
              clickedShopIcon,
              isShopSelected > -1 ? "transparent" : "var(--mui-palette-Corp_1)",
            );
            markerElement.innerHTML = icon;

            const marker = new YMapMarker(
              {
                coordinates: clickedShopCoordinates,
                properties: {
                  id: clickedShop,
                  icon: clickedShopIcon,
                },
              },
              markerElement,
            );

            mapInstance?.addChild(marker);
            setValue("shops", currentSelectedShops);
          }
        }
      },
    });

    if (mapInstance) {
      mapInstance.addChild(mapListener);
    }
  }, [mapInstance, getValues, setValue]);

  return (
    <Box>
      <TopNavigation
        header={{
          text: t(`${props.translation}.header`),
          bold: false,
        }}
        buttonAction={{
          text: showMap
            ? t(`${props.translation}.headerListAction`)
            : t(`${props.translation}.headerMapAction`),
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
        backAction={props.backAction}
      />

      <form
        onSubmit={handleSubmit((values) => {
          props.submitShopsAction(values.shops);
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
                placeholder={t(`${props.translation}.searchbarPlaceholder`)}
                {...field}
                onChange={(evt) => {
                  const currentFieldValue = new RegExp(
                    `${evt.target.value}`,
                    "i",
                  );

                  let matchingShops: LocationOption[] = [];

                  if (evt.target.value !== "") {
                    matchingShops = [
                      ...loaderData.shops.filter(
                        (item) =>
                          currentFieldValue.test(item.name) ||
                          currentFieldValue.test(item.address),
                      ),
                    ];
                  } else {
                    const currentRegion = getValues("region");
                    matchingShops =
                      currentRegion !== ""
                        ? [
                            ...loaderData.shops.filter(
                              (item) => item.regionId === currentRegion,
                            ),
                          ]
                        : [...loaderData.shops];
                  }

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
                placeholder={t(`${props.translation}.regionPlaceholder`)}
                options={loaderData.regions}
                {...field}
                onChange={(evt) => {
                  const currentSearchbarValue = new RegExp(
                    `^${getValues("searchbar")}`,
                    "i",
                  );

                  const matchingRegionShops =
                    evt.target.value !== ""
                      ? [
                          ...loaderData.shops.filter(
                            (item) => item.regionId === evt.target.value,
                          ),
                        ]
                      : [...loaderData.shops];

                  const matchingShops = [
                    ...matchingRegionShops.filter((item) =>
                      currentSearchbarValue.test(item.name),
                    ),
                  ];

                  setSelectedShops(matchingShops);

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
            <Button
              type="button"
              onClick={() => {
                reset();
                setSelectedShops(loaderData.shops);
              }}
            >
              {t(`${props.translation}.cancelButton`)}
            </Button>
            <Button type="submit" variant="contained">
              {t(`${props.translation}.selectButton`)}{" "}
              {watch("shops").length > 0
                ? ` ${getValues("shops").length}`
                : null}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
