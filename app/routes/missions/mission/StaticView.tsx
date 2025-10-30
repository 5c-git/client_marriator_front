import type { PageInterface } from "./PageInterface";
import { useTranslation } from "react-i18next";
import { Fragment } from "react";

import { format, getDay } from "date-fns";

import Box from "@mui/material/Box";
import { Avatar, Divider, IconButton, Typography } from "@mui/material";
import { StyledCheckbox } from "~/shared/ui/StyledCheckbox/StyledCheckbox";

import { PhoneIcon } from "~/shared/icons/PhoneIcon";

import { statusCodeMap } from "~/shared/specialistStatus";

export function StaticView({
  data,
  actions,
}: {
  data: PageInterface;

  actions: ((
    day: PageInterface["days"][0],
    action: PageInterface["days"][0]["action"]
  ) => React.ReactNode)[];
}) {
  const { t } = useTranslation("mission");

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
        src={data.logo}
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
                statusCodeMap[data.status as keyof typeof statusCodeMap].color,
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
                statusCodeMap[data.status as keyof typeof statusCodeMap].value
              }`
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
            src={data.place.logo}
            sx={{ width: "30px", height: "30px" }}
          />
          <Typography
            component="p"
            variant="Reg_14"
            sx={(theme) => ({ color: theme.vars.palette["Black"] })}
          >
            {data.place.name}
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
          {data.activity}
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
            {data.unitPrice}
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
              {format(new Date(data.dateStart), "HH:mm dd.LL.yyyy")}
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
              {format(new Date(data.dateEnd), "HH:mm dd.LL.yyyy")}
            </Typography>
          </Box>
        </Box>

        {data.days.map((day, index) => (
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
                {/* @ts-ignore */}
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
                    {/* {format(new UTCDate(day.timeStart), "HH:mm")} */}
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
                    {/* {format(new UTCDate(day.timeEnd), "HH:mm")} */}
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
                        sx={(theme) => ({ color: theme.vars.palette["Black"] })}
                      >
                        {place.text}
                      </Typography>
                    </Box>
                  ))}
                </>
              ) : null}
              {actions.map((action) => action(day, day.action))}
            </Box>
          </Fragment>
        ))}

        <Divider />

        <StyledCheckbox
          inputType="checkbox"
          name="needPhoto"
          label={t("photoCheckbox")}
          value={data.needPhoto}
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
            <Avatar src={data.logo} sx={{ width: "30px", height: "30px" }} />
            <Box>
              <Typography
                component="p"
                variant="Reg_14"
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                })}
              >
                {data.user.name}
              </Typography>
              <Typography
                component="p"
                variant="Reg_12"
                sx={(theme) => ({
                  color: theme.vars.palette["Grey_2"],
                })}
              >
                {/* @ts-ignore */}
                {t(`role.${data.user.role}`)}
              </Typography>
            </Box>
          </Box>
          <IconButton
            component="a"
            href={`tel:+${data.user.phone}`}
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
