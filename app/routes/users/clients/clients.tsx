import { useEffect, useState } from "react";
import { useNavigation, Link, useSearchParams } from "react-router";
import type { Route } from "./+types/clients";
import { useForm, Controller } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { Typography, Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import InfiniteScroll from "react-infinite-scroll-component";

import { StyledSearchBar } from "~/shared/ui/StyledSearchBar/StyledSearchBar";
import { StyledDropdown } from "~/shared/ui/StyledDropdown/StyledDropdown";
import { StatusSelect } from "~/shared/ui/StatusSelect/StatusSelect";

import { Loader } from "~/shared/ui/Loader/Loader";

import { useStore } from "~/store/store";

import { getModerationClient } from "~/requests/_personal/_moderation/getModerationClient/getModerationClient";

import { debounce } from "~/shared/debounce";

const statusTranslationMap = {
  "1": "new",
  "2": "in-work",
  "3": "archive",
  "4": "review",
};

const statusColorMap = {
  "1": "var(--mui-palette-Blue)",
  "2": "var(--mui-palette-Green)",
  "3": "var(--mui-palette-Grey_2)",
  "4": "var(--mui-palette-Corp_2)",
};

const statusMap = {
  new: "1",
  "in-work": "2",
  archive: "3",
  review: "4",
};

const sortMap = {
  new: "1",
  old: "2",
  all: "3",
};

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const currentURL = new URL(request.url);

  const page = currentURL.searchParams.get("page");
  const status = currentURL.searchParams.get("status");
  const sort = currentURL.searchParams.get("sort");
  const search = currentURL.searchParams.get("search");

  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const data = await getModerationClient(
      accessToken,
      100,
      "client",
      page,
      status,
      sort,
      search
    );

    const clients: {
      id: number;
      logo: string | null;
      agent: string;
      phone: string;
      name: string;
      organizations: {
        logo: string;
        name: string;
      }[];
      locations: {
        logo: string;
        address: string;
      }[];
      change_order: string | null;
      cancel_order: string | null;
      live_order: string | null;
    }[] = [];

    data.data.forEach((item) => {
      const organizations: {
        id: number;
        logo: string;
        name: string;
      }[] = [];

      const locations: {
        id: number;
        logo: string;
        address: string;
      }[] = [];

      item.place.forEach((org) => {
        organizations.push({
          id: org.id,
          logo: org.logo,
          name: org.name,
        });
      });

      item.place.forEach((loc) => {
        locations.push({
          id: loc.id,
          logo: loc.logo,
          address: loc.address_kladr,
        });
      });

      clients.push({
        id: item.id,
        logo: item.logo,
        agent: "AGENT PLACEHOLDER",
        phone: item.phone.toString(),
        name: item.name,
        organizations: organizations,
        locations: locations,
        change_order: item.change_order,
        cancel_order: item.cancel_order,
        live_order: item.live_order,
      });
    });

    return { clients, next: data.links.next ? true : false };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Clients({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("users_clients");
  const navigation = useNavigation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [clients, setClients] = useState<typeof loaderData.clients>([]);

  const { control, setValue, reset, getValues } = useForm<{
    status: string;
    searchbar: string;
    sorting: string;
  }>({
    defaultValues: {
      status: "1",
      searchbar: "",
      sorting: "3",
    },
    mode: "onChange",
  });

  const debouncedSearchbarSubmit = debounce((value: string) => {
    if (value !== "") {
      setSearchParams((searchParams) => {
        searchParams.set("search", value);
        searchParams.set("page", "1");
        return searchParams;
      });
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  }, 1000);

  useEffect(() => {
    setTimeout(() => {
      reset(undefined, {
        keepValues: true,
      });
    });
  }, [loaderData, reset]);

  useEffect(() => {
    const page = searchParams.get("page");
    if (page === null || Number(page) <= 1) {
      setClients(loaderData.clients);
    } else {
      setClients((prevState) => prevState.concat(loaderData.clients));
    }
  }, [loaderData]);

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100dvh",
          paddingTop: "20px",
          paddingLeft: "16px",
          paddingRight: "16px",
          rowGap: "14px",
        }}
      >
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <StatusSelect
              value={field.value}
              onChange={(value) => {
                setValue("status", value);
                setSearchParams((searchParams) => {
                  searchParams.set("status", value);
                  searchParams.set("page", "1");
                  return searchParams;
                });
              }}
              options={[
                {
                  id: statusMap["new"],
                  label: t("status.new"),
                  count: 16,
                  color: "var(--mui-palette-Blue)",
                },
                {
                  id: statusMap["in-work"],
                  label: t("status.in-work"),
                  count: 5,
                  color: "var(--mui-palette-Green)",
                },
                {
                  id: statusMap["archive"],
                  label: t("status.archive"),
                  count: 2,
                  color: "var(--mui-palette-Grey_2)",
                },
                {
                  id: statusMap["review"],
                  label: t("status.review"),
                  count: 2,
                  color: "var(--mui-palette-Corp_2)",
                },
              ]}
            />
          )}
        />

        <Controller
          name="searchbar"
          control={control}
          render={({ field }) => (
            <StyledSearchBar
              {...field}
              placeholder={t("searchbar")}
              onChange={(evt) => {
                field.onChange(evt);
                debouncedSearchbarSubmit(evt.target.value);
              }}
            />
          )}
        />

        <Controller
          name="sorting"
          control={control}
          render={({ field }) => (
            <StyledDropdown
              options={[
                {
                  value: sortMap.new,
                  label: t("sorting.new"),
                  disabled: false,
                },
                {
                  value: sortMap.old,
                  label: t("sorting.old"),
                  disabled: false,
                },
                {
                  value: sortMap.all,
                  label: t("sorting.all"),
                  disabled: false,
                },
              ]}
              {...field}
              onChange={(evt) => {
                field.onChange(evt);

                setSearchParams((searchParams) => {
                  searchParams.set("sort", evt.target.value);
                  searchParams.set("page", "1");
                  return searchParams;
                });
              }}
            />
          )}
        />

        <Box
          sx={{
            flexGrow: 1,
            overflow: "auto",
            paddingBottom: "12px",
          }}
          id="scrollableDiv"
        >
          <InfiniteScroll
            scrollableTarget="scrollableDiv"
            dataLength={clients.length}
            next={() => {
              const currentPage = searchParams.get("page");

              if (currentPage) {
                setSearchParams((searchParams) => {
                  searchParams.set(
                    "page",
                    (Number(currentPage) + 1).toString()
                  );
                  return searchParams;
                });
              } else {
                setSearchParams((searchParams) => {
                  searchParams.set("page", "2");
                  return searchParams;
                });
              }
            }}
            hasMore={loaderData.next}
            loader={null}
          >
            <Stack
              sx={{
                rowGap: "14px",
              }}
            >
              {clients.map((client) => (
                <Box
                  key={client.id}
                  sx={(theme) => ({
                    display: "flex",
                    columnGap: "12px",
                    alignItems: "center",
                    textDecoration: "none",
                    color: theme.vars.palette["Black"],
                  })}
                  component={Link}
                  to={withLocale(`/users/client/${client.id}`)}
                  state={{
                    status: t(
                      // @ts-expect-error translation mapping
                      `status.${statusTranslationMap[getValues("status")]}`
                    ),
                    // @ts-expect-error color mapping
                    statusColor: statusColorMap[getValues("status")],
                  }}
                >
                  {client.logo ? (
                    <Avatar
                      src={client.logo}
                      sx={{ width: "30px", height: "30px" }}
                    />
                  ) : null}

                  <Box>
                    <Typography component="p" variant="Reg_14">
                      {client.name}
                    </Typography>

                    <Typography component="p" variant="Reg_12">
                      {client.organizations[0].name}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </InfiniteScroll>
        </Box>
      </Box>
    </>
  );
}
