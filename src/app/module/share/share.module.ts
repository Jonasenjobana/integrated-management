import { PlusOutline } from '@ant-design/icons-angular/icons';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { SwiperModule } from 'swiper/angular';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { PathPipe } from './pipe/path.pipe';
import { SafeHtmlPipe } from './pipe/safe-html.pipe';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    PathPipe,
    SafeHtmlPipe,
  ],
  imports: [
    NzIconModule.forRoot([PlusOutline]),
    CommonModule,
    NzTabsModule,
    NzTableModule,
    NzButtonModule,
  ],
  exports: [
    ReactiveFormsModule,
    NzFormModule,
    SwiperModule,
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
    NzPaginationModule,
    NzRadioModule,
    NzMessageModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzTabsModule,
    NzCardModule,
    NzAvatarModule,
    NzDropDownModule,
    NzTreeModule,
    PathPipe,
    SafeHtmlPipe,
    NzTimelineModule,
  ],
})
export class ShareModule { }
