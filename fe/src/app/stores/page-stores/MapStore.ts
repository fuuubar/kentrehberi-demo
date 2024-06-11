import VectorLayer from 'ol/layer/Vector';
import { AppMap, MapCoordinate } from '../../../helpers/services/map';
import { BaseLayers } from '../../../helpers/services/map/BaseLayers';
import { AnimatedClusterLayer, Layers } from '../../../helpers/services/map/Layers';
import { RootStore } from '../RootStore';
import { action, makeAutoObservable, observable } from 'mobx';
import Feature, { FeatureLike } from 'ol/Feature';
import { Style, Circle, Fill, Text, Icon, Stroke } from "ol/style";
import { Cluster } from 'ol/source';
import { Extent } from 'ol/extent';
import { Features } from '../../../helpers/services/map/Features';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';
import Geometry from 'ol/geom/Geometry';

export class MapStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    private PointClusterLayer: AnimatedClusterLayer | undefined = undefined;
    private PointIconLayer: VectorLayer | undefined = undefined;
    private PropertiesPolygonLayer: VectorLayer | undefined = undefined;

    private StyleCache: {
        PointIcon: Map<string, Style>
        PointCluster: Map<number, Style>
    } = {
            PointIcon: new Map<string, Style>(),
            PointCluster: new Map<number, Style>(),
        }

    @observable public zoomLevel: number = 12;
    //public center: MapCoordinate = { Longitude: 31.9998, Latitude: 36.5483 };
    @observable public center: MapCoordinate = { Longitude: 3562201.441486595, Latitude: 4376331.266131344 };

    @action public InitMap = () => {
        new AppMap.mapConstructor(this.zoomLevel, this.center);
        BaseLayers.SetMapBaseLayer(BaseLayers.RasterLayers.OpenStreet);
        this.AddVectorLayers();
        this.GetFeatureInfo();
        this.FetchAndSetPointFeatures();
    }

    private AddVectorLayers = () => {
        if (AppMap.map === undefined) {
            return;
        }
        this.PointClusterLayer = Layers.AddClusterLayer({
            name: "Point Cluster",
            distance: 40,
            animationDuration: 700,
            visible: true,
            maxZoom: 14,
            style: (feature: FeatureLike, resolution: number): Style | Style[] => {
                const clusteredFeatures: FeatureLike[] = feature.get('features');
                const size: number = clusteredFeatures && clusteredFeatures.length > 0 ? clusteredFeatures.length : 0
                let cachedStyle = this.StyleCache.PointCluster.get(size);

                if (cachedStyle === undefined) {

                    const color: string = size > 25 ? "192,0,0" : size > 8 ? "255,128,0" : "0,128,0";
                    const radius: number = Math.max(8, Math.min(size * 0.75, 20));

                    cachedStyle = new Style({
                        image: new Circle({
                            radius: radius,
                            fill: new Fill({
                                color: 'rgba(' + color + ',0.6)',
                            })
                        }),
                        text: new Text({
                            text: size.toString(),
                            font: 'bold 12px arial',
                            fill: new Fill({
                                color: '#fff',
                            }),
                        })
                    });
                    this.StyleCache.PointCluster.set(size, cachedStyle);
                }

                return cachedStyle;
            }
        });
        this.PointIconLayer = Layers.AddVectorLayer({
            name: "Point Icon",
            visible: true,
            minZoom: 14,
            style: (feature: FeatureLike, resolution: number): Style | Style[] => {
                const icon: string = feature.get("icon");
                let cachedStyle = this.StyleCache.PointIcon.get(icon)

                if (cachedStyle === undefined) {
                    cachedStyle = new Style({
                        image: new Icon({
                            src: "assets/icons/" + icon,
                        })
                    });
                    this.StyleCache.PointIcon.set(icon, cachedStyle);
                };

                return cachedStyle
            }
        });
        this.PropertiesPolygonLayer = Layers.AddVectorLayer({
            name: "Properties Polygon",
            visible: true,
            maxZoom: 20,
            minZoom: 16,
            strategy: bboxStrategy,
            updateWhileAnimating: false,
            updateWhileInteracting: false,
            style: new Style({
                stroke: new Stroke({
                    color: 'blue',
                    width: 3,
                }),
                fill: new Fill({
                    color: 'rgba(0, 0, 255, 0.1)',
                }),
            }),
            loader: (extent: Extent, resolution: number) => {
                const transfomedExtent: Extent = new Features().Transform.ExtentToDataProjection(extent);
                this.rootStore.apiStores.propertiesStore.FetchList(transfomedExtent).then((additions) => {
                    this.PropertiesPolygonLayer?.getSource().addFeatures(additions);
                })
            }
        });
    }

    private FetchAndSetPointFeatures = async () => {
        await this.rootStore.apiStores.pointsStore.FetchList();
        const allPointFeatures: Feature[] = this.rootStore.apiStores.pointsStore.GetFeatures;
        this.PointIconLayer?.getSource().clear();
        this.PointIconLayer?.getSource().addFeatures(allPointFeatures);
        (this.PointClusterLayer?.getSource() as Cluster).getSource().clear();
        (this.PointClusterLayer?.getSource() as Cluster).getSource().addFeatures(allPointFeatures);
    }

    private GetFeatureInfo = () => {
        AppMap.map?.on("click", (evt) => {
            const pointFeature: Feature<Geometry> | undefined = this.PointIconLayer?.getSource().getClosestFeatureToCoordinate(evt.coordinate)
            if (pointFeature !== undefined) {
                const distance = Features.Distance.BetweenCoordinateAndFeature(pointFeature, evt.coordinate);
                const resolution = AppMap.map?.getView().getResolution();
                if (resolution !== undefined && distance !== undefined && distance < (20 * resolution)) {
                    this.rootStore.componentStores.getFeatureInfoModalStore.OnOpenAction(pointFeature);
                }

            }
        })
    }
}