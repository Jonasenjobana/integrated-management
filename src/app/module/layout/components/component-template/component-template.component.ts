import { Tab } from '../tab/Tab.model'
import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
      const componentFactory = this.dynamicRef.viewContainerRef.createComponent(item.component)
      componentFactory.instance.dynamicParams = this.tab.data 
    } else {
      new Error('tab渲染的组件不能为空')
    }
  }
}
