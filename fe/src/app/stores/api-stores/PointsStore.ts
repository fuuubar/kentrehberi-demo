import { action, computed, makeAutoObservable, observable, runInAction } from "mobx";
import { RootStore } from "../RootStore";
import { IPointsModel } from "../../models/PointsModel";
import { PointsAPI } from "../../api/PointsAPI";
import Feature from "ol/Feature";
import { Features } from "../../../helpers/services/map/Features";

export class PointsStore {
    private readonly features: Features = new Features();

    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    @observable private List: Map<string, IPointsModel> = new Map<string, IPointsModel>();
    @computed get GetList(): IPointsModel[] {
        return Array.from(this.List.values());
    }
    @computed get GetFeatures(): Feature[] {
        return Array.from(this.List.values()).map(i => this.features.CreateFeature.FromWktString(i));
    }

    @action public FetchList = async (): Promise<void> => {
        const data: IPointsModel[] = await new PointsAPI().list();
        runInAction(() => {
            data.forEach(i => {
                if (this.List.has(i.id) === false) {
                    this.List.set(i.id, i);
                }
            });
        });
    }
}