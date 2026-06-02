import { useEffect, useEffectEvent, useState } from "react";
import {
  useLocation,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { YMap as YMapType, type LngLat, YMapMarker as YMapMarkerType } from "ymaps3";

import { withLocale } from "~/shared/withLocale";
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
} from "./selectLocations.service";

export type SelectLocationsActionPayload = {
  from: string;
  locations: string[];
};

export type SelectLocationsFormValues = {
  searchbar: string;
  region: string;
  locations: string[];
};

type LocationState = {
  from: string;
  status: string;
  statusColor: string;
};

export function useSelectLocationsHooks(loaderData: SelectLocationsLoaderData) {
  const { t } = useTranslation("users_select_locations");
  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();
  const submit = useSubmit();

  const { state } = location as { state: LocationState };

  const [showMap, setShowMap] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState(loaderData.locations);
  const [mapInstance, setMapInstance] = useState<YMapType | null>(null);

  const form = useForm<SelectLocationsFormValues>({
    defaultValues: {
      searchbar: "",
      region: "",
      locations: loaderData.selectedLocations,
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
        form.getValues("locations").findIndex((location) => location === item.value) !==
        -1;

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

  const onSearchbarChange = (
    value: string,
    fieldOnChange: (value: string) => void,
  ) => {
    const currentFieldValue = new RegExp(`${value}`, "i");
    let matchingLocations: LocationOption[] = [];

    if (value !== "") {
      matchingLocations = [
        ...loaderData.locations.filter(
          (item) =>
            currentFieldValue.test(item.name) || currentFieldValue.test(item.address),
        ),
      ];
    } else {
      const currentRegion = form.getValues("region");
      matchingLocations =
        currentRegion !== ""
          ? [...loaderData.locations.filter((item) => item.regionId === currentRegion)]
          : [...loaderData.locations];
    }

    setSelectedLocations(matchingLocations);
    fieldOnChange(value);
  };

  const onRegionChange = (value: string, fieldOnChange: (value: string) => void) => {
    const currentSearchbarValue = new RegExp(`^${form.getValues("searchbar")}`, "i");

    const matchingRegionLocations =
      value !== ""
        ? [...loaderData.locations.filter((item) => item.regionId === value)]
        : [...loaderData.locations];

    const matchingLocations = [
      ...matchingRegionLocations.filter((item) =>
        currentSearchbarValue.test(item.name),
      ),
    ];

    setSelectedLocations(matchingLocations);
    fieldOnChange(value);
  };

  const onBack = () => {
    navigate(withLocale(state.from), {
      viewTransition: true,
      state: {
        status: state.status,
        statusColor: state.statusColor,
      },
    });
  };

  const onSubmit = form.handleSubmit((values) => {
    submit(JSON.stringify({ from: state.from, locations: values.locations }), {
      method: "POST",
      encType: "application/json",
    });
  });

  const onReset = () => {
    form.reset();
    setSelectedLocations(loaderData.locations);
  };

  const onToggleMap = () => {
    setShowMap(!showMap);
  };

  return {
    t,
    isLoading: navigation.state !== "idle",
    showMap,
    selectedLocations,
    form,
    onSearchbarChange,
    onRegionChange,
    onBack,
    onSubmit,
    onReset,
    onToggleMap,
  };
}
