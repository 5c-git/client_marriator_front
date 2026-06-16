import { useTranslation } from "react-i18next";

import { Typography, List } from "@mui/material";
import Box from "@mui/material/Box";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { MyProfileLinkItem } from "../_components/MyProfileLinkItem";
import { BulletIcon } from "~/shared/icons/BulletIcon";

import type { MyProfileData } from "../my-profile.mapper";

type MyProfileViewProps = {
  data: MyProfileData;
  onBack: () => void;
};

export function MyProfileView(props: MyProfileViewProps) {
  const { t } = useTranslation("m_profile_myProfile");

  return (
    <Box>
      <TopNavigation
        header={{
          text: t(`header`),
          bold: false,
        }}
        backAction={props.onBack}
      />

      <List
        sx={{
          paddingTop: "20px",
          alignItems: "center",
          rowGap: "12px",
        }}
      >
        {props.data.sections.map((section) => (
          <MyProfileLinkItem
            key={section.value}
            label={section.name}
            to={section.value}
            showBullet={section.hasNotification}
          />
        ))}
      </List>

      {props.data.hasSectionsWithNotifications ? (
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
            sx={(theme) => ({
              width: "6px",
              height: "6px",
              color: theme.vars.palette["Red"],
            })}
          />
          <Typography
            component="p"
            variant="Reg_12"
            sx={(theme) => ({
              color: theme.vars.palette["Grey_2"],
            })}
          >
            {t(`red-dot_text`)}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
}
