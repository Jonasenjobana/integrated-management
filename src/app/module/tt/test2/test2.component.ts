import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.less']
})
export class Test2Component implements OnInit {
  mousePosition?: {lng: string, lat:string}
  @Input() map!: L.Map
  constructor() {
  }

  ngOnInit(): void {
    this.map.on('mousemove', (e) => {
      let pos = e.latlng;
      this.mousePosition = { lng: Number.parseFloat(pos.lng.toString()).toFixed(5), lat: Number.parseFloat(pos.lat.toString()).toFixed(5) }
    });
  }
}
