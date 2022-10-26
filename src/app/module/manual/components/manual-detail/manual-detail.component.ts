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
  constructor(private manualHttpService:ManualHttpService) { }
  ngOnInit(): void {
    this.manualHttpService.getInfo(this.dynamicParams.id!).then((res: ResultDetail) => {
      console.log(res);
      this.detailEntity = res
      this.initSelfConfiguration()
      console.log(this.selfConfiguration);
      
    }).finally(() => {
      this.isLoadingDetail = false
    })
  }
  isDisabled(item: ConfigValue, config: Config) {
    return config.hostGroup?.findIndex(id => id === this.currentSelectedId) === -1 || item.hostGroup?.findIndex(id => id === this.currentSelectedId) === -1
  }
  // 去重参数名和参数值
  initSelfConfiguration() {
    this.currentSelectedId = this.detailEntity.modelList[0].id
    this.detailEntity.modelList.forEach((model: TypeModel )=> {
      model.configList?.forEach((config: Config) => {
        // 去重参数名
        const Index = this.selfConfiguration.findIndex(item => item.name === config.name)
        if (Index === -1) {
          config.hostGroup = [config.hostId]
          this.selfConfiguration.push(config)
        } else {
          const oldConfig = this.selfConfiguration[Index]
          oldConfig.hostGroup!.push(config.hostId)
          // 然后去重参数值
          oldConfig.configvalueList?.forEach(oldConfigValue => {
            oldConfigValue.hostGroup = [oldConfigValue.hostId]
            const ValueIndex = config.configvalueList!.findIndex(configValue => configValue.value === oldConfigValue.value)
            // TODO 参数去重
          })
        }
      })
    })
  }
}
