import { useTranslation } from "react-i18next";
import { Link } from "react-router";

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

import { withLocale } from "~/shared/withLocale";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { BulletIcon } from "~/shared/icons/BulletIcon";

import type { MyProfileLoaderData } from "../my-profile.service";

type MyProfileViewProps = {
  translation: "myProfile";
  loaderData: MyProfileLoaderData;
  onBack: () => void;
};

type MyProfileLinkItemProps = {
  label: string;
  to: string | { pathname: string; search?: string };
  showBullet?: boolean;
};

function MyProfileLinkItem({ label, to, showBullet }: MyProfileLinkItemProps) {
  return (
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
        to={to}
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
          {label}{" "}
        </Typography>

        {showBullet ? (
          <BulletIcon
            sx={(theme) => ({
              width: "6px",
              height: "6px",
              color: theme.vars.palette["Red"],
            })}
          />
        ) : null}

        <ListItemIcon
          sx={{
            minWidth: "unset",
            marginLeft: "auto",
          }}
        >
          <ArrowForwardIosIcon
            sx={(theme) => ({
              color: theme.vars.palette["Grey_2"],
            })}
          />
        </ListItemIcon>
      </ListItemButton>
      <Divider
        sx={(theme) => ({
          backgroundColor: theme.vars.palette["Grey_4"],
        })}
      />
    </ListItem>
  );
}

export function MyProfileView(props: MyProfileViewProps) {
  const { t } = useTranslation("MyProfileView");
  const { loaderData } = props;

  return (
    <Box>
      <TopNavigation
        header={{
          text: t(`${props.translation}.header`),
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
        <MyProfileLinkItem
          label={t(`${props.translation}.listItem_base`)}
          to={withLocale("/profile/my-profile/profile-meta")}
        />
        <MyProfileLinkItem
          label={t(`${props.translation}.user_activities`)}
          to={withLocale("/profile/my-profile/user-activities?step=1")}
        />
        <MyProfileLinkItem
          label={t(`${props.translation}.billing`)}
          to={withLocale("/profile/my-profile/billing")}
        />
        <MyProfileLinkItem
          label={t(`${props.translation}.work-radius`)}
          to={withLocale("/profile/my-profile/work-radius")}
        />

        {loaderData.sections.map((section) => (
          <MyProfileLinkItem
            key={section.value}
            label={section.name}
            to={{
              pathname: withLocale("/profile/my-profile/profile-edit"),
              search: `?section=${section.value}`,
            }}
            showBullet={section.hasNotification}
          />
        ))}
      </List>

      {loaderData.hasSectionsWithNotifications ? (
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
            {t(`${props.translation}.red-dot_text`)}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
}
