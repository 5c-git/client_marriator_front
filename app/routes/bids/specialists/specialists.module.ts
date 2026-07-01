import { Container } from "brandi";

import { appContainer } from "~/shared/container/container";

import { specialistsPrivateTokens } from "./specialists.private-tokens";
import { specialistsTokens } from "./specialists.tokens";
import { SpecialistsService } from "./specialists.service";

export const specialistsContainer = new Container().extend(appContainer);

import { getSpecialistForBid } from "~/api/_personal/getSpecialistForBid/getSpecialistForBid";
import { getRadiusSelect } from "~/api/_personal/getRadiusSelect/getRadiusSelect";
import { postInvoiceBid } from "~/api/_personal/postInvoiceBid/postInvoiceBid";

specialistsContainer
  .bind(specialistsPrivateTokens.getSpecialistForBid)
  .toConstant((accessToken, bidId) => getSpecialistForBid(accessToken, bidId));

specialistsContainer
  .bind(specialistsPrivateTokens.getRadiusSelect)
  .toConstant((accessToken) => getRadiusSelect(accessToken));

specialistsContainer
  .bind(specialistsPrivateTokens.invoiceBid)
  .toConstant((accessToken, bidId, specialistIds) =>
    postInvoiceBid(accessToken, bidId, specialistIds),
  );

specialistsContainer
  .bind(specialistsTokens.specialistsService)
  .toInstance(SpecialistsService)
  .inSingletonScope();
