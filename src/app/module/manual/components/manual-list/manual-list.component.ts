import { CommonTagService } from './../../../share/serve/common-tag.service';
import { DynamicServeService } from './../../../layout/dynamic-serve.service';
import { ManualHttpService } from './../../manual-http.service';
import { Manual } from './../../manual.model';
import { ParamsData, Search, Tag, TagType, CompanyName } from './../../../share/model/common.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NzTreeNodeOptions,
  NzFormatEmitEvent,
  NzTreeComponent,
} from 'ng-zorro-antd/tree';
import { CompanyHttpService } from 'src/app/module/share/serve/company-http.service';
import { DictionaryDetailService } from 'src/app/module/share/serve/dictionary-detail.service';

@Component({
  selector: 'app-manual-list',
  templateUrl: './manual-list.component.html',
  styleUrls: ['./manual-list.component.less'],
})
export class ManualListComponent implements OnInit {
  searchEntity: Search
  menu: NzTreeNodeOptions[] = []
  manualList: Manual[] = []
  companyList: CompanyName[] = []
  tags: Tag[] = []
  isMenuLoading: boolean
  isCompanyLoading: boolean
  isManualListLoading: boolean

  @ViewChild('nzTreeComponent')
  nzTreeComponent!: NzTreeComponent;
  constructor(
    private dictService: DictionaryDetailService,
    private companyService: CompanyHttpService,
    private manualHttpService: ManualHttpService,
    private dynamicServeService:DynamicServeService,
    private commonTagService:CommonTagService
  ) {
    this.isMenuLoading = true
    this.isCompanyLoading = true
    this.isManualListLoading = true
    this.searchEntity = {
      currentPage: 1,
      pageRecord: 10,
    }
  }
  ngOnInit(): void {
    this.dictService.getManualTreeNodes().then((res) => {
      this.menu = res
      this.isMenuLoading = false
    });
    this.companyService.getCompanyList().then((res) => {
      this.companyList = res;
      this.isCompanyLoading = false;
    });
    this.getManualList(this.searchEntity);
  }

  /**
   *
   * @param params 
   */
  private getManualList(params: ParamsData) {
    this.isManualListLoading = true;
    this.manualHttpService
      .getList(params)
      .then(({ pageRecord, pageCount, currentPage, recordCount, result }) => {
        this.manualList = result.map(el => {
          return {
            id: el.id,
            img: el.img,
            manualName: el.manualName,
            manualSerie: el.manualSerie,
          }
        });
      })
      .finally(() => {
        this.isManualListLoading = false;
      });
  }

  search() {
    this.commonTagService.showAllTags(this.tags)
    const name =this.searchEntity.name
    if (name !== undefined && name !== '') {
      this.commonTagService.updateTags({title:name, key: name}, 'Name', this.tags)
    }
    this.getManualList(this.searchEntity)
  }

  /**
   * 初始化
   */
  clean() {
    this.tags = []
    this.searchEntity.companyId = ''
    this.searchEntity.name = ''
    this.searchEntity.productCode = ''
    const node = this.nzTreeComponent.getSelectedNodeList()[0]
    if (node !== undefined) {
       node.isSelected = false
    }
    this.searchEntity.pageRecord = 10
    this.searchEntity.currentPage = 1
    this.getManualList(this.searchEntity)
  }

  /**
   * 
   * @param type 类型
   * @param key tag值
   * @param title tag显示名
   * @param params 请求参数
   */
  commonSelect(type: TagType, key: string, title: string, params: ParamsData) {
    this.commonTagService.hideTags(this.tags)
    this.commonTagService.updateTags({ key, title }, type, this.tags)
    const pagination = {
      currentPage: 1,
      pageRecord: this.searchEntity.pageRecord
    }
    this.getManualList({...params, ...pagination})
  }



  selectMenu($event: NzFormatEmitEvent) {    
    const node = $event.node!
    this.commonSelect('Menu', node.key, node.title, {productCode: node.key})
  }
  selectBrand(companyId: string) {
    this.commonSelect('Brand', companyId, this.companyList.find(el => el.id === companyId)!.companyName, {companyId})
  }
  searchName() {
    if (this.searchEntity.name !== undefined && this.searchEntity.name !== '') {
      this.commonSelect('Name', this.searchEntity.name!, this.searchEntity.name!, {name: this.searchEntity.name})
    }
  }



  /**
   * tag: {key,title,type}
   * 不同类型有不同操作逻辑
   * @param tag 关闭标签
   */
  closeTag(tag: Tag) {
    switch (tag.type) {
      case 'Menu':
        this.searchEntity.productCode = ''
        this.nzTreeComponent.getTreeNodeByKey(tag.key)!.isSelected = false;
        break;
      case 'Brand':
        this.searchEntity.companyId = ''
        break;
      case 'Name':
        this.searchEntity.name = ''
    }
    this.commonTagService.tagDelete(tag.key, tag.type, this.tags)
    this.search()
  }



  // TODO: 新增页面
  /**
   * 跳转到详情
   * @param id 产品索引
   */
  jumpToDetail(id: string) {
    this.dynamicServeService.addTab('manual-detail', {id, type: 'Manual'}, false)
  }

  // TODO:差防抖操作去申请接口以及错误消息提示
}
