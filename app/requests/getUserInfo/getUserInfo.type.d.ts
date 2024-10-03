/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface GetUserInfoSuccess {
  result: {
    userData: {
      id: number;
      name: null | string;
      email: string;
      email_verified_at: string | null;
      created_at: string;
      updated_at: string;
      api_token: null;
      phone: number;
      data: string;
      img: string;
      confirmRegister: number;
      pin: number;
      finishRegister: number;
      expansionData: string | null;
      errorData: string | null;
      estateData: string | null;
      requisitesData: string | null;
      mapAddress: string;
      mapRadius: string;
      coordinates: null | string;
      updateData: null | string;
      change_fields: null;
      date_for_send: null;
    };
  };
  status: string;
}
