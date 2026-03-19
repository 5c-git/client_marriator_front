import type { BidMobileViewInterface } from "./BidMobileViewInterface";

import { Link } from "react-router";

import { useTranslation } from "react-i18next";

import { statusCodeMap } from "~/shared/status";

import { withLocale } from "~/shared/withLocale";
import { determineRole } from "~/shared/determineRole";

import { format, getDay } from "date-fns";

import Box from "@mui/material/Box";
import { Avatar, Divider, Typography } from "@mui/material";
import {
  S_Accordion,
  S_AccordionSummary,
  S_AccordionDetails,
} from "./BidMobileView.styled";
import { StyledCheckbox } from "~/shared/ui/StyledCheckbox/StyledCheckbox";

import { ExpandIcon } from "~/shared/icons/ExpandIcon";
import { LocationIcon } from "~/shared/icons/LocationIcon";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export function BidStaticMobileView(props: BidMobileViewInterface) {
  const { t } = useTranslation("BidMobileView");

  return (
    <>
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
          src={`${import.meta.env.VITE_ASSET_PATH}${props.entity.logo}`}
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
            {t("statusPlaceholder")}
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
                  statusCodeMap[
                    props.entity.status as keyof typeof statusCodeMap
                  ].color,
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
                  statusCodeMap[
                    props.entity.status as keyof typeof statusCodeMap
                  ].value
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
            {t("projectTypePlaceholder")}
          </Typography>
          <Typography
            component="p"
            variant="Reg_14"
            sx={(theme) => ({
              color: theme.vars.palette["Black"],
            })}
          >
            {props.entity.project.name}
          </Typography>
        </Box>

        <Box
          sx={(theme) => ({
            display: "grid",
            padding: "12px",
            borderRadius: "6px",
            backgroundColor: theme.vars.palette["Grey_5"],
            rowGap: "12px",
          })}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              minWidth: "28px",
              paddingLeft: "3px",
              paddingRight: "3px",
              borderRadius: "3px",
            }}
            style={{
              ...(props.entity.progress >= 100 && {
                background: "var(--mui-palette-WhatsApp)",
                color: "var(--mui-palette-White)",
              }),
              ...(props.entity.progress < 100 && {
                background: `linear-gradient(to right, var(--mui-palette-Grey_3) ${props.entity.progress}%, var(--mui-palette-Grey_4) ${props.entity.progress}%)`,
                color: "var(--mui-palette-Grey_2)",
              }),
            }}
          >
            <Typography component="p" variant="Bold_12">
              {props.entity.progress}
            </Typography>
          </Box>
          {props.entity.counters.map((counter, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              style={{
                color: counter.color,
              }}
            >
              <Typography component="p" variant="Reg_14">
                {counter.label}
              </Typography>
              <Typography component="p" variant="Bold_14">
                {counter.count}
              </Typography>
            </Box>
          ))}
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
            {t("locationPlaceholder")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              columnGap: "8px",
              alignItems: "center",
            }}
          >
            <Avatar
              src={`${import.meta.env.VITE_ASSET_PATH}${props.entity.place.logo}`}
              sx={{ width: "30px", height: "30px" }}
            />
            <Typography
              component="p"
              variant="Reg_14"
              sx={(theme) => ({ color: theme.vars.palette["Black"] })}
            >
              {props.entity.place.name}
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
            {t("serviceTypePlaceholder")}
          </Typography>
          <Typography
            component="p"
            variant="Reg_14"
            sx={(theme) => ({
              color: theme.vars.palette["Black"],
            })}
          >
            {props.entity.activity.name}
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
              {t("amountPlaceholder")}
            </Typography>
            <Typography
              component="p"
              variant="Reg_14"
              sx={(theme) => ({ color: theme.vars.palette["Black"] })}
            >
              {props.entity.amount}
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
              {t("unitPricePlaceholder")} {props.entity.units}
            </Typography>
            <Typography
              component="p"
              variant="Reg_14"
              sx={(theme) => ({ color: theme.vars.palette["Corp_1"] })}
            >
              {props.entity.unitPrice}
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
              {t("radiusPlaceholder")}
            </Typography>
            <Typography
              component="p"
              variant="Reg_14"
              sx={(theme) => ({ color: theme.vars.palette["Black"] })}
            >
              {props.entity.radius}
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
              {t("taxStatusPlaceholder")}
            </Typography>
            <Typography
              component="p"
              variant="Reg_14"
              sx={(theme) => ({
                color: theme.vars.palette["Black"],
              })}
            >
              {props.entity.selfEmployed
                ? t("selfEmployed")
                : t("notSelfEmployed")}
            </Typography>
          </Box>
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

                    <Divider sx={{ marginTop: "8px" }} />
                  </Box>
                </S_AccordionDetails>
              </S_Accordion>
            ))}
          </Box>
        ) : null}

        <StyledCheckbox
          name="needPhoto"
          inputType="checkbox"
          label={t("needPhotoPlaceholder")}
          onImmediateChange={() => {}}
          onChange={() => {}}
          validation="none"
          value={props.entity.needFoto}
          disabled
        />

        {props.entity.orderId ? (
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
              {t("parentOrder")}
            </Typography>
            <Link
              to={withLocale(`/orders/${props.entity.orderId}`)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                textDecoration: "none",
              }}
            >
              <Typography
                component="p"
                variant="Reg_14"
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                })}
              >
                {props.entity.orderId}
              </Typography>
              <ArrowBackIosNewIcon
                sx={(theme) => ({
                  width: "18px",
                  height: "18px",
                  color: theme.vars.palette["Corp_1"],
                  transform: "rotate(180deg)",
                })}
              />
            </Link>
          </Box>
        ) : null}

        {props.entity.taskId ? (
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
              {t("parentTask")}
            </Typography>
            <Link
              to={withLocale(`/tasks/${props.entity.taskId}`)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                textDecoration: "none",
              }}
            >
              <Typography
                component="p"
                variant="Reg_14"
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                })}
              >
                {props.entity.taskId}
              </Typography>
              <ArrowBackIosNewIcon
                sx={(theme) => ({
                  width: "18px",
                  height: "18px",
                  color: theme.vars.palette["Corp_1"],
                  transform: "rotate(180deg)",
                })}
              />
            </Link>
          </Box>
        ) : null}

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
            {t("responsible")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              columnGap: "8px",
              alignItems: "center",
            }}
          >
            <Avatar
              src={`${import.meta.env.VITE_ASSET_PATH}${props.entity.responsiblePerson.logo}`}
              sx={{ width: "30px", height: "30px" }}
            />
            <Box>
              {" "}
              <Typography
                component="p"
                variant="Reg_14"
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                })}
              >
                {props.entity.responsiblePerson.email}
              </Typography>
              <Typography
                component="p"
                variant="Reg_12"
                sx={(theme) => ({
                  color: theme.vars.palette["Grey_2"],
                })}
              >
                {t(
                  `role.${determineRole(props.entity.responsiblePerson.roles)}`,
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
