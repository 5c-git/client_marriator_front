import { useOutletContext } from "react-router";

export default function Requests() {
  const showMap = useOutletContext<boolean>();
  return (
    <>
      <p>Requests</p>
    </>
  );
}
