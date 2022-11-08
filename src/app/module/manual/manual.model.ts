import { Config, ConfigValue, Content, TypeModel } from '../share/model/result.model';

export class Manual {
  id: string
  manualName: string
  manualSerie: string
  productName: string
  pproductName: string
  companyId: string
  companyName: string
  img: string
  pproductCode: string
  productCode: string
  configIds: string
  configList: Config[]
  contentIds: string
  contentList: Content[]
  introduction?: string
  manualNumber?: number
  modelIds: string
  modelList: TypeModel[]
  _mixinProductCode?: string
  parameterList: []
  constructor(manual?: Manual) {
    this.id = manual?.id || ''
    this.manualName = manual?.manualName  || ''
    this.manualSerie = manual?.manualSerie  || ''
    this.productName = manual?.productName || ''
    this.pproductName = manual?.pproductName || ''
    this.companyId = manual?.companyId || ''
    this.companyName = manual?.companyName || ''
    this.img = manual?.img || ''
    this.pproductCode = manual?.pproductCode || ''
    this.productCode = manual?.productCode || ''
    this.configIds = manual?.configIds || ''
    this.configList = manual?.configList || []
    this.contentIds = manual?.contentIds || ''
    this.contentList = manual?.contentList || []
    this.introduction = manual?.introduction || undefined
    this.manualNumber = manual?.manualNumber || 0
    this.modelIds = manual?.modelIds || ''
    this.modelList = manual?.modelList || []
    this.parameterList = manual?.parameterList || []
    this._selfConfiguration = []
    // 创建后顺便初始化私有配置
    this.initSelfConfiguration()
  }
  _selfConfiguration: Config[] = []
   // 去重参数名和参数值
   initSelfConfiguration() {
    this.modelList.forEach((model: TypeModel )=> {
      this.deDuplicateConfig(model)
    })
  }
  /**
   * 产品型号参数名去重
   * @param model 产品型号
   */
  deDuplicateConfig(model: TypeModel) {
    model.configList.forEach(config => {
      const SelfIndex = this._selfConfiguration.findIndex(self => self.name === config.name)
      if (SelfIndex === -1) {
        // 初始化_hostGroup数组
        config.configvalueList.forEach(value => value._hostGroup = [value.hostId])
        this._selfConfiguration.push(config)
      } else {
        const selfConfig = this._selfConfiguration[SelfIndex]
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
}
