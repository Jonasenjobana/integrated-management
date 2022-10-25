// 统一返回结果
export interface Result<T> {
    rlt: number;
    info: string;
    datas: T;
}
// post请求参数
export interface Params<T> {
    x: string;
    y: T
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
export interface ListResult<T> {
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
// 手册产品详情
export interface ResultDetail {
    companyId: string;
    companyName: string;
    configIds?: string;
    configList?: Config[];
    contentIds?: string;
    contentList: Content[];
    id: string;
    img?: string;
    introduction?: string;
    manualName: string;
    manualNumber?: number;
    manualSerie?: string;
    modelIds?: string;
    modelList: TypeModel[];
    parameterList?: [];
    pproductCode: string;
    productCode: string;
    productName: string;
    pproductName: string;
}
// 图片文件
export interface Content {
    filePath: string;
    fileType?: string;
    fullName?: string;
    storeName?: string;
}
// 产品内部类型
export interface TypeModel {
    configList?: Config[];
    id: string;
    manualId: string;
    modelName: string;
    serialNumber: number;
}
// 配置类型
export interface Config {
    name: string;
    multi: boolean;
    isMulti: boolean;
    id: string;
    hostId: string;
    serialNumber?: number;
    configvalueList?: ConfigValue[]
    // 自定义集合
    hostGroup?: string[];
} 
// 配置参数详情
export interface ConfigValue {
    configId: string;
    hostId: string;
    id: string;
    serialNumber: number;
    value: string;
    // 自定义集合
    hostGroup?: string[]
}
