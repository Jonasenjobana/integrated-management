import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManualListComponent } from './components/manual-list/manual-list.component';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { ShareModule } from '../share/share.module';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { ManualCreateComponent } from './components/manual-create/manual-create.component';
import { ManualDetailComponent } from './components/manual-detail/manual-detail.component';
import { ManualModalComponent } from './components/manual-modal/manual-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { ProductConfigComponent } from './components/product-config/product-config.component';
import { CommonIntroductionComponent } from './components/common-introduction/common-introduction.component';
@NgModule({
  declarations: [
    ManualListComponent,
    ManualCreateComponent,
    ManualDetailComponent,
    ManualModalComponent,
    ProductConfigComponent,
    CommonIntroductionComponent,
  ],
  imports: [
    NzUploadModule,
    CommonModule,
    NzModalModule,
    ShareModule,
    NzTreeModule,
    NzDividerModule,
    NzInputModule,
    NzEmptyModule,
  ],
  providers: []
})
export class ManualModule { }
