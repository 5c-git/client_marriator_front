import { useMemo, useState } from "react";
import { useDebounce } from "~/shared/debounce";

import { eachDayOfInterval, isWithinInterval } from "date-fns";

import type { EntitiesListInterface, Entity } from "./EntitesListInterface";

export const useEntitiesList = (
  entities: Entity[],
  sort: EntitiesListInterface["sorting"],
) => {
  const filteredEntities = useMemo(() => {
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
      const allFilters = [
        ...new Set(entities.map((entity) => entity["status"])),
      ].sort((a, b) => a - b);

      return allFilters[0];
    } else {
      return 0;
    }
  });
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

  //сортировки
  if (
    Object.keys(filteredEntities).length > 0 &&
    filteredEntities[filter].length > 0
  ) {
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
    setFilter,
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
