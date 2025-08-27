import {
  // useOutletContext,
  Link,
} from "react-router";
import type { Route } from "./+types/requests";

import { useStore } from "~/store/store";
import { getBids } from "~/requests/_personal/getBids/getBids";

export async function clientLoader() {
  const accessToken = useStore.getState().accessToken;

  if (accessToken) {
    const requestsData = await getBids(accessToken);

    const cards = requestsData.data;

    return {
      cards,
    };
  } else {
    throw new Response("Токен авторизации не обнаружен!", { status: 401 });
  }
}

export default function Requests({ loaderData }: Route.ComponentProps) {
  // const showMap = useOutletContext<boolean>();
  return (
    <>
      <p>
        смотри запрос <b>getBids</b>
      </p>
      {loaderData.cards.map((item) => (
        <Link key={item.id} to={`requests/${item.id}`}>
          ID карточки {item.id}
        </Link>
      ))}
    </>
  );
}
