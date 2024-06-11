import { action, makeAutoObservable, observable, runInAction } from "mobx";
import { RootStore } from "../RootStore";
import { IPropertiesModel } from "../../models/PropertiesModel";
import { PropertiesAPI } from "../../api/PropertiesAPI";
import Feature from "ol/Feature";
import { Features } from "../../../helpers/services/map/Features";
import { Extent } from "ol/extent";

export class PropertiesStore {
    private readonly features: Features = new Features();

    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    @observable public List: Map<string, string> = new Map<string, string>();

    @action public FetchList = async (extent?: Extent): Promise<Feature[]> => {
        const additions: IPropertiesModel[] = []
        const data: IPropertiesModel[] = await new PropertiesAPI().list(extent);
        data.forEach(i => {
            if (this.List.has(i.id) === false) {
                additions.push(i);
            }
        })
        runInAction(() => {
            additions.forEach(i => {
                this.List.set(i.id, i.id);
            });
        });
        return additions.map(i => this.features.CreateFeature.FromWktString(i));
    }
}