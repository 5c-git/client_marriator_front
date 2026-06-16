import { Link } from "react-router";
import { useTranslation } from "react-i18next";

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

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import { withLocale } from "~/shared/withLocale";

type Props = {
  sections: {
    path: string;
    label: string;
  }[];
  backAction: () => void;
};

export function DocumentsView(props: Props) {
  const { t } = useTranslation("m_profile_documents");

  return (
    <Box>
      <TopNavigation
        header={{
          text: t(`header`),
          bold: false,
        }}
        backAction={props.backAction}
      />

      <List
        sx={{
          paddingTop: "20px",
          alignItems: "center",
          rowGap: "12px",
        }}
      >
        {props.sections.map((section) => (
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
              to={section.path}
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
                {section.label}
              </Typography>

              <ListItemIcon
                sx={{
                  minWidth: "unset",
                  marginLeft: "auto",
                }}
              >
                <ArrowForwardIosIcon htmlColor={"var(--mui-palette-Grey_2)"} />
              </ListItemIcon>
            </ListItemButton>
            <Divider
              sx={(theme) => ({
                backgroundColor: theme.vars.palette["Grey_4"],
              })}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
