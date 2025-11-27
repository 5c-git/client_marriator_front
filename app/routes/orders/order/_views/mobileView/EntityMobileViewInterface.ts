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
};

export type EntityMobileViewInterface = {
  translation: "order";
  entity: Entity;
  headerBackAction: () => void;
  headerButtonAction?: () => void;
  activitySlot: (activity: Entity["services"][0]) => React.ReactNode;
  actionSlot: () => React.ReactNode;
};
