import { IPointsModel } from "../models/PointsModel";
import { BaseAPI } from "./core/BaseAPI";

export class PointsAPI extends BaseAPI<IPointsModel> {

    private readonly api_address: string = "/api/points";

    public list = (): Promise<IPointsModel[]> => this._list(this.api_address);
}