import { Product } from './../product/components/product.model';

import { Page } from '../share/model/result.model';
import { Manual } from './manual.model';
import { BaseCurdService } from './../share/serve/base-curd.service';
import { Injectable } from '@angular/core';
import { HttpClientService } from '../share/serve/http-client.service';
import { ParamsData } from '../share/model/common.model';

@Injectable({
  providedIn: 'root'
})
export class ManualHttpService extends BaseCurdService<ParamsData, Manual>{

  constructor(protected override baseHttp:HttpClientService) { 
    super(baseHttp, '/api/manual')
  }
  getName() {
    return this.baseHttp.get<Product[]>(`${this.baseUrl}/getName`)
  }
}
