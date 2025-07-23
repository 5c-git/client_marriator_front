import { useOutletContext } from "react-router";

export default function Missions() {
  const showMap = useOutletContext<boolean>();
  return (
    <>
      <p>Missions</p>
    </>
  );
}
