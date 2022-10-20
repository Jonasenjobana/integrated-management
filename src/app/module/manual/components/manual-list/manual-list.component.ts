import { ManualHttpService } from './../../manual-http.service';
import { Manual } from './../../manual.model';
import { Company, ParamsData, Search, Tag } from './../../../share/model/common.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NzTreeNodeOptions,
  NzFormatEmitEvent,
  NzTreeComponent,
} from 'ng-zorro-antd/tree';
import { CompanyHttpService } from 'src/app/module/share/serve/company-http.service';
import { DictionaryDetailService } from 'src/app/module/share/serve/dictionary-detail.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TagTitle } from 'src/app/module/share/config/constant.config';
@Component({
  selector: 'app-manual-list',
  templateUrl: './manual-list.component.html',
  styleUrls: ['./manual-list.component.less'],
})
export class ManualListComponent implements OnInit {
  searchEntity: Search
  menu: NzTreeNodeOptions[] = [];
  manualList: Manual[] = [];
  companyList: Company[] = [];
  tags: Tag[] = []
  isMenuLoading: boolean;
  isCompanyLoading: boolean;
  isManualListLoading: boolean;

  @ViewChild('nzTreeComponent')
  nzTreeComponent!: NzTreeComponent;

  constructor(
    private dictService: DictionaryDetailService,
    private companyService: CompanyHttpService,
    private manualHttpService: ManualHttpService,
  ) {
    this.isMenuLoading = true;
    this.isCompanyLoading = true;
    this.isManualListLoading = true;
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
    this.tags.forEach(tag => tag.show = true)
    const name =this.searchEntity.name!
    if (name !== '') {
      this.updateTags({title:name, key: name}, 'Search')
    }
    this.getManualList(this.searchEntity);
  }
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
   * 选择产品分类
   * @param $event 节点信息
   */
  selectMenu($event: NzFormatEmitEvent) {    
    const node = $event.node!;
    this.hideTags()
    this.updateTags({ key: node.key, title: node.title }, 'Menu');
    const pagination = {
      currentPage: 1,
      pageRecord: this.searchEntity.pageRecord
    }
    this.getManualList({productCode: node.key, ...pagination})
  }
  /**
   * 品牌变更
   * @param companyId 公司索引
   */
  selectBrand(companyId: string) {
    const selected = this.companyList.find((el) => el.id === companyId);
    if (selected) {
      this.hideTags()
      this.updateTags(
        { key: selected.id, title: selected.companyName },
        'Brand'
      );
    }
    const pagination = {
      currentPage: 1,
      pageRecord: this.searchEntity.pageRecord
    }
    this.getManualList({companyId, ...pagination})
  }

  /**
   *
   * @param param0 基本标签信息
   * @param type 标签类型:分类,品牌
   */
  updateTags(
    { key, title }: { key: string; title: string },
    type: 'Menu'|'Brand'|'Search'
  ) {
    const index = this.tags.findIndex((el) => el.type === type);
    if (index !== -1) {
      this.tags.splice(index, 1);
    }
    this.tags.push({
      key,
      title: `${TagTitle[type]}: ${title}`,
      show: true,
      type,
    });
  }
  hideTags() {
    this.tags.forEach(el => el.show = false)
  }
  searchName() {
    this.hideTags()
    this.updateTags({title: this.searchEntity.name!, key: this.searchEntity.name!}, 'Search')
    const pagination = {
      currentPage: 1,
      pageRecord: this.searchEntity.pageRecord
    }
    this.getManualList({...pagination, name: this.searchEntity.name})
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
        this.tagDelete(tag.key)
        break;
      case 'Search':
        this.searchEntity.name = ''
        this.tagDelete(tag.key)
    }
    this.search()
  }
  tagDelete(key: string) {
    this.tags.splice(this.tags.findIndex(item => item.key === key), 1)
  }
  // TODO: 新增页面
  /**
   * 跳转到详情
   * @param id 产品索引
   */
  jumpToDetail(id: string) {
    console.log('点击跳转', id);
  }

  // TODO:差防抖操作去申请接口以及错误消息提示
}
