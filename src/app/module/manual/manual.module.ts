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
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { ProductConfigComponent } from './components/product-config/product-config.component';
import { CommonIntroductionComponent } from './components/common-introduction/common-introduction.component';
import { TechParametersComponent } from './components/tech-parameters/tech-parameters.component';
import { ProductStatementComponent } from './components/product-statement/product-statement.component';
@NgModule({
  declarations: [
    ManualListComponent,
    ManualCreateComponent,
    ManualDetailComponent,
    ProductConfigComponent,
    CommonIntroductionComponent,
    TechParametersComponent,
    ProductStatementComponent,
  ],
  imports: [
    NzUploadModule,
    CommonModule,
    ShareModule,
    NzTreeModule,
    NzDividerModule,
    NzInputModule,
    NzEmptyModule,
  ],
  providers: []
})
export class ManualModule { }
