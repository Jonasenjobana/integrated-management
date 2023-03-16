import { Subject, map } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import L from 'leaflet';
declare var TitleCanvas: any;
@Component({
  selector: 'operate-layer',
  templateUrl: './operate-layer.component.html',
  styleUrls: ['./operate-layer.component.less'],
})
export class OperateLayerComponent implements OnInit {
  $typeSub: Subject<string> = new Subject();
  type: string = '';
  featerGroupMap: Map<string, L.FeatureGroup> = new Map();
  featerGroup?: L.FeatureGroup;
  titleCanvas: any
  @Input() map!: L.Map;
  constructor() {
    this.$typeSub.asObservable().subscribe((t) => {
      if (t === '') {
        console.log('恢复最初面板');
      }
    });
  }

  ngOnInit(): void {

    
    this.titleCanvas = TitleCanvas([]).addTo(this.map)
    console.log(this.titleCanvas);
  }
  operateChange(type: string) {
    this.type = type;
    switch (type) {
      case 'distance':
        this.distance();
        break;
      case 'draw':
        this.draw();
        break;
    }
  }
  title: any = []
  draw() {
    let featerGroup = L.featureGroup().addTo(this.map);
    let tempFeaterGroup = L.featureGroup().addTo(this.map);
    let points: L.LatLng[] = [];
    let polygon = L.polygon([], {
      color: 'blue',
      weight: 2,
      dashArray: '2',
    });
    let mouseClick = (e: L.LeafletMouseEvent) => {
      points.push(e.latlng);
      this.genCircle(e.latlng).addTo(featerGroup);
    };
    let mouseDbclick = (e: L.LeafletMouseEvent) => {
      featerGroup.removeLayer(tempFeaterGroup);
      const polygon = this.genPolygon(points, {}, featerGroup).addTo(
        featerGroup
      ); 
       const myPoints = {
        name: Math.random(),
        point: polygon.getCenter(),
      };
      this.title.push(myPoints)
      this.map.fitBounds(featerGroup.getBounds());
      this.titleCanvas.updateTitle(this.title)
      this.map.off('click', mouseClick);
      this.map.off('dblclick', mouseDbclick);
      this.map.off('mousemove', mouseMove);
    };
    let mouseMove = (e: L.LeafletMouseEvent) => {
      tempFeaterGroup.clearLayers();
      let arr = [...points, e.latlng];
      this.genPolygon(arr, {
        dashArray: '3',
      }).addTo(tempFeaterGroup);
      this.genCircle(e.latlng).addTo(tempFeaterGroup);
    };
    this.map.on('click', mouseClick);
    this.map.on('dblclick', mouseDbclick);
    this.map.on('mousemove', mouseMove);
  }

  genPolygon(points: L.LatLng[], opt: any, group?: any) {
    return L.polygon(points, {
      color: 'blue',
      fillOpacity: 0.1,
      fillColor: 'blue',
      weight: 2,
      ...opt,
    });
  }
  distance() {
    // 测绘图层
    let featerGroup = L.featureGroup().addTo(this.map);
    let tempFeaterGroup = L.featureGroup().addTo(this.map);
    // 绘制线
    let line = L.polyline([], {
      color: '#ff0000',
      weight: 2,
      dashArray: '2',
    }).addTo(featerGroup);
    let tempLines = L.polyline([], {
      color: '#ff0000',
      weight: 2,
      dashArray: '3',
    }).addTo(tempFeaterGroup); //两点间的虚线
    // 测绘的点
    let points: Array<L.LatLng> = [];
    let drawClick = (e: L.LeafletMouseEvent) => {
      points.push(e.latlng);
      console.log(points);

      line.addLatLng(e.latlng);
      L.circle(e.latlng, {
        radius: 3,
        color: 'red',
        fillOpacity: 1,
      }).addTo(featerGroup);
    };
    let dbClick = (e: L.LeafletMouseEvent) => {
      // this.map.removeLayer(featerGroup)
      this.map.removeEventListener('click');
      this.map.removeEventListener('mousemove');
    };
    let move = (e: L.LeafletMouseEvent) => {
      tempFeaterGroup.clearLayers();
      let ls = [points[points.length - 1], e.latlng];
      tempLines.setLatLngs(ls).addTo(tempFeaterGroup);
      this.genCircle(e.latlng).addTo(tempFeaterGroup);
    };
    points = [];
    console.log(points);
    this.map.on('click', drawClick);
    this.map.on('dblclick', dbClick);
    this.map.on('mousemove', move);
  }
  genCircle(latlng: L.LatLng) {
    return L.circle(latlng, {
      radius: 3,
      color: 'red',
      fillOpacity: 1,
    });
  }
}
