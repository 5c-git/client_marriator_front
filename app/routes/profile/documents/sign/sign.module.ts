import { Container } from "brandi";


import { getDocumentSigned } from "~/api/_personal/_documents/getDocumentSigned/getDocumentSigned";
import { postSignedDocument } from "~/api/_personal/_documents/postSignedDocument/postSignedDocument";
import { postRetriesSms } from "~/api/_personal/postRetriesSms/postRetriesSms";
import { postSendCode } from "~/api/_personal/postSendCode/postSendCode";

import { postCreateTestDoc } from "./postCreateTestDoc/postCreateTestDoc";
import { SignService } from "./sign.service";
import { signPrivateTokens } from "./sign.private-tokens";
import { signTokens } from "./sign.tokens";

import { appContainer } from "~/shared/container/container";

export const signContainer = new Container().extend(appContainer);


signContainer.bind(signPrivateTokens.getDocumentSigned).toConstant(getDocumentSigned);
signContainer
  .bind(signPrivateTokens.postSignedDocument)
  .toConstant(postSignedDocument);
signContainer.bind(signPrivateTokens.postRetriesSms).toConstant(postRetriesSms);
signContainer.bind(signPrivateTokens.postSendCode).toConstant(postSendCode);
signContainer
  .bind(signPrivateTokens.postCreateTestDoc)
  .toConstant(postCreateTestDoc);

signContainer
  .bind(signTokens.signService)
  .toInstance(SignService)
  .inSingletonScope();

