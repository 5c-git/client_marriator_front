import { useMemo, useState } from "react";

import { useDebounce } from "~/shared/debounce";

import type { UsersMobileViewInterface } from "./UsersMobileViewInterface";

export const useUsers = (users: UsersMobileViewInterface["users"]) => {
  const filteredUsers = useMemo(() => {
    const allFilters = [...new Set(users.map((user) => user["status"]))].sort(
      (a, b) => a - b,
    );

    const filteredUsers: {
      [key: number]: UsersMobileViewInterface["users"];
    } = {};

    allFilters.forEach((filter) => {
      filteredUsers[filter] = [];
    });

    for (const key in filteredUsers) {
      filteredUsers[key] = users.filter((item) => item.status === Number(key));
    }

    return filteredUsers;
  }, [users]);

  const [filter, setFilter] = useState<number>(() => {
    if (users.length > 0) {
      const allFilters = [...new Set(users.map((user) => user["status"]))].sort(
        (a, b) => a - b,
      );

      return allFilters[0];
    } else {
      return 0;
    }
  });
  const [sorting, setSorting] = useState<"old" | "new">("new");

  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, _setter] = useState<string>("");

  let activeUsers: UsersMobileViewInterface["users"] = [];

  const setDebouncedSearch = useDebounce(() => {
    _setter(search);
  });

  //сортировки
  if (debouncedSearch !== "") {
    const currentFieldValue = new RegExp(`${debouncedSearch}`, "i");

    activeUsers = [
      ...filteredUsers[filter]
        .filter((item) => item.name !== null)
        .filter((item) => currentFieldValue.test(item.name as string)),
    ];
  } else {
    if (sorting === "new") {
      const sortedUsers = [
        ...filteredUsers[filter].sort((a, b) => b.id - a.id),
      ];
      activeUsers = sortedUsers;
    } else if (sorting === "old") {
      const sortedUsers = [
        ...filteredUsers[filter].sort((a, b) => a.id - b.id),
      ];
      activeUsers = sortedUsers;
    }
  }
  //сортировки

  return {
    users: {
      filteredUsers,
      activeUsers,
    },
    filter,
    setFilter,
    sorting,
    setSorting,
    search,
    setSearch,
    debouncedSearch,
    setDebouncedSearch,
  };
};
