import type { UsersMobileViewInterface } from "./UsersMobileViewInterface";

import { useTranslation } from "react-i18next";

import { statusCodeMap } from "../../usersStatusCodeMap";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

import { StatusSelect } from "~/shared/ui/StatusSelect/StatusSelect";
import { SortingSelect } from "~/shared/ui/SortingSelect/SortingSelect";
import { StyledSearchBar } from "~/shared/ui/StyledSearchBar/StyledSearchBar";

import { useUsers } from "./Users.hooks";

export function UsersListView(props: UsersMobileViewInterface) {
  const { t } = useTranslation("m_shared_usersView");

  const usersHooks = useUsers(props.users);

  return (
    <>
      {props.users.length > 0 ? (
        <>
          <Box
            sx={{
              position: "relative",
              zIndex: "1",
              display: "grid",
              rowGap: "16px",
              padding: "20px 16px 16px 20px",
            }}
          >
            <StatusSelect
              value={usersHooks.filter.toString()}
              onChange={(value) => {
                usersHooks.setFilter(Number(value));
              }}
              options={(() => {
                const options: {
                  id: string;
                  label: string;
                  count: number;
                  color: string;
                }[] = [];

                for (const key in usersHooks.users.filteredUsers) {
                  options.push({
                    id: key,
                    label: t(
                      `${props.translation}.status.${statusCodeMap[Number(key) as keyof typeof statusCodeMap].value}`,
                    ),
                    count: usersHooks.users.filteredUsers[Number(key)].length,
                    color:
                      statusCodeMap[Number(key) as keyof typeof statusCodeMap]
                        .color,
                  });
                }

                return options;
              })()}
            />

            <StyledSearchBar
              name="searchbar"
              value={usersHooks.search}
              placeholder={t(`${props.translation}.searchbar`)}
              onChange={(evt) => {
                usersHooks.setSearch(evt.target.value);
                usersHooks.setDebouncedSearch();
              }}
            />

            <SortingSelect
              value={usersHooks.sorting}
              options={[
                {
                  id: "new",
                  label: t(`${props.translation}.sorting.new`),
                },
                {
                  id: "old",
                  label: t(`${props.translation}.sorting.old`),
                },
              ]}
              onChange={(value) => {
                usersHooks.setSorting(value as "new" | "old");
              }}
            />
          </Box>

          <Box
            sx={{
              display: "grid",
              rowGap: "14px",
              paddingLeft: "16px",
              paddingRight: "16px",
              paddingBottom: "16px",
            }}
          >
            {usersHooks.users.activeUsers.map((user) =>
              props.usersListView(user),
            )}
          </Box>
        </>
      ) : (
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
      )}
    </>
  );
}
