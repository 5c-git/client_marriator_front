import type { EntityMobileViewInterface } from "./EntityMobileViewInterface";

import { useTranslation } from "react-i18next";

import { statusCodeMap } from "~/shared/status";

import Box from "@mui/material/Box";
import { Avatar, Typography } from "@mui/material";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import { EditIcon } from "~/shared/icons/EditIcon";

export function EntityStaticMobileView(props: EntityMobileViewInterface) {
  const { t } = useTranslation("EntityMobileView");

  return (
    <>
      <TopNavigation
        header={{
          text: `${t(`${props.translation}.header`)} ${props.entity.id}`,
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
          src={`${import.meta.env.VITE_ASSET_PATH}${props.entity.place.logo}`}
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
            {t(`${props.translation}.statusPlaceholder`)}
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
                `${props.translation}.status.${
                  statusCodeMap[
                    props.entity.status as keyof typeof statusCodeMap
                  ].value
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
            {t(`${props.translation}.locationPlaceholder`)}
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
        {props.entity.responsiblePerson ? (
          <>
            <Box>
              <Typography
                component="p"
                variant="Reg_12"
                sx={(theme) => ({
                  color: theme.vars.palette["Grey_2"],
                })}
              >
                {t(`${props.translation}.responsiblePlaceholder`)}
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
                <Typography
                  component="p"
                  variant="Reg_14"
                  sx={(theme) => ({ color: theme.vars.palette["Black"] })}
                >
                  {props.entity.responsiblePerson.email}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography
                component="p"
                variant="Reg_12"
                sx={(theme) => ({
                  color: theme.vars.palette["Grey_2"],
                })}
              >
                {t(`${props.translation}.responsiblePhonePlaceholder`)}
              </Typography>
              <Typography
                component="a"
                variant="Reg_14"
                href={`tel:${props.entity.responsiblePerson.phone}`}
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                  textDecoration: "none",
                })}
              >
                {props.entity.responsiblePerson.phone}
              </Typography>
            </Box>
          </>
        ) : null}

        {props.entity.activities.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              rowGap: "14px",
            }}
          >
            <Typography
              component="p"
              variant="Bold_14"
              sx={(theme) => ({
                color: theme.vars.palette["Black"],
              })}
            >
              {t(`${props.translation}.activities`)}
            </Typography>

            {props.entity.activities.map((activity) =>
              props.activitySlot(activity)
            )}
          </Box>
        ) : null}

        {props.actionSlot()}
      </Box>
    </>
  );
}
