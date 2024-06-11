import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { IBaseGeoModel } from "../../models/core/BaseGeoModel";
import { Environments } from "../../../helpers/services/environment";

axios.defaults.baseURL = Environments.BE_Base_Url;

export class BaseAPI<TResult extends IBaseGeoModel>
{
    protected _list = (url: string, options?: AxiosRequestConfig | undefined) =>
        axios.get(url, options).then((response: AxiosResponse<TResult[]>) => response.data)
}
