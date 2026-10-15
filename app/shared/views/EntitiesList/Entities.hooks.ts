import { useMemo, useState } from "react";
import { useDebounce } from "~/shared/debounce";

import { eachDayOfInterval, isWithinInterval } from "date-fns";

import type { EntitiesListInterface, Entity } from "./EntitesListInterface";

import { useStore } from "~/store/store";

export const useEntities = (
  entities: Entity[],
  sort: EntitiesListInterface["sorting"],
  section: EntitiesListInterface["entityType"],
) => {
  const setSectionStatus = useStore((state) => state.setSectionStatus);

  const entitiesByStatus = useMemo(() => {
    //сортировка
    if (entities.length > 0) {
      const allFilters = [
        ...new Set(entities.map((entity) => entity["status"])),
      ].sort((a, b) => a - b);

      const filteredEntites: {
        [key: (typeof allFilters)[number]]: Entity[];
      } = {};

      allFilters.forEach((filter) => {
        filteredEntites[filter] = [];
      });

      for (const key in filteredEntites) {
        filteredEntites[key] = entities.filter(
          (item) => item.status === Number(key),
        );
      }

      return filteredEntites;
    } else {
      return {};
    }
  }, [entities]);

  const [filter, setFilter] = useState<number>(() => {
    if (entities.length > 0) {
      const statuses = Object.keys(entitiesByStatus).map(Number);
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
  const filteredEntities = useMemo(() => {
    if (entities.length === 0 || filter === -1 || filter in entitiesByStatus) {
      return entitiesByStatus;
    }

    return { ...entitiesByStatus, [filter]: [] };
  }, [entitiesByStatus, entities.length, filter]);

  //сохраняем статус в момент выбора пользователем (#88620)
  const selectStatus = (newStatus: number) => {
    setFilter(newStatus);
    setSectionStatus(section, newStatus);
  };

  const [sorting, setSorting] =
    useState<EntitiesListInterface["sorting"]>(sort);

  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, _setter] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<Date | "">("");

  let activeEntities: Entity[] = [];
  const days: Set<string> = new Set([]);

  const setDebouncedSearch = useDebounce(() => {
    _setter(search);
  });

  //данные пришли после пустого маунта — берём первый статус, выбора пользователя ещё не было (#88620)
  if (Object.keys(filteredEntities).length > 0 && filter === -1) {
    setFilter(Number(Object.keys(filteredEntities)[0]));
  } else if (
    Object.keys(filteredEntities).length > 0 &&
    filteredEntities[filter].length > 0
  ) {
    // cортировки
    if (sorting === "ascending") {
      const emptyDurationEntities = filteredEntities[filter].filter(
        (item) => item.duration.start === null && item.duration.end === null,
      );
      const notEmptyDurationEntities = filteredEntities[filter].filter(
        (item) => item.duration.start !== null && item.duration.end !== null,
      );

      notEmptyDurationEntities.sort(
        (a, b) =>
          new Date(a.duration.start as string).valueOf() -
          new Date(b.duration.start as string).valueOf(),
      );

      //составляем уникальные дни
      if (notEmptyDurationEntities.length > 0) {
        days.clear();

        notEmptyDurationEntities.forEach((entity) => {
          const interval = eachDayOfInterval({
            start: new Date(entity.duration.start as string).setHours(
              0,
              0,
              0,
              0,
            ),
            end: new Date(entity.duration.end as string).setHours(0, 0, 0, 0),
          });

          interval.forEach((day) => {
            days.add(day.toISOString());
          });
        });
      }
      //составляем уникальные дни

      if (selectedDay !== "") {
        activeEntities = notEmptyDurationEntities.filter((item) =>
          isWithinInterval(selectedDay.setHours(0, 0, 0, 0), {
            start: new Date(item.duration.start as string).setHours(0, 0, 0, 0),
            end: new Date(item.duration.end as string).setHours(0, 0, 0, 0),
          }),
        );
      } else {
        activeEntities = [
          ...emptyDurationEntities,
          ...notEmptyDurationEntities,
        ];
      }
      if (debouncedSearch !== "") {
        const currentFieldValue = new RegExp(`${debouncedSearch}`, "i");

        activeEntities = [
          ...activeEntities.filter(
            (item) => item.id.toString() === debouncedSearch,
          ),
          ...activeEntities.filter((item) =>
            currentFieldValue.test(item.address.text),
          ),
        ];
      }
    } else if (sorting === "descending") {
      const emptyDurationEntities = filteredEntities[filter].filter(
        (item) => item.duration.start === null && item.duration.end === null,
      );

      const notEmptyDurationEntities = filteredEntities[filter].filter(
        (item) => item.duration.start !== null && item.duration.end !== null,
      );

      notEmptyDurationEntities.sort(
        (a, b) =>
          new Date(b.duration.start as string).valueOf() -
          new Date(a.duration.start as string).valueOf(),
      );

      //составляем уникальные дни
      if (notEmptyDurationEntities.length > 0) {
        days.clear();

        notEmptyDurationEntities.forEach((entity) => {
          const interval = eachDayOfInterval({
            start: new Date(entity.duration.start as string).setHours(
              0,
              0,
              0,
              0,
            ),
            end: new Date(entity.duration.end as string).setHours(0, 0, 0, 0),
          });

          interval.forEach((day) => {
            days.add(day.toISOString());
          });
        });
      }

      //составляем уникальные дни

      if (selectedDay !== "") {
        activeEntities = notEmptyDurationEntities.filter((item) =>
          isWithinInterval(selectedDay.setHours(0, 0, 0, 0), {
            start: new Date(item.duration.start as string).setHours(0, 0, 0, 0),
            end: new Date(item.duration.end as string).setHours(0, 0, 0, 0),
          }),
        );
      } else {
        activeEntities = [
          ...emptyDurationEntities,
          ...notEmptyDurationEntities,
        ];
      }
      if (debouncedSearch !== "") {
        const currentFieldValue = new RegExp(`${debouncedSearch}`, "i");

        activeEntities = [
          ...activeEntities.filter(
            (item) => item.id.toString() === debouncedSearch,
          ),
          ...activeEntities.filter((item) =>
            currentFieldValue.test(item.address.text),
          ),
        ];
      }
    }
  }
  //сортировки

  return {
    entities: {
      filteredEntities,
      activeEntities,
    },
    days,
    filter,
    selectStatus,
    sorting,
    setSorting,
    search,
    setSearch,
    debouncedSearch,
    setDebouncedSearch,
    selectedDay,
    setSelectedDay,
  };
};
