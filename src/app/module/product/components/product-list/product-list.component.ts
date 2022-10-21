import { Product, SelectType } from './../product.model';
import { ManualHttpService } from './../../../manual/manual-http.service';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { CompanyHttpService } from './../../../share/serve/company-http.service';
import { Tag, Search, TagType, CompanyName, ProductName } from './../../../share/model/common.model';
import { DictionaryDetailService } from 'src/app/module/share/serve/dictionary-detail.service';
import { ProductHttpService } from './../../product-http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TagTitle } from 'src/app/module/share/config/constant.config';
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
    private companyHttpService: CompanyHttpService
  ) {
    this.searchEntity = {
      currentPage: 1,
      pageRecord: 10,
    }
  }
  @ViewChild('typeSelectRef')
  typeSelectRef!: NzSelectComponent
  @ViewChild('brandSelectRef')
  brandSelectRef!: NzSelectComponent
  @ViewChild('nameSelectRef')
  nameSelectRef!: NzSelectComponent
  ngOnInit(): void {
    this.dictionaryDetailService.getManualTreeNodes().then((res) => {
      this.productTypeSelect = res
    })
    this.manualHttpService.getName().then(res => {
      this.productNameSelect = res
    })
    this.productHttpService.getList(this.searchEntity).then(res => {
      this.productList = res.result
      this.isProductListLoading = false
    })
    this.companyHttpService.getCompanyList().then((res) => {
      this.companySelect = res
    });
  }

  selectChange(value: string, type: SelectType) {
    let ref
    let tagType: TagType
    switch (type) {
      case 'ProductType':
        this.searchEntity.productCode = value
        ref = this.typeSelectRef
        tagType = 'Menu'
        break
      case 'ProductName':
        this.searchEntity.name = value
        ref = this.nameSelectRef
        tagType = 'Name'
        break
      case 'ProductBrand':
        this.searchEntity.companyId = value
        ref = this.brandSelectRef
        tagType = 'Brand'
        break
      case 'Date':
        // 统一处理时间类型
        this.formateDateByType(value)
        return
      default:
        console.log('函数TagType类型错误')
        return
    }
    this.hideTags()
    this.updateTags({ key: value, title: <string>ref.listOfTopItem[0].nzLabel }, tagType)
  }

  customerDateChange(dates: (Date | null)[]) {
    if (dates.length === 2) {
      const dateStringArray = this.formatDate(dates)
      const TagTitle = dateStringArray[0] + ' ~ ' + dateStringArray[1]
      this.updateTags({ key: 'Date', title: TagTitle }, 'Date')
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
        this.searchEntity.endTime = ''
        this.searchEntity.startTime = dayjs().format('YYYY-MM-DD').toString()
        TagTitle = '本日'
        break
      case 'Week':
        this.searchEntity.startTime = dayjs().startOf('week').add(1, 'day').format('YYYY-MM-DD')
        this.searchEntity.endTime = dayjs().endOf('week').add(1, 'day').format('YYYY-MM-DD')
        TagTitle = '本周'
        break
      case 'Month':
        this.searchEntity.startTime = dayjs().startOf('month').format('YYYY-MM-DD')
        this.searchEntity.endTime = dayjs().endOf('month').format('YYYY-MM-DD')
        TagTitle = '本月'
        break
      case 'Customer':
        TagTitle = '自定义'
        break
    }

    this.updateTags({ key: type, title: TagTitle }, 'Date')
  }
  /**
   * 将Date数组转变为字符数组格式为YYYY-MM-DD
   * @param dates 
   * @returns 
   */
  formatDate(dates: (Date | null)[]) {
    return dates.map(el => dayjs(el).format('YYYY-MM-DD'))
  }
  searchSerial() {
    if (this.searchEntity.serialNumber) {
      this.hideTags()
      this.updateTags({ key: this.searchEntity.serialNumber, title: this.searchEntity.serialNumber }, 'Series')
    }
  }
  searchAll() {
    this.tags.forEach(tag => tag.show = true)
    console.log(this.searchEntity);
  }
  hideTags() {
    this.tags.forEach(el => el.show = false)
  }
  clean() {
    this.tags = []
    this.searchEntity.companyId = ''
    this.searchEntity.name = ''
    this.searchEntity.productCode = ''
    this.searchEntity.serialNumber = ''
    this.dateRadioType = ''
    this.searchEntity.startTime = ''
    this.searchEntity.endTime = ''
    this.searchEntity.pageRecord = 10
    this.searchEntity.currentPage = 1
  }
  /**
 *
 * @param param0 基本标签信息
 * @param type 标签类型:分类,品牌
 */
  updateTags(
    { key, title }: { key: string; title: string },
    type: TagType
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
    })
  }
}
