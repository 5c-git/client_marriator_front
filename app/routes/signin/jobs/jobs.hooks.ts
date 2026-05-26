import { useState, useCallback } from "react";

import { useStore } from "~/store/store";

import { Entity } from "~/shared/views/EntitiesListView/EntitesListViewInterface";

export function useSigninJobsHooks() {

    const mapView = useStore((state) => state.mapView);
    const setMapView = useStore((state) => state.setMapView);

    const [activeCard, setActiveCard] = useState<Entity | null>(null);



    const openDialog = useCallback((enitity: Entity) => {
        setActiveCard(enitity);
    }, []);
  
    const closeDialog = useCallback(() => {
        setActiveCard(null);
    }, []);
  
    return {
        mapView,
        setMapView,
        activeCard,
        setActiveCard,
        openDialog,
        closeDialog
    };
  }