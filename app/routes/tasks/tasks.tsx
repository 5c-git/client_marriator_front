import { Link, useOutletContext } from "react-router";
import { useState, useEffect } from "react";

import type { Route } from "./+types/tasks";

import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import Box from "@mui/material/Box";
import { Fab, SwipeableDrawer, Typography } from "@mui/material";

import { StatusSelect } from "~/shared/ui/StatusSelect/StatusSelect";
import { SortingSelect } from "~/shared/ui/SortingSelect/SortingSelect";
import { AssignmentCard } from "~/shared/ui/AssignmentCard/AssignmentCard";

import AddIcon from "@mui/icons-material/Add";

//map
import { YMap, LngLat, YMapMarker } from "ymaps3";
import { loadMap, langMap, renderIcon } from "~/shared/ymap/ymap";
import type { Coordinates } from "~/shared/ymap/ymap";
//map

import { useStore } from "~/store/store";

import { getTasks } from "~/requests/_personal/getTasks/getTasks";

const statusCodeMap = {
  1: { value: "new", color: "var(--mui-palette-Corp_1)" },
  2: { value: "accepted", color: "var(--mui-palette-Blue)" },
  3: { value: "notAccepted", color: "var(--mui-palette-Grey_1)" },
  4: { value: "canceled", color: "var(--mui-palette-Red)" },
  5: { value: "archive", color: "var(--mui-palette-Grey_2)" },
} as const;

const statusValueMap = {
  [statusCodeMap[1].value]: 1,
  [statusCodeMap[2].value]: 2,
  [statusCodeMap[3].value]: 3,
  [statusCodeMap[4].value]: 4,
  [statusCodeMap[5].value]: 5,
};

type Option = {
  id: number;
  status: number;
  statusColor: string;
  header: string;
  subHeader: string;
  address: {
    logo: string;
    text: string;
  };
  duration: {
    start: string;
    end?: string;
  };
  coordinates: Coordinates;
};

