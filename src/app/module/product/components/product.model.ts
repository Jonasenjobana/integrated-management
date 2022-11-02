export class Product {
    serialNumber?: string;
    id: string;
    valueIds: string;
    name: string;
    manualId: string;
    modelId: string;
    pproductName?: string;
    productName?: string;
    companyName: string;
    productDate: string;
    _isSelected?: boolean;
    constructor(product?: Product) {
        this.id = product?.id || ''
        this.valueIds = product?.valueIds || ''
        this.name = product?.name || ''
        this.manualId = product?.manualId || ''
        this.modelId = product?.modelId || ''
        this.companyName = product?.companyName || ''
        this.productDate = product?.productDate || ''
        this.serialNumber = product?.serialNumber
    }
}
export interface Search {
    selectedCode: string
}
export type SelectType = 'ProductType' | 'ProductBrand' | 'Date' | 'ProductName'