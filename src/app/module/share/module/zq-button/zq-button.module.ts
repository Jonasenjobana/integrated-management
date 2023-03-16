import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZqButtonComponent } from './zq-button/zq-button.component';
import { ZqTrapezoidButtonComponent } from './zq-trapezoid-button/zq-trapezoid-button.component';



@NgModule({
  declarations: [
    ZqButtonComponent,
    ZqTrapezoidButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ZqButtonComponent,
    ZqTrapezoidButtonComponent
  ]
})
export class ZqButtonModule { }
