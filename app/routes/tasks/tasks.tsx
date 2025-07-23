import { useOutletContext } from "react-router";

export default function Tasks() {
  const showMap = useOutletContext<boolean>();
  return (
    <>
      <p>Tasks</p>
    </>
  );
}
