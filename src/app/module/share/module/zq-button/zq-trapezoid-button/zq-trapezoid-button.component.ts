import { Component, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'zq-trapezoid-button',
  templateUrl: './zq-trapezoid-button.component.html',
  styleUrls: ['./zq-trapezoid-button.component.less']
})
export class ZqTrapezoidButtonComponent implements OnInit {
  @Input() readonly: boolean = false
  @Input() buttonType: 'add' | 'edit' = 'add'
  @Input() iconType: 'close' | 'edit' = 'close'
  @Input() buttonText: string = ''
  @Output() onClick: EventEmitter<string> = new EventEmitter()
  @Output() onTextChange: EventEmitter<string> = new EventEmitter()
  constructor() { }
  
  ngOnInit(): void {
  }

  handler() {
    this.onClick.emit(this.buttonText)
  }
  change() {
    this.onTextChange.emit(this.buttonText)
  }
}
