import { UnxpectedError } from "~/shared/unexpectedError/unexpectedError";

export const postCreateTestDoc = async (accessToken: string) => {
  try {
    // const formData = new FormData();

    // formData.append("bidId", bidId);

    const request = await fetch(
      "http://preprod.marriator-api.fivecorners.ru/api/personal/documents/createTestDoc",
      {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        // body: formData,
      },
    );
    const response = await request.json();

    // let data;

    if (request.status === 401) {
      throw new Response("Unauthorized", {
        status: 401,
      });
    }

    // const parsed = postRetriesSmsSuccessSchema.safeParse(response);
    // const parsedError = postRetriesSmsErrorSchema.safeParse(response);

    // if (parsed.success) {
    //   data = parsed.data;
    // } else if (parsedError.success) {
    //   data = parsedError.data;
    // } else {
    //   console.log(parsed.error);
    //   throw new Response(`Данные запроса postRetriesSms не валидны схеме`);
    // }

    return response;
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
