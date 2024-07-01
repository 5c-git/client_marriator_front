import { getFormMockResponse } from "~/requests/getForm/getForm";
import { postSaveFormMockResponse } from "~/requests/postSaveForm/postSaveForm";

import { postSendPhoneMockResponse } from "~/requests/postSendPhone/postSendPhone";
import { mockPostCheckCodeMockResponse } from "~/requests/postCheckCode/postCheckCode";
import { mockPostSetUserPinMockResponse } from "~/requests/postSetUserPin/postSetUserPin";

export const handlers = [
  getFormMockResponse,
  postSaveFormMockResponse,
  postSendPhoneMockResponse,
  mockPostCheckCodeMockResponse,
  mockPostSetUserPinMockResponse,
];
