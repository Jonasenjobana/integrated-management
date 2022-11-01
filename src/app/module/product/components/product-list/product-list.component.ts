import { DynamicServeService } from 'src/app/module/layout/dynamic-serve.service';
import { CommonTagService } from './../../../share/serve/common-tag.service';
import { Product, SelectType } from './../product.model';
import { ManualHttpService } from './../../../manual/manual-http.service';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { CompanyHttpService } from './../../../share/serve/company-http.service';
import { Tag, Search, TagType, CompanyName, ProductName, ParamsData } from './../../../share/model/common.model';
import { DictionaryDetailService } from 'src/app/module/share/serve/dictionary-detail.service';
import { ProductHttpService } from './../../product-http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NzSelectComponent } from 'ng-zorro-antd/select';
import dayjs from 'dayjs';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less'],
})
export class ProductListComponent implements OnInit {
  productList: Product[] = []
  productTypeSelect: NzTreeNodeOptions[] = []
  companySelect: CompanyName[] = []
  productNameSelect: ProductName[] = []
  tags: Tag[] = []
  customerDate: Date[] = []
  dateRadioType: string = ''
  searchEntity: Search
  checkAll: boolean = false
  isProductListLoading: boolean = true
  constructor(
    private productHttpService: ProductHttpService,
    private manualHttpService: ManualHttpService,
    private dictionaryDetailService: DictionaryDetailService,
    private companyHttpService: CompanyHttpService,
    private commonTagService: CommonTagService,
    private dynamicServe: DynamicServeService
  ) {
    this.searchEntity = {
      currentPage: 1,
      pageRecord: 10,
    }
  }
  @ViewChild('typeSelectRef')
  typeSelectRef!: NzSelectComponent
  ngOnInit(): void {
    this.dictionaryDetailService.getManualTreeNodes().then((res) => {
      this.productTypeSelect = res
    })
    this.manualHttpService.getName().then(res => {
      this.productNameSelect = res
    })
    this.getProductList(this.searchEntity)
    this.companyHttpService.getCompanyList().then((res) => {
      this.companySelect = res
    });
  }
  pageChange() {
    this.getProductList(this.searchEntity)
  }
  getProductList(paramsData: ParamsData) {
    this.isProductListLoading = true
    this.productHttpService.getList(paramsData).then(res => {
      this.productList = res.result.map(el => {
        el.isSelected = false
        return el
      })
      this.isProductListLoading = false
    })
  }
  /**
   * 全选
   * @param allChecked 
   */
  onAllChecked(allChecked: boolean) {
    this.productList.forEach(el => el.isSelected = allChecked)
  }
  /**
   * 改变条件通用函数
   * @param value 
   * @param type 
   * @returns 
   */
  selectChange(value: string, type: SelectType) {
    let tagType: TagType
    let title = ''
    const pagination = {
      currentPage: 1,
      pageRecord: this.searchEntity.pageRecord
    }
    let params = {}
    switch (type) {
      case 'ProductType':
        title = <string>this.typeSelectRef.listOfTopItem[0].nzLabel
        tagType = 'Menu'
        params = {
          productCode: value
        }
        break
      case 'ProductName':
        const name = this.productNameSelect.find(el => el.id === value)!.name
        this.searchEntity.name = name
        title = name
        tagType = 'Name'
        params = {
          name
        }
        break
      case 'ProductBrand':
        title = this.companySelect.find(el => el.id === value)!.companyName
        tagType = 'Brand'
        params = {
          companyId: value
        }
        break
      case 'Date':
        // 统一处理时间类型
        this.formateDateByType(value)
        return
      default:
        console.log('函数TagType类型错误')
        return
    }
    this.commonTagService.hideTags(this.tags)
    this.commonTagService.updateTags({ key: value, title }, tagType, this.tags)
    this.getProductList({...params, ...pagination})
  }
  /**
   * 自定义时间范围
   * @param dates 
   */
  customerDateChange(dates: (Date | null)[]) {
    if (dates.length === 2) {
      const dateStringArray = this.formatDate(dates)
      const TagTitle = dateStringArray[0] + ' ~ ' + dateStringArray[1]
      this.searchEntity.startTime = dateStringArray[0]
      this.searchEntity.endTime = dateStringArray[1]
      this.commonTagService.updateTags({ key: 'Date', title: TagTitle }, 'Date', this.tags)
      this.getProductList({startTime: this.searchEntity.startTime, endTime: this.searchEntity.endTime, pageRecord: this.searchEntity.pageRecord, currentPage: 1})
    }
  }
  /**
   * 生产日期确定时间范围
   * @param type 
   */
  formateDateByType(type: string) {
    let TagTitle = ''
    switch (type) {
      case 'Day':
        this.searchEntity.startTime = dayjs().format('YYYY-MM-DD')
        this.searchEntity.endTime = dayjs().add(1, 'day').format('YYYY-MM-DD')
        TagTitle = '本日'
        break
      case 'Week':
        this.searchEntity.startTime = dayjs().startOf('week').add(1, 'day').format('YYYY-MM-DD')
        this.searchEntity.endTime = dayjs().endOf('week').add(2, 'day').format('YYYY-MM-DD')
        TagTitle = '本周'
        break
      case 'Month':
        this.searchEntity.startTime = dayjs().startOf('month').format('YYYY-MM-DD')
        this.searchEntity.endTime = dayjs().endOf('month').add(1, 'day').format('YYYY-MM-DD')
        TagTitle = '本月'
        break
      case 'Customer':
        TagTitle = '自定义'
        return
    }
    this.commonTagService.hideTags(this.tags)
    this.commonTagService.updateTags({ key: type, title: TagTitle }, 'Date', this.tags)
    this.getProductList({startTime: this.searchEntity.startTime, endTime: this.searchEntity.endTime, pageRecord: this.searchEntity.pageRecord, currentPage: 1})
  }
  /**
   * 将Date数组转变为字符数组格式为YYYY-MM-DD
   * @param dates 
   * @returns 
   */
  formatDate(dates: (Date | null)[]) {
    return dates.map(el => dayjs(el).format('YYYY-MM-DD'))
  }
  /**
   * 搜索序列号
   */
  searchSerial() {
    if (this.searchEntity.serialNumber) {
      this.commonTagService.hideTags(this.tags)
      this.commonTagService.updateTags({ key: this.searchEntity.serialNumber, title: this.searchEntity.serialNumber }, 'Series', this.tags)
      this.getProductList({serialNumber: this.searchEntity.serialNumber, currentPage: 1, pageRecord: this.searchEntity.pageRecord})
    }
  }
  /**
   * 关闭标签初始化条件
   * @param tag 标签
   */
  closeTag(tag: Tag) {
    switch(tag.type) {
      case 'Brand':
        this.searchEntity.companyId = ''
        break
      case 'Date':
        this.searchEntity.startTime = ''
        this.searchEntity.endTime = ''
        this.dateRadioType = ''
        break
      case 'Name':
        this.searchEntity.nameId = ''
        this.searchEntity.name = ''
        break
      case 'Series':
        this.searchEntity.serialNumber = ''
        break
    }
    this.commonTagService.tagDelete(tag.key, tag.type, this.tags)
    this.getProductList(this.searchEntity)
  }
  searchAll() {
    this.tags.forEach(tag => tag.show = true)
    this.getProductList(this.searchEntity)
  }
  clean() {
    this.tags = []
    this.dateRadioType = ''
    this.searchEntity = {
      pageRecord: 10,
      currentPage: 1
    }
    this.getProductList(this.searchEntity)
  }

  jumpToEdit(type: 'Manual'|'Product', product: Product) {
    this.dynamicServe.addTab('manual-detail', {id: product.manualId, type, product})
  }
  jumpToCreate() {
    this.dynamicServe.addTab('instock-edit', {type: 'Product'})
  }
}
