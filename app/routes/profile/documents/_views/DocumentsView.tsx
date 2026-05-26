import { Link } from "react-router";

import { useTranslation } from "react-i18next";

import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
} from "@mui/material";
import Box from "@mui/material/Box";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

import { withLocale } from "~/shared/withLocale";

type Props = {
  isLoading: boolean;
  backAction: () => void;
};

export function DocumentsView({ isLoading, backAction }: Props) {
  const { t } = useTranslation("documents");

  return (
    <>
      {isLoading ? <Loader /> : null}

      <Box>
        <TopNavigation
          header={{
            text: t("header"),
            bold: false,
          }}
          backAction={backAction}
        />

        <List
          sx={{
            paddingTop: "20px",
            alignItems: "center",
            rowGap: "12px",
          }}
        >
          <ListItem
            disableGutters
            disablePadding
            sx={{
              display: "block",
              paddingRight: "16px",
              paddingLeft: "16px",
            }}
          >
            <ListItemButton
              component={Link}
              viewTransition
              to={`${withLocale("/profile/documents/sign")}`}
              sx={{
                display: "flex",
                padding: "16px 0px",
                columnGap: "12px",
              }}
            >
              <Typography
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                })}
                component="p"
                variant="Reg_16"
              >
                {t("item_sign")}
              </Typography>

              <ListItemIcon
                sx={{
                  minWidth: "unset",
                  marginLeft: "auto",
                }}
              >
                <ArrowForwardIosIcon htmlColor={"var(--mui-palette-Grey_2)"} />
              </ListItemIcon>
            </ListItemButton>
            <Divider
              sx={(theme) => ({
                backgroundColor: theme.vars.palette["Grey_4"],
              })}
            />
          </ListItem>

          <ListItem
            disableGutters
            disablePadding
            sx={{
              display: "block",
              paddingRight: "16px",
              paddingLeft: "16px",
            }}
          >
            <ListItemButton
              component={Link}
              viewTransition
              to={`${withLocale("/profile/documents/sign-a-deal")}`}
              sx={{
                display: "flex",
                padding: "16px 0px",
                columnGap: "12px",
              }}
            >
              <Typography
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                })}
                component="p"
                variant="Reg_16"
              >
                {t("item_deal")}
              </Typography>

              <ListItemIcon
                sx={{
                  minWidth: "unset",
                  marginLeft: "auto",
                }}
              >
                <ArrowForwardIosIcon htmlColor={"var(--mui-palette-Grey_2)"} />
              </ListItemIcon>
            </ListItemButton>
            <Divider
              sx={(theme) => ({
                backgroundColor: theme.vars.palette["Grey_4"],
              })}
            />
          </ListItem>

          <ListItem
            disableGutters
            disablePadding
            sx={{
              display: "block",
              paddingRight: "16px",
              paddingLeft: "16px",
            }}
          >
            <ListItemButton
              component={Link}
              viewTransition
              to={`${withLocale("/profile/documents/terminate-a-deal")}`}
              sx={{
                display: "flex",
                padding: "16px 0px",
                columnGap: "12px",
              }}
            >
              <Typography
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                })}
                component="p"
                variant="Reg_16"
              >
                {t("item_break")}
              </Typography>

              <ListItemIcon
                sx={{
                  minWidth: "unset",
                  marginLeft: "auto",
                }}
              >
                <ArrowForwardIosIcon htmlColor={"var(--mui-palette-Grey_2)"} />
              </ListItemIcon>
            </ListItemButton>
            <Divider
              sx={(theme) => ({
                backgroundColor: theme.vars.palette["Grey_4"],
              })}
            />
          </ListItem>

          <ListItem
            disableGutters
            disablePadding
            sx={{
              display: "block",
              paddingRight: "16px",
              paddingLeft: "16px",
            }}
          >
            <ListItemButton
              component={Link}
              viewTransition
              to={`${withLocale("/profile/documents/archive")}`}
              sx={{
                display: "flex",
                padding: "16px 0px",
                columnGap: "12px",
              }}
            >
              <Typography
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                })}
                component="p"
                variant="Reg_16"
              >
                {t("item_archive")}
              </Typography>

              <ListItemIcon
                sx={{
                  minWidth: "unset",
                  marginLeft: "auto",
                }}
              >
                <ArrowForwardIosIcon htmlColor={"var(--mui-palette-Grey_2)"} />
              </ListItemIcon>
            </ListItemButton>
            <Divider
              sx={(theme) => ({
                backgroundColor: theme.vars.palette["Grey_4"],
              })}
            />
          </ListItem>

          <ListItem
            disableGutters
            disablePadding
            sx={{
              display: "block",
              paddingRight: "16px",
              paddingLeft: "16px",
            }}
          >
            <ListItemButton
              component={Link}
              viewTransition
              to={`${withLocale("/profile/documents/certificates")}`}
              sx={{
                display: "flex",
                padding: "16px 0px",
                columnGap: "12px",
              }}
            >
              <Typography
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                })}
                component="p"
                variant="Reg_16"
              >
                {t("item_certificates")}
              </Typography>

              <ListItemIcon
                sx={{
                  minWidth: "unset",
                  marginLeft: "auto",
                }}
              >
                <ArrowForwardIosIcon htmlColor={"var(--mui-palette-Grey_2)"} />
              </ListItemIcon>
            </ListItemButton>
            <Divider
              sx={(theme) => ({
                backgroundColor: theme.vars.palette["Grey_4"],
              })}
            />
          </ListItem>
        </List>
      </Box>
    </>
  );
}

