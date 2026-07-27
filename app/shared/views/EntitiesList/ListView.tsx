import { useState } from "react";

import type { EntitiesListInterface, Entity } from "./EntitesListInterface";
import { useEntitiesList } from "./EntitiesList.hooks";

import { useTranslation } from "react-i18next";

import { statusCodeMap } from "~/shared/status";
import { statusCodeMap as jobsStatusCodeMap } from "~/shared/specialistStatus";

import Box from "@mui/material/Box";
import { SwipeableDrawer, Typography } from "@mui/material";

import { StatusSelect } from "~/shared/ui/StatusSelect/StatusSelect";
import { SortingSelect } from "~/shared/ui/SortingSelect/SortingSelect";

import {
  YMap,
  YMapMarker,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapFeatureDataSource,
  YMapLayer,
} from "~/shared/ymap/map";
import { YMapClusterer } from "~/shared/ymap/map";
import { clusterByGrid } from "@yandex/ymaps3-clusterer";

const statusObject = {
  order: statusCodeMap,
  task: statusCodeMap,
  bid: statusCodeMap,
  job: jobsStatusCodeMap,
};

export function ListView(props: EntitiesListInterface) {
  const { t } = useTranslation("EntitiesListView");

  const listHooks = useEntitiesList(props.entities, props.sorting);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);

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
            {listHooks.filter !== -1 ? (
              <StatusSelect
                value={listHooks.filter.toString()}
                onChange={(value) => {
                  listHooks.setFilter(Number(value));
                }}
                options={(() => {
                  const options: {
                    id: string;
                    label: string;
                    count: number;
                    color: string;
                  }[] = [];

                  for (const key in listHooks.entities.filteredEntities) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const selectedStatusMap = statusObject[props.entityType];
                    options.push({
                      id: key,
                      label: t(
                        `${props.translation}.status.${Number(key) as keyof typeof selectedStatusMap}`,
                      ),
                      count:
                        listHooks.entities.filteredEntities[Number(key)].length,
                      color:
                        statusObject[props.entityType][
                          Number(key) as keyof typeof statusCodeMap
                        ].color,
                    });
                  }

                  return options;
                })()}
              />
            ) : null}

            {props.view !== "map" ? (
              <SortingSelect
                value={listHooks.sorting}
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
                  const currentSorting = value as typeof listHooks.sorting;
                  listHooks.setSorting(currentSorting);
                }}
              />
            ) : null}
          </Box>

          {props.view === "map" ? (
            <Box
              id="map"
              sx={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
              }}
            >
              <YMap
                location={{
                  center: [37.588144, 55.733842],
                  zoom: 12,
                }}
              >
                <YMapDefaultSchemeLayer />
                <YMapDefaultFeaturesLayer />
                <YMapFeatureDataSource id="my-source" />
                <YMapLayer source="my-source" type="markers" zIndex={1800} />
                <YMapClusterer
                  features={listHooks.entities.activeEntities.map(
                    (entity, index) => ({
                      type: "Feature",
                      id: String(index),
                      geometry: {
                        type: "Point",
                        coordinates: [
                          entity.coordinates[1],
                          entity.coordinates[0],
                        ],
                      },
                      properties: {
                        locationId: entity.id,
                        image: entity.address.logo,
                        borderColor: entity.statusColor,
                      },
                    }),
                  )}
                  cluster={(coordinates, features) => (
                    <YMapMarker coordinates={coordinates} source="my-source">
                      <div
                        style={{
                          position: "absolute",
                          left: "-50%",
                          top: "-50%",
                          width: "60px",
                          height: "60px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "50%",
                          overflow: "hidden",
                          backgroundColor:
                            listHooks.entities.activeEntities[0].statusColor,
                          color: "white",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "18px",
                            fontWeight: "700",
                          }}
                        >
                          {features.length}
                        </span>
                      </div>
                    </YMapMarker>
                  )}
                  marker={(point) => (
                    <YMapMarker
                      coordinates={point.geometry.coordinates}
                      properties={{
                        locationId: point.properties?.locationId,
                        image: point.properties?.image,
                        borderColor: point.properties?.borderColor,
                      }}
                      source="my-source"
                      onClick={() => {
                        const clickedLocation = point.properties
                          ?.locationId as number;

                        const match = listHooks.entities.activeEntities.find(
                          (item) => item.id === clickedLocation,
                        );

                        if (match) {
                          setSelectedEntity(match);
                        }
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: "-50%",
                          top: "-50%",
                          width: "41px",
                          height: "41px",
                          border: "5px solid",
                          borderRadius: "50%",
                          overflow: "hidden",
                          cursor: "pointer",
                          borderColor: point.properties?.borderColor as string,
                        }}
                      >
                        <img
                          src={point.properties?.image as string}
                          style={{
                            // position: "relative",
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                          }}
                          alt="shop logo"
                        />
                      </div>
                    </YMapMarker>
                  )}
                  method={clusterByGrid({ gridSize: 64 })}
                />
              </YMap>
            </Box>
          ) : null}
          {props.view === "list" ? (
            <Box
              sx={{
                display: "grid",
                rowGap: "16px",
                paddingLeft: "16px",
                paddingRight: "16px",
                paddingBottom: "16px",
              }}
            >
              {listHooks.entities.activeEntities.map((item) =>
                props.entityListView(item),
              )}
            </Box>
          ) : null}

          <SwipeableDrawer
            open={
              props.view === "map" && selectedEntity !== null ? true : false
            }
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
