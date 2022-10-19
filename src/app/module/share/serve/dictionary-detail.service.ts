import { productSelect } from './../model/common.model';
import { dict } from '../model/result.model';
import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import {
  PRODUCT_CHILD_CODE,
  PRODUCT_PARENT_CODE,
} from '../config/constant.config';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import _ from 'lodash';
@Injectable({
  providedIn: 'root',
})
export class DictionaryDetailService {
  constructor(private baseHttp: HttpClientService) {}
  dictArr: dict[] = [];
  manualMenu: NzTreeNodeOptions[] = [];
  productSelector: productSelect[] = [];

  /**
   * 通过dictCode 获取字典数据
   * @param dictcode
   * @returns
   */
  async getDicCodeByCodes(dictcode: string) {
    if (this.dictArr.length === 0) {
      this.dictArr = await this.getAll();
    }
    return Promise.resolve(this.filterDicByCode(dictcode));
  }

  private filterDicByCode(dictcode: string) {
    return this.dictArr.filter((ele) => ele.dictCode === dictcode);
  }

  /**
   * 获取手册类型树形结构
   * @returns
   */
  async getManualTreeNodes(): Promise<NzTreeNodeOptions[]> {
    const parentDicts = await this.getDicCodeByCodes(PRODUCT_PARENT_CODE);
    const childDicts = await this.getDicCodeByCodes(PRODUCT_CHILD_CODE);
    return parentDicts.map((dictItem) => {
      const childNodes: NzTreeNodeOptions[] = childDicts
        .filter(
          (childDictItem) => childDictItem.pitemCode === dictItem.itemCode
        )
        .map((dict) => this.tansformDictToTreeNode(dict, true));

      const parentItem: NzTreeNodeOptions = this.tansformDictToTreeNode(
        dictItem,
        false,
        childNodes
      );
      return parentItem;
    });
  }

  /**
   * 小函数：将 字典类型转为 我们需要的 nz-tree 的  NzTreeNodeOptions
   * @param dictItem
   * @param isLeaf
   * @param children
   * @returns
   */
  private tansformDictToTreeNode(
    dictItem: dict,
    isLeaf?: boolean,
    children: NzTreeNodeOptions[] = []
  ): NzTreeNodeOptions {
    return {
      title: dictItem.itemName,
      key: dictItem.itemCode,
      isLeaf,
      children,
    };
  }

  /**
   * 通过输入获取类型将字典分类
   * 持久化字典信息
   * @param type 字典类型
   */
  async getDictByType(type: 'menu' | 'productSelect') {
    if (this.dictArr.length === 0) {
      this.dictArr = await this.getAll();
    }
    switch (type) {
      case 'menu':
        if (this.manualMenu.length === 0) {
          this.initMenu();
        }
        return Promise.resolve(_.cloneDeep(this.manualMenu));
      case 'productSelect':
        if (this.manualMenu.length === 0) {
          this.initMenu();
        }
        this.initProductSelector();
        return Promise.resolve(_.cloneDeep(this.productSelector));
      default:
        return Promise.resolve(_.cloneDeep(this.productSelector));
    }
  }
  /**
   * 初始化菜单
   */
  initMenu() {
    const ProductChild = this.dictArr.filter(
      (el) => el.dictCode === PRODUCT_CHILD_CODE
    );
    this.manualMenu = this.dictArr
      .filter((el) => el.dictCode === PRODUCT_PARENT_CODE)
      .reduce((arr: NzTreeNodeOptions[], el) => {
        arr.push({
          title: el.itemName,
          key: el.itemCode,
          children: ProductChild.filter(
            (child) => child.pitemCode === el.itemCode
          ).reduce((childArr: NzTreeNodeOptions[], childNode) => {
            childArr.push({
              title: childNode.itemName,
              key: childNode.itemCode,
              isLeaf: true,
              children: [],
            });
            return childArr;
          }, []),
        });
        return arr;
      }, []);
  }
  /**
   * 初始化产品分类分组选择器
   */
  async initProductSelector(): Promise<productSelect[]> {
    this.productSelector = this.manualMenu.reduce(
      (arr: productSelect[], item) => {
        arr.push({
          label: item.title,
          productCode: item.key,
          children: item.children?.reduce((arrChild: productSelect[], el) => {
            arrChild.push({
              label: el.title,
              productCode: el.key,
            });
            return arrChild;
          }, []),
        });
        return arr;
      },
      []
    );
    return Promise.resolve(this.productSelector);
  }

  private getAll(): Promise<dict[]> {
    return this.baseHttp.get<dict[]>('/api/dictionarydetail/getAll');
  }
}
