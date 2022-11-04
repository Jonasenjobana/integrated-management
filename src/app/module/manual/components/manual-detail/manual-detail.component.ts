import { ProductHttpService } from './../../../product/product-http.service';
import { Product } from './../../../product/components/product.model';
import { Manual } from './../../manual.model';
import { DynamicServeService } from './../../../layout/dynamic-serve.service';
import { Config, ConfigValue } from './../../../share/model/result.model';
import { ManualHttpService } from './../../manual-http.service';
import { DynamicParams } from './../../../layout/components/tab/Tab.model';
import { Component, Input, OnInit } from '@angular/core';

import SwiperCore, { Navigation, Swiper, Thumbs } from "swiper";
SwiperCore.use([ Navigation, Thumbs]);


@Component({
  selector: 'app-manual-detail',
  templateUrl: './manual-detail.component.html',
  styleUrls: ['./manual-detail.component.less']
})
export class ManualDetailComponent implements OnInit {
  @Input()
  dynamicParams!:DynamicParams
  thumbsSwiper?: Swiper
  manual: Manual
  product?: Product
  isLoadingDetail: boolean = true
  currentSelectedId: string = ''
  constructor(private manualHttpService:ManualHttpService, private dynamicServeService:DynamicServeService, private productHttpService: ProductHttpService) { 
    this.manual = new Manual()
  }
  ngOnInit(): void {
    const dynamicParams = this.dynamicParams
    if (dynamicParams.productId !== undefined) {
      this.getProductInfo(dynamicParams.productId!).then(() => {
        this.getManualInfo(dynamicParams.manualId!).then(() => {
          this.handleProductType()
        })
      })
    } else {
      this.getManualInfo(dynamicParams.manualId!)
    }
  }
  getProductInfo(productId: string) {
    return this.productHttpService.getInfo(productId).then(res => {
      this.product = res
    })
  }
  getManualInfo(manualId: string) {
    return this.manualHttpService.getInfo(manualId!).then((res: Manual) => {
      this.manual = new Manual(res)
      // 产品详情
      this.currentSelectedId = this.manual.modelList[0].id
    }).finally(() => {
      this.isLoadingDetail = false
    })
  }
  handleProductType() {
    const product = this.product!
    const valueId: string[] = product.valueIds.split(';')
    // 只保留展示产品的配置信息
    this.manual.modelList = this.manual.modelList.filter(model => model.id === product.modelId)
    this.currentSelectedId = this.manual.modelList[0].id
    this.manual.initSelfConfiguration()
    // 过滤通用配置
    this.manual.configList = this.filterProductValue(this.manual.configList, valueId)
    // 过滤私有配置
    // this.manual.modelList[0].configList = this.filterProductValue(this.manual.modelList[0].configList, valueId)    
    this.manual._selfConfiguration =  this.filterProductValue(this.manual.modelList[0].configList, valueId)    
  }
  filterProductValue(configList: Config[], valueId: string[]) {
    return configList.map(config => {
      config.configvalueList = config.configvalueList.filter(configValue => {  
        const index = valueId.findIndex(id => id === configValue.id)
        return index !== -1
      })
      return config
    }).filter(config => config.configvalueList.length)
  }
  /**
   * 根據型號選中的判斷有無配置屬性
   * @param configValue 
   * @returns 
   */
  isDisabled(configValue: ConfigValue) {   
    return configValue._hostGroup!.findIndex(id => id === this.currentSelectedId) === -1
  }
  /**
   * 編輯手冊和產品，編輯產品
   */
  jumpToEdit() {
    const type = this.dynamicParams.type
    if (type === 'Manual') {
      this.dynamicServeService.addTab('manual-edit',{manualId: this.dynamicParams.manualId, type})
    } else if (type === 'Product') {
      this.dynamicServeService.addTab('product-instock',{type, productId: this.dynamicParams.productId, manualId: this.dynamicParams.manualId})
    }
  }
  jumpToDetail() {
    this.dynamicServeService.addTab('manual-detail',{manualId: this.manual.id, type: 'Manual'})
  }
}
