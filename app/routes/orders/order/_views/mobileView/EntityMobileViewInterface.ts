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
  activities: {
    id: number;
    name: string;
    count: number;
    route: number;
  }[];
  responsiblePerson: null | {
    id: number;
    phone: number;
    email: string;
    logo: string;
  };
};

export type EntityMobileViewInterface = {
  translation: "assignment";
  entity: Entity;
  headerBackAction: () => void;
  headerButtonAction?: () => void;
  activitySlot: (activity: Entity["activities"][0]) => React.ReactNode;
  actionSlot: () => React.ReactNode;
};
