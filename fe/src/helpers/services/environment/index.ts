export enum EnvironmentTypes {
  PROD = 'prod',
  TEST = 'test',
  LOCAL = 'local',
}

type EnvironmentTypeValues = 'local' | 'test' | 'prod';

class _Environments {
  private static _instance: _Environments;

  private constructor() {
    this._EnvironmentType = (process.env.REACT_APP_ENV as EnvironmentTypeValues) || '';
    this._BE_Base_Url = process.env.REACT_APP_BE_BASE_URL || '';
    this._Version_Name = process.env.REACT_APP_ENV_BUILD_NAME || '1.0';
    this._Version_Code = Number(process.env.REACT_APP_ENV_BUILD_CODE) || 1;
  }

  public static Instance() {
    return this._instance || (this._instance = new this());
  }

  private static readonly EnvironmentTypeMap: Record<EnvironmentTypeValues | '', EnvironmentTypes | ''> = {
    'local': EnvironmentTypes.LOCAL,
    'test': EnvironmentTypes.TEST,
    'prod': EnvironmentTypes.PROD,
    '': ''
  };

  private _EnvironmentType: EnvironmentTypeValues | '';
  public get EnvironmentType(): EnvironmentTypes | '' {
    return _Environments.EnvironmentTypeMap[this._EnvironmentType] || '';
  }

  private _BE_Base_Url: string;
  public get BE_Base_Url(): string {
    return this._BE_Base_Url;
  }

  private _Version_Name: string;
  private _Version_Code: number;
  public get Version(): string {
    return "v" + this._Version_Name + "." + this._Version_Code.toString();
  }
}

export const Environments = _Environments.Instance();

