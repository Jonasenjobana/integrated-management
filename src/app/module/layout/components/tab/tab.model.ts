import { Manual } from 'src/app/module/manual/manual.model';
import { Type } from "@angular/core";
import { Product } from "src/app/module/product/components/product.model";

export interface Tab {
    uuid?: string,
    title: string;
    key: string;
    component: Type<any>;
    disclosable?: boolean;
    data?: DynamicParams;
}
/**
 * 动态组件外部传参
 */
export interface DynamicParams {
    manualId?: string
    productId?: string
    type: 'Manual'|'Product'|string
    titleName?: string
}
export type TabType = 'add'|'change'|'refresh'|'remove'