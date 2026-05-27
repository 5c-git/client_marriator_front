type UsersLayoutRole =
  | "admin"
  | "manager"
  | "supervisor"
  | "client"
  | "specialist";

export type UsersLayoutTabLabelKey =
  | "tabs.client"
  | "tabs.manager"
  | "tabs.supervisor";

export type UsersLayoutTabConfig = {
  labelKey: UsersLayoutTabLabelKey;
  path: "/users" | "/users/managers" | "/users/supervisors";
  key: string;
};

export type UsersLayoutTabsMap = Record<
  UsersLayoutRole,
  UsersLayoutTabConfig[]
>;

export class UsersLayoutService {
  getTabsMap(): UsersLayoutTabsMap {
    return {
      admin: [
        {
          labelKey: "tabs.client",
          path: "/users",
          key: "clients",
        },
        {
          labelKey: "tabs.manager",
          path: "/users/managers",
          key: "managers",
        },
        {
          labelKey: "tabs.supervisor",
          path: "/users/supervisors",
          key: "supervisors",
        },
      ],
      manager: [
        {
          labelKey: "tabs.client",
          path: "/users",
          key: "clients",
        },
        {
          labelKey: "tabs.supervisor",
          path: "/users/supervisors",
          key: "supervisors",
        },
      ],
      supervisor: [
        {
          labelKey: "tabs.client",
          path: "/users",
          key: "clients",
        },
      ],
      client: [],
      specialist: [],
    };
  }
}
