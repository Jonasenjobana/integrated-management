import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'zq-filter',
  templateUrl: './zq-filter.component.html',
  styleUrls: ['./zq-filter.component.less']
})
export class ZqFilterComponent implements OnInit {
  @Input()
  filterText: string = ''
  @Input()
  filterIcon: string = ''
  constructor() { }

  ngOnInit(): void {
  }

}
