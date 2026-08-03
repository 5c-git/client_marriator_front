import type { EntityMobileViewInterface } from "./EntityMobileViewInterface";

import { useTranslation } from "react-i18next";
import { statusCodeMap } from "~/shared/status";

import Box from "@mui/material/Box";
import { Avatar, Typography } from "@mui/material";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

export function EntityEditMobileView(props: EntityMobileViewInterface) {
  const { t } = useTranslation("EntityMobileView");

  return (
    <>
      <TopNavigation
        header={{
          text: `${t(`${props.translation}.header`)} ${props.entity.id}`,
          bold: false,
        }}
        backAction={props.headerBackAction}
      />

      <Box
        sx={{
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          rowGap: "14px",
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingTop: "20px",
          paddingBottom: "20px",
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

        {props.entity.creatingPerson ? (
          <>
            <Box>
              <Typography
                component="p"
                variant="Reg_12"
                sx={(theme) => ({
                  color: theme.vars.palette["Grey_2"],
                })}
              >
                {t(
                  `${props.translation}.role.${props.entity.creatingPerson.role}`,
                )}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  columnGap: "8px",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={`${import.meta.env.VITE_ASSET_PATH}${props.entity.creatingPerson.logo}`}
                  sx={{ width: "30px", height: "30px" }}
                />
                <Typography
                  component="p"
                  variant="Reg_14"
                  sx={(theme) => ({ color: theme.vars.palette["Black"] })}
                >
                  {props.entity.creatingPerson.email}
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
                {t(`${props.translation}.phonePlaceholder`)}
              </Typography>
              <Typography
                component="a"
                variant="Reg_14"
                href={`tel:${props.entity.creatingPerson.phone}`}
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                  textDecoration: "none",
                })}
              >
                {props.entity.creatingPerson.phone}
              </Typography>
            </Box>
          </>
        ) : null}
        {props.entity.acceptingPerson ? (
          <>
            <Box>
              <Typography
                component="p"
                variant="Reg_12"
                sx={(theme) => ({
                  color: theme.vars.palette["Grey_2"],
                })}
              >
                {t(
                  `${props.translation}.role.${props.entity.acceptingPerson.role}`,
                )}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  columnGap: "8px",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={`${import.meta.env.VITE_ASSET_PATH}${props.entity.acceptingPerson.logo}`}
                  sx={{ width: "30px", height: "30px" }}
                />
                <Typography
                  component="p"
                  variant="Reg_14"
                  sx={(theme) => ({ color: theme.vars.palette["Black"] })}
                >
                  {props.entity.acceptingPerson.email}
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
                {t(`${props.translation}.phonePlaceholder`)}
              </Typography>
              <Typography
                component="a"
                variant="Reg_14"
                href={`tel:${props.entity.acceptingPerson.phone}`}
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                  textDecoration: "none",
                })}
              >
                {props.entity.acceptingPerson.phone}
              </Typography>
            </Box>
          </>
        ) : null}

        {props.entity.services.length > 0 ? (
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
              {t(`${props.translation}.services`)}
            </Typography>

            {props.entity.services.map((service) => props.serviceSlot(service))}
          </Box>
        ) : null}

        {props.entity.invitedPersons.length > 0 ? (
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
              {t(`${props.translation}.invitedPersons`)}
            </Typography>
            {props.entity.invitedPersons.map((person) => (
              <Box
                key={person.id}
                sx={{
                  display: "flex",
                  columnGap: "4px",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={`${import.meta.env.VITE_ASSET_PATH}${person.logo}`}
                  sx={{ width: "30px", height: "30px" }}
                />
                <Typography
                  component="p"
                  variant="Reg_14"
                  sx={(theme) => ({
                    color: theme.vars.palette["Black"],
                  })}
                >
                  {person.id}
                </Typography>
                <Typography
                  component="p"
                  variant="Reg_14"
                  sx={(theme) => ({
                    color: theme.vars.palette["Black"],
                  })}
                >
                  {person.name}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : null}

        {props.actionSlot()}
      </Box>
    </>
  );
}
