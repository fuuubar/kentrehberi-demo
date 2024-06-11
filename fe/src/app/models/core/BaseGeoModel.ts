
export type wkt_string = string
export type identifier_string = string
export type reference_number = number
export type filterable_boolean = boolean

export interface IBaseGeoModel {
    id: identifier_string
    objectId: string
    geoDurum: filterable_boolean
    wkt: wkt_string
}