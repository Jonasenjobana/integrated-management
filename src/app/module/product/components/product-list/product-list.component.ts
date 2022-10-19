import { CompanyHttpService } from './../../../share/serve/company-http.service';
import { productSelect, company } from './../../../share/model/common.model';
import { DictionaryDetailService } from 'src/app/module/share/serve/dictionary-detail.service';
import { pagination } from '../../../share/model/result.model';
import { ProductHttpService } from './../../product-http.service';
import { Component, OnInit } from '@angular/core';
import { paramsData } from 'src/app/module/share/model/common.model';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
export class ProductListComponent implements OnInit {
  private _initDate: paramsData

  pagination: pagination
  productSelectList: productSelect[] = []
  checkAll: boolean = false
  companySelect: company[] = []
  constructor(
    private productHttpService:ProductHttpService,
    private dictionaryDetailService:DictionaryDetailService,
    private companyHttpService:CompanyHttpService
    ) { 
    this.pagination = {
      currentPage: 1,
      pageRecord: 10,
    }
    this._initDate = {
      ...this.pagination,
      companyId: "",
      productCode: "",
      name: "",
    }
  }

  ngOnInit(): void {
    this.dictionaryDetailService.getDictByType('productSelect').then(res => {
      this.productSelectList = res as productSelect[]
    })
    this.companyHttpService.getCompanyList().then(res => {
      this.companySelect = res
    })
    this.productHttpService.getList(this._initDate).then(res => {
      console.log(res);
    })

}
}