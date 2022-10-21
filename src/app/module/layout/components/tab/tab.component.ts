import { Tab, TabType } from './Tab.model';
import { Component, OnInit } from '@angular/core';
import { DynamicServeService } from '../../dynamic-serve.service';
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.less'],
})
export class TabComponent implements OnInit {
  constructor(private dynamicServe: DynamicServeService) {
    this.dynamicServe.change.subscribe((res) => {
      this.updateTabTask(res)
    })
    this.tabs = this.dynamicServe.currentTabList
  }
  selectedIndex: number = 0;
  tabs: Tab[]
  ngOnInit() {
  }
  /**
   * 订阅服务一些回调事件
   * @param param
   */
   updateTabTask({type, tab, index}: {type: TabType, tab: Tab, index: number}) {
    switch (type)  {
      case 'remove':
        this.selectedIndex = this.tabs.length - 1
        break
      default:
        this.selectedIndex = index
    }
  } 
  trackByItems(index: number, item: Tab) {
    return item.uuid!
  }
  /**
   * 
   * @param param0 关闭标签索引
   */
  closeTab({ index }: { index: number }) {
    this.dynamicServe.closeTab(index);
  }
  /**
   * 点击标签切换
   * @param tab 
   */
  clickTab(tab: Tab) {
    this.dynamicServe.clickTab(tab);
  }
  /**
   * 刷新展示组件
   * @param index 
   * @param tab 
   */
  refresh():void {
    this.dynamicServe.refreshCurrent()
  }
  closeAll(){

  }
  closeOthers() {
    
  }
}
