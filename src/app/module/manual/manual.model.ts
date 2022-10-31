import { Config, Content, TypeModel } from '../share/model/result.model';

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
  introduction: string
  manualNumber?: number
  modelIds: string
  modelList: TypeModel[]
  _mixinProductCode?: string
  parameterList: []
  constructor() {
    this.id = ''
    this.manualName = ''
    this.manualSerie = ''
    this.productName = ''
    this.pproductName = ''
    this.companyId = ''
    this.companyName = ''
    this.img = ''
    this.pproductCode = ''
    this.productCode = ''
    this.configIds = ''
    this.configList = []
    this.contentIds = ''
    this.contentList = []
    this.introduction = ''
    this.manualNumber = 0
    this.modelIds = ''
    this.modelList = []
    this.parameterList = []
  }
}
