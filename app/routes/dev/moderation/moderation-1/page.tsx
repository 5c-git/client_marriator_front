import { useNavigation } from "react-router";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { Box, Stack, Typography, Avatar } from "@mui/material";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import { StyledSearchBar } from "~/shared/ui/StyledSearchBar/StyledSearchBar";
import { StyledDropdown } from "~/shared/ui/StyledDropdown/StyledDropdown";

import { Loader } from "~/shared/ui/Loader/Loader";

export default function Moderation1() {
  // const { t } = useTranslation("devModeration1");
  const navigation = useNavigation();

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box
        sx={{
          display: "grid",
          paddingTop: "20px",
          paddingLeft: "16px",
          paddingRight: "16px",
          rowGap: "14px",
        }}
      >
        <StyledSearchBar
          name="name"
          value=""
          placeholder="Поиск"
          onChange={() => {}}
        />

        <StyledDropdown
          name="name"
          value="new"
          placeholder="placeholder"
          onChange={() => {}}
          options={[
            {
              value: "new",
              label: "Сначала новые",
              disabled: false,
            },
            {
              value: "old",
              label: "Сначала старые",
              disabled: false,
            },
            {
              value: "all",
              label: "Все",
              disabled: false,
            },
          ]}
        />

        <Stack
          sx={{
            rowGap: "14px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              columnGap: "12px",
              alignItems: "center",
            }}
          >
            <Avatar
              src="https://mui.com/static/images/avatar/1.jpg"
              sx={{ width: "30px", height: "30px" }}
            />

            <Box>
              <Typography
                component="p"
                variant="Reg_14"
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                })}
              >
                Михельсон Конрад Карлович
              </Typography>
              <Typography
                component="p"
                variant="Reg_12"
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                })}
              >
                ООО Ромашка
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
