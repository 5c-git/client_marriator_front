import { useState, useEffect, useEffectEvent } from "react";

import type {
  EntitiesListViewInterface,
  Entity,
} from "./EntitesListViewInterface";

import { useTranslation } from "react-i18next";

import { statusCodeMap } from "~/shared/status";
import { statusCodeMap as jobsStatusCodeMap } from "~/shared/specialistStatus";

import Box from "@mui/material/Box";
import { SwipeableDrawer, Typography } from "@mui/material";

import { StatusSelect } from "~/shared/ui/StatusSelect/StatusSelect";
import { SortingSelect } from "~/shared/ui/SortingSelect/SortingSelect";

import { YMap as YMapType, YMapMarker as YMapMarkerType, LngLat } from "ymaps3";
import {
  YMap,
  YMapMarker,
  YMapListener,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapFeatureDataSource,
  YMapLayer,
} from "~/shared/ymap/map";
import {
  YMapClusterer,
  clusterByGrid,
  Feature,
} from "@yandex/ymaps3-clusterer";
import { renderIcon, renderClusterCounter } from "~/shared/ymap/ymap";

const statusObject = {
  order: statusCodeMap,
  task: statusCodeMap,
  bid: statusCodeMap,
  job: jobsStatusCodeMap,
};

export function EntitiesListView(props: EntitiesListViewInterface) {
  const { t } = useTranslation("EntitiesListView");

  const [filteredEntities, setFilteredEntities] = useState<{
    [key: number]: Entity[];
  }>({});
  const [filter, setFilter] = useState<number>(0);
  const [sorting, setSorting] = useState<"ascending" | "descending">(
    "ascending",
  );

  const [activeEntities, setActiveEntities] = useState<Entity[]>([]);

  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);

  const [mapInstance, setMapInstance] = useState<YMapType | null>(null);
  const [clustererInstance, setClustererInstance] =
    useState<YMapClusterer | null>(null);

  const setInitialSorting = useEffectEvent((entities: Entity[]) => {
    //сортировка
    if (entities.length > 0) {
      const allFilters = [
        ...new Set(props.entities.map((entity) => entity["status"])),
      ].sort((a, b) => a - b);

      const filteredEntites: {
        [key: (typeof allFilters)[number]]: Entity[];
      } = {};

      allFilters.forEach((filter) => {
        filteredEntites[filter] = [];
      });

      for (const key in filteredEntites) {
        filteredEntites[key] = props.entities.filter(
          (item) => item.status === Number(key),
        );
      }

      //сортировка по убыванию/возрастанию
      if (sorting === "ascending") {
        const emptyDurationEntities = filteredEntites[allFilters[0]].filter(
          (item) => item.duration.start === null && item.duration.end === null,
        );

        const notEmptyDurationEntities = filteredEntites[allFilters[0]].filter(
          (item) => item.duration.start !== null && item.duration.end !== null,
        );

        notEmptyDurationEntities.sort(
          (a, b) =>
            new Date(a.duration.start as string).valueOf() -
            new Date(b.duration.start as string).valueOf(),
        );

        setActiveEntities([
          ...emptyDurationEntities,
          ...notEmptyDurationEntities,
        ]);
      } else if (sorting === "descending") {
        const emptyDurationEntities = filteredEntites[
          Number(Object.keys(filteredEntites)[0])
        ].filter(
          (item) => item.duration.start === null && item.duration.end === null,
        );

        const notEmptyDurationEntities = filteredEntites[
          Number(Object.keys(filteredEntites)[0])
        ].filter(
          (item) => item.duration.start !== null && item.duration.end !== null,
        );

        notEmptyDurationEntities.sort(
          (a, b) =>
            new Date(b.duration.start as string).valueOf() -
            new Date(a.duration.start as string).valueOf(),
        );

        setActiveEntities([
          ...emptyDurationEntities,
          ...notEmptyDurationEntities,
        ]);
      }
      //сортировка по убыванию/возрастанию

      setFilteredEntities(filteredEntites);
      setFilter(allFilters[0]);
    }
  });
  useEffect(() => {
    setInitialSorting(props.entities);
  }, [props.entities]);

  const drawEmptyMap = useEffectEvent((mapView: boolean) => {
    let map: YMapType | null;

    if (mapView) {
      const container = document.querySelector("#map") as HTMLElement;

      if (container) {
        map = new YMap(container, {
          location: {
            center: [37.588144, 55.733842],
            zoom: 12,
          },
        });

        map.addChild(new YMapDefaultSchemeLayer({}));
        map.addChild(new YMapDefaultFeaturesLayer({}));
        map.addChild(new YMapFeatureDataSource({ id: "my-source" }));
        map.addChild(
          new YMapLayer({ source: "my-source", type: "markers", zIndex: 1800 }),
        );

        setMapInstance(map);

        return map;
      }
    }

    return null;
  });
  // рисуем пустую карту
  useEffect(() => {
    const map = drawEmptyMap(props.mapView);

    return () => {
      map?.destroy();
    };
  }, [props.mapView]);

  const drawMarkers = useEffectEvent(
    (mapInstance: YMapType | null, entities: Entity[]) => {
      if (mapInstance && entities) {
        //рисуем новые маркеры из свежих данных
        const coordinates: {
          locationId: number;
          image: string;
          borderColor: string;
          coordinates: LngLat;
        }[] = [];

        //отрисовка и обновления точек БЕЗ кластерзиции
        // const markers: YMapMarkerType[] = [];
        // mapInstance.children.forEach((child) => {
        //   if ("coordinates" in child) {
        //     markers.push(child as YMapMarkerType);
        //   }
        // });
        // markers.forEach((marker) => {
        //   mapInstance?.removeChild(marker);
        // });
        // activeEntities.forEach((location) => {
        //   const markerElement = document.createElement("div");

        //   const icon = renderIcon(location.address.logo, location.statusColor);

        //   markerElement.innerHTML = icon;

        //   const marker = new YMapMarker(
        //     {
        //       coordinates: location.coordinates as LngLat,
        //       properties: {
        //         id: location.id,
        //         icon: location.address.logo,
        //       },
        //     },
        //     markerElement,
        //   );
        //   mapInstance.addChild(marker);
        //отрисовка и обновления точек БЕЗ кластерзиции

        // mapInstance?.setLocation({ center: activeEntities[0].coordinates });

        activeEntities.forEach((location) => {
          const markerElement = document.createElement("div");
          const icon = renderIcon(location.address.logo, location.statusColor);
          markerElement.innerHTML = icon;

          coordinates.push({
            locationId: location.id,
            image: location.address.logo,
            borderColor: location.statusColor,
            coordinates: location.coordinates as LngLat,
          });
        });

        const points: Feature[] = coordinates.map((item, i) => ({
          type: "Feature",
          id: i.toString(),
          geometry: { coordinates: item.coordinates, type: "Point" },
          properties: {
            locationId: item.locationId,
            image: item.image,
            borderColor: item.borderColor,
          },
        }));

        if (clustererInstance) {
          mapInstance.removeChild(clustererInstance);
        }

        const clusterer = new YMapClusterer({
          method: clusterByGrid({ gridSize: 64 }),
          features: points,
          marker: (point) => {
            const markerElement = document.createElement("div");
            const icon = renderIcon(
              point.properties?.image as string,
              point.properties?.borderColor as string,
            );
            markerElement.innerHTML = icon;

            return new YMapMarker(
              {
                coordinates: point.geometry.coordinates as LngLat,
                properties: {
                  locationId: point.properties?.locationId,
                  image: point.properties?.image,
                  borderColor: point.properties?.borderColor,
                },
                source: "my-source",
              },
              markerElement,
            );
          },
          cluster: (coordinates, features) => {
            const clusterElement = document.createElement("div");
            const clusterCounter = renderClusterCounter(
              features.length,
              activeEntities[0].statusColor,
            );
            clusterElement.innerHTML = clusterCounter;

            return new YMapMarker(
              {
                coordinates,
                source: "my-source",
              },
              clusterElement,
            );
          },
        });

        mapInstance.addChild(clusterer);
        setClustererInstance(clusterer);
      }
    },
  );
  // рисуем на карте маркеры
  useEffect(() => {
    drawMarkers(mapInstance, activeEntities);
  }, [mapInstance, activeEntities]);

  // // обновляем слушатель событий
  useEffect(() => {
    if (mapInstance) {
      const mapListener = new YMapListener({
        layer: "any",
        onClick: (object) => {
          if (object?.type === "marker") {
            if (object.entity.properties) {
              const clickedLocation = object.entity.properties
                .locationId as number;

              const match = activeEntities.find(
                (item) => item.id === clickedLocation,
              );

              if (match) {
                setSelectedEntity(match);
              }
            }
          }
        },
      });

      mapInstance.addChild(mapListener);
    }
  }, [activeEntities, mapInstance]);

  return (
    <>
      {props.entities.length > 0 ? (
        <>
          <Box
            sx={{
              position: "relative",
              zIndex: "1",
              display: "grid",
              rowGap: "16px",
              padding: "20px 16px 16px 20px",
            }}
          >
            <StatusSelect
              value={filter.toString()}
              onChange={(value) => {
                if (sorting === "ascending") {
                  const emptyDurationEntities = filteredEntities[
                    Number(value)
                  ].filter(
                    (item) =>
                      item.duration.start === null &&
                      item.duration.end === null,
                  );

                  const notEmptyDurationEntities = filteredEntities[
                    Number(value)
                  ].filter(
                    (item) =>
                      item.duration.start !== null &&
                      item.duration.end !== null,
                  );

                  notEmptyDurationEntities.sort(
                    (a, b) =>
                      new Date(a.duration.start as string).valueOf() -
                      new Date(b.duration.start as string).valueOf(),
                  );

                  setActiveEntities([
                    ...emptyDurationEntities,
                    ...notEmptyDurationEntities,
                  ]);
                } else if (sorting === "descending") {
                  const emptyDurationEntities = filteredEntities[
                    Number(value)
                  ].filter(
                    (item) =>
                      item.duration.start === null &&
                      item.duration.end === null,
                  );

                  const notEmptyDurationEntities = filteredEntities[
                    Number(value)
                  ].filter(
                    (item) =>
                      item.duration.start !== null &&
                      item.duration.end !== null,
                  );

                  notEmptyDurationEntities.sort(
                    (a, b) =>
                      new Date(b.duration.start as string).valueOf() -
                      new Date(a.duration.start as string).valueOf(),
                  );

                  setActiveEntities([
                    ...emptyDurationEntities,
                    ...notEmptyDurationEntities,
                  ]);
                }
                setFilter(Number(value));
              }}
              options={(() => {
                const options: {
                  id: string;
                  label: string;
                  count: number;
                  color: string;
                }[] = [];

                for (const key in filteredEntities) {
                  const selectedStatusMap = statusObject[props.entityType];
                  options.push({
                    id: key,
                    label: t(
                      `${props.translation}.status.${Number(key) as keyof typeof selectedStatusMap}`,
                    ),
                    count: filteredEntities[Number(key)].length,
                    color:
                      statusObject[props.entityType][
                        Number(key) as keyof typeof statusCodeMap
                      ].color,
                  });
                }

                return options;
              })()}
            />

            {!props.mapView ? (
              <SortingSelect
                value={sorting}
                options={[
                  {
                    id: "ascending",
                    label: t(`${props.translation}.sorting.ascending`),
                  },
                  {
                    id: "descending",
                    label: t(`${props.translation}.sorting.descending`),
                  },
                ]}
                onChange={(value) => {
                  const currentSorting = value as typeof sorting;

                  if (currentSorting === "ascending") {
                    const emptyDurationEntities = filteredEntities[
                      filter
                    ].filter(
                      (item) =>
                        item.duration.start === null &&
                        item.duration.end === null,
                    );

                    const notEmptyDurationEntities = filteredEntities[
                      filter
                    ].filter(
                      (item) =>
                        item.duration.start !== null &&
                        item.duration.end !== null,
                    );

                    notEmptyDurationEntities.sort(
                      (a, b) =>
                        new Date(a.duration.start as string).valueOf() -
                        new Date(b.duration.start as string).valueOf(),
                    );

                    setActiveEntities([
                      ...emptyDurationEntities,
                      ...notEmptyDurationEntities,
                    ]);
                  } else if (currentSorting === "descending") {
                    const emptyDurationEntities = filteredEntities[
                      filter
                    ].filter(
                      (item) =>
                        item.duration.start === null &&
                        item.duration.end === null,
                    );

                    const notEmptyDurationEntities = filteredEntities[
                      filter
                    ].filter(
                      (item) =>
                        item.duration.start !== null &&
                        item.duration.end !== null,
                    );

                    notEmptyDurationEntities.sort(
                      (a, b) =>
                        new Date(b.duration.start as string).valueOf() -
                        new Date(a.duration.start as string).valueOf(),
                    );

                    setActiveEntities([
                      ...emptyDurationEntities,
                      ...notEmptyDurationEntities,
                    ]);
                  }
                  setSorting(currentSorting);
                }}
              />
            ) : null}
          </Box>

          {props.mapView ? (
            <Box
              id="map"
              sx={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
              }}
            ></Box>
          ) : (
            <Box
              sx={{
                display: "grid",
                rowGap: "16px",
                paddingLeft: "16px",
                paddingRight: "16px",
                paddingBottom: "16px",
              }}
            >
              {activeEntities.map((item) => props.entityListView(item))}
            </Box>
          )}

          <SwipeableDrawer
            open={props.mapView && selectedEntity !== null ? true : false}
            onClose={() => {
              setSelectedEntity(null);
            }}
            onOpen={() => {}}
            disableBackdropTransition={true}
            disableSwipeToOpen={true}
            anchor="bottom"
            sx={{
              "& .MuiDrawer-paper": {
                borderRadius: "6px",
              },
            }}
          >
            <Box
              sx={{
                padding: "18px 16px",
              }}
            >
              {selectedEntity !== null
                ? props.entityMapView(selectedEntity)
                : null}
            </Box>
          </SwipeableDrawer>
        </>
      ) : (
        <Typography
          component="p"
          variant="Reg_14"
          sx={(theme) => ({
            color: theme.vars.palette["Black"],
            textAlign: "center",
            marginTop: "100px",
          })}
        >
          {t(`${props.translation}.emptyHeader`)}
        </Typography>
      )}
    </>
  );
}
