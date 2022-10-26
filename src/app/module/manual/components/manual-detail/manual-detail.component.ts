import { DynamicServeService } from './../../../layout/dynamic-serve.service';
import { Config, ResultDetail, TypeModel, ConfigValue } from './../../../share/model/result.model';
import { ManualHttpService } from './../../manual-http.service';
import { DynamicParams } from './../../../layout/components/tab/Tab.model';
import { Component, Input, OnInit } from '@angular/core';

import SwiperCore, { Navigation, Swiper, Thumbs } from "swiper";
import { Content } from 'src/app/module/share/model/result.model';
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
  detailEntity!: ResultDetail
  selfConfiguration: Config[] = []
  isLoadingDetail: boolean = true
  currentSelectedId: string = ''
  constructor(private manualHttpService:ManualHttpService, private dynamicServeService:DynamicServeService) { }
  ngOnInit(): void {
    this.manualHttpService.getInfo(this.dynamicParams.id!).then((res: ResultDetail) => {
      console.log(res)
      this.detailEntity = res
      this.initSelfConfiguration()
    }).finally(() => {
      this.isLoadingDetail = false
    })
  }

  isDisabled( config: Config, configValue: ConfigValue) {   
    return config.hostGroup?.findIndex(id => id === this.currentSelectedId) === -1 || configValue.hostGroup?.findIndex(id => id === this.currentSelectedId) === -1 ? "disabled" : "btn-click"
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
        config.hostGroup = [config.hostId]
        this.selfConfiguration.push(config)
      } else {
        const selfConfig = this.selfConfiguration[SelfIndex]
        selfConfig.hostGroup!.push(config.hostId)
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
    this.initSelfConfigValuesHostGroup(selfConfigValues)
    configValues.forEach(configValue => {
      const ValueIndex = selfConfigValues.findIndex(selfValue => selfValue.value === configValue.value)
      if (ValueIndex === -1) {
        configValue.hostGroup = [configValue.hostId]
        selfConfigValues.push(configValue)
      } else {
        const selfConfigValue = selfConfigValues[ValueIndex]
        selfConfigValue.hostGroup!.push(configValue.hostId)
      }
    })
  }
  /**
   * 对hostGroup处理
   * @param selfConfigValues 特定参数初始化
   */
  initSelfConfigValuesHostGroup(selfConfigValues: ConfigValue[]) {
    selfConfigValues.forEach(self => {
      if ( self.hostGroup &&  self.hostGroup.length ) {
        self.hostGroup.push(self.hostId)
      } else {
        self.hostGroup = [self.hostId]
      }
    })
  }

  jumpToEdit() {
    switch(this.dynamicParams.type) {
      case 'Manual':
        this.dynamicServeService.addTab('manual-edit',{id: this.dynamicParams.id})
        break
    }
  }
}
