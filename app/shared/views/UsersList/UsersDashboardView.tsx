import { Outlet } from "react-router";
import { useState } from "react";

import { useTranslation } from "react-i18next";

import { UsersMobileViewInterface } from "./UsersMobileViewInterface";

import { statusCodeMap } from "../../usersStatusCodeMap";

import Box from "@mui/material/Box";
import {
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { StyledSelect } from "~/shared/ui/StyledSelect/StyledSelect";
import { StyledSearchBar } from "~/shared/ui/StyledSearchBar/StyledSearchBar";

import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";

import { useUsers } from "./Users.hooks";

export function UsersDashboardView(
  props: UsersMobileViewInterface & {
    view: "list" | "table" | "map";
    setView: (view: "list" | "table" | "map") => void;
  },
) {
  const { t } = useTranslation("m_shared_usersView");

  const usersHooks = useUsers(props.users);

  const [openFilters, setOpenFilters] = useState<boolean>(false);

  return (
    <>
      {props.users.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexGrow: 1,
            minHeight: "0px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              height: "100%",
              overflowY: "hidden",
              scrollbarWidth: "none",
              maxWidth: "420px",
            }}
          >
            <Box
              sx={{
                position: "relative",
                zIndex: "1",
                display: "grid",
                rowGap: "16px",
                padding: "20px 16px 16px 20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  columnGap: "5px",
                  width: "100%",
                }}
              >
                {usersHooks.filter !== -1 ? (
                  <StyledSelect
                    inputType="select"
                    name="status"
                    placeholder={t(`${props.translation}.statusPlaceholder`)}
                    onImmediateChange={() => {}}
                    value={usersHooks.filter.toString()}
                    onChange={(evt) => {
                      usersHooks.setFilter(Number(evt.target.value));
                    }}
                    options={(() => {
                      const options: {
                        value: string;
                        label: string;
                        disabled: boolean;
                      }[] = [];

                      for (const key in usersHooks.users.filteredUsers) {
                        options.push({
                          value: key,
                          label: `${t(
                            `${props.translation}.status.${statusCodeMap[Number(key) as keyof typeof statusCodeMap].value}`,
                          )}(${usersHooks.users.filteredUsers[usersHooks.filter].length})`,
                          disabled: false,
                        });
                      }

                      return options;
                    })()}
                    style={{ width: "100%" }}
                  />
                ) : null}

                <Button
                  variant="outlined"
                  sx={{
                    minWidth: "60px",
                    width: "60px",
                    height: "60px",
                  }}
                  onClick={() => {
                    setOpenFilters((prev) => !prev);
                  }}
                >
                  {openFilters ? <FilterListOffIcon /> : <FilterListIcon />}
                </Button>
              </Box>

              <Accordion
                expanded={openFilters}
                sx={{
                  boxShadow: "none",

                  "&:before": { display: "none" },
                  "&.Mui-expanded": {
                    margin: 0,
                  },
                  "& .MuiAccordion-heading": { display: "none" },
                }}
              >
                <AccordionSummary>
                  <></>
                </AccordionSummary>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "10px",
                  }}
                >
                  <StyledSearchBar
                    name="searchbar"
                    value={usersHooks.search}
                    placeholder={t(`${props.translation}.searchbar`)}
                    onChange={(evt) => {
                      usersHooks.setSearch(evt.target.value);
                      usersHooks.setDebouncedSearch();
                    }}
                  />
                  <Button
                    variant="outlined"
                    onClick={() => {
                      const currentSorting =
                        usersHooks.sorting === "new" ? "old" : "new";
                      usersHooks.setSorting(currentSorting);
                    }}
                    sx={{
                      width: "unset",
                    }}
                  >
                    {usersHooks.sorting === "new"
                      ? t(`${props.translation}.sorting.old`)
                      : t(`${props.translation}.sorting.new`)}
                  </Button>
                  <ToggleButtonGroup
                    color="primary"
                    value={props.view}
                    exclusive
                    onChange={(_, newValue: "list" | "table" | "map") => {
                      props.setView(newValue);
                    }}
                  >
                    <ToggleButton value="list" sx={{ flexGrow: 1 }}>
                      {t(`${props.translation}.toggleButtons.list`)}
                    </ToggleButton>
                    <ToggleButton value="table" sx={{ flexGrow: 1 }}>
                      {t(`${props.translation}.toggleButtons.table`)}
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </Accordion>
            </Box>

            {props.view === "list" ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "16px",
                  padding: "16px",
                  overflow: "auto",
                  height: "100%",
                  scrollbarWidth: "none",
                }}
              >
                {usersHooks.users.activeUsers.map((item) =>
                  props.usersListView(item),
                )}
              </Box>
            ) : null}
            {props.view === "table" ? (
              <Box
                sx={{
                  overflow: "auto",
                  height: "100%",
                  scrollbarWidth: "none",
                }}
              >
                {usersHooks.users.activeUsers.map((item) =>
                  props.usersTableView(item),
                )}
              </Box>
            ) : null}
          </Box>

          <Box
            sx={(theme) => ({
              position: "relative",
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              height: "100%",
              overflow: "hidden",
              backgroundColor: theme.vars.palette["Grey_5"],
              borderRadius: "5px 0 0 0",
              padding: "20px",
            })}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                maxWidth: "600px",
                margin: "0 auto",
                flexGrow: 1,
                overflowY: "auto",
              }}
            >
              <Outlet />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexGrow: 1,
            minHeight: "0px",
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: "420px",
              overflowY: "auto",
              scrollbarWidth: "none",
            }}
          >
            <Typography
              component="p"
              variant="Reg_14"
              sx={(theme) => ({
                color: theme.vars.palette["Black"],
                textAlign: "center",
                marginTop: "100px",
              })}
            >
              {t(`${props.translation}.emptyHeader`)}
            </Typography>
          </Box>
          <Box
            sx={(theme) => ({
              position: "relative",
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              height: "100%",
              overflowY: "auto",
              backgroundColor: theme.vars.palette["Grey_5"],
              borderRadius: "5px 0 0 0",
              padding: "20px",
            })}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                maxWidth: "600px",
                margin: "0 auto",
                flexGrow: 1,
                overflowY: "auto",
              }}
            >
              <Outlet />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
