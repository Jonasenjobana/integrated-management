import { Type } from "@angular/core";

export interface DynamicComponent {
    data: any
}
export interface Tab {
    title?: string;
    key?: string;
    component?: Type<any>;
    disclosable?: boolean;
}