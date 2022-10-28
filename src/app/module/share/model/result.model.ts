// 统一返回结果
export interface Result<T> {
    rlt: number;
    info: string;
    datas: T;
}
// 字典数据结构
export interface Dict {
    dictCode: string;
    id: string;
    itemCode: string;
    itemName: string;
    pitemCode: string | null;
    serialNumber: number
}
export interface Page<T> {
    currentPage: number;
    endRow?: number;
    pageCount?: number;
    pageOne?: number;
    pageRecord: number;
    pageTwo?: number;
    recordCount?: number; 
    result: T;
    startRow?: number;
}
// 分页信息
export interface Pagination {
    currentPage: number;
    endRow?: number;
    pageCount?: number;
    pageOne?: number;
    pageRecord: number;
    pageTwo?: number;
    recordCount?: number; 
    startRow?: number;
}
// 技术参数
export interface CatalogTech {
    id: string;
    techName: string;
    techValue?: string;
}
// 图片文件
export interface Content {
    filePath: string;
    fileType?: string;
    fullName?: string;
    storeName?: string;
}
// 产品内部类型
export class TypeModel {
    configList: Config[];
    id: string;
    manualId?: string;
    modelName: string;
    serialNumber?: number;
    constructor() {
        this.configList = [];
        this.id = '';
        this.modelName = '';
    }
}
// 配置类型
export class Config {
    name: string;
    multi: boolean;
    isMulti: boolean;
    id: string;
    hostId: string;
    serialNumber?: number;
    configvalueList: ConfigValue[]
    constructor() {
        this.name = '',
        this.multi = false,
        this.isMulti = false,
        this.id = '',
        this.hostId = '',
        this.configvalueList = [],
        this._hostGroup = []
    }
    // 自定义集合
    _hostGroup?: string[];
} 
// 配置参数详情
export class ConfigValue {
    configId: string;
    hostId: string;
    id: string;
    serialNumber: number;
    value: string;
    constructor() {
        this.configId = '',
        this.serialNumber = 0,
        this.value = '',
        this.id = '',
        this.hostId = '',
        this._hostGroup = []
    }
    // 自定义集合
    _hostGroup?: string[]
}
