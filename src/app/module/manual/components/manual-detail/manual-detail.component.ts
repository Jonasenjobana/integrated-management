import { ManualHttpService } from './../../manual-http.service';
import { DynamicParams } from './../../../layout/components/tab/Tab.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-manual-detail',
  templateUrl: './manual-detail.component.html',
  styleUrls: ['./manual-detail.component.less']
})
export class ManualDetailComponent implements OnInit {

  @Input()
  dynamicParams!:DynamicParams

  constructor(private manualHttpService:ManualHttpService) { }
  
  ngOnInit(): void {
    this.manualHttpService.getInfo(this.dynamicParams.id!).then(res => {
      console.log(res);
    })
  }
  
}
