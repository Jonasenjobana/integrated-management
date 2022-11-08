import { DynamicParams } from 'src/app/module/layout/components/tab/Tab.model'
import { DynamicServeService } from 'src/app/module/layout/dynamic-serve.service'
import { Product } from 'src/app/module/product/components/product.model'
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree'
import { Component, Input, OnInit } from '@angular/core'
import { ManualHttpService } from 'src/app/module/manual/manual-http.service'
import { Manual } from 'src/app/module/manual/manual.model'
import { DictionaryDetailService } from 'src/app/module/share/serve/dictionary-detail.service'
import { Config, ConfigValue } from 'src/app/module/share/model/result.model'
import { NzMessageService } from 'ng-zorro-antd/message'
import { ProductHttpService } from '../../product-http.service'

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.less'],
})
export class ProductCreateComponent implements OnInit {
  @Input()
  dynamicParams!: DynamicParams
  manualList: Manual[] = []
  productTypeSelect: NzTreeNodeOptions[] = []
  saveEntity: Product
  selectedCode: string = ''
  selectedId: string = ''
  productDate: string = ''
  serialNumber?: number
  nameList: Manual[] = []
  manualProduct?: Manual
  isLoadingEdit: boolean = false
  isConfirmVisible: boolean = false
  isSafeLoading: boolean = false
  constructor(
    private manualService: ManualHttpService,
    private dictionaryDetailService: DictionaryDetailService,
    private message: NzMessageService,
    private dynamicServeService: DynamicServeService,
    private productHttp: ProductHttpService
  ) {
    this.saveEntity = new Product() 
  }
  ngOnInit(): void {
    const dynamicParams = this.dynamicParams
    this.manualService.getAllList().then((res) => {
      this.manualList = res
    })
    this.dictionaryDetailService.getManualTreeNodes().then((res) => {
      this.productTypeSelect = res
    })
    // 产品型号id不为空说明是编辑
    if (dynamicParams.productId !== undefined) {
      this.isLoadingEdit = true
      this.productHttp.getInfo(dynamicParams.productId!).then(res => {
        this.saveEntity = res
      })
      this.getManualInfo(this.dynamicParams.manualId!)
    }
  }
  /**
   * 改变产品类型，重新初始化数据
   */
  selectChange() {
    this.selectedId = ''
    this.saveEntity.manualId = ''
    this.nameList = []
    this.manualProduct = undefined
    this.nameList = this.manualList.filter(
      (manual) => manual.productCode === this.selectedCode
    )
  }
  getManualInfo(id: string) {
    this.manualService.getInfo(id).then((res) => {
      this.manualProduct = new Manual(res)
      this.selectedCode = res.productCode
      this.nameList = this.manualList.filter(
        (manual) => manual.productCode === this.selectedCode
      )
    }).finally(() => {
      this.isLoadingEdit = false
    })
  }
  changeName($event: string) {
    this.saveEntity.modelId = ''
    this.getManualInfo($event)
  }
  changeModel(id: string) {
    this.saveEntity.modelId = id
    this.saveEntity.valueIds = ''
  }
  isValueSelected(id: string) {
    const values = this.saveEntity.valueIds.split('')
    return values.findIndex((item) => item === id) !== -1
  }
  /**
   * 判断values有无在字符串里，如果在就取消选中
   * 如果不在，判断是否多选，如果是多选直接Push入字符串
   * 如果不在，删除上一个value选择，push现在的
   * @param config
   * @param value
   */
  addValue(config: Config, value: ConfigValue) {
    if (!this.isCancleValueClick(value)) {
      if (!config.isMulti) {
        this.saveEntity.valueIds = this.filterValue(config)
      }
      this.saveEntity.valueIds = this.setValueId(value.id)
    }
  }
  setValueId(id: string) {
    const valueList = this.saveEntity.valueIds.split('')
    valueList.push(id)
    return valueList.join('')
  }
  /**
   * 去除掉单选的多选
   * @param config 
   * @returns 返回新的valueIds字符串
   */
  filterValue(config: Config) {
    const values = this.saveEntity.valueIds.split('')
    return values.filter(id => {
      return config.configvalueList.findIndex(value => value.id === id) === -1
    }).join('')
  }
  /**
   * 检查有无已经选中
   * @param value 配置参数
   * @returns 
   */
  isCancleValueClick(value: ConfigValue) {
    let values = this.saveEntity.valueIds.split('')
    const Index = values.findIndex((id) => id === value.id)
    if (Index !== -1) {
      values.splice(Index, 1)
      this.saveEntity.valueIds = values.join('')
      return true
    }
    return false
  }
  /**
   * 禁用样式
   * @param configValue 
   * @returns 
   */
  isDisabled(configValue: ConfigValue) {
    return (
      configValue._hostGroup!.findIndex(
        (id) => id === this.saveEntity.modelId
      ) === -1
    )
  }
 
  save() {
    if (this.saveEntity.manualId === '') {
      this.message.error('产品名称不能为空！')
    } else if (this.saveEntity.serialNumber === undefined) {
      this.message.error('产品序列号不能为空')
    } else if (this.saveEntity.productDate === '' || this.saveEntity.productDate === null) {
      this.message.error('生产日期不能为空')
    } else if (this.saveEntity.modelId === '') {
      this.message.error('生产型号不能为空')
    } else {
      this.saveRequest()
      return
    }
    this.isConfirmVisible = false
  }
  /**
   * 保存请求
   */
  saveRequest() {
    this.productHttp.save(this.saveEntity).then(id => {
      this.message.success('入库成功！')
      this.dynamicServeService.closeTab(this.dynamicServeService.getCurrentIndex())
      this.dynamicServeService.addTab('product-detail', {manualId: this.saveEntity.manualId, type: 'Product', productId: this.saveEntity.id })
    }).finally(() => {
      this.isSafeLoading = false
      this.isConfirmVisible = false
    })
  }
  modalConfirm($event: boolean) {
    if ($event) {
      this.save()
    } else {
      this.isConfirmVisible = false
    }
  }
  cancle() {
    this.dynamicServeService.closeTab(this.dynamicServeService.getCurrentIndex())
  }
}
