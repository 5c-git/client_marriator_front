import { getFormMockResponse } from "~/requests/getForm/getForm";
import { postSaveFormMockResponse } from "~/requests/postSaveForm/postSaveForm";

import { postSendPhoneMockResponse } from "~/requests/postSendPhone/postSendPhone";
import { mockPostCheckCodeMockResponse } from "~/requests/postCheckCode/postCheckCode";
import { mockPostSetUserPinMockResponse } from "~/requests/postSetUserPin/postSetUserPin";

import { postFinishRegisterResponse } from "~/requests/postFinishRegister/postFinishRegister";
import { postCheckPinResponse } from "~/requests/postCheckPin/postCheckPin";

import { getUserInfoMockResponse } from "~/requests/_personal/getUserInfo/getUserInfo";
import { getUserPersonalMenuMockResponse } from "~/requests/_personal/getUserPersonalMenu/getUserPersonalMenu";

import { getUserFieldsMockResponse } from "~/requests/_personal/getUserFields/getUserFields";
import { getStaticUserInfoMockResponse } from "~/requests/getStaticUserInfo/getStaticUserInfo";
import { mockPostSetUserEmailMockResponse } from "~/requests/_personal/postSetUserEmail/postSetUserEmail";
import { postCheckEmailCodeMockResponse } from "~/requests/postCheckEmailCode/postCheckEmailCode";
import { postStartRestorePinMockResponse } from "~/requests/postStartRestorePin/postStartRestorePin";
import { postCheckCodeRestoreMockResponse } from "~/requests/postCheckCodeRestore/postCheckCodeRestore";
import { postPersonalSetUserEmailMockResponse } from "~/requests/postPersonalSetUserEmail/postPersonalSetUserEmail";
import { postChangeUserPhoneMockResponse } from "~/requests/_personal/postChangeUserPhone/postChangeUserPhone";
import { postPersonalCheckEmailCodeMockResponse } from "~/requests/_personal/postPersonalCheckEmailCode/postPersonalCheckEmailCode";
import { postConfirmChangeUserPhoneMockResponse } from "~/requests/_personal/postConfirmChangeUserPhone/postConfirmChangeUserPhone";
import { getFormActivitiesMockResponse } from "~/requests/_personal/getFormActivities/getFormActivities";
import { postSaveUserFieldsActivitiesMockResponse } from "~/requests/_personal/postSaveUserFieldsActivities/postSaveUserFieldsActivities";
import { getRequisitesDataMockResponse } from "~/requests/_personal/getRequisitesData/getRequisitesData";
import { postSaveRequisitesDataMockResponse } from "~/requests/_personal/postSaveRequisitesData/postSaveRequisitesData";
import { getBikMockResponse } from "~/requests/_personal/getBik/getBik";
import { postDeleteRequisiteMockResponse } from "~/requests/_personal/postDeleteRequisite/postDeleteRequisite";
import { getGeoDataMockResponse } from "~/requests/getGeoData/getGeoData";
import { getMapFieldMockResponse } from "~/requests/_personal/getMapField/getMapField";
import { postSetMapFieldMockResponse } from "~/requests/_personal/postSetMapField/postSetMapField";
import { getSettingsFromKeyMockResponse } from "~/requests/_settings/getSettingsFromKey/getSettingsFromKey";
import { getDocumentSignedMockResponse } from "~/requests/_personal/_documents/getDocumentSigned/getDocumentSigned";
import { getDocumentConcludeMockResponse } from "~/requests/_personal/_documents/getDocumentConclude/getDocumentConclude";
import { getDocumentTerminateMockResponse } from "~/requests/_personal/_documents/getDocumentTerminate/getDocumentTerminate";
import { postSetConcludeMockResponse } from "~/requests/_personal/_documents/postSetConclude/postSetConclude";
import { postSetTerminateMockResponse } from "~/requests/_personal/_documents/postSetTerminate/postSetTerminate";
import { getDocumentArchiveMockResponse } from "~/requests/_personal/_documents/getDocumentArchive/getDocumentArchive";
import { getDocumentInquiriesMockResponse } from "~/requests/_personal/_documents/getDocumentInquiries/getDocumentInquiries";
import { getCompanyAndCertificatesInquiriesMockResponse } from "~/requests/_personal/_documents/getCompanyAndCertificatesInquiries/getCompanyAndCertificatesInquiries";
import { getModerationClientMockResponse } from "~/requests/_personal/getModerationClient/getModerationClient";
import { getUserByHashMockResponse } from "~/requests/getUserByHash/getUserByHash";
import { postConfirmUserRegisterMockResponse } from "~/requests/_personal/postConfirmUserRegister/postConfirmUserRegister";
import { getBrandMockResponse } from "~/requests/getBrand/getBrand";
import { postSetBrandImgMockResponse } from "~/requests/postSetBrandImg/postSetBrandImg";
import { getPlaceMockResponse } from "~/requests/getPlace/getPlace";
import { postSetPlaceMockResponse } from "~/requests/postSetPlace/postSetPlace";
import { postDelPlaceMockResponse } from "~/requests/postDelPlace/postDelPlace";
import { postSetUserDataMockResponse } from "~/requests/postSetUserData/postSetUserData";

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
  getDocumentSignedMockResponse,
  getDocumentConcludeMockResponse,
  getDocumentTerminateMockResponse,
  postSetConcludeMockResponse,
  postSetTerminateMockResponse,
  getDocumentArchiveMockResponse,
  getDocumentInquiriesMockResponse,
  getCompanyAndCertificatesInquiriesMockResponse,
  getModerationClientMockResponse,
  getUserByHashMockResponse,
  postConfirmUserRegisterMockResponse,
  getBrandMockResponse,
  postSetBrandImgMockResponse,
  getPlaceMockResponse,
  postSetPlaceMockResponse,
  postDelPlaceMockResponse,
  postSetUserDataMockResponse,
];
