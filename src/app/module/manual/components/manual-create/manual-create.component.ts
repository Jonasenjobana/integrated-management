import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Config } from './../../../share/model/result.model'
import { Manual } from './../../manual.model'
import { CompanyHttpService } from 'src/app/module/share/serve/company-http.service'
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree'
import { DictionaryDetailService } from 'src/app/module/share/serve/dictionary-detail.service'
import { AfterViewInit, Component, EventEmitter, Input, OnInit, OnDestroy } from '@angular/core'
import { DynamicParams } from 'src/app/module/layout/components/tab/Tab.model'
import { CompanyName } from 'src/app/module/share/model/common.model'
import { TypeModel } from 'src/app/module/share/model/result.model'
import { NzMessageService } from 'ng-zorro-antd/message';
import _ from 'lodash'
import { ManualHttpService } from '../../manual-http.service';
import { uuid } from 'src/app/module/share/utils/common.utils';
import { DynamicServeService } from 'src/app/module/layout/dynamic-serve.service';
declare var UE: any
@Component({
  selector: 'app-manual-create',
  templateUrl: './manual-create.component.html',
  styleUrls: ['./manual-create.component.less'],
})
export class ManualCreateComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  dynamicParams!: DynamicParams
  isLoadingInfo: boolean
  ueEidtor: any
  dynamicId: string
  isVisible = false
  productTypeSelect: NzTreeNodeOptions[] = []
  companySelect: CompanyName[] = []
  productTypeList: TypeModel[] = []
  editProductType: TypeModel
  isNewModel: boolean = false
  modelIndex: number = -1
  saveEntity: Manual
  contentList: NzUploadFile[] = []
  isConfirmVisible: boolean = false
  isSafeLoading: boolean = false
  isEdit: boolean = false
  constructor(
    private dictionaryDetailService: DictionaryDetailService,
    private companyHttpService: CompanyHttpService,
    private manualHttpService: ManualHttpService,
    private message: NzMessageService,
    private dynamicServeService: DynamicServeService
  ) {
    this.saveEntity = new Manual()
    this.editProductType = new TypeModel()
    this.isLoadingInfo = false
    // 由于创建和编辑手册使用一个组件，textarea的id需要唯一
    this.dynamicId = uuid()
  }
  ngOnInit(): void {
    // 初始化产品类型
    this.getProductType()
    // 初始化产品品牌
    this.getCompanyName()
    // 编辑状态，默认初始值
    if (this.dynamicParams.manualId !== undefined) {
      this.getManualInfo(this.dynamicParams.manualId)
    }
  }
  /**
   * 请求品牌
   */
  getCompanyName() {
    this.companyHttpService.getCompanyList().then((res) => {
      this.companySelect = res
    })
  }
  /**
   * 请求产品类型
   */
  getProductType() {
    this.dictionaryDetailService.getManualTreeNodes().then((res) => {
      this.productTypeSelect = res
    })
  }
  /**
   * 请求手册信息
   * @param manualId 
   */
  getManualInfo(manualId: string) {
    this.isEdit = true
    this.isLoadingInfo = true
    this.manualHttpService.getInfo(manualId).then(res => {
      this.saveEntity = res
      // 构造图片数据结构
      this.contentList = res.contentList.map(image => {
        return {
          uid: uuid(),
          name: image.storeName,
          url: image.filePath + '/' + image.storeName,
        } as NzUploadFile
      })
      this.saveEntity._mixinProductCode = res.pproductCode + '-' + res.productCode
    }).finally(() => {
      this.ueEidtor.ready(() => {
        // 如果是编辑需要请求编辑数据后再赋值
        this.ueEidtor.setContent(this.saveEntity.introduction)
      })
      this.isLoadingInfo = false
    })
  }
  handleCancle() {
    if (this.isEdit) {
      // TODO删除
    }
    this.dynamicServeService.closeTab(this.dynamicServeService.getCurrentIndex())
  }
  modalConfirm($event: boolean) {
    if ($event) {
      this.save() 
    } else {
      this.isConfirmVisible = false
    }
  }
  /**
   * 初始化和赋值ueEditor
   */
  ngAfterViewInit(): void {
    this.ueEidtor = UE.getEditor(this.dynamicId)
  }
  /**
   * 销毁ue实例
   */
  ngOnDestroy(): void {
    this.ueEidtor.destroy()
  }

  get modelList() {
    return this.saveEntity.modelList
  }

  /**
   * 解构_mixinProductCode
   * @param $event 
   */
  changeProductType($event: string) {
    const strArr = $event.split('-')
    this.saveEntity.pproductCode = strArr[0]
    this.saveEntity.productCode = strArr[1]
  }
  save() {
    const entity = this.saveEntity
    this.isSafeLoading = true
    if (this.isInValid()) {
      this.isSafeLoading = false
      this.isConfirmVisible = false
      return
    }
    if (entity.contentList.length) {
      entity.img = this.contentList[0].url!
    }
    entity.configList = this.setConfigListValid(entity.configList)
    entity.introduction = this.ueEidtor.getContent()
    this.manualHttpService.save(entity).then(id => {
        this.message.create('success', '保存成功！')
        this.dynamicServeService.closeTab(this.dynamicServeService.getCurrentIndex())
        this.dynamicServeService.addTab('manual-detail', {manualId: id, type: 'Manual'})

    }).finally(() => {
      this.isSafeLoading = false
      this.isConfirmVisible = false
    })
  }
  /**
   * 模态框保存
   */
  modalSave(): void {
    if (this.editProductType.modelName.trim() === '') {
      this.message.create('error', '产品型号名不能为空')
    } else {
      this.editProductType.configList = this.setConfigListValid(this.editProductType.configList)
      if (this.isNewModel) {
        this.modelList.push(this.editProductType)
      } else {
        this.modelList.splice(this.modelIndex, 1, this.editProductType)
      }
      this.isVisible = false
    }
  }
  /**
   * 校验保存数据合法
   * @returns 
   */
  isInValid(): boolean {
    const entity = this.saveEntity
    if (entity._mixinProductCode === '' || entity._mixinProductCode === undefined) {
      this.message.error('产品分类为必选')
    } else if (entity.companyId === '') {
      this.message.error('产品品牌为必选')
    } else if (entity.manualName.trim() === '' || entity.manualSerie.trim() === '') {
      this.message.error('产品名称为必填')
    } else {
      return false
    }
    return true
  }
  /**
   * 过滤掉不合法配置信息
   * @param modelList 
   * @returns 
   */
  setModelListValid(modelList: TypeModel[]) {
    return modelList.filter(model => {
      model.configList = this.setConfigListValid(model.configList)
      return model.modelName !== ''
    })
  }
  /**
   * 过滤掉不合法配置信息
   * @param configList 
   * @returns 
   */
  setConfigListValid(configList: Config[]) {
    return configList.filter(config => {
      if (config.name.trim() !== '') {
        config.configvalueList = config.configvalueList.filter(value => value.value.trim() !== '')
        return true
      }
      return false
    })
  }

  showModal(index: number): void {
    this.isVisible = true
    this.modelIndex = index
    this.isNewModel = index === -1
    this.editProductType = new TypeModel()
    if (!this.isNewModel) {
      this.editProductType = _.cloneDeep(this.modelList[index])
    }
  }

  deleteModal(): void {
    this.isVisible = false
    this.modelList.splice(this.modelIndex, 1)
  }
  uploadChange($event: NzUploadChangeParam) {
      if ($event.type === 'success') {
        this.saveEntity.contentList.push($event.file.response.datas)
      }
  }
}