import React from "react";

type Entity = {
  id: string;
  status: number;
  place: {
    id: number;
    name: string;
    logo: string;
    region: string;
  };
  selfEmployed: boolean;
  route: number;
  services: {
    id: number;
    name: string;
    count: number;
    route: number;
  }[];
  project: null | {
    id: number;
    logo: string;
    name: string;
  };
  creatingPerson: null | {
    id: number;
    role: "manager" | "supervisor" | "client" | "specialist";
    name: string;
    phone: number;
    email: string;
    logo: string;
  };
  acceptingPerson: null | {
    id: number;
    role: "manager" | "supervisor" | "client" | "specialist";
    name: string;
    phone: number;
    email: string;
    logo: string;
  };
  invitedPersons: {
    id: number;
    role: "manager" | "supervisor" | "client" | "specialist";
    name: string;
    phone: number;
    email: string;
    logo: string;
  }[];
};

export type EntityMobileViewInterface = {
  translation: "order" | "task";
  entity: Entity;
  headerBackAction: () => void;
  headerButtonAction?: () => void;
  serviceSlot: (service: Entity["services"][0]) => React.ReactNode;
  actionSlot: () => React.ReactNode;
};
