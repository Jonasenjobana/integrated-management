import { DynamicServeService } from 'src/app/module/layout/dynamic-serve.service';
import { Component, OnInit } from '@angular/core';
import { ZqSpinService } from '../share/module/zq-spin/zq-spin.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit {
  constructor() {
   }
  ngOnInit(): void {
  }

}
