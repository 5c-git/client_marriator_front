import React from "react";
import ReactDom from "react-dom";
import * as YMapClustererPackage from "@yandex/ymaps3-clusterer";

// await ymaps3.ready;

// export const {
//   YMap,
//   YMapMarker,
//   YMapListener,
//   YMapFeature,
//   YMapDefaultSchemeLayer,
//   YMapDefaultFeaturesLayer,
//   YMapFeatureDataSource,
//   YMapLayer,
// } = ymaps3;

const [ymaps3React] = await Promise.all([
  ymaps3.import("@yandex/ymaps3-reactify"),
  ymaps3.ready,
]);

const reactify = ymaps3React.reactify.bindTo(React, ReactDom);

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
