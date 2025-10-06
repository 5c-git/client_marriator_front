import { Link, useOutletContext, useFetcher } from "react-router";
import { useState, useEffect } from "react";

import type { Route } from "./+types/missions";

import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import Box from "@mui/material/Box";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Fab,
  SwipeableDrawer,
  Typography,
} from "@mui/material";

import { StatusSelect } from "~/shared/ui/StatusSelect/StatusSelect";
import { SortingSelect } from "~/shared/ui/SortingSelect/SortingSelect";
import { AssignmentCard } from "~/shared/ui/AssignmentCard/AssignmentCard";

import AddIcon from "@mui/icons-material/Add";
import LoopIcon from "@mui/icons-material/Loop";

//map
import { YMap, LngLat, YMapMarker } from "ymaps3";
import { loadMap, langMap, renderIcon } from "~/shared/ymap/ymap";
import type { Coordinates } from "~/shared/ymap/ymap";
//map

import { useStore } from "~/store/store";
import {
  canCancelNewOrNotAccepted,
  canCancelAccepted,
  canRepeatCancelled,
} from "~/shared/buttonHelpers";

import { statusCodeMap, statusValueMap } from "~/shared/status";

import { getJobs } from "~/requests/_personal/getJobs/getJobs";

type Option = {
  id: number;
  userId: number;
  status: number;
  statusColor: string;
  header: string;
  subHeader: string;
  address: {
    logo: string;
    text: string;
  };
  duration: {
    start: string | null;
    end: string | null;
  };
  coordinates: Coordinates;
};

