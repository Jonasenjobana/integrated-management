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

import _ from 'lodash'
import { ManualHttpService } from '../../manual-http.service';
import { Subject } from 'rxjs';
import { uuid } from 'src/app/module/share/utils/common.utils';
declare var UE: any
@Component({
  selector: 'app-manual-create',
  templateUrl: './manual-create.component.html',
  styleUrls: ['./manual-create.component.less'],
})
export class ManualCreateComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  dynamicParams!: DynamicParams
  private _editorSub$: Subject<boolean> = new Subject();
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
  constructor(
    private dictionaryDetailService: DictionaryDetailService,
    private companyHttpService: CompanyHttpService,
    private manualHttpService: ManualHttpService
  ) {
    this.saveEntity = new Manual()
    this.editProductType = new TypeModel()
    this.isLoadingInfo = false
    this.dynamicId = 'UeEditor'
  }
  ngOnInit(): void {
    this.dictionaryDetailService.getManualTreeNodes().then((res) => {
      this.productTypeSelect = res
    })
    this.companyHttpService.getCompanyList().then((res) => {
      this.companySelect = res
    })
    if (this.dynamicParams !== undefined && this.dynamicParams.id !== undefined) {
      // 由于创建和编辑手册使用一个组件，textarea的id需要独一无二，才能让ueeditor创建2个实例
      this.dynamicId += 'edit-'
      this.isLoadingInfo = true
      this.manualHttpService.getInfo(this.dynamicParams.id).then(res => {
        this.saveEntity = res
        this.contentList = res.contentList.map(image => {
          const tmp =  {
            uid: uuid(),
            name: image.storeName,
            url: image.filePath + '/' + image.storeName,
          } as NzUploadFile
          return tmp
        })
        this.saveEntity._mixinProductCode = res.pproductCode + '-' + res.productCode
      }).finally(() => {
        // 获取到introduction数据后，需要通知ueeditor对内容赋值
        this._editorSub$.next(true)
        this.isLoadingInfo = false
      })
    }
  }
  /**
   * 初始化和赋值ueEditor
   */
  ngAfterViewInit(): void {
    this.ueEidtor = UE.getEditor(this.dynamicId)
    this.ueEidtor.addListener('ready', () => {
      this._editorSub$.asObservable().subscribe(res => {
        if (res) {
          this.ueEidtor.setContent(this.saveEntity.introduction)
        }
      })
    })
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
    // TODO 校验
    
    this.saveEntity.introduction = this.ueEidtor.getContent()
    console.log(this.saveEntity)
    this.manualHttpService.save(this.saveEntity).then(hostId => {
      console.log(hostId);
    })
  }
  /**
   * 模态框保存
   * TODO: 还差校验
   */
  modalSave(): void {
    // TODO 校验
    if (this.isNewModel) {
      this.modelList.push(this.editProductType)
    } else {
      this.modelList.splice(this.modelIndex, 1, this.editProductType)
    }
    this.isVisible = false
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
        console.log(this.contentList)
      }
  }
}