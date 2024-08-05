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

// import { queryClient } from "~/root";
import { getAccessToken } from "~/preferences/token/token";

export async function clientLoader() {
  const accessToken = await getAccessToken();

  if (accessToken) {
    // const data = await queryClient.fetchQuery({
    //   queryKey: [getUserInfoKeys[0]],
    //   queryFn: () => getUserInfo(accessToken),
    //   staleTime: 60000,
    // });

    const data = { data: "data" };

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
              to="/"
              sx={{
                display: "flex",
                // justifyContent: "space-between",
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
                Документы иностранного гражданина{" "}
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
