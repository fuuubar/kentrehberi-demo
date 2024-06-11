import {
    XYZ as XYZSource,
    OSM as OSMSource,
} from "ol/source";
import { AppMap } from ".";
import TileLayer from "ol/layer/Tile";
import BaseLayer from "ol/layer/Base";


interface IBaseRasterLayer {
    title: string,
    baseLayer: true,
    opacity?: number,
    visibility?: boolean,
    source: OSMSource | XYZSource,
}


export class BaseLayers {

    public static RasterLayers: {
        OpenStreet: IBaseRasterLayer,
        GoogleSatellite: IBaseRasterLayer,
        GooglePhysical: IBaseRasterLayer
    } = {
            OpenStreet: {
                title: "Open Street Map",
                baseLayer: true,
                source: new OSMSource(),
            },
            GoogleSatellite: {
                title: "Google Maps Satellite",
                baseLayer: true,
                source: new XYZSource({
                    url: "//mt0.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&s=Ga"
                })

            },
            GooglePhysical: {
                title: "Google Maps Physical",
                baseLayer: true,
                source: new XYZSource({
                    url: "//mts0.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
                }),
            }
        }

    private static GetBaseLayers: () => BaseLayer[] | undefined = () => {
        if (AppMap.map === undefined) {
            return undefined;
        }
        return AppMap.map?.getLayers().getArray()
            .filter(i => i.get("baseLayer") === true);
    }

    private static RemoveMapBaseLayers = () => {
        if (AppMap.map === undefined) {
            return;
        }
        const existingBaseLayers: BaseLayer[] | undefined = BaseLayers.GetBaseLayers();
        if (existingBaseLayers !== undefined) {
            existingBaseLayers.map(i => AppMap.map?.removeLayer(i));
        }
    }

    public static SetMapBaseLayer = (layer: IBaseRasterLayer) => {
        if (AppMap.map === undefined) {
            return;
        }
        BaseLayers.RemoveMapBaseLayers();
        AppMap.map?.addLayer(new TileLayer(layer))
    }

}