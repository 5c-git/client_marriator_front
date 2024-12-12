import { useNavigation, useNavigate, Link } from "react-router";

import { useTranslation } from "react-i18next";

import { withLocale } from "~/shared/withLocale";

import {
  useTheme,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import { Loader } from "~/shared/ui/Loader/Loader";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import { BulletIcon } from "~/shared/icons/BulletIcon";

export default function Documents() {
  const { t } = useTranslation("documents");
  const theme = useTheme();
  const navigation = useNavigation();
  const navigate = useNavigate();

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box>
        <TopNavigation
          header={{
            text: t("header"),
            bold: false,
          }}
          backAction={() => {
            navigate(withLocale("/profile"), { viewTransition: true });
          }}
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
                sx={{
                  color: theme.palette["Black"],
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                component="p"
                variant="Reg_16"
              >
                {t("item_sign")}
              </Typography>

              {/* <BulletIcon
                sx={{
                  width: "6px",
                  height: "6px",
                  color: theme.palette["Red"],
                }}
              /> */}

              <ListItemIcon
                sx={{
                  minWidth: "unset",
                  marginLeft: "auto",
                }}
              >
                <ArrowForwardIosIcon htmlColor={theme.palette["Grey_2"]} />
              </ListItemIcon>
            </ListItemButton>
            <Divider
              sx={{
                backgroundColor: theme.palette["Grey_4"],
              }}
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
                sx={{
                  color: theme.palette["Black"],
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                component="p"
                variant="Reg_16"
              >
                {t("item_deal")}
              </Typography>

              {/* <BulletIcon
                sx={{
                  width: "6px",
                  height: "6px",
                  color: theme.palette["Red"],
                }}
              /> */}

              <ListItemIcon
                sx={{
                  minWidth: "unset",
                  marginLeft: "auto",
                }}
              >
                <ArrowForwardIosIcon htmlColor={theme.palette["Grey_2"]} />
              </ListItemIcon>
            </ListItemButton>
            <Divider
              sx={{
                backgroundColor: theme.palette["Grey_4"],
              }}
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
                sx={{
                  color: theme.palette["Black"],
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                component="p"
                variant="Reg_16"
              >
                {t("item_break")}
              </Typography>

              {/* <BulletIcon
                sx={{
                  width: "6px",
                  height: "6px",
                  color: theme.palette["Red"],
                }}
              /> */}

              <ListItemIcon
                sx={{
                  minWidth: "unset",
                  marginLeft: "auto",
                }}
              >
                <ArrowForwardIosIcon htmlColor={theme.palette["Grey_2"]} />
              </ListItemIcon>
            </ListItemButton>
            <Divider
              sx={{
                backgroundColor: theme.palette["Grey_4"],
              }}
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
                sx={{
                  color: theme.palette["Black"],
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                component="p"
                variant="Reg_16"
              >
                {t("item_archive")}
              </Typography>

              {/* <BulletIcon
                sx={{
                  width: "6px",
                  height: "6px",
                  color: theme.palette["Red"],
                }}
              /> */}

              <ListItemIcon
                sx={{
                  minWidth: "unset",
                  marginLeft: "auto",
                }}
              >
                <ArrowForwardIosIcon htmlColor={theme.palette["Grey_2"]} />
              </ListItemIcon>
            </ListItemButton>
            <Divider
              sx={{
                backgroundColor: theme.palette["Grey_4"],
              }}
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
                sx={{
                  color: theme.palette["Black"],
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                component="p"
                variant="Reg_16"
              >
                {t("item_certificates")}
              </Typography>

              {/* <BulletIcon
                sx={{
                  width: "6px",
                  height: "6px",
                  color: theme.palette["Red"],
                }}
              /> */}

              <ListItemIcon
                sx={{
                  minWidth: "unset",
                  marginLeft: "auto",
                }}
              >
                <ArrowForwardIosIcon htmlColor={theme.palette["Grey_2"]} />
              </ListItemIcon>
            </ListItemButton>
            <Divider
              sx={{
                backgroundColor: theme.palette["Grey_4"],
              }}
            />
          </ListItem>
        </List>
      </Box>
    </>
  );
}
