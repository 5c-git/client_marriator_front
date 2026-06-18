import { Controller, useForm } from "react-hook-form";
import { useState, useEffect, useEffectEvent } from "react";
import { useTranslation } from "react-i18next";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  YMap as YMapType,
  type LngLat,
  YMapMarker as YMapMarkerType,
} from "ymaps3";
import { renderIcon } from "~/shared/ymap/ymap";
import {
  YMap,
  YMapDefaultFeaturesLayer,
  YMapDefaultSchemeLayer,
  YMapListener,
  YMapMarker,
} from "~/shared/ymap/map";
import type {
  LocationOption,
  SelectLocationsLoaderData,
} from "../selectLocations.service";

import { Button } from "@mui/material";
import Box from "@mui/material/Box";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { LocationCheckboxMultiple } from "~/shared/ui/LocationCheckboxMultiple/LocationCheckboxMultiple";
import { StyledSearchBar } from "~/shared/ui/StyledSearchBar/StyledSearchBar";
import { StyledDropdown } from "~/shared/ui/StyledDropdown/StyledDropdown";
import { MapIcon } from "~/shared/icons/MapIcon";

type SelectLocationsViewProps = {
  data: SelectLocationsLoaderData;
  onBack: () => void;
  onSubmit: (values: string[]) => void;
};

export function SelectLocationsView(props: SelectLocationsViewProps) {
  const { t } = useTranslation("m_users_selectLocations");

  const [showMap, setShowMap] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState(
    props.data.locations,
  );
  const [mapInstance, setMapInstance] = useState<YMapType | null>(null);

  const form = useForm({
    defaultValues: {
      searchbar: "",
      region: "",
      locations: props.data.selectedLocations,
    },
    resolver: zodResolver(
      z.object({
        searchbar: z.string(),
        region: z.string(),
        locations: z.array(z.string()).min(1),
      }),
    ),
    mode: "onChange",
  });

  const drawEmptyMap = useEffectEvent(() => {
    const container = document.querySelector("#map") as HTMLElement;
    const map = new YMap(container, {
      location: { center: selectedLocations[0].coordinates, zoom: 12 },
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
  }, [drawEmptyMap, showMap]);

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

    selectedLocations.forEach((item) => {
      const markerElement = document.createElement("div");
      const isShopSelected =
        form
          .getValues("locations")
          .findIndex((location) => location === item.value) !== -1;

      const icon = renderIcon(
        item.icon,
        isShopSelected ? "var(--mui-palette-Corp_1)" : "transparent",
      );

      markerElement.innerHTML = icon;

      const marker = new YMapMarker(
        {
          coordinates: item.coordinates as LngLat,
          properties: {
            id: item.value,
            icon: item.icon,
          },
        },
        markerElement,
      );

      mapInstance?.addChild(marker);
    });
  }, [mapInstance, selectedLocations, form]);

  useEffect(() => {
    const mapListener = new YMapListener({
      layer: "any",
      onClick: (object) => {
        if (object?.type !== "marker" || !object.entity.properties) {
          return;
        }

        const clickedLocation = object.entity.properties.id as string;
        const clickedLocationIcon = object.entity.properties.icon as string;
        const clickedLocationCoordinates = object.entity.coordinates;

        const currentSelectedLocations = form.getValues("locations");
        const isLocationSelected = currentSelectedLocations.findIndex(
          (shop) => shop === clickedLocation,
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
          isLocationSelected > -1 ? "transparent" : "var(--mui-palette-Corp_1)",
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
          markerElement,
        );

        mapInstance?.addChild(marker);
        form.setValue("locations", currentSelectedLocations);
      },
    });

    if (mapInstance) {
      mapInstance.addChild(mapListener);
    }
  }, [mapInstance, form]);

  return (
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
        backAction={props.onBack}
      />

      <form
        onSubmit={form.handleSubmit((values) => {
          props.onSubmit(values.locations);
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
            control={form.control}
            render={({ field }) => (
              <StyledSearchBar
                placeholder={t("searchbarPlaceholder")}
                {...field}
                onChange={(evt) => {
                  const currentFieldValue = new RegExp(
                    `${evt.target.value}`,
                    "i",
                  );
                  let matchingLocations: LocationOption[] = [];

                  if (evt.target.value !== "") {
                    matchingLocations = [
                      ...props.data.locations.filter(
                        (item) =>
                          currentFieldValue.test(item.name) ||
                          currentFieldValue.test(item.address),
                      ),
                    ];
                  } else {
                    const currentRegion = form.getValues("region");
                    matchingLocations =
                      currentRegion !== ""
                        ? [
                            ...props.data.locations.filter(
                              (item) => item.regionId === currentRegion,
                            ),
                          ]
                        : [...props.data.locations];
                  }

                  setSelectedLocations(matchingLocations);
                  field.onChange(evt);
                }}
              />
            )}
          />

          <Controller
            name="region"
            control={form.control}
            render={({ field }) => (
              <StyledDropdown
                placeholder={t("regionPlaceholder")}
                options={props.data.regions}
                {...field}
                onChange={(evt) => {
                  const currentSearchbarValue = new RegExp(
                    `^${form.getValues("searchbar")}`,
                    "i",
                  );

                  const matchingRegionLocations =
                    evt.target.value !== ""
                      ? [
                          ...props.data.locations.filter(
                            (item) => item.regionId === evt.target.value,
                          ),
                        ]
                      : [...props.data.locations];

                  const matchingLocations = [
                    ...matchingRegionLocations.filter((item) =>
                      currentSearchbarValue.test(item.name),
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
              control={form.control}
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
                form.reset();
                setSelectedLocations(props.data.locations);
              }}
            >
              {t("cancelButton")}
            </Button>
            <Button type="submit" variant="contained">
              {t("selectButton")}{" "}
              {form.watch("locations").length > 0
                ? ` ${form.getValues("locations").length}`
                : null}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
