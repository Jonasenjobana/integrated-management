import { Tab } from '../tab/tab.model'
import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicDirDirective } from '../../dynamic-dir.directive';
@Component({
  selector: 'component-template',
  template: `<ng-template dynamicDir></ng-template>`,
})
export class ComponentTemplateComponent implements OnInit {
  @Input('tab')
  tab!: Tab
  constructor() { 
  }
  @ViewChild(DynamicDirDirective)
  dynamicRef!: DynamicDirDirective
  ngOnInit(): void {
    setTimeout(() => {
      this.load(this.tab) 
    });
  }
  load(item: Tab):void {
    if (item.component !== undefined) {
      this.dynamicRef.viewContainerRef.createComponent(item.component)
    } else {
      new Error('tab渲染的组件不能为空')
    }
  }
}
