import { shipList } from './../mock';
import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-rotatedmarker';
import { uuid } from '../../share/utils/common.utils';
import { Observable, Subject, map } from 'rxjs';
import { SubServerService } from '../sub-server.service';
import { DragDrop } from '@angular/cdk/drag-drop';
import { OperateLayerComponent } from '../operate-layer/operate-layer.component';

let selectIcon = L.icon({
  iconUrl: 'assets/images/map/select.png',
  iconSize: [40, 40],
  className: 'select-icon',
});
let Aicon = L.icon({
  iconUrl: 'assets/images/map/arrow.png',
  iconSize: [20, 20],
});
let Bicon = L.icon({
  iconUrl: 'assets/images/map/ship.png',
  iconSize: [20, 20],
});
let environment = {
  production: false,
  aes: false,
  title: '航海保障运行管理系统',
  maptk: '71138a8f227b7cff59fc2fddc3da6f42',
};
@Component({
  selector: 'app-tt',
  templateUrl: './tt.component.html',
  styleUrls: ['./tt.component.less'],
})
export class TtComponent implements OnInit {
  slectMarke = L.marker([38.712216, 117.22655], {
    icon: selectIcon,
    autoPan: false,
  }); // 选中标识
  circleMarke = L.circle([38.712216, 117.22655], {
    color: 'rgb(188, 157, 238)',
    fillColor: 'rgb(188, 157, 238)',
  });
  map!: L.Map;
  worker?: Worker
  lng: number = 0;
  t: string = '';
  lnt: number = 0;
  showPopup: boolean = false;
  id?: string = '';
  popupChild: any; // 弹出组件
  shipMarket: L.Marker[] = [];
  popup: L.Popup = L.popup({
    closeButton: true,
    autoClose: false,
    autoPan: false,
    keepInView: true,
    maxWidth: 600,
    minWidth: 424,
    className: `marker-popup`,
  }).setContent(`<div id='marker-popup' #markerPopup></div>`);
  constructor(
    private el: ElementRef,
    private renderer2: Renderer2,
    private sub: SubServerService,
    private drag_: DragDrop,
  ) {
    this.sub.subscribeId((e) => {
      this.map.setView([e.latlng.lat, e.latlng.lng], 15);
      if (this.id !== e.id) {
        this.circleMarke.remove();
        setTimeout(() => {
          this.sub.showPopup();
        }, 1);
      }
      this.sub.setSelect(e);
      this.id = e.id;
      this.showPopup = true;
      this.slectMarke.setIcon(selectIcon);
      this.slectMarke.setLatLng(e.latlng).addTo(this.map);
      this.popup.setLatLng(e.latlng).addTo(this.map);
      this.appendToDiv();
    });
    this.sub.radiusSub((e) => {
      if (e) {
        this.circleMarke.setRadius(e);
        this.circleMarke.setLatLng(this.sub.select.latlng).addTo(this.map);
      }
    });
    this.sub.subTrack((res) => {
      if (res) {
        this.popup.addTo(this.map);
        this.appendToDiv();
      }
    });
  }
  ngOnInit() {

    let tianUrl = 'http://t2.tianditu.com';
    this.map = L.map('map', {
      closePopupOnClick: false,
      doubleClickZoom: false,
      preferCanvas: true,
    }).setView([38.912216, 120.22655], 8);
    // 添加地图图层
    L.tileLayer(
      `${tianUrl}/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${environment.maptk}`,
      {}
    ).addTo(this.map); //基础地图
    L.tileLayer(
      `${tianUrl}/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${environment.maptk}`,
      {}
    ).addTo(this.map); //地名标注
    shipList.forEach((ship) => {
      let m = L.marker([ship.lng, ship.lnt], {
        icon: ship.type === 'bussiness' ? Aicon : Bicon,
        rotationAngle: ship.direction,
        rotationOrigin: 'center',
        zIndexOffset: 200,
      }).addTo(this.map);

      this.shipMarket.push(m);
    });
    this.shipMarket.forEach((e) => {
      let data = {
        id: Math.random().toString(36).substring(2, 15),
        subType: 'ship',
      };
      e.on('click', (e) => {
        let obj = Object.assign(data, e);
        this.sub.clickSub(obj);
      });
    });
    let close: Function = this.popup.close;
    this.popup.close = () => {
      close.call(this.popup);
      return this.popup;
    };
  }

  appendToDiv() {
    let nativeEl = this.el.nativeElement;
    let el = nativeEl.querySelector('#marker-popup');
    this.drag_.createDrag(nativeEl.querySelector('.marker-popup'));
    this.popupChild = nativeEl.querySelector('app-test1') || this.popupChild;
    this.renderer2.appendChild(el, this.popupChild);
  }
}
