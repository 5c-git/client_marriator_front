import { useOutletContext } from "react-router";
import { useState, useEffect } from "react";

import type { Route } from "./+types/requests";

import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import Box from "@mui/material/Box";
import { SwipeableDrawer, Typography } from "@mui/material";

import { StatusSelect } from "~/shared/ui/StatusSelect/StatusSelect";
import { SortingSelect } from "~/shared/ui/SortingSelect/SortingSelect";
import { AssignmentCard } from "~/shared/ui/AssignmentCard/AssignmentCard";

//map
import { YMap, LngLat, YMapMarker } from "ymaps3";
import { loadMap, langMap, renderIcon } from "~/shared/ymap/ymap";
import type { Coordinates } from "~/shared/ymap/ymap";
//map

import { useStore } from "~/store/store";

import { statusCodeMap, statusValueMap } from "~/shared/status";

import { getBids } from "~/requests/_personal/getBids/getBids";

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
    start: string | null;
    end: string | null;
  };
  coordinates: Coordinates;
};

export async function clientLoader() {
  const language = i18next.language as "en" | "ru";
  const accessToken = useStore.getState().accessToken;

  const requests: Option[] = [];

  const filteredRequests: {
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

    const requestsData = await getBids(accessToken);

    requestsData.data.forEach((item) => {
      requests.push({
        id: item.id,
        status: item.status,
        statusColor: statusCodeMap[item.status].color,
        header: item.viewActivity.name,
        subHeader: "1",
        address: {
          logo: `${import.meta.env.VITE_ASSET_PATH}${item.place.logo}`,
          text: item.place.address_kladr,
        },
        duration: {
          start: item.date_start,
          end: item.date_end,
        },
        coordinates: [
          Number(item.place.latitude),
          Number(item.place.longitude),
        ],
      });
    });

    filteredRequests.new = requests.filter(
      (item) => item.status === statusValueMap.new
    );
    filteredRequests.accepted = requests.filter(
      (item) => item.status === statusValueMap.accepted
    );
    filteredRequests.notAccepted = requests.filter(
      (item) => item.status === statusValueMap.notAccepted
    );
    filteredRequests.canceled = requests.filter(
      (item) => item.status === statusValueMap.canceled
    );
    filteredRequests.archive = requests.filter(
      (item) => item.status === statusValueMap.archive
    );

    const activeStatus: keyof typeof statusValueMap | "empty" =
      requestsData.data.length > 0
        ? statusCodeMap[requestsData.data[0].status].value
        : "empty";

    return {
      ymaps,
      filteredRequests,
      activeStatus,
      notEmpty: requestsData.data.length > 0 ? true : false,
    };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Requesets({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("requests");

  const showMap = useOutletContext<boolean>();

  const [mapInstance, setMapInstance] = useState<YMap | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<Option | null>(null);
  const [filter, setFilter] = useState<keyof typeof statusValueMap | "empty">(
    loaderData.activeStatus
  );
  const [sorting, setSorting] = useState<"ascending" | "descending">(
    "ascending"
  );
  const [activeRequests, setActiveRequests] = useState<Option[]>(
    loaderData.filteredRequests[filter]
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
            loaderData.filteredRequests[loaderData.activeStatus][0].coordinates,
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
    loaderData.filteredRequests,
    showMap,
  ]);

  // рисуем на карте маркеры
  useEffect(() => {
    const { YMapMarker } = loaderData.ymaps;

    const markers: YMapMarker[] = [];

    // mapInstance?.setLocation({ center: activeRequests[0].coordinates });

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
      activeRequests.forEach((location) => {
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
  }, [loaderData.ymaps, loaderData.notEmpty, activeRequests, mapInstance]);

  // // обновляем слушатель событий
  useEffect(() => {
    const { YMapListener } = loaderData.ymaps;

    const mapListener = new YMapListener({
      layer: "any",
      onClick: (object) => {
        if (object?.type === "marker") {
          if (object.entity.properties) {
            const clickedLocation = object.entity.properties.id as number;

            const match = activeRequests.find(
              (item) => item.id === clickedLocation
            );

            if (match) {
              setSelectedRequest(match);
            }
          }
        }
      },
    });

    if (mapInstance && loaderData.notEmpty) {
      mapInstance.addChild(mapListener);
    }
  }, [loaderData.ymaps, loaderData.notEmpty, activeRequests, mapInstance]);

  //sorting and filtration
  useEffect(() => {
    const newActiveRequests = loaderData.filteredRequests[filter];

    if (newActiveRequests.length > 0 && sorting === "ascending") {
      const emptyDurationRequests = newActiveRequests.filter(
        (item) => item.duration.start === null && item.duration.end === null
      );

      const notEmptyDurationRequests = newActiveRequests.filter(
        (item) => item.duration.start !== null && item.duration.end !== null
      );

      notEmptyDurationRequests.sort(
        (a, b) =>
          new Date(a.duration.start as string).valueOf() -
          new Date(b.duration.start as string).valueOf()
      );

      setActiveRequests([
        ...emptyDurationRequests,
        ...notEmptyDurationRequests,
      ]);
    } else if (newActiveRequests.length > 0 && sorting === "descending") {
      const emptyDurationRequests = newActiveRequests.filter(
        (item) => item.duration.start === null && item.duration.end === null
      );

      const notEmptyDurationRequests = newActiveRequests.filter(
        (item) => item.duration.start !== null && item.duration.end !== null
      );

      notEmptyDurationRequests.sort(
        (a, b) =>
          new Date(b.duration.start as string).valueOf() -
          new Date(a.duration.start as string).valueOf()
      );

      setActiveRequests([
        ...emptyDurationRequests,
        ...notEmptyDurationRequests,
      ]);
    }
  }, [loaderData.filteredRequests, filter, sorting]);

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
                ...(loaderData.filteredRequests.new.length > 0
                  ? [
                      {
                        id: statusCodeMap[
                          statusValueMap.new as keyof typeof statusCodeMap
                        ].value,
                        label: t("status.new"),
                        count: loaderData.filteredRequests.new.length,
                        color:
                          statusCodeMap[
                            statusValueMap.new as keyof typeof statusCodeMap
                          ].color,
                      },
                    ]
                  : []),
                ...(loaderData.filteredRequests.accepted.length > 0
                  ? [
                      {
                        id: statusCodeMap[
                          statusValueMap.accepted as keyof typeof statusCodeMap
                        ].value,
                        label: t("status.accepted"),
                        count: loaderData.filteredRequests.accepted.length,
                        color:
                          statusCodeMap[
                            statusValueMap.accepted as keyof typeof statusCodeMap
                          ].color,
                      },
                    ]
                  : []),
                ...(loaderData.filteredRequests.canceled.length > 0
                  ? [
                      {
                        id: statusCodeMap[
                          statusValueMap.canceled as keyof typeof statusCodeMap
                        ].value,
                        label: t("status.canceled"),
                        count: loaderData.filteredRequests.canceled.length,
                        color:
                          statusCodeMap[
                            statusValueMap.canceled as keyof typeof statusCodeMap
                          ].color,
                      },
                    ]
                  : []),
                ...(loaderData.filteredRequests.archive.length > 0
                  ? [
                      {
                        id: statusCodeMap[
                          statusValueMap.archive as keyof typeof statusCodeMap
                        ].value,
                        label: t("status.archive"),
                        count: loaderData.filteredRequests.archive.length,
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
              {activeRequests.map((item) => (
                <AssignmentCard
                  key={item.id}
                  to={withLocale(`/requests/${item.id}`)}
                  statusColor={item.statusColor}
                  header={`${t("cardHeader")} ${item.header}`}
                  subHeader={item.subHeader}
                  id={item.id.toString()}
                  address={item.address}
                  duration={item.duration}
                  divider
                />
              ))}
            </Box>
          )}

          <SwipeableDrawer
            open={showMap && selectedRequest !== null ? true : false}
            onClose={() => {
              setSelectedRequest(null);
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
              {selectedRequest !== null ? (
                <AssignmentCard
                  to={withLocale(`/requests/${selectedRequest.id}`)}
                  header={`${t("cardHeader")} ${selectedRequest.header}`}
                  subHeader={selectedRequest.subHeader}
                  id={selectedRequest.id.toString()}
                  address={selectedRequest.address}
                  duration={selectedRequest.duration}
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
          {t("emptyHeader")}
        </Typography>
      )}
    </>
  );
}
