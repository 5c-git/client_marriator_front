import { token } from "brandi";

import type { GetSpecialistForBidSuccess } from "~/api/_personal/getSpecialistForBid/getSpecialistForBidSuccess.schema";
import type { GetRadiusSelectSuccess } from "~/api/_personal/getRadiusSelect/getRadiusSelectSuccess.schema";
import { PostInvoiceBidSuccess } from "~/api/_personal/postInvoiceBid/postInvoiceBidSuccess.schema";

export type GetSpecialistForBid = (
  accessToken: string,
  bidId: string,
) => Promise<GetSpecialistForBidSuccess>;

export type GetRadiusSelect = (
  accessToken: string,
) => Promise<GetRadiusSelectSuccess>;

export type InvoiceBid = (
  accessToken: string,
  bidId: string,
  specialistIds: string[],
) => Promise<PostInvoiceBidSuccess>;

export const specialistsPrivateTokens = {
  getSpecialistForBid: token<GetSpecialistForBid>(
    "specialists-private:getSpecialistForBid",
  ),
  getRadiusSelect: token<GetRadiusSelect>(
    "specialists-private:getRadiusSelect",
  ),
  invoiceBid: token<InvoiceBid>("specialists-private:invoiceBid"),
};
