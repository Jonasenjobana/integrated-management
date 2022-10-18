import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    NzCardModule,
    NzSpinModule,
    NzTableModule,
    NzSpinModule,
    NzGridModule,
    NzButtonModule,
    NzSelectModule,
    NzTagModule,
    NzIconModule,
    FormsModule,
  ]
})
export class ShareModule { }