export async function clientLoader() {
  const language = i18next.language as "en" | "ru";
  const accessToken = useStore.getState().accessToken;

  const tasks: Option[] = [];

  const filteredTasks: {
    new: Option[];
    accepted: Option[];
    notAccepted: Option[];
    canceled: Option[];
    archive: Option[];
  } = {
    new: [],
    accepted: [],
    notAccepted: [],
    canceled: [],
    archive: [],
  };

  if (accessToken) {
    const ymaps = await loadMap(langMap[language]);

    const tasksData = await getTasks(accessToken);

    tasksData.data.forEach((item, index) => {
      tasks.push({
        id: item.id,
        status: item.status,
        statusColor: statusCodeMap[item.status].color,
        header: item.place.name,
        subHeader: "Сюда нужны услуги",
        address: {
          logo: `${import.meta.env.VITE_ASSET_PATH}${item.place.logo}`,
          text: item.place.region.name,
        },
        duration: {
          start: `2025-08-0${index + 1}T10:00:00.000000Z`,
          end: `2025-08-0${index + 2}T10:00:00.000000Z`,
        },
        coordinates: [
          Number(item.place.latitude),
          Number(item.place.longitude),
        ],
      });
    });

    filteredTasks.new = tasks.filter(
      (item) => item.status === statusValueMap.new
    );
    filteredTasks.accepted = tasks.filter(
      (item) => item.status === statusValueMap.accepted
    );
    filteredTasks.notAccepted = tasks.filter(
      (item) => item.status === statusValueMap.notAccepted
    );
    filteredTasks.canceled = tasks.filter(
      (item) => item.status === statusValueMap.canceled
    );
    filteredTasks.archive = tasks.filter(
      (item) => item.status === statusValueMap.archive
    );

    return {
      ymaps,
      filteredTasks,
    };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Tasks({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("tasks");
  const userRole = useStore.getState().userRole;

  const showMap = useOutletContext<boolean>();
  const [mapInstance, setMapInstance] = useState<YMap | null>(null);
  const [selectedTask, setSelectedTask] = useState<Option | null>(null);

  const [filter, setFilter] = useState<keyof typeof statusValueMap>("new");
  const [sorting, setSorting] = useState<"ascending" | "descending">(
    "ascending"
  );
  const [activeTasks, setActiveTasks] = useState<Option[]>(
    loaderData.filteredTasks[filter]
  );

  // рисуем пустую карту
  useEffect(() => {
    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } =
      loaderData.ymaps;

    const container = document.querySelector("#map") as HTMLElement;

    let map: YMap | null = null;

    if (container) {
      map = new YMap(container, {
        location: {
          center: loaderData.filteredTasks["new"][0].coordinates,
          zoom: 12,
        },
      });

      map.addChild(new YMapDefaultSchemeLayer({}));
      map.addChild(new YMapDefaultFeaturesLayer({}));

      setMapInstance(map);
    }

    return () => {
      map?.destroy();
      setMapInstance(null);
    };
  }, [loaderData.ymaps, loaderData.filteredTasks, showMap]);

  // рисуем на карте маркеры
  useEffect(() => {
    const { YMapMarker } = loaderData.ymaps;

    const markers: YMapMarker[] = [];

    // mapInstance?.setLocation({ center: activeAssignments[0].coordinates });

    mapInstance?.children.forEach((child) => {
      if ("coordinates" in child) {
        markers.push(child as YMapMarker);
      }
    });

    markers.forEach((marker) => {
      mapInstance?.removeChild(marker);
    });

    //рисуем новые маркеры из свежих данных
    activeTasks.forEach((location) => {
      const markerElement = document.createElement("div");

      const icon = renderIcon(location.address.logo, location.statusColor);

      markerElement.innerHTML = icon;

      const marker = new YMapMarker(
        {
          coordinates: location.coordinates as LngLat,
          properties: {
            id: location.id,
            icon: location.address.logo,
          },
        },
        markerElement
      );

      mapInstance?.addChild(marker);
    });
  }, [loaderData.ymaps, activeTasks, mapInstance]);

  // // обновляем слушатель событий
  useEffect(() => {
    const { YMapListener } = loaderData.ymaps;

    const mapListener = new YMapListener({
      layer: "any",
      onClick: (object) => {
        if (object?.type === "marker") {
          if (object.entity.properties) {
            const clickedLocation = object.entity.properties.id as number;

            const match = activeTasks.find(
              (item) => item.id === clickedLocation
            );

            if (match) {
              setSelectedTask(match);
            }
          }
        }
      },
    });

    if (mapInstance) {
      mapInstance.addChild(mapListener);
    }
  }, [loaderData.ymaps, activeTasks, mapInstance]);

  //sorting and filtration
  useEffect(() => {
    const newActiveTasks = loaderData.filteredTasks[filter];

    if (newActiveTasks.length > 0 && sorting === "ascending") {
      newActiveTasks.sort(
        (a, b) =>
          new Date(a.duration.start).valueOf() -
          new Date(b.duration.start).valueOf()
      );

      setActiveTasks([...newActiveTasks]);
    } else if (newActiveTasks.length > 0 && sorting === "descending") {
      newActiveTasks.sort(
        (a, b) =>
          new Date(b.duration.start).valueOf() -
          new Date(a.duration.start).valueOf()
      );

      setActiveTasks([...newActiveTasks]);
    }
  }, [loaderData.filteredTasks, filter, sorting]);

  return (
    <>
      {activeTasks.length > 0 ? (
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
              value={filter}
              onChange={(value) => {
                setFilter(value as typeof filter);
              }}
              options={[
                ...(loaderData.filteredTasks.new.length > 0
                  ? [
                      {
                        id: statusCodeMap[
                          statusValueMap.new as keyof typeof statusCodeMap
                        ].value,
                        label: t("status.new"),
                        count: loaderData.filteredTasks.new.length,
                        color:
                          statusCodeMap[
                            statusValueMap.new as keyof typeof statusCodeMap
                          ].color,
                      },
                    ]
                  : []),
                ...(loaderData.filteredTasks.accepted.length > 0
                  ? [
                      {
                        id: statusCodeMap[
                          statusValueMap.accepted as keyof typeof statusCodeMap
                        ].value,
                        label: t("status.accepted"),
                        count: loaderData.filteredTasks.accepted.length,
                        color:
                          statusCodeMap[
                            statusValueMap.accepted as keyof typeof statusCodeMap
                          ].color,
                      },
                    ]
                  : []),
                ...(loaderData.filteredTasks.canceled.length > 0
                  ? [
                      {
                        id: statusCodeMap[
                          statusValueMap.canceled as keyof typeof statusCodeMap
                        ].value,
                        label: t("status.canceled"),
                        count: loaderData.filteredTasks.canceled.length,
                        color:
                          statusCodeMap[
                            statusValueMap.canceled as keyof typeof statusCodeMap
                          ].color,
                      },
                    ]
                  : []),
                ...(loaderData.filteredTasks.archive.length > 0
                  ? [
                      {
                        id: statusCodeMap[
                          statusValueMap.archive as keyof typeof statusCodeMap
                        ].value,
                        label: t("status.archive"),
                        count: loaderData.filteredTasks.archive.length,
                        color:
                          statusCodeMap[
                            statusValueMap.archive as keyof typeof statusCodeMap
                          ].color,
                      },
                    ]
                  : []),
              ]}
            />

            {!showMap ? (
              <SortingSelect
                value={sorting}
                options={[
                  {
                    id: "ascending",
                    label: t("sorting.ascending"),
                  },
                  {
                    id: "descending",
                    label: t("sorting.descending"),
                  },
                ]}
                onChange={(value) => {
                  setSorting(value as typeof sorting);
                }}
              />
            ) : null}
          </Box>

          {showMap ? (
            <Box
              id="map"
              sx={{
                position: "absolute",
                top: "108px",
                left: "0",
                width: "100%",
                height: "calc(100vh - 162px)",
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
              {activeTasks.map((item) => (
                <AssignmentCard
                  key={item.id}
                  to={`/tasks/${item.id}`}
                  statusColor={item.statusColor}
                  header={item.header}
                  subHeader={item.subHeader}
                  id={item.id.toString()}
                  address={item.address}
                  duration={item.duration}
                  divider
                  // {...(showMap === false
                  //   ? {
                  //       buttonAction: {
                  //         action: () => {},
                  //         text: "Отменить поручение",
                  //         variant: "text",
                  //       },
                  //     }
                  //   : {})}
                />
              ))}
            </Box>
          )}

          <SwipeableDrawer
            open={showMap && selectedTask !== null ? true : false}
            onClose={() => {
              setSelectedTask(null);
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
              {selectedTask !== null ? (
                <AssignmentCard
                  to={`/tasks/${selectedTask.id}`}
                  header={selectedTask.header}
                  subHeader={selectedTask.subHeader}
                  id={selectedTask.id.toString()}
                  address={selectedTask.address}
                  duration={selectedTask.duration}
                  // buttonAction={{
                  //   action: () => {},
                  //   text: "Отменить поручение",
                  //   variant: "text",
                  // }}
                  divider
                />
              ) : null}
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
          {userRole === "admin" || userRole === "client"
            ? t("emptyHeaderCreate")
            : t("emptyHeader")}
        </Typography>
      )}

      {(!showMap && userRole === "admin") ||
      (!showMap && userRole === "manager") ||
      (activeTasks.length === 0 && userRole === "admin") ||
      (activeTasks.length === 0 && userRole === "manager") ? (
        <Fab
          component={Link}
          to={withLocale("/new-task")}
          color="Corp_1"
          aria-label="Create new task"
          sx={{
            position: "fixed",
            bottom: "60px",
            right: "16px",
            width: "60px",
            height: "60px",
            zIndex: 1,
          }}
        >
          <AddIcon
            sx={{
              fontSize: "2rem",
            }}
          />
        </Fab>
      ) : null}
    </>
  );
}
