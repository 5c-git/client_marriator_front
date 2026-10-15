import { useMemo, useState } from "react";

import { useDebounce } from "~/shared/debounce";

import type { UsersMobileViewInterface } from "./UsersMobileViewInterface";

import { useStore } from "~/store/store";

export const useUsers = (
  users: UsersMobileViewInterface["users"],
  section: UsersMobileViewInterface["translation"],
) => {
  const setSectionStatus = useStore((state) => state.setSectionStatus);

  const usersByStatus = useMemo(() => {
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
      const statuses = Object.keys(usersByStatus).map(Number);
      const saved =
        useStore.getState().sectionStatuses[
          useStore.getState().userId ?? 0
        ]?.[section];

      //восстанавливаем сохранённый статус, только если он ещё есть в данных (#88620)
      return saved !== undefined && statuses.includes(saved)
        ? saved
        : statuses[0];
    } else {
      return -1;
    }
  });

  //выбранный пользователем статус остаётся в списке даже пустым (#88620)
  const filteredUsers = useMemo(() => {
    if (users.length === 0 || filter === -1 || filter in usersByStatus) {
      return usersByStatus;
    }

    return { ...usersByStatus, [filter]: [] };
  }, [usersByStatus, users.length, filter]);

  //сохраняем статус в момент выбора пользователем (#88620)
  const selectStatus = (newStatus: number) => {
    setFilter(newStatus);
    setSectionStatus(section, newStatus);
  };

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
    //данные пришли после пустого маунта — берём первый статус, выбора пользователя ещё не было (#88620)
    if (Object.keys(filteredUsers).length > 0 && filter === -1) {
      setFilter(Number(Object.keys(filteredUsers)[0]));
    } else if (sorting === "new") {
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
    selectStatus,
    sorting,
    setSorting,
    search,
    setSearch,
    debouncedSearch,
    setDebouncedSearch,
  };
};
