import { useNavigation, Link } from "react-router";

import { useForm, Controller } from "react-hook-form";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { Typography, Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { StyledSearchBar } from "~/shared/ui/StyledSearchBar/StyledSearchBar";
import { StyledDropdown } from "~/shared/ui/StyledDropdown/StyledDropdown";
import { StatusSelect } from "~/shared/ui/StatusSelect/StatusSelect";

import { Loader } from "~/shared/ui/Loader/Loader";

const clients = [
  {
    id: 1,
    name: "Михельсон Конрад Карлович",
    icon: "https://mui.com/static/images/avatar/1.jpg",
    organization: "ООО Ромашка",
  },
  {
    id: 2,
    name: "Болдыерв Андрей Геннадиевич",
    icon: "https://mui.com/static/images/avatar/2.jpg",
    organization: "ООО Копыта и рог",
  },
  {
    id: 3,
    name: "Шепелев Вадим Александрович",
    icon: "https://mui.com/static/images/avatar/3.jpg",
    organization: "ООО Заветы Ильича",
  },
];

export default function Moderation1() {
  // const { t } = useTranslation("devModeration1");
  const navigation = useNavigation();

  const { control, setValue, trigger, getValues, handleSubmit, reset, watch } =
    useForm<{
      status:
        | "accepted"
        | "rejected"
        | "not-сonfirmed"
        | "сonfirmed"
        | "in-review"
        | "in-work"
        | "approved"
        | "cancelled"
        | "archived";
      searchbar: string;
      sorting: string;
      clients: typeof clients;
    }>({
      defaultValues: {
        status: "accepted",
        searchbar: "",
        sorting: "new",
        clients: clients,
      },
      mode: "onChange",
    });

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
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <StatusSelect
              value={field.value}
              onChange={(value) => {
                setValue("status", value);
              }}
              options={[
                {
                  id: "сonfirmed",
                  count: 16,
                },
                {
                  id: "in-review",
                  count: 5,
                },
                {
                  id: "accepted",
                  count: 2,
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
              placeholder="Поиск"
              onChange={(evt) => {
                const currentFieldValue = new RegExp(
                  `^${evt.target.value}`,
                  "i"
                );

                // const clients = getValues("clients");

                const matches = clients.filter((item) =>
                  currentFieldValue.test(item.name)
                );

                setValue("clients", matches);

                field.onChange(evt);
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
              {...field}
              onChange={(evt) => {
                field.onChange(evt);
              }}
            />
          )}
        />

        <Stack
          sx={{
            rowGap: "14px",
          }}
        >
          {watch("clients").map((client) => (
            <Box
              key={client.name}
              sx={{
                display: "flex",
                columnGap: "12px",
                alignItems: "center",
              }}
              component={Link}
              to="/dev/moderation/moderation-4/supervisor"
            >
              <Avatar
                src={client.icon}
                sx={{ width: "30px", height: "30px" }}
              />

              <Box>
                <Typography component="p" variant="Reg_14">
                  {client.name}
                </Typography>

                <Typography component="p" variant="Reg_12">
                  {client.organization}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </>
  );
}
