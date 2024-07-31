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
  Avatar,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Divider,
} from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

import { ProfileIcon } from "./icons/ProfileIcon";
import { SettingsIcon } from "./icons/SettingsIcon";
import { DocumentsIcon } from "./icons/DocumentsIcon";
import { ExitIcon } from "./icons/ExitIcon";
import { BulletIcon } from "./icons/BulletIcon";

import { queryClient } from "~/root";
import { getAccessToken } from "~/preferences/token/token";
import {
  getUserInfo,
  getUserInfoKeys,
} from "~/requests/getUserInfo/getUserInfo";

export async function clientLoader() {
  const accessToken = await getAccessToken();

  if (accessToken) {
    const data = await queryClient.fetchQuery({
      queryKey: [getUserInfoKeys[0]],
      queryFn: () => getUserInfo(accessToken),
      staleTime: 60000,
    });

    return json(data);
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Profile() {
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
            text: t("Profile.header"),
            bold: false,
          }}
          backAction={() => {
            navigate(-1);
          }}
        />

        <Stack
          sx={{
            paddingTop: "20px",
            alignItems: "center",
            rowGap: "12px",
          }}
        >
          <Avatar
            sx={{
              width: "90px",
              height: "90px",
            }}
            src={data.result.userData.img}
          />

          {data.result.userData.name ? (
            <Typography component="p" variant="Bold_18">
              Саенко Виталий Николаевич
            </Typography>
          ) : null}
        </Stack>

        <List>
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
              to="/"
              sx={{
                padding: "16px 0px",
                columnGap: "12px",
              }}
            >
              <ListItemIcon
                color={theme.palette["Grey_2"]}
                sx={{
                  minWidth: "24px",
                }}
              >
                <ProfileIcon />
              </ListItemIcon>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "12px",
                  color: theme.palette["Black"],
                }}
                component="p"
                variant="Reg_16"
              >
                {t("Profile.profile")}{" "}
                <BulletIcon
                  sx={{
                    width: "6px",
                    height: "6px",
                    color: theme.palette["Red"],
                  }}
                />
              </Typography>
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
              to="/"
              sx={{
                padding: "16px 0px",
                columnGap: "12px",
              }}
            >
              <ListItemIcon
                color={theme.palette["Grey_2"]}
                sx={{
                  minWidth: "24px",
                }}
              >
                <SettingsIcon />
              </ListItemIcon>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "12px",
                  color: theme.palette["Black"],
                }}
                component="p"
                variant="Reg_16"
              >
                {t("Profile.settings")}{" "}
                {/* <BulletIcon
                  sx={{
                    width: "6px",
                    height: "6px",
                    color: theme.palette["Red"],
                  }}
                /> */}
              </Typography>
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
              to="/"
              sx={{
                padding: "16px 0px",
                columnGap: "12px",
              }}
            >
              <ListItemIcon
                color={theme.palette["Grey_2"]}
                sx={{
                  minWidth: "24px",
                }}
              >
                <DocumentsIcon />
              </ListItemIcon>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "12px",
                  color: theme.palette["Black"],
                }}
                component="p"
                variant="Reg_16"
              >
                {t("Profile.documents")}{" "}
                {/* <BulletIcon
                  sx={{
                    width: "6px",
                    height: "6px",
                    color: theme.palette["Red"],
                  }}
                /> */}
              </Typography>
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
              to="/"
              sx={{
                padding: "16px 0px",
                columnGap: "12px",
              }}
            >
              <ListItemIcon
                color={theme.palette["Grey_2"]}
                sx={{
                  minWidth: "24px",
                }}
              >
                <ExitIcon />
              </ListItemIcon>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "12px",
                  color: theme.palette["Black"],
                }}
                component="p"
                variant="Reg_16"
              >
                {t("Profile.exit")}{" "}
                {/* <BulletIcon
                  sx={{
                    width: "6px",
                    height: "6px",
                    color: theme.palette["Red"],
                  }}
                /> */}
              </Typography>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </>
  );
}
