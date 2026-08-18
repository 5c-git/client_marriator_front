import { Outlet } from "react-router";
import { isEqual } from "date-fns";

import { useTranslation } from "react-i18next";

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

import type { EntitiesListInterface } from "./EntitesListInterface";

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

import { useEntities } from "./Entities.hooks";

const statusObject = {
  order: statusCodeMap,
  task: statusCodeMap,
  bid: statusCodeMap,
  job: jobsStatusCodeMap,
};

export function DashboardView(props: EntitiesListInterface) {
  const { t } = useTranslation("EntitiesListView");

  const listHooks = useEntities(props.entities, props.sorting);

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
                {listHooks.filter !== -1 ? (
                  <StyledSelect
                    inputType="select"
                    name="status"
                    placeholder={t(
                      `${props.translation}.statusSelectPlaceholder`,
                    )}
                    onImmediateChange={() => {}}
                    value={listHooks.filter.toString()}
                    onChange={(evt) => {
                      listHooks.setFilter(Number(evt.target.value));
                      listHooks.setSelectedDay("");
                    }}
                    options={(() => {
                      const options: {
                        value: string;
                        label: string;
                        disabled: boolean;
                      }[] = [];

                      for (const key in listHooks.entities.filteredEntities) {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const selectedStatusMap =
                          statusObject[props.entityType];
                        options.push({
                          value: key,
                          label: `${t(
                            `${props.translation}.status.${Number(key) as keyof typeof selectedStatusMap}`,
                          )}(${listHooks.entities.filteredEntities[Number(key)].length})`,
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
                      listHooks.sorting === "ascending"
                        ? "descending"
                        : "ascending";
                    listHooks.setSorting(currentSorting);
                  }}
                  sx={{
                    width: "unset",
                  }}
                >
                  {listHooks.sorting === "ascending"
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
                  value={listHooks.search}
                  placeholder={t(`${props.translation}.searchbarPlaceholder`)}
                  onChange={(evt) => {
                    listHooks.setSearch(evt.target.value);
                    listHooks.setDebouncedSearch();
                  }}
                />

                <ToggleButtonGroup
                  color="primary"
                  value={props.view}
                  exclusive
                  onChange={(_, newValue: "list" | "table" | "map") => {
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

            {listHooks.days.size > 0 ? (
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
                    ...(listHooks.selectedDay === "" && {
                      background:
                        "linear-gradient(135deg, rgb(248, 230, 243), rgb(239, 231, 250))",
                      color: "var(--mui-palette-Corp_1)",
                      border: "1px solid var(--mui-palette-Corp_1)",
                    }),
                  }}
                  onClick={() => {
                    listHooks.setSelectedDay("");
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
                  {(() => {
                    const dayList = [];

                    for (const day of listHooks.days) {
                      const dayDate = new Date(day);

                      dayList.push(
                        <Box
                          key={day}
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
                            ...(isEqual(listHooks.selectedDay, dayDate) && {
                              background:
                                "linear-gradient(135deg, rgb(248, 230, 243), rgb(239, 231, 250))",
                              color: "var(--mui-palette-Corp_1)",
                              border: "1px solid var(--mui-palette-Corp_1)",
                            }),
                          }}
                          onClick={() => {
                            listHooks.setSelectedDay(dayDate);
                          }}
                        >
                          <Typography variant="Reg_12">
                            {t(
                              //@ts-expect-error locale incorrect type narrowing
                              `${props.translation}.dayMap.${dayDate.getDay()}`,
                            )}
                          </Typography>
                          <Typography variant="Bold_14">
                            {dayDate.getDate()}/{dayDate.getMonth() + 1}
                          </Typography>
                        </Box>,
                      );
                    }

                    return dayList;
                  })()}
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
                scrollbarWidth: "none",
              }}
            >
              {props.view === "map" ? (
                <Box
                  id="map"
                  sx={{
                    height: "100%",
                    width: "420px",
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
                    <YMapLayer
                      source="my-source"
                      type="markers"
                      zIndex={1800}
                    />
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
                        <YMapMarker
                          coordinates={coordinates}
                          source="my-source"
                        >
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
                                listHooks.entities.activeEntities[0]
                                  .statusColor,
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

                            const match =
                              listHooks.entities.activeEntities.find(
                                (item) => item.id === clickedLocation,
                              );

                            if (match) {
                              props.entityMapView(match);
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
                              borderColor: point.properties
                                ?.borderColor as string,
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
                    padding: "16px",
                    width: "420px",
                  }}
                >
                  {listHooks.entities.activeEntities.map((item) =>
                    props.entityListView(item),
                  )}
                </Box>
              ) : null}
              {props.view === "table" ? (
                <Box
                  sx={{
                    width: "420px",
                  }}
                >
                  {listHooks.entities.activeEntities.map((item) =>
                    props.entityTableView(item),
                  )}
                </Box>
              ) : null}
            </Box>

            <Box
              sx={(theme) => ({
                position: "relative",
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                height: "100%",
                backgroundColor: theme.vars.palette["Grey_5"],
                borderRadius: "5px 0 0 0",
                padding: "20px",
              })}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "600px",
                  margin: "0 auto",
                  flexGrow: 1,
                }}
              >
                <Outlet />
              </Box>
            </Box>
          </Box>
        </>
      ) : (
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
              width: "420px",
              overflowY: "auto",
              scrollbarWidth: "none",
            }}
          >
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
          </Box>
          <Box
            sx={(theme) => ({
              position: "relative",
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              height: "100%",
              backgroundColor: theme.vars.palette["Grey_5"],
              borderRadius: "5px 0 0 0",
              padding: "20px",
            })}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                maxWidth: "600px",
                margin: "0 auto",
                flexGrow: 1,
              }}
            >
              <Outlet />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
