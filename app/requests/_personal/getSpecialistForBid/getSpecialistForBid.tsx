import { http, delay, HttpResponse } from "msw";

import {
  getSpecialistForBidSuccessSchema,
  GetSpecialistForBidSuccess,
} from "./getSpecialistForBidSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const getSpecialistForBidKeys = ["getSpecialistForBid"];

export const getSpecialistForBid = async (
  accessToken: string,
  bidId: string,
): Promise<GetSpecialistForBidSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_SPECIALIST_FOR_BID);

    url.searchParams.append("bidId", bidId);

    const request = await fetch(url, {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const response = await request.json();

    let data;

    if (request.status === 401 || request.status === 403) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    const parsed = getSpecialistForBidSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса getSpecialistForBid не валидны схеме`);
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
export const mockResponseSuccess: GetSpecialistForBidSuccess = {
  "data": [
      {
          "id": 409,
          "phone": 79881234567,
          "email": "tt@mail.ru",
          "logo": "/storage/source/userImg/409/lvQA2xIcemehfKaMFIqM.jpeg",
          "roles": [
              {
                  "id": 5,
                  "name": "specialist"
              }
          ],
          "radius": "2",
          "name": "Тестовый Супервайзер",
          "age": "22",
          "country": "РОССИЯ",
          "viewActivities": [
              "Курьер  (Физическое лицо)",
              "Пекарь (Физическое лицо)",
              "Продавец  (Физическое лицо)"
          ],
          "viewActivitiesAccurate": true
      },
      {
          "id": 414,
          "phone": 79885555555,
          "email": "test555@mail.ru",
          "logo": "/storage/source/userImg/414/9Lp4FMi61rhLi5R0E3Hz.jpeg",
          "roles": [
              {
                  "id": 5,
                  "name": "specialist"
              }
          ],
          "radius": "10",
          "name": "Тестия Наргиз",
          "age": "23",
          "country": "РОССИЯ",
          "viewActivities": [
              "Курьер  (Физическое лицо)",
              "Пекарь (Физическое лицо)",
              "Продавец  (Физическое лицо)"
          ],
          "viewActivitiesAccurate": true
      },
      {
          "id": 531,
          "phone": 79883030300,
          "email": "spetctestpeter@mail.ru",
          "logo": "/storage/source/userImg/531/Ev9h9x4ZIDqVM9GhNcrw.jpeg",
          "roles": [
              {
                  "id": 5,
                  "name": "specialist"
              }
          ],
          "radius": "5",
          "name": "Сорока Борис Леонидович",
          "age": "30",
          "country": "РОССИЯ",
          "viewActivities": [
              "Курьер  (Физическое лицо)",
              "Пекарь (Физическое лицо)",
              "Продавец  (Физическое лицо)"
          ],
          "viewActivitiesAccurate": false
      },
      {
          "id": 548,
          "phone": 79007777777,
          "email": "maikal2@mail.ru",
          "logo": "/storage/source/userImg/548/Zq1xVUvHgfGfuzaoIRm4.jpeg",
          "roles": [
              {
                  "id": 5,
                  "name": "specialist"
              }
          ],
          "radius": "3",
          "name": "Нетестовый Михаил Дмитриевич",
          "age": "30",
          "country": "РОССИЯ",
          "viewActivities": [
              "Курьер  (Физическое лицо)",
              "Пекарь (Физическое лицо)",
              "Продавец  (Физическое лицо)"
          ],
          "viewActivitiesAccurate": true
      },
      {
          "id": 582,
          "phone": 79891111111,
          "email": "gorbanma@ya.ru",
          "logo": "/storage/source/userImg/582/D2nqSfzaUJRzP2Rn2pgK.jpeg",
          "roles": [
              {
                  "id": 5,
                  "name": "specialist"
              }
          ],
          "radius": "4",
          "name": "Горбань Мария Александровна",
          "age": "39",
          "country": "РОССИЯ",
          "viewActivities": [
              "Курьер  (Физическое лицо)",
              "Пекарь (Физическое лицо)",
              "Продавец  (Физическое лицо)"
          ],
          "viewActivitiesAccurate": false
      },
      {
          "id": 613,
          "phone": 79181111111,
          "email": "spetcoskol@ya.ru",
          "logo": "/storage/source/userImg/613/AnWoXnyoHIXqURWtx3Zw.jpeg",
          "roles": [
              {
                  "id": 5,
                  "name": "specialist"
              }
          ],
          "radius": "5",
          "name": "Осколкова Анастасия Валерьевна",
          "age": "27",
          "country": "РОССИЯ",
          "viewActivities": [
              "Курьер  (Физическое лицо)",
              "Пекарь (Физическое лицо)",
              "Продавец  (Физическое лицо)"
          ],
          "viewActivitiesAccurate": false
      },
      {
          "id": 614,
          "phone": 79182222222,
          "email": "spestnagor@ya.ru",
          "logo": "/storage/source/userImg/614/d00OuXybHLTUxOeMz9e5.jpeg",
          "roles": [
              {
                  "id": 5,
                  "name": "specialist"
              }
          ],
          "radius": "5",
          "name": "Нагорный Никита Владимирович",
          "age": "28",
          "country": "РОССИЯ",
          "viewActivities": [
              "Пекарь (Физическое лицо)",
              "Курьер  (Физическое лицо)",
              "Продавец  (Физическое лицо)"
          ],
          "viewActivitiesAccurate": false
      },
      {
          "id": 615,
          "phone": 79183333333,
          "email": "spetcbond@ya.ru",
          "logo": "/storage/source/userImg/615/JL47rfFIbe19OlTn4tD7.jpeg",
          "roles": [
              {
                  "id": 5,
                  "name": "specialist"
              }
          ],
          "radius": "5",
          "name": "Бондарева Вера Алексеевна",
          "age": "32",
          "country": "РОССИЯ",
          "viewActivities": [
              "Пекарь (Физическое лицо)",
              "Курьер  (Физическое лицо)",
              "Продавец  (Физическое лицо)"
          ],
          "viewActivitiesAccurate": false
      },
      {
          "id": 616,
          "phone": 79885552211,
          "email": "testspec@mail.ru",
          "logo": "/storage/source/userImg/616/SzyvZHmwVno2BwG47GY8.jpeg",
          "roles": [
              {
                  "id": 5,
                  "name": "specialist"
              }
          ],
          "radius": "5",
          "name": "Бусоргин Артем",
          "age": "23",
          "country": "РОССИЯ",
          "viewActivities": [
              "Курьер  (Физическое лицо)",
              "Пекарь (Физическое лицо)"
          ],
          "viewActivitiesAccurate": false
      },
      {
          "id": 621,
          "phone": 79284510000,
          "email": "testspec11@mail.ru",
          "logo": "/storage/source/userImg/621/MLF42w0ET74AFhCTODz7.jpeg",
          "roles": [
              {
                  "id": 5,
                  "name": "specialist"
              },
              {
                  "id": 6,
                  "name": "supervisor"
              }
          ],
          "radius": "5",
          "name": "Берез Алексей",
          "age": "24",
          "country": "РОССИЯ",
          "viewActivities": [
              "Курьер  (Физическое лицо)",
              "Пекарь (Физическое лицо)",
              "Продавец  (Физическое лицо)"
          ],
          "viewActivitiesAccurate": false
      },
      {
          "id": 624,
          "phone": 79184444444,
          "email": "spetckryk@ya.ru",
          "logo": "/storage/source/userImg/624/b2gR5sYmoAoUT61mBQJx.jpeg",
          "roles": [
              {
                  "id": 5,
                  "name": "specialist"
              }
          ],
          "radius": "5",
          "name": "Крюков Никита Валерьевич",
          "age": "40",
          "country": "РОССИЯ",
          "viewActivities": [
              "Курьер  (Физическое лицо)",
              "Пекарь (Физическое лицо)",
              "Продавец  (Физическое лицо)"
          ],
          "viewActivitiesAccurate": false
      },
      {
          "id": 625,
          "phone": 79185555555,
          "email": "spetcllii1@ya.ru",
          "logo": "/storage/source/userImg/625/D8Pnc82wuWanvy90NR1Y.jpeg",
          "roles": [
              {
                  "id": 5,
                  "name": "specialist"
              }
          ],
          "radius": "5",
          "name": "Ахаимова Лилия Игор",
          "age": "28",
          "country": "РОССИЯ",
          "viewActivities": [
              "Курьер  (Физическое лицо)",
              "Пекарь (Физическое лицо)",
              "Продавец  (Физическое лицо)"
          ],
          "viewActivitiesAccurate": false
      },
      {
          "id": 626,
          "phone": 79186666666,
          "email": "spetcvika@ya.ru",
          "logo": "/storage/source/userImg/626/JumeVC21BPnoqgH4je48.jpeg",
          "roles": [
              {
                  "id": 5,
                  "name": "specialist"
              }
          ],
          "radius": "5",
          "name": "Жмыхова Виктория Николаевна",
          "age": "26",
          "country": "РОССИЯ",
          "viewActivities": [
              "Курьер  (Физическое лицо)",
              "Пекарь (Физическое лицо)",
              "Продавец  (Физическое лицо)"
          ],
          "viewActivitiesAccurate": false
      },
      {
          "id": 630,
          "phone": 79280045698,
          "email": "test233@mail.ru",
          "logo": "/storage/source/userImg/630/p9Bh5HNSDB1wge7XDUUB.avifjpeg",
          "roles": [
              {
                  "id": 5,
                  "name": "specialist"
              }
          ],
          "radius": "10",
          "name": "БЕРЕЗКИН Виталий",
          "age": "41",
          "country": "РОССИЯ",
          "viewActivities": [
              "Пекарь (Физическое лицо)",
              "Курьер  (Физическое лицо)"
          ],
          "viewActivitiesAccurate": false
      },
      {
          "id": 693,
          "phone": 79280122030,
          "email": "tes452@mail.ru",
          "logo": "/storage/source/userImg/693/TBKFmTZraOyC0K2M1S1C.jpeg",
          "roles": [
              {
                  "id": 5,
                  "name": "specialist"
              }
          ],
          "radius": "5",
          "name": "Ntcn TEST",
          "age": "25",
          "country": "РОССИЯ",
          "viewActivities": [
              "Курьер  (Физическое лицо)",
              "Пекарь (Физическое лицо)",
              "Продавец  (Физическое лицо)"
          ],
          "viewActivitiesAccurate": false
      },
      {
          "id": 699,
          "phone": 79280054454,
          "email": "tes707@mail.ru",
          "logo": "/storage/source/userImg/699/z8hWfLABL7X2a6phv653.jpeg",
          "roles": [
              {
                  "id": 5,
                  "name": "specialist"
              }
          ],
          "radius": "5",
          "name": "М Сара",
          "age": "26",
          "country": "РОССИЯ",
          "viewActivities": [
              "Курьер  (Физическое лицо)",
              "Пекарь (Физическое лицо)",
              "Продавец  (Физическое лицо)"
          ],
          "viewActivitiesAccurate": false
      },
      {
          "id": 700,
          "phone": 79884501010,
          "email": "tes78544@mail.ru",
          "logo": "/storage/source/userImg/700/AMcAgUlzWTjNnZFn1hmF.jpeg",
          "roles": [
              {
                  "id": 5,
                  "name": "specialist"
              }
          ],
          "radius": "5",
          "name": "H Елена",
          "age": "26",
          "country": "РОССИЯ",
          "viewActivities": [
              "Курьер  (Физическое лицо)",
              "Пекарь (Физическое лицо)",
              "Продавец  (Физическое лицо)"
          ],
          "viewActivitiesAccurate": false
      },
      {
          "id": 702,
          "phone": 79884512322,
          "email": "tesdddd@mail.ru",
          "logo": "/storage/source/userImg/702/aqL1UE59pONBbap9DKpP.jpeg",
          "roles": [
              {
                  "id": 5,
                  "name": "specialist"
              }
          ],
          "radius": "5",
          "name": "тест тест",
          "age": "21",
          "country": "КИТАЙ",
          "viewActivities": [
              "Курьер  (Физическое лицо)",
              "Продавец  (Физическое лицо)",
              "Пекарь (Физическое лицо)"
          ],
          "viewActivitiesAccurate": false
      },
      {
          "id": 715,
          "phone": 79632013113,
          "email": "test98@mail.ru",
          "logo": "/storage/source/userImg/715/DPJgH8w7HIbxbPrgu1Tc.jpeg",
          "roles": [
              {
                  "id": 5,
                  "name": "specialist"
              }
          ],
          "radius": "15",
          "name": "РАДУЖНАЯ ТЕСТ",
          "age": "26",
          "country": "РОССИЯ",
          "viewActivities": [
              "Курьер  (Физическое лицо)",
              "Пекарь (Физическое лицо)",
              "Продавец  (Физическое лицо)"
          ],
          "viewActivitiesAccurate": false
      }
  ]
};

export const mockResponseError = {};

export const getSpecialistForBidMockResponse = http.get(
  `${import.meta.env.VITE_GET_SPECIALIST_FOR_BID}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
