import { renderToStaticMarkup } from "react-dom/server";
import type { PolygonGeometry } from "ymaps3";
import { circle } from "@turf/turf";

declare global {
  interface Window {
    ymaps3: typeof ymaps3 | undefined;
  }
}

export const langMap = {
  ru: "ru_RU",
  en: "en_RU",
};

export const getCircleGeoJSON = (
  center: [lon: number, lat: number],
  radiusMeters: number,
): PolygonGeometry => {
  const { geometry } = circle(center, radiusMeters, {
    units: "kilometers",
  });
  return geometry as PolygonGeometry;
};

export const renderIcon = (image: string, borderColor: string) => {
  return renderToStaticMarkup(
    <div
      style={{
        position: "absolute",
        left: "-50%",
        top: "-50%",
        width: "41px",
        height: "41px",
        border: "5px solid",
        borderRadius: "50%",
        overflow: "hidden",
        borderColor: borderColor,
      }}
    >
      <img
        src={image}
        style={{
          // position: "relative",
          height: "100%",
          width: "100%",
          objectFit: "cover",
        }}
        alt="shop logo"
      />
    </div>,
  );
};

export const renderClusterCounter = (count: number, color: string) => {
  return renderToStaticMarkup(
    <div
      style={{
        position: "absolute",
        left: "-50%",
        top: "-50%",
        width: "60px",
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        overflow: "hidden",
        backgroundColor: color,
        color: "white",
      }}
    >
      <span
        style={{
          fontSize: "18px",
          fontWeight: "700",
        }}
      >
        {count}
      </span>
    </div>,
  );
};
