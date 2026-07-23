import { Outlet } from "react-router";
import { useState, useEffect, useEffectEvent } from "react";

import { eachDayOfInterval, isWithinInterval, isEqual } from "date-fns";
import { useDebounce } from "~/shared/debounce";

import { useTranslation } from "react-i18next";
import { YMap as YMapType, LngLat } from "ymaps3";
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

import type {
  DashboardListViewInterface,
  Entity,
} from "./DashboardListViewInterface";

import { statusCodeMap } from "~/shared/status";
import { statusCodeMap as jobsStatusCodeMap } from "~/shared/specialistStatus";

import Box from "@mui/material/Box";
import {
  Typography,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { StyledSelect } from "~/shared/ui/StyledSelect/StyledSelect";
import { StyledSearchBar } from "~/shared/ui/StyledSearchBar/StyledSearchBar";

const statusObject = {
  order: statusCodeMap,
  task: statusCodeMap,
  bid: statusCodeMap,
  job: jobsStatusCodeMap,
};

export function DashboardListView(props: DashboardListViewInterface) {
  const { t } = useTranslation("EntitiesListView");

  const [filteredEntities, setFilteredEntities] = useState<{
    [key: number]: Entity[];
  }>({});

  const [filter, setFilter] = useState<number>(0);
  const [sorting, setSorting] = useState<DashboardListViewInterface["sorting"]>(
    props.sorting,
  );
  const [search, setSearch] = useState<string>("");
  const [days, setDays] = useState<Date[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date | "">("");

  const [activeEntities, setActiveEntities] = useState<Entity[]>([]);

  const [mapInstance, setMapInstance] = useState<YMapType | null>(null);
  const [clustererInstance, setClustererInstance] =
    useState<YMapClusterer | null>(null);

  const debouncedSearch = useDebounce(() => {
    if (search !== "") {
      const currentFieldValue = new RegExp(`${search}`, "i");

      let matchingItems: Entity[] = [];

      matchingItems = [
        ...activeEntities.filter((item) => item.id.toString() === search),
        ...activeEntities.filter((item) =>
          currentFieldValue.test(item.address.text),
        ),
      ];

      setActiveEntities(matchingItems);
    } else {
      if (sorting === "ascending") {
        const emptyDurationEntities = filteredEntities[filter].filter(
          (item) => item.duration.start === null && item.duration.end === null,
        );

        const notEmptyDurationEntities = filteredEntities[filter].filter(
          (item) => item.duration.start !== null && item.duration.end !== null,
        );

        setActiveEntities([
          ...emptyDurationEntities,
          ...notEmptyDurationEntities,
        ]);
      } else if (sorting === "descending") {
        const emptyDurationEntities = filteredEntities[filter].filter(
          (item) => item.duration.start === null && item.duration.end === null,
        );

        const notEmptyDurationEntities = filteredEntities[filter].filter(
          (item) => item.duration.start !== null && item.duration.end !== null,
        );

        setActiveEntities([
          ...emptyDurationEntities,
          ...notEmptyDurationEntities,
        ]);
      }
    }
  });

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

        const days =
          notEmptyDurationEntities.length > 0
            ? eachDayOfInterval({
                start: notEmptyDurationEntities[0].duration.start as string,
                end: notEmptyDurationEntities[
                  notEmptyDurationEntities.length - 1
                ].duration.end as string,
              })
            : [];

        setActiveEntities([
          ...emptyDurationEntities,
          ...notEmptyDurationEntities,
        ]);

        setDays(days);
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

        const days =
          notEmptyDurationEntities.length > 0
            ? eachDayOfInterval({
                start: notEmptyDurationEntities[0].duration.start as string,
                end: notEmptyDurationEntities[
                  notEmptyDurationEntities.length - 1
                ].duration.end as string,
              })
            : [];

        setActiveEntities([
          ...emptyDurationEntities,
          ...notEmptyDurationEntities,
        ]);

        setDays(days);
      }
      //сортировка по убыванию/возрастанию

      setFilteredEntities(filteredEntites);
      setFilter(allFilters[0]);
    }
  });
  useEffect(() => {
    setInitialSorting(props.entities);
  }, [props.entities]);

  const drawEmptyMap = useEffectEvent(
    (view: DashboardListViewInterface["view"]) => {
      let map: YMapType | null;

      if (view === "map") {
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
            new YMapLayer({
              source: "my-source",
              type: "markers",
              zIndex: 1800,
            }),
          );

          setMapInstance(map);

          return map;
        }
      }

      return null;
    },
  );
  // рисуем пустую карту
  useEffect(() => {
    const map = drawEmptyMap(props.view);

    return () => {
      map?.destroy();
      setMapInstance(null);
    };
  }, [props.view]);

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
        //       coordinates: [location.coordinates[1], location.coordinates[0]] as LngLat,
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
            coordinates: [
              location.coordinates[1],
              location.coordinates[0],
            ] as LngLat,
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
                props.entityMapAction(match);
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                {filter !== -1 ? (
                  <StyledSelect
                    inputType="select"
                    name="status"
                    placeholder={t(
                      `${props.translation}.statusSelectPlaceholder`,
                    )}
                    onImmediateChange={() => {}}
                    value={filter.toString()}
                    onChange={(evt) => {
                      const value = evt.target.value;

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

                        const days =
                          notEmptyDurationEntities.length > 0
                            ? eachDayOfInterval({
                                start: notEmptyDurationEntities[0].duration
                                  .start as string,
                                end: notEmptyDurationEntities[
                                  notEmptyDurationEntities.length - 1
                                ].duration.end as string,
                              })
                            : [];

                        const allEnities = [
                          ...emptyDurationEntities,
                          ...notEmptyDurationEntities,
                        ];

                        if (search === "") {
                          setActiveEntities(allEnities);
                        } else {
                          const currentFieldValue = new RegExp(
                            `${search}`,
                            "i",
                          );

                          setActiveEntities([
                            ...allEnities.filter(
                              (item) => item.id.toString() === search,
                            ),
                            ...allEnities.filter((item) =>
                              currentFieldValue.test(item.address.text),
                            ),
                          ]);
                        }
                        setDays(days);
                        setSelectedDay("");
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

                        const days =
                          notEmptyDurationEntities.length > 0
                            ? eachDayOfInterval({
                                start: notEmptyDurationEntities[0].duration
                                  .start as string,
                                end: notEmptyDurationEntities[
                                  notEmptyDurationEntities.length - 1
                                ].duration.end as string,
                              })
                            : [];

                        const allEnities = [
                          ...emptyDurationEntities,
                          ...notEmptyDurationEntities,
                        ];

                        if (search === "") {
                          setActiveEntities(allEnities);
                        } else {
                          const currentFieldValue = new RegExp(
                            `${search}`,
                            "i",
                          );

                          setActiveEntities([
                            ...allEnities.filter(
                              (item) => item.id.toString() === search,
                            ),
                            ...allEnities.filter((item) =>
                              currentFieldValue.test(item.address.text),
                            ),
                          ]);
                        }

                        setDays(days);
                        setSelectedDay("");
                      }

                      setFilter(Number(value));
                    }}
                    options={(() => {
                      const options: {
                        value: string;
                        label: string;
                        disabled: boolean;
                      }[] = [];

                      for (const key in filteredEntities) {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const selectedStatusMap =
                          statusObject[props.entityType];
                        options.push({
                          value: key,
                          label: `${t(
                            `${props.translation}.status.${Number(key) as keyof typeof selectedStatusMap}`,
                          )}(${filteredEntities[Number(key)].length})`,
                          disabled: false,
                        });
                      }

                      return options;
                    })()}
                  />
                ) : null}

                <Button
                  variant="outlined"
                  onClick={() => {
                    const currentSorting =
                      sorting === "ascending" ? "descending" : "ascending";

                    if (currentSorting === "ascending") {
                      const emptyDurationEntities = activeEntities.filter(
                        (item) =>
                          item.duration.start === null &&
                          item.duration.end === null,
                      );

                      const notEmptyDurationEntities = activeEntities.filter(
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
                      const emptyDurationEntities = activeEntities.filter(
                        (item) =>
                          item.duration.start === null &&
                          item.duration.end === null,
                      );

                      const notEmptyDurationEntities = activeEntities.filter(
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
                  sx={{
                    width: "unset",
                  }}
                >
                  {sorting === "ascending"
                    ? t(`${props.translation}.sorting.ascending`)
                    : t(`${props.translation}.sorting.descending`)}
                </Button>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <StyledSearchBar
                  name="searchbar"
                  value={search}
                  placeholder={t(`${props.translation}.searchbarPlaceholder`)}
                  onChange={(evt) => {
                    setSearch(evt.target.value);
                    debouncedSearch();
                  }}
                />

                <ToggleButtonGroup
                  color="primary"
                  value={props.view}
                  exclusive
                  onChange={(evt, newValue: "list" | "table" | "map") => {
                    props.setView(newValue);
                  }}
                >
                  <ToggleButton value="list">
                    {t(`${props.translation}.toggleButtons.list`)}
                  </ToggleButton>
                  <ToggleButton value="table">
                    {t(`${props.translation}.toggleButtons.table`)}
                  </ToggleButton>
                  <ToggleButton value="map">
                    {t(`${props.translation}.toggleButtons.map`)}
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Box>

            {days.length > 0 ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "stretch",
                  gap: "8px",
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                <Typography
                  component="button"
                  variant="Bold_12"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    flex: "0 0 auto",
                    padding: "12px 12px",
                    borderRadius: "11px",
                    cursor: "pointer",
                    border: "1px solid rgb(236, 234, 241)",
                    color: "var(--mui-palette-Black)",
                  }}
                  style={{
                    ...(selectedDay === "" && {
                      background:
                        "linear-gradient(135deg, rgb(248, 230, 243), rgb(239, 231, 250))",
                      color: "var(--mui-palette-Corp_1)",
                      border: "1px solid var(--mui-palette-Corp_1)",
                    }),
                  }}
                  onClick={() => {
                    if (sorting === "ascending") {
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
                      setSelectedDay("");
                    } else if (sorting === "descending") {
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

                      setSelectedDay("");
                    }
                  }}
                >
                  {t(`${props.translation}.selectAllDays`)}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "stretch",
                    gap: "8px",
                    overflowX: "auto",
                    flex: "1 1 0%",
                    minWidth: "0px",
                    paddingBottom: "2px",
                    paddingRight: "25px",
                    paddingLeft: "25px",
                    maskImage:
                      "linear-gradient(to right, transparent 0px, rgb(0, 0, 0) 44px, rgb(0, 0, 0) calc(100% - 44px), transparent 100%)",
                    scrollbarWidth: "none",
                  }}
                >
                  {days.map((day, index) => (
                    <Box
                      key={index}
                      component="button"
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        flex: "0 0 auto",
                        padding: "0px 12px",
                        borderRadius: "11px",
                        cursor: "pointer",
                        background: "rgb(250, 249, 252)",
                        border: "1px solid rgb(236, 234, 241)",
                        color: "var(--mui-palette-Black)",
                      }}
                      style={{
                        ...(isEqual(selectedDay, day) && {
                          background:
                            "linear-gradient(135deg, rgb(248, 230, 243), rgb(239, 231, 250))",
                          color: "var(--mui-palette-Corp_1)",
                          border: "1px solid var(--mui-palette-Corp_1)",
                        }),
                      }}
                      onClick={() => {
                        const notEmptyDurationEntities = filteredEntities[
                          filter
                        ].filter(
                          (item) =>
                            item.duration.start !== null &&
                            item.duration.end !== null,
                        );

                        const matches = notEmptyDurationEntities.filter(
                          (item) =>
                            isWithinInterval(day.setHours(0, 0, 0, 0), {
                              start: new Date(
                                item.duration.start as string,
                              ).setHours(0, 0, 0, 0),
                              end: new Date(
                                item.duration.end as string,
                              ).setHours(0, 0, 0, 0),
                            }),
                        );

                        setActiveEntities(matches);
                        setSelectedDay(day);
                      }}
                    >
                      <Typography variant="Reg_12">
                        {t(`${props.translation}.dayMap.${day.getDay()}`)}
                      </Typography>
                      <Typography variant="Bold_14">
                        {day.getDate()}/{day.getMonth() + 1}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            ) : null}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexGrow: 1,
              minHeight: "0px",
            }}
          >
            <Box
              sx={{
                height: "100%",
                overflowY: "auto",
              }}
            >
              {props.view === "map" ? (
                <Box
                  id="map"
                  sx={{
                    height: "100%",
                    width: "420px",
                  }}
                ></Box>
              ) : null}
              {props.view === "list" ? (
                <Box
                  sx={{
                    display: "grid",
                    rowGap: "16px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    paddingBottom: "16px",
                    width: "420px",
                  }}
                >
                  {activeEntities.map((item) => props.entityListView(item))}
                </Box>
              ) : null}
              {props.view === "table" ? (
                <Box
                  sx={{
                    width: "420px",
                  }}
                >
                  {activeEntities.map((item) => props.entityTableView(item))}
                </Box>
              ) : null}
            </Box>

            <Box
              sx={{
                position: "relative",
                flexGrow: 1,
                height: "100%",
                overflowY: "auto",
              }}
            >
              <Outlet />
            </Box>
          </Box>
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
