import { useState } from "react";
import {
  useLocation,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { withLocale } from "~/shared/withLocale";

import type {
  ProjectOption,
  SelectProjectsLoaderData,
} from "./selectProjects.service";

export type SelectProjectsActionPayload = {
  from: string;
  projects: string[];
};

export type SelectProjectsFormValues = {
  searchbar: string;
  projects: string[];
};

type LocationState = {
  from: string;
  status: string;
  statusColor: string;
};

export function useSelectProjectsHooks(loaderData: SelectProjectsLoaderData) {
  const { t } = useTranslation("users_select_projects");
  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();
  const submit = useSubmit();

  const { state } = location as { state: LocationState };

  const [selectedProjects, setSelectedProjects] = useState(loaderData.projects);

  const form = useForm<SelectProjectsFormValues>({
    defaultValues: {
      searchbar: "",
      projects: loaderData.selectedProjects,
    },
    resolver: zodResolver(
      z.object({
        searchbar: z.string(),
        projects: z.array(z.string()).min(1),
      }),
    ),
    mode: "onChange",
  });

  const onBack = () => {
    navigate(withLocale(state.from), {
      viewTransition: true,
      state: {
        status: state.status,
        statusColor: state.statusColor,
      },
    });
  };

  const onSearchChange = (
    value: string,
    fieldOnChange: (value: string) => void,
  ) => {
    const currentFieldValue = new RegExp(`${value}`, "i");
    let matchingProjects: ProjectOption[] = [];

    if (value !== "") {
      matchingProjects = [
        ...loaderData.projects.filter((item) => currentFieldValue.test(item.label)),
      ];
    } else {
      matchingProjects = [...loaderData.projects];
    }

    setSelectedProjects(matchingProjects);
    fieldOnChange(value);
  };

  const onSubmit = form.handleSubmit((values) => {
    submit(JSON.stringify({ from: state.from, projects: values.projects }), {
      method: "POST",
      encType: "application/json",
    });
  });

  const onReset = () => {
    form.reset();
    setSelectedProjects(loaderData.projects);
  };

  return {
    t,
    isLoading: navigation.state !== "idle",
    selectedProjects,
    form,
    onBack,
    onSearchChange,
    onSubmit,
    onReset,
  };
}
