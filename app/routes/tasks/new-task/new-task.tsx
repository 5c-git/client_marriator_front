import { useState, useEffect } from "react";
import {
  useNavigation,
  useNavigate,
  useFetcher,
  Link,
  redirect,
} from "react-router";
import type { Route } from "./+types/new-task";

import { useTranslation } from "react-i18next";
import { withLocale } from "~/shared/withLocale";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import Box from "@mui/material/Box";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  SwipeableDrawer,
  Typography,
} from "@mui/material";

import { Loader } from "~/shared/ui/Loader/Loader";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { StyledSelect } from "~/shared/ui/StyledSelect/StyledSelect";
import { StyledCheckbox } from "~/shared/ui/StyledCheckbox/StyledCheckbox";
import { StyledSearchBar } from "~/shared/ui/StyledSearchBar/StyledSearchBar";
import { StyledCheckboxMultiple } from "~/shared/ui/StyledCheckboxMultiple/StyledCheckboxMultiple";

import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import ClearIcon from "@mui/icons-material/Clear";

import { useStore } from "~/store/store";

import { getTask } from "~/requests/_personal/getTask/getTask";
import { getPlaceForTask } from "~/requests/_personal/getPlaceForTask/getPlaceForTask";
import { getProjectsForTask } from "~/requests/_personal/getProjectsForTask/getProjectsForTask";
import { getSupervisorsForTask } from "~/requests/_personal/getSupervisorsForTask/getSupervisorsForTask";

