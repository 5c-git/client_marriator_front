import type { Coordinates } from "~/shared/ymap/ymap";

export type Entity = {
  id: number;
  userId: number;
  status: number;
  statusColor: string;
  header: string;
  subHeader: string;
  address: {
    logo: string;
    text: string;
  };
  duration: {
    start: string | null;
    end: string | null;
  };
  coordinates: Coordinates;
  units: string;
  currency: string;
  createdAt: string;
  placeName: string;
};

export type DashboardListViewInterface = {
  translation: "orders" | "tasks" | "jobs";
  view: "list" | "table" | "map";
  setView: (view: "list" | "table" | "map") => void;
  entityType: "order" | "task" | "bid" | "job";
  entities: Entity[];
  sorting: "ascending" | "descending";

  entityListView: (entity: Entity) => React.ReactNode;
  entityTableView: (entity: Entity) => React.ReactNode;
  entityMapAction: (entity: Entity) => void;
};
