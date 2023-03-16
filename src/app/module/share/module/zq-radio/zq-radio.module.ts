import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioTplComponent } from './zq-radio-tpl/zq-radio-tpl.component';
import { ZqRadioGroupComponent } from './zq-radio-group/zq-radio-group.component';



@NgModule({
  declarations: [
    RadioTplComponent,
    ZqRadioGroupComponent
  ],
  exports: [
    RadioTplComponent,
    ZqRadioGroupComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ZqRadioModule { }
