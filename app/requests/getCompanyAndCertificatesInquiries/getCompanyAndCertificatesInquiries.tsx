import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";
import addFormats from "ajv-formats";

import getCompanyAndCertificatesInquiriesSuccess from "./getCompanyAndCertificatesInquiriesSuccess.schema.json";
import { GetCompanyAndCertificatesInquiriesSuccess } from "./getCompanyAndCertificatesInquiriesSuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();
addFormats(ajv);

const validateSuccess = ajv.compile(getCompanyAndCertificatesInquiriesSuccess);

export const getCompanyAndCertificatesInquiriesKeys = [
  "getCompanyAndCertificatesInquiries",
];

export const getCompanyAndCertificatesInquiries = async (
  accessToken: string
): Promise<GetCompanyAndCertificatesInquiriesSuccess> => {
  try {
    const url = new URL(
      import.meta.env.VITE_GET_COMPANY_AND_CERTIFICATES_INQUIRIES
    );

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
      data = response as unknown as GetCompanyAndCertificatesInquiriesSuccess;
    } else {
      throw new Response(
        `Данные запроса getCompanyAndCertificatesInquiries не валидны схеме`
      );
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
  status: "success",
  result: {
    organization: [
      {
        uuid: "directory_organization_KTkwbD8zAXPy0l4WbKaMa6dggbVUce",
        name: "\u0418\u041f \u0411\u0435\u043b\u043a\u0438\u043d",
      },
      {
        uuid: "directory_organization_ZES8p5khlCP5Bnk8F5H4BkoX7d7nK4",
        name: '\u041e\u041e\u041e "\u0411\u0438\u042d\u043d\u0422\u0438 \u0410\u043b\u044c\u044f\u043d\u0441"',
      },
      {
        uuid: "1bb0b180-e4ee-11e0-bc07-005056c00008",
        name: "\u0422\u0435\u0441\u0442_\u0410\u041a_09",
      },
      {
        uuid: "5aed28b9-fe1c-11df-aaf5-005056c00008",
        name: "\u0411\u0430\u0443\u043d\u0442\u0438",
      },
    ],
    certificates: [
      {
        id: 1,
        key: "\u0421\u043f\u0440\u0430\u0432\u043a\u0430 \u043e \u0434\u043e\u0445\u043e\u0434\u0430\u0445",
        value: "2-\u041d\u0414\u0424\u041b",
      },
    ],
  },
};

export const mockResponseError = {};

export const getCompanyAndCertificatesInquiriesMockResponse = http.get(
  `${import.meta.env.VITE_GET_COMPANY_AND_CERTIFICATES_INQUIRIES}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
