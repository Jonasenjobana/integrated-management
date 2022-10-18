import { uuid } from './../share/utils/common.utils';
import { Injectable } from '@angular/core';
import { Tab } from './components/tab/tab.model';
import { Subject } from 'rxjs';
import { DYNAMIC_COMPONENTS_LIST, INIT_TABS } from '../DYNAMIC-COMPONENT';

@Injectable({
  providedIn: 'root',
})
export class DynamicServeService {

  private _tab$: Subject<{type: string, tab: Tab, index: number}> = new Subject();
  private _currentTab: Tab
  private _currentTabList: Tab[]
  get change() {
    return this._tab$.asObservable()
  }
  get currentTab() {
    return this._currentTab!
  }
  set currentTab(tab: Tab) {
    this._currentTab = tab
  }
  get currentTabList() {
    return this._currentTabList
  }
  constructor() {
    this._currentTabList = INIT_TABS
    this._currentTab = this._currentTabList[0]
  }
  tabs: Tab[] = DYNAMIC_COMPONENTS_LIST
  /**
   * 组件名获取索引
   * @param key 
   * @returns 
   */
  private getIndex(key: string): number {
    return this._currentTabList.findIndex(el => el.key == key)
  }
  clickTab(tab: Tab): void {
    this.currentTab = tab
  }
  /**
   * 关闭标签
   * @param index 
   */
  public closeTab(index: number): void {
    this._currentTabList.splice(index, 1);
    this._tab$.next({ type: 'remove',tab: this._currentTabList[index], index})
  }
  /**
   * 点击侧边栏菜单，添加tab
   * @param key 
   */
  public addTab(key: string): void {
    const reuse = this.getComponentByName(key)
    const index = this.getIndex(key)
    if (index === -1) {
      reuse.uuid = uuid()
      this._currentTabList.push(reuse)
      this._tab$.next({ type: 'add', tab: reuse, index: this.getIndex(key)})
    } else {
      if (this._currentTab.key === key) {
        // 如果重新点击侧边栏重新加载组件
        reuse.uuid = uuid()
        const refreshNew = Object.assign(this._currentTabList[index], reuse)
        this.refresh(refreshNew, index)
      } else {
        // 否则只是改变selectIndex的值
        this._tab$.next({type: 'change', tab: reuse, index})
      }
    }
    this.currentTab = reuse
  }
  /**
   * 刷新组件
   * @param reuseTab 
   * @param index 
   */
  private refresh(reuseTab: Tab, index: number) {
    this._currentTabList.splice(index, 1, reuseTab)
    this._tab$.next({ type: 'refresh', tab: reuseTab, index: index})
    this._currentTab = reuseTab
  }
  /**
   * 通过key获取Tab实例
   * @param name 
   * @returns 
   */
  private getComponentByName(name: string): Tab{
    const dynamicComponent = DYNAMIC_COMPONENTS_LIST.find(el => el.key === name)
    if (!dynamicComponent) {
      throw new Error('组件名称为' + name + '未能找到对应的注册组件！')
    }
    return dynamicComponent
  }
  /**
   * 刷新当前标签
   */
  refreshCurrent() {
    const index = this.getIndex(this._currentTab.key)
    this._currentTab.uuid = uuid()
    this._currentTabList.splice(index, 1,this._currentTab)
  }
  deleteAll() {
 
  }
}
