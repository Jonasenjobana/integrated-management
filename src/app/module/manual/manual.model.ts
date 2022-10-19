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

export interface ManualSearch {
  currentPage: number;
  pageRecord: number;
  companyId?: string;
  name?: string;
  productCode?: string;
}

export interface SearchTag {
  label: string;
  value: string;
  text: string;
  show?: boolean;
}
