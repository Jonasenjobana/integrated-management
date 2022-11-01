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
  detailEntity!: Manual
  selfConfiguration: Config[] = []
  isLoadingDetail: boolean = true
  currentSelectedId: string = ''
  constructor(private manualHttpService:ManualHttpService, private dynamicServeService:DynamicServeService) { }
  ngOnInit(): void {
    this.manualHttpService.getInfo(this.dynamicParams.id!).then((res: Manual) => {
      this.detailEntity = res
      // 产品详情
      if (this.dynamicParams.type === 'Product') {
        this.handleProductType()
      } else {
        this.initSelfConfiguration()
      }
    }).finally(() => {
      this.isLoadingDetail = false
    })
  }

  handleProductType() {
    const product: Product = this.dynamicParams.product!
    const valueId: string[] = product.valueIds.split(';')
    // 只保留展示产品的配置信息
    this.detailEntity.modelList = this.detailEntity.modelList.filter(model => model.id === this.dynamicParams.product!.modelId)
    this.initSelfConfiguration()
    // 过滤通用配置
    this.detailEntity.configList = this.filterProductValue(this.detailEntity.configList, valueId)
    // 过滤私有配置
    this.detailEntity.modelList[0].configList = this.filterProductValue(this.detailEntity.modelList[0].configList, valueId)
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
    return configValue._hostGroup?.findIndex(id => id === this.currentSelectedId) === -1 ? "disabled" : "btn-click"
  }
  // 去重参数名和参数值
  initSelfConfiguration() {
    this.currentSelectedId = this.detailEntity.modelList[0].id
    this.detailEntity.modelList.forEach((model: TypeModel )=> {
      this.deDuplicateConfig(model)
    })
  }
  /**
   * 产品型号参数名去重
   * @param model 产品型号
   */
  deDuplicateConfig(model: TypeModel) {
    model.configList.forEach(config => {
      const SelfIndex = this.selfConfiguration.findIndex(self => self.name === config.name)
      if (SelfIndex === -1) {
        // 初始化_hostGroup数组
        config.configvalueList.forEach(value => value._hostGroup = [value.hostId])
        this.selfConfiguration.push(config)
      } else {
        const selfConfig = this.selfConfiguration[SelfIndex]
        this.deDuplicateConfigValue(selfConfig.configvalueList, config.configvalueList)
      }
    })    
  }
  /**
   * 产品型号相同参数名的参数值去重
   * @param selfConfigValues 特定参数值
   * @param configValues 产品类型值
   */
  deDuplicateConfigValue(selfConfigValues: ConfigValue[], configValues: ConfigValue[]) {
    configValues.forEach(configValue => {
      const ValueIndex = selfConfigValues.findIndex(selfValue => selfValue.value === configValue.value)
      if (ValueIndex === -1) {
        configValue._hostGroup = [configValue.hostId]
        selfConfigValues.push(configValue)
      } else {
        const selfConfigValue = selfConfigValues[ValueIndex]
        selfConfigValue._hostGroup!.push(configValue.hostId)
      }
    })
  }

  jumpToEdit() {
    const type = this.dynamicParams.type
    if (type === 'Manual') {
      this.dynamicServeService.addTab('manual-edit',{id: this.dynamicParams.id, type: 'Manual'})
    } else if (type === 'Product'){
      this.dynamicServeService.addTab('product-instock',{type: 'Product'})
    }
  }
}
