import { Dict } from '../model/result.model';
import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { ConstantCode } from '../config/constant.config';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import _ from 'lodash';
@Injectable({
  providedIn: 'root',
})
export class DictionaryDetailService {
  constructor(private baseHttp: HttpClientService) {}
  private dictArr: Dict[] = [];
  manualMenu: NzTreeNodeOptions[] = [];

  /**
   * 通过dictCode 获取字典数据
   * @param dictcode
   * @returns
   */
  async getDicCodeByCodes(dictcode: string) {
    if (this.dictArr.length === 0) {
      this.dictArr = await this.getAll()
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
    const parentDicts = await this.getDicCodeByCodes(ConstantCode.PRODUCT_PARENT_CODE);
    const childDicts = await this.getDicCodeByCodes(ConstantCode.PRODUCT_CHILD_CODE);
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
    dictItem: Dict,
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

  private getAll(): Promise<Dict[]> {
    return this.baseHttp.get<Dict[]>('/api/dictionarydetail/getAll');
  }
}
