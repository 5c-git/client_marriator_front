import {
  json,
  useLoaderData,
  useNavigate,
  useNavigation,
  // Link,
  ClientActionFunctionArgs,
} from "@remix-run/react";

// import { t } from "i18next";

import {
  // useTheme,
  Box,
  // Typography,
  // List,
  // ListItem,
  // ListItemButton,
  // ListItemIcon,
  // Divider,
} from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";

import { queryClient } from "~/root";
import { getAccessToken } from "~/preferences/token/token";

import {
  getUserFields,
  getUserFieldsKeys,
} from "~/requests/getUserFields/getUserFields";

export async function clientLoader({ request }: ClientActionFunctionArgs) {
  const currentURL = new URL(request.url);

  const accessToken = await getAccessToken();

  const section = currentURL.searchParams.get("section");

  if (accessToken && section) {
    const data = await queryClient.fetchQuery({
      queryKey: [getUserFieldsKeys[0]],
      queryFn: () => getUserFields(accessToken, section),
      staleTime: 60000,
    });

    return json(data);
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function ProfileEdit() {
  // const theme = useTheme();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const data = useLoaderData<typeof clientLoader>();

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box>
        <TopNavigation
          header={{
            text: "Страница редактирования",
            bold: false,
          }}
          backAction={() => {
            navigate(-1);
          }}
        />
      </Box>
    </>
  );
}
