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
  manualList: manual[] = []
  isManualListLoading: boolean = true
  @ViewChild('nzTreeComponent')
  nzTreeComponent!: NzTreeComponent


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


  ngOnInit(): void {
    // 从数据字典获取分类列表
    this.dictService.getDictByType('menu').then(res => {
      this.menu = res
      this.isMenuLoading = false
    })
    // 公司列表
    this.companyService.getCompanyList().then(res => {
      this.companyList = res
      console.log(res);
      
      this.isCompanyLoading = false
    })
    // 加载默认显示手册信息
    this.initManualList(this._initDate)
  }


  /**
   * 
   * @param params 请求参数
   */
  initManualList(params: paramsData) {
    this.isManualListLoading = true
    this.manualHttpService.getList(params).then(res => {
      this.manualList = res.result.reduce((arr: manual[], el) => {
        arr.push({
          id: el.id,
          img: el.img,
          manualName: el.manualName,
          manualSerie: el.manualSerie,
        })
        return arr
      }, [])
    }).finally(() => {
      this.isManualListLoading = false
    })
  }


  search() {
    this.initManualList(this.loadData)
  }
  clean() {
    this.loadData = _.cloneDeep(this._initDate)
    this.tags = []
  }


  /**
   * 选择产品分类
   * @param $event 节点信息
   */
  selectMenu($event: NzFormatEmitEvent) {
    const node = $event.node!
    this.loadData.productCode = node.key
    this.updateTags({key: node.key, title: node.title}, 'menu')
    this.initManualList(_.assign(_.cloneDeep(this._initDate), {productCode: node.key}))
  }


    /**
   * 品牌变更
   * @param companyId 公司索引
   */
     selectBrand(companyId: string) {
      const selected = this.companyList.find(el => el.id === companyId)
      if (selected) {
        this.updateTags({key: selected.id, title: selected.companyName}, 'brand')
      }
      this.initManualList(_.assign(_.cloneDeep(this._initDate), {companyId}))
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
    console.log(this.tags);
    
  }


  /**
   * tag: {key,title,type}
   * 不同类型有不同操作逻辑
   * @param tag 关闭标签
   */
  closeTag(tag: tag) {
    switch(tag.type) {
      case 'menu':
        this.nzTreeComponent.getTreeNodeByKey(tag.key)!.isSelected = false
        break
      case 'brand':
        this.loadData.companyId = ''
        break
    }
  }


  /**
   * 跳转到详情
   * @param id 产品索引
   */
  jumpToDetail(id: string) {
    console.log('点击跳转', id);
  }
}
