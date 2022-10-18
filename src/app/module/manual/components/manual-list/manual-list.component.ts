import { result } from './../../../share/model/result';
import { ManualHttpService } from './../../manual-http.service';
import { manual, paramsData, tag } from './../../manual.model';
import { company } from './../../../share/model/common.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NzTreeNodeOptions, NzFormatEmitEvent, NzTreeComponent } from 'ng-zorro-antd/tree';
import { CompanyHttpService } from 'src/app/module/share/serve/company-http.service';
import { DictionaryDetailService } from 'src/app/module/share/serve/dictionary-detail.service';
import _ from "lodash"
import { tagTitleMap } from '../../constant';
@Component({
  selector: 'app-manual-list',
  templateUrl: './manual-list.component.html',
  styleUrls: ['./manual-list.component.less']
})
export class ManualListComponent implements OnInit {
  private _initDate: paramsData
  tags: tag[] = []
  menu: NzTreeNodeOptions[] = []
  loadData: paramsData
  companyList: company[] = []
  isMenuLoading: boolean = true
  isCompanyLoading: boolean = true
  manualList: manual[] = [{manualName: '123', id:"123"},{manualName: '123', id:"123"},{manualName: '123', id:"123"},{manualName: '123', id:"123"},{manualName: '123', id:"123"}]
  constructor(private dictService:DictionaryDetailService, private companyService:CompanyHttpService, private manualHttpService:ManualHttpService) { 
    this._initDate = {
      currentPage: 1,
      pageRecord: 10,
      companyId: "",
      productCode: "",
      name: "",
    }
    this.loadData = _.cloneDeep(this._initDate)
  }
  @ViewChild('nzTreeComponent')
  nzTreeComponent!: NzTreeComponent
  selectBrand(companyId: string) {
    const selected = this.companyList.find(el => el.id = companyId)
    if (selected) {
      this.updateTags({key: selected.id, title: selected.companyName}, 'brand')
    }
  }
  ngOnInit(): void {
    this.dictService.getDictByType('menu').then(res => {
      this.menu = res
      this.isMenuLoading = false
    })
    this.companyService.getCompanyList().then(res => {
      this.companyList = res
      this.isCompanyLoading = false
    })
  }
  search() {
    this.manualHttpService.getList(this.loadData).then(res => {
      console.log(res);
    })
  }
  clean() {
    this.loadData = _.cloneDeep(this._initDate)
    this.tags = []
  }
  selectMenu($event: NzFormatEmitEvent) {
    const node = $event.node!
    this.loadData.productCode = node.key
    this.updateTags({key: node.key, title: node.title}, 'menu')
  }
  /**
   * 
   * @param param0 基本标签信息
   * @param type 标签类型:分类,品牌
   */
  updateTags({key, title}: {key: string, title: string}, type: 'menu'|'brand') {
    const index = this.tags.findIndex(el => el.type === type)
    if (index !== -1) {
      this.tags.splice(index, 1)
    }
    this.tags.push({
      key,
      title: `${tagTitleMap[type]}: ${title}`,
      type,
    })
  }
  /**
   * {key,title,type}
   * 不同类型有不同操作逻辑
   * @param tag 关闭标签
   */
  closeTag(tag: tag) {
    switch(tag.type) {
      case 'menu':
        this.nzTreeComponent.getTreeNodeByKey(tag.key)!.isSelected = false
        console.log(this.menu);
        
        break
      case 'brand':
        this.loadData.companyId = ''
        break
    }
  }
}
