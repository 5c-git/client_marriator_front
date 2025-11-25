import { Link, useOutletContext, useFetcher } from "react-router";
import { useState, useEffect } from "react";

import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { useStore } from "~/store/store";
import { statusCodeMap, statusValueMap } from "~/shared/status";

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

export type MobileListViewType = {
  filters: string[];
  filter: keyof typeof statusValueMap | "empty";
  activeStatus: keyof typeof statusValueMap | "empty";
  mapView: boolean;
};

export default function MobileListView(props: MobileListViewType) {
  const { t } = useTranslation("assignments");
  const fetcher = useFetcher();

  const userRole = useStore.getState().userRole;
  const userId = useStore.getState().userId;

  const [mapInstance, setMapInstance] = useState<YMap | null>(null);

  const [selectedCard, setSelectedCard] = useState<Option | null>(null);
  const [filter, setFilter] = useState(props.filter);
  const [sorting, setSorting] = useState<"ascending" | "descending">(
    "ascending"
  );
  const [activeAssignments, setActiveAssignments] = useState<Option[]>(
    props.filteredCards[filter]
  );
  const [cardToAct, setCardToAct] = useState<{
    action: "cancel" | "repeat";
    id: number;
  } | null>(null);

  // рисуем пустую карту
  useEffect(() => {
    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } =
      props.ymaps;

    const container = document.querySelector("#map") as HTMLElement;

    let map: YMap | null = null;

    if (container && props.notEmpty) {
      map = new YMap(container, {
        location: {
          center: props.filteredCards[filter][0].coordinates,
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
    props.ymaps,
    props.activeStatus,
    props.notEmpty,
    props.filteredCards,
    props.showMap,
  ]);

  // рисуем на карте маркеры
  useEffect(() => {
    const { YMapMarker } = props.ymaps;

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
    if (props.notEmpty) {
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
  }, [props.ymaps, props.notEmpty, activeAssignments, mapInstance]);

  // // обновляем слушатель событий
  useEffect(() => {
    const { YMapListener } = props.ymaps;

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
              setSelectedCard(match);
            }
          }
        }
      },
    });

    if (mapInstance && props.notEmpty) {
      mapInstance.addChild(mapListener);
    }
  }, [props.ymaps, props.notEmpty, activeAssignments, mapInstance]);

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
  }, [props.filteredCards, filter, sorting]);

  return (
    <>
      {props.notEmpty ? (
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
                ...(props.filteredCards.new.length > 0
                  ? [
                      {
                        id: statusCodeMap[
                          statusValueMap.new as keyof typeof statusCodeMap
                        ].value,
                        label: t("status.new"),
                        count: props.filteredCards.new.length,
                        color:
                          statusCodeMap[
                            statusValueMap.new as keyof typeof statusCodeMap
                          ].color,
                      },
                    ]
                  : []),
                ...(props.filteredCards.notAccepted.length > 0
                  ? [
                      {
                        id: statusCodeMap[
                          statusValueMap.notAccepted as keyof typeof statusCodeMap
                        ].value,
                        label: t("status.notAccepted"),
                        count: props.filteredCards.notAccepted.length,
                        color:
                          statusCodeMap[
                            statusValueMap.notAccepted as keyof typeof statusCodeMap
                          ].color,
                      },
                    ]
                  : []),
                ...(props.filteredCards.accepted.length > 0
                  ? [
                      {
                        id: statusCodeMap[
                          statusValueMap.accepted as keyof typeof statusCodeMap
                        ].value,
                        label: t("status.accepted"),
                        count: props.filteredCards.accepted.length,
                        color:
                          statusCodeMap[
                            statusValueMap.accepted as keyof typeof statusCodeMap
                          ].color,
                      },
                    ]
                  : []),
                ...(props.filteredCards.canceled.length > 0
                  ? [
                      {
                        id: statusCodeMap[
                          statusValueMap.canceled as keyof typeof statusCodeMap
                        ].value,
                        label: t("status.canceled"),
                        count: props.filteredCards.canceled.length,
                        color:
                          statusCodeMap[
                            statusValueMap.canceled as keyof typeof statusCodeMap
                          ].color,
                      },
                    ]
                  : []),
                ...(props.filteredCards.archive.length > 0
                  ? [
                      {
                        id: statusCodeMap[
                          statusValueMap.archive as keyof typeof statusCodeMap
                        ].value,
                        label: t("status.archive"),
                        count: props.filteredCards.archive.length,
                        color:
                          statusCodeMap[
                            statusValueMap.archive as keyof typeof statusCodeMap
                          ].color,
                      },
                    ]
                  : []),
              ]}
            />

            {!props.showMap ? (
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

          {props.showMap ? (
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
                  subHeader={{
                    text: item.subHeader,
                    bold: false,
                  }}
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
                            setFilter("new");
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
                  subHeader={{
                    text: selectedAssignment.subHeader,
                    bold: false,
                  }}
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

      {(!props.showMap && userRole === "admin") ||
      (!props.showMap && userRole === "client") ||
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
        open={cardToAct ? true : false}
        onClose={() => {
          setCardToAct(null);
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
          {cardToAct
            ? `${t(`dialog.${cardToAct.action}`)} ${t("dialog.title")} ?`
            : null}
          {}
        </DialogTitle>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setCardToAct(null);
            }}
          >
            {t("dialog.no")}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              fetcher.submit(
                JSON.stringify({
                  _action: cardToAct?.action,
                  orderId: cardToAct?.id,
                }),
                {
                  method: "POST",
                  encType: "application/json",
                }
              );
              if (cardToAct?.action === "repeat") {
                setFilter("new");
              }
              setCardToAct(null);
            }}
          >
            {t("dialog.yes")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
