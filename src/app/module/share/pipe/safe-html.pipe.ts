import { Pipe, PipeTransform } from '@angular/core';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitized: DomSanitizer) {
    
  }
  transform(value: string):  SafeHtml {
    if (value.length === 0) {
      value = '<p>无产品介绍说明</p>'
    }
    return this.sanitized.bypassSecurityTrustHtml(value)
  }

}
