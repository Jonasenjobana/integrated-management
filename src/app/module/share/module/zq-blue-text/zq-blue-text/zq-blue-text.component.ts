import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: '[zq-blue-text]',
  templateUrl: './zq-blue-text.component.html',
  styleUrls: ['./zq-blue-text.component.less'],
  host: {
    '[class]': 'classType'
  }
})
export class ZqBlueTextComponent implements OnInit {
  @Input() textType: 'default' | 'textArea' | 'textLine' = 'default'
  classType: string = ''
  ref!: HTMLDivElement
  constructor(private elementRef: ElementRef) {
    console.log([elementRef.nativeElement])
    this.ref = elementRef.nativeElement
  }

  ngOnInit(): void {
    switch(this.textType) {
      case 'default':
        this.classType = 'sl-blue-text'
        break
      case 'textArea':
        this.classType = 'sl-blue-text-area'
        break
      default:
        this.classType = 'sl-blue-text-line'
    }
    if (this.textType === 'textLine') {
       setTimeout(() => {
        this.ref.style.width = `${this.ref.offsetWidth - this.ref.offsetLeft } px`
        
       })
    }
  }

}
