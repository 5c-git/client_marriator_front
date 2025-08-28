import type { Route } from "./+types/request";

import { useStore } from "~/store/store";
import { getBid } from "~/requests/_personal/getBid/getBid";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const requestData = await getBid(accessToken, params.requestId);

    const data = requestData.data;

    return {
      data,
    };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Requests() {
  // { loaderData }: Route.ComponentProps
  // const showMap = useOutletContext<boolean>();
  return (
    <>
      <p>
        смотри запрос <b>getBid</b>
      </p>
    </>
  );
}
