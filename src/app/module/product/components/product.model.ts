export interface Product {
    serialNumber?: number;
    id: string;
    valueIds: string;
    name: string;
    manualId: string;
    modelId: string;
    pproductName?: string;
    productName?: string;
    companyName: string;
    productDate: string;
}
export type SelectType = 'ProductType' | 'ProductBrand' | 'Date' | 'ProductName'