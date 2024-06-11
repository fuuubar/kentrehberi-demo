
import Map from "ol/Map";
import { MapConstructor } from "./MapConstructor";

export interface MapCoordinate {
    Longitude: number // x
    Latitude: number // y
}

export class _AppMap {
    private static _instance: _AppMap;

    public static Instance() {
        return this._instance || (this._instance = new this());
    }

    public mapConstructor = MapConstructor

    public map: Map | undefined;

}

export const AppMap = _AppMap.Instance();