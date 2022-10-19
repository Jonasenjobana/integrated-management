import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManualListComponent } from './components/manual-list/manual-list.component';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { ShareModule } from '../share/share.module';
import { ManualHttpService } from './manual-http.service';
import { BaseCurdService } from '../share/serve/base-curd.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PlusOutline } from '@ant-design/icons-angular/icons';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
@NgModule({
  declarations: [
    ManualListComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    NzTreeModule,
    NzDividerModule,
    NzInputModule,
    NzEmptyModule,
    NzPaginationModule,
    NzIconModule.forChild([PlusOutline]),
  ],
  providers: [
    {provide: BaseCurdService, useClass: ManualHttpService}
  ]
})
export class ManualModule { }
