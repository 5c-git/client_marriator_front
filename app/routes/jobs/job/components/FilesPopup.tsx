import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

import Box from "@mui/material/Box";
import { Dialog, Typography, Button } from "@mui/material";

import { useTranslation } from "react-i18next";

import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { AddFileIcon } from "./AddFileIcon";

// const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

export const FilesPopup = ({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (files: File[]) => void;
  // onSubmit: (files: string[]) => void;
}) => {
  const { t } = useTranslation("job");

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({
    defaultValues: {
      files: [],
    },
    resolver: zodResolver(
      z.object({
        files: z
          .array(
            z.object({
              file: z.instanceof(File),
            })
          )
          .min(4),
      })
    ),
  });

  const { fields, append, remove } = useFieldArray({
    name: "files",
    control,
  });

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const images: string[] = [],
      fileReaders: FileReader[] = [];
    let isCancel = false;
    if (fields.length) {
      fields.forEach((field) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          if (e.target?.result) {
            images.push(e.target?.result as string);
          }
          if (images.length === fields.length && !isCancel) {
            setImages(images);
          }
        };
        fileReader.readAsDataURL(field.file);
      });
    }
    return () => {
      isCancel = true;
      fileReaders.forEach((fileReader) => {
        if (fileReader.readyState === 1) {
          fileReader.abort();
        }
      });
    };
  }, [fields]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        reset();
        onClose();
      }}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "6px",
        },
      }}
    >
      <form
        onSubmit={handleSubmit((values) => {
          const files = values.files?.map((item) => item.file);

          onSubmit(files as File[]);
          // onSubmit(images);
        })}
      >
        <Box
          sx={{
            display: "grid",
            padding: "16px",
            rowGap: "8px",
          }}
        >
          <Typography
            component="p"
            variant="Reg_18"
            sx={(theme) => ({
              color: theme.vars.palette["Black"],
              paddingBottom: "16px",
            })}
          >
            {t("components.FilesPopup.header")}
          </Typography>

          <input
            type="file"
            multiple
            id="files"
            accept="image/png, image/jpeg, image/jpg"
            style={{
              display: "none",
            }}
            onChange={(event) => {
              if (event.target.files) {
                const uploadedFiles = Array.from(event.target.files).map(
                  (file) => ({
                    file,
                  })
                );
                append(uploadedFiles);
                event.target.value = "";
              }
            }}
          />

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {fields.map((field, index) => (
              <Box
                sx={{
                  height: "140px",
                  width: "80px",
                  borderRadius: "6px",
                  position: "relative",
                  overflow: "hidden",
                }}
                key={field.id}
              >
                <img
                  src={images[index]}
                  style={{
                    height: "140px",
                    width: "80px",
                    objectFit: "cover",
                  }}
                  alt={`Loaded image ${index} preview`}
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  style={{
                    width: "24px",
                    height: "24px",
                    backgroundColor: "var(--mui-palette-Grey_5)",
                    border: 0,
                    padding: 0,
                    borderRadius: "6px",
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                  }}
                >
                  <ClearIcon
                    sx={(theme) => ({
                      color: theme.vars.palette["Grey_2"],
                    })}
                  />
                </button>
              </Box>
            ))}
            <label
              htmlFor="files"
              style={{
                display: "block",
              }}
            >
              <AddFileIcon
                sx={(theme) => ({
                  width: "80px",
                  height: "140px",
                  color: theme.vars.palette["Corp_1"],
                })}
              />
            </label>
          </Box>

          <Button
            startIcon={<CheckIcon />}
            variant="contained"
            type="submit"
            disabled={!isValid}
            onClick={() => {}}
          >
            {t("components.FilesPopup.submitButton")}
          </Button>

          <Button
            variant="text"
            type="button"
            onClick={() => {
              reset();
              onClose();
            }}
          >
            {t("components.FilesPopup.cancelButton")}
          </Button>
        </Box>
      </form>
    </Dialog>
  );
};
