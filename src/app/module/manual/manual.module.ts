import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManualListComponent } from './components/manual-list/manual-list.component';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { ShareModule } from '../share/share.module';


@NgModule({
  declarations: [
    ManualListComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    NzTreeModule
  ]
})
export class ManualModule { }
