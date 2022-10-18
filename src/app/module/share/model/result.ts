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