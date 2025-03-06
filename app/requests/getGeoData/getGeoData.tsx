import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import getGeoDataSuccess from "./getGeoDataSuccess.schema.json";
import { GetGeoDataSuccess } from "./getGeoDataSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(getGeoDataSuccess);

export const getGeoDataKeys = ["getGeoData"];

export const getGeoData = async (
  geoData: string
): Promise<GetGeoDataSuccess> => {
  try {
    const url = new URL(
      `https://geocode-maps.yandex.ru/1.x/?apikey=${
        import.meta.env.VITE_YANDEX_GEO_KEY
      }&geocode=${geoData}&results=1&format=json`
    );

    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await request.json();

    let data;

    if (request.status > 299 && request.status < 200) {
      throw new Response(`Указан неверный адрес или координаты`);
    }

    if (validateSuccess(response)) {
      data = response as unknown as GetGeoDataSuccess;
    } else {
      console.log(validateSuccess.errors);
      throw new Response(`Данные запроса getGeoData не валидны схеме`);
    }

    return data;
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }

    if (error instanceof Error) {
      throw new UnxpectedError(error.message);
    } else {
      throw new UnxpectedError("Unknown unexpected error");
    }
  }
};

// MOCKS
export const mockResponseSuccess = {
  response: {
    GeoObjectCollection: {
      metaDataProperty: {
        GeocoderResponseMetaData: {
          request: "бульвар Мухаммед Бин Рашид 1",
          results: "1",
          found: "1",
        },
      },
      featureMember: [
        {
          GeoObject: {
            metaDataProperty: {
              GeocoderMetaData: {
                precision: "exact",
                text: "1, Мухаммед Бин Рашид бульвар, Даунтаун Дубай, эмират Дубай, Объединенные Арабские Эмираты",
                kind: "house",
                Address: {
                  country_code: "AE",
                  formatted:
                    "1, Мухаммед Бин Рашид бульвар, Даунтаун Дубай, эмират Дубай, Объединенные Арабские Эмираты",
                  Components: [
                    {
                      kind: "country",
                      name: "Объединенные Арабские Эмираты",
                    },
                    {
                      kind: "province",
                      name: "эмират Дубай",
                    },
                    {
                      kind: "area",
                      name: "Сектор 3",
                    },
                    {
                      kind: "district",
                      name: "Даунтаун Дубай",
                    },
                    {
                      kind: "district",
                      name: "Даунтаун Дубай",
                    },
                    {
                      kind: "street",
                      name: "Мухаммед Бин Рашид бульвар",
                    },
                    {
                      kind: "house",
                      name: "1",
                    },
                  ],
                },
                AddressDetails: {
                  Country: {
                    AddressLine:
                      "1, Мухаммед Бин Рашид бульвар, Даунтаун Дубай, эмират Дубай, Объединенные Арабские Эмираты",
                    CountryNameCode: "AE",
                    CountryName: "Объединенные Арабские Эмираты",
                    AdministrativeArea: {
                      AdministrativeAreaName: "эмират Дубай",
                      SubAdministrativeArea: {
                        SubAdministrativeAreaName: "Сектор 3",
                        Locality: {
                          DependentLocality: {
                            DependentLocalityName: "Даунтаун Дубай",
                            DependentLocality: {
                              DependentLocalityName: "Даунтаун Дубай",
                              Thoroughfare: {
                                ThoroughfareName: "Мухаммед Бин Рашид бульвар",
                                Premise: {
                                  PremiseNumber: "1",
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            name: "1, Мухаммед Бин Рашид бульвар",
            description:
              "Даунтаун Дубай, эмират Дубай, Объединенные Арабские Эмираты",
            boundedBy: {
              Envelope: {
                lowerCorner: "55.270141 25.193445",
                upperCorner: "55.278352 25.200915",
              },
            },
            uri: "ymapsbm1://geo?data=CgoyMTE3NTQxODgxEocB2KfZhNil2YXYp9ix2KfYqiDYp9mE2LnYsdio2YrYqSDYp9mE2YXYqtit2K_YqSwg2KXZhdin2LHYqSDYr9io2YosINmI2LPYtyDZhdiv2YrZhtipINiv2KjZiiwg2KjZiNmE2YrZgdin2LHYryDZhdit2YXYryDYqNmGINix2KfYtNivLCAxIgoN1BhdQhXVk8lB",
            Point: {
              pos: "55.274247 25.19718",
            },
          },
        },
      ],
    },
  },
};

export const mockResponseError = {
  response: {
    GeoObjectCollection: {
      metaDataProperty: {
        GeocoderResponseMetaData: {
          request: "бульsdfвар Мухаdsfgdммед Бsdfgин Раggggшид 1",
          results: "1",
          found: "0",
        },
      },
      featureMember: [],
    },
  },
};

export const getGeoDataMockResponse = http.get(
  `https://geocode-maps.yandex.ru/1.x/?apikey=YOUR_API_KEY&geocode=бульвар+Мухаммед+Бин+Рашид+1&format=json`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
