import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { CompanyHttpService } from './../../../share/serve/company-http.service';
import { Company, Tag, Search } from './../../../share/model/common.model';
import { DictionaryDetailService } from 'src/app/module/share/serve/dictionary-detail.service';
import { ProductHttpService } from './../../product-http.service';
import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { TagTitle } from 'src/app/module/share/config/constant.config';
import { NzSelectComponent } from 'ng-zorro-antd/select';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less'],
})
export class ProductListComponent implements OnInit {
  productSelectList: NzTreeNodeOptions[] = [];
  checkAll: boolean = false;
  companySelect: Company[] = [];
  tags: Tag[]= []
  searchEntity: Search
  constructor(
    private productHttpService: ProductHttpService,
    private dictionaryDetailService: DictionaryDetailService,
    private companyHttpService: CompanyHttpService
  ) {
    this.searchEntity = {
      currentPage: 1,
      pageRecord: 10,
    }
  }
  @ViewChild('typeSelectRef')
  typeSelectRef!: NzSelectComponent
  ngOnInit(): void {
    this.dictionaryDetailService.getManualTreeNodes().then((res) => {
      this.productSelectList = res;
    });
    this.companyHttpService.getCompanyList().then((res) => {
      this.companySelect = res;
    });
  }
  productTypeChange(productCode: string) {
    this.searchEntity.productCode = productCode
    this.updateTags({key: productCode, title: <string>this.typeSelectRef.listOfTopItem[0].nzLabel},'Menu') 
  }
  searchSerial() {
    console.log(this.searchEntity,'==-=-=');
    
    // if (this.searchEntity.serialNumber) {
    //   this.updateTags({key: this.searchEntity.serialNumber, title: this.searchEntity.serialNumber}, 'Series')
    // }
  }
    /**
   *
   * @param param0 基本标签信息
   * @param type 标签类型:分类,品牌
   */
     updateTags(
      { key, title }: { key: string; title: string },
      type: 'Menu'|'Brand'|'Search'|'Series'
    ) {
      const index = this.tags.findIndex((el) => el.type === type);
      if (index !== -1) {
        this.tags.splice(index, 1);
      }
      this.tags.push({
        key,
        title: `${TagTitle[type]}: ${title}`,
        show: true,
        type,
      });
    }
}
