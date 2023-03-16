import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZqSelectComponent } from './zq-select.component';
import { ZqOptionComponent } from './zq-option/zq-option.component';



@NgModule({
  declarations: [
    ZqSelectComponent,
    ZqOptionComponent
  ],
  exports: [
    ZqSelectComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class ZqSelectModule { }
