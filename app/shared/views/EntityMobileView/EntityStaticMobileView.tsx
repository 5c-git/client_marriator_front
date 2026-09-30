import type { EntityMobileViewInterface } from "./EntityMobileViewInterface";

import { useTranslation } from "react-i18next";

import { statusCodeMap } from "~/shared/status";

import Box from "@mui/material/Box";
import { Avatar, Typography, IconButton } from "@mui/material";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import { EditIcon } from "~/shared/icons/EditIcon";
import { PhoneIcon } from "~/shared/icons/PhoneIcon";

export function EntityStaticMobileView(props: EntityMobileViewInterface) {
  const { t } = useTranslation("EntityMobileView");

  return (
    <Box
      sx={(theme) => ({
        position: "relative",
        backgroundColor: theme.vars.palette["White"],
        flexGrow: 1,
      })}
    >
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
        {props.entity.project ? (
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
              {t(`${props.translation}.projectPlaceholder`)}
            </Typography>
            <Typography
              component="p"
              variant="Reg_14"
              sx={(theme) => ({ color: theme.vars.palette["Black"] })}
            >
              {props.entity.project.name}
            </Typography>
          </Box>
        ) : null}
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
                {t(`${props.translation}.creatingPerson`)} {` - `}
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
                  {props.entity.creatingPerson.name}
                </Typography>
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
              <IconButton
                component="a"
                href={`tel:+${props.entity.creatingPerson.phone}`}
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
                {t(`${props.translation}.acceptingPerson`)} {` - `}
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
                  {props.entity.acceptingPerson.name}
                </Typography>
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
              <IconButton
                component="a"
                href={`tel:+${props.entity.acceptingPerson.phone}`}
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
          </>
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

        {props.actionSlot()}
      </Box>
    </Box>
  );
}
