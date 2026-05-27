import type { Route } from './+types/jobs';


import { useTranslation } from "react-i18next";
import { loadNamespaces } from 'i18next';


import { EntitiesListView } from "~/shared/views/EntitiesListView/EntitiesListView";

import { Dialog, Box, IconButton, Typography } from '@mui/material';
import { EntityCard } from "~/shared/ui/EntityCard/EntityCard";
import { Loader } from "~/shared/ui/Loader/Loader";
import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";

import CloseIcon from "@mui/icons-material/Close";

import { MapIcon } from "~/shared/icons/MapIcon";
import { ListIcon } from "~/shared/ui/Menu/icons/ListIcon";

import { signinJobsContainer } from "./jobs.module";
import { SigninJobsTokens } from "./jobs.tokens";
import { Job, SigninJobsMapper } from "./jobs.mapper";


import { useAppHooks } from '~/shared/hooks/app.hooks';
import { useSigninJobsHooks } from './jobs.hooks';


export async function clientLoader() {
    await loadNamespaces("HomeLayout");

    const data = await signinJobsContainer.get(SigninJobsTokens.jobService).getPublicJobs();

    return SigninJobsMapper.mapDataToJobs(data.data);
}

export default function SigninJobs({ loaderData }: Route.ComponentProps) {
  const { t } = useTranslation("jobs");

  const { isLoading } = useAppHooks();
  const { mapView, setMapView, activeCard, openDialog, closeDialog } = useSigninJobsHooks();

  return (
    <>
        {isLoading ? <Loader /> : null}

        <TopNavigation
            header={{
            text: t("header", {ns: 'HomeLayout'}),
            bold: false,
            }}
            // buttonAction={{
            // text: mapView ? t("headerListAction",{ns: 'HomeLayout'}) : t("headerMapAction", {ns: 'HomeLayout'}),
            // icon: mapView ? (
            //     <ListIcon
            //     sx={{
            //         width: "15px",
            //         height: "15px",
            //     }}
            //     />
            // ) : (
            //     <MapIcon
            //     sx={{
            //         width: "15px",
            //         height: "15px",
            //     }}
            //     />
            // ),
            // action: () => {
            //     setMapView(!mapView);
            // },
            // }}
            style={{
            position: "relative",
            boxShadow: "none",
            zIndex: 1,
            }}
        />


        <EntitiesListView
            translation="jobs"
            mapView={false}
            entities={loaderData}
            entityType="job"
            sorting="descending"
            entityListView={(entity) => (
                <Box onClick={() => {
                    openDialog(entity as Job)
                }}>
                    <EntityCard
                    key={entity.id + entity.userId}
                    status={
                        entity.status === 1 || entity.status === 4
                        ? t("bidStatus")
                        : t("jobStatus")
                    }
                    statusColor={entity.statusColor}
                    header={entity.header}
                    subHeader={{
                        text: t("amount", {
                        price: entity.subHeader,
                        curency: entity.currency,
                        measure: entity.units,
                        }),
                        bold: true,
                    }}
                    id={entity.id.toString()}
                    address={entity.address}
                    duration={entity.duration}
                    />
                </Box>
            )}
            entityMapView={(entity) => (
                <Box onClick={() => {
                    openDialog(entity as Job)
                }}>
                <EntityCard
                status={
                    entity.status === 1 || entity.status === 4
                    ? t("bidStatus")
                    : t("jobStatus")
                }
                header={`${t("cardHeader")} ${entity.header}`}
                subHeader={{
                    text: t("amount", {
                    price: entity.subHeader,
                    curency: entity.currency,
                    measure: entity.units,
                    }),
                    bold: true,
                }}
                id={entity.id.toString()}
                address={entity.address}
                duration={entity.duration}
                />
                </Box>
            )}
        />

        <Dialog
        open={activeCard ? true : false}
        onClose={closeDialog}
        sx={{
          "& .MuiPaper-root": {
            marginRight: "16px",
            marginLeft: "16px",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          },
        }}
      >
        <Box>
            <Box
              sx={{
                position: "relative",
                marginBottom: "16px",
                height: "176px",
                width: "100%",
                overflow: "hidden",
              }}
            >
              <IconButton
                sx={(theme) => ({
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  width: "18px",
                  height: "18px",
                  backgroundColor: theme.vars.palette["Grey_3"],
                })}
                onClick={closeDialog}
              >
                <CloseIcon
                  sx={(theme) => ({
                    width: "14px",
                    height: "14px",
                    color: theme.vars.palette["White"],
                  })}
                />
              </IconButton>

              <img
                src={activeCard?.viewActivityLogo}
                alt="checkbox banner"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            <Box
              sx={{
                display: "grid",
                rowGap: "8px",
                padding: "16px",
                paddingBottom: "32px",
              }}
            >
              <Typography
                component="p"
                variant="Bold_18"
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                })}
              >
                {activeCard?.viewActivityText}
              </Typography>

              <Typography
                component="p"
                variant="Reg_14"
                sx={(theme) => ({
                  color: theme.vars.palette["Black"],
                })}
              >
                {activeCard?.viewActivityDescription}
              </Typography>
            </Box>
          </Box>
      </Dialog>
    </>
  );
}
