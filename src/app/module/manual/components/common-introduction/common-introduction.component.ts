import { CatalogTech } from './../../../share/model/result.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'common-introduction',
  templateUrl: './common-introduction.component.html',
  styleUrls: ['./common-introduction.component.less']
})
export class CommonIntroductionComponent implements OnInit {
  @Input('introduction')
  introduction: string = ''
  @Input('catalogTech')
  catalogTech: CatalogTech[] = [{id:'1',techName:'电压',techValue:'220v'}]
  constructor() { }
  ngOnInit(): void {
  }
  
}
