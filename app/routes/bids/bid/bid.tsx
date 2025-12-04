import { useOutletContext } from "react-router";
import type { GetBidSuccess } from "~/requests/_personal/getBid/getBidSuccess.schema";

export default function Bid() {
  const { bidData, editMode } = useOutletContext<{
    bidData: GetBidSuccess["data"];
    editMode: boolean;
  }>();

  return (
    <>
      <p>bid</p>
    </>
  );
}
