import { treeNode } from './../model/common.model';
import { dict } from './../model/result';
import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { PRODUCT_CHILD_CODE, PRODUCT_PARENT_CODE } from '../config/constant.config';
import _ from 'lodash'
@Injectable({
  providedIn: 'root'
})
export class DictionaryDetailService {

  constructor(private baseHttp: HttpClientService) { }
  dictArr: dict[] = []
  manualMenu: treeNode[] = []
  async dict(): Promise<dict[]> {
    if (this.dictArr.length === 0) {
      try {
        this.dictArr = await this.getAll()
      } catch(error) {
        console.log('ERROR',error)
      }
    }
    return Promise.resolve(this.dictArr)
  }

  getAll(): Promise<dict[]> {
    return this.baseHttp.get<dict[]>('/api/dictionarydetail/getAll')
  }
  /**
   * 通过输入获取类型将字典分类
   * 持久化字典信息
   * @param type 类型 menu || express || country ...
   */
  async getDictByType(type: string){
    if (this.dictArr.length === 0) {
      try {
        this.dictArr = await this.getAll()
      } catch(error) {
        console.log('err',error)
      }
    }
    switch(type) {
      case 'menu':
        if (this.manualMenu.length === 0) {
          this.initMenu()
        }
        return Promise.resolve(_.cloneDeep(this.manualMenu))
    }
    return Promise.reject('错误的字典类型')
  }
  /**
   * 初始化菜单
   */
  initMenu() {
    const ProductChild = this.dictArr.filter(el => el.dictCode === PRODUCT_CHILD_CODE)
    this.manualMenu = this.dictArr.filter(el => el.dictCode === PRODUCT_PARENT_CODE).reduce((arr: treeNode[], el) => {
      arr.push({
        title: el.itemName,
        key: el.itemCode,
        children: ProductChild.filter(child => child.pitemCode === el.itemCode).reduce((childArr: treeNode[], childNode) => {
          childArr.push({
            title: childNode.itemName,
            key: childNode.itemCode,
            isLeaf: true,
            children: []
          })
          return childArr
        }, [])
      })
      return arr
    }, [])
  }
}
