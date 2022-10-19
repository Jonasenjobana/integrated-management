export interface company {
    companyName: string;
    id: string;
}
export interface productSelect {
    label: string;
    productCode: string;
    children?: productSelect[]
}
export interface paramsData {
    currentPage: number;
    pageRecord: number;
    companyId?: string;
    productCode?: string;
    serialNumber?: number;
    name?: string;
    endTime?: string;
    startTime?: string;
}
/**
 * type对应分类类别为产品分类 menu ,产品品牌 brand
 */
 export interface tag {
    key: string;
    title: string;
    type: 'menu'|'brand';
}
