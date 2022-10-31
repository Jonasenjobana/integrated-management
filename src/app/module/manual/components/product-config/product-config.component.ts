import { Config, ConfigValue } from './../../../share/model/result.model';
import { Component, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'product-config',
  templateUrl: './product-config.component.html',
  styleUrls: ['./product-config.component.less']
})
export class ProductConfigComponent implements OnInit {
  @Input('configList')
  configList: Config[]
  constructor() { 
    this.configList =  [new Config()]
  }
  ngOnInit(): void {
  }
  addConfig() {
    this.configList.push(new Config())
  }

  addConfigValue(configIndex: number) {
    this.configList[configIndex].configvalueList.push(new ConfigValue())
    
  }
  deleteConfig(configIndex: number) {
    this.configList.splice(configIndex, 1)
  }
  deleteConfigValue(configIndex: number, valueIndex: number) {
    this.configList[configIndex].configvalueList.splice(valueIndex, 1)
  }
}
