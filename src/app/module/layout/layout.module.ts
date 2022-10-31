import { NzIconModule } from 'ng-zorro-antd/icon';
import { ShareModule } from './../share/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { SideBarComponent } from './components/sidebar/sidebar.component';
import { TabComponent } from './components/tab/tab.component';
import { HeadbarComponent } from './components/headbar/headbar.component';
import { ComponentTemplateComponent } from './components/component-template/component-template.component';
import { HomeComponent } from './components/home/home.component';
import { DynamicDirDirective } from './dynamic-dir.directive';
import { ManualModule } from '../manual/manual.module';
import { ProductModule } from '../product/product.module';
import { UnorderedListOutline,AppstoreOutline, ReloadOutline, PoweroffOutline, PlusOutline, DownloadOutline } from '@ant-design/icons-angular/icons';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    LayoutComponent,
    ComponentTemplateComponent,
    HomeComponent,
    SideBarComponent,
    TabComponent,
    HeadbarComponent,
    DynamicDirDirective,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    ManualModule,
    ProductModule,
    ShareModule,
    NzIconModule.forRoot([UnorderedListOutline, AppstoreOutline, ReloadOutline, PoweroffOutline, PlusOutline, DownloadOutline]),
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
