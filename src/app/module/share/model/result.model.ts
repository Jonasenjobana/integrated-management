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