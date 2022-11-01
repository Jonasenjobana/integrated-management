import { uuid } from './../share/utils/common.utils';
import { Injectable } from '@angular/core';
import { DynamicParams, Tab, TabType } from './components/tab/Tab.model'
import { Subject } from 'rxjs';
import { DYNAMIC_COMPONENTS_LIST, INIT_TABS } from '../DYNAMIC-COMPONENT';

@Injectable({
  providedIn: 'root',
})
export class DynamicServeService {

  private _tab$: Subject<{type: TabType, tab: Tab, index: number}> = new Subject();
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
   * 点击其他按钮新增、跳转详情
   * @param key 
   */
  public addTab(key: string, data: DynamicParams = { type: ''}, isMenuJump: boolean = false): void {
    const reuse = this.getComponentByName(key)
    const index = this.getIndex(key)
    // 未在tab数组内
    if (index === -1) {
      reuse.uuid = uuid()
      reuse.data = data
      this._currentTabList.push(reuse)
      this._tab$.next({ type: 'add', tab: reuse, index: this.getIndex(key)})
      this.currentTab = reuse
      return
    }
    // 针对于菜单多次点击刷新或者其他跳转入口
    if (this._currentTab.key === key || !isMenuJump) {
      this.refresh(reuse, index, data)
    } else {
      // 改变tab索引
      this._tab$.next({type: 'change', tab: reuse, index})
    }
    this.currentTab = reuse
  }
  /**
   * 刷新组件
   * @param reuseTab 
   * @param index 
   */
  private refresh(reuse: Tab, index: number, data: DynamicParams) {
    reuse.uuid = uuid()
    reuse.data = data
    const refreshNew = Object.assign(this._currentTabList[index], reuse)
    this._currentTabList.splice(index, 1, refreshNew)
    this._tab$.next({ type: 'refresh', tab: refreshNew, index: index})
    this._currentTab = reuse
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
  getCurrentIndex() {
    return this._currentTabList.findIndex(el => el.uuid === this._currentTab.uuid)
  }
}
