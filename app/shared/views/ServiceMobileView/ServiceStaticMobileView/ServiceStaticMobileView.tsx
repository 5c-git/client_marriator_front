import type { ServiceMobileViewInterface } from "../ServiceMobileViewInterface";

import { useTranslation } from "react-i18next";

import { getDay, compareAsc, format } from "date-fns";

import Box from "@mui/material/Box";
import { Avatar, Typography, Divider } from "@mui/material";

import {
  S_Accordion,
  S_AccordionSummary,
  S_AccordionDetails,
} from "../ServiceMobileView.styled";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { StyledCheckbox } from "~/shared/ui/StyledCheckbox/StyledCheckbox";
import { ExpandIcon } from "~/shared/icons/ExpandIcon";
import { EditIcon } from "~/shared/icons/EditIcon";
import { LocationIcon } from "~/shared/icons/LocationIcon";

type ServiceStaticMobileViewInterface = Omit<
  ServiceMobileViewInterface,
  "submitAction" | "cancelAction" | "projectTimeRange"
>;

export function ServiceStaticMobileView(
  props: ServiceStaticMobileViewInterface,
) {
  const { t } = useTranslation("ServiceMobileView");

  return (
    <>
      <TopNavigation
        header={{
          text: t(`${props.translation}.header`),
          bold: false,
        }}
        backAction={props.headerBackAction}
        {...(props.headerButtonAction
          ? {
              buttonAction: {
                text: "",
                icon: (
                  <EditIcon
                    sx={{
                      width: "16px",
                      height: "16px",
                    }}
                  />
                ),
                action: props.headerButtonAction,
              },
            }
          : null)}
      />
      <Box
        sx={{
          height: "calc(100vh - 120px)",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",

          rowGap: "14px",
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingTop: "20px",
        }}
      >
        <Avatar
          src={`${import.meta.env.VITE_ASSET_PATH}${props.logo}`}
          sx={{ width: "100px", height: "100px", margin: "0 auto" }}
        />

        <Box
          sx={{
            display: "grid",
            rowGap: "14px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "grid",
              rowGap: "4px",
            }}
          >
            <Typography
              component="p"
              variant="Reg_12"
              sx={(theme) => ({
                color: theme.vars.palette["Grey_2"],
              })}
            >
              {t(`${props.translation}.fields.servicePlaceholder`)}
            </Typography>
            <Typography
              component="p"
              variant="Reg_14"
              sx={(theme) => ({ color: theme.vars.palette["Black"] })}
            >
              {props.entity.name}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              rowGap: "4px",
            }}
          >
            <Typography
              component="p"
              variant="Reg_12"
              sx={(theme) => ({
                color: theme.vars.palette["Grey_2"],
              })}
            >
              {t(`${props.translation}.fields.amountPlaceholder`)}
            </Typography>
            <Typography
              component="p"
              variant="Reg_14"
              sx={(theme) => ({ color: theme.vars.palette["Black"] })}
            >
              {props.entity.amount}
            </Typography>
          </Box>

          {props.entity.dateStart && props.entity.dateEnd ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    rowGap: "4px",
                  }}
                >
                  <Typography
                    component="p"
                    variant="Reg_12"
                    sx={(theme) => ({
                      color: theme.vars.palette["Grey_2"],
                    })}
                  >
                    {t(`${props.translation}.startDate`)}
                  </Typography>
                  <Typography
                    component="p"
                    variant="Reg_14"
                    sx={(theme) => ({ color: theme.vars.palette["Black"] })}
                  >
                    {format(props.entity.dateStart, "HH:mm dd.LL.yyyy")}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    rowGap: "4px",
                  }}
                >
                  <Typography
                    component="p"
                    variant="Reg_12"
                    sx={(theme) => ({
                      color: theme.vars.palette["Grey_2"],
                    })}
                  >
                    {t(`${props.translation}.endDate`)}
                  </Typography>
                  <Typography
                    component="p"
                    variant="Reg_14"
                    sx={(theme) => ({ color: theme.vars.palette["Black"] })}
                  >
                    {format(props.entity.dateEnd, "HH:mm dd.LL.yyyy")}
                  </Typography>
                </Box>
              </Box>
              <Divider />
            </>
          ) : null}
        </Box>

        {props.entity.days.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              rowGap: "8px",
            }}
          >
            {props.entity.days.map((day, index) => (
              <S_Accordion key={index}>
                <S_AccordionSummary
                  expandIcon={
                    <ExpandIcon
                      sx={(theme) => ({
                        color: theme.vars.palette["Grey_2"],
                        padding: "4px",
                      })}
                    />
                  }
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      component="p"
                      variant="Bold_14"
                      sx={(theme) => ({
                        color: theme.vars.palette["Black"],
                      })}
                    >
                      {format(day.timeStart, "dd.MM")}
                      &nbsp;
                      {t(
                        `${props.translation}.dayMap.${getDay(day.timeStart)}`,
                      )}
                    </Typography>

                    <Typography
                      component="p"
                      variant="Reg_14"
                      sx={(theme) => ({
                        color: theme.vars.palette["Black"],
                      })}
                    >
                      {format(day.timeStart, "kk:mm")}-
                      {format(day.timeEnd, "kk:mm")}
                    </Typography>

                    {(() => {
                      const locations = day.locations;

                      if (day.locations && locations.length > 0) {
                        return (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              columnGap: "4px",
                            }}
                          >
                            <LocationIcon
                              sx={(theme) => ({
                                color: theme.vars.palette["Grey_2"],
                                padding: "2px",
                              })}
                            />
                            <Typography
                              component="p"
                              variant="Reg_14"
                              sx={(theme) => ({
                                color: theme.vars.palette["Black"],
                              })}
                            >
                              {locations.length}
                            </Typography>
                          </Box>
                        );
                      } else {
                        return null;
                      }
                    })()}
                  </Box>
                </S_AccordionSummary>
                <S_AccordionDetails>
                  {" "}
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        columnGap: "10px",
                        marginBottom: "14px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            display: "grid",
                            rowGap: "4px",
                          }}
                        >
                          <Typography
                            component="p"
                            variant="Reg_12"
                            sx={(theme) => ({
                              color: theme.vars.palette["Grey_2"],
                            })}
                          >
                            {t(`${props.translation}.startTime`)}
                          </Typography>
                          <Typography
                            component="p"
                            variant="Reg_14"
                            sx={(theme) => ({
                              color: theme.vars.palette["Black"],
                            })}
                          >
                            {format(day.timeStart, "kk:mm")}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "grid",
                            rowGap: "4px",
                          }}
                        >
                          <Typography
                            component="p"
                            variant="Reg_12"
                            sx={(theme) => ({
                              color: theme.vars.palette["Grey_2"],
                            })}
                          >
                            {t(`${props.translation}.endTime`)}
                          </Typography>
                          <Typography
                            component="p"
                            variant="Reg_14"
                            sx={(theme) => ({
                              color: theme.vars.palette["Black"],
                            })}
                          >
                            {format(day.timeEnd, "kk:mm")}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    {day.needRoute !== undefined ? (
                      <Box
                        sx={{
                          display: "grid",
                          rowGap: "14px",
                        }}
                      >
                        {day.needRoute === true
                          ? day.locations?.map((location) => (
                              <Box
                                key={location.id}
                                sx={{
                                  display: "flex",
                                  columnGap: "12px",
                                  alignItems: "center",
                                }}
                              >
                                {location.logo ? (
                                  <Avatar
                                    src={`${import.meta.env.VITE_ASSET_PATH}${
                                      location.logo
                                    }`}
                                    sx={{
                                      width: "30px",
                                      height: "30px",
                                    }}
                                  />
                                ) : null}

                                <Typography
                                  component="p"
                                  variant="Reg_14"
                                  sx={{
                                    flexGrow: "1",
                                  }}
                                >
                                  {location.name}
                                </Typography>
                              </Box>
                            ))
                          : null}
                      </Box>
                    ) : null}

                    <Divider sx={{ marginTop: "8px" }} />
                  </Box>
                </S_AccordionDetails>
              </S_Accordion>
            ))}
          </Box>
        ) : null}

        <StyledCheckbox
          name="needPhoto"
          value={props.entity.needPhoto}
          disabled
          inputType="checkbox"
          label={t(`${props.translation}.fields.needPhotosPlaceholder`)}
          onChange={() => {}}
          onImmediateChange={() => {}}
          validation="none"
        />
      </Box>
    </>
  );
}
