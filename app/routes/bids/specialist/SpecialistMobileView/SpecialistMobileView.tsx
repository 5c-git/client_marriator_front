import { useNavigate } from "react-router";
import { Fragment } from "react";

import { SpecialistMobileViewInterface } from "./SpecialistMobileViewInterface";

import { useTranslation } from "react-i18next";
// import { withLocale } from "~/shared/withLocale";

import { format, getDay } from "date-fns";

import { statusCodeMap } from "~/shared/specialistStatus";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import Box from "@mui/material/Box";
import { Avatar, Divider, Typography, IconButton } from "@mui/material";
import { StyledCheckbox } from "~/shared/ui/StyledCheckbox/StyledCheckbox";

import { PhoneIcon } from "~/shared/icons/PhoneIcon";

export function SpecialistMobileView(
  props: SpecialistMobileViewInterface & {
    dayActionSlot: (
      day: SpecialistMobileViewInterface["entity"]["days"][0],
    ) => React.ReactNode;
    actionsSlot: (
      entity: SpecialistMobileViewInterface["entity"],
    ) => React.ReactNode;
  },
) {
  const navigate = useNavigate();
  const { t } = useTranslation("m_bids_bid_specialists_specialist");
  return (
    <>
      <TopNavigation
        header={{
          text: `${t("job")} ${props.entity.id}`,
          bold: false,
        }}
        backAction={() => {
          // navigate(withLocale(`/bids/${props.entity.id}/specialists`));
          // @ts-expect-error incomplete types in react router
          navigate(-1, {
            viewTransition: true,
          });
        }}
      />

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
          src={props.entity.logo}
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
              src={props.entity.place.logo}
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
            {t("serviceTypeText")}
          </Typography>
          <Typography
            component="p"
            variant="Reg_14"
            sx={(theme) => ({
              color: theme.vars.palette["Black"],
            })}
          >
            {props.entity.activity}
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
              {t("pricePerUnitText")} {props.entity.units}
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
                {format(new Date(props.entity.dateStart), "HH:mm dd.LL.yyyy")}
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
                {format(new Date(props.entity.dateEnd), "HH:mm dd.LL.yyyy")}
              </Typography>
            </Box>
          </Box>

          {props.entity.days.map((day, index) => (
            <Fragment key={index}>
              <Divider />
              <Box
                key={day.timeStart}
                sx={{
                  width: "100%",
                  display: "grid",
                  rowGap: "8px",
                }}
              >
                <Typography
                  component="p"
                  variant="Bold_14"
                  sx={(theme) => ({
                    color: theme.vars.palette["Black"],
                  })}
                >
                  {/* @ts-expect-error translation narrowing */}
                  {`${format(new Date(day.timeStart), "dd.MM")} ${t(`dayMap.${getDay(new Date(day.timeStart))}`)}`}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "14px",
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
                      {t("timeStartText")}
                    </Typography>
                    <Typography
                      component="p"
                      variant="Reg_14"
                      sx={(theme) => ({ color: theme.vars.palette["Black"] })}
                    >
                      {format(new Date(day.timeStart), "HH:mm")}
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
                      {t("timeEndText")}
                    </Typography>
                    <Typography
                      component="p"
                      variant="Reg_14"
                      sx={(theme) => ({ color: theme.vars.palette["Black"] })}
                    >
                      {format(new Date(day.timeEnd), "HH:mm")}
                    </Typography>
                  </Box>
                </Box>

                {day.places.length > 0 ? (
                  <>
                    <Typography
                      component="p"
                      variant="Reg_14"
                      sx={(theme) => ({
                        color: theme.vars.palette["Black"],
                      })}
                    >
                      {t("route")}
                    </Typography>

                    {day.places.map((place) => (
                      <Box
                        key={place.id}
                        sx={{
                          display: "flex",
                          columnGap: "8px",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          src={place.logo}
                          sx={{ width: "30px", height: "30px" }}
                        />
                        <Typography
                          component="p"
                          variant="Reg_14"
                          sx={(theme) => ({
                            color: theme.vars.palette["Black"],
                          })}
                        >
                          {place.text}
                        </Typography>
                      </Box>
                    ))}
                  </>
                ) : null}

                {props.dayActionSlot(day)}
              </Box>
            </Fragment>
          ))}

          <Divider />

          <StyledCheckbox
            inputType="checkbox"
            name="needPhoto"
            label={t("photoCheckbox")}
            value={props.entity.needPhoto}
            onChange={() => {}}
            onImmediateChange={() => {}}
            validation="none"
            disabled
          />
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
            {t("executor")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              columnGap: "8px",
              alignItems: "center",
            }}
          >
            <Avatar
              src={`${import.meta.env.VITE_ASSET_PATH}${props.entity.specialist.logo}`}
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
                {props.entity.specialist.name}
              </Typography>
              <Typography
                component="p"
                variant="Reg_12"
                sx={(theme) => ({
                  color: theme.vars.palette["Grey_2"],
                })}
              >
                {t(`role.${props.entity.specialist.role}`)}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              component="p"
              variant="Reg_12"
              sx={(theme) => ({
                color: theme.vars.palette["Grey_2"],
              })}
            >
              {t("executorPhone")}
            </Typography>
            <Typography
              component="a"
              variant="Reg_14"
              href={`tel:${props.entity.specialist.phone}`}
              sx={(theme) => ({
                color: theme.vars.palette["Black"],
                textDecoration: "none",
              })}
            >
              {props.entity.specialist.phone}
            </Typography>
          </Box>
          <IconButton
            component="a"
            href={`tel:+${props.entity.specialist.phone}`}
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

      {props.actionsSlot(props.entity)}
    </>
  );
}
