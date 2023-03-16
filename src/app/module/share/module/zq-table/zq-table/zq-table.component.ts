import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Column, Pagenation } from '../model/zq-table-model';

@Component({
  selector: 'zq-table',
  templateUrl: './zq-table.component.html',
  styleUrls: ['./zq-table.component.less'],
})
export class ZqTableComponent implements OnInit, OnChanges {
  constructor() { }
  @Input() column: Column[] = []
  @Input() page: Array<any> = []
  @Input() maxHeight: number = 500
  @Input() isNeedFilter: boolean = false
  pagenation: Pagenation = {
    pageCount: 10,
    pageRecord: 15,
    currentPage: 3,
    itemTotal: 134,
  }
  ngOnInit(): void {
    console.log(this.maxHeight)
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['maxHeight'].currentValue) {
      console.log('发生变化')
      this.maxHeight = changes['maxHeight'].currentValue
    }
  }
}
