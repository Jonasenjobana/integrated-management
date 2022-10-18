import { treeNode } from './../../../share/model/common.model';
import { Component, OnInit } from '@angular/core';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { DictionaryDetailService } from 'src/app/module/share/serve/dictionary-detail.service';
@Component({
  selector: 'app-manual-list',
  templateUrl: './manual-list.component.html',
  styleUrls: ['./manual-list.component.less']
})
export class ManualListComponent implements OnInit {
  menu: treeNode[] = []
  isMenuLoading: boolean = true
  constructor(private dictService:DictionaryDetailService) { 
  }
  ngOnInit(): void {
    this.dictService.getDictByType('menu').then(res => {
      this.menu = res
      this.isMenuLoading = false
      console.log('-----', this.menu)
    })
  }
  
  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

}
