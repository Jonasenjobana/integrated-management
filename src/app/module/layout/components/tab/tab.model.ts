import { Type } from "@angular/core";

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
    id?: string
    type?: 'Manual'|'Product'
}
export type TabType = 'add'|'change'|'refresh'|'remove'