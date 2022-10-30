import { Config } from './../../../share/model/result.model';
import { Manual } from './../../manual.model';
import { CompanyHttpService } from 'src/app/module/share/serve/company-http.service';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { DictionaryDetailService } from 'src/app/module/share/serve/dictionary-detail.service';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { DynamicParams } from 'src/app/module/layout/components/tab/Tab.model';
import { CompanyName } from 'src/app/module/share/model/common.model';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { TypeModel } from 'src/app/module/share/model/result.model';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
declare var UE: any;
@Component({
  selector: 'app-manual-create',
  templateUrl: './manual-create.component.html',
  styleUrls: ['./manual-create.component.less'],
})
export class ManualCreateComponent implements OnInit, AfterViewInit {
  @Input()
  dynamicParams!: DynamicParams;
  ueEidtor: any;
  isVisible = false;
  productTypeSelect: NzTreeNodeOptions[] = [];
  companySelect: CompanyName[] = [];
  saveEntity: FormGroup;
  productTypeList: TypeModel[] = [];
  selectedType: FormGroup;
  isNewModel: boolean = false;
  modelIndex: number = -1;
  constructor(
    private dictionaryDetailService: DictionaryDetailService,
    private companyHttpService: CompanyHttpService,
    private fb: FormBuilder,
  ) {
    this.saveEntity = this.fb.group({
      id: [''],
      manualName: ['', Validators.required],
      manualSerie: ['', Validators.required],
      productName: ['', Validators.required],
      companyId: ['', Validators.required],
      productCode: ['', Validators.required],
      modelList: this.fb.array([]),
    });
    this.selectedType = this.newModelType();
  }
  newModelType(): FormGroup {
    return this.fb.group({
      modelName: ['', Validators.required],
      // configList: this.fb.array([]),
    });
  }
  ngOnInit(): void {
    this.dictionaryDetailService.getManualTreeNodes().then((res) => {
      this.productTypeSelect = res;
    });
    this.companyHttpService.getCompanyList().then((res) => {
      this.companySelect = res;
    });
    if (this.dynamicParams !== undefined) {
      console.log('bianji');
    }
  }

  ngAfterViewInit(): void {
    this.ueEidtor = UE.getEditor('editor');
  }

  get modelList() {
    return this.saveEntity.get('modelList') as FormArray;
  }

  selectProductType($event: any) {}
  save() {
    console.log(this.saveEntity);
  }
  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  productCodeModal() {
    this.isVisible = true;
  }
  handleOk(): void {
    if (this.isNewModel) {
      this.modelList.push(this.selectedType);
    } else {
      this.modelList.removeAt(this.modelIndex)
      this.modelList.insert(this.modelIndex, this.selectedType)
    }
    this.isVisible = false;
    console.log('saveentity:',this.saveEntity);
  }

  showModal(index: number): void {
    this.isVisible = true;
    if (index !== -1) {
      this.selectedType = this.newModelType();
      const old = this.modelList.at(index);
      this.selectedType.setValue({
        'modelName': old.get('modelName')?.value,
        // 'configList': old.get('configList')
    }) 
      
    } else {
      this.selectedType = this.newModelType();
    }
    this.isNewModel = index === -1;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  fileList: NzUploadFile[] = [
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-xxx',
      percent: 50,
      name: 'image.png',
      status: 'uploading',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error',
    },
  ];
  previewImage: string | undefined = '';
  previewVisible = false;

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };
  handleDelete() {
    this.isVisible = false
    this.modelList.removeAt(this.modelIndex)
    console.log('delete');
    
  }
}
const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
