import { UsersMobileViewInterface } from "~/shared/views/UsersList/UsersMobileViewInterface";

export type UserPreview = {
  user: UsersMobileViewInterface["users"][0];
  to?: string;
  isActive?: boolean;
};
