import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'zq-button',
  templateUrl: './zq-button.component.html',
  styleUrls: ['./zq-button.component.less'],
})
export class ZqButtonComponent implements OnInit {
  @Input()
  zqType: 'primary'|'danger'|'warning'|'disabled' = 'primary'
  @Input()
  actived: boolean = false
  @Input('zq-icon')
  buttonIcon: string = ''
  @Input()
  zqText: string = ''
  @Output()
  btnClick: EventEmitter<any> = new EventEmitter()
  constructor() {
  }
  ngOnInit() {
    
  }
  buttonClick($event: any) {
    this.actived = !this.actived
    this.btnClick.emit($event)
  }
}
