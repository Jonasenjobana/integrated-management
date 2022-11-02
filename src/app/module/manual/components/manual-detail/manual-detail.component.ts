import { Product } from './../../../product/components/product.model';
import { Manual } from './../../manual.model';
import { DynamicServeService } from './../../../layout/dynamic-serve.service';
import { Config, TypeModel, ConfigValue } from './../../../share/model/result.model';
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
  detailEntity: Manual
  isLoadingDetail: boolean = true
  currentSelectedId: string = ''
  constructor(private manualHttpService:ManualHttpService, private dynamicServeService:DynamicServeService) { 
    this.detailEntity = new Manual()
  }
  ngOnInit(): void {
    this.manualHttpService.getInfo(this.dynamicParams.id!).then((res: Manual) => {
      this.detailEntity = new Manual(res)
      // 产品详情
      if (this.dynamicParams.type === 'Product') {
        this.handleProductType()
      }
      this.currentSelectedId = this.detailEntity.modelList[0].id
    }).finally(() => {
      this.isLoadingDetail = false
    })
  }
  get product() {
    return this.dynamicParams.product
  }
  handleProductType() {
    const product: Product = this.dynamicParams.product!
    const valueId: string[] = product.valueIds.split(';')
    // 只保留展示产品的配置信息
    this.detailEntity.modelList = this.detailEntity.modelList.filter(model => model.id === this.dynamicParams.product!.modelId)
    this.detailEntity.initSelfConfiguration()
    // 过滤通用配置
    this.detailEntity.configList = this.filterProductValue(this.detailEntity.configList, valueId)
    // 过滤私有配置
    // this.detailEntity.modelList[0].configList = this.filterProductValue(this.detailEntity.modelList[0].configList, valueId)    
    this.detailEntity._selfConfiguration =  this.filterProductValue(this.detailEntity.modelList[0].configList, valueId)   
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
  isDisabled(configValue: ConfigValue) {   
    return configValue._hostGroup!.findIndex(id => id === this.currentSelectedId) === -1
  }

  jumpToEdit() {
    const type = this.dynamicParams.type
    if (type === 'Manual') {
      this.dynamicServeService.addTab('manual-edit',{id: this.dynamicParams.id, type})
    } else if (type === 'Product') {
      this.dynamicServeService.addTab('product-instock',{type, product: this.dynamicParams.product})
    }
  }
  jumpToDetail() {
    this.dynamicServeService.addTab('manual-detail',{id: this.detailEntity.id, type: 'Manual'})
  }
}
