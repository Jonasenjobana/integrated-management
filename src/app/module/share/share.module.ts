import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    NzSpinModule,
    NzTableModule,
    NzSpinModule
  ]
})
export class ShareModule { }
