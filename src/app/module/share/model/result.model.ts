// 统一返回结果
export interface result<T> {
    rlt: number;
    info: string;
    datas: T;
}
// post请求参数
export interface params<T> {
    x: string;
    y: T
}
// 字典数据结构
export interface dict {
    dictCode: string;
    id: string;
    itemCode: string;
    itemName: string;
    pitemCode: string | null;
    serialNumber: number
}
export interface listResult<T> {
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
export interface pagination {
    currentPage: number;
    endRow?: number;
    pageCount?: number;
    pageOne?: number;
    pageRecord: number;
    pageTwo?: number;
    recordCount?: number; 
    startRow?: number;
}