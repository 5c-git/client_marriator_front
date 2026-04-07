import { useState, useRef } from "react";

import type { SpecialistsMobileViewInterface } from "./SpecialistsMobileViewInterface";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";
import { statusCodeMap } from "~/shared/specialistStatus";

import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";

// import { StyledDropdown } from "~/shared/ui/StyledDropdown/StyledDropdown";

import { StatusSelect } from "~/shared/ui/StatusSelect/StatusSelect";
import { EntityCard } from "~/shared/ui/EntityCard/EntityCard";

import { PhoneIcon } from "~/shared/icons/PhoneIcon";

type Specialist = Omit<SpecialistsMobileViewInterface["specialists"][0], 'viewActivitiesAccurate'>;  

type SpecialistsStaticMobileViewInterface = Pick<
  SpecialistsMobileViewInterface,
  "bid" |"activeService"
> & {
  specialists: Specialist[];
};

export function SpecialistsStaticMobileView(
  props: SpecialistsStaticMobileViewInterface,
) {
  const setup = useRef<boolean>(null);

  const { t } = useTranslation("SpecialistsMobileView");

  // const daysRange = eachDayOfInterval({
  //   start: props.bid.dateStart,
  //   end: props.bid.dateEnd,
  // });

  const [filteredSpecialists, setFilteredSpecialists] = useState<{
    [key: number]: SpecialistsStaticMobileViewInterface["specialists"];
  }>({});
  const [filter, setFilter] = useState<number>(0);
  const [activeSpecialists, setActiveSpecialists] = useState<
    SpecialistsStaticMobileViewInterface["specialists"]
  >([]);
  // const [selectedDate, setSelectedDate] = useState<Date>(daysRange[0]);

  if (setup.current === null) {
    if (props.specialists.length > 0) {
      const allFilters = [
        ...new Set(props.specialists.map((specialist) => specialist["status"])),
      ].sort((a, b) => a - b);

      const filteredSpecialists: {
        [key: number]: SpecialistsStaticMobileViewInterface["specialists"];
      } = {};

      allFilters.forEach((filter) => {
        filteredSpecialists[filter] = [];
      });

      for (const key in filteredSpecialists) {
        filteredSpecialists[key] = props.specialists.filter(
          (item) => item.status === Number(key),
        );
      }

      setFilteredSpecialists(filteredSpecialists);
      setActiveSpecialists(
        filteredSpecialists[Number(Object.keys(filteredSpecialists)[0])],
      );
      setFilter(allFilters[0]);
    }

    setup.current = true;
  }

  return (
    <>
      <Box
        sx={{
          paddingTop: "20px",
          paddingLeft: "16px",
          paddingRight: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <StatusSelect
          value={filter.toString()}
          onChange={(value) => {
            setFilter(Number(value));
            setActiveSpecialists(filteredSpecialists[Number(value)]);
          }}
          options={(() => {
            const options: {
              id: string;
              label: string;
              count: number;
              color: string;
            }[] = [];

            for (const key in filteredSpecialists) {
              options.push({
                id: key,
                label: t(`status.${Number(key) as keyof typeof statusCodeMap}`),
                count: filteredSpecialists[Number(key)].length,
                color:
                  statusCodeMap[Number(key) as keyof typeof statusCodeMap]
                    .color,
              });
            }

            return options;
          })()}
        />

        {/*<StyledDropdown
          value={selectedDate.toUTCString()}
          onChange={(evt) => {
            setSelectedDate(new Date(evt.target.value));
          }}
          name="dateSelect"
          options={daysRange.map((date) => ({
            value: date.toUTCString(),
            label: format(date, "dd.LL.yyyy"),
            disabled: true,
          }))}
        />*/}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "16px",
          rowGap: "14px",
        }}
      >
        {activeSpecialists.map((specialist) => (
          <EntityCard
            key={specialist.id}
            id={specialist.id.toString()}
            to={withLocale(
              `/bids/${props.bid.id}/specialists/${specialist.id}`,
            )}
            avatar={{
              logo: `${import.meta.env.VITE_ASSET_PATH}${specialist.logo}`,
              name: specialist.name,
              address: `${specialist.age}, ${specialist.country}`,
              skills: specialist.viewActivities.map((skill) => ({
                label: skill,
                active: props.activeService === skill,
              })),
            }}
            buttonsTray={{
              leftTray: [
                <IconButton
                  key="phone"
                  component="a"
                  href={`tel:+${specialist.phone}`}
                  sx={(theme) => ({
                    display: "flex",
                    padding: "7px",
                    color: theme.vars.palette["Corp_1"],
                    backgroundColor: theme.vars.palette["Grey_4"],
                    borderRadius: "5px",
                  })}
                >
                  <PhoneIcon
                    sx={{
                      width: "16px",
                      height: "16px",
                    }}
                  />
                </IconButton>,
              ],
            }}
            statusColor={statusCodeMap[specialist.status].color}
          />
        ))}
      </Box>
    </>
  );
}
