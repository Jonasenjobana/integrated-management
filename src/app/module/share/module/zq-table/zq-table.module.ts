import { ZqSelectModule } from './../zq-select/zq-select.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZqTableComponent } from './zq-table/zq-table.component';
import { ZqButtonModule } from '../zq-button/zq-button.module';



@NgModule({
  declarations: [
    ZqTableComponent
  ],
  imports: [
    CommonModule,
    ZqButtonModule,
    ZqSelectModule
  ],
  exports: [
    ZqTableComponent,
  ]
})
export class ZqTableModule { }
