import Map from "ol/Map";
import View from "ol/View";
import { Coordinate } from "ol/coordinate";
import { AppMap, MapCoordinate } from ".";
import { Extent } from "ol/extent";
import { Size } from "ol/size";
import { EnvironmentTypes, Environments } from "../environment";

export class MapConstructor {

	private _mapElementId: string = 'map';
	private _initialZoomLevel: number;
	private _initialCenter: Coordinate;
	private _maximumZoomLevel: number = 21

	public constructor(initialZoomLevel: number, initialCenter: MapCoordinate) {
		this._initialZoomLevel = initialZoomLevel
		this._initialCenter = [initialCenter.Longitude, initialCenter.Latitude]
		AppMap.map = new Map({
			target: this._mapElementId,
			view: new View({
				center: this._initialCenter,
				maxZoom: this._maximumZoomLevel,
				zoom: this._initialZoomLevel,
			})
		})
		if (Environments.EnvironmentType === EnvironmentTypes.LOCAL) {
			(globalThis.window as unknown as { olmap: Map }).olmap = AppMap.map;
		}
	}

	private static GetCurrentMapExtent: () => Extent | undefined = () => {
		if (AppMap.map === undefined) {
			return undefined;
		}
		const size: Size | undefined = AppMap.map?.getSize()
		if (size === undefined) {
			return undefined;
		}
		return AppMap.map?.getView().calculateExtent(size)
	}
}
