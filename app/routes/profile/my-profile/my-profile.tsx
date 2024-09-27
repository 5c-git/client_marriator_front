import {
  json,
  useLoaderData,
  useNavigate,
  useNavigation,
  Link,
} from "@remix-run/react";

import { t } from "i18next";

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
import { getAccessToken } from "~/preferences/token/token";

import {
  getUserPersonalMenu,
  getUserPersonalMenuKeys,
} from "~/requests/getUserPersonalMenu/getUserPersonalMenu";
import { withLocale } from "~/shared/withLocale";

export async function clientLoader() {
  const accessToken = await getAccessToken();

  if (accessToken) {
    const data = await queryClient.fetchQuery({
      queryKey: [getUserPersonalMenuKeys[0]],
      queryFn: () => getUserPersonalMenu(accessToken),
      staleTime: 60000,
    });

    return json(data);
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function MyProfile() {
  const theme = useTheme();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const data = useLoaderData<typeof clientLoader>();

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box>
        <TopNavigation
          header={{
            text: t("MyProfile.header"),
            bold: false,
          }}
          backAction={() => {
            navigate(-1);
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
              to={`${withLocale("/profile/profile-meta")}`}
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
                {t("MyProfile.listItem_base")}
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
              to={`${withLocale("/profile/user-activities?step=1")}`}
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
                {t("MyProfile.user_activities")}
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
              to={`${withLocale("/profile/billing")}`}
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
                {t("MyProfile.billing")}
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
              to={`${withLocale("/profile/work-radius")}`}
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
                {t("MyProfile.work-radius")}
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
          {data.result.section.map((item) => (
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
                  pathname: `${withLocale("/profile/profile-edit")}`,
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
      </Box>
    </>
  );
}
