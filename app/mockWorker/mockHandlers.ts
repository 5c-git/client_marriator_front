import { getFormMockResponse } from "~/requests/getForm/getForm";
import { postSaveFormMockResponse } from "~/requests/postSaveForm/postSaveForm";

import { postSendPhoneMockResponse } from "~/requests/postSendPhone/postSendPhone";
import { mockPostCheckCodeMockResponse } from "~/requests/postCheckCode/postCheckCode";
import { mockPostSetUserPinMockResponse } from "~/requests/postSetUserPin/postSetUserPin";

import { postFinishRegisterResponse } from "~/requests/postFinishRegister/postFinishRegister";
import { postCheckPinResponse } from "~/requests/postCheckPin/postCheckPin";

import { getUserInfoMockResponse } from "~/requests/getUserInfo/getUserInfo";
import { getUserPersonalMenuMockResponse } from "~/requests/getUserPersonalMenu/getUserPersonalMenu";
import { getUserFieldsMockResponse } from "~/requests/getUserFields/getUserFields";
import { getStaticUserInfoMockResponse } from "~/requests/getStaticUserInfo/getStaticUserInfo";
import { mockPostSetUserEmailMockResponse } from "~/requests/postSetUserEmail/postSetUserEmail";
import { postCheckEmailCodeMockResponse } from "~/requests/postCheckEmailCode/postCheckEmailCode";
import { postStartRestorePinMockResponse } from "~/requests/postStartRestorePin/postStartRestorePin";
import { postCheckCodeRestoreMockResponse } from "~/requests/postCheckCodeRestore/postCheckCodeRestore";
import { postPersonalSetUserEmailMockResponse } from "~/requests/postPersonalSetUserEmail/postPersonalSetUserEmail";
import { postChangeUserPhoneMockResponse } from "~/requests/postChangeUserPhone/postChangeUserPhone";
import { postPersonalCheckEmailCodeMockResponse } from "~/requests/postPersonalCheckEmailCode/postPersonalCheckEmailCode";
import { postConfirmChangeUserPhoneMockResponse } from "~/requests/postConfirmChangeUserPhone/postConfirmChangeUserPhone";
import { getFormActivitiesMockResponse } from "~/requests/getFormActivities/getFormActivities";
import { postSaveUserFieldsActivitiesMockResponse } from "~/requests/postSaveUserFieldsActivities/postSaveUserFieldsActivities";
import { getRequisitesDataMockResponse } from "~/requests/getRequisitesData/getRequisitesData";
import { postSaveRequisitesDataMockResponse } from "~/requests/postSaveRequisitesData/postSaveRequisitesData";
import { getBikMockResponse } from "~/requests/getBik/getBik";
import { postDeleteRequisiteMockResponse } from "~/requests/postDeleteRequisite/postDeleteRequisite";
import { getGeoDataMockResponse } from "~/requests/getGeoData/getGeoData";
import { getMapFieldMockResponse } from "~/requests/getMapField/getMapField";
import { postSetMapFieldMockResponse } from "~/requests/postSetMapField/postSetMapField";
import { getSettingsFromKeyMockResponse } from "~/requests/getSettingsFromKey/getSettingsFromKey";

export const handlers = [
  getFormMockResponse,
  postSaveFormMockResponse,
  postSendPhoneMockResponse,
  mockPostCheckCodeMockResponse,
  mockPostSetUserPinMockResponse,
  postFinishRegisterResponse,
  postCheckPinResponse,
  getUserInfoMockResponse,
  getUserPersonalMenuMockResponse,
  getUserFieldsMockResponse,
  getStaticUserInfoMockResponse,
  mockPostSetUserEmailMockResponse,
  postCheckEmailCodeMockResponse,
  postStartRestorePinMockResponse,
  postCheckCodeRestoreMockResponse,
  postPersonalSetUserEmailMockResponse,
  postChangeUserPhoneMockResponse,
  postPersonalCheckEmailCodeMockResponse,
  postConfirmChangeUserPhoneMockResponse,
  getFormActivitiesMockResponse,
  postSaveUserFieldsActivitiesMockResponse,
  getRequisitesDataMockResponse,
  postSaveRequisitesDataMockResponse,
  getBikMockResponse,
  postDeleteRequisiteMockResponse,
  getGeoDataMockResponse,
  getMapFieldMockResponse,
  postSetMapFieldMockResponse,
  getSettingsFromKeyMockResponse,
];
