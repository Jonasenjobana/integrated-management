import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZqBlueTextDirective } from './zq-blue-text.directive';
import { ZqBlueTextComponent } from './zq-blue-text/zq-blue-text.component';



@NgModule({
  declarations: [
    ZqBlueTextDirective,
    ZqBlueTextComponent
  ],
  exports: [
    ZqBlueTextDirective,
    ZqBlueTextComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ZqBlueTextModule { }
