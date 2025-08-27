import { Link, useOutletContext, useFetcher } from "react-router";
import { useState, useEffect } from "react";

import type { Route } from "./+types/assignments";

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

import { getOrders } from "~/requests/_personal/getOrders/getOrders";
import { postCancelOrder } from "~/requests/_personal/postCancelOrder/postCancelOrder";
import { postRepeatOrder } from "~/requests/_personal/postRepeatOrder/postRepeatOrder";

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

  const assignments: Option[] = [];

  const filteredAssignments: {
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

    const assignmentsData = await getOrders(accessToken);

    assignmentsData.data.forEach((item) => {
      const earliestStartDate: string[] = [];
      const latestEndDate: string[] = [];

      item.orderActivities.forEach((item) => {
        earliestStartDate.push(item.dateStart);
      });

      item.orderActivities.forEach((item) => {
        latestEndDate.push(item.dateEnd);
      });

      earliestStartDate.sort(
        (a, b) => new Date(a).valueOf() - new Date(b).valueOf()
      );

      latestEndDate.sort(
        (a, b) => new Date(b).valueOf() - new Date(a).valueOf()
      );

      assignments.push({
        id: item.id,
        userId: item.user.id,
        status: item.status,
        statusColor: statusCodeMap[item.status].color,
        header: item.orderActivities.length.toString(),
        subHeader: item.orderActivities
          .map((activity) => `${activity.viewActivity.name}`)
          .join(", "),
        address: {
          logo: `${import.meta.env.VITE_ASSET_PATH}${item.place.logo}`,
          text: item.place.address_kladr,
        },
        duration: {
          start: earliestStartDate.length > 0 ? earliestStartDate[0] : null,
          end: latestEndDate.length > 0 ? latestEndDate[0] : null,
        },
        coordinates: [
          Number(item.place.latitude),
          Number(item.place.longitude),
        ],
      });
    });

    filteredAssignments.new = assignments.filter(
      (item) => item.status === statusValueMap.new
    );
    filteredAssignments.accepted = assignments.filter(
      (item) => item.status === statusValueMap.accepted
    );
    filteredAssignments.notAccepted = assignments.filter(
      (item) => item.status === statusValueMap.notAccepted
    );
    filteredAssignments.canceled = assignments.filter(
      (item) => item.status === statusValueMap.canceled
    );
    filteredAssignments.archive = assignments.filter(
      (item) => item.status === statusValueMap.archive
    );

    const activeStatus: keyof typeof statusValueMap | "empty" =
      assignmentsData.data.length > 0
        ? statusCodeMap[assignmentsData.data[0].status].value
        : "empty";

    return {
      ymaps,
      filteredAssignments,
      activeStatus,
      notEmpty: assignmentsData.data.length > 0 ? true : false,
    };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const { _action, ...fields } = await request.json();

  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    if (_action === "repeat") {
      await postRepeatOrder(accessToken, fields.orderId);
    } else if (_action === "cancel") {
      await postCancelOrder(accessToken, fields.orderId);
    }
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Assignments({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("assignments");
  const userRole = useStore.getState().userRole;
  const userId = useStore.getState().userId;

  const showMap = useOutletContext<boolean>();
  const fetcher = useFetcher();

  const [mapInstance, setMapInstance] = useState<YMap | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<Option | null>(
    null
  );
  const [filter, setFilter] = useState<keyof typeof statusValueMap | "empty">(
    loaderData.activeStatus
  );
  const [sorting, setSorting] = useState<"ascending" | "descending">(
    "ascending"
  );
  const [activeAssignments, setActiveAssignments] = useState<Option[]>(
    loaderData.filteredAssignments[filter]
  );
  const [assignmentToAct, setAssignmentToAct] = useState<{
    action: "cancel" | "repeat";
    id: number;
  } | null>(null);

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
            loaderData.filteredAssignments[loaderData.activeStatus][0]
              .coordinates,
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
    loaderData.filteredAssignments,
    showMap,
  ]);

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
    if (loaderData.notEmpty) {
      activeAssignments.forEach((location) => {
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
  }, [loaderData.ymaps, loaderData.notEmpty, activeAssignments, mapInstance]);

  // // обновляем слушатель событий
  useEffect(() => {
    const { YMapListener } = loaderData.ymaps;

    const mapListener = new YMapListener({
      layer: "any",
      onClick: (object) => {
        if (object?.type === "marker") {
          if (object.entity.properties) {
            const clickedLocation = object.entity.properties.id as number;

            const match = activeAssignments.find(
              (item) => item.id === clickedLocation
            );

            if (match) {
              setSelectedAssignment(match);
            }
          }
        }
      },
    });

    if (mapInstance && loaderData.notEmpty) {
      mapInstance.addChild(mapListener);
    }
  }, [loaderData.ymaps, loaderData.notEmpty, activeAssignments, mapInstance]);

  //sorting and filtration
  useEffect(() => {
    const newActiveAssignments = loaderData.filteredAssignments[filter];

    if (newActiveAssignments.length > 0 && sorting === "ascending") {
      const emptyDurationAssignments = newActiveAssignments.filter(
        (item) => item.duration.start === null && item.duration.end === null
      );

      const notEmptyDurationAssignments = newActiveAssignments.filter(
        (item) => item.duration.start !== null && item.duration.end !== null
      );

      notEmptyDurationAssignments.sort(
        (a, b) =>
          new Date(a.duration.start as string).valueOf() -
          new Date(b.duration.start as string).valueOf()
      );

      setActiveAssignments([
        ...emptyDurationAssignments,
        ...notEmptyDurationAssignments,
      ]);
    } else if (newActiveAssignments.length > 0 && sorting === "descending") {
      const emptyDurationAssignments = newActiveAssignments.filter(
        (item) => item.duration.start === null && item.duration.end === null
      );

      const notEmptyDurationAssignments = newActiveAssignments.filter(
        (item) => item.duration.start !== null && item.duration.end !== null
      );

      notEmptyDurationAssignments.sort(
        (a, b) =>
          new Date(b.duration.start as string).valueOf() -
          new Date(a.duration.start as string).valueOf()
      );

      setActiveAssignments([
        ...emptyDurationAssignments,
        ...notEmptyDurationAssignments,
      ]);
    }
  }, [loaderData.filteredAssignments, filter, sorting]);

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
                ...(loaderData.filteredAssignments.new.length > 0
                  ? [
                      {
                        id: statusCodeMap[
                          statusValueMap.new as keyof typeof statusCodeMap
                        ].value,
                        label: t("status.new"),
                        count: loaderData.filteredAssignments.new.length,
                        color:
                          statusCodeMap[
                            statusValueMap.new as keyof typeof statusCodeMap
                          ].color,
                      },
                    ]
                  : []),
                ...(loaderData.filteredAssignments.accepted.length > 0
                  ? [
                      {
                        id: statusCodeMap[
                          statusValueMap.accepted as keyof typeof statusCodeMap
                        ].value,
                        label: t("status.accepted"),
                        count: loaderData.filteredAssignments.accepted.length,
                        color:
                          statusCodeMap[
                            statusValueMap.accepted as keyof typeof statusCodeMap
                          ].color,
                      },
                    ]
                  : []),
                ...(loaderData.filteredAssignments.canceled.length > 0
                  ? [
                      {
                        id: statusCodeMap[
                          statusValueMap.canceled as keyof typeof statusCodeMap
                        ].value,
                        label: t("status.canceled"),
                        count: loaderData.filteredAssignments.canceled.length,
                        color:
                          statusCodeMap[
                            statusValueMap.canceled as keyof typeof statusCodeMap
                          ].color,
                      },
                    ]
                  : []),
                ...(loaderData.filteredAssignments.archive.length > 0
                  ? [
                      {
                        id: statusCodeMap[
                          statusValueMap.archive as keyof typeof statusCodeMap
                        ].value,
                        label: t("status.archive"),
                        count: loaderData.filteredAssignments.archive.length,
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
              {activeAssignments.map((item) => (
                <AssignmentCard
                  key={item.id}
                  to={withLocale(`/assignments/${item.id}`)}
                  statusColor={item.statusColor}
                  header={`${t("cardHeader")} ${item.header}`}
                  subHeader={item.subHeader}
                  id={item.id.toString()}
                  address={item.address}
                  duration={item.duration}
                  divider
                  {...(item.duration.start &&
                  canCancelNewOrNotAccepted(
                    userId ? userId : -1,
                    item.userId,
                    item.status,
                    item.duration.start
                  )
                    ? {
                        buttonAction: {
                          action: () => {
                            setAssignmentToAct({
                              action: "cancel",
                              id: item.id,
                            });
                          },
                          text: t("cancelAssignmentButton"),
                          variant: "text",
                        },
                      }
                    : {})}
                  {...(item.duration.end &&
                  canCancelAccepted(
                    userId ? userId : -1,
                    item.userId,
                    item.status,
                    item.duration.end
                  )
                    ? {
                        buttonAction: {
                          action: () => {
                            setAssignmentToAct({
                              action: "cancel",
                              id: item.id,
                            });
                          },
                          text: t("cancelAssignmentButton"),
                          variant: "text",
                        },
                      }
                    : {})}
                  {...(item.duration.start &&
                  canRepeatCancelled(
                    userId ? userId : -1,
                    item.userId,
                    item.status,
                    item.duration.start
                  )
                    ? {
                        buttonAction: {
                          action: () => {
                            setAssignmentToAct({
                              action: "repeat",
                              id: item.id,
                            });
                          },
                          text: t("repeatAssignmentButton"),
                          variant: "contained",
                          icon: (
                            <LoopIcon
                              sx={{
                                transform: "rotate(90deg)",
                                marginRight: "8px",
                              }}
                            />
                          ),
                        },
                      }
                    : {})}
                />
              ))}
            </Box>
          )}

          <SwipeableDrawer
            open={showMap && selectedAssignment !== null ? true : false}
            onClose={() => {
              setSelectedAssignment(null);
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
              {selectedAssignment !== null ? (
                <AssignmentCard
                  to={withLocale(`/assignments/${selectedAssignment.id}`)}
                  header={`${t("cardHeader")} ${selectedAssignment.header}`}
                  subHeader={selectedAssignment.subHeader}
                  id={selectedAssignment.id.toString()}
                  address={selectedAssignment.address}
                  duration={selectedAssignment.duration}
                  divider
                  {...(selectedAssignment.duration.start &&
                  canCancelNewOrNotAccepted(
                    userId ? userId : -1,
                    selectedAssignment.userId,
                    selectedAssignment.status,
                    selectedAssignment.duration.start
                  )
                    ? {
                        buttonAction: {
                          action: () => {
                            setAssignmentToAct({
                              action: "cancel",
                              id: selectedAssignment.id,
                            });
                          },
                          text: t("cancelAssignmentButton"),
                          variant: "text",
                        },
                      }
                    : {})}
                  {...(selectedAssignment.duration.end &&
                  canCancelAccepted(
                    userId ? userId : -1,
                    selectedAssignment.userId,
                    selectedAssignment.status,
                    selectedAssignment.duration.end
                  )
                    ? {
                        buttonAction: {
                          action: () => {
                            setAssignmentToAct({
                              action: "cancel",
                              id: selectedAssignment.id,
                            });
                          },
                          text: t("cancelAssignmentButton"),
                          variant: "text",
                        },
                      }
                    : {})}
                  {...(selectedAssignment.duration.start &&
                  canRepeatCancelled(
                    userId ? userId : -1,
                    selectedAssignment.userId,
                    selectedAssignment.status,
                    selectedAssignment.duration.start
                  )
                    ? {
                        buttonAction: {
                          action: () => {
                            setAssignmentToAct({
                              action: "repeat",
                              id: selectedAssignment.id,
                            });
                          },
                          text: t("repeatAssignmentButton"),
                          variant: "contained",
                          icon: (
                            <LoopIcon
                              sx={{
                                transform: "rotate(90deg)",
                                marginRight: "8px",
                              }}
                            />
                          ),
                        },
                      }
                    : {})}
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
      (!showMap && userRole === "client") ||
      (activeAssignments.length === 0 && userRole === "admin") ||
      (activeAssignments.length === 0 && userRole === "client") ? (
        <Fab
          component={Link}
          to={withLocale("/new-assignment")}
          color="Corp_1"
          aria-label="Create new assignment"
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

      <Dialog
        open={assignmentToAct ? true : false}
        onClose={() => {
          setAssignmentToAct(null);
        }}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "8px",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "400",
            fontSize: "1.125rem",
          }}
        >
          {assignmentToAct
            ? `${t(`dialog.${assignmentToAct.action}`)} ${t("dialog.title")} ?`
            : null}
          {}
        </DialogTitle>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setAssignmentToAct(null);
            }}
          >
            {t("dialog.no")}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              fetcher.submit(
                JSON.stringify({
                  _action: assignmentToAct?.action,
                  orderId: assignmentToAct?.id,
                }),
                {
                  method: "POST",
                  encType: "application/json",
                }
              );
              setAssignmentToAct(null);
            }}
          >
            {t("dialog.yes")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
