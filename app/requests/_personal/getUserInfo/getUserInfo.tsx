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
  result: {
    userData: {
      id: 151,
      name: null,
      email: "yastrebsov@gmail.com",
      email_verified_at: "2024-08-20T09:09:51.000000Z",
      created_at: "2024-08-13T14:07:22.000000Z",
      updated_at: "2024-08-22T09:42:35.000000Z",
      api_token: null,
      phone: 79152142630,
      data: '{"gov": "grazhdanstvo_KAZ", "testitem": ["directory_activities_5pHRd5GLhXfs2DXtwmQoAt6tdT9scU", "directory_activities_6YMPeugNHX07gh6RjJEtdNOebuQOnQ"], "vidideayt": ["directory_view_activities_AudJFcNa8lg8QJVLmHQjGqXxe4T1ZY"], "nalogstatus": "nalogstatus_samozanyatyj", "staticEmail": "yastrebsov@gmail.com", "staticPhoto": "http://preprod.marriator-api.fivecorners.ru/storage/source/userImg/151/VMjUvkZPy3JKSqfgZhjj.jpeg", "2Vr2TFKPAmY12FHtnyqWr2Sngg9F6s": null, "2xC9RxW86VOvK1tlENocp26QDwJNQ2": "directory_medical_book_vvKBcoSqAl02wYAt5zE2wJYeDxUbge", "3tslFpWgadwSvvmDXQ6rvvc3aTfd47": "size56-58", "4qTJxPiblqfk0MySQBb6ErqHH2k6NT": null, "5nibSuUwMDHHB965TRu8iT4exCxhRN": "directory_bank_qvaF529W1qOjnHSwKv32TiFCXgloVS", "5wLMDF7XYDitvQ09qH6SbmHHAFI1Rr": "http://preprod.marriator-api.fivecorners.ru/storage/source/pdf/151/9n61QO6Zll/[79152142634][\u041c\u0435\u0434\u0438\u0446\u0438\u043d\u0441\u043a\u0430\u044f \u043a\u043d\u0438\u0436\u043a\u0430 \u0432 \u043d\u0430\u043b\u0438\u0447\u0438\u0438  \\"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c\\"].pdf", "7nNCUNdoVpAy5x1gXYp6jgvrvxOSqm": "volosy_temnye", "87ONZiY1OqKYKiTsrKZ5q1y0KsuH2n": "shoes355", "8nnGyBf1OErAWa8EZkispver2ozsHO": null, "9nuDjP3c3Ule99uIiPArhyE1rssGHF": null, "CZV3GWeUydVTHyHlsFrs0SogYrQG2a": "region_prozhivaniya_kod_77", "HP2kvziquWyhpAPv9UmhlkRaIISQWz": "volosy_srednie", "IloSAoeA5hNj6iKQuM3saaBSmw7nvC": null, "MZ562TBT1VVWW7nYNJcPG4BlBFRXSc": "http://preprod.marriator-api.fivecorners.ru/storage/source/pdf/151/CPiLtYnOKA/[79152142634][\u0412\u043e\u0434\u0438\u0442\u0435\u043b\u044c\u0441\u043a\u043e\u0435 \u0443\u0434\u043e\u0441\u0442\u043e\u0432\u0435\u0440\u0435\u043d\u0438\u0435].pdf", "NhJmY9kzLgrF5vwVix7BiEMCXu3Skl": null, "P93JuDTcWlnJfgOJOmM1VtP9vSVnK8": null, "PNHKP24PzkJcUGI492xRoK4FdxVGmZ": "http://preprod.marriator-api.fivecorners.ru/storage/source/pdf/151/ygIMZtrYWf/[79152142634][\u041c\u0438\u0433\u0440\u0430\u0446\u0438\u043e\u043d\u043d\u0430\u044f \u043a\u0430\u0440\u0442\u0430].pdf", "PuGyZOcha8UkkMywTQw2Wa4DcLlD5m": "directory_age_IrlSYHmEbfGXS8eHxrqzFvcqaO9Hsj", "QsZI3i3WLzO5rNO2ZJjXBtx9nJBosd": "\u0410\u043d\u0434\u0440\u0435\u0439", "QtbukuJ4ALhNnMCwBQvA9PE5pIu6Zh": false, "R7ydKRH6YRdU85KI2UIql0EDWNyvnr": "directory_documentation_o8Tdo9sL762jqbHpd54aD6KK09sJtr", "TA8vxv9JUcfHTtYC1Q3nFiZ4kWgULT": "http://preprod.marriator-api.fivecorners.ru/storage/source/pdf/151/Rivy50cFO0/[79152142634][\u041f\u0440\u0438\u043c\u0435\u0440 \u043b\u044e\u0431\u043e\u0433\u043e \u0434\u043e\u043f\u0443\u0441\u043a\u0430 \u043a \u0440\u0430\u0431\u043e\u0442\u0435].pdf", "U79IpM0NHCEhRxjNT4fHZy4BF7Pb7P": "http://preprod.marriator-api.fivecorners.ru/storage/source/pdf/151/cD4463wPWe/[79152142634][\u0421\u043f\u0440\u0430\u0432\u043a\u0430 \u0441\u0430\u043c\u043e\u0437\u0430\u043d\u044f\u0442\u043e\u0433\u043e].pdf", "WJWEOeCGKJMKHNrlDbat5QfuEXXo4a": null, "X2CSwnQZntQEdPc1Xq5lgeLahytrna": "\u042f\u0441\u0442\u0440\u0435\u0431", "X8pLILRyG3rqSixdugK8fo2ng0Qn75": null, "ZmHWXnDnL3VQmQPzt8cj4FFbVRzssN": null, "bdM1RtrjFrn9STfGT3GG8AiU9NtqR2": "weight42", "c5gAyG7YPWV7RiCx23srwQnYV8bv5U": "http://preprod.marriator-api.fivecorners.ru/storage/source/pdf/151/lJXB4d42SY/[79152142634][\u0414\u043e\u043a\u0443\u043c\u0435\u043d\u0442 \u0443\u0434\u043e\u0441\u0442\u043e\u0432\u0435\u0440\u044f\u044e\u0449\u0438\u0439 \u043b\u0438\u0447\u043d\u043e\u0441\u0442\u044c].pdf", "cjQR6vTQzEopYaOmlvFyAKaplVQlh4": "http://preprod.marriator-api.fivecorners.ru/storage/source/pdf/151/BsI224GuKy/[79152142634][\u0410\u0434\u0440\u0435\u0441 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438].pdf", "d3if1LCpV10mV1FoOXeepEJc16xHt6": "vid_na_zhitelstvo", "jX8nCU3YLHkkME7fBUWnPKPfPhSuYT": false, "n1bZyr8bWZYmCOcT5KFQg1MRqvQzj2": "00000000000000000000", "nCbrHGJ11nqZrAcBzMhQgJUsK5aJ4y": "http://preprod.marriator-api.fivecorners.ru/storage/source/pdf/151/ieZhCXjyBN/[79152142634][\u041c\u0435\u0434\u0438\u0446\u0438\u043d\u0441\u043a\u0438\u0439 \u0434\u043e\u043f\u0443\u0441\u043a \u043a \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044e \u0422\u0421].pdf", "pnIXSuSWPMsx1T5IVWU7x9SNBZ7Ss4": "mess-Telegram", "qFq7ZZ6ADUYcAV2f6hDaS35yJ3T65z": "height142", "qfyZsDpYNPdRGxZFdPrbNPZhR5oHI5": false, "unC20BLqzsZbEEGWlnT663EkueUBUi": "male_gender", "vk0wcCKTq7sP67Iybq19sLyJckCZzz": ["territoriya_poiska_predlozhenij_16", "territoriya_poiska_predlozhenij_77"], "xId3LKEIZ1w1hidPtsoEP2jPLvJoCz": false}',
      img: "http://preprod.marriator-api.fivecorners.ru/storage/source/userImg/151/xjkuY0daiC3Rb4bt20I0.jpeg",
      confirmRegister: 1,
      pin: 1111,
      finishRegister: 1,
      expansionData: "[]",
      errorData: "[]",
      estateData: null,
      requisitesData: null,
      mapAddress: "",
      mapRadius: "",
      updateData: null,
      latitude: null,
      longitude: null,
      uuid: "",
      register_hash: null,
      roles: [],
    },
  },
  status: "success",
};

