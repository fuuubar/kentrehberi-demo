import Feature from "ol/Feature";
import { GeoJSON, WKT as WKTFormat } from 'ol/format';
import { IBaseGeoModel } from "../../../app/models/core/BaseGeoModel";
import Geometry from "ol/geom/Geometry";
import { transformExtent } from 'ol/proj';
import { Extent } from "ol/extent";
import { Coordinate } from "ol/coordinate";


export class Features {
    private readonly featureProjection = "EPSG:4326"
    private readonly dataProjection = "EPSG:3857"
    private geomlikeParser: GeoJSON = new GeoJSON();
    private wktParser: WKTFormat = new WKTFormat()


    public CreateFeature = {
        FromWktString: (input: IBaseGeoModel): Feature => {
            const feature = new Feature()
            feature.setId(input.id);
            const geometry: Geometry = this.CreateGeometry.FromWktString(input.wkt);
            feature.setGeometry(geometry);
            feature.setProperties(input);
            return feature;
        }
    }

    public CreateGeometry = {
        FromGeomlike: (
            geomlike: string | object | ArrayBuffer | Document | Element,
            dataProjection?: string | undefined)
            : Geometry => {
            if (dataProjection !== undefined && dataProjection !== this.featureProjection) {
                return this.geomlikeParser.readGeometry(geomlike, { dataProjection: dataProjection, featureProjection: this.featureProjection });
            } else {
                return this.geomlikeParser.readGeometry(geomlike);
            }

        },
        FromWktString: (
            wktString: string,
            dataProjection?: string | undefined)
            : Geometry => {
            if (dataProjection !== undefined && dataProjection !== this.featureProjection) {
                return this.wktParser.readGeometry(wktString, { dataProjection: dataProjection, featureProjection: this.featureProjection })
            } else {
                return this.wktParser.readGeometry(wktString)
            }
        }
    }

    public Transform = {
        ExtentToDataProjection: (currentProjExtent: Extent): Extent => {
            return transformExtent(currentProjExtent, this.dataProjection, this.featureProjection);
        }
    }

    public static Distance = {
        BetweenCoordinateAndFeature: (feature: Feature<Geometry>, coordinate: Coordinate): number | undefined => {
            const closestPoint: Coordinate | undefined = feature.getGeometry()?.getClosestPoint(coordinate);
            if (closestPoint === undefined) {
                return undefined;
            }
            const distance = Math.sqrt(
                Math.pow(closestPoint[0] - coordinate[0], 2) +
                Math.pow(closestPoint[1] - coordinate[1], 2)
            );
            return distance;
        }
    }

}
