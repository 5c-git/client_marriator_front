import Resizer from "react-image-file-resizer";
// // @ts-expect-error https://github.com/onurzorluer/react-image-file-resizer/issues/68
// export const resizer: typeof Resizer = Resizer.default || Resizer;

export const resizeFile = (file: File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1024,
      768,
      "jpeg",
      50,
      0,
      (uri) => {
        resolve(uri);
      },
      "file",
    );
  });
