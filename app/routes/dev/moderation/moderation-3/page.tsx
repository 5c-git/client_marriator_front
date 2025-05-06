import { useNavigation } from "react-router";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { Box, Typography } from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import { Loader } from "~/shared/ui/Loader/Loader";

export default function Moderation3() {
  // const { t } = useTranslation("devModeration1");
  const navigation = useNavigation();

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}
      <p>moderation-3</p>
    </>
  );
}
