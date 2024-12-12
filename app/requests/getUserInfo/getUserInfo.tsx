import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
import addFormats from "ajv-formats";

import getUserInfoSuccess from "./getUserInfo.schema.json";
import { GetUserInfoSuccess } from "./getUserInfo.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();
addFormats(ajv);

const validateSuccess = ajv.compile(getUserInfoSuccess);

export const getUserInfoKeys = ["getUserInfo"];

export const getUserInfo = async (
  accessToken: string
): Promise<GetUserInfoSuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_GET_USER_INFO);

    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

    if (validateSuccess(response)) {
      data = response as unknown as GetUserInfoSuccess;
    } else {
      console.log(validateSuccess.errors);
      throw new Response(`Данные запроса getUserInfo не валидны схеме`);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new UnxpectedError(error.message);
    } else {
      throw new UnxpectedError("Unknown unexpected error");
    }
  }
};

// MOCKS
export const mockResponseSuccess = {
  result: {
    userData: {
      id: 2,
      name: null,
      email: "testk@mail.ru",
      email_verified_at: "2024-10-03T21:04:59.000000Z",
      created_at: "2024-06-26T07:09:25.000000Z",
      updated_at: "2024-10-24T19:11:33.000000Z",
      api_token: null,
      phone: 79152142630,
      data: '{"gov": true, "testitem": ["directory_activities1"], "vidideayt": "directory_view_activities_e7JEmQrGSvQ2JCDJlgTd09jNoiFfGm", "nalogstatus": "nalogstatus_samozanyatyj", "2Vr2TFKPAmY12FHtnyqWr2Sngg9F6s": "http://preprod.marriator-api.fivecorners.ru/storage/source/pdf/2/fhbqB2cJp5nYhWO80TVs.pdf", "2xC9RxW86VOvK1tlENocp26QDwJNQ2": true, "3tslFpWgadwSvvmDXQ6rvvc3aTfd47": "size44-46", "4qTJxPiblqfk0MySQBb6ErqHH2k6NT": null, "5nibSuUwMDHHB965TRu8iT4exCxhRN": "4444444343444444444444", "7nNCUNdoVpAy5x1gXYp6jgvrvxOSqm": null, "87ONZiY1OqKYKiTsrKZ5q1y0KsuH2n": "shoes35", "8nnGyBf1OErAWa8EZkispver2ozsHO": null, "9nuDjP3c3Ule99uIiPArhyE1rssGHF": "444444444444", "CXYEgm2VUVFcmL4idc1fkj9pivY4UA": true, "HP2kvziquWyhpAPv9UmhlkRaIISQWz": "volosy_dlinnye", "HpecJclZpUWpkI7voOZmYrjv06PG3a": "5536913757516790", "IloSAoeA5hNj6iKQuM3saaBSmw7nvC": "44444444444", "LxV7IcA3kpCfkzvmiVx0VWQ0f0eTo1": "http://preprod.marriator-api.fivecorners.ru/storage/source/userImg/2/RAiv9xewNjuSnLWUD40G.jpeg", "MZ562TBT1VVWW7nYNJcPG4BlBFRXSc": "http://preprod.marriator-api.fivecorners.ru/storage/source/pdf/2/VfAF0eTmUk1ZrRq7LkEu.pdf", "MlWbSSwUynanXXhjbIm3LwN5MWCoW3": "79152142630", "NU6zM7fYI1dK3MV9MITtlpvhybVkez": "Александрович", "NhJmY9kzLgrF5vwVix7BiEMCXu3Skl": null, "P93JuDTcWlnJfgOJOmM1VtP9vSVnK8": null, "PNHKP24PzkJcUGI492xRoK4FdxVGmZ": "http://preprod.marriator-api.fivecorners.ru/storage/source/pdf/2/MwD98VjrzjsmmYFIITIO.pdf", "PuGyZOcha8UkkMywTQw2Wa4DcLlD5m": "2024-07-10", "QsZI3i3WLzO5rNO2ZJjXBtx9nJBosd": "test", "QtbukuJ4ALhNnMCwBQvA9PE5pIu6Zh": true, "R7ydKRH6YRdU85KI2UIql0EDWNyvnr": "directory_documentation_o8Tdo9sL762jqbHpd54aD6KK09sJtr", "RjJLN6y6qDD9KBwKyKFbnaIlLRRiMs": ["directory_organization_KTkwbD8zAXPy0l4WbKaMa6dggbVUce"], "T1S1ZwGRdoLWnGrmt6B51yGaYsPEWq": true, "TA8vxv9JUcfHTtYC1Q3nFiZ4kWgULT": "http://preprod.marriator-api.fivecorners.ru/storage/source/pdf/2/3AnrOnZFZOGT5nuPF49y.pdf", "WJWEOeCGKJMKHNrlDbat5QfuEXXo4a": "444444444444444", "X2CSwnQZntQEdPc1Xq5lgeLahytrna": "Ястреб", "X8pLILRyG3rqSixdugK8fo2ng0Qn75": null, "ZmHWXnDnL3VQmQPzt8cj4FFbVRzssN": null, "bdM1RtrjFrn9STfGT3GG8AiU9NtqR2": "weight40", "c5gAyG7YPWV7RiCx23srwQnYV8bv5U": "http://preprod.marriator-api.fivecorners.ru/storage/source/pdf/2/vHLd1VA51857WRHwrS3P.pdf", "cjQR6vTQzEopYaOmlvFyAKaplVQlh4": "http://preprod.marriator-api.fivecorners.ru/storage/source/pdf/2/YOZubUGBtyjXthyFdj52.pdf", "gD5b0a853AzR2oRtPAtw6bfK36dASS": "http://preprod.marriator-api.fivecorners.ru/storage/source/pdf/2/2odNrzb0TeWInISX9Bkb.pdf", "jX8nCU3YLHkkME7fBUWnPKPfPhSuYT": true, "ktnWQlExQvDV7ucFdFOyW7ekL8aREv": "2021-08-03", "n1bZyr8bWZYmCOcT5KFQg1MRqvQzj2": "44444444444444444444", "nCbrHGJ11nqZrAcBzMhQgJUsK5aJ4y": "http://preprod.marriator-api.fivecorners.ru/storage/source/pdf/2/zCIrVphq1ss6I8cR5KpH.pdf", "oUprkr4BZChsISWcv20ZtlrkLH2HWu": true, "pnIXSuSWPMsx1T5IVWU7x9SNBZ7Ss4": "mess-Telegram", "q446DZ1XfuzQYSisBd63KxB6eD5sub": "http://preprod.marriator-api.fivecorners.ru/storage/source/pdf/2/lq3etshJjyBVHmHMSTT9.pdf", "qFq7ZZ6ADUYcAV2f6hDaS35yJ3T65z": "height140", "qfyZsDpYNPdRGxZFdPrbNPZhR5oHI5": true, "ry2nZlLypf03jH4Zv6vu0bDyeeIQXS": "test@mail.ru", "tBCiE8imaXPUAZAcuJBdNjnLCnM9Lq": true, "unC20BLqzsZbEEGWlnT663EkueUBUi": "male_gender", "xId3LKEIZ1w1hidPtsoEP2jPLvJoCz": false}',
      img: "http://preprod.marriator-api.fivecorners.ru/storage/source/userImg/2/i1UCPw4mjAmZd0ZCEhDt.jpeg",
      confirmRegister: 1,
      pin: 1111,
      finishRegister: 1,
      expansionData:
        '{"nalogstatus": [{"name": "1", "value": "1"}, {"name": "2", "value": "2"}, {"name": "3", "value": "3"}, {"name": "4", "value": "4"}], "c5gAyG7YPWV7RiCx23srwQnYV8bv5U": [{"name": "Имя", "value": "Андрей"}, {"name": "Фамилия", "value": "Ястребцов"}, {"name": "Отчество", "value": "Александрович"}]}',
      errorData: '{"nalogstatus": "122"}',
      estateData: null,
      requisitesData:
        '[{"bik": "044525600", "fio": "test2", "card": "5536913757516790", "account": "40702810400260004426", "cardDue": "2024-08-26", "confidant": false, "payWithCard": "no"}]',
      mapAddress: "Пакистан, провинция Пенджаб, Лахор, Фас-7, Сектор-У",
      mapRadius: "3",
      updateData: "[]",
      coordinates: "74.495005 31.472539",
      uuid: "",
    },
  },
  status: "success",
};

export const mockResponseError = {};

export const getUserInfoMockResponse = http.get(
  `${import.meta.env.VITE_GET_USER_INFO}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
