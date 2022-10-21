import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManualListComponent } from './components/manual-list/manual-list.component';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { ShareModule } from '../share/share.module';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PlusOutline } from '@ant-design/icons-angular/icons';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { ManualCreateComponent } from './components/manual-create/manual-create.component';
import { ManualDetailComponent } from './components/manual-detail/manual-detail.component';
@NgModule({
  declarations: [
    ManualListComponent,
    ManualCreateComponent,
    ManualDetailComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    NzTreeModule,
    NzDividerModule,
    NzInputModule,
    NzEmptyModule,
    NzIconModule.forChild([PlusOutline]),
  ],
  providers: []
})
export class ManualModule { }
