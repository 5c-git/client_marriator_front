import preview from "../../../.storybook/preview";

// import { reactRouterParameters } from "storybook-addon-remix-react-router";

import Job from "~/routes/jobs/job/job";

const meta = preview.meta({
  component: Job,
});

// @ts-expect-error: `matches` won't align between test code and app code
export const TC_325 = meta.story({
  args: {
    loaderData: {
      job: {
        id: 535,
        logo: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/view_activities/2-img/1675359703_www-funnyart-club-p-kurer-prikol-vkontakte-61.jpg",
        status: 5,
        place: {
          id: 3,
          name: "«Пятёрочка» на Арбате д. 24  г.Москва",
          logo: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
        },
        activity: "Курьер  (Физическое лицо)",
        activityDetailsText:
          "Доставка под разные задачи, быстрая курьерская доставка",
        unitPrice: 1000,
        dateStart: "2026-09-19T06:00:00.000Z",
        dateEnd: "2026-10-20T15:00:00.000Z",
        income: 0,
        forPay: 0,
        days: [
          {
            id: 1,
            timeStart: "2026-09-19T06:00:00.000Z",
            timeEnd: "2026-09-19T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 2,
            timeStart: "2026-09-20T06:00:00.000Z",
            timeEnd: "2026-09-20T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 3,
            timeStart: "2026-09-21T06:00:00.000Z",
            timeEnd: "2026-09-21T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 4,
            timeStart: "2026-09-22T06:00:00.000Z",
            timeEnd: "2026-09-22T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 5,
            timeStart: "2026-09-23T06:00:00.000Z",
            timeEnd: "2026-09-23T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 6,
            timeStart: "2026-09-24T06:00:00.000Z",
            timeEnd: "2026-09-24T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 7,
            timeStart: "2026-09-25T06:00:00.000Z",
            timeEnd: "2026-09-25T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 8,
            timeStart: "2026-09-26T06:00:00.000Z",
            timeEnd: "2026-09-26T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 9,
            timeStart: "2026-09-27T06:00:00.000Z",
            timeEnd: "2026-09-27T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 10,
            timeStart: "2026-09-28T06:00:00.000Z",
            timeEnd: "2026-09-28T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 11,
            timeStart: "2026-09-29T06:00:00.000Z",
            timeEnd: "2026-09-29T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 12,
            timeStart: "2026-09-30T06:00:00.000Z",
            timeEnd: "2026-09-30T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 13,
            timeStart: "2026-10-01T06:00:00.000Z",
            timeEnd: "2026-10-01T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 14,
            timeStart: "2026-10-02T06:00:00.000Z",
            timeEnd: "2026-10-02T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 15,
            timeStart: "2026-10-03T06:00:00.000Z",
            timeEnd: "2026-10-03T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 16,
            timeStart: "2026-10-04T06:00:00.000Z",
            timeEnd: "2026-10-04T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 17,
            timeStart: "2026-10-05T06:00:00.000Z",
            timeEnd: "2026-10-05T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 18,
            timeStart: "2026-10-06T06:00:00.000Z",
            timeEnd: "2026-10-06T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 19,
            timeStart: "2026-10-07T06:00:00.000Z",
            timeEnd: "2026-10-07T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 20,
            timeStart: "2026-10-08T06:00:00.000Z",
            timeEnd: "2026-10-08T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 21,
            timeStart: "2026-10-09T06:00:00.000Z",
            timeEnd: "2026-10-09T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 22,
            timeStart: "2026-10-10T06:00:00.000Z",
            timeEnd: "2026-10-10T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 23,
            timeStart: "2026-10-11T06:00:00.000Z",
            timeEnd: "2026-10-11T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 24,
            timeStart: "2026-10-12T06:00:00.000Z",
            timeEnd: "2026-10-12T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 25,
            timeStart: "2026-10-13T06:00:00.000Z",
            timeEnd: "2026-10-13T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 26,
            timeStart: "2026-10-14T06:00:00.000Z",
            timeEnd: "2026-10-14T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 27,
            timeStart: "2026-10-15T06:00:00.000Z",
            timeEnd: "2026-10-15T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 28,
            timeStart: "2026-10-16T06:00:00.000Z",
            timeEnd: "2026-10-16T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 29,
            timeStart: "2026-10-17T06:00:00.000Z",
            timeEnd: "2026-10-17T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 30,
            timeStart: "2026-10-18T06:00:00.000Z",
            timeEnd: "2026-10-18T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 31,
            timeStart: "2026-10-19T06:00:00.000Z",
            timeEnd: "2026-10-19T18:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
          {
            id: 32,
            timeStart: "2026-10-20T06:00:00.000Z",
            timeEnd: "2026-10-20T15:00:00.000Z",
            locations: [],
            needRoute: false,
            action: "none",
          },
        ],
        needDays: true,
        needPhoto: false,
        travelling: true,
        user: {
          id: 526,
          logo: "/storage/source/directory/brand/1-logo/Лого Пятерочка.png",
          name: "ЮЛИЯ МЕНЕДЖЕР ПЯТЕРОЧКА",
          role: "manager",
          phone: "79128444444",
        },
        oneDayJob: false,
        oneDayJobAction: "none",
        oneDayReportId: null,
        units: "Трудотонну",
        currency: "₽",
      },
      intervals: {
        id: 531,
        refuse_job_interval: 2,
      },
      defaultTimeRange: {
        start: "2026-03-12T06:00:00.000Z",
        end: "2026-03-12T18:00:00.000Z",
      },
      projectTimeRange: {
        start: "2026-01-20T00:00:00.000Z",
        end: "2026-12-30T00:00:00.000Z",
      },
    },
  },
  decorators: [
    (Story) => (
      <div>
        <p>
          TC-325 Кнопка "Отказаться" в Задании остается активной после истечения
          допустимого интервала (Дата окончания услуги - 02:00) Факт: В момент
          12:18 кнопка "Отказаться" отображается активной и доступной для
          нажатия
        </p>
        <p>Результат</p>
        <p>
          Интервал refusal_task(в запросе)(refuse_job_interval в приложении)
          теперь отнимается от даты конца услуги и проверятся что полученная
          дата находится в будущем, если в будущем кнопку показываем, нет - не
          показываем
        </p>
        <div></div>
        <Story />
      </div>
    ),
  ],
});
