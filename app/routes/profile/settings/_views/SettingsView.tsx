import { useTranslation } from "react-i18next";
import { Fragment } from "react";

import {
    List,
    ListItem,
    Divider,
  } from "@mui/material";
  import Box from "@mui/material/Box";
  import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";


type SettingsViewInterface = {
    translation: "settings";
    headerBackAction: () => void;
    options: React.ReactNode[];
  };


export function SettingsView(props: SettingsViewInterface) {
    const { t } = useTranslation("SettingsView");

    return (
        <Box>
        <TopNavigation
          header={{
            text: t(`${props.translation}.header`),
            bold: false,
          }}
          backAction={props.headerBackAction}
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
            {props.options.map((option, index) => (
              <Fragment key={index}>
                {option}
              </Fragment>
            ))}
            <Divider
              sx={(theme) => ({
                backgroundColor: theme.vars.palette["Grey_4"],
              })}
            />
          </ListItem>
        </List>
      </Box>
    );
}