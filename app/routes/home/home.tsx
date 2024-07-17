// import { json, useLoaderData } from "@remix-run/react";

// import { getAccessToken } from "~/preferences/token/token";
// import { getUserInfo } from "~/requests/getUserInfo/getUserInfo";

// export async function clientLoader() {
//   const accessToken = await getAccessToken();

//   if (accessToken) {
//     const data = await getUserInfo(accessToken);

//     console.log("here");

//     return json(data);
//   } else {
//     throw new Response("Токен авторизации не обнаружен!", { status: 401 });
//   }
// }

export default function Home() {
  // const data = useLoaderData<typeof clientLoader>();

  return (
    // <p>{/* {JSON.stringify(data, null, 2)} */}</p>
    <p>home</p>
  );
}
