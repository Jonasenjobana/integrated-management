import { Type } from "@angular/core";

export interface Tab {
    uuid?: string,
    title: string;
    key: string;
    component: Type<any>;
    disclosable?: boolean;
}