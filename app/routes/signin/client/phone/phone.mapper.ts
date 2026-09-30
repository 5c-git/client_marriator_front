import type { GetUserByHashSuccess } from "~/api/getUserByHash/getUserByHashSuccess.schema";

export class PhoneMapper {
  static mapUserPhone(userData: GetUserByHashSuccess): string {
    return userData.result.phone.toString();
  }
}