import { postCreateTask } from "~/requests/_personal/postCreateTask/postCreateTask";
import { postUpdateTask } from "~/requests/_personal/postUpdateTask/postUpdateTask";
import { postDeleteTaskActivity } from "~/requests/_personal/postDeleteTaskActivity/postDeleteTaskActivity";
import { postCancelTask } from "~/requests/_personal/postCancelTask/postCancelTask";
import { postInvoiceTask } from "~/requests/_personal/postInvoiceTask/postInvoiceTask";
import { postInstructTask } from "~/requests/_personal/postInstructTask/postInstructTask";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const currentURL = new URL(request.url);
  const accessToken = useStore.getState().accessToken;
  const taskId = currentURL.searchParams.get("taskId");

  const task: {
    id: string;
    place: {
      id: number;
      name: string;
      region: string;
    };
    project: {
      id: number;
      name: string;
      brand: unknown[];
    };
    selfEmployed: boolean;
    isNewOrder: boolean;
    selectedSupervisor: number | null;
    orderActivities: {
      id: number;
      count: number;
      name: string;
    }[];
    acceptedUser: {
      id: number;
      phone: number;
      email: string;
      logo: string;
    }[];
  } = {
    id: (-1).toString(),
    place: {
      id: -1,
      name: "",
      region: "",
    },
    project: {
      id: -1,
      name: "",
      brand: [],
    },
    selfEmployed: false,
    isNewOrder: true,
    selectedSupervisor: null,
    orderActivities: [],
    acceptedUser: [],
  };

  const options: { value: string; label: string; disabled: boolean }[] = [];
  const supervisorsToSelect: {
    value: string;
    label: string;
    disabled: boolean;
  }[] = [];

  if (accessToken) {
    if (taskId) {
      const taskData = await getTask(accessToken, taskId);

      task.id = taskId;
      task.place.id = taskData.data.place.id;
      task.place.name = taskData.data.place.name;
      task.place.region = taskData.data.place.region.name;

      task.project.id = taskData.data.project.id;
      task.project.name = taskData.data.project.name;
      task.project.brand = taskData.data.project.brand;

      task.selfEmployed = taskData.data.selfEmployed;

      taskData.data.orderActivities.forEach((item) => {
        task.orderActivities.push({
          id: item.id,
          count: item.count,
          name: item.viewActivity.name,
        });
      });

      task.acceptedUser = taskData.data.acceptedUser;
      task.isNewOrder = false;
      task.selectedSupervisor = taskData.data.acceptUser
        ? taskData.data.acceptUser.id
        : null;

      const supervisersData = await getSupervisorsForTask(accessToken, taskId);

      supervisersData.data.forEach((item) => {
        supervisorsToSelect.push({
          value: item.id.toString(),
          label: item.email,
          disabled: false,
        });
      });
    }

    const optionsData = await getPlaceForTask(accessToken);

    optionsData.data.forEach((item) => {
      options.push({
        value: item.id.toString(),
        label: `${item.name} ${item.region.name}`,
        disabled: false,
      });
    });

    return { task, options, supervisorsToSelect };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const currentURL = new URL(request.url);

  const { _action, ...fields } = await request.json();

  const accessToken = useStore.getState().accessToken;

  const taskId = currentURL.searchParams.get("taskId");

  if (accessToken) {
    if (_action === "_getProjects") {
      const projectsData = await getProjectsForTask(
        accessToken,
        fields.placeId
      );
      const options: { value: string; label: string; disabled: boolean }[] = [];

      projectsData.data.forEach((item) => {
        options.push({
          value: item.id.toString(),
          label: item.name,
          disabled: false,
        });
      });

      return options;
    } else if (_action === "_create") {
      const task = await postCreateTask(
        accessToken,
        fields.placeId,
        fields.projectId,
        fields.selfEmployed
      );
      currentURL.searchParams.set("taskId", task.data.id.toString());

      throw redirect(currentURL.toString());
    } else if (_action === "_update" && taskId) {
      await postUpdateTask(
        accessToken,
        fields.placeId,
        Number(taskId),
        fields.projectId,
        fields.selfEmployed
      );
    } else if (_action === "_delete" && taskId) {
      await postDeleteTaskActivity(accessToken, taskId, fields.orderActivityId);
    } else if (_action === "_cancel" && taskId) {
      await postCancelTask(accessToken, taskId);
      throw redirect(withLocale("/"));
    } else if (_action === "_inviteSupervisors" && taskId) {
      await postInvoiceTask(accessToken, taskId, fields.supervisors);
    } else if (_action === "_save" && taskId) {
      await postInstructTask(accessToken, taskId, fields.supervisorId);
      throw redirect(withLocale("/"));
    }
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function NewTask({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { t } = useTranslation("new_task");

  const fetcher = useFetcher();

  const [searchSupervisors, setSearchSupervisors] = useState<boolean>(false);
  const [activityToDelete, setActivityToDelete] = useState<{
    id: number;
    count: number;
    name: string;
  } | null>(null);
  const [selectedSupervisors, setSelectedSupervisors] = useState(
    loaderData.supervisorsToSelect
  );

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location:
        loaderData.task.place.id === -1
          ? ""
          : loaderData.task.place.id.toString(),
      project:
        loaderData.task.project.id === -1
          ? ""
          : loaderData.task.project.id.toString(),
      selfEmployed: loaderData.task.selfEmployed,
    },
    resolver: yupResolver(
      Yup.object({
        location: Yup.string().required(t("text", { ns: "constructorFields" })),
        project: Yup.string().required(t("text", { ns: "constructorFields" })),
        selfEmployed: Yup.boolean().required(),
      })
    ),
    mode: "onChange",
    shouldUnregister: true,
  });

  const {
    control: controlSupervisor,
    getValues: getValuesSupervisor,
    reset: resetSupervisor,
    handleSubmit: handleSupervisorSubmit,
  } = useForm<{
    searchbar: string;
    supervisors: string[];
  }>({
    defaultValues: {
      searchbar: "",
      supervisors: [],
    },
    // @ts-expect-error
    resolver: yupResolver(
      Yup.object({
        searchbar: Yup.string().notRequired(),
        supervisors: Yup.array().of(Yup.string()).min(1),
      })
    ),
  });

  useEffect(() => {
    setTimeout(() => {
      reset(undefined, {
        keepValues: true,
      });
      // reset({
      //   location:
      //     loaderData.task.place.id === -1
      //       ? ""
      //       : loaderData.task.place.id.toString(),
      //   selfEmployed: loaderData.task.selfEmployed,
      // });
    });
  }, [loaderData, reset]);

  useEffect(() => {
    if (loaderData.task.isNewOrder === false) {
      fetcher.submit(
        JSON.stringify({
          _action: "_getProjects",
          placeId: getValues().location,
        }),
        {
          method: "POST",
          encType: "application/json",
        }
      );
    }
  }, [loaderData.task.isNewOrder]);

  useEffect(() => {
    setSelectedSupervisors(loaderData.supervisorsToSelect);
  }, [loaderData.supervisorsToSelect]);

  return (
    <>
      {navigation.state !== "idle" ? <Loader /> : null}

      <TopNavigation
        header={{
          text: t("header"),
          bold: false,
        }}
        backAction={() => {
          navigate(withLocale("/"), {
            viewTransition: true,
          });
        }}
      />
      <Box
        sx={{
          height: "calc(100vh - 190px)",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",

          rowGap: "14px",
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingTop: "20px",
        }}
      >
        <form
          onSubmit={handleSubmit((values) => {
            // fetcher.submit(JSON.stringify(values), {
            //   method: "POST",
            //   encType: "application/json",
            // });
          })}
          style={{
            display: "grid",
            rowGap: "14px",
          }}
        >
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <StyledSelect
                inputType="select"
                placeholder={t("fields.locationPlaceholder")}
                // onImmediateChange={() => {
                //   if (loaderData.task.isNewOrder) {
                //     fetcher.submit(
                //       JSON.stringify({
                //         _action: "_create",
                //         placeId: getValues().location,
                //         selfEmployed: getValues().selfEmployed,
                //       }),
                //       {
                //         method: "POST",
                //         encType: "application/json",
                //       }
                //     );
                //   } else {
                //     fetcher.submit(
                //       JSON.stringify({
                //         _action: "_update",
                //         placeId: getValues().location,
                //         orderId: fetcher.data,
                //         selfEmployed: getValues().selfEmployed,
                //       }),
                //       {
                //         method: "POST",
                //         encType: "application/json",
                //       }
                //     );
                //   }
                // }}
                onImmediateChange={() => {
                  setValue("project", "");
                  fetcher.submit(
                    JSON.stringify({
                      _action: "_getProjects",
                      placeId: getValues().location,
                    }),
                    {
                      method: "POST",
                      encType: "application/json",
                    }
                  );
                }}
                validation="none"
                error={errors.location?.message}
                options={loaderData.options}
                {...field}
              />
            )}
          />

          {fetcher.data ? (
            <Controller
              name="project"
              control={control}
              render={({ field }) => (
                <StyledSelect
                  inputType="select"
                  placeholder={t("fields.projectPlaceholder")}
                  onImmediateChange={() => {
                    if (loaderData.task.isNewOrder) {
                      fetcher.submit(
                        JSON.stringify({
                          _action: "_create",
                          placeId: getValues().location,
                          projectId: getValues().project,
                          selfEmployed: getValues().selfEmployed,
                        }),
                        {
                          method: "POST",
                          encType: "application/json",
                        }
                      );
                    } else {
                      fetcher.submit(
                        JSON.stringify({
                          _action: "_update",
                          placeId: getValues().location,
                          orderId: fetcher.data,
                          projectId: getValues().project,
                          selfEmployed: getValues().selfEmployed,
                        }),
                        {
                          method: "POST",
                          encType: "application/json",
                        }
                      );
                    }
                  }}
                  validation="none"
                  error={errors.project?.message}
                  options={fetcher.data}
                  {...field}
                />
              )}
            />
          ) : null}

          {!loaderData.task.isNewOrder ? (
            <Controller
              name="selfEmployed"
              control={control}
              render={({ field }) => (
                <StyledCheckbox
                  inputType="checkbox"
                  label={t("fields.selfEmployedPlaceholder")}
                  onImmediateChange={() => {
                    if (loaderData.task.isNewOrder) {
                      fetcher.submit(
                        JSON.stringify({
                          _action: "_create",
                          placeId: getValues().location,
                          selfEmployed: getValues().selfEmployed,
                        }),
                        {
                          method: "POST",
                          encType: "application/json",
                        }
                      );
                    } else {
                      fetcher.submit(
                        JSON.stringify({
                          _action: "_update",
                          placeId: getValues().location,
                          orderId: fetcher.data,
                          projectId: getValues().project,
                          selfEmployed: getValues().selfEmployed,
                        }),
                        {
                          method: "POST",
                          encType: "application/json",
                        }
                      );
                    }
                  }}
                  validation="none"
                  error={errors.selfEmployed?.message}
                  {...field}
                />
              )}
            />
          ) : null}
        </form>

        {loaderData.task.orderActivities.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              rowGap: "14px",
            }}
          >
            <Typography
              component="p"
              variant="Bold_14"
              sx={(theme) => ({
                color: theme.vars.palette["Black"],
              })}
            >
              {t("activities")}
            </Typography>
            {loaderData.task.orderActivities.map((item) => (
              <Box
                key={item.id}
                sx={(theme) => ({
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  columnGap: "10px",
                  padding: "10px 14px",
                  border: "1px solid",
                  borderColor: theme.vars.palette["Grey_3"],
                  borderRadius: "6px",
                })}
              >
                <Box
                  sx={{
                    display: "grid",
                    rowGap: "4px",
                  }}
                >
                  <Typography
                    component="p"
                    variant="Reg_16"
                    sx={(theme) => ({
                      color: theme.vars.palette["Black"],
                    })}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    component="p"
                    variant="Reg_12"
                    sx={(theme) => ({
                      color: theme.vars.palette["Grey_1"],
                    })}
                  >
                    {t("activityAmount")} {item.count}
                  </Typography>
                </Box>

                <IconButton
                  sx={{
                    padding: 0,
                  }}
                  onClick={() => {
                    setActivityToDelete(item);
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        ) : null}

        <Button
          component={Link}
          to={withLocale(`/new-task/${loaderData.task.id}/new-service`)}
          variant="outlined"
          disabled={loaderData.task.isNewOrder}
          startIcon={<AddIcon />}
        >
          {t("serviceButton")}
        </Button>

        {loaderData.task.acceptedUser.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              rowGap: "14px",
            }}
          >
            <Typography
              component="p"
              variant="Bold_14"
              sx={(theme) => ({
                color: theme.vars.palette["Black"],
              })}
            >
              {t("invitedSupervisors")}
            </Typography>
            {loaderData.task.acceptedUser.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  columnGap: "4px",

                  alignItems: "center",
                }}
              >
                <Avatar
                  src={`${import.meta.env.VITE_ASSET_PATH}${item.logo}`}
                  sx={{ width: "30px", height: "30px" }}
                />
                <Typography
                  component="p"
                  variant="Reg_14"
                  sx={(theme) => ({
                    color: theme.vars.palette["Black"],
                  })}
                >
                  {item.id}
                </Typography>
                <Typography
                  component="p"
                  variant="Reg_14"
                  sx={(theme) => ({
                    color: theme.vars.palette["Black"],
                  })}
                >
                  {item.email}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : null}

        <Button
          variant="outlined"
          disabled={loaderData.task.isNewOrder}
          startIcon={<AddIcon />}
          onClick={() => {
            setSearchSupervisors(true);
          }}
        >
          {t("supervisorButton")}
        </Button>

        <Box
          sx={(theme) => ({
            display: "grid",
            rowGap: "14px",
            position: "absolute",
            width: "100%",
            bottom: 0,
            left: 0,
            padding: "16px",
            backgroundColor: theme.vars.palette["White"],
          })}
        >
          <Button
            variant="text"
            disabled={loaderData.task.isNewOrder}
            onClick={() => {
              fetcher.submit(
                JSON.stringify({
                  _action: "_cancel",
                  orderId: loaderData.task.id,
                }),
                {
                  method: "POST",
                  encType: "application/json",
                }
              );
            }}
          >
            {t("cancelButton")}
          </Button>
          <Button
            variant="contained"
            disabled={
              loaderData.task.orderActivities.length === 0 &&
              loaderData.task.acceptedUser.length > 0
            }
            onClick={() => {
              fetcher.submit(
                JSON.stringify({
                  _action: "_save",
                  orderId: loaderData.task.id,
                  supervisorId: loaderData.task.acceptedUser[0].id,
                }),
                {
                  method: "POST",
                  encType: "application/json",
                }
              );
            }}
            startIcon={
              <LogoutIcon
                sx={{
                  transform: "rotate(-90deg)",
                }}
              />
            }
          >
            {t("sendButton")}
          </Button>
        </Box>
      </Box>

      <Dialog
        open={activityToDelete ? true : false}
        onClose={() => {
          setActivityToDelete(null);
        }}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "8px",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "400",
            fontSize: "1.125rem",
          }}
        >
          {t("dialog.title")}&nbsp;"{activityToDelete?.name}"&nbsp;?
        </DialogTitle>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setActivityToDelete(null);
            }}
          >
            {t("dialog.no")}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              fetcher.submit(
                JSON.stringify({
                  _action: "_delete",
                  orderId: loaderData.task.id,
                  orderActivityId: activityToDelete?.id,
                }),
                {
                  method: "POST",
                  encType: "application/json",
                }
              );
              setActivityToDelete(null);
            }}
          >
            {t("dialog.yes")}
          </Button>
        </DialogActions>
      </Dialog>

      <SwipeableDrawer
        open={searchSupervisors}
        onClose={() => {
          resetSupervisor();
          setSearchSupervisors(false);
        }}
        onOpen={() => {}}
        disableBackdropTransition={true}
        disableSwipeToOpen={true}
        anchor="bottom"
        sx={{
          "& .MuiDrawer-paper": {
            borderRadius: "6px",
          },
        }}
      >
        <TopNavigation
          header={{
            text: t("supervisorHeader"),
            bold: false,
          }}
        />
        <form
          onSubmit={handleSupervisorSubmit(() => {
            const selectedSupervisors = getValuesSupervisor("supervisors");

            fetcher.submit(
              JSON.stringify({
                _action: "_inviteSupervisors",
                supervisors: selectedSupervisors,
              }),
              {
                method: "POST",
                encType: "application/json",
              }
            );

            resetSupervisor();
            setSearchSupervisors(false);
          })}
        >
          <Box
            sx={{
              position: "relative",
              display: "grid",
              alignContent: "flex-start",
              rowGap: "14px",
              paddingTop: "20px",
              paddingLeft: "16px",
              paddingRight: "16px",
              height: "85vh",
            }}
          >
            <Controller
              name="searchbar"
              control={controlSupervisor}
              render={({ field }) => (
                <StyledSearchBar
                  placeholder={t("fields.supervisorSearchPlaceholder")}
                  {...field}
                  onChange={(evt) => {
                    const currentFieldValue = new RegExp(
                      `^${evt.target.value}`,
                      "i"
                    );

                    let matchingSupervisors: typeof loaderData.supervisorsToSelect =
                      [];

                    if (evt.target.value !== "") {
                      matchingSupervisors = [
                        ...selectedSupervisors.filter((item) =>
                          currentFieldValue.test(item.label)
                        ),
                      ];
                    } else {
                      matchingSupervisors = [...loaderData.supervisorsToSelect];
                    }

                    setSelectedSupervisors(matchingSupervisors);

                    field.onChange(evt);
                  }}
                />
              )}
            />

            <Controller
              name="supervisors"
              control={controlSupervisor}
              render={({ field }) => (
                <StyledCheckboxMultiple
                  inputType="checkboxMultiple"
                  onImmediateChange={() => {}}
                  options={selectedSupervisors}
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
              <Button type="submit" variant="contained" startIcon={<AddIcon />}>
                {t("supervisorInviteButton")}
              </Button>
            </Box>
          </Box>
        </form>
      </SwipeableDrawer>
    </>
  );
}
