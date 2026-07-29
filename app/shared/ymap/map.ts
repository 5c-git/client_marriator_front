import React from "react";
import ReactDom from "react-dom";
import * as YMapClustererPackage from "@yandex/ymaps3-clusterer";

import type { PolygonGeometry } from "ymaps3";
import { circle } from "@turf/turf";

declare global {
  interface Window {
    ymaps3: typeof ymaps3 | undefined;
  }
}

const [ymaps3React] = await Promise.all([
  ymaps3.import("@yandex/ymaps3-reactify"),
  ymaps3.ready,
]);

export const langMap = {
  ru: "ru_RU",
  en: "en_RU",
};

export const reactify = ymaps3React.reactify.bindTo(React, ReactDom);

export const getCircleGeoJSON = (
  center: [lon: number, lat: number],
  radiusMeters: number,
): PolygonGeometry => {
  const { geometry } = circle(center, radiusMeters, {
    units: "kilometers",
  });
  return geometry as PolygonGeometry;
};

export const {
  YMap,
  YMapMarker,
  YMapListener,
  YMapFeature,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapFeatureDataSource,
  YMapLayer,
} = reactify.module(ymaps3);

export const { YMapClusterer } = reactify.module(YMapClustererPackage);