export const mockResponseSuccessManager = {
  result: {
    userData: {
      id: 252,
      name: "manager",
      email: "manager@gmail.com",
      email_verified_at: null,
      created_at: "2025-06-04T16:24:45.000000Z",
      updated_at: "2025-06-04T18:00:02.000000Z",
      api_token: null,
      phone: 71111111111,
      data: null,
      img: "http://preprod.marriator-api.fivecorners.ru/storage/source/directory/brand/1-logo/\u041b\u043e\u0433\u043e \u041f\u044f\u0442\u0435\u0440\u043e\u0447\u043a\u0430.png",
      confirmRegister: 1,
      pin: 1111,
      finishRegister: 1,
      expansionData: "[]",
      errorData: "[]",
      estateData: null,
      requisitesData: null,
      mapAddress: "",
      mapRadius: "",
      updateData: null,
      uuid: "6840893a63db7",
      register_hash: null,
      change_order: null,
      cancel_order: null,
      live_order: null,
      change_task: null,
      cancel_task: null,
      live_task: null,
      repeat_bid: null,
      leave_bid: null,
      refusal_task: null,
      waiting_task: null,
      latitude: null,
      longitude: null,
      roles: [
        {
          id: 3,
          name: "manager",
        },
      ],
    },
  },
  status: "success",
};

export const mockResponseError = {};

export const getUserInfoMockResponse = http.get(
  `${import.meta.env.VITE_GET_USER_INFO}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccessManager);
  }
);
