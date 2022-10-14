import { Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[dynamicDir]'
})
export class DynamicDirDirective {

  constructor(public viewContainerRef:ViewContainerRef) { }

}
