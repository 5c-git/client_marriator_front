import {
  ChangeEvent,
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useState,
} from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { useFetcher } from "react-router";
import { useForm } from "react-hook-form";
import type {
  YMap as YMapType,
  YMapMarker as YMapMarkerType,
  YMapFeature as YMapFeatureType,
  YMapListener as YMapListenerType,
  LngLat,
} from "ymaps3";
import {
  YMap,
  YMapMarker,
  YMapListener,
  YMapFeature,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
} from "~/shared/ymap/map";
import { getCircleGeoJSON } from "~/shared/ymap/ymap";
import { debounce } from "~/shared/debounce";

import { MarkerIcon } from "./icons/MarkerIcon";
import type {
  WorkRadiusActionResult,
  WorkRadiusLoaderData,
} from "./work-radius.service";

const DEFAULT_COORDINATES: LngLat = [37.623082, 55.75254];

export function useWorkRadiusHooks(loaderData: WorkRadiusLoaderData) {
  const fetcher = useFetcher<WorkRadiusActionResult>();
  const [isActive, setIsActive] = useState(false);
  const [mapController, setMapController] = useState<{
    map: YMapType;
    marker: YMapMarkerType;
    radius: YMapFeatureType;
    listener: YMapListenerType;
  }>();

  const form = useForm<WorkRadiusLoaderData>({
    defaultValues: {
      address: loaderData.address,
      coordinates: loaderData.coordinates,
      radius: loaderData.radius,
    },
  });

  const submitGeoData = useCallback(
    (value: string, radius: string) => {
      fetcher.submit(JSON.stringify({ value, radius }), {
        method: "POST",
        encType: "application/json",
      });
    },
    [fetcher],
  );

  const resetFetcherError = useCallback(() => {
    fetcher.submit(JSON.stringify({ _action: "reset" }), {
      method: "POST",
      encType: "application/json",
    });
  }, [fetcher]);

  const drawEmptyMap = useEffectEvent(() => {
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
      />,
    );

    markerElement.innerHTML = markerIcon;

    const map = new YMap(container, {
      location: { center: DEFAULT_COORDINATES, zoom: 12 },
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
        coordinates: DEFAULT_COORDINATES,
      },
      markerElement,
    );
    const radius = new YMapFeature({
      geometry: getCircleGeoJSON(DEFAULT_COORDINATES as [number, number], 2),
      style: {
        simplificationRate: 0,
        stroke: [{ color: "var(--mui-palette-Corp_1)", width: 3 }],
        fill: "rgba(56, 56, 219, 0)",
      },
    });

    map.addChild(listener);
    map.addChild(marker);
    map.addChild(radius);

    setMapController({
      map,
      marker,
      radius,
      listener,
    });

    return map;
  });

  useEffect(() => {
    const map = drawEmptyMap();

    return () => {
      map.destroy();
    };
  }, []);

  useEffect(() => {
    mapController?.map.setLocation({
      center: loaderData.coordinates,
      zoom: 12,
    });

    mapController?.marker.update({
      coordinates: loaderData.coordinates,
    });

    mapController?.listener.update({
      onClick: (_, event) => {
        submitGeoData(
          `${event.coordinates[0]},${event.coordinates[1]}`,
          loaderData.radius,
        );
      },
    });

    if (form.getValues("radius") !== "") {
      mapController?.radius.update({
        geometry: getCircleGeoJSON(
          loaderData.coordinates as [lon: number, lat: number],
          Number(form.getValues("radius")),
        ),
      });
      mapController?.map.addChild(mapController.radius);
    } else {
      mapController?.map.removeChild(mapController.radius);
    }
  }, [
    submitGeoData,
    form.getValues,
    loaderData.coordinates,
    loaderData.radius,
    mapController?.listener,
    mapController?.map,
    mapController?.marker,
    mapController?.radius,
  ]);

  useEffect(() => {
    form.reset({
      address: loaderData.address,
      coordinates: loaderData.coordinates,
      radius: loaderData.radius,
    });
  }, [
    form.reset,
    loaderData.address,
    loaderData.coordinates,
    loaderData.radius,
  ]);

  const debouncedTextFieldSubmit = useMemo(
    () =>
      debounce((evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        submitGeoData(evt.target.value.replaceAll(" ", "+"), loaderData.radius);
      }, 1000),
    [submitGeoData, loaderData.radius],
  );

  const debouncedRadiusFieldSubmit = useMemo(
    () =>
      debounce((evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        submitGeoData(
          `${loaderData.coordinates[0]},${loaderData.coordinates[1]}`,
          evt.target.value,
        );
      }, 1000),
    [submitGeoData, loaderData.coordinates],
  );

  const fetcherError = useMemo(() => {
    if (fetcher.data && "error" in fetcher.data) {
      return fetcher.data.error;
    }
    return null;
  }, [fetcher.data]);

  const isMapGrayscale = loaderData.address === "" && isActive === false;

  return {
    form,
    isMapGrayscale,
    fetcherError,
    debouncedTextFieldSubmit,
    debouncedRadiusFieldSubmit,
    resetFetcherError,
  };
}
