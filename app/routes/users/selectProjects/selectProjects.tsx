import { useState, useEffect } from "react";
import {
  useSubmit,
  useNavigate,
  useNavigation,
  useLocation,
  redirect,
} from "react-router";
import type { Route } from "./+types/selectProjects";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import { Button } from "@mui/material";
import Box from "@mui/material/Box";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { Loader } from "~/shared/ui/Loader/Loader";
import { StyledSearchBar } from "~/shared/ui/StyledSearchBar/StyledSearchBar";
import { StyledCheckboxMultiple } from "~/shared/ui/StyledCheckboxMultiple/StyledCheckboxMultiple";

import { useStore } from "~/store/store";

import { getProject } from "~/requests/_personal/_moderation/getProject/getProject";
import { postSetProject } from "~/requests/_personal/_moderation/postSetProject/postSetProject";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const data = await getProject(accessToken, Number(params.user));

    const options: {
      value: string;
      label: string;
      image?: string;
      disabled: boolean;
    }[] = [];

    data.data.forEach((item) => {
      options.push({
        value: item.id.toString(),
        label: item.name,
        image: item.brand[0].logo ? item.brand[0].logo : undefined,
        disabled: false,
      });
    });

    return { userId: params.user, projects: options };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({
  params,
  request,
}: Route.ClientActionArgs) {
  const fields = await request.json();

  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    await postSetProject(accessToken, params.user, fields.projects);

    throw redirect(withLocale(fields.from));
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function SelectProjects({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("users_select_projects");
  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();
  const submit = useSubmit();

  const { state } = location as {
    state: { from: string; status: string; statusColor: string };
  };

  const [selectedProjects, setSelectedProjects] = useState(loaderData.projects);

  const { control, getValues, handleSubmit, reset, watch } = useForm<{
    searchbar: string;
    projects: string[];
  }>({
    defaultValues: {
      searchbar: "",
      projects: [],
    },
    // @ts-expect-error
    resolver: yupResolver(
      Yup.object({
        searchbar: Yup.string().notRequired(),
        projects: Yup.array().of(Yup.string()).min(1),
      })
    ),
    mode: "onChange",
  });

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <Box>
        <TopNavigation
          header={{
            text: t("header"),
            bold: false,
          }}
          backAction={() => {
            navigate(withLocale(`${state.from}`), {
              viewTransition: true,
              state: {
                status: state.status,
                statusColor: state.statusColor,
              },
            });
          }}
        />

        <form
          onSubmit={handleSubmit((values) => {
            submit(
              JSON.stringify({ from: state.from, projects: values.projects }),
              {
                method: "POST",
                encType: "application/json",
              }
            );
          })}
        >
          <Box
            sx={{
              position: "relative",
              display: "grid",
              rowGap: "14px",
              paddingTop: "20px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            <Controller
              name="searchbar"
              control={control}
              render={({ field }) => (
                <StyledSearchBar
                  placeholder={t("searchbarPlaceholder")}
                  {...field}
                  onChange={(evt) => {
                    const currentFieldValue = new RegExp(
                      `^${evt.target.value}`,
                      "i"
                    );

                    let matchingProjects: typeof loaderData.projects = [];

                    if (evt.target.value !== "") {
                      matchingProjects = [
                        ...selectedProjects.filter((item) =>
                          currentFieldValue.test(item.label)
                        ),
                      ];
                    } else {
                      matchingProjects = [...loaderData.projects];
                    }

                    setSelectedProjects(matchingProjects);

                    field.onChange(evt);
                  }}
                />
              )}
            />

            <Controller
              name="projects"
              control={control}
              render={({ field }) => (
                <StyledCheckboxMultiple
                  inputType="checkboxMultiple"
                  onImmediateChange={() => {}}
                  options={selectedProjects}
                  {...field}
                />
              )}
            />

            <Box
              sx={(theme) => ({
                display: "flex",
                columnGap: "14px",
                padding: "10px",
                backgroundColor: theme.vars.palette["White"],
                position: "fixed",
                zIndex: 1,
                width: "100%",
                bottom: "0",
                left: "0",
              })}
            >
              <Button
                type="button"
                onClick={() => {
                  reset();
                  setSelectedProjects(loaderData.projects);
                }}
              >
                {t("cancelButton")}
              </Button>
              <Button type="submit" variant="contained">
                {t("selectButton")}{" "}
                {watch("projects").length > 0
                  ? ` ${getValues("projects").length}`
                  : null}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
}
