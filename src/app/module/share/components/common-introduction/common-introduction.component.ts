import { Component, Input, OnInit } from '@angular/core';
import { CatalogTech } from '../../model/result.model';

@Component({
  selector: 'common-introduction',
  templateUrl: './common-introduction.component.html',
  styleUrls: ['./common-introduction.component.less']
})
export class CommonIntroductionComponent implements OnInit {
  @Input('introduction')
  introduction: string = ''
  @Input('catalogTech')
  catalogTech: CatalogTech[] = [{id:'1',techName:'杀杀杀',techValue:'123213'},{id:'1',techName:'杀杀杀',techValue:'123213'},{id:'1',techName:'杀杀杀',techValue:'123213'},{id:'1',techName:'杀杀杀',techValue:'123213'}]
  constructor() { }
  ngOnInit(): void {
  }
  
}
