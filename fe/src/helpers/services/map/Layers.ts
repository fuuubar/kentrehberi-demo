import { AppMap } from "."
import { Cluster as ClusterSource, Vector as VectorSource, } from "ol/source";
import VectorLayer from "ol/layer/Vector";
import AnimatedCluster from 'ol-ext/layer/AnimatedCluster';
import { Options as VectorLayerOptions } from "ol/layer/BaseVector";
import { Options as VectorSourceOptions } from "ol/source/Vector";

interface IVectorLayerOptions extends Omit<VectorLayerOptions & VectorSourceOptions, 'source'> {
    name: string
}
interface IClusterLayerOptions extends IVectorLayerOptions {
    distance: number
    animationDuration: number
}

export class AnimatedClusterLayer extends VectorLayer { }


export class Layers {

    public static AddVectorLayer = (options: IVectorLayerOptions): VectorLayer | undefined => {
        if (AppMap.map === undefined) {
            return undefined;
        }
        // @ts-ignore: safety operation
        delete options.source;
        const layer: VectorLayer = new VectorLayer({
            ...options,
            source: new VectorSource(options)
        });
        AppMap.map.addLayer(layer);
        return layer;
    }

    public static AddClusterLayer = (options: IClusterLayerOptions): AnimatedClusterLayer | undefined => {
        if (AppMap.map === undefined) {
            return undefined;
        }
        // @ts-ignore: safety operation
        delete options.source;
        const layer: AnimatedClusterLayer = new AnimatedCluster({
            ...options,
            source: new ClusterSource({
                ...options,
                source: new VectorSource(options)
            })
        });
        AppMap.map.addLayer(layer)
        return layer;
    }

}