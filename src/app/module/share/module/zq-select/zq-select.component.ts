import { Component, ElementRef, Input, OnInit, ViewChild, OnChanges, HostListener, ViewChildren } from '@angular/core';

@Component({
  selector: 'zq-select',
  templateUrl: './zq-select.component.html',
  styleUrls: ['./zq-select.component.less'],
})
export class ZqSelectComponent implements OnInit {
  @Input()
  selectList: Array<{key: string, value: any}> =  [
    {
      key: 'iwad',
      value: '灯器'
    },
    {
      key: 'qwe',
      value: '铁器'
    },
    {
      key: 'iwrad',
      value: '金块'
    },
    {
      key: 'qwdsa',
      value: '铜器'
    },
    {
      key: 'zxcs',
      value: '银制品'
    }
  ]
  @Input()
  optionDirection: 'top'|'left'|'right'|'bottom' = 'bottom'
  @Input()
  isNeedClear: boolean = false
  @ViewChild('selectRef', {static: true})
  selectRef!: ElementRef
  @HostListener('document:click', ['$event.target'])
  _detechClick(element: HTMLElement) {
    if (!this.selectRef.nativeElement.contains(element)) {
      this.isSelected = false
    }
  }

  currentSelect?: {key: string, value: any}
  isSelected: boolean = false
  pageRecord?: number
  constructor() { }

  ngOnInit(): void {
  }
  changeSelect(item: {key: string, value: string}) {
    this.currentSelect = item
    this.isSelected = !this.isSelected 
    console.log('changeemit', this.currentSelect);
    
  }
}
