import { useNavigate, useNavigation, Link } from "react-router";
import type { Route } from "./+types/my-profile";

import { useTranslation } from "react-i18next";

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
import { BulletIcon } from "~/shared/icons/BulletIcon";

import { queryClient } from "~/root";
import { useStore } from "~/store/store";

import {
  getUserPersonalMenu,
  getUserPersonalMenuKeys,
} from "~/requests/getUserPersonalMenu/getUserPersonalMenu";
import { withLocale } from "~/shared/withLocale";

export async function clientLoader() {
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const data = await queryClient.fetchQuery({
      queryKey: [getUserPersonalMenuKeys[0]],
      queryFn: () => getUserPersonalMenu(accessToken),
      staleTime: 60000,
    });

    return data;
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function MyProfile({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("myProfile");
  const theme = useTheme();
  const navigate = useNavigate();
  const navigation = useNavigation();

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
            navigate(withLocale("/profile"));
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
              to={`${withLocale("/profile/my-profile/profile-meta")}`}
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
                {t("listItem_base")}
              </Typography>

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
              to={`${withLocale("/profile/my-profile/user-activities?step=1")}`}
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
                {t("user_activities")}
              </Typography>

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
              to={`${withLocale("/profile/my-profile/billing")}`}
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
                {t("billing")}
              </Typography>

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
              to={`${withLocale("/profile/my-profile/work-radius")}`}
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
                {t("work-radius")}
              </Typography>

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
          {loaderData.result.section.map((item) => (
            <ListItem
              key={item.name}
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
                to={{
                  pathname: `${withLocale("/profile/my-profile/profile-edit")}`,
                  search: `?section=${item.value}`,
                }}
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
                  {item.name}{" "}
                </Typography>

                {item.notification ? (
                  <BulletIcon
                    sx={{
                      width: "6px",
                      height: "6px",
                      color: theme.palette["Red"],
                    }}
                  />
                ) : null}

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
          ))}
        </List>

        {loaderData.result.section.find(
          (item) => item.notification === true
        ) ? (
          <Box
            sx={{
              display: "flex",
              columnGap: "10px",
              paddingTop: "10px",
              paddingRight: "16px",
              paddingLeft: "16px",
              alignItems: "center",
            }}
          >
            <BulletIcon
              sx={{
                width: "6px",
                height: "6px",
                color: theme.palette["Red"],
              }}
            />
            <Typography
              component="p"
              variant="Reg_12"
              sx={{
                color: theme.palette["Grey_2"],
              }}
            >
              {t("red-dot_text")}
            </Typography>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
