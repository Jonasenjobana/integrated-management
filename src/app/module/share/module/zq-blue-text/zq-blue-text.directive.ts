import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[blue-text]',
  host: {
    '[style.boxSizing]': "'border-box'",
    '[style.backgroundColor]': "'#185efe14'",
    '[style.display]': "'inline-block'",
    '[style.height.px]': "'32'",
    '[style.minWidth.px]': "'55'",
    '[style.width]': "'max-content'",
    '[style.paddingLeft.px]': "'10'",
    '[style.lineHeight.px]': "'32'",
    '[style.borderRadius.px]': "'5'",
    '[style.paddingRight.px]': "'20'",
    '[style.margin]': "'5px 10px'"
  }
})
export class ZqBlueTextDirective {
  @Input() textType: 'text'|'textArea'|'textLine' = 'text'
  constructor(private elementRef: ElementRef) { 
   
  }
  ngOnInit() {
    console.log(this.textType)
  }
}
