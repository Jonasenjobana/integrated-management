import { Page } from './../../../share/model/result.model';
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
  pageChange() {
    this.getManualList(this.searchEntity)
  }
  /**
   * ??????????????????
   * @param params 
   */
  private getManualList(params: ParamsData) {
    this.isManualListLoading = true;
    this.manualHttpService
      .getList(params)
      .then(({ pageCount, recordCount, result }: Page<Manual[]>) => {
        this.searchEntity.pageCount = pageCount
        this.searchEntity.recordCount = recordCount
        this.manualList = result.map(el => {
          return el
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
   * ?????????
   */
  clean() {
    this.tags = []
    this.searchEntity = {
      pageRecord: 10,
      currentPage: 1
    }
    const node = this.nzTreeComponent.getSelectedNodeList()[0]
    if (node !== undefined) {
       node.isSelected = false
    }
    this.getManualList(this.searchEntity)
  }

  /**
   * 
   * @param type ??????
   * @param key tag???
   * @param title tag?????????
   * @param params ????????????
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
   * ?????????????????????????????????
   * @param tag ????????????
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



  /**
   * ???????????????
   * @param id ????????????
   */
  jumpToDetail(manualId: string) {
    this.dynamicServeService.addTab('manual-detail', {manualId, type: 'Manual'})
  }
  jumpToCreate() {
    this.dynamicServeService.addTab('manual-create', {type: 'Manual'})
  }
  // TODO:??????????????????????????????

}
