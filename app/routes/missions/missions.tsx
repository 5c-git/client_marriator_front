import { redirect, useOutletContext } from "react-router";
import { withLocale } from "~/shared/withLocale";

export async function clientLoader() {
  throw redirect(withLocale("/"));
}

export default function Missions() {
  const showMap = useOutletContext<boolean>();
  return (
    <>
      <p>Missions</p>
    </>
  );
}
