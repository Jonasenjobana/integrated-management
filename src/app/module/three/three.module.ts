import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreeComponent } from './three/three.component';
import { TableComponent } from './table/table.component';
import { TempTestComponent } from './temp-test/temp-test.component';



@NgModule({
  declarations: [
    ThreeComponent,
    TableComponent,
    TempTestComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ThreeModule { }
