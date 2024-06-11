import { createContext } from 'react';
import { configure } from 'mobx';
import { MapStore } from "./page-stores/MapStore";
import { PointsStore } from './api-stores/PointsStore';
import { PropertiesStore } from './api-stores/PropertiesStore';
import { GetFeatureInfoModalStore } from './component-stores/GetFeatureInfoModalStore';

configure({ enforceActions: 'always' });

export class RootStore {

    public pageStores: {
        mapStore: MapStore;
    }

    public componentStores: {
        getFeatureInfoModalStore: GetFeatureInfoModalStore
    }

    public apiStores: {
        pointsStore: PointsStore,
        propertiesStore: PropertiesStore
    }

    public constructor() {
        this.pageStores = {
            mapStore: new MapStore(this)
        }
        this.apiStores = {
            pointsStore: new PointsStore(this),
            propertiesStore: new PropertiesStore(this)
        }
        this.componentStores = {
            getFeatureInfoModalStore: new GetFeatureInfoModalStore(this)
        }
    }
}

export const RootStoreContext = createContext(new RootStore());