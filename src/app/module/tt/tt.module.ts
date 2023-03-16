import { ShareModule } from './../share/share.module';
import { ZqDateComponent } from './../share/module/zq-date/zq-date.component';
import { ZqRadioModule } from './../share/module/zq-radio/zq-radio.module';
import { FormsModule } from '@angular/forms';
import { ZqButtonModule } from './../share/module/zq-button/zq-button.module';
import { ZqFilterModule } from './../share/module/zq-filter/zq-filter.module';
import { ZqTableComponent } from './../share/module/zq-table/zq-table/zq-table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZqTableModule } from '../share/module/zq-table/zq-table.module';
import { TtComponent } from './tt/tt.component';
import { TestDirective } from './test.directive';
import { ZqBlueTextModule } from '../share/module/zq-blue-text/zq-blue-text.module';
import { Test1Component } from './test1/test1.component';
import { Test2Component } from './test2/test2.component';
import { MapShipDirective } from './directive/map-ship.directive';
import { TimeProgressComponent } from './test1/component/time-progress/time-progress.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { InfoCardComponent } from './info-card/info-card.component';
import { RadiusComponent } from './radius/radius.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { OperateLayerComponent } from './operate-layer/operate-layer.component';

@NgModule({
  declarations: [
    TtComponent,
    TestDirective,
    Test1Component,
    Test2Component,
    MapShipDirective,
    TimeProgressComponent,
    InfoCardComponent,
    RadiusComponent,
    OperateLayerComponent,
  ],
  imports: [
    DragDropModule,
    ShareModule,
    OverlayModule,
    PortalModule,
    ZqBlueTextModule,
    ZqRadioModule,
    FormsModule,
    CommonModule,
    ZqTableModule,
    ZqFilterModule,
    ZqButtonModule
  ],

})
export class TtModule { }