export async function clientLoader() {
  const language = i18next.language as "en" | "ru";
  const accessToken = useStore.getState().accessToken;

  const missions: Option[] = [];

  const filteredMissions: {
    new: Option[];
    accepted: Option[];
    notAccepted: Option[];
    canceled: Option[];
    archive: Option[];
    empty: Option[];
  } = {
    new: [],
    accepted: [],
    notAccepted: [],
    canceled: [],
    archive: [],
    empty: [],
  };

  if (accessToken) {
    const ymaps = await loadMap(langMap[language]);

    const missionsData = await getJobs(accessToken);

    missionsData.data.forEach((item) => {
      missions.push({
        id: item.id,
        userId: item.user.id,
        status: item.status,
        statusColor: statusCodeMap[item.status].color,
        header: item.viewActivity.name,
        subHeader: item.priceResult.toString(),
        address: {
          logo: `${import.meta.env.VITE_ASSET_PATH}${item.place.logo}`,
          text: item.place.address_kladr,
        },
        duration: {
          start: item.dateStart,
          end: item.dateEnd,
        },
        coordinates: [
          Number(item.place.latitude),
          Number(item.place.longitude),
        ],
      });
    });

    filteredMissions.new = missions.filter(
      (item) => item.status === statusValueMap.new
    );
    filteredMissions.accepted = missions.filter(
      (item) => item.status === statusValueMap.accepted
    );
    filteredMissions.notAccepted = missions.filter(
      (item) => item.status === statusValueMap.notAccepted
    );
    filteredMissions.canceled = missions.filter(
      (item) => item.status === statusValueMap.canceled
    );
    filteredMissions.archive = missions.filter(
      (item) => item.status === statusValueMap.archive
    );

    let activeStatus: keyof typeof statusValueMap | "empty" = "empty";

    if (filteredMissions.canceled.length > 0) {
      activeStatus = "archive";
    }
    if (filteredMissions.archive.length > 0) {
      activeStatus = "canceled";
    }
    if (filteredMissions.notAccepted.length > 0) {
      activeStatus = "notAccepted";
    }
    if (filteredMissions.accepted.length > 0) {
      activeStatus = "accepted";
    }
    if (filteredMissions.new.length > 0) {
      activeStatus = "new";
    }

    return {
      ymaps,
      filteredMissions,
      activeStatus,
      notEmpty: missionsData.data.length > 0 ? true : false,
    };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

// export async function clientAction({ request }: Route.ClientActionArgs) {
//   const { _action, ...fields } = await request.json();

//   const accessToken = useStore.getState().accessToken;

//   if (accessToken) {
//     if (_action === "repeat") {
//       await postRepeatOrder(accessToken, fields.orderId);
//     } else if (_action === "cancel") {
//       await postCancelOrder(accessToken, fields.orderId);
//     }
//   } else {
//     throw new Response("Токен авторизации не обнаружен!", { status: 401 });
//   }
// }

export default function Missions({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("missions");
  const userRole = useStore.getState().userRole;
  const userId = useStore.getState().userId;

  const showMap = useOutletContext<boolean>();
  const fetcher = useFetcher();

  const [mapInstance, setMapInstance] = useState<YMap | null>(null);
  const [selectedMission, setSelectedMission] = useState<Option | null>(null);
  const [filter, setFilter] = useState<keyof typeof statusValueMap | "empty">(
    loaderData.activeStatus
  );
  const [sorting, setSorting] = useState<"ascending" | "descending">(
    "ascending"
  );
  const [activeMissions, setActiveMissions] = useState<Option[]>(
    loaderData.filteredMissions[filter]
  );

  // рисуем пустую карту
  useEffect(() => {
    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } =
      loaderData.ymaps;

    const container = document.querySelector("#map") as HTMLElement;

    let map: YMap | null = null;

    if (container && loaderData.notEmpty) {
      map = new YMap(container, {
        location: {
          center:
            loaderData.filteredMissions[loaderData.activeStatus][0].coordinates,
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
  }, [
    loaderData.ymaps,
    loaderData.activeStatus,
    loaderData.notEmpty,
    loaderData.filteredMissions,
    showMap,
  ]);

  // рисуем на карте маркеры
  useEffect(() => {
    const { YMapMarker } = loaderData.ymaps;

    const markers: YMapMarker[] = [];

    // mapInstance?.setLocation({ center: activeMissions[0].coordinates });

    mapInstance?.children.forEach((child) => {
      if ("coordinates" in child) {
        markers.push(child as YMapMarker);
      }
    });

    markers.forEach((marker) => {
      mapInstance?.removeChild(marker);
    });

    //рисуем новые маркеры из свежих данных
    if (loaderData.notEmpty) {
      activeMissions.forEach((location) => {
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
    }
  }, [loaderData.ymaps, loaderData.notEmpty, activeMissions, mapInstance]);

  // // обновляем слушатель событий
  useEffect(() => {
    const { YMapListener } = loaderData.ymaps;

    const mapListener = new YMapListener({
      layer: "any",
      onClick: (object) => {
        if (object?.type === "marker") {
          if (object.entity.properties) {
            const clickedLocation = object.entity.properties.id as number;

            const match = activeMissions.find(
              (item) => item.id === clickedLocation
            );

            if (match) {
              setSelectedMission(match);
            }
          }
        }
      },
    });

    if (mapInstance && loaderData.notEmpty) {
      mapInstance.addChild(mapListener);
    }
  }, [loaderData.ymaps, loaderData.notEmpty, activeMissions, mapInstance]);

  //sorting and filtration
  useEffect(() => {
    const newActiveMissions = loaderData.filteredMissions[filter];

    if (newActiveMissions.length > 0 && sorting === "ascending") {
      const emptyDurationMissions = newActiveMissions.filter(
        (item) => item.duration.start === null && item.duration.end === null
      );

      const notEmptyDurationMissions = newActiveMissions.filter(
        (item) => item.duration.start !== null && item.duration.end !== null
      );

      notEmptyDurationMissions.sort(
        (a, b) =>
          new Date(a.duration.start as string).valueOf() -
          new Date(b.duration.start as string).valueOf()
      );

      setActiveMissions([
        ...emptyDurationMissions,
        ...notEmptyDurationMissions,
      ]);
    } else if (newActiveMissions.length > 0 && sorting === "descending") {
      const emptyDurationMissions = newActiveMissions.filter(
        (item) => item.duration.start === null && item.duration.end === null
      );

      const notEmptyDurationMissions = newActiveMissions.filter(
        (item) => item.duration.start !== null && item.duration.end !== null
      );

      notEmptyDurationMissions.sort(
        (a, b) =>
          new Date(b.duration.start as string).valueOf() -
          new Date(a.duration.start as string).valueOf()
      );

      setActiveMissions([
        ...emptyDurationMissions,
        ...notEmptyDurationMissions,
      ]);
    }
  }, [loaderData.filteredMissions, filter, sorting]);

  return (
    <>
      {loaderData.notEmpty ? (
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
                ...(loaderData.filteredMissions.new.length > 0
                  ? [
                      {
                        id: statusCodeMap[
                          statusValueMap.new as keyof typeof statusCodeMap
                        ].value,
                        label: t("status.new"),
                        count: loaderData.filteredMissions.new.length,
                        color:
                          statusCodeMap[
                            statusValueMap.new as keyof typeof statusCodeMap
                          ].color,
                      },
                    ]
                  : []),
                ...(loaderData.filteredMissions.notAccepted.length > 0
                  ? [
                      {
                        id: statusCodeMap[
                          statusValueMap.notAccepted as keyof typeof statusCodeMap
                        ].value,
                        label: t("status.notAccepted"),
                        count: loaderData.filteredMissions.notAccepted.length,
                        color:
                          statusCodeMap[
                            statusValueMap.notAccepted as keyof typeof statusCodeMap
                          ].color,
                      },
                    ]
                  : []),
                ...(loaderData.filteredMissions.accepted.length > 0
                  ? [
                      {
                        id: statusCodeMap[
                          statusValueMap.accepted as keyof typeof statusCodeMap
                        ].value,
                        label: t("status.accepted"),
                        count: loaderData.filteredMissions.accepted.length,
                        color:
                          statusCodeMap[
                            statusValueMap.accepted as keyof typeof statusCodeMap
                          ].color,
                      },
                    ]
                  : []),
                ...(loaderData.filteredMissions.canceled.length > 0
                  ? [
                      {
                        id: statusCodeMap[
                          statusValueMap.canceled as keyof typeof statusCodeMap
                        ].value,
                        label: t("status.canceled"),
                        count: loaderData.filteredMissions.canceled.length,
                        color:
                          statusCodeMap[
                            statusValueMap.canceled as keyof typeof statusCodeMap
                          ].color,
                      },
                    ]
                  : []),
                ...(loaderData.filteredMissions.archive.length > 0
                  ? [
                      {
                        id: statusCodeMap[
                          statusValueMap.archive as keyof typeof statusCodeMap
                        ].value,
                        label: t("status.archive"),
                        count: loaderData.filteredMissions.archive.length,
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
              {activeMissions.map((item) => (
                <AssignmentCard
                  key={item.id}
                  to={withLocale(`/missisons/${item.id}`)}
                  statusColor={item.statusColor}
                  header={`${t("cardHeader")} ${item.header}`}
                  subHeader={{
                    text: t("amount", {
                      price: item.subHeader,
                      curency: "₽",
                      measure: "{ед. измерения}",
                    }),
                    bold: true,
                  }}
                  id={item.id.toString()}
                  address={item.address}
                  duration={item.duration}
                  // divider
                  // {...(item.duration.start &&
                  // canCancelNewOrNotAccepted(
                  //   userId ? userId : -1,
                  //   item.userId,
                  //   item.status,
                  //   item.duration.start
                  // )
                  //   ? {
                  //       buttonAction: {
                  //         action: () => {
                  //           setAssignmentToAct({
                  //             action: "cancel",
                  //             id: item.id,
                  //           });
                  //         },
                  //         text: t("cancelAssignmentButton"),
                  //         variant: "text",
                  //       },
                  //     }
                  //   : {})}
                  // {...(item.duration.end &&
                  // canCancelAccepted(
                  //   userId ? userId : -1,
                  //   item.userId,
                  //   item.status,
                  //   item.duration.end
                  // )
                  //   ? {
                  //       buttonAction: {
                  //         action: () => {
                  //           setAssignmentToAct({
                  //             action: "cancel",
                  //             id: item.id,
                  //           });
                  //         },
                  //         text: t("cancelAssignmentButton"),
                  //         variant: "text",
                  //       },
                  //     }
                  //   : {})}
                  // {...(item.duration.start &&
                  // canRepeatCancelled(
                  //   userId ? userId : -1,
                  //   item.userId,
                  //   item.status,
                  //   item.duration.start
                  // )
                  //   ? {
                  //       buttonAction: {
                  //         action: () => {
                  //           setAssignmentToAct({
                  //             action: "repeat",
                  //             id: item.id,
                  //           });
                  //         },
                  //         text: t("repeatAssignmentButton"),
                  //         variant: "contained",
                  //         icon: (
                  //           <LoopIcon
                  //             sx={{
                  //               transform: "rotate(90deg)",
                  //               marginRight: "8px",
                  //             }}
                  //           />
                  //         ),
                  //       },
                  //     }
                  //   : {})}
                />
              ))}
            </Box>
          )}

          <SwipeableDrawer
            open={showMap && selectedMission !== null ? true : false}
            onClose={() => {
              setSelectedMission(null);
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
              {selectedMission !== null ? (
                <AssignmentCard
                  to={withLocale(`/missions/${selectedMission.id}`)}
                  header={`${t("cardHeader")} ${selectedMission.header}`}
                  subHeader={{
                    text: t("amount", {
                      price: selectedMission.subHeader,
                      curency: "₽",
                      measure: "{ед. измерения}",
                    }),
                    bold: true,
                  }}
                  id={selectedMission.id.toString()}
                  address={selectedMission.address}
                  duration={selectedMission.duration}
                  // divider
                  // {...(selectedMission.duration.start &&
                  // canCancelNewOrNotAccepted(
                  //   userId ? userId : -1,
                  //   selectedMission.userId,
                  //   selectedMission.status,
                  //   selectedMission.duration.start
                  // )
                  //   ? {
                  //       buttonAction: {
                  //         action: () => {
                  //           setAssignmentToAct({
                  //             action: "cancel",
                  //             id: selectedAssignment.id,
                  //           });
                  //         },
                  //         text: t("cancelAssignmentButton"),
                  //         variant: "text",
                  //       },
                  //     }
                  //   : {})}
                  // {...(selectedMission.duration.end &&
                  // canCancelAccepted(
                  //   userId ? userId : -1,
                  //   selectedAssignment.userId,
                  //   selectedAssignment.status,
                  //   selectedAssignment.duration.end
                  // )
                  //   ? {
                  //       buttonAction: {
                  //         action: () => {
                  //           setAssignmentToAct({
                  //             action: "cancel",
                  //             id: selectedAssignment.id,
                  //           });
                  //         },
                  //         text: t("cancelAssignmentButton"),
                  //         variant: "text",
                  //       },
                  //     }
                  //   : {})}
                  // {...(selectedMission.duration.start &&
                  // canRepeatCancelled(
                  //   userId ? userId : -1,
                  //   selectedAssignment.userId,
                  //   selectedAssignment.status,
                  //   selectedAssignment.duration.start
                  // )
                  //   ? {
                  //       buttonAction: {
                  //         action: () => {
                  //           setAssignmentToAct({
                  //             action: "repeat",
                  //             id: selectedAssignment.id,
                  //           });
                  //         },
                  //         text: t("repeatAssignmentButton"),
                  //         variant: "contained",
                  //         icon: (
                  //           <LoopIcon
                  //             sx={{
                  //               transform: "rotate(90deg)",
                  //               marginRight: "8px",
                  //             }}
                  //           />
                  //         ),
                  //       },
                  //     }
                  //   : {})}
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
    </>
  );
}
