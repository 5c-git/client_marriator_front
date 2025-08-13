import { http, delay, HttpResponse } from "msw";
import Ajv from "ajv";

import schemaSuccess from "./postDeleteTaskActivitySuccess.schema.json";
import { PostDeleteTaskActivitySuccess } from "./postDeleteTaskActivitySuccess.type";
import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

const ajv = new Ajv();

const validateSuccess = ajv.compile(schemaSuccess);

export const postDeleteTaskActivityKeys = ["postDeleteTaskActivity"];

export const postDeleteTaskActivity = async (
  accessToken: string,
  taskId: string,
  taskActivityId: string
): Promise<PostDeleteTaskActivitySuccess> => {
  try {
    const url = new URL(import.meta.env.VITE_POST_DELETE_TASK_ACTIVITY);

    const formData = new FormData();

    formData.append("taskId", taskId);
    formData.append("taskActivityId", taskActivityId);

    const request = await fetch(url, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });
    const response = await request.json();

    let data;

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    if (validateSuccess(response)) {
      data = response as unknown as PostDeleteTaskActivitySuccess;
    } else {
      console.log(validateSuccess.errors);
      throw new Response(
        `Данные запроса postDeleteTaskActivity не валидны схеме`
      );
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
  data: {
    id: 109,
    selfEmployed: false,
    status: 1,
    place: {
      id: 3,
      name: "\u041f\u044f\u0442\u0451\u0440\u043e\u0447\u043a\u0430 \u041c\u0421\u041a \u0443\u043b. \u0410\u0440\u0431\u0430\u0442 \u0434. 24",
      latitude: "55.00000000",
      longitude: "37.00000000",
      address_kladr:
        "\u0443\u043b. \u0410\u0440\u0431\u0430\u0442 \u0434. 24  \u0433.\u041c\u043e\u0441\u043a\u0432\u0430",
      logo: "\/storage\/source\/directory\/brand\/1-logo\/\u041b\u043e\u0433\u043e \u041f\u044f\u0442\u0435\u0440\u043e\u0447\u043a\u0430.png",
      region: {
        id: 2,
        name: "\u041c\u043e\u0441\u043a\u0432\u0430",
      },
      brand: {
        id: 1,
        name: "\u041f\u044f\u0442\u0451\u0440\u043e\u0447\u043a\u0430",
        logo: "\/storage\/source\/directory\/brand\/1-logo\/\u041b\u043e\u0433\u043e \u041f\u044f\u0442\u0435\u0440\u043e\u0447\u043a\u0430.png",
        description:
          "\u00ab\u041f\u044f\u0442\u0451\u0440\u043e\u0447\u043a\u0430\u00bb \u2014 \u043a\u0440\u0443\u043f\u043d\u0435\u0439\u0448\u0430\u044f \u0442\u043e\u0440\u0433\u043e\u0432\u0430\u044f \u0441\u0435\u0442\u044c \u043c\u0430\u0433\u0430\u0437\u0438\u043d\u043e\u0432 \u00ab\u0443 \u0434\u043e\u043c\u0430\u00bb \u0432 \u0420\u043e\u0441\u0441\u0438\u0438.",
      },
    },
    user: {
      id: 253,
      phone: 72222222222,
      email: "client@gmail.com",
      logo: "\/storage\/source\/directory\/brand\/1-logo\/\u041b\u043e\u0433\u043e \u041f\u044f\u0442\u0435\u0440\u043e\u0447\u043a\u0430.png",
      roles: [
        {
          id: 2,
          name: "client",
        },
      ],
    },
    orderActivities: [],
  },
};
export const mockResponseError = {};

export const postDeleteTaskActivityMockResponse = http.post(
  `${import.meta.env.VITE_POST_DELETE_TASK_ACTIVITY}`,
  async () => {
    await delay(2000);
    return HttpResponse.json(mockResponseSuccess);
  }
);
