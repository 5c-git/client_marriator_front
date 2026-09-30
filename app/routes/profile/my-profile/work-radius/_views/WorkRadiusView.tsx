import type { ChangeEvent } from "react";
import type { WorkRadiusFormValues } from "../work-radius.service";
import { Controller, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { TextField, Snackbar, Alert, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { TopNavigation } from "~/shared/ui/TopNavigation/TopNavigation";
import { MaskedField } from "~/shared/ui/MaskedField/MaskedField";

import { MarkerIcon } from "../icons/MarkerIcon";

import {
  YMap,
  YMapMarker,
  YMapFeature,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapListener,
  getCircleGeoJSON,
} from "~/shared/ymap/map";

type WorkRadiusViewProps = {
  form: UseFormReturn<WorkRadiusFormValues>;
  isMapGrayscale: boolean;
  fetcherError: 400 | 402 | 404 | null;
  onBack: () => void;
  onAddressChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onRadiusChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSnackbarClose: () => void;
  submitGeoData: (value: string, radius: string) => void;
  isActive: boolean;
  setIsActive: (value: boolean) => void;
  coordinates: [lon: number, lat: number];
  radius: string;
};

export function WorkRadiusView(props: WorkRadiusViewProps) {
  const { t } = useTranslation("m_profile_myProfile_workRadius");

  return (
    <>
      <Box>
        <TopNavigation
          header={{
            text: t("header"),
            bold: false,
          }}
          backAction={props.onBack}
        />

        <Box
          sx={{
            display: "grid",
            rowGap: "16px",
            paddingX: "16px",
            paddingTop: "20px",
          }}
        >
          <Box
            sx={{
              display: "grid",
              rowGap: "8px",
            }}
          >
            <Typography
              component="h1"
              variant="Reg_18"
              sx={(theme) => ({
                textAlign: "center",
                color: theme.vars.palette["Black"],
              })}
            >
              {t("header_text")}
            </Typography>

            <Typography
              component="p"
              variant="Reg_14"
              sx={(theme) => ({
                textAlign: "center",
                color: theme.vars.palette["Grey_2"],
              })}
            >
              {t("header_expl")}
            </Typography>
          </Box>

          <form
            style={{
              display: "grid",
              rowGap: "16px",
            }}
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <Controller
              name="address"
              control={props.form.control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("input_address")}
                  fullWidth
                  slotProps={{
                    input: {
                      endAdornment: (
                        <MarkerIcon
                          sx={(theme) => ({
                            color: theme.vars.palette["Grey_3"],
                          })}
                        />
                      ),
                    },
                  }}
                  onChange={(event) => {
                    field.onChange(event);
                    props.onAddressChange(event);
                  }}
                />
              )}
            />

            <Controller
              name="radius"
              control={props.form.control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("input_radius")}
                  slotProps={{
                    input: {
                      inputComponent: MaskedField as never,
                      inputProps: {
                        mask: "00",
                      },
                      inputMode: "numeric",
                      type: "tel",
                    },
                  }}
                  onChange={(event) => {
                    field.onChange(event);
                    props.onRadiusChange(event);
                  }}
                />
              )}
            />
          </form>

          <Box
            id="map"
            style={{
              "--filter": props.isMapGrayscale
                ? "grayscale(1)"
                : "grayscale(0)",
            }}
            sx={{
              height: "380px",
              borderRadius: "6px",
              overflow: "hidden",
              filter: "var(--filter)",
            }}
          >
            <YMap
              location={{
                center: props.coordinates,
                zoom: 12,
              }}
            >
              <YMapDefaultSchemeLayer />
              <YMapDefaultFeaturesLayer />
              <YMapListener
                onTouchStart={() => {
                  props.setIsActive(true);
                }}
                onClick={(_, event) => {
                  props.submitGeoData(
                    `${event.coordinates[0]},${event.coordinates[1]}`,
                    props.radius,
                  );
                }}
              />

              <YMapMarker coordinates={props.coordinates}>
                <MarkerIcon
                  style={{
                    position: "absolute",
                    left: "-8.5px",
                    top: "-20px",
                    color: "var(--mui-palette-Corp_1)",
                  }}
                />
              </YMapMarker>
              <YMapFeature
                geometry={getCircleGeoJSON(
                  props.coordinates,
                  Number(props.radius),
                )}
                style={{
                  simplificationRate: 0,
                  stroke: [{ color: "var(--mui-palette-Corp_1)", width: 3 }],
                  fill: "rgba(56, 56, 219, 0)",
                }}
              />
            </YMap>
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={props.fetcherError !== null}
        onClose={props.onSnackbarClose}
        autoHideDuration={3000}
      >
        <Alert
          severity="info"
          variant="small"
          color="Banner_Error"
          sx={{
            width: "100%",
          }}
        >
          {props.fetcherError === 400 ? t("error_400") : null}
          {props.fetcherError === 402 ? t("error_402") : null}
          {props.fetcherError === 404 ? t("error_404") : null}
        </Alert>
      </Snackbar>
    </>
  );
}
