import { token } from "brandi";


import type { getDocumentSigned } from "~/api/_personal/_documents/getDocumentSigned/getDocumentSigned";
import type { postSignedDocument } from "~/api/_personal/_documents/postSignedDocument/postSignedDocument";
import type { postRetriesSms } from "~/api/_personal/postRetriesSms/postRetriesSms";
import type { postSendCode } from "~/api/_personal/postSendCode/postSendCode";

import type { postCreateTestDoc } from "./postCreateTestDoc/postCreateTestDoc";

export type GetDocumentSigned = typeof getDocumentSigned;
export type PostSignedDocument = typeof postSignedDocument;
export type PostRetriesSms = typeof postRetriesSms;
export type PostSendCode = typeof postSendCode;
export type PostCreateTestDoc = typeof postCreateTestDoc;

export const signPrivateTokens = {
  getDocumentSigned: token<GetDocumentSigned>(
    "documents-sign-private:getDocumentSigned",
  ),
  postSignedDocument: token<PostSignedDocument>(
    "documents-sign-private:postSignedDocument",
  ),
  postRetriesSms: token<PostRetriesSms>("documents-sign-private:postRetriesSms"),
  postSendCode: token<PostSendCode>("documents-sign-private:postSendCode"),
  postCreateTestDoc: token<PostCreateTestDoc>(
    "documents-sign-private:postCreateTestDoc",
  ),
};

