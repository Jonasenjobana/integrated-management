import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manual-list',
  templateUrl: './manual-list.component.html',
  styleUrls: ['./manual-list.component.less']
})
export class ManualListComponent implements OnInit {
  constructor() { 
    console.log('ManualListComponent新创建了')
  }

  ngOnInit(): void {
  }

}
