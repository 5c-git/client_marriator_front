import type { PolygonGeometry } from "ymaps3";
import { circle } from "@turf/turf";

declare global {
  interface Window {
    ymaps3: typeof ymaps3 | undefined;
  }
}

export type Coordinates = [lon: number, lat: number];

export const langMap = {
  ru: "ru_RU",
  en: "en_RU",
};

export const loadMap = async (locale: string): Promise<typeof ymaps3> => {
  return new Promise((resolve) => {
    if (window.ymaps3 === undefined) {
      // Create script element and set attributes
      const script = document.createElement("script");
      script.type = "text/javascript";

      script.id = "ymapsScript";
      script.src = `https://api-maps.yandex.ru/v3/?apikey=${
        import.meta.env.VITE_YANDEX_GEO_KEY
      }&lang=${locale}`;

      // Append the script to the DOM
      const el = document.getElementsByTagName("script")[0];
      const parentNode = el.parentNode as ParentNode;
      parentNode.insertBefore(script, el);

      // Wait for script to load, then resolve the promise
      script.onload = async () => {
        await ymaps3.ready;
        resolve(ymaps3);
      };
    } else {
      resolve(ymaps3);
    }
  });
};

export const getCircleGeoJSON = (
  center: Coordinates,
  radiusMeters: number
): PolygonGeometry => {
  const { geometry } = circle(center, radiusMeters, {
    units: "kilometers",
  });
  return geometry as PolygonGeometry;
};
