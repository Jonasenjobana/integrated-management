import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { fromEvent, map, mergeMap, Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
})
export class TableComponent implements OnInit {
  @Input() columnItems: ColumnItem[] = [];
  fixedItems: ColumnItem[] = [];
  @Input()
  tableData: Array<any> = [];
  fixedWidth: number = 0;
  el: ElementRef;
  constructor(el: ElementRef) {
    this.el = el;
  }
  l: number = 0
  t: number = 200
  ngOnInit(): void {
    this.init();
    let box =  this.el.nativeElement.querySelector('#box');
    let element: HTMLDivElement = this.el.nativeElement.querySelector('#paint');
    console.log([element]);
    fromEvent(box, 'mouseup').subscribe(e => {
      element.style.cursor = 'pointer'
    })
    fromEvent(element, 'mousedown').pipe(
      mergeMap((e) => {
        element.style.cursor = 'grab'
        return fromEvent(box, 'mousemove').pipe(takeUntil(fromEvent(box, 'mouseup')))
      }),
    ).subscribe((e: any) => {
      if (e.clientX - 230 < 0 || e.clientX - 230 > box.style.width || e.clientY - 70 < 0 || e.clientY - 70 > 600) {
      } else {
        this.l = e.clientX - 230
        this.t = e.clientY - 135
      }
      
      element.style.left = this.l + 'px'
      element.style.top = this.t + 'px'
    });
  }
  init() {
    this.fixedItems = this.columnItems.filter((el) => el.isFixed);
    this.fixedWidth = this.fixedItems.reduce((w, el) => w + el.width!, 0);
  }
}
export interface ColumnItem {
  name: string;
  property: string;
  cb?: callback;
  cbr?: callbackWithReturn;
  isFixed?: boolean;
  columnStyle?: any;
  type?: ColumnType;
  width?: number;
  isLink?: boolean;
}
type callback = (...param: any) => any;
type callbackWithReturn = (...param: any) => string | number | boolean;
export type ColumnType = 'dot' | 'button' | 'text';

function takeUtil(arg0: Observable<unknown>) {
  throw new Error('Function not implemented.');
}
