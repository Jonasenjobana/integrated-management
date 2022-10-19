export interface paramsData {
    currentPage: number;
    pageRecord: number;
    companyId?: string;
    productCode?: string;
    name?: string;
}
/**
 * type对应分类类别为产品分类 menu ,产品品牌 brand
 */
export interface tag {
    key: string;
    title: string;
    type: 'menu'|'brand';
}

export interface manual {
    id: string;
    manualName: string;
    manualSerie: string;
    companyId?: string;
    companyName?: string;
    img?: string;
    pproductCode?: string;
    productCode?: string;
}