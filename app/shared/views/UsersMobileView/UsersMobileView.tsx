import { useState, useEffectEvent, useEffect } from "react";

import type { UsersMobileViewInterface } from "./UsersMobileViewInterface";

import { useTranslation } from "react-i18next";

import { statusCodeMap } from "../../usersStatusCodeMap";
import { useForm, Controller } from "react-hook-form";

import { debounce } from "~/shared/debounce";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

import { StatusSelect } from "~/shared/ui/StatusSelect/StatusSelect";
import { SortingSelect } from "~/shared/ui/SortingSelect/SortingSelect";
import { StyledSearchBar } from "~/shared/ui/StyledSearchBar/StyledSearchBar";

export function UsersMobileView(props: UsersMobileViewInterface) {
  const { t } = useTranslation("UsersMobileView");

  const [filteredUsers, setFilteredUsers] = useState<{
    [key: number]: UsersMobileViewInterface["users"];
  }>({});
  const [filter, setFilter] = useState<number>(0);
  const [sorting, setSorting] = useState<"old" | "new">("new");
  const [activeUsers, setActiveUsers] = useState<
    UsersMobileViewInterface["users"]
  >([]);

  const { control } = useForm<{
    searchbar: string;
  }>({
    defaultValues: {
      searchbar: "",
    },
  });

  const debouncedSearch = debounce((value: string) => {
    console.log("t");

    const currentFieldValue = new RegExp(`${value}`, "i");

    let matchingItems: UsersMobileViewInterface["users"] = [];

    if (value !== "") {
      matchingItems = [
        ...filteredUsers[filter]
          .filter((item) => item.name !== null)
          .filter((item) => currentFieldValue.test(item.name as string)),
      ];
    } else {
      if (sorting === "new") {
        const sortedUsers = [
          ...filteredUsers[filter].sort((a, b) => b.id - a.id),
        ];
        matchingItems = sortedUsers;
      } else if (sorting === "old") {
        const sortedUsers = [
          ...filteredUsers[filter].sort((a, b) => a.id - b.id),
        ];
        matchingItems = sortedUsers;
      }
    }

    setActiveUsers(matchingItems);
  }, 1000);

  const onInit = useEffectEvent((users: UsersMobileViewInterface["users"]) => {
    const allFilters = [...new Set(users.map((user) => user["status"]))].sort(
      (a, b) => a - b
    );

    const filteredUsers: {
      [key: number]: UsersMobileViewInterface["users"];
    } = {};

    allFilters.forEach((filter) => {
      filteredUsers[filter] = [];
    });

    for (const key in filteredUsers) {
      filteredUsers[key] = props.users.filter(
        (item) => item.status === Number(key)
      );
    }

    setFilteredUsers(filteredUsers);
    setActiveUsers(filteredUsers[Number(Object.keys(filteredUsers)[0])]);
    setFilter(allFilters[0]);
  });
  useEffect(() => {
    onInit(props.users);
  }, [props.users]);

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
              value={filter.toString()}
              onChange={(value) => {
                setFilter(Number(value));

                const selection = [...filteredUsers[Number(value)]];

                if (sorting === "new") {
                  const sortedUsers = [
                    ...selection.sort((a, b) => b.id - a.id),
                  ];
                  setActiveUsers(sortedUsers);
                } else if (sorting === "old") {
                  const sortedUsers = [
                    ...selection.sort((a, b) => a.id - b.id),
                  ];
                  setActiveUsers(sortedUsers);
                }
              }}
              options={(() => {
                const options: {
                  id: string;
                  label: string;
                  count: number;
                  color: string;
                }[] = [];

                for (const key in filteredUsers) {
                  options.push({
                    id: key,
                    label: t(
                      `${props.translation}.status.${statusCodeMap[Number(key) as keyof typeof statusCodeMap].value}`
                    ),
                    count: filteredUsers[Number(key)].length,
                    color:
                      statusCodeMap[Number(key) as keyof typeof statusCodeMap]
                        .color,
                  });
                }

                return options;
              })()}
            />

            <Controller
              name="searchbar"
              control={control}
              render={({ field }) => (
                <StyledSearchBar
                  {...field}
                  placeholder={t(`${props.translation}.searchbar`)}
                  onChange={(evt) => {
                    field.onChange(evt);
                    debouncedSearch(evt.target.value);
                  }}
                />
              )}
            />

            <SortingSelect
              value={sorting}
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
                if (value === "new") {
                  const sortedUsers = [
                    ...activeUsers.sort((a, b) => b.id - a.id),
                  ];
                  setActiveUsers(sortedUsers);
                } else if (value === "old") {
                  const sortedUsers = [
                    ...activeUsers.sort((a, b) => a.id - b.id),
                  ];
                  setActiveUsers(sortedUsers);
                }

                setSorting(value as typeof sorting);
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
            {activeUsers.map((user) => props.userSlot(user))}
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
