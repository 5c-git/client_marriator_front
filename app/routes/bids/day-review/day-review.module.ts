import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { dayReviewPrivateTokens } from "./day-review.private-tokens";
import { dayReviewTokens } from "./day-review.tokens";

import { getJob } from "~/api/_personal/getJob/getJob";
import { getReasons } from "~/api/_personal/getReasons/getReasons";
import { postAcceptReport } from "~/api/_personal/postAcceptReport/postAcceptReport";
import { postUpdateReport } from "~/api/_personal/postUpdateReport/postUpdateReport";
import { postAcceptAllReportJob } from "~/api/_personal/postAcceptAllReportJob/postAcceptAllReportJob";

export const dayReviewContainer = new Container().extend(appContainer);
import { DayReviewService } from "./day-review.service";

dayReviewContainer
  .bind(dayReviewPrivateTokens.getJob)
  // .toConstant((accessToken, specialistId, bidId) =>
  //   getJob(accessToken, specialistId, bidId),
  // );
  .toConstant(
    (accessToken, specialistId, bidId) =>
      new Promise((resolve) => {
        return resolve({
          data: {
            id: 571,
            user: {
              id: 883,
              phone: 79865656665,
              email: "ffg@mail.ru",
              logo: "/storage/source/userImg/883/SU5yXOrBQEppd03sgBFq.jpeg",
              roles: [
                {
                  id: 5,
                  name: "specialist",
                },
                {
                  id: 6,
                  name: "supervisor",
                },
              ],
              name: "ТЕСТ ТЕСТ",
            },
            status: 3,
            selfEmployed: false,
            place: {
              id: 3,
              name: "«Пятёрочка» на Арбате д. 24  г.Москва",
              latitude: "55.75007900",
              longitude: "37.59217700",
              address_kladr: "ул. Арбат д. 24  г.Москва",
              logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
              region: {
                id: 2,
                name: "Москва",
              },
              brand: {
                id: 1,
                name: "Пятёрочка",
                logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                description:
                  "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
              },
            },
            radius: 5,
            price: 2000,
            priceResult: 0,
            income: 0,
            forPay: 0,
            viewActivity: {
              id: 3,
              name: "Пекарь (Физическое лицо)",
              logo: "/storage/source/directory/view_activities/3-img/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
              previewText:
                "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
              detailName: "Пекарь  (Физическое лицо)",
              detailText:
                "Помощник повара,Пиццмейкер розничной сети,Пиццмейкер,Тестомес,Тестомес розничной сети,Пекарь розничной сети",
              detailImg:
                "/storage/source/directory/view_activities/3-imgDetail/1661081678_53-pofoto-club-p-beloborodii-pekari-65.jpg",
              linkText: "Пройти тест",
              link: null,
              traveling: false,
              standard: {
                id: 2,
                name: "Трудосмена",
                coefficient: 1,
              },
            },
            dateStart: "2026-10-14T07:00:00.000000Z",
            dateEnd: "2026-10-16T16:00:00.000000Z",
            needFoto: false,
            dateActivity: [
              {
                id: 1,
                timeStart: "2026-10-14T07:00:00.000Z",
                timeEnd: "2026-10-14T18:00:00.000Z",
                places: [],
              },
              {
                id: 2,
                timeStart: "2026-10-15T06:00:00.000Z",
                timeEnd: "2026-10-15T18:00:00.000Z",
                places: [],
              },
              {
                id: 3,
                timeStart: "2026-10-16T06:00:00.000Z",
                timeEnd: "2026-10-16T16:00:00.000Z",
                places: [],
              },
            ],
            order: {
              id: 884,
              selfEmployed: false,
              status: 3,
              user: {
                id: 879,
                phone: 79284511214,
                email: "core@gmail.com",
                logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                roles: [
                  {
                    id: 2,
                    name: "client",
                  },
                ],
                name: "fffff",
              },
              statistic: [
                {
                  accepted: 5,
                  count: 1,
                },
              ],
              createdAt: "2026-10-13T08:28:50.000000Z",
            },
            task: {
              id: 794,
              selfEmployed: false,
              status: 3,
              user: {
                id: 679,
                phone: 79770023131,
                email: "test31318@bk.ru",
                logo: "/storage/source/directory/brand/6-logo/Скриншот 21-01-2026 120205.jpg",
                roles: [
                  {
                    id: 3,
                    name: "manager",
                  },
                ],
                name: "Менеджер ТАТА",
              },
              statistic: [
                {
                  accepted: 5,
                  count: 1,
                },
              ],
              createdAt: "2026-10-13T08:30:44.000000Z",
            },
            acceptingUser: {
              id: 613,
              phone: 79181111111,
              email: "oskolkova12345@yandex.ru",
              logo: "/storage/source/userImg/613/AnWoXnyoHIXqURWtx3Zw.jpeg",
              roles: [
                {
                  id: 5,
                  name: "specialist",
                },
              ],
              radius: "5",
              name: "Осколкова Анастасия Валерьевна",
              age: "27",
              country: "РОССИЯ",
              viewActivities: [
                "Курьер  (Физическое лицо)",
                "Пекарь (Физическое лицо)",
                "Продавец  (Физическое лицо)",
              ],
              status: 5,
            },
            reports: [
              {
                id: 94,
                dateStart: "2026-10-15T10:00:30.000000Z",
                dateEnd: "2026-10-16T06:00:00.000000Z",
                report: null,
                dayActivityId: 2,
                status: 7,
                hours: "0.00",
                reasons: [],
              },
            ],
            project: {
              id: 12,
              name: "78412552 Пятерочка",
              dateStart: "2026-01-20T00:00:00.000000Z",
              dateEnd: "2026-12-30T00:00:00.000000Z",
              timeStart: "06:00",
              timeEnd: "18:00",
              brand: [
                {
                  id: 1,
                  name: "Пятёрочка",
                  logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
                  description:
                    "«Пятёрочка» — крупнейшая торговая сеть магазинов «у дома» в России.",
                },
              ],
            },
            createdAt: "2026-10-13T08:31:23.000000Z",
          },
        });
      }),
  );

dayReviewContainer
  .bind(dayReviewPrivateTokens.getReasons)
  .toConstant((accessToken) => getReasons(accessToken));

dayReviewContainer
  .bind(dayReviewPrivateTokens.acceptReport)
  .toConstant((accessToken, payload) => postAcceptReport(accessToken, payload));

dayReviewContainer
  .bind(dayReviewPrivateTokens.updateReport)
  .toConstant((accessToken, payload) => postUpdateReport(accessToken, payload));

dayReviewContainer
  .bind(dayReviewPrivateTokens.acceptAllReports)
  .toConstant((accessToken, payload) =>
    postAcceptAllReportJob(accessToken, payload),
  );

dayReviewContainer
  .bind(dayReviewTokens.dayReviewService)
  .toInstance(DayReviewService)
  .inSingletonScope();
