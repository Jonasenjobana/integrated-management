import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'common-confirm',
  templateUrl: './common-confirm.component.html',
  styleUrls: ['./common-confirm.component.less']
})
export class CommonConfirmComponent implements OnInit {
  @Input()
  isVisible: boolean = false
  @Input()
  title: string = '确认框'
  @Input()
  isLoading: boolean = false
  @Input()
  content: string = '确认'
  @Output('onConfirm')
  confirm: EventEmitter<boolean> = new EventEmitter() 
  constructor() { }

  ngOnInit(): void {
  }
  handleOk() {
    this.confirm.emit(true)
  }
  handleCancel() {
    this.confirm.emit(false)
  }
}
