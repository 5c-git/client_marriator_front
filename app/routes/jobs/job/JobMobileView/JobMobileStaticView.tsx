import type { JobMobileViewInterface } from "./JobMobileViewInterface";
import { useTranslation } from "react-i18next";

import { format, getDay } from "date-fns";

import Box from "@mui/material/Box";
import { Avatar, Divider, IconButton, Typography } from "@mui/material";
import { StyledCheckbox } from "~/shared/ui/StyledCheckbox/StyledCheckbox";

import {
  S_Accordion,
  S_AccordionSummary,
  S_AccordionDetails,
} from "./JobMobileView.styled";

import { PhoneIcon } from "~/shared/icons/PhoneIcon";
import { ExpandIcon } from "~/shared/icons/ExpandIcon";
import { LocationIcon } from "~/shared/icons/LocationIcon";

import { statusCodeMap } from "~/shared/specialistStatus";

export function JobMobileStaticView({
  entity,
  actions,
}: {
  entity: JobMobileViewInterface["entity"];
  actions: ((
    day: JobMobileViewInterface["entity"]["days"][0],
    action: JobMobileViewInterface["entity"]["days"][0]["action"],
  ) => React.ReactNode)[];
}) {
  const { t } = useTranslation("JobMobileView");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "14px",
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      <Avatar
        src={entity.logo}
        sx={{ width: "100px", height: "100px", margin: "0 auto" }}
      />

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
          {t("statusText")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            columnGap: "8px",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "14px",
              height: "14px",
              borderRadius: "50px",
            }}
            style={{
              backgroundColor:
                statusCodeMap[entity.status as keyof typeof statusCodeMap]
                  .color,
            }}
          ></Box>
          <Typography
            component="p"
            variant="Reg_14"
            sx={(theme) => ({
              color: theme.vars.palette["Black"],
            })}
          >
            {t(
              `status.${
                statusCodeMap[entity.status as keyof typeof statusCodeMap].value
              }`,
            )}
          </Typography>
        </Box>
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
          {t("locationText")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            columnGap: "8px",
            alignItems: "center",
          }}
        >
          <Avatar
            src={entity.place.logo}
            sx={{ width: "30px", height: "30px" }}
          />
          <Typography
            component="p"
            variant="Reg_14"
            sx={(theme) => ({ color: theme.vars.palette["Black"] })}
          >
            {entity.place.name}
          </Typography>
        </Box>
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
          {t("serviceTypeText")}
        </Typography>
        <Typography
          component="p"
          variant="Reg_14"
          sx={(theme) => ({
            color: theme.vars.palette["Black"],
          })}
        >
          {entity.activity}
        </Typography>
      </Box>

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
            {t("pricePerUnitText")}
          </Typography>
          <Typography
            component="p"
            variant="Reg_14"
            sx={(theme) => ({ color: theme.vars.palette["Corp_1"] })}
          >
            {entity.unitPrice}
          </Typography>
        </Box>

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
              {t("dateStartText")}
            </Typography>
            <Typography
              component="p"
              variant="Reg_14"
              sx={(theme) => ({ color: theme.vars.palette["Black"] })}
            >
              {format(new Date(entity.dateStart), "HH:mm dd.LL.yyyy")}
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
              {t("dateEndText")}
            </Typography>
            <Typography
              component="p"
              variant="Reg_14"
              sx={(theme) => ({ color: theme.vars.palette["Black"] })}
            >
              {format(new Date(entity.dateEnd), "HH:mm dd.LL.yyyy")}
            </Typography>
          </Box>
        </Box>

        {entity.days.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              rowGap: "8px",
            }}
          >
            {entity.days.map((day, index) => (
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
                      {/*@ts-expect-error https://www.i18next.com/overview/typescript#type-error-template-literal */}
                      {t(`dayMap.${getDay(day.timeStart)}`)}
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

                      if (locations && locations.length > 0) {
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
                            {t("timeStartPlaceholder")}
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
                            {t("timeEndPlaceholder")}
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

                    <Box
                      sx={{
                        display: "grid",
                        rowGap: "14px",
                      }}
                    >
                      {day.needRoute === true
                        ? day.locations?.map((location) => (
                            <Box key={location.id}>
                              <Box
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
                              {actions.map((action) => action(day, day.action))}
                            </Box>
                          ))
                        : null}
                    </Box>

                    <Divider sx={{ marginTop: "8px" }} />
                  </Box>
                </S_AccordionDetails>
              </S_Accordion>
            ))}
          </Box>
        ) : null}

        <StyledCheckbox
          inputType="checkbox"
          name="needPhoto"
          label={t("photoCheckbox")}
          value={entity.needPhoto}
          onChange={() => {}}
          onImmediateChange={() => {}}
          validation="none"
          disabled
        />

        <Box
          sx={{
            display: "flex",
            columnGap: "10px",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              columnGap: "4px",
              alignItems: "flex-start",
            }}
          >
            <Avatar src={entity.logo} sx={{ width: "30px", height: "30px" }} />
            <Box>
              <Typography
                component="p"
                variant="Reg_14"
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                })}
              >
                {entity.user.name}
              </Typography>
              <Typography
                component="p"
                variant="Reg_12"
                sx={(theme) => ({
                  color: theme.vars.palette["Grey_2"],
                })}
              >
                {/* @ts-ignore */}
                {t(`role.${entity.user.role}`)}
              </Typography>
            </Box>
          </Box>
          <IconButton
            component="a"
            href={`tel:+${entity.user.phone}`}
            sx={(theme) => ({
              display: "flex",
              padding: "7px",
              color: theme.vars.palette["Corp_1"],
              backgroundColor: theme.vars.palette["Grey_4"],
              borderRadius: "5px",
            })}
          >
            <PhoneIcon
              sx={{
                width: "16px",
                height: "16px",
              }}
            />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
