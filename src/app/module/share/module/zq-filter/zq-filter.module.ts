import { ZqButtonModule } from './../zq-button/zq-button.module';
import { ZqButtonComponent } from './../zq-button/zq-button/zq-button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZqFilterComponent } from './zq-filter/zq-filter.component';



@NgModule({
  declarations: [
    ZqFilterComponent
  ],
  imports: [
    CommonModule,
    ZqButtonModule
  ],
  exports: [
    ZqFilterComponent
  ]
})
export class ZqFilterModule { }
