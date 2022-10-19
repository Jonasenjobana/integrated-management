import { product } from './components/product.model';
import { listResult } from '../share/model/result.model';
import { Injectable } from '@angular/core';
import { BaseCurdService } from '../share/serve/base-curd.service';
import { HttpClientService } from '../share/serve/http-client.service';
import { paramsData } from '../share/model/common.model';

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService extends BaseCurdService<paramsData, listResult<product[]>>{

  constructor(protected override baseHttp:HttpClientService) {
    super(baseHttp, '/api/product')
   }
}
