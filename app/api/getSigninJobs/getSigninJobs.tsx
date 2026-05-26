import { http, delay, HttpResponse } from "msw";

import { getSigninJobsSuccessSchema, GetSigninJobsSuccess } from "./getSigninJobsSuccess.schema";

import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const getSigninJobsKeys = ["getSigninJobs"];

export const getSigninJobs = async (): Promise<GetSigninJobsSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_SIGNIN_JOBS);

    const request = await fetch(url, {
      method: "GET",
      // headers: {
      //   // "Content-Type": "application/json",
      //   Authorization: `Bearer ${accessToken}`,
      // },
    });
    const response = await request.json();

    let data;

    if (request.status === 401 || request.status === 403) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    const parsed = getSigninJobsSuccessSchema.safeParse(response);

    if (parsed.success) {
      data = parsed.data;
    } else {
      console.log(parsed.error);
      throw new Response(`Данные запроса getSigninJobs не валидны схеме`);
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
export const mockResponseSuccess: GetSigninJobsSuccess = {
  "data": [
      {
          "id": 401,
          "place": {
              "id": 3,
              "name": "«Пятёрочка» на Арбате д. 24  г.Москва",
              "latitude": "55.75007900",
              "longitude": "37.59217700",
              "address_kladr": "ул. Арбат д. 24  г.Москва",
              "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 1,
                  "name": "Пятёрочка",
                  "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                  "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
              }
          },
          "price": 3000,
          "viewActivity": {
              "id": 7,
              "name": "Фотограф (самозанятый)",
              "detailName": "Фотограф (самозанятый)",
              "previewText": "Фотограф на свадьбы, корпоративы, дни рождения",
              "logo": "/storage/source/directory/view_activities/7-img/фото.jpg",
              "traveling": true,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2026-05-26T07:00:00.000000Z",
          "dateEnd": "2026-05-26T15:00:00.000000Z",
          "project": {
              "id": 1,
              "name": "Договор на оказание услуг Пятёрочка",
              "dateStart": "2025-12-09T00:00:00.000000Z",
              "dateEnd": "2026-12-31T00:00:00.000000Z",
              "timeStart": "09:00",
              "timeEnd": "21:00",
              "brand": [
                  {
                      "id": 1,
                      "name": "Пятёрочка",
                      "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                      "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
                  }
              ]
          }
      },
      {
          "id": 381,
          "place": {
              "id": 3,
              "name": "«Пятёрочка» на Арбате д. 24  г.Москва",
              "latitude": "55.75007900",
              "longitude": "37.59217700",
              "address_kladr": "ул. Арбат д. 24  г.Москва",
              "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 1,
                  "name": "Пятёрочка",
                  "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                  "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
              }
          },
          "price": 3500,
          "viewActivity": {
              "id": 4,
              "name": "Пекарь (самозанятый)",
              "detailName": "Пекарь (самозанятый)",
              "previewText": "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
              "logo": "/storage/source/directory/view_activities/4-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
              "traveling": false,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2026-04-30T06:00:00.000000Z",
          "dateEnd": "2026-05-01T18:00:00.000000Z",
          "project": {
              "id": 1,
              "name": "Договор на оказание услуг Пятёрочка",
              "dateStart": "2025-12-09T00:00:00.000000Z",
              "dateEnd": "2026-12-31T00:00:00.000000Z",
              "timeStart": "09:00",
              "timeEnd": "21:00",
              "brand": [
                  {
                      "id": 1,
                      "name": "Пятёрочка",
                      "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                      "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
                  }
              ]
          }
      },
      {
          "id": 370,
          "place": {
              "id": 3,
              "name": "«Пятёрочка» на Арбате д. 24  г.Москва",
              "latitude": "55.75007900",
              "longitude": "37.59217700",
              "address_kladr": "ул. Арбат д. 24  г.Москва",
              "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 1,
                  "name": "Пятёрочка",
                  "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                  "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
              }
          },
          "price": 3500,
          "viewActivity": {
              "id": 4,
              "name": "Пекарь (самозанятый)",
              "detailName": "Пекарь (самозанятый)",
              "previewText": "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
              "logo": "/storage/source/directory/view_activities/4-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
              "traveling": false,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2026-04-21T06:30:00.000000Z",
          "dateEnd": "2026-04-21T08:30:00.000000Z",
          "project": {
              "id": 1,
              "name": "Договор на оказание услуг Пятёрочка",
              "dateStart": "2025-12-09T00:00:00.000000Z",
              "dateEnd": "2026-12-31T00:00:00.000000Z",
              "timeStart": "09:00",
              "timeEnd": "21:00",
              "brand": [
                  {
                      "id": 1,
                      "name": "Пятёрочка",
                      "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                      "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
                  }
              ]
          }
      },
      {
          "id": 356,
          "place": {
              "id": 3,
              "name": "«Пятёрочка» на Арбате д. 24  г.Москва",
              "latitude": "55.75007900",
              "longitude": "37.59217700",
              "address_kladr": "ул. Арбат д. 24  г.Москва",
              "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 1,
                  "name": "Пятёрочка",
                  "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                  "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
              }
          },
          "price": 1500,
          "viewActivity": {
              "id": 2,
              "name": "Курьер  (Физическое лицо)",
              "detailName": "Курьер  (Физическое лицо)",
              "previewText": "Доставка под разные задачи, быстрая курьерская доставка",
              "logo": "/storage/source/directory/view_activities/2-img/1675359703_www-funnyart-club-p-kurer-prikol-vkontakte-61.jpg",
              "traveling": true,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2026-04-11T06:00:00.000000Z",
          "dateEnd": "2026-04-11T09:31:00.000000Z",
          "project": {
              "id": 1,
              "name": "Договор на оказание услуг Пятёрочка",
              "dateStart": "2025-12-09T00:00:00.000000Z",
              "dateEnd": "2026-12-31T00:00:00.000000Z",
              "timeStart": "09:00",
              "timeEnd": "21:00",
              "brand": [
                  {
                      "id": 1,
                      "name": "Пятёрочка",
                      "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                      "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
                  }
              ]
          }
      },
      {
          "id": 350,
          "place": {
              "id": 3,
              "name": "«Пятёрочка» на Арбате д. 24  г.Москва",
              "latitude": "55.75007900",
              "longitude": "37.59217700",
              "address_kladr": "ул. Арбат д. 24  г.Москва",
              "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 1,
                  "name": "Пятёрочка",
                  "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                  "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
              }
          },
          "price": 1500,
          "viewActivity": {
              "id": 2,
              "name": "Курьер  (Физическое лицо)",
              "detailName": "Курьер  (Физическое лицо)",
              "previewText": "Доставка под разные задачи, быстрая курьерская доставка",
              "logo": "/storage/source/directory/view_activities/2-img/1675359703_www-funnyart-club-p-kurer-prikol-vkontakte-61.jpg",
              "traveling": true,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2026-04-09T13:00:00.000000Z",
          "dateEnd": "2026-04-09T15:00:00.000000Z",
          "project": {
              "id": 1,
              "name": "Договор на оказание услуг Пятёрочка",
              "dateStart": "2025-12-09T00:00:00.000000Z",
              "dateEnd": "2026-12-31T00:00:00.000000Z",
              "timeStart": "09:00",
              "timeEnd": "21:00",
              "brand": [
                  {
                      "id": 1,
                      "name": "Пятёрочка",
                      "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                      "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
                  }
              ]
          }
      },
      {
          "id": 309,
          "place": {
              "id": 18,
              "name": "«Пятёрочка» на Садовой-Триумфальной",
              "latitude": "55.77191000",
              "longitude": "37.60406200",
              "address_kladr": "Садовая-Триумфальная ул., д. 22/31,  г.Москва",
              "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 1,
                  "name": "Пятёрочка",
                  "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                  "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
              }
          },
          "price": 1500,
          "viewActivity": {
              "id": 4,
              "name": "Пекарь (самозанятый)",
              "detailName": "Пекарь (самозанятый)",
              "previewText": "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
              "logo": "/storage/source/directory/view_activities/4-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
              "traveling": false,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2026-03-12T06:00:00.000000Z",
          "dateEnd": "2026-03-13T12:00:00.000000Z",
          "project": {
              "id": 12,
              "name": "78412552 Пятерочка",
              "dateStart": "2026-01-20T00:00:00.000000Z",
              "dateEnd": "2026-12-30T00:00:00.000000Z",
              "timeStart": "09:00",
              "timeEnd": "21:00",
              "brand": [
                  {
                      "id": 1,
                      "name": "Пятёрочка",
                      "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                      "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
                  }
              ]
          }
      },
      {
          "id": 304,
          "place": {
              "id": 3,
              "name": "«Пятёрочка» на Арбате д. 24  г.Москва",
              "latitude": "55.75007900",
              "longitude": "37.59217700",
              "address_kladr": "ул. Арбат д. 24  г.Москва",
              "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 1,
                  "name": "Пятёрочка",
                  "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                  "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
              }
          },
          "price": 400,
          "viewActivity": {
              "id": 4,
              "name": "Пекарь (самозанятый)",
              "detailName": "Пекарь (самозанятый)",
              "previewText": "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
              "logo": "/storage/source/directory/view_activities/4-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
              "traveling": false,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2026-03-11T07:00:00.000000Z",
          "dateEnd": "2026-03-12T15:00:00.000000Z",
          "project": {
              "id": 1,
              "name": "Договор на оказание услуг Пятёрочка",
              "dateStart": "2025-12-09T00:00:00.000000Z",
              "dateEnd": "2026-12-31T00:00:00.000000Z",
              "timeStart": "09:00",
              "timeEnd": "21:00",
              "brand": [
                  {
                      "id": 1,
                      "name": "Пятёрочка",
                      "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                      "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
                  }
              ]
          }
      },
      {
          "id": 314,
          "place": {
              "id": 3,
              "name": "«Пятёрочка» на Арбате д. 24  г.Москва",
              "latitude": "55.75007900",
              "longitude": "37.59217700",
              "address_kladr": "ул. Арбат д. 24  г.Москва",
              "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 1,
                  "name": "Пятёрочка",
                  "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                  "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
              }
          },
          "price": 3000,
          "viewActivity": {
              "id": 3,
              "name": "Пекарь (Физическое лицо)",
              "detailName": "Пекарь  (Физическое лицо)",
              "previewText": "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
              "logo": "/storage/source/directory/view_activities/3-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
              "traveling": false,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2026-03-07T06:00:00.000000Z",
          "dateEnd": "2026-03-07T12:00:00.000000Z",
          "project": {
              "id": 1,
              "name": "Договор на оказание услуг Пятёрочка",
              "dateStart": "2025-12-09T00:00:00.000000Z",
              "dateEnd": "2026-12-31T00:00:00.000000Z",
              "timeStart": "09:00",
              "timeEnd": "21:00",
              "brand": [
                  {
                      "id": 1,
                      "name": "Пятёрочка",
                      "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                      "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
                  }
              ]
          }
      },
      {
          "id": 291,
          "place": {
              "id": 3,
              "name": "«Пятёрочка» на Арбате д. 24  г.Москва",
              "latitude": "55.75007900",
              "longitude": "37.59217700",
              "address_kladr": "ул. Арбат д. 24  г.Москва",
              "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 1,
                  "name": "Пятёрочка",
                  "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                  "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
              }
          },
          "price": 100,
          "viewActivity": {
              "id": 4,
              "name": "Пекарь (самозанятый)",
              "detailName": "Пекарь (самозанятый)",
              "previewText": "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
              "logo": "/storage/source/directory/view_activities/4-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
              "traveling": false,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2026-03-06T07:00:00.000000Z",
          "dateEnd": "2026-03-08T15:00:00.000000Z",
          "project": {
              "id": 1,
              "name": "Договор на оказание услуг Пятёрочка",
              "dateStart": "2025-12-09T00:00:00.000000Z",
              "dateEnd": "2026-12-31T00:00:00.000000Z",
              "timeStart": "09:00",
              "timeEnd": "21:00",
              "brand": [
                  {
                      "id": 1,
                      "name": "Пятёрочка",
                      "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                      "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
                  }
              ]
          }
      },
      {
          "id": 300,
          "place": {
              "id": 3,
              "name": "«Пятёрочка» на Арбате д. 24  г.Москва",
              "latitude": "55.75007900",
              "longitude": "37.59217700",
              "address_kladr": "ул. Арбат д. 24  г.Москва",
              "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 1,
                  "name": "Пятёрочка",
                  "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                  "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
              }
          },
          "price": 200,
          "viewActivity": {
              "id": 4,
              "name": "Пекарь (самозанятый)",
              "detailName": "Пекарь (самозанятый)",
              "previewText": "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
              "logo": "/storage/source/directory/view_activities/4-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
              "traveling": false,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2026-03-06T06:00:00.000000Z",
          "dateEnd": "2026-03-08T18:00:00.000000Z",
          "project": {
              "id": 1,
              "name": "Договор на оказание услуг Пятёрочка",
              "dateStart": "2025-12-09T00:00:00.000000Z",
              "dateEnd": "2026-12-31T00:00:00.000000Z",
              "timeStart": "09:00",
              "timeEnd": "21:00",
              "brand": [
                  {
                      "id": 1,
                      "name": "Пятёрочка",
                      "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                      "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
                  }
              ]
          }
      },
      {
          "id": 240,
          "place": {
              "id": 3,
              "name": "«Пятёрочка» на Арбате д. 24  г.Москва",
              "latitude": "55.75007900",
              "longitude": "37.59217700",
              "address_kladr": "ул. Арбат д. 24  г.Москва",
              "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 1,
                  "name": "Пятёрочка",
                  "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                  "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
              }
          },
          "price": 80,
          "viewActivity": {
              "id": 5,
              "name": "Курьер (самозанятый)",
              "detailName": "Курьер (самозанятый)",
              "previewText": "Доставка под разные задачи, быстрая курьерская доставка",
              "logo": "/storage/source/directory/view_activities/5-img/1675359703_www-funnyart-club-p-kurer-prikol-vkontakte-61.jpg",
              "traveling": true,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2026-02-10T06:00:00.000000Z",
          "dateEnd": "2026-02-10T13:00:00.000000Z",
          "project": {
              "id": 1,
              "name": "Договор на оказание услуг Пятёрочка",
              "dateStart": "2025-12-09T00:00:00.000000Z",
              "dateEnd": "2026-12-31T00:00:00.000000Z",
              "timeStart": "09:00",
              "timeEnd": "21:00",
              "brand": [
                  {
                      "id": 1,
                      "name": "Пятёрочка",
                      "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                      "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
                  }
              ]
          }
      },
      {
          "id": 239,
          "place": {
              "id": 3,
              "name": "«Пятёрочка» на Арбате д. 24  г.Москва",
              "latitude": "55.75007900",
              "longitude": "37.59217700",
              "address_kladr": "ул. Арбат д. 24  г.Москва",
              "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 1,
                  "name": "Пятёрочка",
                  "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                  "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
              }
          },
          "price": 100,
          "viewActivity": {
              "id": 5,
              "name": "Курьер (самозанятый)",
              "detailName": "Курьер (самозанятый)",
              "previewText": "Доставка под разные задачи, быстрая курьерская доставка",
              "logo": "/storage/source/directory/view_activities/5-img/1675359703_www-funnyart-club-p-kurer-prikol-vkontakte-61.jpg",
              "traveling": true,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2026-02-08T06:00:00.000000Z",
          "dateEnd": "2026-02-08T10:00:00.000000Z",
          "project": {
              "id": 1,
              "name": "Договор на оказание услуг Пятёрочка",
              "dateStart": "2025-12-09T00:00:00.000000Z",
              "dateEnd": "2026-12-31T00:00:00.000000Z",
              "timeStart": "09:00",
              "timeEnd": "21:00",
              "brand": [
                  {
                      "id": 1,
                      "name": "Пятёрочка",
                      "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                      "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
                  }
              ]
          }
      },
      {
          "id": 238,
          "place": {
              "id": 3,
              "name": "«Пятёрочка» на Арбате д. 24  г.Москва",
              "latitude": "55.75007900",
              "longitude": "37.59217700",
              "address_kladr": "ул. Арбат д. 24  г.Москва",
              "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 1,
                  "name": "Пятёрочка",
                  "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                  "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
              }
          },
          "price": 40,
          "viewActivity": {
              "id": 4,
              "name": "Пекарь (самозанятый)",
              "detailName": "Пекарь (самозанятый)",
              "previewText": "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
              "logo": "/storage/source/directory/view_activities/4-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
              "traveling": false,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2026-02-07T08:00:00.000000Z",
          "dateEnd": "2026-02-07T13:00:00.000000Z",
          "project": {
              "id": 1,
              "name": "Договор на оказание услуг Пятёрочка",
              "dateStart": "2025-12-09T00:00:00.000000Z",
              "dateEnd": "2026-12-31T00:00:00.000000Z",
              "timeStart": "09:00",
              "timeEnd": "21:00",
              "brand": [
                  {
                      "id": 1,
                      "name": "Пятёрочка",
                      "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                      "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
                  }
              ]
          }
      },
      {
          "id": 237,
          "place": {
              "id": 3,
              "name": "«Пятёрочка» на Арбате д. 24  г.Москва",
              "latitude": "55.75007900",
              "longitude": "37.59217700",
              "address_kladr": "ул. Арбат д. 24  г.Москва",
              "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 1,
                  "name": "Пятёрочка",
                  "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                  "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
              }
          },
          "price": 70,
          "viewActivity": {
              "id": 5,
              "name": "Курьер (самозанятый)",
              "detailName": "Курьер (самозанятый)",
              "previewText": "Доставка под разные задачи, быстрая курьерская доставка",
              "logo": "/storage/source/directory/view_activities/5-img/1675359703_www-funnyart-club-p-kurer-prikol-vkontakte-61.jpg",
              "traveling": true,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2026-02-06T08:00:00.000000Z",
          "dateEnd": "2026-02-06T12:00:00.000000Z",
          "project": {
              "id": 1,
              "name": "Договор на оказание услуг Пятёрочка",
              "dateStart": "2025-12-09T00:00:00.000000Z",
              "dateEnd": "2026-12-31T00:00:00.000000Z",
              "timeStart": "09:00",
              "timeEnd": "21:00",
              "brand": [
                  {
                      "id": 1,
                      "name": "Пятёрочка",
                      "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                      "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
                  }
              ]
          }
      },
      {
          "id": 234,
          "place": {
              "id": 3,
              "name": "«Пятёрочка» на Арбате д. 24  г.Москва",
              "latitude": "55.75007900",
              "longitude": "37.59217700",
              "address_kladr": "ул. Арбат д. 24  г.Москва",
              "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 1,
                  "name": "Пятёрочка",
                  "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                  "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
              }
          },
          "price": 3500,
          "viewActivity": {
              "id": 4,
              "name": "Пекарь (самозанятый)",
              "detailName": "Пекарь (самозанятый)",
              "previewText": "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
              "logo": "/storage/source/directory/view_activities/4-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
              "traveling": false,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2026-02-05T06:00:00.000000Z",
          "dateEnd": "2026-02-06T18:00:00.000000Z",
          "project": {
              "id": 1,
              "name": "Договор на оказание услуг Пятёрочка",
              "dateStart": "2025-12-09T00:00:00.000000Z",
              "dateEnd": "2026-12-31T00:00:00.000000Z",
              "timeStart": "09:00",
              "timeEnd": "21:00",
              "brand": [
                  {
                      "id": 1,
                      "name": "Пятёрочка",
                      "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                      "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
                  }
              ]
          }
      },
      {
          "id": 235,
          "place": {
              "id": 3,
              "name": "«Пятёрочка» на Арбате д. 24  г.Москва",
              "latitude": "55.75007900",
              "longitude": "37.59217700",
              "address_kladr": "ул. Арбат д. 24  г.Москва",
              "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 1,
                  "name": "Пятёрочка",
                  "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                  "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
              }
          },
          "price": 50,
          "viewActivity": {
              "id": 4,
              "name": "Пекарь (самозанятый)",
              "detailName": "Пекарь (самозанятый)",
              "previewText": "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
              "logo": "/storage/source/directory/view_activities/4-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
              "traveling": false,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2026-02-05T06:00:00.000000Z",
          "dateEnd": "2026-02-06T18:00:00.000000Z",
          "project": {
              "id": 1,
              "name": "Договор на оказание услуг Пятёрочка",
              "dateStart": "2025-12-09T00:00:00.000000Z",
              "dateEnd": "2026-12-31T00:00:00.000000Z",
              "timeStart": "09:00",
              "timeEnd": "21:00",
              "brand": [
                  {
                      "id": 1,
                      "name": "Пятёрочка",
                      "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                      "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
                  }
              ]
          }
      },
      {
          "id": 263,
          "place": {
              "id": 10,
              "name": "Зеленое яблоко , ул. Арбат д. 24  г.Москва",
              "latitude": "55.75007900",
              "longitude": "37.59217700",
              "address_kladr": "ул. Арбат д. 24  г.Москва",
              "logo": "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 5,
                  "name": "Зеленое яблоко",
                  "logo": "/storage/source/directory/brand/5-logo/Скриншот 28-11-2025 165505.jpg",
                  "description": "Зеленое яблоко"
              }
          },
          "price": 100,
          "viewActivity": {
              "id": 5,
              "name": "Курьер (самозанятый)",
              "detailName": "Курьер (самозанятый)",
              "previewText": "Доставка под разные задачи, быстрая курьерская доставка",
              "logo": "/storage/source/directory/view_activities/5-img/1675359703_www-funnyart-club-p-kurer-prikol-vkontakte-61.jpg",
              "traveling": true,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2026-02-04T13:50:00.000000Z",
          "dateEnd": "2026-02-04T15:50:00.000000Z",
          "project": null
      },
      {
          "id": 236,
          "place": {
              "id": 3,
              "name": "«Пятёрочка» на Арбате д. 24  г.Москва",
              "latitude": "55.75007900",
              "longitude": "37.59217700",
              "address_kladr": "ул. Арбат д. 24  г.Москва",
              "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 1,
                  "name": "Пятёрочка",
                  "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                  "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
              }
          },
          "price": 90,
          "viewActivity": {
              "id": 4,
              "name": "Пекарь (самозанятый)",
              "detailName": "Пекарь (самозанятый)",
              "previewText": "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
              "logo": "/storage/source/directory/view_activities/4-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
              "traveling": false,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2026-02-04T08:00:00.000000Z",
          "dateEnd": "2026-02-04T16:00:00.000000Z",
          "project": {
              "id": 1,
              "name": "Договор на оказание услуг Пятёрочка",
              "dateStart": "2025-12-09T00:00:00.000000Z",
              "dateEnd": "2026-12-31T00:00:00.000000Z",
              "timeStart": "09:00",
              "timeEnd": "21:00",
              "brand": [
                  {
                      "id": 1,
                      "name": "Пятёрочка",
                      "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                      "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
                  }
              ]
          }
      },
      {
          "id": 250,
          "place": {
              "id": 3,
              "name": "«Пятёрочка» на Арбате д. 24  г.Москва",
              "latitude": "55.75007900",
              "longitude": "37.59217700",
              "address_kladr": "ул. Арбат д. 24  г.Москва",
              "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 1,
                  "name": "Пятёрочка",
                  "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                  "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
              }
          },
          "price": 80,
          "viewActivity": {
              "id": 4,
              "name": "Пекарь (самозанятый)",
              "detailName": "Пекарь (самозанятый)",
              "previewText": "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
              "logo": "/storage/source/directory/view_activities/4-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
              "traveling": false,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2026-02-04T07:00:00.000000Z",
          "dateEnd": "2026-02-04T09:00:00.000000Z",
          "project": {
              "id": 1,
              "name": "Договор на оказание услуг Пятёрочка",
              "dateStart": "2025-12-09T00:00:00.000000Z",
              "dateEnd": "2026-12-31T00:00:00.000000Z",
              "timeStart": "09:00",
              "timeEnd": "21:00",
              "brand": [
                  {
                      "id": 1,
                      "name": "Пятёрочка",
                      "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                      "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
                  }
              ]
          }
      },
      {
          "id": 257,
          "place": {
              "id": 15,
              "name": "«Перекрёсток» на Долгоруковской",
              "latitude": "55.77201800",
              "longitude": "37.60316300",
              "address_kladr": "Долгоруковская ул., д. 5 г.Москва",
              "logo": "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 6,
                  "name": "Перекрёсток",
                  "logo": "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
                  "description": "Бренд «Перекрёсток» — одна из ведущих розничных сетей супермаркетов в России"
              }
          },
          "price": 1000,
          "viewActivity": {
              "id": 1,
              "name": "Продавец  (Физическое лицо)",
              "detailName": "Продавец  (Физическое лицо)",
              "previewText": "Кассир магазина,Кассир магазина розничной сети,Мобильный кассир,Продавец прилавка,Продавец прилавка розничной сети,Продавец торгового зала,Продавец торгового зала розничной сети,Кассир общепита",
              "logo": "/storage/source/directory/view_activities/1-img/8c37f333-3b09-4686-9238-dd89e704fbc7-31-Wavebreakmedia-Shutterst.jpg",
              "traveling": false,
              "standard": {
                  "id": 2,
                  "name": "Трудосмену",
                  "coefficient": 8
              }
          },
          "dateStart": "2026-02-03T15:00:00.000000Z",
          "dateEnd": "2026-02-05T09:00:00.000000Z",
          "project": {
              "id": 11,
              "name": "78954612 Перекресток",
              "dateStart": "2026-01-20T00:00:00.000000Z",
              "dateEnd": "2026-12-10T00:00:00.000000Z",
              "timeStart": "09:00",
              "timeEnd": "21:00",
              "brand": [
                  {
                      "id": 6,
                      "name": "Перекрёсток",
                      "logo": "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
                      "description": "Бренд «Перекрёсток» — одна из ведущих розничных сетей супермаркетов в России"
                  }
              ]
          }
      },
      {
          "id": 251,
          "place": {
              "id": 3,
              "name": "«Пятёрочка» на Арбате д. 24  г.Москва",
              "latitude": "55.75007900",
              "longitude": "37.59217700",
              "address_kladr": "ул. Арбат д. 24  г.Москва",
              "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 1,
                  "name": "Пятёрочка",
                  "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                  "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
              }
          },
          "price": 100,
          "viewActivity": {
              "id": 4,
              "name": "Пекарь (самозанятый)",
              "detailName": "Пекарь (самозанятый)",
              "previewText": "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
              "logo": "/storage/source/directory/view_activities/4-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
              "traveling": false,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2026-02-03T14:15:00.000000Z",
          "dateEnd": "2026-02-03T15:30:00.000000Z",
          "project": {
              "id": 1,
              "name": "Договор на оказание услуг Пятёрочка",
              "dateStart": "2025-12-09T00:00:00.000000Z",
              "dateEnd": "2026-12-31T00:00:00.000000Z",
              "timeStart": "09:00",
              "timeEnd": "21:00",
              "brand": [
                  {
                      "id": 1,
                      "name": "Пятёрочка",
                      "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                      "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
                  }
              ]
          }
      },
      {
          "id": 252,
          "place": {
              "id": 3,
              "name": "«Пятёрочка» на Арбате д. 24  г.Москва",
              "latitude": "55.75007900",
              "longitude": "37.59217700",
              "address_kladr": "ул. Арбат д. 24  г.Москва",
              "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 1,
                  "name": "Пятёрочка",
                  "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                  "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
              }
          },
          "price": 100,
          "viewActivity": {
              "id": 4,
              "name": "Пекарь (самозанятый)",
              "detailName": "Пекарь (самозанятый)",
              "previewText": "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
              "logo": "/storage/source/directory/view_activities/4-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
              "traveling": false,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2026-02-03T14:15:00.000000Z",
          "dateEnd": "2026-02-03T15:30:00.000000Z",
          "project": {
              "id": 1,
              "name": "Договор на оказание услуг Пятёрочка",
              "dateStart": "2025-12-09T00:00:00.000000Z",
              "dateEnd": "2026-12-31T00:00:00.000000Z",
              "timeStart": "09:00",
              "timeEnd": "21:00",
              "brand": [
                  {
                      "id": 1,
                      "name": "Пятёрочка",
                      "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                      "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
                  }
              ]
          }
      },
      {
          "id": 244,
          "place": {
              "id": 3,
              "name": "«Пятёрочка» на Арбате д. 24  г.Москва",
              "latitude": "55.75007900",
              "longitude": "37.59217700",
              "address_kladr": "ул. Арбат д. 24  г.Москва",
              "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 1,
                  "name": "Пятёрочка",
                  "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                  "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
              }
          },
          "price": 110,
          "viewActivity": {
              "id": 4,
              "name": "Пекарь (самозанятый)",
              "detailName": "Пекарь (самозанятый)",
              "previewText": "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
              "logo": "/storage/source/directory/view_activities/4-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
              "traveling": false,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2026-02-02T10:45:00.000000Z",
          "dateEnd": "2026-02-02T12:30:00.000000Z",
          "project": {
              "id": 1,
              "name": "Договор на оказание услуг Пятёрочка",
              "dateStart": "2025-12-09T00:00:00.000000Z",
              "dateEnd": "2026-12-31T00:00:00.000000Z",
              "timeStart": "09:00",
              "timeEnd": "21:00",
              "brand": [
                  {
                      "id": 1,
                      "name": "Пятёрочка",
                      "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                      "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
                  }
              ]
          }
      },
      {
          "id": 242,
          "place": {
              "id": 3,
              "name": "«Пятёрочка» на Арбате д. 24  г.Москва",
              "latitude": "55.75007900",
              "longitude": "37.59217700",
              "address_kladr": "ул. Арбат д. 24  г.Москва",
              "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 1,
                  "name": "Пятёрочка",
                  "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                  "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
              }
          },
          "price": 3500,
          "viewActivity": {
              "id": 4,
              "name": "Пекарь (самозанятый)",
              "detailName": "Пекарь (самозанятый)",
              "previewText": "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
              "logo": "/storage/source/directory/view_activities/4-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
              "traveling": false,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2026-02-01T19:30:00.000000Z",
          "dateEnd": "2026-02-02T12:30:00.000000Z",
          "project": {
              "id": 1,
              "name": "Договор на оказание услуг Пятёрочка",
              "dateStart": "2025-12-09T00:00:00.000000Z",
              "dateEnd": "2026-12-31T00:00:00.000000Z",
              "timeStart": "09:00",
              "timeEnd": "21:00",
              "brand": [
                  {
                      "id": 1,
                      "name": "Пятёрочка",
                      "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                      "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
                  }
              ]
          }
      },
      {
          "id": 243,
          "place": {
              "id": 3,
              "name": "«Пятёрочка» на Арбате д. 24  г.Москва",
              "latitude": "55.75007900",
              "longitude": "37.59217700",
              "address_kladr": "ул. Арбат д. 24  г.Москва",
              "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 1,
                  "name": "Пятёрочка",
                  "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                  "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
              }
          },
          "price": 70,
          "viewActivity": {
              "id": 5,
              "name": "Курьер (самозанятый)",
              "detailName": "Курьер (самозанятый)",
              "previewText": "Доставка под разные задачи, быстрая курьерская доставка",
              "logo": "/storage/source/directory/view_activities/5-img/1675359703_www-funnyart-club-p-kurer-prikol-vkontakte-61.jpg",
              "traveling": true,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2026-02-01T19:30:00.000000Z",
          "dateEnd": "2026-02-03T12:30:00.000000Z",
          "project": {
              "id": 1,
              "name": "Договор на оказание услуг Пятёрочка",
              "dateStart": "2025-12-09T00:00:00.000000Z",
              "dateEnd": "2026-12-31T00:00:00.000000Z",
              "timeStart": "09:00",
              "timeEnd": "21:00",
              "brand": [
                  {
                      "id": 1,
                      "name": "Пятёрочка",
                      "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                      "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
                  }
              ]
          }
      },
      {
          "id": 233,
          "place": {
              "id": 3,
              "name": "«Пятёрочка» на Арбате д. 24  г.Москва",
              "latitude": "55.75007900",
              "longitude": "37.59217700",
              "address_kladr": "ул. Арбат д. 24  г.Москва",
              "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 1,
                  "name": "Пятёрочка",
                  "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                  "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
              }
          },
          "price": 100,
          "viewActivity": {
              "id": 4,
              "name": "Пекарь (самозанятый)",
              "detailName": "Пекарь (самозанятый)",
              "previewText": "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
              "logo": "/storage/source/directory/view_activities/4-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
              "traveling": false,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2026-02-01T06:00:00.000000Z",
          "dateEnd": "2026-02-02T18:00:00.000000Z",
          "project": {
              "id": 1,
              "name": "Договор на оказание услуг Пятёрочка",
              "dateStart": "2025-12-09T00:00:00.000000Z",
              "dateEnd": "2026-12-31T00:00:00.000000Z",
              "timeStart": "09:00",
              "timeEnd": "21:00",
              "brand": [
                  {
                      "id": 1,
                      "name": "Пятёрочка",
                      "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                      "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
                  }
              ]
          }
      },
      {
          "id": 232,
          "place": {
              "id": 3,
              "name": "«Пятёрочка» на Арбате д. 24  г.Москва",
              "latitude": "55.75007900",
              "longitude": "37.59217700",
              "address_kladr": "ул. Арбат д. 24  г.Москва",
              "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 1,
                  "name": "Пятёрочка",
                  "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                  "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
              }
          },
          "price": 3500,
          "viewActivity": {
              "id": 4,
              "name": "Пекарь (самозанятый)",
              "detailName": "Пекарь (самозанятый)",
              "previewText": "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
              "logo": "/storage/source/directory/view_activities/4-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
              "traveling": false,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2026-01-30T06:00:00.000000Z",
          "dateEnd": "2026-01-31T18:00:00.000000Z",
          "project": {
              "id": 1,
              "name": "Договор на оказание услуг Пятёрочка",
              "dateStart": "2025-12-09T00:00:00.000000Z",
              "dateEnd": "2026-12-31T00:00:00.000000Z",
              "timeStart": "09:00",
              "timeEnd": "21:00",
              "brand": [
                  {
                      "id": 1,
                      "name": "Пятёрочка",
                      "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                      "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
                  }
              ]
          }
      },
      {
          "id": 216,
          "place": {
              "id": 3,
              "name": "«Пятёрочка» на Арбате д. 24  г.Москва",
              "latitude": "55.75007900",
              "longitude": "37.59217700",
              "address_kladr": "ул. Арбат д. 24  г.Москва",
              "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 1,
                  "name": "Пятёрочка",
                  "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                  "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
              }
          },
          "price": 60,
          "viewActivity": {
              "id": 4,
              "name": "Пекарь (самозанятый)",
              "detailName": "Пекарь (самозанятый)",
              "previewText": "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
              "logo": "/storage/source/directory/view_activities/4-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
              "traveling": false,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2026-01-29T11:00:00.000000Z",
          "dateEnd": "2026-01-30T16:00:00.000000Z",
          "project": {
              "id": 1,
              "name": "Договор на оказание услуг Пятёрочка",
              "dateStart": "2025-12-09T00:00:00.000000Z",
              "dateEnd": "2026-12-31T00:00:00.000000Z",
              "timeStart": "09:00",
              "timeEnd": "21:00",
              "brand": [
                  {
                      "id": 1,
                      "name": "Пятёрочка",
                      "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                      "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
                  }
              ]
          }
      },
      {
          "id": 219,
          "place": {
              "id": 3,
              "name": "«Пятёрочка» на Арбате д. 24  г.Москва",
              "latitude": "55.75007900",
              "longitude": "37.59217700",
              "address_kladr": "ул. Арбат д. 24  г.Москва",
              "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 1,
                  "name": "Пятёрочка",
                  "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                  "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
              }
          },
          "price": 3500,
          "viewActivity": {
              "id": 4,
              "name": "Пекарь (самозанятый)",
              "detailName": "Пекарь (самозанятый)",
              "previewText": "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
              "logo": "/storage/source/directory/view_activities/4-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
              "traveling": false,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2026-01-29T10:00:00.000000Z",
          "dateEnd": "2026-01-30T16:00:00.000000Z",
          "project": {
              "id": 1,
              "name": "Договор на оказание услуг Пятёрочка",
              "dateStart": "2025-12-09T00:00:00.000000Z",
              "dateEnd": "2026-12-31T00:00:00.000000Z",
              "timeStart": "09:00",
              "timeEnd": "21:00",
              "brand": [
                  {
                      "id": 1,
                      "name": "Пятёрочка",
                      "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                      "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
                  }
              ]
          }
      },
      {
          "id": 94,
          "place": {
              "id": 1,
              "name": "Ашан МСК Рязанский пр-т, д. 2, корп. 2, Москва",
              "latitude": "55.72987300",
              "longitude": "37.73043700",
              "address_kladr": "Рязанский пр-т, д. 2, корп. 2, Москва",
              "logo": "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 2,
                  "name": "Ашан",
                  "logo": "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
                  "description": "Розничная сеть Auchan Retail является основной составляющей группы ELO, которая, в свою очередь, контролируется семейной корпорацией «Ассоциация семьи Мюлье»."
              }
          },
          "price": 0,
          "viewActivity": {
              "id": 3,
              "name": "Пекарь (Физическое лицо)",
              "detailName": "Пекарь  (Физическое лицо)",
              "previewText": "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
              "logo": "/storage/source/directory/view_activities/3-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
              "traveling": false,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2025-12-15T06:00:00.000000Z",
          "dateEnd": "2025-12-15T18:00:00.000000Z",
          "project": null
      },
      {
          "id": 86,
          "place": {
              "id": 1,
              "name": "Ашан МСК Рязанский пр-т, д. 2, корп. 2, Москва",
              "latitude": "55.72987300",
              "longitude": "37.73043700",
              "address_kladr": "Рязанский пр-т, д. 2, корп. 2, Москва",
              "logo": "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 2,
                  "name": "Ашан",
                  "logo": "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
                  "description": "Розничная сеть Auchan Retail является основной составляющей группы ELO, которая, в свою очередь, контролируется семейной корпорацией «Ассоциация семьи Мюлье»."
              }
          },
          "price": 1000,
          "viewActivity": {
              "id": 5,
              "name": "Курьер (самозанятый)",
              "detailName": "Курьер (самозанятый)",
              "previewText": "Доставка под разные задачи, быстрая курьерская доставка",
              "logo": "/storage/source/directory/view_activities/5-img/1675359703_www-funnyart-club-p-kurer-prikol-vkontakte-61.jpg",
              "traveling": true,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2025-11-28T05:45:00.000000Z",
          "dateEnd": "2025-11-29T17:45:00.000000Z",
          "project": null
      },
      {
          "id": 74,
          "place": {
              "id": 1,
              "name": "Ашан МСК Рязанский пр-т, д. 2, корп. 2, Москва",
              "latitude": "55.72987300",
              "longitude": "37.73043700",
              "address_kladr": "Рязанский пр-т, д. 2, корп. 2, Москва",
              "logo": "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 2,
                  "name": "Ашан",
                  "logo": "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
                  "description": "Розничная сеть Auchan Retail является основной составляющей группы ELO, которая, в свою очередь, контролируется семейной корпорацией «Ассоциация семьи Мюлье»."
              }
          },
          "price": 2000,
          "viewActivity": {
              "id": 2,
              "name": "Курьер  (Физическое лицо)",
              "detailName": "Курьер  (Физическое лицо)",
              "previewText": "Доставка под разные задачи, быстрая курьерская доставка",
              "logo": "/storage/source/directory/view_activities/2-img/1675359703_www-funnyart-club-p-kurer-prikol-vkontakte-61.jpg",
              "traveling": true,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2025-10-30T14:00:00.000000Z",
          "dateEnd": "2025-10-31T18:00:00.000000Z",
          "project": null
      },
      {
          "id": 73,
          "place": {
              "id": 1,
              "name": "Ашан МСК Рязанский пр-т, д. 2, корп. 2, Москва",
              "latitude": "55.72987300",
              "longitude": "37.73043700",
              "address_kladr": "Рязанский пр-т, д. 2, корп. 2, Москва",
              "logo": "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 2,
                  "name": "Ашан",
                  "logo": "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
                  "description": "Розничная сеть Auchan Retail является основной составляющей группы ELO, которая, в свою очередь, контролируется семейной корпорацией «Ассоциация семьи Мюлье»."
              }
          },
          "price": 5000,
          "viewActivity": {
              "id": 2,
              "name": "Курьер  (Физическое лицо)",
              "detailName": "Курьер  (Физическое лицо)",
              "previewText": "Доставка под разные задачи, быстрая курьерская доставка",
              "logo": "/storage/source/directory/view_activities/2-img/1675359703_www-funnyart-club-p-kurer-prikol-vkontakte-61.jpg",
              "traveling": true,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2025-10-30T13:00:00.000000Z",
          "dateEnd": "2025-11-01T18:00:00.000000Z",
          "project": null
      },
      {
          "id": 68,
          "place": {
              "id": 1,
              "name": "Ашан МСК Рязанский пр-т, д. 2, корп. 2, Москва",
              "latitude": "55.72987300",
              "longitude": "37.73043700",
              "address_kladr": "Рязанский пр-т, д. 2, корп. 2, Москва",
              "logo": "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 2,
                  "name": "Ашан",
                  "logo": "/storage/source/directory/brand/2-logo/Лого Ашан.jpg",
                  "description": "Розничная сеть Auchan Retail является основной составляющей группы ELO, которая, в свою очередь, контролируется семейной корпорацией «Ассоциация семьи Мюлье»."
              }
          },
          "price": 1000,
          "viewActivity": {
              "id": 2,
              "name": "Курьер  (Физическое лицо)",
              "detailName": "Курьер  (Физическое лицо)",
              "previewText": "Доставка под разные задачи, быстрая курьерская доставка",
              "logo": "/storage/source/directory/view_activities/2-img/1675359703_www-funnyart-club-p-kurer-prikol-vkontakte-61.jpg",
              "traveling": true,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2025-10-29T20:55:00.000000Z",
          "dateEnd": "2025-10-31T18:00:00.000000Z",
          "project": null
      },
      {
          "id": 38,
          "place": {
              "id": 3,
              "name": "«Пятёрочка» на Арбате д. 24  г.Москва",
              "latitude": "55.75007900",
              "longitude": "37.59217700",
              "address_kladr": "ул. Арбат д. 24  г.Москва",
              "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              "region": {
                  "id": 2,
                  "name": "Москва"
              },
              "brand": {
                  "id": 1,
                  "name": "Пятёрочка",
                  "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                  "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
              }
          },
          "price": 1500,
          "viewActivity": {
              "id": 4,
              "name": "Пекарь (самозанятый)",
              "detailName": "Пекарь (самозанятый)",
              "previewText": "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
              "logo": "/storage/source/directory/view_activities/4-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
              "traveling": false,
              "standard": {
                  "id": 1,
                  "name": "Трудотонну",
                  "coefficient": 3
              }
          },
          "dateStart": "2025-10-28T14:00:00.000000Z",
          "dateEnd": "2025-10-30T21:00:00.000000Z",
          "project": {
              "id": 1,
              "name": "Договор на оказание услуг Пятёрочка",
              "dateStart": "2025-12-09T00:00:00.000000Z",
              "dateEnd": "2026-12-31T00:00:00.000000Z",
              "timeStart": "09:00",
              "timeEnd": "21:00",
              "brand": [
                  {
                      "id": 1,
                      "name": "Пятёрочка",
                      "logo": "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                      "description": "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России."
                  }
              ]
          }
      }
  ]
};

export const mockResponseSuccessEmpty = {};

export const mockResponseError = {};

export const getSigninJobsMockResponse = http.get(
  `${import.meta.env.VITE_GET_SIGNIN_JOBS}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  },
);
