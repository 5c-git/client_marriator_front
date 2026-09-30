import { injected } from "brandi";

import type {
  GetDocumentSigned,
  PostSignedDocument,
  PostRetriesSms,
  PostSendCode,
  PostCreateTestDoc,
} from "./sign.private-tokens";
import { signPrivateTokens } from "./sign.private-tokens";

import { AppService } from "~/shared/container/container.service";
import { appTokens } from "~/shared/container/container.tokens";

export class SignService {
  constructor(
    private readonly appService: AppService,
    private readonly getDocumentSigned: GetDocumentSigned,
    private readonly postSignedDocument: PostSignedDocument,
    private readonly postRetriesSms: PostRetriesSms,
    private readonly postSendCode: PostSendCode,
    private readonly postCreateTestDoc: PostCreateTestDoc,
  ) {}

  async loadUnsignedDocuments() {
    const accessToken = this.appService.getToken();
    const data = await this.getDocumentSigned(accessToken);
    return data.data;
  }

  async signAllDocuments() {
    const accessToken = this.appService.getToken();
    return await this.postSignedDocument(accessToken);
  }

  async resendSms() {
    const accessToken = this.appService.getToken();
    return await this.postRetriesSms(accessToken);
  }

  async submitSmsCode(code: number) {
    const accessToken = this.appService.getToken();
    return await this.postSendCode(accessToken, code);
  }

  async createTestDoc() {
    const accessToken = this.appService.getToken();
    return await this.postCreateTestDoc(accessToken);
  }
}

injected(
  SignService,
  appTokens.appService,
  signPrivateTokens.getDocumentSigned,
  signPrivateTokens.postSignedDocument,
  signPrivateTokens.postRetriesSms,
  signPrivateTokens.postSendCode,
  signPrivateTokens.postCreateTestDoc,
);

