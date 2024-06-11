import { IBaseGeoModel } from "./core/BaseGeoModel";

export interface IPropertiesModel extends IBaseGeoModel {
    yapiAdi?: string
    ngYapiAdi?: string
    tabanAlani?: number
    normalKat?: number
    bodrumKat?: number
    catiKati?: number
    aciklama?: string
    ngSiteAdi?: string
    mDate?: Date
}