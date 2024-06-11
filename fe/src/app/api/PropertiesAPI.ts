import { IPropertiesModel } from "../models/PropertiesModel";
import { BaseAPI } from "./core/BaseAPI";

export class PropertiesAPI extends BaseAPI<IPropertiesModel> {

    private readonly api_address: string = "/api/properties";

    public list = (extent?: [number, number, number, number]): Promise<IPropertiesModel[]> => this._list(this.api_address, { params: { extent: extent?.join(',') } });
}