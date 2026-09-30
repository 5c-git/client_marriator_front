import React from "react";

type User = {
  id: number;
  status: number;
  name: string | null;
  email: string;
  phone: string;
  address: string[] | null;
  logo: string | null;
};

export type UsersMobileViewInterface = {
  translation: "clients" | "managers" | "supervisors";
  users: User[];
  usersListView: (user: User) => undefined | React.ReactNode;
  usersTableView: (user: User) => undefined | React.ReactNode;
};
