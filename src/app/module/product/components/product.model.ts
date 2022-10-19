export interface columnListConfig {
    align?: 'left'|'right'|'center';
    ellipsis?: boolean;
    columnName: string;
}

export interface product {
    serialNumber?: number;
    id: string;
    valueIds: string;
    name: string;
    manualId: string;
    modelId: string;
    pproductName?: string;
    productNmae?: string;
    companyName: string
}

