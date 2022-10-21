export interface CompanyName {
    companyName: string;
    id: string;
}
export interface ProductName {
    id: string,
    name: string,
}
/**
 * 通用请求参数
 */
export interface ParamsData {
    currentPage: number;
    pageRecord: number;
    companyId?: string;
    productCode?: string;
    serialNumber?: string;
    name?: string;
    endTime?: string;
    startTime?: string;
}
/**
 * type对应分类类别为产品分类 menu ,产品品牌 brand
 */
 export interface Tag {
    title: string;
    key: string;
    type: TagType;
    show?: boolean;
}
/**
 * 通用条件搜索类
 */
export interface Search {
    companyId?: string
    name?: string
    currentPage: number
    pageRecord: number
    productCode?: string
    serialNumber?: string
    startTime?: string
    endTime?: string
}
/**
 * 条件标签类型
 */
export type TagType = 'Menu' | 'Brand' | 'Name' | 'Series' | 'Date'