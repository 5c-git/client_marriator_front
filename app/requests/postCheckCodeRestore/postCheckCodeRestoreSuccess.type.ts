/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface PostCheckCodeRestoreSuccess {
  status: "success";
  result: {
    token: {
      token_type: "Bearer";
      expires_in: number;
      access_token: string;
      refresh_token: string;
    };
  };
}
