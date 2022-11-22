import { ZqFilterModule } from './../share/module/zq-filter/zq-filter.module';
import { ZqTableComponent } from './../share/module/zq-table/zq-table/zq-table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZqTableModule } from '../share/module/zq-table/zq-table.module';
import { TtComponent } from './tt/tt.component';



@NgModule({
  declarations: [
    TtComponent
  ],
  imports: [
    CommonModule,
    ZqTableModule,
    ZqFilterModule
  ],

})
export class TtModule { }
