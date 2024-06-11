import { IBaseGeoModel, filterable_boolean, reference_number } from "./core/BaseGeoModel";

export interface IPointsModel extends IBaseGeoModel {
    adi?: string
    ngAdi?: string
    aciklama?: string
    categoryRefId?: reference_number
    ustKod?: number
    faaliyetAdi?: string
    ngFaaliyetAdi?: string
    icon?: string
    gizlilik?: filterable_boolean
    adres?: string
    mahalleRefId?: reference_number
    yolRefId?: reference_number
    telefonNo?: string
    kisi?: string
    onemliYerler?: string
}