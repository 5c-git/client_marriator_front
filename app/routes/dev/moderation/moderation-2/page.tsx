import { useNavigation } from "react-router";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import { Loader } from "~/shared/ui/Loader/Loader";

export default function Moderation2() {
  // const { t } = useTranslation("devModeration1");
  const navigation = useNavigation();

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}
      <p>moderation-2</p>
    </>
  );
}
