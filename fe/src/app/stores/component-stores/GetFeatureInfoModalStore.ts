import { action, computed, makeAutoObservable, observable } from "mobx";
import { RootStore } from "../RootStore";
import { Feature } from "ol";
import Geometry from "ol/geom/Geometry";

export class GetFeatureInfoModalStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    @observable public show: boolean = false;

    @action public setShow = (input: boolean): void => {
        this.show = input;
    }

    @observable public Content:
        Map<string, { key: string, value: string }> =
        new Map<string, { key: string, value: string }>()
    @computed get GetContent(): { key: string, value: string }[] {
        return Array.from(this.Content.values())
    }

    private ValueNormalizer = (input: string | number | Date | boolean | null | undefined): string => {
        if (typeof input === 'string') {
            return input;
        }
        if (input === null || input === undefined) {
            return "";
        }
        if (typeof input === 'number' || typeof input === 'boolean') {
            return input.toString();
        }
        return input.toString();
    }

    private KeyNormalizer = {
        CamelCaseToHumanReadable: (input: string): string => {
            return input
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, str => str.toUpperCase())
                .toLowerCase()
                .replace(/^\w/, c => c.toUpperCase());
        }
    }

    @action public OnCloseAction = () => {
        this.setShow(false);
    };

    @action public OnOpenAction = (point: Feature<Geometry> | undefined) => {
        this.Content.clear();
        if (point === undefined) {
            return;
        }
        Object.entries(point.getProperties()).forEach(i => {
            if (typeof i[1] !== 'object') {
                this.Content.set(i[0],
                    {
                        key: this.KeyNormalizer.CamelCaseToHumanReadable(i[0]),
                        value: this.ValueNormalizer(i[1])
                    }
                );
            }
        });
        this.setShow(true);
    }
}