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
};

export type EntitiesListViewInterface = {
  translation: "orders";
  mapView: boolean;
  entities: Entity[];
  entityListView: (entity: Entity) => React.ReactNode;
  entityMapView: (entity: Entity) => React.ReactNode;
};
